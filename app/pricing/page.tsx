'use client'
import Link from 'next/link'

const plans = [
  {
    name: 'Freemium',
    price: 'Free',
    period: '',
    freq: 'Forever · No credit card',
    desc: 'Try it with one class — no strings.',
    features: [
      '1 classroom, unlimited students',
      '1 wellbeing / friendship group',
      'Core reading metrics (WPM, accuracy, prosody)',
      'Basic teacher snapshots',
      '3 months data retention',
      'Community support',
    ],
    missing: ['Parent reports', 'NDIS mode', 'Custom book library', 'Growth charts & benchmarks'],
    cta: 'Get Started Free',
    href: 'mailto:readingbuddy@outcome-ready.com?subject=Freemium',
    featured: false,
    badge: null,
  },
  {
    name: 'Premium Classroom',
    price: '$59',
    period: '/month',
    freq: 'or $590/year — save 17%',
    desc: 'Everything a classroom needs.',
    hint: '💡 One book series costs $3,000. This is $590/year.',
    features: [
      '1 classroom, unlimited students',
      'Unlimited wellbeing / friendship groups',
      'Full reading metrics + growth charts',
      'Teacher + parent one-click snapshots',
      'AI book recommendations',
      '📚 Custom book library — upload your own texts',
      '📚 Per-student book customisation',
      'NDIS mode (full)',
      '12 months data retention',
      'Email support',
    ],
    missing: [],
    cta: 'Start Free Trial',
    href: 'mailto:readingbuddy@outcome-ready.com?subject=Premium+Classroom',
    featured: true,
    badge: '⭐ Most Popular',
  },
  {
    name: 'Premium School',
    price: '$5,900',
    period: '/year',
    freq: 'Up to 10 classrooms (+$590/extra/yr)',
    desc: 'Whole-school reading intelligence.',
    hint: '💡 16 book sets (4 grades × 4) = $48,000. This is $5,900/yr.',
    features: [
      'Up to 10 classrooms',
      'Unlimited wellbeing / friendship groups',
      'School-wide literacy dashboard',
      'All Premium Classroom features',
      '📚 School-wide custom book library',
      '📚 Per-class and per-student book customisation',
      '📚 Align books to your reading program (PM, Oxford, etc.)',
      'Basic LMS / SIS integrations',
      '12 months data retention',
      'Email support',
    ],
    missing: [],
    cta: 'Start School Plan',
    href: 'mailto:readingbuddy@outcome-ready.com?subject=School+Plan',
    featured: false,
    badge: null,
  },
  {
    name: 'Enterprise',
    price: 'From $35k',
    period: '',
    freq: 'Multi-school systems & NDIS providers',
    desc: 'Whole-organisation reading intelligence.',
    hint: '💡 A full-time reading coordinator costs $90–110k/yr. Enterprise covers an entire system.',
    features: [
      'Unlimited schools / sites',
      'Unlimited classrooms & groups',
      '📚 Fully custom book library per school/site',
      '📚 Curriculum-mapped book alignment',
      '📚 NDIS goal-linked custom content',
      'Custom integrations (LMS, SIS, NDIS portals)',
      'Governance & compliance dashboards',
      'Multi-site analytics & benchmarking',
      'Phone support + onboarding',
      'Unlimited data retention',
    ],
    missing: [],
    cta: 'Contact Sales',
    href: 'mailto:readingbuddy@outcome-ready.com?subject=Enterprise',
    featured: false,
    badge: null,
  },
]

