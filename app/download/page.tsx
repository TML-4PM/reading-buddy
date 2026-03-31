'use client'

import { useState } from 'react'

const REPORTS: Record<string, {
  title: string
  subtitle: string
  icon: string
  accent: string
  desc: string
  pdfKey: string
}> = {
  classroom: {
    title: 'Sample Session Summary',
    subtitle: 'In the Classroom',
    icon: '🏫',
    accent: '#1a2e4a',
    desc: 'WPM, accuracy, prosody, observations, AI recommendations — one real session, auto-generated.',
    pdfKey: 'rb-sample-session-report.pdf',
  },
  clinic: {
    title: 'Sample NDIS Progress Note',
    subtitle: 'In the Clinic',
    icon: '🎯',
    accent: '#1a4a3a',
    desc: 'Goal-referenced, Practice Standards compliant, timestamped. Generated in under 60 seconds.',
    pdfKey: 'rb-sample-ndis-progress-note.pdf',
  },
  home: {
    title: 'Sample Parent Snapshot',
    subtitle: 'At Home',
    icon: '🏠',
    accent: '#4a2a7a',
    desc: 'Plain-English reading report for parents. Auto-sent. No jargon, no effort from the teacher.',
    pdfKey: 'rb-sample-parent-snapshot.pdf',
  },
  school: {
    title: 'Sample Class Health Report',
    subtitle: 'Across the School',
    icon: '📊',
    accent: '#7a3a1a',
    desc: 'Every student in one view — on track, needs support, urgent review. NAPLAN-ready.',
    pdfKey: 'rb-sample-class-health-report.pdf',
  },
}

const SUPABASE_BASE = 'https://lzfgigiyqpuuxslsygjt.supabase.co/storage/v1/object/public/or-public/reading-buddy/'

export default function DownloadPage({ searchParams }: { searchParams: { type?: string } }) {
  const type = searchParams?.type || 'classroom'
  const report = REPORTS[type] || REPORTS.classroom

  const [email, setEmail] = useState('')
  const [name, setName]   = useState('')
  const [role, setRole]   = useState('')
  const [done, setDone]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const pdfUrl = SUPABASE_BASE + report.pdfKey

  async function handleSubmit() {
    if (!email || !email.includes('@')) { setError('Please enter a valid email.'); return }
    if (!name) { setError('Please enter your name.'); return }
    setLoading(true); setError('')
    try {
      await fetch('/api/download-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, role, report_type: type }),
      })
    } catch { /* non-blocking */ }
    setDone(true)
    setLoading(false)
    // Auto-trigger download
    const a = document.createElement('a')
    a.href = pdfUrl
    a.download = report.pdfKey
    a.target = '_blank'
    a.click()
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f8f3 0%, #e8f5ee 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: 480, background: '#fff', borderRadius: 20, boxShadow: '0 16px 64px rgba(0,0,0,0.12)', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ background: report.accent, padding: '28px 32px' }}>
          <div style={{ fontSize: '2rem', marginBottom: 8 }}>{report.icon}</div>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{report.subtitle}</div>
          <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#fff', marginBottom: 6 }}>{report.title}</div>
          <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.55 }}>{report.desc}</div>
        </div>

        {/* Body */}
        <div style={{ padding: '28px 32px' }}>
          {!done ? (
            <>
              <p style={{ fontSize: '0.88rem', color: '#374151', marginBottom: 20, lineHeight: 1.6 }}>
                Get the sample report — free, instant download. We&apos;ll also send you occasional updates about Reading Buddy.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  style={inputStyle}
                />
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  type="email"
                  style={inputStyle}
                />
                <select
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  style={inputStyle}
                >
                  <option value="">Your role (optional)</option>
                  <option value="teacher">Teacher</option>
                  <option value="ndis_provider">NDIS Provider / Speech Pathologist</option>
                  <option value="school_leader">School Leader / Principal</option>
                  <option value="parent">Parent</option>
                  <option value="other">Other</option>
                </select>
                {error && <p style={{ color: '#dc2626', fontSize: '0.8rem', margin: 0 }}>{error}</p>}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{ background: report.accent, color: '#fff', border: 'none', borderRadius: 10, padding: '13px 20px', fontWeight: 700, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: 4 }}
                >
                  {loading ? 'Preparing download…' : '⬇  Download Sample Report'}
                </button>
                <p style={{ fontSize: '0.72rem', color: '#9ca3af', textAlign: 'center', margin: 0 }}>
                  No spam. Unsubscribe any time. 🇦🇺 Australian servers.
                </p>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>✅</div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1a2e4a', marginBottom: 8 }}>Your download is starting…</div>
              <p style={{ fontSize: '0.88rem', color: '#6b7280', marginBottom: 20, lineHeight: 1.6 }}>
                If it doesn&apos;t start automatically, use the button below.
              </p>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-block', background: report.accent, color: '#fff', borderRadius: 10, padding: '12px 24px', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', marginBottom: 20 }}
              >
                ⬇  Open PDF
              </a>
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: 16, marginTop: 4 }}>
                <p style={{ fontSize: '0.82rem', color: '#6b7280', marginBottom: 12 }}>Download all 4 sample reports:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                  {Object.entries(REPORTS).filter(([k]) => k !== type).map(([k, r]) => (
                    <a key={k} href={`/download?type=${k}`} style={{ fontSize: '0.78rem', background: '#f3f4f6', color: '#374151', borderRadius: 6, padding: '5px 10px', textDecoration: 'none' }}>{r.icon} {r.subtitle}</a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #e5e7eb', padding: '12px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/" style={{ fontSize: '0.78rem', color: '#1d6e63', fontWeight: 600, textDecoration: 'none' }}>← Back to Reading Buddy</a>
          <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>Tech 4 Humanity Pty Ltd</span>
        </div>
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  border: '1.5px solid #e5e7eb',
  borderRadius: 8,
  padding: '11px 14px',
  fontSize: '0.9rem',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
}
