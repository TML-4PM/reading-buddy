"use client"
import { useState } from 'react'

const BRIDGE_URL = 'https://m5oqj21chd.execute-api.ap-southeast-2.amazonaws.com/lambda/invoke'
const BRIDGE_KEY = 'bk_tOH8P5WD3mxBKfICa4yI56vJhpuYOynfdf1d_GfvdK4'

const PLANS: Record<string, { name: string; price: string; features: string[]; badge?: string }> = {
  freemium: {
    name: 'Free Forever',
    price: 'No credit card, ever',
    features: ['1 classroom', 'Core reading metrics', 'Basic teacher snapshots', '3 months history'],
  },
  premium_monthly: {
    name: 'Premium Classroom',
    price: '$59/month — 14-day free trial',
    badge: 'Most Popular',
    features: ['Full metrics + growth charts', 'Parent one-click reports', 'AI book recommendations', 'NDIS mode included', '12 months history'],
  },
  premium_annual: {
    name: 'Premium Annual',
    price: '$590/year — save 17%',
    badge: 'Best Value',
    features: ['Everything in Premium Monthly', 'One book series costs $3,000 — this is $590/yr'],
  },
  school: {
    name: 'Premium School',
    price: '$4,900/year',
    features: ['Up to 10 classrooms', 'School-wide literacy dashboard', 'All Premium features', 'Basic LMS integration'],
  },
}

