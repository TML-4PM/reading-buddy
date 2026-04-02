'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'
import dynamic from 'next/dynamic'

const RewardDisplay = dynamic(() => import('../../components/RewardDisplay'), { ssr: false })

type Phase = 'setup' | 'ready' | 'recording' | 'uploading' | 'processing' | 'done' | 'error'
type BuddyKey = 'spark' | 'luna' | 'pip' | 'nova'
interface RunResult {
  accuracy_pct: number; words_correct: number; total_words: number
  errors: number; msv_errors_classified: number
  accuracy_band: 'EASY'|'INSTRUCTIONAL'|'HARD'
  recommendation: 'MOVE_UP'|'STAY'|'MOVE_DOWN'
}
interface RewardResult { stars: 1|2|3; streak: number; newAchievements: string[] }

const BAND_COPY = {
  EASY:          { emoji:'🟢', label:'Too Easy',      sub:'Ready for the next level' },
  INSTRUCTIONAL: { emoji:'🟡', label:'Just Right',    sub:'Ideal learning zone' },
  HARD:          { emoji:'🔴', label:'Too Difficult', sub:'Step back one level' },
}
const REC_COPY = { MOVE_UP:'Move up a level', STAY:'Continue at this level', MOVE_DOWN:'Drop back a level' }

const BUDDY_SVG: Record<BuddyKey,string> = {
  spark: '<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><rect width="72" height="72" fill="#FFF3DC"/><ellipse cx="36" cy="54" rx="18" ry="14" fill="#E8762B"/><circle cx="36" cy="32" r="18" fill="#E8762B"/><polygon points="20,20 14,8 28,18" fill="#E8762B"/><polygon points="52,20 58,8 44,18" fill="#E8762B"/><polygon points="21,19 15,10 27,18" fill="#F5A07A"/><polygon points="51,19 57,10 45,18" fill="#F5A07A"/><ellipse cx="36" cy="36" rx="11" ry="9" fill="#FDE8C8"/><circle cx="30" cy="29" r="3" fill="white"/><circle cx="42" cy="29" r="3" fill="white"/><circle cx="31" cy="29" r="1.5" fill="#1A2340"/><circle cx="43" cy="29" r="1.5" fill="#1A2340"/><path d="M32 38 Q36 42 40 38" stroke="#1A2340" stroke-width="1.2" fill="none" stroke-linecap="round"/></svg>',
  luna:  '<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><rect width="72" height="72" fill="#EAF5FF"/><ellipse cx="36" cy="30" rx="20" ry="18" fill="#8B7EC8"/><path d="M20 44 Q14 52 18 60 Q22 52 24 46" fill="#8B7EC8"/><path d="M27 48 Q24 58 28 64 Q30 54 30 48" fill="#8B7EC8"/><path d="M36 50 Q36 60 36 66 Q38 58 38 50" fill="#8B7EC8"/><path d="M45 48 Q48 58 44 64 Q44 54 42 48" fill="#8B7EC8"/><path d="M52 44 Q58 52 54 60 Q50 52 48 46" fill="#8B7EC8"/><ellipse cx="36" cy="32" rx="13" ry="11" fill="#BEB3E8"/><circle cx="29" cy="26" r="4" fill="white"/><circle cx="43" cy="26" r="4" fill="white"/><circle cx="30" cy="26" r="2" fill="#1A2340"/><circle cx="44" cy="26" r="2" fill="#1A2340"/><path d="M30 35 Q36 40 42 35" stroke="#1A2340" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>',
  pip:   '<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><rect width="72" height="72" fill="#F0F8E8"/><ellipse cx="36" cy="54" rx="16" ry="13" fill="#C4904A"/><circle cx="36" cy="32" r="18" fill="#C4904A"/><circle cx="20" cy="18" r="7" fill="#C4904A"/><circle cx="52" cy="18" r="7" fill="#C4904A"/><circle cx="20" cy="18" r="4" fill="#E8B070"/><circle cx="52" cy="18" r="4" fill="#E8B070"/><ellipse cx="36" cy="37" rx="10" ry="7" fill="#E8B070"/><circle cx="29" cy="29" r="3.5" fill="white"/><circle cx="43" cy="29" r="3.5" fill="white"/><circle cx="30" cy="29" r="1.8" fill="#1A2340"/><circle cx="44" cy="29" r="1.8" fill="#1A2340"/><path d="M31 39 Q36 43 41 39" stroke="#1A2340" stroke-width="1.2" fill="none" stroke-linecap="round"/></svg>',
  nova:  '<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><rect width="72" height="72" fill="#FFF0F8"/><ellipse cx="22" cy="30" rx="15" ry="18" fill="#F06090" opacity="0.85" transform="rotate(-20,22,30)"/><ellipse cx="50" cy="30" rx="15" ry="18" fill="#F06090" opacity="0.85" transform="rotate(20,50,30)"/><ellipse cx="36" cy="36" rx="5" ry="14" fill="#7A3090"/><circle cx="36" cy="20" r="7" fill="#7A3090"/><circle cx="33" cy="18" r="2.5" fill="white"/><circle cx="39" cy="18" r="2.5" fill="white"/><circle cx="33.5" cy="18" r="1.2" fill="#1A2340"/><circle cx="39.5" cy="18" r="1.2" fill="#1A2340"/><path d="M32 23 Q36 27 40 23" stroke="#1A2340" stroke-width="1" fill="none" stroke-linecap="round"/></svg>',
}
const BUDDY_COLOR: Record<BuddyKey,string> = { spark:'#E8762B', luna:'#8B7EC8', pip:'#C4904A', nova:'#F06090' }
const BUDDY_LABEL: Record<BuddyKey,string> = { spark:'Spark', luna:'Luna', pip:'Pip', nova:'Nova' }