export default function Pricing() {
  return (
    <>
      <nav className="nav">
        <div className="nav-logo"><Link href="/">📚 Reading Buddy</Link></div>
        <div className="nav-links">
          <Link href="/#try-it">Try it Free</Link>
          <Link href="/#features">Features</Link>
          <Link href="/#contexts">Schools & NDIS</Link>
          <Link href="/#contact">Contact</Link>
          <Link href="mailto:readingbuddy@outcome-ready.com" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #0d1e2e 0%, #1d6e63 100%)', padding: '5rem 2rem 4rem', textAlign: 'center', color: '#fff' }}>
        <p style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', marginBottom: '0.75rem' }}>Value-based pricing · No lock-in · Cancel anytime · AUD</p>
        <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(2rem,4.5vw,3.2rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.15 }}>
          Less than one book set.<br />More than a full-time coordinator.
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', maxWidth: 560, margin: '0 auto 2rem' }}>
          A single reading series costs $3,000. Four grades, four sets — $48,000. Plus hours of weekly admin. Reading Buddy replaces all of it.
        </p>
        {/* Custom books callout */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 40, padding: '0.6rem 1.25rem' }}>
          <span style={{ fontSize: '1.2rem' }}>📚</span>
          <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Every plan includes customisable books — match your curriculum, class, or NDIS goals</span>
        </div>
      </section>

      {/* PRICING GRID */}
      <main style={{ maxWidth: 1160, margin: '0 auto', padding: '4rem 1.5rem' }}>

        {/* CUSTOMISABLE BOOKS BANNER */}
        <div style={{ background: 'linear-gradient(135deg, #e8f5ee, #d4eae2)', border: '2px solid #4a7c59', borderRadius: 16, padding: '1.5rem 2rem', marginBottom: '3rem', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ fontSize: '3rem' }}>📚</div>
          <div>
            <h3 style={{ fontFamily: 'Fraunces, serif', fontWeight: 800, fontSize: '1.2rem', color: '#1a3c2d', marginBottom: '0.4rem' }}>Books customised to every child, class, and curriculum</h3>
            <p style={{ color: '#4a7c59', fontSize: '0.9rem', lineHeight: 1.65 }}>
              Reading Buddy isn't locked to a single book series. Upload your own texts, align to PM Readers, Oxford, or your school's reading program. Map books to NDIS goals. Customise per class or per individual child — at every tier.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {plans.map(p => (
            <div key={p.name} style={{
              border: `2px solid ${p.featured ? '#4a7c59' : '#e8e2d9'}`,
              borderRadius: 20,
              padding: '2rem 1.75rem',
              background: p.featured ? '#f0f8f3' : 'white',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {p.badge && (
                <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: '#4a7c59', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.9rem', borderRadius: 50, whiteSpace: 'nowrap' as const }}>{p.badge}</div>
              )}
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: '#5a5a5a', marginBottom: '0.5rem' }}>{p.name}</div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: p.price.startsWith('From') ? '1.6rem' : '2.4rem', fontWeight: 900, marginBottom: '0.15rem', lineHeight: 1 }}>
                {p.price}<span style={{ fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', color: '#5a5a5a', fontWeight: 400 }}>{p.period}</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#5a5a5a', marginBottom: p.hint ? '0.5rem' : '1rem' }}>{p.freq}</div>
              {p.hint && (
                <div style={{ fontSize: '0.78rem', background: '#fffbf0', border: '1px solid #e8d080', borderRadius: 8, padding: '0.5rem 0.75rem', marginBottom: '1rem', color: '#6b5a10', lineHeight: 1.5 }}>{p.hint}</div>
              )}
              <ul style={{ listStyle: 'none', marginBottom: '1.5rem', flex: 1 }}>
                {p.features.map(f => (
                  <li key={f} style={{ fontSize: '0.85rem', padding: '0.3rem 0', color: f.startsWith('📚') ? '#4a7c59' : '#1a1a1a', display: 'flex', gap: '0.5rem', fontWeight: f.startsWith('📚') ? 600 : 400 }}>
                    <span style={{ color: '#4a7c59', fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
                  </li>
                ))}
                {p.missing.map(f => (
                  <li key={f} style={{ fontSize: '0.85rem', padding: '0.3rem 0', color: '#aaa', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ flexShrink: 0 }}>–</span>{f}
                  </li>
                ))}
              </ul>
              <a href={p.href} className="btn-primary" style={{ display: 'block', textAlign: 'center' as const, background: p.featured ? '#4a7c59' : 'transparent', color: p.featured ? 'white' : '#4a7c59', border: `2px solid #4a7c59` }}>{p.cta}</a>
            </div>
          ))}
        </div>

        {/* FAQ strip */}
        <div style={{ marginTop: '3.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {[
            ['Can I upload my own books?', 'Yes. Any paid plan lets you upload custom texts, PDFs, or align to your existing reading program. Books can be assigned per class or per individual student.'],
            ['How does NDIS mode work?', 'NDIS mode auto-generates progress notes aligned to NDIS Practice Standards after every session. Goal-referenced, timestamped, and evidence-ready.'],
            ['What happens after the free trial?', 'You choose a plan or stay on Freemium. No automatic charges. Your data is retained for 30 days after any paid plan ends.'],
            ['Can I switch plans?', 'Yes, upgrade or downgrade any time. Annual plans are pro-rated. Enterprise contracts are fixed-term.'],
          ].map(([q, a]) => (
            <div key={q} style={{ borderTop: '2px solid #e8e2d9', paddingTop: '1.25rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem', color: '#1a1a1a' }}>{q}</div>
              <div style={{ fontSize: '0.85rem', color: '#5a5a5a', lineHeight: 1.65 }}>{a}</div>
            </div>
          ))}
        </div>
      </main>

      {/* CROSS-SELL — expanded T4H portfolio */}
      <div className="cross-sell">
        <h3>Also from Tech 4 Humanity</h3>
        <div className="cross-sell-links">
          <a href="https://outcome-ready.vercel.app">OutcomeReady</a>
          <a href="https://outcome-ready.vercel.app/thriving-kids">ThrivingOS</a>
          <a href="https://ai4tradies.org">AI for Tradies</a>
          <a href="https://valdocco-primary.vercel.app">Valdocco Primary</a>
          <a href="https://augmentedmemories.org">Augmented Memories</a>
          <a href="https://augmented-humanity.com">AHC</a>
        </div>
      </div>

      <footer style={{ padding: '2rem', textAlign: 'center', fontSize: '0.85rem', color: '#5a5a5a', borderTop: '1px solid #e8e2d9' }}>
        <p>© 2026 Tech 4 Humanity Pty Ltd · ABN 70 666 271 272 · Built in Australia 🇦🇺</p>
        <p style={{ marginTop: '0.5rem' }}>
          <a href="mailto:readingbuddy@outcome-ready.com" style={{ color: '#4a7c59' }}>readingbuddy@outcome-ready.com</a>
        </p>
      </footer>
    </>
  )
}