export default function SignupPage() {
  const [plan] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('plan') || 'premium_monthly'
    }
    return 'premium_monthly'
  })

  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '',
    organisation: '', role: '', state: '', students: '', hear: '',
  })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1) // 2-step form

  const planInfo = PLANS[plan] || PLANS.premium_monthly

  const step1Complete = form.first_name && form.last_name && form.email && form.organisation

  const handleSubmit = async () => {
    if (!step1Complete || !form.role) {
      setError('Please fill in all required fields.')
      return
    }
    setLoading(true)
    setError('')

    try {
      const noteJson = JSON.stringify({
        plan, state: form.state, students: form.students,
        hear: form.hear, campaign: 'rb-launch-2026'
      }).replace(/'/g, "''")

      await fetch(BRIDGE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': BRIDGE_KEY },
        body: JSON.stringify({
          fn: 'troy-sql-executor', route: 'sql',
          sql: `INSERT INTO cap_leads (first_name,last_name,email,organisation,role,lead_source,status,notes,created_at)
            VALUES (
              '${form.first_name.replace(/'/g,"''")}',
              '${form.last_name.replace(/'/g,"''")}',
              '${form.email.replace(/'/g,"''")}',
              '${form.organisation.replace(/'/g,"''")}',
              '${form.role}',
              'reading-buddy-signup','new',
              '${noteJson}',NOW()
            ) ON CONFLICT DO NOTHING`
        })
      })

      // Confirmation to user
      await fetch(BRIDGE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': BRIDGE_KEY },
        body: JSON.stringify({
          fn: 'troy-ses-sender',
          to: form.email,
          subject: `Welcome to Reading Buddy — you're in, ${form.first_name}!`,
          body: `Hi ${form.first_name},

You're on the list! 🎉

We'll have your ${planInfo.name} trial ready within 24 hours. No credit card. No lock-in.

What happens next:
→ Watch for an email from readingbuddy@outcome-ready.com
→ We'll set up your classroom access personally
→ First session takes under 5 minutes

Questions? Just reply to this email.

Troy Latter
Reading Buddy by Outcome Ready
readingbuddy@outcome-ready.com
Tech 4 Humanity Pty Ltd · ABN 70 666 271 272`
        })
      })

      // Notify team
      await fetch(BRIDGE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': BRIDGE_KEY },
        body: JSON.stringify({
          fn: 'troy-ses-sender',
          to: 'readingbuddy@outcome-ready.com',
          subject: `🆕 New signup: ${form.first_name} ${form.last_name} — ${plan}`,
          body: `Name: ${form.first_name} ${form.last_name}
Email: ${form.email}
Org: ${form.organisation}
Role: ${form.role}
State: ${form.state}
Students: ${form.students}
Plan: ${plan}
Heard via: ${form.hear}`
        })
      })

      setDone(true)
    } catch {
      setError('Something went wrong. Email readingbuddy@outcome-ready.com directly and we\'ll sort it.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div style={{ minHeight: '100vh', background: '#1D6E63', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
        <div style={{ background: '#fff', borderRadius: 24, padding: '48px 40px', maxWidth: 480, textAlign: 'center', boxShadow: '0 24px 80px rgba(0,0,0,0.2)' }}>
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>🎉</div>
          <h1 style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 900, fontSize: '1.8rem', color: '#1A2744', marginBottom: 12 }}>
            You&apos;re in, {form.first_name}!
          </h1>
          <p style={{ color: '#6B7A99', fontSize: '1rem', lineHeight: 1.7, marginBottom: 8 }}>
            Check <strong>{form.email}</strong> — confirmation on its way.
          </p>
          <p style={{ color: '#6B7A99', fontSize: '0.9rem', marginBottom: 32 }}>
            We&apos;ll have your classroom ready within 24 hours. No credit card. No surprises.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/droid.png" alt="Reading Buddy" style={{ height: 100, margin: '0 auto 24px', display: 'block' }} />
          <a href="/" style={{ display: 'inline-block', background: '#1D6E63', color: '#fff', fontFamily: 'Nunito,sans-serif', fontWeight: 700, padding: '12px 28px', borderRadius: 40, textDecoration: 'none' }}>
            ← Back to Reading Buddy
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .su-page { min-height: 100vh; background: #1D6E63; display: flex; align-items: stretch; }
        .su-left { background: #1D6E63; padding: 60px 48px; flex: 1; display: flex; flex-direction: column; justify-content: center; }
        .su-right { background: #fff; padding: 60px 48px; width: 520px; min-width: 400px; overflow-y: auto; }
        .su-label { display: block; font-family: Nunito,sans-serif; font-weight: 700; font-size: 0.82rem; color: #1A2744; margin-bottom: 6px; margin-top: 18px; }
        .su-input { width: 100%; padding: 13px 16px; border: 2px solid #DDE8E7; border-radius: 10px; font-family: Lato,sans-serif; font-size: 0.95rem; color: #1A2744; background: #fff; outline: none; transition: border-color 0.2s; }
        .su-input:focus { border-color: #1D6E63; }
        .su-select { width: 100%; padding: 13px 16px; border: 2px solid #DDE8E7; border-radius: 10px; font-family: Lato,sans-serif; font-size: 0.95rem; color: #1A2744; background: #fff; outline: none; appearance: none; }
        .su-select:focus { border-color: #1D6E63; }
        .su-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .su-btn { width: 100%; padding: 15px; background: #1D6E63; color: #fff; border: none; border-radius: 12px; font-family: Nunito,sans-serif; font-weight: 800; font-size: 1rem; cursor: pointer; margin-top: 24px; transition: background 0.2s; }
        .su-btn:hover:not(:disabled) { background: #2A9D8F; }
        .su-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .su-step-btn { background: transparent; border: none; font-family: Nunito,sans-serif; font-weight: 700; font-size: 0.85rem; color: #1D6E63; cursor: pointer; padding: 8px 0; }
        .su-feature { display: flex; gap: 10px; align-items: flex-start; color: rgba(255,255,255,0.9); font-size: 0.9rem; margin-bottom: 10px; }
        .su-badge { display: inline-block; background: #F4A261; color: #fff; font-family: Nunito,sans-serif; font-weight: 700; font-size: 0.7rem; padding: 3px 10px; border-radius: 40px; margin-bottom: 10px; }
        .su-steps { display: flex; gap: 8px; margin-bottom: 28px; }
        .su-step-dot { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: Nunito,sans-serif; font-weight: 800; font-size: 0.85rem; }
        .su-step-active { background: #1D6E63; color: #fff; }
        .su-step-done { background: #2A9D8F; color: #fff; }
        .su-step-inactive { background: #DDE8E7; color: #6B7A99; }
        .su-error { background: #FEE2E2; border: 1.5px solid #E8534A; border-radius: 10px; padding: 12px 16px; color: #C0392B; font-size: 0.88rem; margin-bottom: 16px; }
        @media (max-width: 800px) {
          .su-page { flex-direction: column; }
          .su-left { padding: 40px 24px; }
          .su-right { width: 100%; min-width: unset; padding: 40px 24px; }
          .su-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="su-page">
        {/* LEFT */}
        <div className="su-left">
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 40 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/droid.png" alt="Reading Buddy" style={{ height: 40, filter: 'brightness(0) invert(1)' }} />
            <span style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 900, fontSize: '1.2rem', color: '#fff' }}>Reading Buddy</span>
          </a>

          {planInfo.badge && <div className="su-badge">{planInfo.badge}</div>}
          <h2 style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 900, fontSize: '1.8rem', color: '#fff', marginBottom: 6 }}>{planInfo.name}</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', fontWeight: 600, marginBottom: 28 }}>{planInfo.price}</p>

          {planInfo.features.map(f => (
            <div key={f} className="su-feature">
              <span style={{ color: '#F4A261', fontWeight: 900, flexShrink: 0 }}>✓</span>
              {f}
            </div>
          ))}

          <div style={{ marginTop: 32, background: 'rgba(255,255,255,0.12)', borderRadius: 14, padding: '18px 20px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ color: '#fff', fontFamily: 'Nunito,sans-serif', fontWeight: 800, marginBottom: 6 }}>✅ No credit card required</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', lineHeight: 1.6 }}>Start today. We set up your classroom within 24 hours. Upgrade only if it works for you.</div>
          </div>

          <div style={{ marginTop: 24, color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
            Questions? <a href="mailto:readingbuddy@outcome-ready.com" style={{ color: '#F4A261' }}>readingbuddy@outcome-ready.com</a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="su-right">
          <h1 style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 900, fontSize: '1.6rem', color: '#1A2744', marginBottom: 6 }}>
            {step === 1 ? 'Tell us about yourself' : 'A bit more detail'}
          </h1>
          <p style={{ color: '#6B7A99', fontSize: '0.9rem', marginBottom: 20 }}>
            {step === 1 ? 'No credit card. No lock-in. 2 quick steps.' : 'Almost done — 30 seconds more.'}
          </p>

          {/* Step indicators */}
          <div className="su-steps">
            <div className={`su-step-dot ${step > 1 ? 'su-step-done' : 'su-step-active'}`}>
              {step > 1 ? '✓' : '1'}
            </div>
            <div style={{ flex: 1, height: 2, background: step > 1 ? '#2A9D8F' : '#DDE8E7', alignSelf: 'center', borderRadius: 2 }} />
            <div className={`su-step-dot ${step === 2 ? 'su-step-active' : 'su-step-inactive'}`}>2</div>
          </div>

          {error && <div className="su-error">{error}</div>}

          {step === 1 && (
            <>
              <div className="su-row">
                <div>
                  <label className="su-label">First name *</label>
                  <input className="su-input" placeholder="Emma" value={form.first_name} onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))} />
                </div>
                <div>
                  <label className="su-label">Last name *</label>
                  <input className="su-input" placeholder="Thompson" value={form.last_name} onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))} />
                </div>
              </div>

              <label className="su-label">Work email *</label>
              <input className="su-input" type="email" placeholder="you@school.edu.au" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />

              <label className="su-label">School or organisation *</label>
              <input className="su-input" placeholder="Riverside Primary School" value={form.organisation} onChange={e => setForm(f => ({ ...f, organisation: e.target.value }))} />

              <button
                className="su-btn"
                onClick={() => {
                  if (!form.first_name || !form.last_name || !form.email || !form.organisation) {
                    setError('Please fill in all fields above.')
                    return
                  }
                  if (!form.email.includes('@')) {
                    setError('Please enter a valid email address.')
                    return
                  }
                  setError('')
                  setStep(2)
                }}
              >
                Continue →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <label className="su-label">Your role *</label>
              <select className="su-select" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
                <option value="">Select your role</option>
                <option value="classroom_teacher">Classroom Teacher</option>
                <option value="reading_specialist">Reading / Literacy Specialist</option>
                <option value="principal">Principal / Deputy Principal</option>
                <option value="ndis_provider">NDIS Provider / Therapist</option>
                <option value="curriculum_coordinator">Curriculum Coordinator</option>
                <option value="parent">Parent / Carer</option>
                <option value="other">Other</option>
              </select>

              <div className="su-row">
                <div>
                  <label className="su-label">State</label>
                  <select className="su-select" value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))}>
                    <option value="">Select state</option>
                    {['NSW','VIC','QLD','SA','WA','TAS','NT','ACT'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="su-label">Class size</label>
                  <select className="su-select" value={form.students} onChange={e => setForm(f => ({ ...f, students: e.target.value }))}>
                    <option value="">How many students?</option>
                    <option value="1-10">1–10</option>
                    <option value="11-25">11–25</option>
                    <option value="26-30">26–30</option>
                    <option value="30+">30+</option>
                    <option value="whole_school">Whole school</option>
                  </select>
                </div>
              </div>

              <label className="su-label">How did you hear about us?</label>
              <select className="su-select" value={form.hear} onChange={e => setForm(f => ({ ...f, hear: e.target.value }))}>
                <option value="">Select one</option>
                <option value="linkedin">LinkedIn</option>
                <option value="colleague">Colleague / word of mouth</option>
                <option value="google">Google search</option>
                <option value="ndis_network">NDIS network</option>
                <option value="outcome_ready">Outcome Ready</option>
                <option value="other">Other</option>
              </select>

              <div style={{ marginTop: 20, padding: '14px 18px', background: '#E8F6F5', borderRadius: 12, fontSize: '0.82rem', color: '#1A2744', lineHeight: 1.6 }}>
                🔒 Stored in Australian data centres. Encrypted. Privacy Act compliant. Never sold.
              </div>

              <button className="su-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Setting up your trial...' : `Start ${planInfo.name} — no credit card →`}
              </button>

              <button className="su-step-btn" onClick={() => { setStep(1); setError('') }} style={{ display: 'block', marginTop: 12 }}>
                ← Back
              </button>
            </>
          )}

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.78rem', color: '#6B7A99' }}>
            Questions? <a href="mailto:readingbuddy@outcome-ready.com" style={{ color: '#1D6E63', fontWeight: 700 }}>readingbuddy@outcome-ready.com</a>
          </p>
        </div>
      </div>
    </>
  )
}
