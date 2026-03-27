import Link from 'next/link'

export default function FooterSweetSpots() {
  return (
    <footer style={{ borderTop:'1px solid #e8e2d9', marginTop:'auto', padding:'3rem 1.5rem 2rem', background:'#faf7f2', fontSize:'0.85rem' }}>
      <div style={{ maxWidth:1160, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'2.5rem' }}>
        <div>
          <h3 style={{ fontWeight:700, color:'#1a3c2d', marginBottom:'0.5rem', fontSize:'0.9rem' }}>Outcome Ready</h3>
          <p style={{ color:'#5a5a5a', lineHeight:1.7, marginBottom:'0.75rem' }}>
            The platform behind Reading Buddy. Measure and prove progress across participants, programs, and real-world outcomes.
          </p>
          <Link href="https://outcome-ready.vercel.app" target="_blank" style={{ color:'#4a7c59', textDecoration:'none', fontSize:'0.82rem', fontWeight:600 }}>Open Outcome Ready →</Link>
        </div>

        <div>
          <h3 style={{ fontWeight:700, color:'#1a3c2d', marginBottom:'0.5rem', fontSize:'0.9rem' }}>Reading Buddy</h3>
          <p style={{ color:'#5a5a5a', lineHeight:1.7, marginBottom:'0.75rem' }}>
            AI-supported reading sessions with measurable progress, NDIS evidence, and books customised to every child.
          </p>
          <Link href="/" style={{ color:'#4a7c59', textDecoration:'none', fontSize:'0.82rem', fontWeight:600 }}>Home →</Link>
        </div>

        <div>
          <h3 style={{ fontWeight:700, color:'#1a3c2d', marginBottom:'0.5rem', fontSize:'0.9rem' }}>🧠 AI Sweet Spots Research</h3>
          <p style={{ color:'#5a5a5a', lineHeight:1.7, marginBottom:'0.75rem' }}>
            This experience is informed by AI Sweet Spots research — studying where different levels of AI support work best for different people and contexts.
          </p>
          <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
            <Link href="https://outcome-ready.vercel.app/sweetspots" target="_blank" style={{ color:'#4a7c59', textDecoration:'none', fontSize:'0.82rem', fontWeight:600 }}>Take the survey →</Link>
            <Link href="https://outcome-ready.vercel.app/sweetspots#research" target="_blank" style={{ color:'#5a5a5a', textDecoration:'none', fontSize:'0.82rem' }}>Learn more</Link>
          </div>
        </div>
      </div>
      <div style={{ maxWidth:1160, margin:'1.5rem auto 0', paddingTop:'1rem', borderTop:'1px solid #e8e2d9', fontSize:'0.75rem', color:'#aaa' }}>
        © 2026 Tech 4 Humanity Pty Ltd · ABN 70 666 271 272 · Built in Australia 🇦🇺
      </div>
    </footer>
  )
}
