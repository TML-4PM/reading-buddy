'use client'
import { useState } from 'react'
import './page.css'

const LETTERS = [
  { l: 'A', word: 'Apple 🍎',     emoji: '🍎', caption: 'A is for Apple',     img: 'A' },
  { l: 'B', word: 'Book 📚',      emoji: '📚', caption: 'B is for Book',      img: 'B' },
  { l: 'C', word: 'Cat 🐱',       emoji: '🐱', caption: 'C is for Cat',       img: 'C' },
  { l: 'D', word: 'Dog 🐶',       emoji: '🐶', caption: 'D is for Dog',       img: 'D' },
  { l: 'E', word: 'Elephant 🐘',  emoji: '🐘', caption: 'E is for Elephant',  img: null },
  { l: 'F', word: 'Fish 🐟',      emoji: '🐟', caption: 'F is for Fish',      img: null },
  { l: 'G', word: 'Giraffe 🦒',   emoji: '🦒', caption: 'G is for Giraffe',   img: null },
  { l: 'H', word: 'House 🏠',     emoji: '🏠', caption: 'H is for House',     img: null },
  { l: 'I', word: 'Ice cream 🍦', emoji: '🍦', caption: 'I is for Ice Cream', img: null },
  { l: 'J', word: 'Jungle 🌴',    emoji: '🌴', caption: 'J is for Jungle',    img: null },
  { l: 'K', word: 'Kite 🪁',      emoji: '🪁', caption: 'K is for Kite',      img: null },
  { l: 'L', word: 'Lion 🦁',      emoji: '🦁', caption: 'L is for Lion',      img: null },
  { l: 'M', word: 'Moon 🌙',      emoji: '🌙', caption: 'M is for Moon',      img: null },
  { l: 'N', word: 'Nest 🪹',      emoji: '🪹', caption: 'N is for Nest',      img: null },
  { l: 'O', word: 'Owl 🦉',       emoji: '🦉', caption: 'O is for Owl',       img: null },
  { l: 'P', word: 'Penguin 🐧',   emoji: '🐧', caption: 'P is for Penguin',   img: null },
  { l: 'Q', word: 'Queen 👑',     emoji: '👑', caption: 'Q is for Queen',     img: null },
  { l: 'R', word: 'Rainbow 🌈',   emoji: '🌈', caption: 'R is for Rainbow',   img: null },
  { l: 'S', word: 'Star ⭐',      emoji: '⭐', caption: 'S is for Star',      img: null },
  { l: 'T', word: 'Tiger 🐯',     emoji: '🐯', caption: 'T is for Tiger',     img: null },
  { l: 'U', word: 'Umbrella ☂️',  emoji: '☂️', caption: 'U is for Umbrella',  img: null },
  { l: 'V', word: 'Volcano 🌋',   emoji: '🌋', caption: 'V is for Volcano',   img: null },
  { l: 'W', word: 'Whale 🐋',     emoji: '🐋', caption: 'W is for Whale',     img: null },
  { l: 'X', word: 'Xylophone 🎵', emoji: '🎵', caption: 'X is for Xylophone', img: null },
  { l: 'Y', word: 'Yak 🦙',       emoji: '🦙', caption: 'Y is for Yak',       img: null },
  { l: 'Z', word: 'Zebra 🦓',     emoji: '🦓', caption: 'Z is for Zebra',     img: null },
]

