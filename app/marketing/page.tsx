"use client"
import { useState } from 'react'

const SIGNUP_URL = '/signup?plan=premium_monthly'

// Book types for the kids slide
const BOOK_TYPES = [
  { emoji: '🦕', title: 'Adventure & Discovery', desc: 'Dinosaurs, space, volcanoes, deep sea. Kids ask "why" — Reading Buddy answers after every 3 correct reads.' },
  { emoji: '🐨', title: 'Australian Stories', desc: 'Local animals, Indigenous stories, bush adventures. Connected to the world they actually live in.' },
  { emoji: '🔬', title: 'How Things Work', desc: 'Science made readable. Matched to their level, never dumbed down.' },
  { emoji: '😂', title: 'Funny Books', desc: 'Because kids who laugh while reading, keep reading. Prosody scores go up too.' },
  { emoji: '🏆', title: 'Sport & Heroes', desc: 'Real Australians. Real stories. High-interest for reluctant readers.' },
  { emoji: '🎨', title: 'Your School\'s Own Texts', desc: 'Upload any PDF, Word doc or URL. Reading Buddy turns it into a fully scored session.' },
]

// Teacher features
const TEACHER_FEATURES = [
  { icon: '⏱️', title: '6 hours back every week', desc: 'That\'s the average time teachers save on reading admin. Marking, levelling, reports, parent comms — automated.' },
  { icon: '📊', title: 'Colour-coded class health', desc: 'One screen. Every student. Green = on track. Amber = watch. Red = act. No spreadsheets, no waiting for term reports.' },
  { icon: '📋', title: 'One-click parent reports', desc: 'Plain English. What the child worked on, how they\'re going, what to practise at home. Done in seconds.' },
  { icon: '📚', title: 'AI book recommendations', desc: 'Based on their level, recent progress, and interests. A personalised pick-list every session. No hunting through tubs.' },
  { icon: '🎯', title: 'Early intervention flags', desc: 'Reading Buddy alerts you before a student falls behind — not 6 weeks later at the term report.' },
  { icon: '🏫', title: 'Works with your program', desc: 'PM Readers, Oxford, Sunshine, or your own texts. Align to whatever your school already uses.' },
]

// Pricing comparison for parents
const PARENT_PRICING = [
  { label: 'One book series', cost: '$3,000', note: 'needs replacing every few years' },
  { label: 'After-school tutor', cost: '$80–120/hr', note: '2 sessions/week = $8,000+/year' },
  { label: 'School reading coordinator', cost: '$90–110k/yr', note: 'shared across whole school' },
  { label: 'Reading Buddy Premium', cost: '$59/month', note: 'your child, every session, every week' },
]

