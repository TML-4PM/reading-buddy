'use client'
import { useState } from 'react'

// Matching letters shown on learningbuddy.vercel.app - A through Z
// but the hero shows A, B, C, D floating at bottom like the original

const ALL_LETTERS = [
  { l: 'A', word: 'Apple',    emoji: '🍎', img: true },
  { l: 'B', word: 'Book',     emoji: '📚', img: true },
  { l: 'C', word: 'Cat',      emoji: '🐱', img: true },
  { l: 'D', word: 'Dog',      emoji: '🐶', img: true },
  { l: 'E', word: 'Elephant', emoji: '🐘', img: false },
  { l: 'F', word: 'Fish',     emoji: '🐟', img: false },
  { l: 'G', word: 'Giraffe',  emoji: '🦒', img: false },
  { l: 'H', word: 'House',    emoji: '🏠', img: false },
  { l: 'I', word: 'Ice Cream',emoji: '🍦', img: false },
  { l: 'J', word: 'Jungle',   emoji: '🌴', img: false },
  { l: 'K', word: 'Kite',     emoji: '🪁', img: false },
  { l: 'L', word: 'Lion',     emoji: '🦁', img: false },
  { l: 'M', word: 'Moon',     emoji: '🌙', img: false },
  { l: 'N', word: 'Nest',     emoji: '🪹', img: false },
  { l: 'O', word: 'Owl',      emoji: '🦉', img: false },
  { l: 'P', word: 'Penguin',  emoji: '🐧', img: false },
  { l: 'Q', word: 'Queen',    emoji: '👑', img: false },
  { l: 'R', word: 'Rainbow',  emoji: '🌈', img: false },
  { l: 'S', word: 'Star',     emoji: '⭐', img: false },
  { l: 'T', word: 'Tiger',    emoji: '🐯', img: false },
  { l: 'U', word: 'Umbrella', emoji: '☂️',  img: false },
  { l: 'V', word: 'Volcano',  emoji: '🌋', img: false },
  { l: 'W', word: 'Whale',    emoji: '🐋', img: false },
  { l: 'X', word: 'Xylophone',emoji: '🎵', img: false },
  { l: 'Y', word: 'Yak',      emoji: '🦙', img: false },
  { l: 'Z', word: 'Zebra',    emoji: '🦓', img: false },
]