export default function ReadPage() {
  const [phase, setPhase]                     = useState<Phase>('setup')
  const [readerName, setReaderName]           = useState('')
  const [readerId, setReaderId]               = useState<string|null>(null)
  const [bookTitle, setBookTitle]             = useState('')
  const [bookText, setBookText]               = useState('')
  const [selectedBuddy, setSelectedBuddy]     = useState<BuddyKey>('spark')
  const [runningRecordId, setRunningRecordId] = useState<string|null>(null)
  const [captureId, setCaptureId]             = useState<string|null>(null)
  const [elapsed, setElapsed]                 = useState(0)
  const [result, setResult]                   = useState<RunResult|null>(null)
  const [reward, setReward]                   = useState<RewardResult|null>(null)
  const [showReward, setShowReward]           = useState(false)
  const [error, setError]                     = useState('')
  const [pollCount, setPollCount]             = useState(0)

  const mediaRecorderRef = useRef<MediaRecorder|null>(null)
  const chunksRef        = useRef<Blob[]>([])
  const timerRef         = useRef<ReturnType<typeof setInterval>|null>(null)
  const startTimeRef     = useRef<number>(0)

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const genUUID = () => crypto.randomUUID()
  const fmt = (s: number) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`

  const handleSetup = async () => {
    if (!readerName.trim() || !bookTitle.trim() || !bookText.trim()) return
    setPhase('ready')
    const newReaderId = genUUID()
    const newRunId    = genUUID()
    setReaderId(newReaderId)
    setRunningRecordId(newRunId)
    await supabase.from('rb_reader_profile').upsert({ reader_id: newReaderId, full_name: readerName.trim() }, { onConflict: 'reader_id' })
    await supabase.from('rb_running_record').insert({ running_record_id: newRunId, reader_id: newReaderId, text_title: bookTitle.trim(), word_count_total: bookText.trim().split(/\s+/).length, is_unseen_text: true, ai_assist_used: true })
  }

  const startRecording = async () => {
    chunksRef.current = []
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : MediaRecorder.isTypeSupported('audio/mp4') ? 'audio/mp4' : 'audio/webm'
      const recorder = new MediaRecorder(stream, { mimeType })
      mediaRecorderRef.current = recorder
      recorder.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      recorder.start(250)
      startTimeRef.current = Date.now()
      timerRef.current = setInterval(() => setElapsed(Math.floor((Date.now()-startTimeRef.current)/1000)), 1000)
      setPhase('recording')
    } catch { setError('Microphone access denied.'); setPhase('error') }
  }

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    const recorder = mediaRecorderRef.current
    if (!recorder) return
    recorder.onstop = async () => { const blob = new Blob(chunksRef.current, { type: recorder.mimeType }); await uploadAndProcess(blob, recorder.mimeType, elapsed) }
    recorder.stop()
    recorder.stream.getTracks().forEach(t => t.stop())
    setPhase('uploading')
  }

  const uploadAndProcess = useCallback(async (blob: Blob, mimeType: string, durationSec: number) => {
    if (!readerId || !runningRecordId) return
    const newCaptureId = genUUID()
    setCaptureId(newCaptureId)
    try {
      const { presigned_url, s3_key } = await (await fetch('/api/read/presign', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ capture_id: newCaptureId, running_record_id: runningRecordId, reader_id: readerId, content_type: mimeType }) })).json()
      await fetch(presigned_url, { method:'PUT', headers:{'Content-Type':mimeType}, body: blob })
      await fetch('/api/read/process', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ capture_id: newCaptureId, running_record_id: runningRecordId, reader_id: readerId, s3_key, book_text: bookText, duration_ms: durationSec*1000 }) })
      setPhase('processing'); setPollCount(0)
    } catch { setError('Upload failed.'); setPhase('error') }
  }, [readerId, runningRecordId, bookText])

  useEffect(() => {
    if (phase !== 'processing' || !captureId) return
    const interval = setInterval(async () => {
      setPollCount(c => c+1)
      const { data } = await supabase.from('rb_audio_capture').select('processing_status').eq('capture_id', captureId).single()
      if (data?.processing_status === 'COMPLETE') {
        clearInterval(interval)
        const [rrRes, msvRes] = await Promise.all([
          supabase.from('rb_running_record').select('words_correct,words_attempted,accuracy_pct,accuracy_band,progression_recommendation').eq('running_record_id', runningRecordId).single(),
          supabase.from('rb_msv_classification').select('msv_id', { count:'exact', head:true }).eq('running_record_id', runningRecordId),
        ])
        const rr = rrRes.data
        setResult({ accuracy_pct: rr?.accuracy_pct??0, words_correct: rr?.words_correct??0, total_words: rr?.words_attempted??0, errors: (rr?.words_attempted??0)-(rr?.words_correct??0), msv_errors_classified: (msvRes as any)?.count??0, accuracy_band: (rr?.accuracy_band as RunResult['accuracy_band'])?? 'INSTRUCTIONAL', recommendation: (rr?.progression_recommendation as RunResult['recommendation'])?? 'STAY' })
        setPhase('done')
        // ── REWARD CALL ────────────────────────────────────────────────────
        try {
          const rwRes = await fetch('/api/read/reward', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ running_record_id: runningRecordId, reader_id: readerId, buddy: selectedBuddy }) })
          if (rwRes.ok) {
            const rw = await rwRes.json()
            setReward({ stars: rw.stars as 1|2|3, streak: rw.streak, newAchievements: rw.newAchievements })
            setTimeout(() => setShowReward(true), 600)
          }
        } catch { /* non-fatal */ }
      } else if (data?.processing_status === 'FAILED') {
        clearInterval(interval); setError('Processing failed.'); setPhase('error')
      }
      if (pollCount > 30) { clearInterval(interval); setError('Processing timed out.'); setPhase('error') }
    }, 3000)
    return () => clearInterval(interval)
  }, [phase, captureId, pollCount, runningRecordId, readerId, selectedBuddy, supabase])

  const reset = () => { setPhase('setup'); setReaderName(''); setBookTitle(''); setBookText(''); setResult(null); setReward(null); setShowReward(false) }
  const buddyColor = BUDDY_COLOR[selectedBuddy]

  return (
    <div style={{ minHeight:'100vh', background:'#fafaf8', fontFamily:'DM Sans, sans-serif' }}>
      {showReward && reward && <RewardDisplay stars={reward.stars} streak={reward.streak} newAchievements={reward.newAchievements} buddyKey={selectedBuddy} onClose={() => setShowReward(false)} />}
      <nav style={{ padding:'1.2rem 2rem', borderBottom:'1px solid #e8e4df', display:'flex', alignItems:'center', gap:'0.75rem' }}>
        <span style={{ fontSize:'1.4rem' }}>📚</span>
        <span style={{ fontWeight:700, fontSize:'1.1rem' }}>Reading Buddy</span>
        <span style={{ marginLeft:'auto', fontSize:'0.8rem', color:'#888', background:'#f0ede8', padding:'0.25rem 0.75rem', borderRadius:20 }}>AI Running Record</span>
      </nav>
      <main style={{ maxWidth:640, margin:'0 auto', padding:'3rem 1.5rem' }}>

        {phase === 'setup' && (
          <div>
            <p style={{ fontSize:'0.8rem', fontWeight:700, letterSpacing:'0.1em', color:'#c4773a', textTransform:'uppercase', marginBottom:'0.5rem' }}>New Reading Session</p>
            <h1 style={{ fontSize:'2rem', fontWeight:800, marginBottom:'0.5rem', lineHeight:1.2 }}>Who's reading today?</h1>
            <p style={{ color:'#666', marginBottom:'2rem', lineHeight:1.6 }}>Choose a buddy, paste the book text — the AI scores, gives stars, and tracks streaks automatically.</p>
            <div style={{ marginBottom:'1.5rem' }}>
              <div style={{ fontSize:'0.78rem', fontWeight:700, color:'#888', marginBottom:'0.6rem' }}>Choose your reading buddy</div>
              <div style={{ display:'flex', gap:14 }}>
                {(['spark','luna','pip','nova'] as BuddyKey[]).map(b => (
                  <div key={b} onClick={() => setSelectedBuddy(b)} style={{ cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
                    <div style={{ width:58, height:58, borderRadius:'50%', overflow:'hidden', border:`3px solid ${selectedBuddy===b ? BUDDY_COLOR[b] : '#e0dcd8'}`, boxShadow: selectedBuddy===b ? `0 0 0 3px ${BUDDY_COLOR[b]}33` : 'none', transition:'all 0.2s' }} dangerouslySetInnerHTML={{ __html: BUDDY_SVG[b] }} />
                    <span style={{ fontSize:'0.68rem', fontWeight:700, color: selectedBuddy===b ? BUDDY_COLOR[b] : '#bbb' }}>{BUDDY_LABEL[b]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
              <label style={LS}>Reader's name<input style={IS} placeholder="e.g. Lila" value={readerName} onChange={e => setReaderName(e.target.value)} /></label>
              <label style={LS}>Book title<input style={IS} placeholder="e.g. Duck in the Mud" value={bookTitle} onChange={e => setBookTitle(e.target.value)} /></label>
              <label style={LS}>Book text (paste full passage)<textarea style={{ ...IS, minHeight:130, resize:'vertical', lineHeight:1.6 }} placeholder="On Monday he ate through one apple..." value={bookText} onChange={e => setBookText(e.target.value)} /><span style={{ fontSize:'0.75rem', color:'#aaa' }}>{bookText.trim() ? `${bookText.trim().split(/\s+/).length} words` : ''}</span></label>
              <button onClick={handleSetup} disabled={!readerName.trim()||!bookTitle.trim()||!bookText.trim()} style={BP}>Set up session with {BUDDY_LABEL[selectedBuddy]} →</button>
            </div>
          </div>
        )}

        {phase === 'ready' && (
          <div style={{ textAlign:'center' }}>
            <div style={{ width:88, height:88, borderRadius:'50%', overflow:'hidden', margin:'0 auto 1.5rem', border:`3px solid ${buddyColor}` }} dangerouslySetInnerHTML={{ __html: BUDDY_SVG[selectedBuddy] }} />
            <h2 style={{ fontSize:'1.8rem', fontWeight:800, marginBottom:'0.5rem' }}>Ready to listen</h2>
            <p style={{ color:'#666', marginBottom:'0.5rem' }}><strong>{readerName}</strong> is reading <em>{bookTitle}</em> with <strong>{BUDDY_LABEL[selectedBuddy]}</strong></p>
            <p style={{ color:'#888', fontSize:'0.9rem', marginBottom:'3rem' }}>Press Start, let the reader go at their own pace, press Stop when done.</p>
            <button onClick={startRecording} style={{ ...BP, fontSize:'1.2rem', padding:'1rem 2.5rem' }}>▶ Start Recording</button>
          </div>
        )}

        {phase === 'recording' && (
          <div style={{ textAlign:'center' }}>
            <div style={{ width:100, height:100, borderRadius:'50%', background:'#ff4444', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2.5rem', margin:'0 auto 1rem', boxShadow:'0 0 0 12px rgba(255,68,68,0.15)', animation:'pulse 1.5s ease-in-out infinite' }}>🎙️</div>
            <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:10, marginBottom:'0.5rem' }}>
              <div style={{ width:36, height:36, borderRadius:'50%', overflow:'hidden' }} dangerouslySetInnerHTML={{ __html: BUDDY_SVG[selectedBuddy] }} />
              <span style={{ fontSize:'2.5rem', fontWeight:800, fontVariantNumeric:'tabular-nums' }}>{fmt(elapsed)}</span>
            </div>
            <p style={{ color:'#666', marginBottom:'2rem' }}>Listening to <strong>{readerName}</strong>…</p>
            <div style={{ background:'#fff', border:'1px solid #e8e4df', borderRadius:14, padding:'1.5rem', textAlign:'left', marginBottom:'2rem', lineHeight:1.9, maxHeight:200, overflowY:'auto' }}>{bookText}</div>
            <button onClick={stopRecording} style={{ ...BD, fontSize:'1.1rem', padding:'0.9rem 2.5rem' }}>■ Stop Recording</button>
            <style>{`@keyframes pulse{0%,100%{box-shadow:0 0 0 12px rgba(255,68,68,0.15)}50%{box-shadow:0 0 0 20px rgba(255,68,68,0.08)}}`}</style>
          </div>
        )}

        {phase === 'uploading' && <div style={{ textAlign:'center', padding:'4rem 0' }}><div style={{ fontSize:'3rem', marginBottom:'1.5rem' }}>⬆️</div><h2 style={{ fontSize:'1.5rem', fontWeight:700 }}>Uploading…</h2><p style={{ color:'#888' }}>Sending to AWS</p></div>}

        {phase === 'processing' && <div style={{ textAlign:'center', padding:'4rem 0' }}><div style={{ fontSize:'3rem', marginBottom:'1rem', animation:'spin 2s linear infinite', display:'inline-block' }}>🧠</div><h2 style={{ fontSize:'1.5rem', fontWeight:700, marginBottom:'0.75rem' }}>Analysing…</h2><p style={{ color:'#888' }}>Scoring · Classifying errors · Calculating stars</p><style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style></div>}

        {phase === 'done' && result && (() => {
          const band = BAND_COPY[result.accuracy_band]
          return (
            <div>
              <p style={{ fontSize:'0.8rem', fontWeight:700, letterSpacing:'0.1em', color:'#c4773a', textTransform:'uppercase', marginBottom:'0.5rem' }}>Complete</p>
              <h2 style={{ fontSize:'1.8rem', fontWeight:800, marginBottom:'0.25rem' }}>{readerName}'s Result</h2>
              <p style={{ color:'#888', marginBottom:'1.5rem', fontSize:'0.95rem' }}>{bookTitle}</p>
              {reward && <div style={{ display:'flex', justifyContent:'center', gap:8, marginBottom:'1rem' }}>{[1,2,3].map(s=><span key={s} style={{ fontSize:'2.2rem', filter:s<=reward.stars?'none':'grayscale(1) opacity(0.2)' }}>⭐</span>)}</div>}
              {reward?.streak > 1 && <div style={{ display:'flex', justifyContent:'center', marginBottom:'1rem' }}><span style={{ background:'#FFF3E0', border:'1.5px solid #F5A623', borderRadius:40, padding:'5px 14px', fontSize:'0.83rem', fontWeight:700, color:'#B36A00' }}>🔥 {reward.streak} day streak!</span></div>}
              <div style={{ background:'#fff', border:'1.5px solid #e8e4df', borderRadius:20, padding:'2rem', marginBottom:'1.5rem', textAlign:'center' }}>
                <div style={{ fontSize:'3rem', marginBottom:'0.5rem' }}>{band.emoji}</div>
                <div style={{ fontSize:'2.8rem', fontWeight:900, marginBottom:'0.25rem' }}>{result.accuracy_pct}%</div>
                <div style={{ fontSize:'1.1rem', fontWeight:700, marginBottom:'0.25rem' }}>{band.label}</div>
                <div style={{ color:'#888', fontSize:'0.9rem', marginBottom:'1rem' }}>{band.sub}</div>
                <div style={{ display:'inline-block', background:'#f5f2ee', padding:'0.5rem 1.25rem', borderRadius:30, fontWeight:600, color:'#444' }}>→ {REC_COPY[result.recommendation]}</div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'1rem', marginBottom:'1.5rem' }}>
                {[['Words',result.total_words],['Correct',result.words_correct],['Errors',result.errors]].map(([l,v])=>(
                  <div key={l as string} style={{ background:'#fff', border:'1px solid #e8e4df', borderRadius:14, padding:'1.25rem', textAlign:'center' }}>
                    <div style={{ fontSize:'1.8rem', fontWeight:800 }}>{v}</div>
                    <div style={{ fontSize:'0.8rem', color:'#888' }}>{l}</div>
                  </div>
                ))}
              </div>
              {reward && <div style={{ display:'flex', justifyContent:'center', marginBottom:'1rem' }}><button onClick={() => setShowReward(true)} style={{ ...BS, display:'flex', alignItems:'center', gap:6 }}>⭐ Show reward again</button></div>}
              <div style={{ display:'flex', gap:'1rem' }}>
                <button onClick={reset} style={BS}>New reading</button>
                <button onClick={() => setPhase('ready')} style={BS}>Re-read same book</button>
              </div>
            </div>
          )
        })()}

        {phase === 'error' && <div style={{ textAlign:'center', padding:'3rem 0' }}><div style={{ fontSize:'3rem', marginBottom:'1.5rem' }}>⚠️</div><h2 style={{ fontSize:'1.5rem', fontWeight:700, marginBottom:'0.75rem' }}>Something went wrong</h2><p style={{ color:'#666', marginBottom:'2rem' }}>{error}</p><button onClick={reset} style={BP}>Try again</button></div>}
      </main>
    </div>
  )
}

const LS: React.CSSProperties = { display:'flex', flexDirection:'column', gap:'0.4rem', fontSize:'0.85rem', fontWeight:600, color:'#333' }
const IS: React.CSSProperties = { padding:'0.85rem 1rem', border:'1.5px solid #e0dcd8', borderRadius:12, fontSize:'1rem', fontFamily:'DM Sans,sans-serif', background:'#fff', outline:'none', color:'#1a1a1a', width:'100%', boxSizing:'border-box' }
const BP: React.CSSProperties = { background:'#1a1a1a', color:'#fff', border:'none', borderRadius:12, padding:'0.85rem 1.75rem', fontSize:'1rem', fontWeight:700, cursor:'pointer', fontFamily:'DM Sans,sans-serif' }
const BS: React.CSSProperties = { background:'#fff', color:'#1a1a1a', border:'1.5px solid #e0dcd8', borderRadius:12, padding:'0.8rem 1.5rem', fontSize:'0.95rem', fontWeight:600, cursor:'pointer', fontFamily:'DM Sans,sans-serif' }
const BD: React.CSSProperties = { background:'#ff4444', color:'#fff', border:'none', borderRadius:12, padding:'0.85rem 1.75rem', fontSize:'1rem', fontWeight:700, cursor:'pointer', fontFamily:'DM Sans,sans-serif' }
