import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import FooterSweetSpots from '@/components/FooterSweetSpots'

export const metadata: Metadata = {
  title: 'AI Sweet Spots Research — Reading Buddy',
  description: 'Contribute to AI Sweet Spots research. Help identify where AI support works best.',
}

const C = { sage:'#4a7c59', navy:'#1a2e1f', mid:'#5a5a5a', cream:'#faf7f2', border:'#e8e2d9', lav:'#9B8AF7' }

export default function SweetSpotsPage() {
  return (
    <>
      <Nav />
      <section style={{ background:`linear-gradient(135deg,#0d1e14 0%,#1a2040 100%)`, padding:'5rem 1.5rem 4rem', color:'white', textAlign:'center' }}>
        <p style={{ fontSize:'0.78rem', textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(255,255,255,0.55)', marginBottom:'0.75rem' }}>AI Sweet Spots · Tech 4 Humanity Research</p>
        <h1 style={{ fontFamily:'Fraunces,serif', fontSize:'clamp(2rem,4.5vw,3rem)', fontWeight:900, marginBottom:'1rem', lineHeight:1.1 }}>
          Find your <span style={{color:C.lav}}>AI Sweet Spot</span>
        </h1>
        <p style={{ color:'rgba(255,255,255,0.75)', fontSize:'1.05rem', maxWidth:600, margin:'0 auto 2rem', lineHeight:1.75 }}>
          Reading Buddy is powered by AI Sweet Spots research — studying how different people benefit from different levels of AI support. 4,256+ participants and growing.
        </p>
        <Link href="https://outcome-ready.vercel.app/sweetspots" target="_blank"
          style={{ background:C.lav, color:'white', padding:'0.875rem 2rem', borderRadius:50, fontWeight:700, textDecoration:'none', display:'inline-block' }}>
          Take the survey →
        </Link>
      </section>

      <section style={{ padding:'5rem 1.5rem', background:C.cream }}>
        <div style={{ maxWidth:820, margin:'0 auto', textAlign:'center' }}>
          <h2 style={{ fontFamily:'Fraunces,serif', fontSize:'clamp(1.5rem,3vw,2rem)', fontWeight:800, color:C.navy, marginBottom:'1rem' }}>Reading Buddy contributes to the research</h2>
          <p style={{ color:C.mid, lineHeight:1.8, maxWidth:640, margin:'0 auto 2rem' }}>
            Every Reading Buddy session captures anonymous signals — how different levels of AI reading support affect comprehension, engagement, and confidence — building a continuously improving model of human-AI collaboration in literacy.
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'1.25rem', textAlign:'left', marginBottom:'3rem' }}>
            {[
              ['📊','Session signals','AI assist level vs reading outcome per session'],
              ['🧠','Cognitive profiles','9 profiles mapped across 4,256+ participants'],
              ['📈','Continuous model','Product improves as research grows'],
              ['🔒','Private by default','Anonymous unless you explicitly consent to linking'],
            ].map(([icon,t,d]) => (
              <div key={t as string} style={{ background:'white', borderRadius:12, padding:'1.25rem', border:`1px solid ${C.border}` }}>
                <div style={{ fontSize:'1.5rem', marginBottom:'0.4rem' }}>{icon}</div>
                <div style={{ fontWeight:700, fontSize:'0.85rem', color:C.navy, marginBottom:'0.25rem' }}>{t}</div>
                <div style={{ fontSize:'0.78rem', color:C.mid, lineHeight:1.55 }}>{d}</div>
              </div>
            ))}
          </div>
          <Link href="https://outcome-ready.vercel.app/sweetspots" target="_blank"
            style={{ display:'inline-block', background:C.sage, color:'white', padding:'1rem 2.5rem', borderRadius:50, fontWeight:700, textDecoration:'none' }}>
            Take the full survey on Outcome Ready →
          </Link>
        </div>
      </section>

      <FooterSweetSpots />
    </>
  )
}
