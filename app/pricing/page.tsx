'use client'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    desc: 'See what Reading Buddy can do.',
    features: ['1 full AI reading assessment', 'Comprehension scoring', 'Reading level report', 'Parent summary PDF'],
    cta: 'Start Free Assessment',
    href: '/start?plan=free',
    featured: false,
  },
  {
    name: 'Monthly',
    price: '$19',
    period: '/mo',
    desc: 'For families committed to progress.',
    features: ['Unlimited reading sessions', 'Weekly progress reports', 'Parent dashboard', 'Email report delivery', 'Reading improvement plan'],
    cta: 'Start Monthly',
    href: '/start?plan=monthly',
    featured: true,
  },
  {
    name: 'Pro',
    price: '$99',
    period: '/mo',
    desc: 'For schools and NDIS providers.',
    features: ['Everything in Monthly', 'School-formatted PDF exports', 'NDIS progress documentation', 'Multiple student profiles', 'Priority support', 'Intervention tracking'],
    cta: 'Get Pro',
    href: '/start?plan=pro',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <>
      <nav className="nav">
        <div className="nav-logo"><Link href="/">📚 Reading Buddy</Link></div>
        <div className="nav-links">
          <Link href="/demo">Demo</Link>
          <Link href="/report">Sample Report</Link>
          <Link href="/start" className="btn-primary">Start Free</Link>
        </div>
      </nav>

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="section-label">Pricing</p>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(2rem,4vw,3rem)', marginBottom: '1rem' }}>
            Start free. Scale when ready.
          </h1>
          <p style={{ color: 'var(--mid)', fontSize: '1.1rem' }}>
            No lock-in. Cancel anytime. AUD pricing.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1.5rem' }}>
          {plans.map(p => (
            <div key={p.name} style={{
              border: `1.5px solid ${p.featured ? 'var(--sage)' : 'var(--border)'}`,
              borderRadius: 20,
              padding: '2.5rem 2rem',
              background: p.featured ? '#f0f8f3' : 'white',
              position: 'relative',
            }}>
              {p.featured && (
                <div style={{
                  position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                  background: 'var(--sage)', color: 'white', fontSize: '0.75rem',
                  fontWeight: 600, padding: '0.25rem 0.9rem', borderRadius: 50, whiteSpace: 'nowrap'
                }}>Most Popular</div>
              )}
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mid)', marginBottom: '0.5rem' }}>{p.name}</div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: '2.8rem', fontWeight: 900, marginBottom: '0.25rem' }}>
                {p.price}<span style={{ fontSize: '1rem', fontFamily: 'DM Sans, sans-serif', color: 'var(--mid)' }}>{p.period}</span>
              </div>
              <p style={{ color: 'var(--mid)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{p.desc}</p>
              <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
                {p.features.map(f => (
                  <li key={f} style={{ fontSize: '0.9rem', padding: '0.35rem 0', color: 'var(--charcoal)', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--sage)', fontWeight: 700 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href={p.href} className="btn-primary" style={{ display: 'block', textAlign: 'center' }}>{p.cta}</Link>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--mid)', fontSize: '0.9rem' }}>
          <p>Questions? Email <a href="mailto:hello@readingbuddy.ai" style={{ color: 'var(--sage)' }}>hello@readingbuddy.ai</a></p>
        </div>
      </main>

      <div className="cross-sell">
        <h3>Also from Tech 4 Humanity</h3>
        <div className="cross-sell-links">
          <a href="https://ai4tradies.org">AI for Tradies</a>
          <a href="https://outcome-ready.vercel.app">Outcome Ready</a>
          <a href="https://augmentedmemories.org">Augmented Memories</a>
        </div>
      </div>
      <footer><p>© 2025 Tech 4 Humanity Pty Ltd · ABN 61 605 746 618</p></footer>
    </>
  )
}
