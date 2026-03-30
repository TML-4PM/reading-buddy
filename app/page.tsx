"use client"
import { useState } from 'react'
import './page.css'

// Unsplash photo IDs — free, high quality, relevant
const IMGS = {
  // Kids reading
  kidReading1: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80&auto=format',
  kidReading2: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80&auto=format',
  kidReading3: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80&auto=format',
  // Teachers
  teacher1: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80&auto=format',
  teacher2: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80&auto=format',
  // Classroom
  classroom: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80&auto=format',
  // NDIS / clinic
  clinic: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80&auto=format',
  // Home reading
  homeReading: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800&q=80&auto=format',
  // Droid from repo
  droid: 'https://lzfgigiyqpuuxslsygjt.supabase.co/storage/v1/object/public/images/AHC%20droid%20head.webp',
  sceneClassroom: '/scene-classroom.png',
  sceneNdis: '/scene-ndis.png',
  scenePrincipal: '/scene-principal.png',
  sceneHome: '/scene-home.png',
}

// Mini chart component
function AccuracyChart() {
  const data = [
    { month: 'Aug', wpm: 42, acc: 71 },
    { month: 'Sep', wpm: 58, acc: 78 },
    { month: 'Oct', wpm: 74, acc: 83 },
    { month: 'Nov', wpm: 89, acc: 88 },
    { month: 'Dec', wpm: 103, acc: 92 },
    { month: 'Jan', wpm: 118, acc: 95 },
  ]
  const maxWpm = 130
  return (
    <div style={{ background: '#fff', borderRadius: 16, padding: '20px 24px', boxShadow: '0 4px 24px rgba(29,110,99,0.10)', border: '1.5px solid #DDE8E7' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '0.9rem', color: 'var(--navy)' }}>Reading Growth</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: 2 }}>Emma, Year 3 · Semester 1–2</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '1.6rem', color: 'var(--teal)' }}>118</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>WPM current</div>
        </div>
      </div>
      {/* Bar chart */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 80, marginBottom: 8 }}>
        {data.map((d, i) => (
          <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ width: '100%', height: Math.round((d.wpm / maxWpm) * 72), background: i === data.length - 1 ? 'var(--teal)' : 'var(--teal-light)', borderRadius: '4px 4px 0 0', transition: 'height 0.3s' }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {data.map(d => (
          <div key={d.month} style={{ flex: 1, textAlign: 'center', fontSize: '0.65rem', color: 'var(--muted)', fontFamily: 'var(--font-head)', fontWeight: 600 }}>{d.month}</div>
        ))}
      </div>
      {/* Accuracy line */}
      <div style={{ marginTop: 12, display: 'flex', gap: 6, alignItems: 'center' }}>
        <div style={{ width: 24, height: 3, background: 'var(--amber)', borderRadius: 2 }} />
        <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>Accuracy: 71% → 95%</span>
        <span style={{ marginLeft: 'auto', fontSize: '0.72rem', fontFamily: 'var(--font-head)', fontWeight: 700, color: 'var(--teal)' }}>↑ +24%</span>
      </div>
    </div>
  )
}

