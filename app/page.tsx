'use client'
import Link from 'next/link'
import './page.css'

const features = [
  { icon: '📖', title: 'AI Reading Assessment', desc: 'Instant evaluation of reading level, fluency, and comprehension using advanced AI.' },
  { icon: '📊', title: 'Real-Time Progress Reports', desc: 'Parent and school-ready reports generated automatically after every session.' },
  { icon: '🎯', title: 'Personalised Coaching', desc: 'Adaptive exercises tailored to your child\'s exact reading gaps and strengths.' },
  { icon: '🏫', title: 'School-Ready Exports', desc: 'PDF reports formatted for teachers, NDIS coordinators, and intervention teams.' },
  { icon: '🧠', title: 'Comprehension Tracking', desc: 'Measures not just reading speed but understanding and retention over time.' },
  { icon: '📱', title: '48-Hour First Report', desc: 'See measurable progress within 48 hours of your first session.' },
]

const audiences = [
  { label: 'Parents', desc: 'Track your child\'s reading development with clear, jargon-free reports you can actually use.' },
  { label: 'Schools', desc: 'Identify struggling readers early and generate intervention evidence for every student.' },
  { label: 'NDIS Providers', desc: 'Generate funding-ready progress reports with measurable literacy outcomes.' },
]

export default function Home() {
  return (
    <>
      <nav className="nav">
        <div className="nav-logo">📚 Reading Buddy</div>
        <div className="nav-links">
          <Link href="/demo">Demo</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/report">Sample Report</Link>
          <Link href="/start" className="btn-primary">Start Free</Link>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="hero-badge">48-Hour Progress Guarantee</div>
          <h1>Your child's AI reading coach.<br /><em>Real progress in days, not months.</em></h1>
          <p className="hero-sub">
            Reading Buddy assesses, coaches, and tracks your child's reading — then delivers parent and school-ready reports automatically.
            No tutors. No waiting lists. No guesswork.
          </p>
          <div className="hero-ctas">
            <Link href="/start" className="btn-primary">Start Free Assessment →</Link>
            <Link href="/demo" className="btn-secondary">View Demo</Link>
          </div>
          <div className="hero-proof">
            <span>✓ Free first assessment</span>
            <span>✓ School-ready reports</span>
            <span>✓ NDIS compliant</span>
          </div>
        </section>

        {/* Audiences */}
        <section className="audiences">
          <p className="section-label">Who it's for</p>
          <div className="audience-grid">
            {audiences.map(a => (
              <div key={a.label} className="audience-card">
                <h3>{a.label}</h3>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="features">
          <p className="section-label">What you get</p>
          <h2>Everything a reading coach provides — <em>automated.</em></h2>
          <div className="features-grid">
            {features.map(f => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sample Report CTA */}
        <section className="report-cta">
          <div className="report-cta-inner">
            <h2>See what a report looks like</h2>
            <p>Real output from a real session. No placeholders.</p>
            <Link href="/report" className="btn-primary">View Sample Report →</Link>
          </div>
        </section>

        {/* Pricing */}
        <section className="pricing-preview">
          <p className="section-label">Simple pricing</p>
          <h2>Start free. Upgrade when ready.</h2>
          <div className="pricing-grid">
            <div className="price-card">
              <div className="price-tier">Free</div>
              <div className="price-amount">$0</div>
              <p>1 full reading assessment + report</p>
              <Link href="/start" className="btn-primary">Get Started</Link>
            </div>
            <div className="price-card featured">
              <div className="price-badge">Most Popular</div>
              <div className="price-tier">Monthly</div>
              <div className="price-amount">$19<span>/mo</span></div>
              <p>Unlimited sessions + parent dashboard</p>
              <Link href="/pricing" className="btn-primary">Start Now</Link>
            </div>
            <div className="price-card">
              <div className="price-tier">Pro</div>
              <div className="price-amount">$99<span>/mo</span></div>
              <p>Full reporting for schools and NDIS providers</p>
              <Link href="/pricing" className="btn-primary">Get Pro</Link>
            </div>
          </div>
        </section>

        {/* Cross-sell */}
        <div className="cross-sell">
          <h3>Also from Tech 4 Humanity</h3>
          <div className="cross-sell-links">
            <a href="https://ai4tradies.org">AI for Tradies</a>
            <a href="https://outcome-ready.vercel.app">Outcome Ready</a>
            <a href="https://augmentedmemories.org">Augmented Memories</a>
            <a href="https://tech4humanity.com.au">Tech 4 Humanity</a>
          </div>
        </div>
      </main>

      <footer>
        <p>© 2025 Tech 4 Humanity Pty Ltd (ABN 61 605 746 618) · <Link href="/start">Start Free</Link> · <a href="mailto:hello@readingbuddy.ai">hello@readingbuddy.ai</a></p>
      </footer>
    </>
  )
}
