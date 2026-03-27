'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Start() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [childName, setChildName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!email || !name) return
    try {
      await fetch('/api/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, childName, plan: 'free' }),
      })
    } catch (_) {}
    setSubmitted(true)
  }

  return (
    <>
      <nav className="nav">
        <div className="nav-logo"><Link href="/">📚 Reading Buddy</Link></div>
        <div className="nav-links">
          <Link href="/pricing">Pricing</Link>
          <Link href="/demo">Demo</Link>
        </div>
      </nav>

      <main style={{ maxWidth: 520, margin: '0 auto', padding: '5rem 2rem', textAlign: 'center' }}>
        {submitted ? (
          <div>
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎉</div>
            <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '2rem', marginBottom: '1rem' }}>You're in!</h1>
            <p style={{ color: 'var(--mid)', lineHeight: 1.7, marginBottom: '2rem' }}>
              We've sent your first reading assessment link to <strong>{email}</strong>.<br />
              Expect your first progress report within 48 hours.
            </p>
            <Link href="/report" className="btn-secondary">Preview a Sample Report</Link>
          </div>
        ) : (
          <div>
            <p className="section-label">Free Assessment</p>
            <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '2.4rem', marginBottom: '1rem' }}>
              Start your child's<br />reading journey
            </h1>
            <p style={{ color: 'var(--mid)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
              Free assessment · No credit card · Report in 48 hours
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--charcoal)', display: 'block', marginBottom: '0.4rem' }}>Your name</label>
                <input
                  type="text"
                  placeholder="Parent or guardian name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{
                    width: '100%', padding: '0.85rem 1rem', border: '1.5px solid var(--border)',
                    borderRadius: 10, fontSize: '1rem', outline: 'none', fontFamily: 'DM Sans, sans-serif'
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--charcoal)', display: 'block', marginBottom: '0.4rem' }}>Child's first name</label>
                <input
                  type="text"
                  placeholder="e.g. Emma"
                  value={childName}
                  onChange={e => setChildName(e.target.value)}
                  style={{
                    width: '100%', padding: '0.85rem 1rem', border: '1.5px solid var(--border)',
                    borderRadius: 10, fontSize: '1rem', outline: 'none', fontFamily: 'DM Sans, sans-serif'
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--charcoal)', display: 'block', marginBottom: '0.4rem' }}>Your email</label>
                <input
                  type="email"
                  placeholder="parent@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: '100%', padding: '0.85rem 1rem', border: '1.5px solid var(--border)',
                    borderRadius: 10, fontSize: '1rem', outline: 'none', fontFamily: 'DM Sans, sans-serif'
                  }}
                />
              </div>
              <button onClick={handleSubmit} className="btn-primary" style={{ marginTop: '0.5rem', fontSize: '1.05rem', padding: '0.9rem' }}>
                Get Free Assessment →
              </button>
            </div>

            <p style={{ color: 'var(--mid)', fontSize: '0.8rem', marginTop: '1.5rem' }}>
              By continuing you agree to our Terms. No spam. Ever.
            </p>
          </div>
        )}
      </main>
      <footer><p>© 2025 Tech 4 Humanity Pty Ltd</p></footer>
    </>
  )
}
