'use client'
import { useState } from 'react'

// Phone mockup component matching learningbuddy.vercel.app style
function Phone({ children, bg = '#fff' }: { children: React.ReactNode; bg?: string }) {
  return (
    <div style={{
      width: 260, minHeight: 520,
      background: bg,
      borderRadius: 42,
      border: '8px solid #111',
      boxShadow: '0 30px 80px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(255,255,255,0.1)',
      position: 'relative',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      {/* Notch */}
      <div style={{
        position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
        width: 90, height: 24, background: '#111', borderRadius: 12, zIndex: 10,
      }} />
      <div style={{ paddingTop: 52, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
      {/* ABC characters at bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: 2, padding: '0 8px 6px',
      }}>
        {['🔴','🔵','🟢','🟡'].map((c, i) => (
          <div key={i} style={{ fontSize: 36, lineHeight: 1 }}>
            {['A','B','C','D'][i]}
          </div>
        ))}
      </div>
    </div>
  )
}

// ABC characters as emoji letters
const ABCBar = () => (
  <div style={{ display: 'flex', gap: 4, justifyContent: 'center', padding: '0 12px 16px', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
    {[
      { l: 'A', color: '#E8534A' },
      { l: 'B', color: '#4ABDE8' },
      { l: 'C', color: '#4AE8A0' },
      { l: 'D', color: '#E8C84A' },
    ].map(({ l, color }) => (
      <div key={l} style={{
        width: 52, height: 52, borderRadius: 14,
        background: color, color: '#fff',
        fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: '1.4rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 4px 12px ${color}80`,
      }}>{l}</div>
    ))}
  </div>
)

export default function MarketingPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `mailto:readingbuddies@outcome-ready.com?subject=Message from ${form.name}&body=${form.message}`
    setSent(true)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Nunito:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Nunito', sans-serif; }
        .mkt-page { font-family: 'Nunito', sans-serif; background: #fff; color: #111; }
        .mkt-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 60px; background: #fff;
          border-bottom: 1px solid #f0f0f0;
          position: sticky; top: 0; z-index: 100;
        }
        .mkt-logo {
          font-family: 'Caveat', cursive; font-weight: 700; font-size: 1.7rem;
          color: #111; line-height: 1.1; text-decoration: none;
        }
        .mkt-nav-links { display: flex; align-items: center; gap: 40px; }
        .mkt-nav-links a { font-size: 0.95rem; color: #444; text-decoration: none; font-weight: 500; }
        .mkt-nav-links a:hover { color: #111; }
        .mkt-btn-login {
          background: #E8534A; color: #fff;
          font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 0.95rem;
          padding: 10px 28px; border-radius: 40px; border: none; cursor: pointer;
          text-decoration: none; display: inline-block; transition: background 0.2s;
        }
        .mkt-btn-login:hover { background: #d44940; }
        .mkt-btn-primary {
          background: #E8534A; color: #fff;
          font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 1rem;
          padding: 16px 40px; border-radius: 12px; border: none; cursor: pointer;
          text-decoration: none; display: inline-block; transition: background 0.2s;
          width: 100%; max-width: 320px; text-align: center;
        }
        .mkt-btn-primary:hover { background: #d44940; }
        .mkt-btn-black {
          background: #111; color: #fff;
          font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 1rem;
          padding: 16px 40px; border-radius: 12px; border: none; cursor: pointer;
          text-decoration: none; display: inline-block; transition: background 0.2s;
          width: 100%; max-width: 340px; text-align: center;
        }
        .mkt-btn-black:hover { background: #333; }

        /* HERO */
        .mkt-hero {
          display: flex; align-items: center; justify-content: space-between;
          padding: 80px 60px 60px; gap: 60px; min-height: 82vh; background: #fff;
        }
        .mkt-hero-left { flex: 1; max-width: 520px; }
        .mkt-hero h1 { font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 800; line-height: 1.2; margin-bottom: 24px; }
        .mkt-hero p { font-size: 1rem; color: #555; line-height: 1.7; margin-bottom: 36px; max-width: 440px; }
        .mkt-hero-phone { transform: perspective(1200px) rotateY(-8deg) rotateX(4deg); }

        /* YELLOW SECTION */
        .mkt-yellow { background: #F5C344; padding: 80px 60px; }
        .mkt-row { display: flex; align-items: center; gap: 80px; }
        .mkt-row.reverse { flex-direction: row-reverse; }
        .mkt-row-text { flex: 1; }
        .mkt-row-text h2 { font-size: clamp(1.6rem, 3.5vw, 2.4rem); font-weight: 800; line-height: 1.25; margin-bottom: 28px; }
        .mkt-row-text p { font-size: 0.95rem; line-height: 1.75; color: #333; }
        .mkt-row-phone { flex-shrink: 0; }

        /* WHITE FEATURE SECTIONS */
        .mkt-feature { padding: 80px 60px; background: #fff; }
        .mkt-feature h3 { font-size: 1.5rem; font-weight: 800; margin-bottom: 14px; }
        .mkt-feature p { font-size: 0.95rem; line-height: 1.75; color: #444; max-width: 360px; }

        /* HOW IT WORKS */
        .mkt-how { padding: 80px 60px; background: #fff; text-align: center; }
        .mkt-how h2 { font-size: 1.8rem; font-weight: 800; margin-bottom: 48px; }
        .mkt-video-phone {
          width: 300px; margin: 0 auto;
          background: #F5EDE4; border-radius: 16px; padding: 20px;
          display: flex; flex-direction: column; align-items: center;
        }

        /* CONTACT */
        .mkt-contact { padding: 80px 60px; background: #fff; text-align: center; max-width: 700px; margin: 0 auto; }
        .mkt-contact h2 { font-size: 1.8rem; font-weight: 800; margin-bottom: 12px; }
        .mkt-contact p { font-size: 1rem; color: #555; margin-bottom: 40px; }
        .mkt-input {
          width: 100%; padding: 14px 18px; border: 1.5px solid #ddd;
          border-radius: 10px; font-family: 'Nunito', sans-serif;
          font-size: 0.95rem; margin-bottom: 16px; outline: none;
          transition: border-color 0.2s;
        }
        .mkt-input:focus { border-color: #E8534A; }
        .mkt-textarea { min-height: 140px; resize: vertical; }
        .mkt-label { display: block; text-align: left; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px; color: #333; }

        /* FOOTER */
        .mkt-footer { background: #111; color: rgba(255,255,255,0.6); padding: 40px 60px; text-align: center; }
        .mkt-footer a { color: #F5C344; font-weight: 700; text-decoration: none; }
        .mkt-footer-logo { font-family: 'Caveat', cursive; font-size: 1.4rem; color: #fff; margin-bottom: 12px; display: block; }

        @media (max-width: 900px) {
          .mkt-nav { padding: 16px 24px; }
          .mkt-hero { flex-direction: column; padding: 40px 24px; text-align: center; }
          .mkt-hero p { margin: 0 auto 32px; }
          .mkt-hero-phone { transform: none; }
          .mkt-row { flex-direction: column !important; gap: 40px; }
          .mkt-yellow, .mkt-feature, .mkt-how { padding: 60px 24px; }
          .mkt-contact { padding: 60px 24px; }
          .mkt-footer { padding: 32px 24px; }
        }
      `}</style>

      <div className="mkt-page">

        {/* NAV */}
        <nav className="mkt-nav">
          <a href="/" className="mkt-logo">Reading<br/>Buddy</a>
          <div className="mkt-nav-links">
            <a href="#about">About Us</a>
            <a href="#contact">Contact Us</a>
            <a href="mailto:readingbuddies@outcome-ready.com" className="mkt-btn-login">Login</a>
          </div>
        </nav>

        {/* HERO */}
        <section className="mkt-hero">
          <div className="mkt-hero-left">
            <h1>Spark Your Child's Curiosity As They Master Reading</h1>
            <p>Designed for ages 5–8, this safe, distraction-free application uses the phonics approach to help kids learn to read. Instead of points, it rewards their curiosity with answers to their many questions—building confidence and a love for learning.</p>
            <a href="/signup?plan=premium_monthly" className="mkt-btn-primary">Start Free Trial</a>
          </div>
          <div className="mkt-hero-phone">
            <div style={{ width: 280, minHeight: 560, background: '#fff', borderRadius: 46, border: '9px solid #111', boxShadow: '0 40px 100px rgba(0,0,0,0.22)', position: 'relative', overflow: 'hidden', transform: 'perspective(1200px) rotateY(-8deg) rotateX(4deg)' }}>
              <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 96, height: 26, background: '#111', borderRadius: 13, zIndex: 10 }} />
              <div style={{ paddingTop: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '56px 24px 90px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Caveat, cursive', fontSize: '2rem', fontWeight: 700, marginBottom: 8 }}>Reading<br/>Buddy</div>
                <div style={{ fontSize: '0.82rem', color: '#555', marginBottom: 20, lineHeight: 1.5 }}>Reading makes your imagination<br/>grow bigger and stronger! 🌱</div>
                <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: 12 }}>Getting everything ready...</div>
                <div style={{ width: '80%', height: 8, background: '#eee', borderRadius: 40, overflow: 'hidden' }}>
                  <div style={{ width: '30%', height: '100%', background: '#E8534A', borderRadius: 40 }} />
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', marginTop: 12, color: '#111' }}>Excellent!</div>
                <div style={{ fontSize: '0.78rem', color: '#555' }}>You read 'sat' perfectly</div>
              </div>
              {/* ABC bar */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 3, padding: '0 8px 10px' }}>
                {[['A','#E8534A'],['B','#4ABDE8'],['C','#4AE8A0'],['D','#E8C84A']].map(([l,c]) => (
                  <div key={l} style={{ width: 52, height: 52, borderRadius: 14, background: c, color: '#fff', fontFamily: 'Nunito,sans-serif', fontWeight: 900, fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 12px ${c}80` }}>{l}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* YELLOW - Give your child */}
        <section className="mkt-yellow">
          <div className="mkt-row">
            <div className="mkt-row-phone">
              <div style={{ width: 260, minHeight: 520, background: '#fff', borderRadius: 42, border: '8px solid #111', boxShadow: '0 30px 80px rgba(0,0,0,0.18)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 90, height: 24, background: '#111', borderRadius: 12, zIndex: 10 }} />
                <div style={{ paddingTop: 52, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '52px 20px 90px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.82rem', color: '#555', marginBottom: 16 }}>Ready to start your reading adventure?</div>
                  <button className="mkt-btn-login" style={{ fontSize: '0.85rem', padding: '10px 24px' }}>Start Reading</button>
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 3, padding: '0 8px 10px' }}>
                  {[['A','#E8534A'],['B','#4ABDE8'],['C','#4AE8A0'],['D','#E8C84A']].map(([l,c]) => (
                    <div key={l} style={{ width: 48, height: 48, borderRadius: 12, background: c, color: '#fff', fontFamily: 'Nunito,sans-serif', fontWeight: 900, fontSize: '1.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{l}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mkt-row-text">
              <h2>Give your child the gift of confident reading and the freedom to explore their world.</h2>
              <a href="/signup?plan=premium_monthly" className="mkt-btn-black">Start Learning</a>
            </div>
          </div>
        </section>

        {/* KEY FEATURES */}
        <section className="mkt-feature" id="about">
          <div className="mkt-row">
            <div className="mkt-row-text">
              <p style={{ fontWeight: 800, fontSize: '1.4rem', marginBottom: 20 }}>Key Features</p>
              <h3>AI-Guided Practice</h3>
              <p>Personalized support ensures steady progress and builds strong reading foundations. Our AI listens, scores, and adapts to every child's exact level.</p>
            </div>
            <div className="mkt-row-phone">
              <div style={{ width: 260, minHeight: 520, background: '#fff', borderRadius: 42, border: '8px solid #111', boxShadow: '0 30px 80px rgba(0,0,0,0.18)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 90, height: 24, background: '#111', borderRadius: 12 }} />
                <div style={{ paddingTop: 60, padding: '60px 20px 90px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Caveat, cursive', fontSize: '1.8rem', fontWeight: 700, marginBottom: 8 }}>Reading Buddy</div>
                  <div style={{ fontSize: '0.78rem', color: '#555', marginBottom: 20 }}>Reading makes your imagination grow bigger and stronger! 🌱</div>
                  <div style={{ width: '80%', margin: '0 auto 8px', height: 8, background: '#eee', borderRadius: 40, overflow: 'hidden' }}>
                    <div style={{ width: '45%', height: '100%', background: '#E8534A', borderRadius: 40 }} />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#888' }}>Getting everything ready...</div>
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 3, padding: '0 8px 10px' }}>
                  {[['A','#E8534A'],['B','#4ABDE8'],['C','#4AE8A0'],['D','#E8C84A']].map(([l,c]) => (
                    <div key={l} style={{ width: 48, height: 48, borderRadius: 12, background: c, color: '#fff', fontFamily: 'Nunito,sans-serif', fontWeight: 900, fontSize: '1.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{l}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* YELLOW - curiosity */}
        <section className="mkt-yellow">
          <div className="mkt-row reverse">
            <div className="mkt-row-phone">
              <div style={{ width: 260, minHeight: 520, background: '#fff', borderRadius: 42, border: '8px solid #111', boxShadow: '0 30px 80px rgba(0,0,0,0.18)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 90, height: 24, background: '#111', borderRadius: 12 }} />
                <div style={{ padding: '60px 24px 90px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: '#aaa', marginBottom: 8 }}>← End Session</div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 24 }}>Dine</div>
                  <div style={{ width: 70, height: 70, borderRadius: '50%', background: '#E8534A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '1.8rem' }}>🎙</div>
                  <div style={{ fontSize: '0.82rem', color: '#555' }}>Press to record</div>
                  <div style={{ marginTop: 20, fontWeight: 800, fontSize: '1rem' }}>Excellent!</div>
                  <div style={{ fontSize: '0.75rem', color: '#555' }}>Brilliant reading! You're a superstar! 🌈</div>
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 3, padding: '0 8px 10px' }}>
                  {[['A','#E8534A'],['B','#4ABDE8'],['C','#4AE8A0'],['D','#E8C84A']].map(([l,c]) => (
                    <div key={l} style={{ width: 48, height: 48, borderRadius: 12, background: c, color: '#fff', fontFamily: 'Nunito,sans-serif', fontWeight: 900, fontSize: '1.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{l}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mkt-row-text">
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 24 }}>No points. No gamification. Just pure, unfiltered curiosity driving a deeper love of reading.</p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>Watch your child's confidence soar as they unlock new knowledge and gain the freedom to explore fresh ideas—no judgment, no barriers.</p>
            </div>
          </div>
        </section>

        {/* DISTRACTION FREE */}
        <section className="mkt-feature">
          <div className="mkt-row reverse">
            <div className="mkt-row-phone">
              <div style={{ width: 260, minHeight: 520, background: '#fff', borderRadius: 42, border: '8px solid #111', boxShadow: '0 30px 80px rgba(0,0,0,0.18)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 90, height: 24, background: '#111', borderRadius: 12 }} />
                <div style={{ padding: '60px 24px 90px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: '#E8534A', marginBottom: 20, textAlign: 'left' }}>← End Session</div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 32 }}>Dine</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {[...Array(5)].map((_, i) => <div key={i} style={{ width: 3, height: [14, 20, 28, 18, 10][i], background: '#ddd', borderRadius: 2 }} />)}
                    </div>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#E8534A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 18, height: 18, background: '#fff', borderRadius: 2 }} />
                    </div>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {[...Array(5)].map((_, i) => <div key={i} style={{ width: 3, height: [10, 22, 16, 26, 12][i], background: '#ddd', borderRadius: 2 }} />)}
                    </div>
                  </div>
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 3, padding: '0 8px 10px' }}>
                  {[['A','#E8534A'],['B','#4ABDE8'],['C','#4AE8A0'],['D','#E8C84A']].map(([l,c]) => (
                    <div key={l} style={{ width: 48, height: 48, borderRadius: 12, background: c, color: '#fff', fontFamily: 'Nunito,sans-serif', fontWeight: 900, fontSize: '1.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{l}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mkt-row-text">
              <h3>Distraction-Free Design</h3>
              <p>A clean, ad-free interface keeps the focus on reading and exploration—no gimmicks or pop-ups. Every element is designed to support your child's concentration.</p>
            </div>
          </div>
        </section>

        {/* YELLOW - exploration */}
        <section className="mkt-yellow">
          <div className="mkt-row">
            <div className="mkt-row-phone">
              <div style={{ width: 260, minHeight: 520, background: '#fff', borderRadius: 42, border: '8px solid #111', boxShadow: '0 30px 80px rgba(0,0,0,0.18)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 90, height: 24, background: '#111', borderRadius: 12 }} />
                <div style={{ padding: '60px 24px 90px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: '#E8534A', textAlign: 'left', marginBottom: 16 }}>← End Session</div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 24 }}>Dine</div>
                  <div style={{ width: 70, height: 70, borderRadius: '50%', background: '#E8534A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '1.8rem' }}>🎙</div>
                  <div style={{ fontSize: '0.82rem', color: '#555' }}>Press to record</div>
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 3, padding: '0 8px 10px' }}>
                  {[['A','#E8534A'],['B','#4ABDE8'],['C','#4AE8A0'],['D','#E8C84A']].map(([l,c]) => (
                    <div key={l} style={{ width: 48, height: 48, borderRadius: 12, background: c, color: '#fff', fontFamily: 'Nunito,sans-serif', fontWeight: 900, fontSize: '1.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{l}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mkt-row-text">
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 24 }}>Reading shouldn't just be about sounding out words—it's a launchpad for boundless exploration.</p>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#333' }}>Our AI-powered reading companion transforms routine practice into a journey of discovery. As your child reads aloud, they receive personalized, gentle guidance tailored to their level. After every three correct answers, they can ask Reading Buddy anything that sparks their curiosity—about dinosaurs, volcanoes, space, or any other wonder they dream up.</p>
            </div>
          </div>
        </section>

        {/* ADAPTIVE GROWTH */}
        <section className="mkt-feature">
          <div className="mkt-row">
            <div className="mkt-row-text">
              <h3>Adaptive Growth</h3>
              <p>Difficulty adjusts as your child improves, ensuring they're always challenged—never overwhelmed. Reading Buddy grows with them at every step.</p>
            </div>
            <div className="mkt-row-phone">
              <div style={{ width: 260, minHeight: 520, background: '#fff', borderRadius: 42, border: '8px solid #111', boxShadow: '0 30px 80px rgba(0,0,0,0.18)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 90, height: 24, background: '#111', borderRadius: 12 }} />
                <div style={{ padding: '60px 24px 90px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100%' }}>
                  <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#E8534A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, textAlign: 'center', padding: 12 }}>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem', lineHeight: 1.3 }}>Give it<br/>another<br/>try!</div>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#555' }}>You're brave for trying! Let's do it again!</div>
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 3, padding: '0 8px 10px' }}>
                  {[['A','#E8534A'],['B','#4ABDE8'],['C','#4AE8A0'],['D','#E8C84A']].map(([l,c]) => (
                    <div key={l} style={{ width: 48, height: 48, borderRadius: 12, background: c, color: '#fff', fontFamily: 'Nunito,sans-serif', fontWeight: 900, fontSize: '1.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{l}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PARENT DASHBOARD */}
        <section className="mkt-feature" style={{ background: '#fafafa' }}>
          <div className="mkt-row reverse">
            <div className="mkt-row-phone">
              <div style={{ width: 260, minHeight: 520, background: '#fff', borderRadius: 42, border: '8px solid #111', boxShadow: '0 30px 80px rgba(0,0,0,0.18)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 90, height: 24, background: '#111', borderRadius: 12 }} />
                <div style={{ padding: '60px 16px 90px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', textAlign: 'center', marginBottom: 12 }}>Reading Accuracy Distribution</div>
                  {/* Mini donut chart */}
                  <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'conic-gradient(#4AE8A0 0deg 180deg, #E8534A 180deg 260deg, #E8C84A 260deg 360deg)', margin: '0 auto 16px', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 28, borderRadius: '50%', background: '#fff' }} />
                  </div>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16, fontSize: '0.65rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4AE8A0', display: 'inline-block' }} />Correct</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#E8C84A', display: 'inline-block' }} />Partial</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#E8534A', display: 'inline-block' }} />Wrong</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.82rem', marginBottom: 8, textAlign: 'center' }}>Sessions</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4, fontSize: '0.65rem', textAlign: 'center' }}>
                    <div style={{ color: '#888' }}>Duration</div><div style={{ color: '#888' }}>Accuracy</div><div style={{ color: '#888' }}>Attempts</div>
                    <div>3.5 min</div><div>75.0%</div><div>4</div>
                  </div>
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 3, padding: '0 8px 10px' }}>
                  {[['A','#E8534A'],['B','#4ABDE8'],['C','#4AE8A0'],['D','#E8C84A']].map(([l,c]) => (
                    <div key={l} style={{ width: 48, height: 48, borderRadius: 12, background: c, color: '#fff', fontFamily: 'Nunito,sans-serif', fontWeight: 900, fontSize: '1.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{l}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mkt-row-text">
              <h3>Parent Dashboard</h3>
              <p>Stay in the loop with real-time progress insights. Discover your child's current reading level and emerging interests. NDIS-ready reports generated automatically after every session.</p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mkt-how">
          <h2>How It Works</h2>
          <div style={{ background: '#F5EDE4', borderRadius: 24, padding: 24, width: 320, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 260, minHeight: 480, background: '#fff', borderRadius: 42, border: '8px solid #111', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 80, height: 22, background: '#111', borderRadius: 11 }} />
              <div style={{ padding: '52px 20px 90px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <div style={{ fontFamily: 'Caveat, cursive', fontSize: '1.8rem', fontWeight: 700, marginBottom: 16, textAlign: 'center' }}>Reading<br/>Buddy</div>
                {/* Play button overlay */}
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#E8534A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, cursor: 'pointer' }}>
                  <div style={{ width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: '20px solid #fff', marginLeft: 4 }} />
                </div>
                <button style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 40, padding: '12px 32px', fontFamily: 'Nunito,sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>Get Started</button>
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 3, padding: '0 8px 10px' }}>
                {[['A','#E8534A'],['B','#4ABDE8'],['C','#4AE8A0'],['D','#E8C84A']].map(([l,c]) => (
                  <div key={l} style={{ width: 48, height: 48, borderRadius: 12, background: c, color: '#fff', fontFamily: 'Nunito,sans-serif', fontWeight: 900, fontSize: '1.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{l}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ padding: '80px 60px', background: '#fff' }}>
          <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 12 }}>Get In Touch</h2>
            <p style={{ color: '#555', marginBottom: 40 }}>Have questions? We're here to help your child succeed</p>
            {sent ? (
              <div style={{ background: '#F5C344', borderRadius: 16, padding: 32, fontWeight: 700, fontSize: '1.1rem' }}>✅ Thanks! We'll be in touch at {form.email}</div>
            ) : (
              <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                <label className="mkt-label">Name</label>
                <input className="mkt-input" placeholder="Enter your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                <label className="mkt-label">Email</label>
                <input className="mkt-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                <label className="mkt-label">Message</label>
                <textarea className="mkt-input mkt-textarea" placeholder="How can we help?" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
                <button type="submit" className="mkt-btn-primary" style={{ width: '100%', maxWidth: '100%', fontSize: '1rem', padding: '16px' }}>Send Message</button>
              </form>
            )}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mkt-footer">
          <span className="mkt-footer-logo">Reading Buddy</span>
          <p style={{ marginBottom: 8 }}>AI-powered reading intelligence for Australian schools and NDIS providers.</p>
          <p style={{ marginBottom: 16 }}><a href="mailto:readingbuddies@outcome-ready.com">readingbuddies@outcome-ready.com</a></p>
          <p style={{ fontSize: '0.8rem' }}>Tech 4 Humanity Pty Ltd · ABN 70 666 271 272 · Built in Australia 🇦🇺</p>
          <p style={{ fontSize: '0.8rem', marginTop: 8 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.5)', marginRight: 16 }}>← Main Site</a>
            © 2026 All rights reserved.
          </p>
        </footer>

      </div>
    </>
  )
}
