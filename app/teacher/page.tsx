'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Nav from '../../components/Nav'
import Link from 'next/link'

interface Reader {
  reader_id: string
  full_name: string
  year_level: number | null
  current_profile_key: string | null
  reading_level_current: number | null
  accuracy_trend: string | null
  fluency_trend: string | null
  comprehension_trend: string | null
  dominant_error_type: string | null
  false_fluency_flag: boolean
  early_warning_active: boolean
  total_sessions: number
  open_warnings: number
  pending_interventions: number
  last_session_date: string | null
  avg_accuracy_pct: number | null
  avg_fluency_wpm: number | null
  avg_comprehension: number | null
}

interface RunningRecord {
  running_record_id: string
  full_name: string
  year_level: number | null
  session_date: string
  text_title: string
  accuracy_pct: number | null
  accuracy_band: string | null
  fluency_wpm: number | null
  fluency_rating: string | null
  comprehension_score_overall: number | null
  progression_recommendation: string | null
  total_errors: number
  meaning_errors: number
  syntax_errors: number
  visual_errors: number
  warnings_raised: number
}

const BAND_COLOUR: Record<string, string> = {
  EASY: '#d4edda', INSTRUCTIONAL: '#fff3cd', HARD: '#f8d7da'
}
const BAND_LABEL: Record<string, string> = {
  EASY: '🟢 Easy', INSTRUCTIONAL: '🟡 Just Right', HARD: '🔴 Hard'
}
const TREND: Record<string, string> = {
  IMPROVING: '↑', STABLE: '→', DECLINING: '↓', MEANING: 'M', SYNTAX: 'S', VISUAL: 'V', MIXED: 'MSV'
}

