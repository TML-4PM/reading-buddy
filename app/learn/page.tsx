'use client'
import { useState } from 'react'
import '../page.css'

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

export default function LearnPage() {
  const [current, setCurrent] = useState(0)
  const [imgErr, setImgErr] = useState(false)
  const d = LETTERS[current]
  const pct = Math.round(((current + 1) / 26) * 100)

  const goTo = (i: number) => { setCurrent(i); setImgErr(false) }
  const prev = () => goTo((current - 1 + 26) % 26)
  const next = () => goTo((current + 1) % 26)

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #1D6E63 0%, #2A9D8F 100%)' }}>
      {/* Mini nav */}
      <nav style={{ padding: '0 5%', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.15)' }}>
        <a href="/" style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: '1.1rem', color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          📖 Reading Buddy
        </a>
        <a href="/" style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
          ← Back to main site
        </a>
      </nav>

      {/* Weblet */}
      <div style={{ padding: '48px 5%', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div className="rb-weblet-badge" style={{ marginBottom: 14 }}>✨ Learning Buddy — Student Experience</div>
          <h1 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#fff', marginBottom: 10 }}>
            Learning Buddy
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1rem', maxWidth: 420, margin: '0 auto' }}>
            Click a letter to explore — each one is an adventure!
          </p>
        </div>

        <div className="rb-weblet-app">
          <div className="rb-weblet-topbar">
            <div className="rb-dots">
              <div className="rb-dot rb-dot-r" />
              <div className="rb-dot rb-dot-y" />
              <div className="rb-dot rb-dot-g" />
            </div>
            <div className="rb-weblet-topbar-logo">📖 Reading Buddy — Student View</div>
            <div className="rb-weblet-topbar-tag">INTERACTIVE</div>
          </div>
          <div className="rb-weblet-body">
            <div className="rb-weblet-intro">
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

        {/* Footer note */}
        <div style={{ textAlign: 'center', marginTop: 32, color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', fontFamily: 'Lato, sans-serif' }}>
          <a href="/" style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'Nunito, sans-serif', fontWeight: 700 }}>readingbuddy.com.au</a>
          &nbsp;·&nbsp; readingbuddies@outcome-ready.com &nbsp;·&nbsp; Tech 4 Humanity Pty Ltd · ABN 70 666 271 272
        </div>
      </div>
    </div>
  )
}