export default function MarketingPage() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeTeacher, setActiveTeacher] = useState(0)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Nunito:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Nunito, sans-serif; }
        .mkt { font-family: Nunito, sans-serif; background: #fff; color: #111; }

        /* NAV */
        .mkt-nav { display: flex; align-items: center; justify-content: space-between; padding: 18px 60px; background: #fff; border-bottom: 1px solid #f0f0f0; position: sticky; top: 0; z-index: 100; }
        .mkt-logo { font-family: Caveat, cursive; font-weight: 700; font-size: 1.7rem; color: #111; text-decoration: none; line-height: 1.1; }
        .mkt-nav-links { display: flex; align-items: center; gap: 32px; }
        .mkt-nav-links a { font-size: 0.92rem; color: #444; text-decoration: none; font-weight: 600; }
        .mkt-cta-btn { background: #E8534A; color: #fff; font-family: Nunito,sans-serif; font-weight: 700; font-size: 0.9rem; padding: 10px 24px; border-radius: 40px; border: none; cursor: pointer; text-decoration: none; display: inline-block; transition: background 0.2s; }
        .mkt-cta-btn:hover { background: #d44940; }

        /* HERO */
        .mkt-hero { display: flex; align-items: center; justify-content: space-between; padding: 80px 60px 60px; gap: 60px; min-height: 80vh; }
        .mkt-hero h1 { font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 900; line-height: 1.2; margin-bottom: 20px; }
        .mkt-hero p { font-size: 1rem; color: #555; line-height: 1.75; margin-bottom: 32px; max-width: 440px; }
        .mkt-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        .mkt-btn-primary { background: #E8534A; color: #fff; font-family: Nunito,sans-serif; font-weight: 700; font-size: 0.95rem; padding: 14px 32px; border-radius: 12px; border: none; cursor: pointer; text-decoration: none; display: inline-block; transition: background 0.2s; }
        .mkt-btn-primary:hover { background: #d44940; }
        .mkt-btn-secondary { background: transparent; color: #111; font-family: Nunito,sans-serif; font-weight: 700; font-size: 0.95rem; padding: 14px 32px; border-radius: 12px; border: 2px solid #ddd; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.2s; }
        .mkt-btn-secondary:hover { border-color: #111; }

        /* PHONE MOCKUP */
        .mkt-phone { width: 260px; min-height: 520px; background: #fff; border-radius: 42px; border: 8px solid #111; box-shadow: 0 30px 80px rgba(0,0,0,0.18); position: relative; overflow: hidden; flex-shrink: 0; transform: perspective(1200px) rotateY(-8deg) rotateX(4deg); }
        .mkt-phone-notch { position: absolute; top: 12px; left: 50%; transform: translateX(-50%); width: 88px; height: 22px; background: #111; border-radius: 11px; z-index: 10; }
        .mkt-phone-body { padding: 52px 20px 90px; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
        .mkt-abc-bar { position: absolute; bottom: 0; left: 0; right: 0; display: flex; justify-content: center; gap: 3px; padding: 0 8px 10px; }
        .mkt-abc-letter { width: 48px; height: 48px; border-radius: 12px; color: #fff; font-family: Nunito,sans-serif; font-weight: 900; font-size: 1.3rem; display: flex; align-items: center; justify-content: center; }

        /* YELLOW SECTIONS */
        .mkt-yellow { background: #F5C344; padding: 80px 60px; }
        .mkt-white { background: #fff; padding: 80px 60px; }
        .mkt-row { display: flex; align-items: center; gap: 64px; }
        .mkt-row.rev { flex-direction: row-reverse; }

        /* SLIDES */
        .slides-section { padding: 80px 60px; background: #fff; }
        .slides-header { text-align: center; margin-bottom: 48px; }
        .slides-header h2 { font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 900; margin-bottom: 10px; }
        .slides-header p { color: #555; font-size: 0.95rem; max-width: 540px; margin: 0 auto; }
        .slides-tabs { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-bottom: 32px; }
        .slide-tab { padding: 8px 18px; border-radius: 40px; border: 2px solid #ddd; background: transparent; font-family: Nunito,sans-serif; font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; }
        .slide-tab.active { background: #1D6E63; border-color: #1D6E63; color: #fff; }
        .slides-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .slide-card { background: #F5F9F8; border: 2px solid #DDE8E7; border-radius: 16px; padding: 24px 20px; transition: all 0.2s; }
        .slide-card:hover { border-color: #1D6E63; box-shadow: 0 4px 20px rgba(29,110,99,0.12); transform: translateY(-2px); }
        .slide-emoji { font-size: 2.2rem; margin-bottom: 12px; }
        .slide-card h3 { font-weight: 800; font-size: 0.95rem; color: #1A2744; margin-bottom: 8px; }
        .slide-card p { font-size: 0.85rem; color: #6B7A99; line-height: 1.6; }

        /* TEACHER SECTION */
        .teacher-section { background: #1D6E63; padding: 80px 60px; }
        .teacher-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
        .teacher-feature { padding: 20px; border-radius: 14px; cursor: pointer; transition: all 0.2s; border: 2px solid transparent; }
        .teacher-feature:hover { background: rgba(255,255,255,0.08); }
        .teacher-feature.active { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.25); }
        .teacher-feature-icon { font-size: 1.8rem; margin-bottom: 8px; }
        .teacher-feature h3 { font-weight: 800; color: #fff; font-size: 0.95rem; margin-bottom: 6px; }
        .teacher-feature p { font-size: 0.85rem; color: rgba(255,255,255,0.75); line-height: 1.6; }

        /* PARENT PRICING */
        .pricing-section { padding: 80px 60px; background: #FFF8F2; }
        .pricing-header { text-align: center; margin-bottom: 48px; }
        .pricing-header h2 { font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 900; margin-bottom: 10px; }
        .pricing-header p { color: #555; max-width: 480px; margin: 0 auto; }
        .pricing-compare { max-width: 640px; margin: 0 auto; }
        .pricing-row { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #DDE8E7; }
        .pricing-row:last-child { border-bottom: none; }
        .pricing-label { font-weight: 600; font-size: 0.95rem; color: #1A2744; }
        .pricing-note { font-size: 0.78rem; color: #6B7A99; margin-top: 2px; }
        .pricing-cost { font-family: Nunito,sans-serif; font-weight: 900; font-size: 1.1rem; text-align: right; }
        .pricing-cost.highlight { color: #1D6E63; background: #E8F6F5; padding: 6px 14px; border-radius: 40px; }
        .pricing-cta-box { background: #1D6E63; border-radius: 20px; padding: 36px 32px; text-align: center; margin-top: 40px; }
        .pricing-cta-box h3 { font-weight: 900; font-size: 1.3rem; color: #fff; margin-bottom: 8px; }
        .pricing-cta-box p { color: rgba(255,255,255,0.8); font-size: 0.9rem; margin-bottom: 24px; }

        /* HOW IT WORKS */
        .how-section { padding: 80px 60px; background: #fff; }
        .how-steps { display: flex; gap: 0; align-items: flex-start; margin-top: 48px; position: relative; }
        .how-step { flex: 1; text-align: center; padding: 0 16px; position: relative; }
        .how-step-num { width: 48px; height: 48px; border-radius: 50%; background: #1D6E63; color: #fff; font-family: Nunito,sans-serif; font-weight: 900; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
        .how-step h3 { font-weight: 800; font-size: 0.92rem; color: #1A2744; margin-bottom: 6px; }
        .how-step p { font-size: 0.82rem; color: #6B7A99; line-height: 1.6; }
        .how-connector { position: absolute; top: 24px; left: 50%; right: -50%; height: 2px; background: #DDE8E7; z-index: 0; }

        /* CONTACT / FOOTER */
        .mkt-contact { padding: 60px; background: #111; text-align: center; }
        .mkt-contact .mkt-logo { color: #fff; margin-bottom: 12px; display: block; }
        .mkt-contact p { color: rgba(255,255,255,0.6); font-size: 0.85rem; margin-bottom: 8px; }
        .mkt-contact a { color: #F4A261; font-weight: 700; text-decoration: none; }

        @media (max-width: 900px) {
          .mkt-nav { padding: 16px 24px; }
          .mkt-nav-links { display: none; }
          .mkt-hero { flex-direction: column; padding: 40px 24px; }
          .mkt-phone { transform: none; }
          .mkt-yellow, .mkt-white, .slides-section, .teacher-section, .pricing-section, .how-section { padding: 60px 24px; }
          .mkt-row, .mkt-row.rev { flex-direction: column; gap: 40px; }
          .slides-grid { grid-template-columns: 1fr 1fr; }
          .teacher-grid { grid-template-columns: 1fr; }
          .mkt-contact { padding: 40px 24px; }
        }
        @media (max-width: 600px) {
          .slides-grid { grid-template-columns: 1fr; }
          .how-steps { flex-direction: column; gap: 24px; }
          .how-connector { display: none; }
        }
      `}</style>

      <div className="mkt">

        {/* NAV */}
        <nav className="mkt-nav">
          <a href="/" className="mkt-logo">Reading<br />Buddy</a>
          <div className="mkt-nav-links">
            <a href="#for-kids">For Kids</a>
            <a href="#for-teachers">For Teachers</a>
            <a href="#pricing">Pricing</a>
            <a href="/">Main Site</a>
          </div>
          <a href={SIGNUP_URL} className="mkt-cta-btn">Start free trial</a>
        </nav>

        {/* HERO */}
        <section className="mkt-hero">
          <div style={{ flex: 1 }}>
            <h1>Spark Your Child&apos;s Curiosity As They Master Reading</h1>
            <p>
              Designed for ages 5–8, Reading Buddy uses the phonics approach to help kids learn to read.
              No points. No gamification. Just pure curiosity rewarded with real answers.
              Building confidence and a love for learning — one book at a time.
            </p>
            <div className="mkt-hero-btns">
              <a href={SIGNUP_URL} className="mkt-btn-primary">Start free — no credit card</a>
              <a href="#for-teachers" className="mkt-btn-secondary">I&apos;m a teacher →</a>
            </div>
          </div>
          <div className="mkt-phone">
            <div className="mkt-phone-notch" />
            <div className="mkt-phone-body">
              <div style={{ fontFamily: 'Caveat,cursive', fontSize: '1.8rem', fontWeight: 700, marginBottom: 8 }}>Reading Buddy</div>
              <div style={{ fontSize: '0.78rem', color: '#555', marginBottom: 16, lineHeight: 1.5 }}>
                Reading makes your imagination<br />grow bigger and stronger! 🌱
              </div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#111' }}>Excellent! 🎉</div>
              <div style={{ fontSize: '0.75rem', color: '#555', marginTop: 4 }}>You read &apos;sat&apos; perfectly</div>
            </div>
            <div className="mkt-abc-bar">
              {[['A','#E8534A'],['B','#4ABDE8'],['C','#4AE8A0'],['D','#E8C84A']].map(([l,c]) => (
                <div key={l} className="mkt-abc-letter" style={{ background: c }}>{l}</div>
              ))}
            </div>
          </div>
        </section>

        {/* GIVE YOUR CHILD — yellow */}
        <section className="mkt-yellow">
          <div className="mkt-row">
            <div className="mkt-phone" style={{ transform: 'none' }}>
              <div className="mkt-phone-notch" />
              <div className="mkt-phone-body">
                <div style={{ fontSize: '0.78rem', color: '#555', marginBottom: 16 }}>Ready to start your reading adventure?</div>
                <a href={SIGNUP_URL} className="mkt-cta-btn" style={{ fontSize: '0.85rem' }}>Start Reading</a>
              </div>
              <div className="mkt-abc-bar">
                {[['A','#E8534A'],['B','#4ABDE8'],['C','#4AE8A0'],['D','#E8C84A']].map(([l,c]) => (
                  <div key={l} className="mkt-abc-letter" style={{ background: c, width: 44, height: 44 }}>{l}</div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', fontWeight: 900, marginBottom: 20, lineHeight: 1.25 }}>
                Give your child the gift of confident reading and the freedom to explore their world.
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, marginBottom: 28, color: '#333' }}>
                No points. No gamification. Just pure, unfiltered curiosity driving a deeper love of reading.
                After every three correct reads, they can ask Reading Buddy anything that sparks their curiosity —
                dinosaurs, volcanoes, space, whatever they dream up.
              </p>
              <a href={SIGNUP_URL} className="mkt-btn-primary">Start free trial</a>
            </div>
          </div>
        </section>

        {/* BOOKS FOR KIDS — slides */}
        <section className="slides-section" id="for-kids">
          <div className="slides-header">
            <div style={{ display: 'inline-block', background: '#E8F6F5', color: '#1D6E63', fontWeight: 700, fontSize: '0.75rem', padding: '4px 14px', borderRadius: 40, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
              📚 Books for every child
            </div>
            <h2>Not one size fits all.<br />Books matched to every child, every session.</h2>
            <p>Reading Buddy isn&apos;t locked to a single reading series. Every child gets books matched to their level, interests, and goals — automatically.</p>
          </div>

          <div className="slides-grid">
            {BOOK_TYPES.map((book, i) => (
              <div key={i} className="slide-card" onClick={() => setActiveSlide(i)}>
                <div className="slide-emoji">{book.emoji}</div>
                <h3>{book.title}</h3>
                <p>{book.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <a href={SIGNUP_URL} className="mkt-btn-primary">Start free — see it with your child</a>
          </div>
        </section>

        {/* FOR TEACHERS */}
        <section className="teacher-section" id="for-teachers">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-block', background: 'rgba(244,162,97,0.2)', color: '#F4A261', fontWeight: 700, fontSize: '0.75rem', padding: '4px 14px', borderRadius: 40, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
              👩‍🏫 For teachers
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: '#fff', marginBottom: 10 }}>
              6 hours back. Every week. Starting Monday.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 520, margin: '0 auto' }}>
              Reading Buddy automates the admin. You get the time back. Here&apos;s what that looks like in practice.
            </p>
          </div>

          <div className="teacher-grid">
            <div>
              {TEACHER_FEATURES.map((f, i) => (
                <div key={i} className={`teacher-feature${activeTeacher === i ? ' active' : ''}`} onClick={() => setActiveTeacher(i)}>
                  <div className="teacher-feature-icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
              {/* Quote card */}
              <div style={{ background: '#fff', borderRadius: 20, padding: '32px 28px' }}>
                <div style={{ fontSize: '2.5rem', color: '#E8F6F5', fontFamily: 'Georgia,serif', lineHeight: 1, marginBottom: 12 }}>&ldquo;</div>
                <p style={{ fontSize: '1rem', color: '#1A2744', lineHeight: 1.7, fontWeight: 600, marginBottom: 16 }}>
                  Reading Buddy saved me 8 hours of reporting this week alone.
                  My Year 3s are reading more because I actually have time to teach.
                </p>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1D6E63' }}>Ms Thompson, Year 3 · NSW Public School</div>
              </div>
              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[['30s', 'to score a session'],['6 hrs/wk', 'saved per teacher'],['6 reports', 'per reading, auto'],['100%', 'NDIS compliant']].map(([n,l]) => (
                  <div key={n} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 900, fontSize: '1.4rem', color: '#fff' }}>{n}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
              <a href={SIGNUP_URL} className="mkt-btn-primary" style={{ textAlign: 'center' }}>Start free — one classroom</a>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how-section">
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.6rem,3vw,2.2rem)' }}>From reading session to report in 60 seconds.</h2>
            <p style={{ color: '#555', marginTop: 8 }}>Five steps. Fully automated.</p>
          </div>
          <div className="how-steps">
            {[
              ['🎙', 'Student reads aloud', 'Any device. No setup. Session starts instantly.'],
              ['🤖', 'AI listens & scores', 'WPM, accuracy, prosody. Done before they close the book.'],
              ['📋', 'Reports generate', '6 report types. Parent, teacher, NDIS, class summary — all auto.'],
              ['📊', 'Dashboard updates', 'Live. School-wide. Colour-coded. No waiting.'],
              ['📚', 'Books recommended', 'Personalised list every session. Matched to their level today.'],
            ].map(([icon, title, desc], i) => (
              <div key={i} className="how-step">
                {i < 4 && <div className="how-connector" />}
                <div className="how-step-num">{i + 1}</div>
                <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PARENT PRICING — value comparison */}
        <section className="pricing-section" id="pricing">
          <div className="pricing-header">
            <div style={{ display: 'inline-block', background: '#E8F6F5', color: '#1D6E63', fontWeight: 700, fontSize: '0.75rem', padding: '4px 14px', borderRadius: 40, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
              💰 The real cost comparison
            </div>
            <h2>Less than one book set.<br />More than a full-time coordinator.</h2>
            <p>Here&apos;s what Australian families and schools actually spend on reading — and what Reading Buddy costs by comparison.</p>
          </div>

          <div className="pricing-compare">
            {PARENT_PRICING.map((row, i) => (
              <div key={i} className="pricing-row">
                <div>
                  <div className="pricing-label">{row.label}</div>
                  <div className="pricing-note">{row.note}</div>
                </div>
                <div className={`pricing-cost${i === PARENT_PRICING.length - 1 ? ' highlight' : ''}`}>
                  {row.cost}
                  {i === PARENT_PRICING.length - 1 && <div style={{ fontSize: '0.7rem', fontWeight: 600, marginTop: 2 }}>← that&apos;s us</div>}
                </div>
              </div>
            ))}

            <div style={{ marginTop: 24, padding: '20px 24px', background: '#fff', borderRadius: 16, border: '2px solid #DDE8E7' }}>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1A2744', marginBottom: 8 }}>What $59/month actually gets you:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {['Unlimited sessions every week','AI scores every reading — WPM, accuracy, prosody','6 auto-generated reports per session','NDIS-compliant progress notes','AI book recommendations personalised to your child','Parent snapshots in plain English after every session'].map(f => (
                  <div key={f} style={{ display: 'flex', gap: 8, fontSize: '0.85rem', color: '#1A2744' }}>
                    <span style={{ color: '#1D6E63', fontWeight: 900, flexShrink: 0 }}>✓</span>{f}
                  </div>
                ))}
              </div>
            </div>

            <div className="pricing-cta-box">
              <h3>Try it free. No credit card.</h3>
              <p>Start with one classroom or one child. 14-day trial. We set it up within 24 hours.</p>
              <a href={SIGNUP_URL} className="mkt-btn-primary" style={{ display: 'inline-block' }}>Start free trial →</a>
              <div style={{ marginTop: 12, color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>or <a href="mailto:readingbuddy@outcome-ready.com" style={{ color: '#F4A261' }}>email us</a> — we&apos;ll talk you through it</div>
            </div>
          </div>
        </section>

        {/* NDIS YELLOW */}
        <section className="mkt-yellow">
          <div className="mkt-row rev">
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 900, marginBottom: 16, lineHeight: 1.3 }}>
                NDIS documentation that writes itself.
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#333', marginBottom: 8 }}>
                Progress notes. Goal tracking. Plan review evidence. All generated automatically from every reading session.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#333', marginBottom: 24 }}>
                Aligned to NDIS Practice Standards. Audit-ready. Stored in Australian data centres.
                Providers spend their time on therapy — not paperwork.
              </p>
              <a href={SIGNUP_URL} className="mkt-btn-primary">Start free — NDIS providers welcome</a>
            </div>
            <div className="mkt-phone" style={{ transform: 'none' }}>
              <div className="mkt-phone-notch" />
              <div className="mkt-phone-body" style={{ gap: 8 }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>NDIS Progress Note</div>
                <div style={{ fontSize: '0.72rem', color: '#555', lineHeight: 1.5, textAlign: 'left', background: '#f5f5f5', borderRadius: 8, padding: 10 }}>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>Session: 28 Mar 2026</div>
                  <div>Participant read &apos;The Lighthouse&apos; (Level 22). WPM: 89. Accuracy: 91%. Goal: fluency — progressing toward target. No support needed this session.</div>
                </div>
                <div style={{ background: '#4AE8A0', color: '#fff', borderRadius: 8, padding: '6px 12px', fontSize: '0.75rem', fontWeight: 700 }}>✓ Approved — ready to submit</div>
              </div>
              <div className="mkt-abc-bar">
                {[['A','#E8534A'],['B','#4ABDE8'],['C','#4AE8A0'],['D','#E8C84A']].map(([l,c]) => (
                  <div key={l} className="mkt-abc-letter" style={{ background: c, width: 44, height: 44 }}>{l}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT / FOOTER */}
        <div className="mkt-contact">
          <span className="mkt-logo">Reading<br />Buddy</span>
          <p>AI-powered reading intelligence for Australian schools and NDIS providers.</p>
          <p><a href="mailto:readingbuddy@outcome-ready.com">readingbuddy@outcome-ready.com</a></p>
          <p style={{ marginTop: 16 }}>Tech 4 Humanity Pty Ltd · ABN 70 666 271 272 · Built in Australia 🇦🇺</p>
          <p style={{ marginTop: 8 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.5)' }}>← Main Site</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 12px' }}>·</span>
            © 2026 All rights reserved.
          </p>
        </div>

      </div>
    </>
  )
}
