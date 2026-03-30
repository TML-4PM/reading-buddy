'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'

type Phase = 'setup' | 'ready' | 'recording' | 'uploading' | 'processing' | 'done' | 'error'

interface RunResult {
  accuracy_pct: number
  words_correct: number
  total_words: number
  errors: number
  msv_errors_classified: number
  accuracy_band: 'EASY' | 'INSTRUCTIONAL' | 'HARD'
  recommendation: 'MOVE_UP' | 'STAY' | 'MOVE_DOWN'
}

const BAND_COPY = {
  EASY:         { emoji: '🟢', label: 'Too Easy',          sub: 'Ready for the next level' },
  INSTRUCTIONAL:{ emoji: '🟡', label: 'Just Right',        sub: 'Ideal learning zone' },
  HARD:         { emoji: '🔴', label: 'Too Difficult',     sub: 'Step back one level' },
}

const REC_COPY = {
  MOVE_UP:   'Move up a level',
  STAY:      'Continue at this level',
  MOVE_DOWN: 'Drop back a level',
}

export default function ReadPage() {
  const [phase, setPhase]               = useState<Phase>('setup')
  const [readerName, setReaderName]     = useState('')
  const [readerId, setReaderId]         = useState<string | null>(null)
  const [bookTitle, setBookTitle]       = useState('')
  const [bookText, setBookText]         = useState('')
  const [runningRecordId, setRunningRecordId] = useState<string | null>(null)
  const [captureId, setCaptureId]       = useState<string | null>(null)
  const [s3Key, setS3Key]               = useState<string | null>(null)
  const [elapsed, setElapsed]           = useState(0)
  const [result, setResult]             = useState<RunResult | null>(null)
  const [error, setError]               = useState('')
  const [pollCount, setPollCount]       = useState(0)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef        = useRef<Blob[]>([])
  const timerRef         = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef     = useRef<number>(0)

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // ─── Helpers ──────────────────────────────────────────────────────────────

  const genUUID = () => crypto.randomUUID()

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  // ─── Setup: create reader profile + running record ───────────────────────

  const handleSetup = async () => {
    if (!readerName.trim() || !bookTitle.trim() || !bookText.trim()) return
    setPhase('ready')

    const newReaderId = genUUID()
    const newRunningRecordId = genUUID()
    setReaderId(newReaderId)
    setRunningRecordId(newRunningRecordId)

    // Upsert reader profile
    await supabase.from('rb_reader_profile').upsert({
      reader_id: newReaderId,
      full_name: readerName.trim(),
    }, { onConflict: 'reader_id' })

    // Create running record shell
    await supabase.from('rb_running_record').insert({
      running_record_id: newRunningRecordId,
      reader_id: newReaderId,
      text_title: bookTitle.trim(),
      word_count_total: bookText.trim().split(/\s+/).length,
      is_unseen_text: true,
      ai_assist_used: true,
    })
  }

  // ─── Recording ────────────────────────────────────────────────────────────

  const startRecording = async () => {
    chunksRef.current = []
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })

      // Pick best supported format
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/mp4')
        ? 'audio/mp4'
        : 'audio/webm'

      const recorder = new MediaRecorder(stream, { mimeType })
      mediaRecorderRef.current = recorder
      recorder.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      recorder.start(250) // 250ms chunks for low latency

      startTimeRef.current = Date.now()
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000))
      }, 1000)

      setPhase('recording')
    } catch (err) {
      setError('Microphone access denied. Please allow mic access and try again.')
      setPhase('error')
    }
  }

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    const recorder = mediaRecorderRef.current
    if (!recorder) return

    recorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: recorder.mimeType })
      await uploadAndProcess(blob, recorder.mimeType, elapsed)
    }
    recorder.stop()
    recorder.stream.getTracks().forEach(t => t.stop())
    setPhase('uploading')
  }

  // ─── Upload + trigger Lambda ──────────────────────────────────────────────

  const uploadAndProcess = useCallback(async (blob: Blob, mimeType: string, durationSec: number) => {
    if (!readerId || !runningRecordId) return
    const newCaptureId = genUUID()
    setCaptureId(newCaptureId)

    try {
      // 1. Get pre-signed S3 URL
      const presignRes = await fetch('/api/read/presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          capture_id: newCaptureId,
          running_record_id: runningRecordId,
          reader_id: readerId,
          content_type: mimeType,
        }),
      })
      const { presigned_url, s3_key } = await presignRes.json()
      setS3Key(s3_key)

      // 2. PUT audio directly to S3
      await fetch(presigned_url, {
        method: 'PUT',
        headers: { 'Content-Type': mimeType },
        body: blob,
      })

      // 3. Trigger Lambda async
      await fetch('/api/read/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          capture_id: newCaptureId,
          running_record_id: runningRecordId,
          reader_id: readerId,
          s3_key,
          book_text: bookText,
          duration_ms: durationSec * 1000,
        }),
      })

      setPhase('processing')
      setPollCount(0)
    } catch (err) {
      setError('Upload failed. Please try again.')
      setPhase('error')
    }
  }, [readerId, runningRecordId, bookText])

  // ─── Poll Supabase for result ─────────────────────────────────────────────

  useEffect(() => {
    if (phase !== 'processing' || !captureId) return
    const interval = setInterval(async () => {
      setPollCount(c => c + 1)

      const { data } = await supabase
        .from('rb_audio_capture')
        .select('processing_status')
        .eq('capture_id', captureId)
        .single()

      if (data?.processing_status === 'COMPLETE') {
        clearInterval(interval)
        // Fetch running record for result
        const { data: rr } = await supabase
          .from('rb_running_record')
          .select('words_correct, words_attempted, accuracy_pct, accuracy_band, progression_recommendation')
          .eq('running_record_id', runningRecordId)
          .single()

        const { data: msv } = await supabase
          .from('rb_msv_classification')
          .select('msv_id', { count: 'exact', head: true })
          .eq('running_record_id', runningRecordId)

        setResult({
          accuracy_pct: rr?.accuracy_pct ?? 0,
          words_correct: rr?.words_correct ?? 0,
          total_words: rr?.words_attempted ?? 0,
          errors: (rr?.words_attempted ?? 0) - (rr?.words_correct ?? 0),
          msv_errors_classified: (msv as any)?.count ?? 0,
          accuracy_band: (rr?.accuracy_band as RunResult['accuracy_band']) ?? 'INSTRUCTIONAL',
          recommendation: (rr?.progression_recommendation as RunResult['recommendation']) ?? 'STAY',
        })
        setPhase('done')
      } else if (data?.processing_status === 'FAILED') {
        clearInterval(interval)
        setError('Audio processing failed. Please try again.')
        setPhase('error')
      }
      // Timeout after 90s of polling
      if (pollCount > 30) {
        clearInterval(interval)
        setError('Processing timed out. The result will appear in the dashboard shortly.')
        setPhase('error')
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [phase, captureId, pollCount, runningRecordId, supabase])

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: '100vh', background: '#fafaf8', fontFamily: 'DM Sans, sans-serif' }}>
      <nav style={{ padding: '1.2rem 2rem', borderBottom: '1px solid #e8e4df', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.4rem' }}>📚</span>
        <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1a1a1a' }}>Reading Buddy</span>
        <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#888', background: '#f0ede8', padding: '0.25rem 0.75rem', borderRadius: 20 }}>
          AI Running Record
        </span>
      </nav>

      <main style={{ maxWidth: 640, margin: '0 auto', padding: '3rem 1.5rem' }}>

        {/* ── SETUP ── */}
        {phase === 'setup' && (
          <div>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', color: '#c4773a', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              New Running Record
            </p>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.5rem', lineHeight: 1.2 }}>
              Who's reading today?
            </h1>
            <p style={{ color: '#666', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              Paste the book text below. The AI will listen, detect every error, classify it as Meaning, Syntax, or Visual, and give you an instant running record.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <label style={labelStyle}>
                Reader's name
                <input style={inputStyle} placeholder="e.g. Lila" value={readerName} onChange={e => setReaderName(e.target.value)} />
              </label>
              <label style={labelStyle}>
                Book title
                <input style={inputStyle} placeholder="e.g. The Very Hungry Caterpillar" value={bookTitle} onChange={e => setBookTitle(e.target.value)} />
              </label>
              <label style={labelStyle}>
                Book text (paste the full passage)
                <textarea
                  style={{ ...inputStyle, minHeight: 140, resize: 'vertical', lineHeight: 1.6 }}
                  placeholder="On Monday he ate through one apple. But he was still hungry..."
                  value={bookText}
                  onChange={e => setBookText(e.target.value)}
                />
                <span style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '0.25rem' }}>
                  {bookText.trim() ? `${bookText.trim().split(/\s+/).length} words` : ''}
                </span>
              </label>
              <button
                onClick={handleSetup}
                disabled={!readerName.trim() || !bookTitle.trim() || !bookText.trim()}
                style={btnPrimary}
              >
                Set up reading session →
              </button>
            </div>
          </div>
        )}

        {/* ── READY ── */}
        {phase === 'ready' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🎙️</div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.75rem' }}>
              Ready to listen
            </h2>
            <p style={{ color: '#666', marginBottom: '0.5rem', lineHeight: 1.6 }}>
              <strong>{readerName}</strong> is about to read <em>{bookTitle}</em>
            </p>
            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '3rem' }}>
              When you press Start, the microphone opens. Let the reader go at their own pace. Press Stop when they finish.
            </p>
            <button onClick={startRecording} style={{ ...btnPrimary, fontSize: '1.2rem', padding: '1rem 2.5rem' }}>
              ▶ Start Recording
            </button>
          </div>
        )}

        {/* ── RECORDING ── */}
        {phase === 'recording' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '2rem' }}>
              <div style={{
                width: 100, height: 100, borderRadius: '50%',
                background: '#ff4444',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2.5rem',
                boxShadow: '0 0 0 12px rgba(255,68,68,0.15), 0 0 0 24px rgba(255,68,68,0.07)',
                animation: 'pulse 1.5s ease-in-out infinite',
              }}>🎙️</div>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: '#1a1a1a', marginBottom: '0.5rem' }}>
              {fmt(elapsed)}
            </div>
            <p style={{ color: '#666', marginBottom: '3rem' }}>Listening to <strong>{readerName}</strong>…</p>

            {/* Book text visible for teacher to follow along */}
            <div style={{ background: '#fff', border: '1px solid #e8e4df', borderRadius: 16, padding: '1.5rem', textAlign: 'left', marginBottom: '2.5rem', lineHeight: 1.9, fontSize: '1.05rem', color: '#333', maxHeight: 220, overflowY: 'auto' }}>
              {bookText}
            </div>

            <button onClick={stopRecording} style={{ ...btnDanger, fontSize: '1.1rem', padding: '0.9rem 2.5rem' }}>
              ■ Stop Recording
            </button>

            <style>{`@keyframes pulse { 0%,100%{box-shadow:0 0 0 12px rgba(255,68,68,0.15),0 0 0 24px rgba(255,68,68,0.07)} 50%{box-shadow:0 0 0 16px rgba(255,68,68,0.2),0 0 0 32px rgba(255,68,68,0.05)} }`}</style>
          </div>
        )}

        {/* ── UPLOADING ── */}
        {phase === 'uploading' && (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>⬆️</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>Uploading audio…</h2>
            <p style={{ color: '#888' }}>Sending to AWS for analysis</p>
          </div>
        )}

        {/* ── PROCESSING ── */}
        {phase === 'processing' && (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1.5rem', animation: 'spin 2s linear infinite', display: 'inline-block' }}>🧠</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>Analysing reading…</h2>
            <p style={{ color: '#888', marginBottom: '0.5rem' }}>AWS Transcribe is processing the audio</p>
            <p style={{ color: '#aaa', fontSize: '0.85rem' }}>Aligning words · Classifying errors · Scoring MSV</p>
            <p style={{ color: '#ccc', fontSize: '0.8rem', marginTop: '1rem' }}>Usually 20–60 seconds</p>
            <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
          </div>
        )}

        {/* ── DONE ── */}
        {phase === 'done' && result && (() => {
          const band = BAND_COPY[result.accuracy_band]
          return (
            <div>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', color: '#c4773a', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Running Record Complete
              </p>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.25rem' }}>
                {readerName}'s Result
              </h2>
              <p style={{ color: '#888', marginBottom: '2.5rem', fontSize: '0.95rem' }}>{bookTitle}</p>

              {/* Accuracy band hero */}
              <div style={{ background: '#fff', border: '1.5px solid #e8e4df', borderRadius: 20, padding: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{band.emoji}</div>
                <div style={{ fontSize: '3rem', fontWeight: 900, color: '#1a1a1a', marginBottom: '0.25rem' }}>
                  {result.accuracy_pct}%
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.25rem' }}>{band.label}</div>
                <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.25rem' }}>{band.sub}</div>
                <div style={{ display: 'inline-block', background: '#f5f2ee', padding: '0.5rem 1.25rem', borderRadius: 30, fontWeight: 600, fontSize: '0.95rem', color: '#444' }}>
                  → {REC_COPY[result.recommendation]}
                </div>
              </div>

              {/* Stats grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                {[
                  { label: 'Words Read', value: result.total_words },
                  { label: 'Correct', value: result.words_correct },
                  { label: 'Errors', value: result.errors },
                ].map(s => (
                  <div key={s.label} style={{ background: '#fff', border: '1px solid #e8e4df', borderRadius: 14, padding: '1.25rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1a1a1a' }}>{s.value}</div>
                    <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.2rem' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {result.msv_errors_classified > 0 && (
                <div style={{ background: '#fff8f0', border: '1px solid #f0dcc8', borderRadius: 14, padding: '1.25rem', marginBottom: '2rem' }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c4773a', marginBottom: '0.5rem' }}>
                    MSV Error Classification
                  </p>
                  <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {result.msv_errors_classified} error{result.msv_errors_classified !== 1 ? 's' : ''} classified as Meaning, Syntax, or Visual. View the full breakdown in the teacher dashboard.
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={() => { setPhase('setup'); setReaderName(''); setBookTitle(''); setBookText(''); setResult(null) }} style={btnSecondary}>
                  New reading
                </button>
                <button onClick={() => { setPhase('ready') }} style={btnSecondary}>
                  Re-read same book
                </button>
              </div>
            </div>
          )
        })()}

        {/* ── ERROR ── */}
        {phase === 'error' && (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>⚠️</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>Something went wrong</h2>
            <p style={{ color: '#666', marginBottom: '2rem' }}>{error}</p>
            <button onClick={() => setPhase('setup')} style={btnPrimary}>Try again</button>
          </div>
        )}

      </main>
    </div>
  )
}

// ── Styles ─────────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', gap: '0.4rem',
  fontSize: '0.85rem', fontWeight: 600, color: '#333',
}

const inputStyle: React.CSSProperties = {
  padding: '0.85rem 1rem',
  border: '1.5px solid #e0dcd8',
  borderRadius: 12,
  fontSize: '1rem',
  fontFamily: 'DM Sans, sans-serif',
  background: '#fff',
  outline: 'none',
  color: '#1a1a1a',
  width: '100%',
  boxSizing: 'border-box',
}

const btnPrimary: React.CSSProperties = {
  background: '#1a1a1a', color: '#fff',
  border: 'none', borderRadius: 12,
  padding: '0.85rem 1.75rem',
  fontSize: '1rem', fontWeight: 700,
  cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
}

const btnSecondary: React.CSSProperties = {
  background: '#fff', color: '#1a1a1a',
  border: '1.5px solid #e0dcd8', borderRadius: 12,
  padding: '0.8rem 1.5rem',
  fontSize: '0.95rem', fontWeight: 600,
  cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
}

const btnDanger: React.CSSProperties = {
  background: '#ff4444', color: '#fff',
  border: 'none', borderRadius: 12,
  padding: '0.85rem 1.75rem',
  fontSize: '1rem', fontWeight: 700,
  cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
}