function ClassHealthChart() {
  const students = [
    { name: 'Emma', level: 95, status: 'on-track' },
    { name: 'Liam', level: 88, status: 'on-track' },
    { name: 'Aisha', level: 72, status: 'watch' },
    { name: 'Noah', level: 61, status: 'alert' },
    { name: 'Zoe', level: 91, status: 'on-track' },
    { name: 'Kai', level: 55, status: 'alert' },
  ]
  const color = (s: string) => s === 'on-track' ? 'var(--teal)' : s === 'watch' ? 'var(--amber)' : '#E8534A'
  return (
    <div style={{ background: '#fff', borderRadius: 16, padding: '20px 24px', boxShadow: '0 4px 24px rgba(29,110,99,0.10)', border: '1.5px solid #DDE8E7' }}>
      <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '0.9rem', color: 'var(--navy)', marginBottom: 4 }}>Class Health — Year 3B</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: 14 }}>Live · Ms Thompson · 26 students</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {students.map(s => (
          <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 52, fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: '0.78rem', color: 'var(--navy)' }}>{s.name}</div>
            <div style={{ flex: 1, height: 8, background: '#F0F0F0', borderRadius: 40, overflow: 'hidden' }}>
              <div style={{ width: `${s.level}%`, height: '100%', background: color(s.status), borderRadius: 40 }} />
            </div>
            <div style={{ width: 28, fontSize: '0.7rem', fontFamily: 'var(--font-head)', fontWeight: 700, color: color(s.status), textAlign: 'right' }}>{s.level}%</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, display: 'flex', gap: 12 }}>
        {[['on-track','On Track','var(--teal)'],['watch','Watch','var(--amber)'],['alert','Alert','#E8534A']].map(([k,l,c]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
            <span style={{ fontSize: '0.68rem', color: 'var(--muted)' }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const LETTERS = [
  { l: 'A', word: 'Apple 🍎', emoji: '🍎', caption: 'A is for Apple', img: 'A' },
  { l: 'B', word: 'Book 📚',  emoji: '📚', caption: 'B is for Book',  img: 'B' },
  { l: 'C', word: 'Cat 🐱',   emoji: '🐱', caption: 'C is for Cat',   img: 'C' },
  { l: 'D', word: 'Dog 🐶',   emoji: '🐶', caption: 'D is for Dog',   img: 'D' },
  { l: 'E', word: 'Elephant 🐘', emoji: '🐘', caption: 'E is for Elephant', img: null },
  { l: 'F', word: 'Fish 🐟',  emoji: '🐟', caption: 'F is for Fish',  img: null },
  { l: 'G', word: 'Giraffe 🦒', emoji: '🦒', caption: 'G is for Giraffe', img: null },
  { l: 'H', word: 'House 🏠', emoji: '🏠', caption: 'H is for House', img: null },
  { l: 'I', word: 'Ice Cream 🍦', emoji: '🍦', caption: 'I is for Ice Cream', img: null },
  { l: 'J', word: 'Jungle 🌴', emoji: '🌴', caption: 'J is for Jungle', img: null },
  { l: 'K', word: 'Kite 🪁',  emoji: '🪁', caption: 'K is for Kite',  img: null },
  { l: 'L', word: 'Lion 🦁',  emoji: '🦁', caption: 'L is for Lion',  img: null },
  { l: 'M', word: 'Moon 🌙',  emoji: '🌙', caption: 'M is for Moon',  img: null },
  { l: 'N', word: 'Nest 🪹',  emoji: '🪹', caption: 'N is for Nest',  img: null },
  { l: 'O', word: 'Owl 🦉',   emoji: '🦉', caption: 'O is for Owl',   img: null },
  { l: 'P', word: 'Penguin 🐧', emoji: '🐧', caption: 'P is for Penguin', img: null },
  { l: 'Q', word: 'Queen 👑', emoji: '👑', caption: 'Q is for Queen', img: null },
  { l: 'R', word: 'Rainbow 🌈', emoji: '🌈', caption: 'R is for Rainbow', img: null },
  { l: 'S', word: 'Star ⭐',  emoji: '⭐', caption: 'S is for Star',  img: null },
  { l: 'T', word: 'Tiger 🐯', emoji: '🐯', caption: 'T is for Tiger', img: null },
  { l: 'U', word: 'Umbrella ☂️', emoji: '☂️', caption: 'U is for Umbrella', img: null },
  { l: 'V', word: 'Volcano 🌋', emoji: '🌋', caption: 'V is for Volcano', img: null },
  { l: 'W', word: 'Whale 🐋', emoji: '🐋', caption: 'W is for Whale', img: null },
  { l: 'X', word: 'Xylophone 🎵', emoji: '🎵', caption: 'X is for Xylophone', img: null },
  { l: 'Y', word: 'Yak 🦙',   emoji: '🦙', caption: 'Y is for Yak',   img: null },
  { l: 'Z', word: 'Zebra 🦓', emoji: '🦓', caption: 'Z is for Zebra', img: null },
]

function LearningWeblet() {
  const [current, setCurrent] = useState(0)
  const [imgErr, setImgErr] = useState(false)
  const d = LETTERS[current]
  const pct = Math.round(((current + 1) / 26) * 100)
  const goTo = (i: number) => { setCurrent(i); setImgErr(false) }

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
            <div className="rb-dots"><div className="rb-dot rb-dot-r"/><div className="rb-dot rb-dot-y"/><div className="rb-dot rb-dot-g"/></div>
            <div className="rb-weblet-topbar-logo">📖 Reading Buddy — Student View</div>
            <div className="rb-weblet-topbar-tag">LIVE DEMO</div>
          </div>
          <div className="rb-weblet-body">
            <div className="rb-weblet-intro">
              <h3>Learning Buddy</h3>
              <p>Click a letter to explore — each one is an adventure!</p>
              <div className="rb-brain-fact">🧠✨ Your brain is like a superhero when you read!</div>
            </div>
            {/* Droid mascot */}
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMGS.droid} alt="Reading Buddy AI Droid" style={{ height: 90, width: 'auto', margin: '0 auto', display: 'inline-block' }} />
            </div>
            <div className="rb-alpha-nav">
              {LETTERS.map((lt, i) => (
                <button key={lt.l} className={`rb-alpha-btn${i === current ? ' active' : ''}`} onClick={() => goTo(i)}>{lt.l}</button>
              ))}
            </div>
            <div className="rb-letter-stage">
              <div className="rb-letter-card">
                <div className="rb-letter-big">{d.l}</div>
                <div className="rb-letter-small">{d.l.toLowerCase()}</div>
                <div className="rb-letter-word">{d.word}</div>
              </div>
              <div className="rb-letter-img-card">
                {d.img && !imgErr ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`https://learningbuddy.vercel.app/${d.img}.png`} alt={d.caption} onError={() => setImgErr(true)} />
                ) : (
                  <div className="rb-emoji-display">{d.emoji}</div>
                )}
                <p>{d.caption}</p>
              </div>
            </div>
            <div className="rb-progress">
              <div className="rb-progress-label">Session progress</div>
              <div className="rb-progress-track"><div className="rb-progress-fill" style={{ width: `${pct}%` }} /></div>
              <div className="rb-progress-label">{current + 1} / 26</div>
            </div>
            <div className="rb-weblet-nav-btns">
              <button className="rb-wnav-btn" onClick={() => goTo((current - 1 + 26) % 26)}>← Previous</button>
              <button className="rb-wnav-btn primary" onClick={() => goTo((current + 1) % 26)}>Next Letter →</button>
              <a className="rb-wnav-btn amber" href="mailto:readingbuddy@outcome-ready.com">Get Full Access ✨</a>
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
        <div className="rb-nav-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://lzfgigiyqpuuxslsygjt.supabase.co/storage/v1/object/public/images/AHC%20droid%20head.webp" alt="Reading Buddy" style={{ height: 32, width: 'auto' }} />
          Reading Buddy
        </div>
        <ul className="rb-nav-links">
          <li><a href="#try-it">Try it Free</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#contexts">Schools & NDIS</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/signup?plan=premium_monthly" className="rb-nav-cta">Get Started</a></li>
        </ul>
      </nav>

      {/* HERO — full-bleed classroom photo + droid */}
      <section className="rb-hero" style={{ position: 'relative', overflow: 'hidden', minHeight: '90vh', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 0, padding: 0 }}>
        {/* Left: copy */}
        <div style={{ padding: '80px 5% 60px 7%', zIndex: 2, position: 'relative' }}>
          <div className="rb-badge">🇦🇺 Built in Australia · NDIS Ready · AI-Powered</div>
          <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(2.2rem,4.5vw,3.4rem)', lineHeight: 1.15, color: 'var(--navy)', marginBottom: 20 }}>
            Reading tests used to be clipboards.<br /><em style={{ fontStyle: 'normal', background: 'linear-gradient(135deg,var(--teal),var(--teal-mid))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>This is what comes next.</em>
          </h1>
          <div className="rb-brain" style={{ marginBottom: 20 }}>🧠✨ Your brain is like a superhero when you read!</div>
          <p className="rb-hero-sub">AI reading intelligence that listens, scores, reports, and recommends — automatically, in real time, for every student, in every session.</p>
          <div className="rb-hero-actions">
            <a href="/signup" className="rb-btn rb-btn-primary">▶ Start Free — No Card</a>
            <a href="#pricing" className="rb-btn rb-btn-outline">See Pricing</a>
          </div>
          {/* Stat pills */}
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            {[['16×','Book sets replaced'],['30s','To score a session'],['100%','NDIS compliance'],['∞','Books — customised per child']].map(([n,l]) => (
              <div key={n} style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 40, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '1rem', color: 'var(--teal)' }}>{n}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Right: photo collage */}
        <div style={{ position: 'relative', height: '90vh', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMGS.classroom} alt="Students reading in classroom" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          {/* Droid overlay */}
          <div style={{ position: 'absolute', bottom: 40, right: 40, background: 'rgba(255,255,255,0.95)', borderRadius: 20, padding: '16px 20px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: 12, backdropFilter: 'blur(8px)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://lzfgigiyqpuuxslsygjt.supabase.co/storage/v1/object/public/images/AHC%20droid%20head.webp" alt="AI Droid" style={{ height: 56, width: 'auto' }} />
            <div>
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '0.85rem', color: 'var(--navy)' }}>Session scored ✓</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>WPM: 118 · Accuracy: 94%</div>
            </div>
          </div>
          {/* Gradient overlay on left edge */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, var(--cream) 0%, transparent 30%)' }} />
        </div>
      </section>

      {/* SOCIAL PROOF STRIP */}
      <div style={{ background: 'var(--teal)', padding: '20px 5%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
        {[
          ['$48,000', 'in book sets replaced per school'],
          ['6 hrs/wk', 'saved per teacher'],
          ['< 30 sec', 'to score a full session'],
          ['100%', 'NDIS Practice Standards compliant'],
        ].map(([n, l]) => (
          <div key={n} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '1.5rem', color: 'var(--white)' }}>{n}</div>
            <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)' }}>{l}</div>
          </div>
        ))}
      </div>

      {/* DROID FEATURE SECTION */}
      <section className="rb-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        <div>
          <div className="rb-section-label">Meet your AI reading coach</div>
          <h2 className="rb-section-title">The Augmented Humanity Coach — built to amplify teachers, not replace them.</h2>
          <p className="rb-section-sub" style={{ marginBottom: 24 }}>Reading Buddy's AI engine listens to every student read aloud, scores instantly, and generates 6 different reports simultaneously — before the student has closed the book.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ['🎙', 'Listens in real time — any device, no hardware'],
              ['⚡', 'Scores WPM, accuracy, prosody in under 30 seconds'],
              ['📋', 'Generates NDIS progress notes automatically'],
              ['📊', 'Plots growth against national benchmarks, live'],
              ['📚', 'Customisable book library — your texts, your curriculum, per child'],
            ].map(([icon, text]) => (
              <div key={text} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: 2 }}>{icon}</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--navy-mid)', lineHeight: 1.6 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://lzfgigiyqpuuxslsygjt.supabase.co/storage/v1/object/public/images/AHC%20droid%20head.webp" alt="Reading Buddy AI Droid" style={{ width: '100%', maxWidth: 320, height: 'auto' }} />
          <div style={{ fontSize: '0.8rem', color: 'var(--muted)', textAlign: 'center', fontStyle: 'italic' }}>
            🤖 Augmented Humanity Coach · Reading intelligence engine
          </div>
        </div>
      </section>

      {/* KIDS + TEACHER PHOTO STRIP */}
      <section style={{ padding: '0 0 80px', background: 'var(--cream-dark)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, height: 340 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMGS.kidReading1} alt="Child reading with Reading Buddy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMGS.teacher1} alt="Teacher reviewing student progress" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMGS.kidReading2} alt="Students learning to read" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ padding: '64px 5% 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <div className="rb-section-label">For teachers</div>
              <h2 className="rb-section-title">6 hours back every week. Starting Monday.</h2>
              <p className="rb-section-sub">Marking, levelling, reporting, parent communications — all automated. Reading Buddy gives teachers the data they need, without the admin they dread.</p>
              <a href="mailto:readingbuddy@outcome-ready.com" style={{ display: 'inline-block', marginTop: 24, fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--teal)' }}>Talk to us about your school →</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <AccuracyChart />
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING BUDDY WEBLET */}
      <LearningWeblet />

      {/* CLASS HEALTH DASHBOARD */}
      <section className="rb-section-dark" id="features">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div className="rb-section-label">Principal & school view</div>
            <h2 className="rb-section-title">Whole-school literacy, live. No waiting for term reports.</h2>
            <p className="rb-section-sub" style={{ marginBottom: 24 }}>Every classroom in one dashboard. Colour-coded alerts. Drill down from school to student in two clicks.</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMGS.scenePrincipal} alt="Principal dashboard" style={{ width: '100%', borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <ClassHealthChart />
            <AccuracyChart />
          </div>
        </div>
      </section>

      {/* TEACHER PHOTO + SCENE */}
      <section className="rb-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
        <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', height: 460 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMGS.teacher2} alt="Teacher using Reading Buddy in classroom" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, background: 'rgba(255,255,255,0.95)', borderRadius: 14, padding: '14px 18px', backdropFilter: 'blur(8px)' }}>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '0.88rem', color: 'var(--navy)', marginBottom: 4 }}>Ms Thompson, Year 3</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>"Reading Buddy saved me 8 hours of reporting this week alone."</div>
          </div>
        </div>
        <div>
          <div className="rb-section-label">How it works</div>
          <h2 className="rb-section-title">From session to report in under 60 seconds.</h2>
          <div className="rb-steps" style={{ marginTop: 24 }}>
            {[
              { num: '01', icon: '🎙', title: 'Student reads aloud', desc: 'Any tablet, phone, or laptop. Session starts in seconds.', tag: 'Zero prep time' },
              { num: '02', icon: '🤖', title: 'AI scores instantly', desc: 'WPM, accuracy, prosody. Results before the student closes the book.', tag: '< 30 seconds' },
              { num: '03', icon: '📋', title: 'Reports write themselves', desc: '6 report types auto-generated from every session.', tag: '6 reports' },
              { num: '04', icon: '📊', title: 'Dashboard shows all', desc: 'Teacher → classroom → school → NDIS — live.', tag: 'Real-time' },
            ].map(s => (
              <div key={s.num} className="rb-step" data-num={s.num} style={{ marginBottom: 16 }}>
                <div className="rb-step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="rb-step-tag">{s.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTEXTS — flip cards */}
      <section className="rb-section-dark" id="contexts">
        <div className="rb-text-center" style={{ marginBottom: 48 }}>
          <div className="rb-section-label">Designed for every environment</div>
          <h2 className="rb-section-title">Classroom. Clinic. Home. School-wide.</h2>
          <p className="rb-section-sub" style={{ marginTop: 8, opacity: 0.7, fontSize: '0.85rem' }}>Hover each card to see how it works in your context</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {[
            {
              color: '#1a2e4a',
              icon: '🏫',
              title: 'In the Classroom',
              tagline: 'Student reads aloud. AI listens, scores, and reports instantly. No clipboards, no manual levelling.',
              pills: [{ val: '30s', label: 'Session scored' }, { val: '0', label: 'Manual effort' }, { val: 'Real-time', label: 'Reports' }],
              img: IMGS.sceneClassroom,
              link: 'Public & Private Schools',
              linkHref: 'mailto:readingbuddy@outcome-ready.com?subject=Schools',
              backDesc: 'Every student scored in every session. Teachers receive six automatic reports — no marking, no clipboards, no levelling kits.',
              bullets: ['WPM, accuracy & prosody scored in 30 seconds', 'Growth tracked against national benchmarks', 'Parent snapshots auto-sent after each session', 'Works on any classroom device — no hardware'],
            },
            {
              color: '#1a4a3a',
              icon: '🎯',
              title: 'In the Clinic',
              tagline: 'NDIS progress notes generated the moment the session ends. Compliant, timestamped, audit-ready.',
              pills: [{ val: '1-click', label: 'NDIS notes' }, { val: '100%', label: 'Compliant' }, { val: '0hr', label: 'Admin time' }],
              img: IMGS.sceneNdis,
              link: 'NDIS Providers',
              linkHref: 'mailto:readingbuddy@outcome-ready.com?subject=NDIS',
              backDesc: 'NDIS Practice Standards–aligned progress notes generated automatically. Providers spend their time in therapy, not paperwork.',
              bullets: ['Goal-referenced notes — no copy-paste', 'Timestamped & audit-ready from day one', 'Books mapped directly to participant NDIS goals', 'Bulk export for plan reviews & audits'],
            },
            {
              color: '#4a2a7a',
              icon: '🏠',
              title: 'At Home',
              tagline: 'Parent snapshots in plain English, sent automatically after every session. No jargon, no effort.',
              pills: [{ val: 'Auto', label: 'Parent reports' }, { val: 'Plain', label: 'English only' }, { val: 'Every', label: 'Session' }],
              img: IMGS.sceneHome,
              link: 'Parents',
              linkHref: 'mailto:readingbuddy@outcome-ready.com?subject=Parents',
              backDesc: 'Parents stay in the loop without needing to understand reading levels. Plain-English snapshots land automatically after every session.',
              bullets: ['What they practised — in simple language', 'Progress vs. reading age benchmarks', 'What to work on at home this week', 'No app install required for parents'],
            },
            {
              color: '#7a3a1a',
              icon: '📊',
              title: 'Across the School',
              tagline: 'Live literacy dashboard across every classroom. Principals see the full picture — not at term end, right now.',
              pills: [{ val: 'Live', label: 'Dashboard' }, { val: 'All', label: 'Classrooms' }, { val: 'NAPLAN', label: 'Ready' }],
              img: IMGS.scenePrincipal,
              link: 'School Leaders',
              linkHref: 'mailto:readingbuddy@outcome-ready.com?subject=SchoolLeaders',
              backDesc: 'Principals see literacy health across every classroom in real time — colour-coded alerts, drill down from school to student in two clicks.',
              bullets: ['Whole-school literacy dashboard — live', 'Colour-coded: on track / watch / alert', 'Drill down: school → class → student', 'NAPLAN-ready reporting built in'],
            },
          ].map(c => (
            <div key={c.title} className="rb-ctx-wrap">
              <div className="rb-ctx-inner">
                {/* FRONT */}
                <div className="rb-ctx-front" style={{ border: `1.5px solid ${c.color}` }}>
                  <div className="rb-ctx-left" style={{ background: c.color }}>
                    <div>
                      <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>{c.icon}</div>
                      <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '0.95rem', color: '#fff', marginBottom: 10 }}>{c.title}</div>
                      <div className="rb-ctx-tagline">{c.tagline}</div>
                    </div>
                    <div className="rb-ctx-pills">
                      {c.pills.map(p => (
                        <div key={p.label} className="rb-ctx-pill">
                          <span className="rb-ctx-pill-val">{p.val}</span>
                          <span className="rb-ctx-pill-label">{p.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rb-ctx-right">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.img} alt={c.title} />
                    <div className="rb-ctx-flip-hint">hover to flip →</div>
                  </div>
                </div>
                {/* BACK */}
                <div className="rb-ctx-back" style={{ border: `1.5px solid ${c.color}` }}>
                  <div className="rb-ctx-back-icon">{c.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--navy)', marginBottom: 8 }}>{c.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.65, marginBottom: 16 }}>{c.backDesc}</p>
                  <ul>
                    {c.bullets.map(b => <li key={b}>{b}</li>)}
                  </ul>
                  <a href={c.linkHref} className="rb-ctx-link">{c.link} →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6 REPORTS */}
      <section className="rb-section">
        <div className="rb-text-center" style={{ maxWidth: 580, margin: '0 auto 48px' }}>
          <div className="rb-section-label">Six reports from one session</div>
          <h2 className="rb-section-title">All automatic. All from one reading.</h2>
          <p className="rb-section-sub">No templates, no copy-paste. Every time a student reads, six reports appear simultaneously.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32, alignItems: 'start' }}>
          <div className="rb-reports-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {[
              { icon: '🤖', title: 'Session Summary', desc: 'WPM, accuracy, prosody, reading age estimate, and intervention flags.' },
              { icon: '📈', title: 'Growth Trajectory', desc: 'Month-over-month growth vs national benchmarks. PDF exportable.' },
              { icon: '📋', title: 'NDIS Progress Note', desc: 'Goal-referenced, Practice Standards aligned, timestamped.' },
              { icon: '👨‍👩‍👧', title: 'Parent Snapshot', desc: 'Plain-English. What they worked on, how they\'re going, what to practise.' },
              { icon: '🏫', title: 'Class Health Report', desc: 'Every student: on track, needs a push, or urgent intervention.' },
              { icon: '📚', title: 'Book Recommendations', desc: 'AI-matched to level, history, and interests. Library catalogue linked.' },
            ].map(r => (
              <div key={r.title} className="rb-report">
                <div className="rb-report-icon">{r.icon}</div>
                <h4>{r.title}</h4>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>
          {/* Live charts column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <AccuracyChart />
            <ClassHealthChart />
          </div>
        </div>
      </section>

      {/* PRICING */}
      {/* CUSTOMISABLE BOOKS SECTION */}
      <section className="rb-section" id="custom-books" style={{ background: 'linear-gradient(135deg, #f0f8f3 0%, #e8f5ee 100%)', borderTop: '1px solid #c5dfc9' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="rb-section-label">Key Differentiator</div>
          <h2 className="rb-section-title" style={{ color: 'var(--navy)' }}>Books customised to every child.<br />Not one size fits all.</h2>
          <p className="rb-section-sub" style={{ maxWidth: 560, margin: '12px auto 0' }}>Reading Buddy isn't locked to a single book series. Upload your own texts, align to your school's reading program, and customise books per class or per individual child — automatically matched to their learning outcomes.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '📖', title: 'Your texts, your program', desc: 'Upload PDFs, Word docs, or URLs. Reading Buddy turns any text into a fully scored, assessed reading session.' },
            { icon: '🎯', title: 'Per-child customisation', desc: 'Assign specific books to individual students based on their reading level, interests, or NDIS goals. Automatically.' },
            { icon: '🏫', title: 'Per-class libraries', desc: 'Each teacher builds their own class library. Aligned to PM Readers, Oxford, Sunshine, or your school\'s chosen program.' },
            { icon: '🇦🇺', title: 'Curriculum-mapped', desc: 'Books tagged to Australian Curriculum outcomes. Progress data links directly to reporting requirements.' },
            { icon: '🎗', title: 'NDIS goal-aligned content', desc: 'For NDIS providers — books mapped directly to participant goals. Every session generates goal-referenced evidence.' },
            { icon: '📊', title: 'Tracks every custom text', desc: 'Same WPM, accuracy, prosody scoring on any text. Growth charts work across your entire custom library.' },
          ].map(f => (
            <div key={f.title} style={{ background: 'white', borderRadius: 14, padding: '1.5rem', border: '1.5px solid #c5dfc9', boxShadow: '0 2px 12px rgba(29,110,99,0.06)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.6rem' }}>{f.icon}</div>
              <h4 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--navy)', marginBottom: '0.4rem' }}>{f.title}</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ background: 'white', borderRadius: 16, padding: '1.5rem 2rem', border: '2px solid #4a7c59', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '2.5rem' }}>💡</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1rem', color: 'var(--navy)', marginBottom: 4 }}>Every competitor locks you into their book series. We don't.</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>Your school has already invested in a reading program. Reading Buddy works with it — not against it. Keep your PM Readers, your Oxford books, your school library. Just add AI.</div>
          </div>
          <a href="mailto:readingbuddy@outcome-ready.com?subject=Custom+Books" className="rb-btn rb-btn-primary" style={{ whiteSpace: 'nowrap' }}>See how it works →</a>
        </div>
      </section>

      <section className="rb-section-navy" id="pricing">
        <div className="rb-text-center">
          <div className="rb-section-label light">Value-based pricing · No lock-in · Cancel anytime</div>
          <h2 className="rb-section-title light">Less than one book set.<br />More than a full-time coordinator.</h2>
          <p className="rb-section-sub light">A single reading series costs $3,000. Four grades, four sets — $48,000. Plus hours of weekly admin.</p>
        </div>
        <div className="rb-pricing-grid">
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
            <a href="mailto:readingbuddy@outcome-ready.com?subject=Freemium" className="rb-plan-cta">Get Started Free</a>
          </div>
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
            <a href="/signup?plan=premium_monthly" className="rb-plan-cta">Start Free Trial — $59/mo</a>
            <a href="/signup?plan=premium_annual" style={{display:'block',textAlign:'center',fontFamily:'var(--font-head)',fontWeight:700,fontSize:'0.78rem',color:'rgba(255,255,255,0.7)',marginTop:8}}>Annual billing ($590/yr) →</a>
          </div>
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
            </ul>
            <a href="/signup?plan=school" className="rb-plan-cta">Start School Plan</a>
          </div>
          <div className="rb-plan">
            <div className="rb-plan-name">Enterprise</div>
            <div className="rb-plan-price" style={{ fontSize: '1.6rem' }}>From $35k</div>
            <div className="rb-plan-freq">💡 Full-time coordinator = $90–110k/yr.</div>
            <ul className="rb-plan-features">
              <li><span className="rb-check">✓</span>Unlimited schools / sites</li>
              <li><span className="rb-check">✓</span>Custom LMS/SIS/NDIS integrations</li>
              <li><span className="rb-check">✓</span>Governance dashboards</li>
              <li><span className="rb-check">✓</span>Phone support + onboarding</li>
              <li><span className="rb-check">✓</span>Unlimited data retention</li>
            </ul>
            <a href="mailto:readingbuddy@outcome-ready.com?subject=Enterprise" className="rb-plan-cta">Contact Sales</a>
          </div>
        </div>
      </section>

      {/* KID PHOTO CTA */}
      <div style={{ position: 'relative', height: 380, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMGS.kidReading3} alt="Child reading with Reading Buddy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(29,110,99,0.85) 0%, rgba(42,157,143,0.7) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 5%' }}>
          <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#fff', marginBottom: 12 }}>Start free. Upgrade when it pays for itself.</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', maxWidth: 480, marginBottom: 32 }}>Try one classroom free. The time saved on reporting alone covers the upgrade.</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="mailto:readingbuddy@outcome-ready.com?subject=Free+Trial" className="rb-btn-white">Start free — one classroom</a>
            <a href="mailto:readingbuddy@outcome-ready.com?subject=Talk+to+Sales" className="rb-btn-white-outline">Talk to Sales</a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="rb-footer" id="contact">
        <div className="rb-footer-grid">
          <div>
            <div className="rb-footer-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://lzfgigiyqpuuxslsygjt.supabase.co/storage/v1/object/public/images/AHC%20droid%20head.webp" alt="Reading Buddy" style={{ height: 36, width: 'auto', filter: 'brightness(0) invert(1)' }} />
              Reading Buddy
            </div>
            <p className="rb-footer-about">AI-powered reading intelligence for Australian schools and NDIS providers. Built to replace plastic tubs, clipboards, and hours of weekly admin.</p>
            <div className="rb-footer-contact">
              ✉️ <a href="mailto:readingbuddy@outcome-ready.com">readingbuddy@outcome-ready.com</a>
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
              <li><a href="/marketing">App Preview</a></li>
            </ul>
          </div>
          <div className="rb-footer-col">
            <h4>Get Started</h4>
            <ul>
              <li><a href="mailto:readingbuddy@outcome-ready.com?subject=Free+Trial">Free Trial</a></li>
              <li><a href="mailto:readingbuddy@outcome-ready.com?subject=Premium">Premium Classroom</a></li>
              <li><a href="/signup?plan=school">School Plan</a></li>
              <li><a href="mailto:readingbuddy@outcome-ready.com?subject=Enterprise">Enterprise</a></li>
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
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '1rem', textAlign: 'center' }}>Also from Tech 4 Humanity</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              ['OutcomeReady', 'https://outcome-ready.vercel.app'],
              ['ThrivingOS', 'https://outcome-ready.vercel.app/thriving-kids'],
              ['AI for Tradies', 'https://ai4tradies.org'],
              ['Valdocco Primary', 'https://valdocco-primary.vercel.app'],
              ['Augmented Memories', 'https://augmentedmemories.org'],
              ['AHC', 'https://augmented-humanity.com'],
            ].map(([name, url]) => (
              <a key={name} href={url} style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}>{name}</a>
            ))}
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
