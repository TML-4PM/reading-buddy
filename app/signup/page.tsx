"use client"
import { useState } from 'react'

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
  const [step, setStep] = useState(1)

  const planInfo = PLANS[plan] || PLANS.premium_monthly

  const handleSubmit = async () => {
    if (!form.role) { setError('Please select your role.'); return }
    setLoading(true)
    setError('')

    try {
      // Call Next.js API route — server-side proxy avoids CORS
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, plan })
      })

      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || 'Failed')
      setDone(true)
    } catch (err) {
      setError('Something went wrong. Email readingbuddy@outcome-ready.com and we\'ll sort it personally.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div style={{ minHeight: '100vh', background: '#1D6E63', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px', fontFamily: 'Nunito,sans-serif' }}>
        <div style={{ background: '#fff', borderRadius: 24, padding: '48px 40px', maxWidth: 480, textAlign: 'center', boxShadow: '0 24px 80px rgba(0,0,0,0.2)' }}>
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>🎉</div>
          <h1 style={{ fontWeight: 900, fontSize: '1.8rem', color: '#1A2744', marginBottom: 12 }}>
            You&apos;re in, {form.first_name}!
          </h1>
          <p style={{ color: '#6B7A99', fontSize: '1rem', lineHeight: 1.7, marginBottom: 8 }}>
            Confirmation sent to <strong>{form.email}</strong>
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
        body { font-family: Nunito, sans-serif; }
        .su-page { min-height: 100vh; background: #1D6E63; display: flex; }
        .su-left { background: #1D6E63; padding: 60px 48px; flex: 1; display: flex; flex-direction: column; justify-content: center; }
        .su-right { background: #fff; padding: 60px 48px; width: 520px; min-width: 400px; overflow-y: auto; }
        .su-label { display: block; font-family: Nunito,sans-serif; font-weight: 700; font-size: 0.82rem; color: #1A2744; margin-bottom: 6px; margin-top: 18px; }
        .su-input { width: 100%; padding: 13px 16px; border: 2px solid #DDE8E7; border-radius: 10px; font-family: Lato,sans-serif; font-size: 0.95rem; color: #1A2744; background: #fff; outline: none; transition: border-color 0.2s; }
        .su-input:focus { border-color: #1D6E63; }
        .su-select { width: 100%; padding: 13px 16px; border: 2px solid #DDE8E7; border-radius: 10px; font-family: Lato,sans-serif; font-size: 0.95rem; color: #1A2744; background: #fff; outline: none; }
        .su-select:focus { border-color: #1D6E63; }
        .su-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .su-btn { width: 100%; padding: 15px; background: #1D6E63; color: #fff; border: none; border-radius: 12px; font-family: Nunito,sans-serif; font-weight: 800; font-size: 1rem; cursor: pointer; margin-top: 24px; transition: background 0.2s; }
        .su-btn:hover:not(:disabled) { background: #2A9D8F; }
        .su-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .su-back-btn { background: transparent; border: none; font-family: Nunito,sans-serif; font-weight: 700; font-size: 0.85rem; color: #1D6E63; cursor: pointer; padding: 12px 0; display: block; }
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

          {planInfo.badge && (
            <div style={{ display: 'inline-block', background: '#F4A261', color: '#fff', fontFamily: 'Nunito,sans-serif', fontWeight: 700, fontSize: '0.7rem', padding: '3px 10px', borderRadius: 40, marginBottom: 10 }}>
              {planInfo.badge}
            </div>
          )}
          <h2 style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 900, fontSize: '1.8rem', color: '#fff', marginBottom: 6 }}>{planInfo.name}</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', fontWeight: 600, marginBottom: 28 }}>{planInfo.price}</p>

          {planInfo.features.map(f => (
            <div key={f} style={{ display: 'flex', gap: 10, color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', marginBottom: 10 }}>
              <span style={{ color: '#F4A261', fontWeight: 900, flexShrink: 0 }}>✓</span>{f}
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
            {step === 1 ? 'Tell us about yourself' : 'Almost done'}
          </h1>
          <p style={{ color: '#6B7A99', fontSize: '0.9rem', marginBottom: 24 }}>
            {step === 1 ? 'No credit card. 2 quick steps.' : '30 seconds more and you\'re in.'}
          </p>

          {/* Progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
            {[1,2].map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: step >= s ? '#1D6E63' : '#DDE8E7', color: step >= s ? '#fff' : '#6B7A99', fontFamily: 'Nunito,sans-serif', fontWeight: 800, fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {step > s ? '✓' : s}
                </div>
                {s < 2 && <div style={{ width: 40, height: 2, background: step > s ? '#1D6E63' : '#DDE8E7', borderRadius: 2 }} />}
              </div>
            ))}
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

              <button className="su-btn" onClick={() => {
                if (!form.first_name || !form.last_name || !form.email || !form.organisation) { setError('Please fill in all fields.'); return }
                if (!form.email.includes('@')) { setError('Please enter a valid email.'); return }
                setError(''); setStep(2)
              }}>Continue →</button>
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
                    <option value="">State (optional)</option>
                    {['NSW','VIC','QLD','SA','WA','TAS','NT','ACT'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="su-label">Class size</label>
                  <select className="su-select" value={form.students} onChange={e => setForm(f => ({ ...f, students: e.target.value }))}>
                    <option value="">Optional</option>
                    <option>1–10</option><option>11–25</option><option>26–30</option><option>30+</option><option>Whole school</option>
                  </select>
                </div>
              </div>

              <label className="su-label">How did you hear about us?</label>
              <select className="su-select" value={form.hear} onChange={e => setForm(f => ({ ...f, hear: e.target.value }))}>
                <option value="">Optional</option>
                <option value="linkedin">LinkedIn</option>
                <option value="colleague">Colleague / word of mouth</option>
                <option value="google">Google</option>
                <option value="ndis_network">NDIS network</option>
                <option value="outcome_ready">Outcome Ready</option>
                <option value="other">Other</option>
              </select>

              <div style={{ marginTop: 20, padding: '14px 18px', background: '#E8F6F5', borderRadius: 12, fontSize: '0.82rem', color: '#1A2744', lineHeight: 1.6 }}>
                🔒 Australian data centres. Encrypted. Privacy Act compliant. Never sold.
              </div>

              <button className="su-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Setting up your trial...' : `Start ${planInfo.name} — no credit card →`}
              </button>
              <button className="su-back-btn" onClick={() => { setStep(1); setError('') }}>← Back</button>
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