function LearningWeblet() {
  const [current, setCurrent] = useState(0)
  const [imgErr, setImgErr] = useState(false)
  const d = LETTERS[current]
  const pct = Math.round(((current + 1) / 26) * 100)

  const goTo = (i: number) => { setCurrent(i); setImgErr(false) }
  const prev = () => goTo((current - 1 + 26) % 26)
  const next = () => goTo((current + 1) % 26)

  return (
    <div className="rb-weblet-section" id="try-it">
      <div className="rb-weblet-inner">
        <div className="rb-weblet-header">
          <div className="rb-weblet-badge">✨ Interactive Learning Weblet</div>
          <h2>Try Reading Buddy with your child</h2>
          <p>A preview of the student-facing experience — simple, playful, always encouraging.</p>
        </div>
        <div className="rb-weblet-app">
          <div className="rb-weblet-topbar">
            <div className="rb-dots">
              <div className="rb-dot rb-dot-r" />
              <div className="rb-dot rb-dot-y" />
              <div className="rb-dot rb-dot-g" />
            </div>
            <div className="rb-weblet-topbar-logo">📖 Reading Buddy — Student View</div>
            <div className="rb-weblet-topbar-tag">LIVE DEMO</div>
          </div>
          <div className="rb-weblet-body">
            <div className="rb-weblet-intro">
              <h3>Learning Buddy</h3>
              <p>Click a letter to explore — each one is an adventure!</p>
              <div className="rb-brain-fact">🧠✨ Your brain is like a superhero when you read!</div>
            </div>
            {/* Alphabet nav */}
            <div className="rb-alpha-nav">
              {LETTERS.map((lt, i) => (
                <button
                  key={lt.l}
                  className={`rb-alpha-btn${i === current ? ' active' : ''}`}
                  onClick={() => goTo(i)}
                >
                  {lt.l}
                </button>
              ))}
            </div>
            {/* Letter stage */}
            <div className="rb-letter-stage">
              <div className="rb-letter-card">
                <div className="rb-letter-big">{d.l}</div>
                <div className="rb-letter-small">{d.l.toLowerCase()}</div>
                <div className="rb-letter-word">{d.word}</div>
              </div>
              <div className="rb-letter-img-card">
                {d.img && !imgErr ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`https://learningbuddy.vercel.app/${d.img}.png`}
                    alt={d.caption}
                    onError={() => setImgErr(true)}
                  />
                ) : (
                  <div className="rb-emoji-display">{d.emoji}</div>
                )}
                <p>{d.caption}</p>
              </div>
            </div>
            {/* Progress */}
            <div className="rb-progress">
              <div className="rb-progress-label">Session progress</div>
              <div className="rb-progress-track">
                <div className="rb-progress-fill" style={{ width: `${pct}%` }} />
              </div>
              <div className="rb-progress-label">{current + 1} / 26</div>
            </div>
            {/* Nav */}
            <div className="rb-weblet-nav-btns">
              <button className="rb-wnav-btn" onClick={prev}>← Previous</button>
              <button className="rb-wnav-btn primary" onClick={next}>Next Letter →</button>
              <a className="rb-wnav-btn amber" href="mailto:readingbuddies@outcome-ready.com">Get Full Access ✨</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      {/* NAV */}
      <nav className="rb-nav">
        <div className="rb-nav-logo"><span>📖</span> Reading Buddy</div>
        <ul className="rb-nav-links">
          <li><a href="#try-it">Try it Free</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#contexts">Schools & NDIS</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="mailto:readingbuddies@outcome-ready.com" className="rb-nav-cta">Get Started</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="rb-hero">
        <div>
          <div className="rb-badge">🇦🇺 Built in Australia · NDIS Ready · AI-Powered</div>
          <h1>Reading tests used to be clipboards.<br /><em>This is what comes next.</em></h1>
          <div className="rb-brain">🧠✨ Did you know? Your brain is like a superhero when you read!</div>
          <p className="rb-hero-sub">AI reading intelligence that listens, scores, reports, and recommends — automatically, in real time, for every student, in every session.</p>
          <div className="rb-hero-actions">
            <a href="#try-it" className="rb-btn rb-btn-primary">▶ Try it Free — One Class</a>
            <a href="#pricing" className="rb-btn rb-btn-outline">See Pricing</a>
          </div>
        </div>
        <div className="rb-hero-visual">
          <div className="rb-stat teal">
            <div className="rb-stat-num">16×</div>
            <div className="rb-stat-label">Book sets replaced</div>
            <div className="rb-stat-desc">4 grades × 4 sets = $48,000. Reading Buddy costs $4,900/yr.</div>
          </div>
          <div className="rb-stat amber">
            <div className="rb-stat-num">6 hrs</div>
            <div className="rb-stat-label">Saved per teacher/week</div>
            <div className="rb-stat-desc">Marking, levelling, reporting, parent comms — automated.</div>
          </div>
          <div className="rb-stat teal">
            <div className="rb-stat-num">30s</div>
            <div className="rb-stat-label">To score a full session</div>
            <div className="rb-stat-desc">vs 15 minutes of manual marking per student.</div>
          </div>
          <div className="rb-stat amber">
            <div className="rb-stat-num">100%</div>
            <div className="rb-stat-label">NDIS compliance</div>
            <div className="rb-stat-desc">Structured to NDIS Practice Standards out of the box.</div>
          </div>
        </div>
      </section>

      {/* LEARNING BUDDY WEBLET */}
      <LearningWeblet />

      {/* BEFORE/AFTER */}
      <section className="rb-section-dark">
        <div className="rb-section-label">The transformation</div>
        <h2 className="rb-section-title">Reading assessment hasn&apos;t changed in 30 years. Until now.</h2>
        <p className="rb-section-sub">Plastic tubs. Paper records. Manual marking. Hours of admin. Every school knows the pain.</p>
        <div className="rb-transform-grid">
          {[
            { icon: '📦', before: 'Plastic tubs of levelled readers — $3,000 per series, needs replacing, fixed and static', after: 'Unlimited digital library — always current, AI-levelled in real time. Included in all plans.' },
            { icon: '📝', before: 'Paper running records and clipboards — manual, inconsistent, sits in a binder', after: 'Automated session capture — every metric scored instantly. Zero admin.' },
            { icon: '📄', before: 'Hand-written parent reports — 1–2 hrs/week, often generic', after: 'Plain-English snapshots — auto-generated after every session. One click.' },
            { icon: '📋', before: 'Manual NDIS progress notes — 2–4 hrs/week per provider, inconsistent quality', after: 'NDIS-aligned progress notes — from every session. Audit-ready.' },
          ].map((row, i) => (
            <>
              <div key={`b${i}`} className="rb-transform-row before">
                <div className="t-icon">{row.icon}</div>
                <div><div className="t-label">Before</div><p>{row.before}</p></div>
              </div>
              <div key={`a${i}`} className="rb-transform-row after">
                <div className="t-icon">✅</div>
                <div><div className="t-label">With Reading Buddy</div><p>{row.after}</p></div>
              </div>
            </>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="rb-section" id="features">
        <div className="rb-text-center" style={{ maxWidth: 640, margin: '0 auto' }}>
          <div className="rb-section-label">How it works</div>
          <h2 className="rb-section-title">From reading session to report in under 60 seconds.</h2>
          <p className="rb-section-sub">Five steps. Fully automated. What used to take a week of admin now happens before the student closes the book.</p>
        </div>
        <div className="rb-steps">
          {[
            { num: '01', icon: '🎙', title: 'Student reads aloud', desc: 'On any tablet, phone, or laptop. No special hardware. Session starts in seconds.', tag: 'Zero prep time' },
            { num: '02', icon: '🤖', title: 'AI scores instantly', desc: 'WPM, accuracy, prosody, fluency. Results appear before the student closes the book.', tag: '< 30 seconds' },
            { num: '03', icon: '📋', title: 'Reports write themselves', desc: 'Parent snapshot, NDIS note, class summary, book recommendations — all auto-generated.', tag: '6 report types' },
            { num: '04', icon: '📊', title: 'Dashboard shows all', desc: 'Teacher sees every student. Principal sees every classroom. NDIS provider sees every participant.', tag: 'Real-time data' },
            { num: '05', icon: '📚', title: 'Books recommended', desc: 'Based on level, recent progress, and interests. A personalised pick-list every single session.', tag: 'Always personalised' },
          ].map(s => (
            <div key={s.num} className="rb-step" data-num={s.num}>
              <div className="rb-step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="rb-step-tag">{s.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6 REPORTS */}
      <section className="rb-section-dark">
        <div className="rb-text-center" style={{ maxWidth: 580, margin: '0 auto' }}>
          <div className="rb-section-label">Six reports from one session</div>
          <h2 className="rb-section-title">All automatic. All from one reading.</h2>
          <p className="rb-section-sub">No templates, no copy-paste. Every time a student reads, six reports appear simultaneously.</p>
        </div>
        <div className="rb-reports-grid">
          {[
            { icon: '🤖', title: 'Session Summary', desc: 'WPM, accuracy, prosody, reading age estimate, and intervention flags. Generated the moment the session ends.' },
            { icon: '📈', title: 'Growth Trajectory', desc: 'Month-over-month reading growth plotted against national benchmarks. Exportable PDF for funding applications.' },
            { icon: '📋', title: 'NDIS Progress Note', desc: 'Goal-referenced, Practice Standards aligned, timestamped. Review and approve in under a minute.' },
            { icon: '👨‍👩‍👧', title: 'Parent Snapshot', desc: 'Plain-English summary of what the child worked on, progress made, and what to practise at home.' },
            { icon: '🏫', title: 'Class Health Report', desc: 'Every student in one view: on track, needs a push, or urgent intervention. Colour-coded and actionable.' },
            { icon: '📚', title: 'Book Recommendations', desc: 'Personalised reading list per student based on level, history, and interests. Library catalogue linked.' },
          ].map(r => (
            <div key={r.title} className="rb-report">
              <div className="rb-report-icon">{r.icon}</div>
              <h4>{r.title}</h4>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTEXTS */}
      <section className="rb-section" id="contexts">
        <div className="rb-section-label">Designed for every environment</div>
        <h2 className="rb-section-title">Classroom. Clinic. Home. School-wide.</h2>
        <p className="rb-section-sub">Same platform, different power depending on who is behind the screen.</p>
        <div className="rb-contexts-grid">
          {[
            { icon: '🏫', title: 'Public Schools', desc: 'Curriculum outcomes, NAPLAN data, funding evidence. Every student scored, every session, automatically. Teachers get metrics — not marking.' },
            { icon: '🎓', title: 'Private Schools', desc: 'ATAR prep, parent engagement, board reporting. Real-time dashboards from classroom to principal in two clicks.' },
            { icon: '🎯', title: 'NDIS Providers', desc: 'Progress notes written, goals tracked, evidence generated. Providers spend their time on therapy — not paperwork. Australian data sovereignty guaranteed.' },
            { icon: '🏠', title: 'Parents at Home', desc: 'Plain-English snapshots after every session. What their child worked on, how they\'re going, what to practise. The brain-superhero experience, anywhere.' },
          ].map(c => (
            <div key={c.title} className="rb-ctx">
              <div className="rb-ctx-icon">{c.icon}</div>
              <div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <a href="mailto:readingbuddies@outcome-ready.com" className="rb-ctx-link">Get started →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="rb-section-navy" id="pricing">
        <div className="rb-text-center">
          <div className="rb-section-label light">Value-based pricing · No lock-in · Cancel anytime</div>
          <h2 className="rb-section-title light">Less than one book set.<br />More than a full-time coordinator.</h2>
          <p className="rb-section-sub light">A single reading series costs $3,000. Four grades, four sets — $48,000. Plus hours of weekly admin. Reading Buddy replaces all of it.</p>
        </div>
        <div className="rb-pricing-grid">
          {/* Freemium */}
          <div className="rb-plan">
            <div className="rb-plan-name">Freemium</div>
            <div className="rb-plan-price">Free</div>
            <div className="rb-plan-freq">Forever · No credit card</div>
            <ul className="rb-plan-features">
              <li><span className="rb-check">✓</span>1 classroom, unlimited students</li>
              <li><span className="rb-check">✓</span>Core metrics (WPM, accuracy)</li>
              <li><span className="rb-check">✓</span>Basic teacher snapshots</li>
              <li><span className="rb-check">✓</span>3 months data retention</li>
              <li><span className="rb-cross">–</span>Parent reports</li>
              <li><span className="rb-cross">–</span>NDIS mode</li>
            </ul>
            <a href="mailto:readingbuddies@outcome-ready.com?subject=Freemium" className="rb-plan-cta">Get Started Free</a>
          </div>
          {/* Popular */}
          <div className="rb-plan popular">
            <div className="rb-popular-badge">⭐ Most Popular</div>
            <div className="rb-plan-name">Premium Classroom</div>
            <div className="rb-plan-price">$59<span>/mo</span></div>
            <div className="rb-plan-freq">or $590/year — save 17%</div>
            <ul className="rb-plan-features">
              <li><span className="rb-check">✓</span>1 classroom, unlimited students</li>
              <li><span className="rb-check">✓</span>Full metrics + growth charts</li>
              <li><span className="rb-check">✓</span>Teacher + parent snapshots</li>
              <li><span className="rb-check">✓</span>AI book recommendations</li>
              <li><span className="rb-check">✓</span>NDIS mode — full</li>
              <li><span className="rb-check">✓</span>12 months data retention</li>
            </ul>
            <a href="mailto:readingbuddies@outcome-ready.com?subject=Premium+Classroom" className="rb-plan-cta">Start Free Trial</a>
          </div>
          {/* School */}
          <div className="rb-plan">
            <div className="rb-plan-name">Premium School</div>
            <div className="rb-plan-price">$4,900<span style={{ fontSize: '0.9rem' }}>/yr</span></div>
            <div className="rb-plan-freq">💡 16 book sets = $48,000. This is $4,900/yr.</div>
            <ul className="rb-plan-features">
              <li><span className="rb-check">✓</span>Up to 10 classrooms</li>
              <li><span className="rb-check">✓</span>School-wide literacy dashboard</li>
              <li><span className="rb-check">✓</span>All Premium Classroom features</li>
              <li><span className="rb-check">✓</span>Basic LMS / SIS integrations</li>
              <li><span className="rb-cross">–</span>Multi-site analytics</li>
              <li><span className="rb-cross">–</span>Custom integrations</li>
            </ul>
            <a href="mailto:readingbuddies@outcome-ready.com?subject=School+Plan" className="rb-plan-cta">Start School Plan</a>
          </div>
          {/* Enterprise */}
          <div className="rb-plan">
            <div className="rb-plan-name">Enterprise</div>
            <div className="rb-plan-price" style={{ fontSize: '1.6rem' }}>From $35k</div>
            <div className="rb-plan-freq">💡 Full-time coordinator = $90–110k/yr.</div>
            <ul className="rb-plan-features">
              <li><span className="rb-check">✓</span>Unlimited schools / sites</li>
              <li><span className="rb-check">✓</span>Custom LMS/SIS/NDIS integrations</li>
              <li><span className="rb-check">✓</span>Governance dashboards</li>
              <li><span className="rb-check">✓</span>Multi-site benchmarking</li>
              <li><span className="rb-check">✓</span>Phone support + onboarding</li>
              <li><span className="rb-check">✓</span>Unlimited data retention</li>
            </ul>
            <a href="mailto:readingbuddies@outcome-ready.com?subject=Enterprise" className="rb-plan-cta">Contact Sales</a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="rb-cta-band">
        <h2>Start free. Upgrade when it pays for itself.</h2>
        <p>Try one classroom free. The time saved on reporting alone covers the upgrade.</p>
        <div className="rb-cta-btns">
          <a href="mailto:readingbuddies@outcome-ready.com?subject=Free+Trial" className="rb-btn-white">Start free — one classroom</a>
          <a href="mailto:readingbuddies@outcome-ready.com?subject=Talk+to+Sales" className="rb-btn-white-outline">Talk to Sales</a>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="rb-footer" id="contact">
        <div className="rb-footer-grid">
          <div>
            <div className="rb-footer-brand"><span>📖</span> Reading Buddy</div>
            <p className="rb-footer-about">AI-powered reading intelligence for Australian schools and NDIS providers. Built to replace plastic tubs, clipboards, and hours of weekly admin.</p>
            <div className="rb-footer-contact">
              ✉️ <a href="mailto:readingbuddies@outcome-ready.com">readingbuddies@outcome-ready.com</a>
              <div style={{ fontSize: '0.8rem', marginTop: 6 }}>Tech 4 Humanity Pty Ltd · ABN 70 666 271 272</div>
            </div>
          </div>
          <div className="rb-footer-col">
            <h4>Product</h4>
            <ul>
              <li><a href="#try-it">Try it Free</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#contexts">NDIS Mode</a></li>
              <li><a href="#contexts">Schools</a></li>
            </ul>
          </div>
          <div className="rb-footer-col">
            <h4>Get Started</h4>
            <ul>
              <li><a href="mailto:readingbuddies@outcome-ready.com?subject=Free+Trial">Free Trial</a></li>
              <li><a href="mailto:readingbuddies@outcome-ready.com?subject=Premium">Premium Classroom</a></li>
              <li><a href="mailto:readingbuddies@outcome-ready.com?subject=School+Plan">School Plan</a></li>
              <li><a href="mailto:readingbuddies@outcome-ready.com?subject=Enterprise">Enterprise</a></li>
            </ul>
          </div>
          <div className="rb-footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
            <h4 style={{ marginTop: 20 }}>Data</h4>
            <ul>
              <li><a href="#">Australian Servers 🇦🇺</a></li>
              <li><a href="#">Privacy Act Compliant</a></li>
            </ul>
          </div>
        </div>
        <div className="rb-footer-bottom">
          <p>© 2026 Tech 4 Humanity Pty Ltd. All rights reserved. Built in Australia 🇦🇺</p>
          <div className="rb-abn">ABN 70 666 271 272</div>
        </div>
      </footer>
    </>
  )
}
