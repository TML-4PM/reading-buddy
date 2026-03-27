"use client"
import { useState } from 'react'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lzfgigiyqpuuxslsygjt.supabase.co'
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

type Plan = 'freemium' | 'premium_monthly' | 'premium_annual' | 'school'

const PLAN_LABELS: Record<Plan, { name: string; price: string; features: string[] }> = {
  freemium: {
    name: 'Freemium',
    price: 'Free forever',
    features: ['1 classroom', 'Core metrics (WPM, accuracy)', 'Basic teacher snapshots', '3 months data retention'],
  },
  premium_monthly: {
    name: 'Premium Classroom',
    price: '$59/month — 14-day free trial',
    features: ['Full metrics + growth charts', 'Teacher + parent snapshots', 'AI book recommendations', 'NDIS mode — full', '12 months data retention'],
  },
  premium_annual: {
    name: 'Premium Classroom Annual',
    price: '$590/year — 14-day free trial (save 17%)',
    features: ['Everything in Premium Monthly', 'Best value for committed classrooms'],
  },
  school: {
    name: 'Premium School',
    price: '$4,900/year — 14-day free trial',
    features: ['Up to 10 classrooms', 'School-wide literacy dashboard', 'All Premium Classroom features', 'Basic LMS / SIS integrations'],
  },
}