export default function TeacherDashboard() {
  const [readers, setReaders]   = useState<Reader[]>([])
  const [records, setRecords]   = useState<RunningRecord[]>([])
  const [tab, setTab]           = useState<'readers'|'records'|'warnings'>('readers')
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const [{ data: r }, { data: rr }] = await Promise.all([
        supabase.from('v_rb_reader_dashboard').select('*').order('open_warnings', { ascending: false }),
        supabase.from('v_rb_running_record_summary').select('*').order('session_date', { ascending: false }).limit(50),
      ])
      setReaders(r || [])
      setRecords(rr || [])
      setLoading(false)
    }
    load()
    // Realtime: refresh on any rb_ change
    const sub = supabase.channel('rb-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rb_audio_capture' }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rb_running_record' }, load)
      .subscribe()
    return () => { supabase.removeChannel(sub) }
  }, [])

  const filteredReaders = readers.filter(r =>
    r.full_name.toLowerCase().includes(search.toLowerCase())
  )
  const filteredRecords = records.filter(r =>
    r.full_name.toLowerCase().includes(search.toLowerCase())
  )
  const warningReaders = readers.filter(r => r.early_warning_active || r.open_warnings > 0)

  const badge = (n: number, colour: string) => n > 0 ? (
    <span style={{ background: colour, color: '#fff', borderRadius: 20, padding: '0.15rem 0.5rem', fontSize: '0.75rem', fontWeight: 700, marginLeft: 6 }}>{n}</span>
  ) : null

  return (
    <div style={{ minHeight: '100vh', background: '#faf7f2', fontFamily: 'DM Sans, sans-serif' }}>
      <Nav />
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 1.5rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: '#4a7c59', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Teacher Dashboard</p>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1a1a1a', fontFamily: 'Fraunces, serif' }}>Reading Records</h1>
          </div>
          <Link href="/read" style={{ background: '#4a7c59', color: '#fff', padding: '0.7rem 1.5rem', borderRadius: 50, fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>
            🎙️ New Recording
          </Link>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Readers', value: readers.length, colour: '#4a7c59' },
            { label: 'Total Sessions', value: readers.reduce((a, r) => a + r.total_sessions, 0), colour: '#2d5a3d' },
            { label: 'Open Warnings', value: readers.reduce((a, r) => a + r.open_warnings, 0), colour: '#c0392b' },
            { label: 'Pending Actions', value: readers.reduce((a, r) => a + r.pending_interventions, 0), colour: '#d68910' },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', border: '1px solid #e8e2d9', borderRadius: 14, padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: s.colour }}>{loading ? '—' : s.value}</div>
              <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.2rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by reader name…"
          style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #e8e2d9', borderRadius: 10, fontSize: '0.95rem', marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif', outline: 'none' }}
        />

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem', background: '#f0ebe3', borderRadius: 12, padding: '0.25rem', width: 'fit-content' }}>
          {([['readers','Readers'],['records','Running Records'],['warnings','Warnings']] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              style={{ padding: '0.5rem 1.25rem', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: tab === key ? 700 : 400, background: tab === key ? '#fff' : 'transparent', color: '#1a1a1a', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif' }}>
              {label}
              {key === 'warnings' && badge(warningReaders.length, '#c0392b')}
            </button>
          ))}
        </div>

        {loading && <p style={{ color: '#888', textAlign: 'center', padding: '3rem' }}>Loading…</p>}

        {/* ── READERS TAB ── */}
        {!loading && tab === 'readers' && (
          <div style={{ background: '#fff', border: '1px solid #e8e2d9', borderRadius: 16, overflow: 'hidden' }}>
            {filteredReaders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📚</div>
                <p>No readers yet. <Link href="/read" style={{ color: '#4a7c59', fontWeight: 600 }}>Record the first one →</Link></p>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: '#f8f5f0', borderBottom: '1px solid #e8e2d9' }}>
                    {['Reader','Yr','Sessions','Avg Acc%','Accuracy','Fluency','Comp','Dominant Error','Flags'].map(h => (
                      <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#555', fontSize: '0.8rem' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredReaders.map((r, i) => (
                    <tr key={r.reader_id} style={{ borderBottom: '1px solid #f0ebe3', background: i % 2 === 0 ? '#fff' : '#fdfcfa' }}>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#1a1a1a' }}>
                        {r.full_name}
                        {r.early_warning_active && <span title="Early warning active" style={{ marginLeft: 6, fontSize: '0.8rem' }}>⚠️</span>}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', color: '#666' }}>{r.year_level ?? '—'}</td>
                      <td style={{ padding: '0.75rem 1rem', color: '#666' }}>{r.total_sessions}</td>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: r.avg_accuracy_pct && r.avg_accuracy_pct >= 95 ? '#2d8653' : r.avg_accuracy_pct && r.avg_accuracy_pct >= 90 ? '#b7860b' : '#c0392b' }}>
                        {r.avg_accuracy_pct != null ? `${r.avg_accuracy_pct}%` : '—'}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', color: '#555' }}>{r.accuracy_trend ? TREND[r.accuracy_trend] || r.accuracy_trend : '—'}</td>
                      <td style={{ padding: '0.75rem 1rem', color: '#555' }}>{r.fluency_trend ? TREND[r.fluency_trend] || r.fluency_trend : '—'}</td>
                      <td style={{ padding: '0.75rem 1rem', color: '#555' }}>{r.comprehension_trend ? TREND[r.comprehension_trend] || r.comprehension_trend : '—'}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        {r.dominant_error_type ? (
                          <span style={{ background: '#fff3cd', color: '#856404', padding: '0.2rem 0.6rem', borderRadius: 12, fontSize: '0.75rem', fontWeight: 600 }}>
                            {TREND[r.dominant_error_type] || r.dominant_error_type}
                          </span>
                        ) : '—'}
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        {r.open_warnings > 0 && badge(r.open_warnings, '#c0392b')}
                        {r.pending_interventions > 0 && badge(r.pending_interventions, '#d68910')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ── RECORDS TAB ── */}
        {!loading && tab === 'records' && (
          <div style={{ background: '#fff', border: '1px solid #e8e2d9', borderRadius: 16, overflow: 'hidden' }}>
            {filteredRecords.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
                <p>No running records yet.</p>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: '#f8f5f0', borderBottom: '1px solid #e8e2d9' }}>
                    {['Date','Reader','Yr','Book','Accuracy','Band','WPM','Comp','M','S','V','Next Step'].map(h => (
                      <th key={h} style={{ padding: '0.75rem 0.75rem', textAlign: 'left', fontWeight: 600, color: '#555', fontSize: '0.8rem' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((rr, i) => (
                    <tr key={rr.running_record_id} style={{ borderBottom: '1px solid #f0ebe3', background: i % 2 === 0 ? '#fff' : '#fdfcfa' }}>
                      <td style={{ padding: '0.75rem 0.75rem', color: '#666', whiteSpace: 'nowrap' }}>{rr.session_date}</td>
                      <td style={{ padding: '0.75rem 0.75rem', fontWeight: 600 }}>{rr.full_name}</td>
                      <td style={{ padding: '0.75rem 0.75rem', color: '#666' }}>{rr.year_level ?? '—'}</td>
                      <td style={{ padding: '0.75rem 0.75rem', color: '#555', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{rr.text_title}</td>
                      <td style={{ padding: '0.75rem 0.75rem', fontWeight: 700, color: rr.accuracy_pct && rr.accuracy_pct >= 95 ? '#2d8653' : rr.accuracy_pct && rr.accuracy_pct >= 90 ? '#b7860b' : '#c0392b' }}>
                        {rr.accuracy_pct != null ? `${rr.accuracy_pct}%` : '—'}
                      </td>
                      <td style={{ padding: '0.75rem 0.75rem' }}>
                        {rr.accuracy_band ? (
                          <span style={{ background: BAND_COLOUR[rr.accuracy_band] || '#eee', padding: '0.2rem 0.5rem', borderRadius: 10, fontSize: '0.75rem', fontWeight: 600 }}>
                            {BAND_LABEL[rr.accuracy_band] || rr.accuracy_band}
                          </span>
                        ) : '—'}
                      </td>
                      <td style={{ padding: '0.75rem 0.75rem', color: '#555' }}>{rr.fluency_wpm != null ? Math.round(rr.fluency_wpm) : '—'}</td>
                      <td style={{ padding: '0.75rem 0.75rem', color: '#555' }}>{rr.comprehension_score_overall != null ? `${rr.comprehension_score_overall}%` : '—'}</td>
                      <td style={{ padding: '0.75rem 0.75rem', color: '#c0392b', fontWeight: 600 }}>{rr.meaning_errors || 0}</td>
                      <td style={{ padding: '0.75rem 0.75rem', color: '#d68910', fontWeight: 600 }}>{rr.syntax_errors || 0}</td>
                      <td style={{ padding: '0.75rem 0.75rem', color: '#2980b9', fontWeight: 600 }}>{rr.visual_errors || 0}</td>
                      <td style={{ padding: '0.75rem 0.75rem' }}>
                        {rr.progression_recommendation ? (
                          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: rr.progression_recommendation === 'MOVE_UP' ? '#2d8653' : rr.progression_recommendation === 'MOVE_DOWN' ? '#c0392b' : '#555' }}>
                            {rr.progression_recommendation === 'MOVE_UP' ? '↑ Advance' : rr.progression_recommendation === 'MOVE_DOWN' ? '↓ Step back' : '→ Stay'}
                          </span>
                        ) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ── WARNINGS TAB ── */}
        {!loading && tab === 'warnings' && (
          <div>
            {warningReaders.length === 0 ? (
              <div style={{ background: '#fff', border: '1px solid #e8e2d9', borderRadius: 16, padding: '4rem', textAlign: 'center', color: '#888' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✅</div>
                <p>No active warnings. All readers are on track.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {warningReaders.map(r => (
                  <div key={r.reader_id} style={{ background: '#fff', border: '1.5px solid #f8d7da', borderRadius: 14, padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>⚠️ {r.full_name}</span>
                        {r.year_level && <span style={{ color: '#888', fontSize: '0.85rem', marginLeft: 8 }}>Year {r.year_level}</span>}
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {badge(r.open_warnings, '#c0392b')}
                        {badge(r.pending_interventions, '#d68910')}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem', fontSize: '0.85rem', color: '#555', flexWrap: 'wrap' }}>
                      {r.avg_accuracy_pct != null && <span>Avg accuracy: <strong>{r.avg_accuracy_pct}%</strong></span>}
                      {r.dominant_error_type && <span>Dominant error: <strong>{r.dominant_error_type}</strong></span>}
                      {r.false_fluency_flag && <span style={{ color: '#c0392b', fontWeight: 600 }}>False fluency detected</span>}
                      {r.last_session_date && <span>Last session: <strong>{r.last_session_date}</strong></span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  )
}