export default function LearnPage() {
  const [active, setActive] = useState<number | null>(null)

  const current = active !== null ? ALL_LETTERS[active] : null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .lb-page {
          font-family: 'Quicksand', sans-serif;
          background: #ffffff;
          height: 100dvh;
          overflow: hidden;
          position: relative;
        }

        /* Mini nav */
        .lb-mini-nav {
          position: absolute;
          top: 0; left: 0; right: 0;
          z-index: 20;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .lb-back {
          font-family: 'Quicksand', sans-serif;
          font-weight: 700;
          font-size: 0.82rem;
          color: #1D6E63;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(232,246,245,0.9);
          border: 1.5px solid #A8DADC;
          padding: 6px 14px;
          border-radius: 40px;
          transition: background 0.2s;
        }
        .lb-back:hover { background: #E8F6F5; }
        .lb-email-link {
          font-family: 'Quicksand', sans-serif;
          font-weight: 700;
          font-size: 0.82rem;
          color: #ffffff;
          text-decoration: none;
          background: #F4A261;
          padding: 6px 14px;
          border-radius: 40px;
          transition: background 0.2s;
        }
        .lb-email-link:hover { background: #E07B3C; }

        /* Main content */
        .lb-main {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 1rem;
          padding: 1rem 2rem;
          position: relative;
          height: 100%;
        }

        /* Title - matches original: text-5xl, top-[8%] absolute */
        .lb-title {
          font-family: 'Quicksand', sans-serif;
          font-size: 3rem;
          font-weight: 500;
          color: #111827;
          position: absolute;
          top: 8%;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
        }

        /* Tagline - matches original: text-2xl, mt-[-10%] */
        .lb-tagline {
          font-family: 'Quicksand', sans-serif;
          font-size: 1.5rem;
          font-weight: 500;
          color: #374151;
          max-width: 28rem;
          margin: 0 auto;
          margin-top: -10%;
        }

        /* Letter explorer - appears when a letter is active */
        .lb-explorer {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #fff;
          border-radius: 24px;
          padding: 40px 48px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
          border: 2px solid #E8F6F5;
          min-width: 280px;
          animation: popIn 0.3s ease;
          z-index: 15;
        }
        @keyframes popIn {
          from { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
          to   { transform: translate(-50%, -50%) scale(1);   opacity: 1; }
        }
        .lb-explorer-big {
          font-family: 'Quicksand', sans-serif;
          font-size: 8rem;
          font-weight: 700;
          line-height: 1;
          color: #1D6E63;
          margin-bottom: 8px;
        }
        .lb-explorer-word {
          font-family: 'Quicksand', sans-serif;
          font-size: 1.6rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
        }
        .lb-explorer-emoji {
          font-size: 4rem;
          margin-bottom: 12px;
          display: block;
        }
        .lb-explorer-close {
          margin-top: 16px;
          background: transparent;
          border: 2px solid #DDE8E7;
          border-radius: 40px;
          padding: 8px 20px;
          font-family: 'Quicksand', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          color: #6B7A99;
          cursor: pointer;
          transition: all 0.15s;
        }
        .lb-explorer-close:hover { border-color: #1D6E63; color: #1D6E63; }
        .lb-explorer-nav {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-top: 12px;
        }
        .lb-nav-btn {
          background: #E8F6F5;
          border: none;
          border-radius: 40px;
          padding: 8px 20px;
          font-family: 'Quicksand', sans-serif;
          font-weight: 700;
          font-size: 0.88rem;
          color: #1D6E63;
          cursor: pointer;
          transition: background 0.15s;
        }
        .lb-nav-btn:hover { background: #A8DADC; }

        /* Floating letters at bottom - exact match to original */
        .lb-letters-row {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          z-index: 1;
          display: flex;
          width: 100%;
          justify-content: center;
          gap: 0;
          padding: 0 0 0 0;
        }
        @media (min-width: 768px) {
          .lb-letters-row { gap: 1rem; padding: 0 2rem; }
        }
        @media (min-width: 1024px) {
          .lb-letters-row { padding: 0 4rem; }
        }

        .lb-letter-wrap {
          width: 120px;
          cursor: pointer;
          flex-shrink: 0;
        }
        .lb-letter-wrap img {
          width: 100%;
          height: auto;
          display: block;
          transition: filter 0.2s;
        }
        .lb-letter-wrap:hover img { filter: drop-shadow(0 0 12px rgba(29,110,99,0.4)); }
        .lb-letter-emoji-wrap {
          width: 120px;
          height: 160px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          cursor: pointer;
          flex-shrink: 0;
        }
        .lb-letter-emoji-big {
          font-size: 5rem;
          line-height: 1;
        }
        .lb-letter-label {
          font-family: 'Quicksand', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          color: #374151;
          text-align: center;
          margin-top: 4px;
          display: none;
        }

        /* Float animations matching original exactly */
        .lb-float  { animation: lbFloat 6s ease-in-out infinite; }
        .lb-float2 { animation: lbFloat 8s ease-in-out infinite; }
        .lb-float3 { animation: lbFloat 7s ease-in-out infinite; }
        .lb-float4 { animation: lbFloat 9s ease-in-out infinite; }
        .lb-float5 { animation: lbFloat 6.5s ease-in-out infinite; }
        .lb-float6 { animation: lbFloat 7.5s ease-in-out infinite; }

        @keyframes lbFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-20px); }
        }

        /* Alphabet selector strip at top (hidden until tapped) */
        .lb-alpha-strip {
          position: absolute;
          top: 18%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 680px;
          padding: 0 16px;
          z-index: 5;
        }
        .lb-alpha-chip {
          width: 38px; height: 38px;
          border-radius: 10px;
          border: 2px solid #DDE8E7;
          background: #F5EDE4;
          font-family: 'Quicksand', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          color: #2C3E60;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
        }
        .lb-alpha-chip:hover  { background: #E8F6F5; border-color: #2A9D8F; color: #1D6E63; }
        .lb-alpha-chip.active { background: #1D6E63; border-color: #1D6E63; color: #fff; transform: scale(1.1); }

        /* Overlay backdrop when letter is open */
        .lb-overlay {
          position: fixed;
          inset: 0;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(4px);
          z-index: 10;
          animation: fadeOverlay 0.25s ease;
        }
        @keyframes fadeOverlay {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      <div className="lb-page">
        {/* Mini nav */}
        <div className="lb-mini-nav">
          <a href="/" className="lb-back">← Reading Buddies</a>
          <a href="mailto:readingbuddy@outcome-ready.com" className="lb-email-link">Get Full Access ✨</a>
        </div>

        {/* Main */}
        <div className="lb-main">
          {/* Title - exact position match */}
          <h1 className="lb-title">Reading Buddies</h1>

          {/* Tagline + alphabet selector */}
          <div style={{ marginTop: '-10%' }}>
            <p className="lb-tagline">
              Did you know? Your brain is like a superhero when you read! 🧠✨
            </p>

            {/* Alphabet strip */}
            <div className="lb-alpha-strip">
              {ALL_LETTERS.map((lt, i) => (
                <button
                  key={lt.l}
                  className={`lb-alpha-chip${active === i ? ' active' : ''}`}
                  onClick={() => setActive(active === i ? null : i)}
                >
                  {lt.l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Letter explorer overlay */}
        {active !== null && current && (
          <>
            <div className="lb-overlay" onClick={() => setActive(null)} />
            <div className="lb-explorer">
              <div className="lb-explorer-big">{current.l}</div>
              {current.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`https://learningbuddy.vercel.app/${current.l}.png`}
                  alt={`${current.l} is for ${current.word}`}
                  style={{ width: 140, height: 140, objectFit: 'contain', margin: '0 auto 12px' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              ) : (
                <span className="lb-explorer-emoji">{current.emoji}</span>
              )}
              <div className="lb-explorer-word">{current.l} is for {current.word} {current.emoji}</div>
              <div className="lb-explorer-nav">
                <button className="lb-nav-btn" onClick={() => setActive((active - 1 + 26) % 26)}>← Prev</button>
                <button className="lb-nav-btn" onClick={() => setActive((active + 1) % 26)}>Next →</button>
              </div>
              <button className="lb-explorer-close" onClick={() => setActive(null)}>✕ Close</button>
            </div>
          </>
        )}

        {/* Floating letters at bottom - exact match to original */}
        <div className="lb-letters-row">
          <div className="lb-letter-wrap lb-float" onClick={() => setActive(0)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://learningbuddy.vercel.app/A.png" alt="A Alphabet" />
          </div>
          <div className="lb-letter-wrap lb-float2" onClick={() => setActive(1)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://learningbuddy.vercel.app/B.png" alt="B Alphabet" />
          </div>
          <div className="lb-letter-wrap lb-float3" onClick={() => setActive(2)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://learningbuddy.vercel.app/C.png" alt="C Alphabet" />
          </div>
          <div className="lb-letter-wrap lb-float" onClick={() => setActive(3)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://learningbuddy.vercel.app/D.png" alt="D Alphabet" />
          </div>
        </div>
      </div>
    </>
  )
}