export default function SignupPage() {
  const [plan] = useState<Plan>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search).get('plan')
      return (p as Plan) || 'premium_monthly'
    }
    return 'premium_monthly'
  })

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    organisation: '',
    role: '',
    state: '',
    students: '',
    hear: '',
  })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const planInfo = PLAN_LABELS[plan] || PLAN_LABELS.premium_monthly

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // 1. Write to cap_leads via bridge
      const res = await fetch('https://m5oqj21chd.execute-api.ap-southeast-2.amazonaws.com/lambda/invoke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'bk_tOH8P5WD3mxBKfICa4yI56vJhpuYOynfdf1d_GfvdK4',
        },
        body: JSON.stringify({
          fn: 'troy-sql-executor',
          route: 'sql',
          sql: `INSERT INTO cap_leads 
            (first_name, last_name, email, organisation, role, lead_source, status, notes, created_at)
            VALUES (
              '${form.first_name.replace(/'/g, "''")}',
              '${form.last_name.replace(/'/g, "''")}',
              '${form.email.replace(/'/g, "''")}',
              '${form.organisation.replace(/'/g, "''")}',
              '${form.role.replace(/'/g, "''")}',
              'reading-buddy-signup',
              'new',
              '{"plan":"${plan}","state":"${form.state}","students":"${form.students}","hear":"${form.hear}","campaign":"rb-launch-2026"}',
              NOW()
            ) RETURNING id`,
        }),
      })

      const data = await res.json()

      if (!data.success && data.error) {
        throw new Error(data.error)
      }

      // 2. Send confirmation email via SES
      await fetch('https://m5oqj21chd.execute-api.ap-southeast-2.amazonaws.com/lambda/invoke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'bk_tOH8P5WD3mxBKfICa4yI56vJhpuYOynfdf1d_GfvdK4',
        },
        body: JSON.stringify({
          fn: 'troy-ses-sender',
          to: form.email,
          subject: `Welcome to Reading Buddy — ${planInfo.name} trial starts now`,
          body: `Hi ${form.first_name},

Welcome to Reading Buddy! 🎉

Your ${planInfo.name} trial is confirmed. No credit card required.

What happens next:
1. Our team will set up your classroom within 24 hours
2. You'll receive your login link by email
3. Your first session takes less than 5 minutes to start

Your plan: ${planInfo.name}
Organisation: ${form.organisation}

Questions? Reply to this email or contact us at readingbuddies@outcome-ready.com

The Reading Buddy Team
Tech 4 Humanity Pty Ltd · ABN 70 666 271 272
https://reading-buddy-by-outcome-ready.vercel.app`,
        }),
      })

      // 3. Notify team
      await fetch('https://m5oqj21chd.execute-api.ap-southeast-2.amazonaws.com/lambda/invoke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'bk_tOH8P5WD3mxBKfICa4yI56vJhpuYOynfdf1d_GfvdK4',
        },
        body: JSON.stringify({
          fn: 'troy-ses-sender',
          to: 'readingbuddies@outcome-ready.com',
          subject: `🆕 New Reading Buddy signup — ${form.first_name} ${form.last_name} (${plan})`,
          body: `New signup received:

Name: ${form.first_name} ${form.last_name}
Email: ${form.email}
Organisation: ${form.organisation}
Role: ${form.role}
State: ${form.state}
Students: ${form.students}
Plan: ${plan}
Heard via: ${form.hear}`,
        }),
      })

      setDone(true)
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please email readingbuddies@outcome-ready.com directly.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-head)' }}>
        <div style={{ maxWidth: 480, textAlign: 'center', padding: '0 24px' }}>
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>🎉</div>
          <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '2rem', color: 'var(--navy)', marginBottom: 12 }}>You&apos;re in!</h1>
          <p style={{ color: 'var(--navy-mid)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 8 }}>
            Check your inbox — confirmation sent to <strong>{form.email}</strong>
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: 32 }}>
            We&apos;ll have your classroom ready within 24 hours. No credit card. No lock-in.
          </p>
          {/* Droid */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://lzfgigiyqpuuxslsygjt.supabase.co/storage/v1/object/public/images/AHC%20droid%20head.webp" alt="Reading Buddy Droid" style={{ height: 120, margin: '0 auto 24px', display: 'block' }} />
          <a href="/" style={{ display: 'inline-block', background: 'var(--teal)', color: '#fff', fontFamily: 'var(--font-head)', fontWeight: 700, padding: '12px 28px', borderRadius: 40, textDecoration: 'none' }}>
            ← Back to Reading Buddy
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      <style>{`
        .signup-page { min-height: 100vh; background: var(--cream); display: grid; grid-template-columns: 1fr 1fr; }
        .signup-left { background: var(--teal); padding: 60px 48px; display: flex; flex-direction: column; justify-content: center; }
        .signup-right { padding: 60px 48px; overflow-y: auto; }
        .signup-label { display: block; font-family: var(--font-head); font-weight: 700; font-size: 0.8rem; color: var(--navy-mid); margin-bottom: 6px; margin-top: 16px; }
        .signup-input { width: 100%; padding: 12px 16px; border: 1.5px solid var(--border); border-radius: 10px; font-family: var(--font-body); font-size: 0.95rem; background: var(--white); outline: none; transition: border-color 0.2s; color: var(--navy); }
        .signup-input:focus { border-color: var(--teal); }
        .signup-select { width: 100%; padding: 12px 16px; border: 1.5px solid var(--border); border-radius: 10px; font-family: var(--font-body); font-size: 0.95rem; background: var(--white); outline: none; color: var(--navy); }
        .signup-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .signup-btn { width: 100%; padding: 15px; background: var(--teal); color: var(--white); border: none; border-radius: 12px; font-family: var(--font-head); font-weight: 800; font-size: 1rem; cursor: pointer; transition: background 0.2s; margin-top: 24px; }
        .signup-btn:hover { background: var(--teal-mid); }
        .signup-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        @media (max-width: 800px) {
          .signup-page { grid-template-columns: 1fr; }
          .signup-left { padding: 40px 24px; }
          .signup-right { padding: 40px 24px; }
          .signup-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="signup-page">
        {/* LEFT — plan summary */}
        <div className="signup-left">
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 40 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://lzfgigiyqpuuxslsygjt.supabase.co/storage/v1/object/public/images/AHC%20droid%20head.webp" alt="Reading Buddy" style={{ height: 40, filter: 'brightness(0) invert(1)' }} />
            <span style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '1.2rem', color: '#fff' }}>Reading Buddy</span>
          </a>

          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontFamily: 'var(--font-head)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Your plan</div>
          <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '1.6rem', color: '#fff', marginBottom: 8 }}>{planInfo.name}</h2>
          <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', marginBottom: 28, fontWeight: 600 }}>{planInfo.price}</div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {planInfo.features.map(f => (
              <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'rgba(255,255,255,0.9)', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--amber)', fontWeight: 900, flexShrink: 0 }}>✓</span>
                {f}
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 40, padding: '16px 20px', background: 'rgba(255,255,255,0.1)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ color: '#fff', fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '0.9rem', marginBottom: 6 }}>✅ No credit card required</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem', lineHeight: 1.6 }}>Start your trial instantly. We&apos;ll set up your classroom within 24 hours. Upgrade only if it pays for itself.</div>
          </div>

          <div style={{ marginTop: 24, color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>
            Questions? <a href="mailto:readingbuddies@outcome-ready.com" style={{ color: 'var(--amber)' }}>readingbuddies@outcome-ready.com</a>
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="signup-right">
          <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '1.8rem', color: 'var(--navy)', marginBottom: 4 }}>Start your free trial</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: 28 }}>No credit card. No lock-in. Ready in under 24 hours.</p>

          {error && (
            <div style={{ background: '#FEE2E2', border: '1.5px solid #E8534A', borderRadius: 10, padding: '12px 16px', color: '#C0392B', fontSize: '0.88rem', marginBottom: 20 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="signup-row">
              <div>
                <label className="signup-label">First name *</label>
                <input className="signup-input" required placeholder="Emma" value={form.first_name} onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))} />
              </div>
              <div>
                <label className="signup-label">Last name *</label>
                <input className="signup-input" required placeholder="Thompson" value={form.last_name} onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))} />
              </div>
            </div>

            <label className="signup-label">Work email *</label>
            <input className="signup-input" type="email" required placeholder="you@school.edu.au" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />

            <label className="signup-label">School or organisation *</label>
            <input className="signup-input" required placeholder="Riverside Primary School" value={form.organisation} onChange={e => setForm(f => ({ ...f, organisation: e.target.value }))} />

            <label className="signup-label">Your role *</label>
            <select className="signup-select" required value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
              <option value="">Select your role</option>
              <option value="classroom_teacher">Classroom Teacher</option>
              <option value="reading_specialist">Reading / Literacy Specialist</option>
              <option value="principal">Principal / Deputy Principal</option>
              <option value="ndis_provider">NDIS Provider / Therapist</option>
              <option value="curriculum_coordinator">Curriculum Coordinator</option>
              <option value="parent">Parent / Carer</option>
              <option value="other">Other</option>
            </select>

            <div className="signup-row">
              <div>
                <label className="signup-label">State</label>
                <select className="signup-select" value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))}>
                  <option value="">Select state</option>
                  {['NSW','VIC','QLD','SA','WA','TAS','NT','ACT'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="signup-label">Students in your class</label>
                <select className="signup-select" value={form.students} onChange={e => setForm(f => ({ ...f, students: e.target.value }))}>
                  <option value="">Approx. number</option>
                  <option value="1-10">1–10</option>
                  <option value="11-25">11–25</option>
                  <option value="26-30">26–30</option>
                  <option value="30+">30+</option>
                  <option value="whole_school">Whole school</option>
                </select>
              </div>
            </div>

            <label className="signup-label">How did you hear about us?</label>
            <select className="signup-select" value={form.hear} onChange={e => setForm(f => ({ ...f, hear: e.target.value }))}>
              <option value="">Select one</option>
              <option value="linkedin">LinkedIn</option>
              <option value="colleague">Colleague / word of mouth</option>
              <option value="google">Google search</option>
              <option value="ndis_network">NDIS network</option>
              <option value="outcome_ready">Outcome Ready</option>
              <option value="other">Other</option>
            </select>

            <div style={{ marginTop: 20, padding: '14px 18px', background: 'var(--teal-pale)', borderRadius: 12, border: '1.5px solid var(--teal-light)', fontSize: '0.82rem', color: 'var(--navy-mid)', lineHeight: 1.6 }}>
              🔒 Your data is stored in Australian data centres, encrypted at rest and in transit, and compliant with the Australian Privacy Act. We will never sell your data.
            </div>

            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? 'Setting up your trial...' : `Start ${planInfo.name} trial — no credit card →`}
            </button>

            <p style={{ textAlign: 'center', marginTop: 14, fontSize: '0.78rem', color: 'var(--muted)' }}>
              Already have an account? <a href="mailto:readingbuddies@outcome-ready.com" style={{ color: 'var(--teal)', fontWeight: 700 }}>Contact us</a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
