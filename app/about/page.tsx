import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'About — Reading Buddy by Tech 4 Humanity',
  description: 'Built for teachers. Powered by AI. Grounded in humanity. Reading Buddy is a product of Tech 4 Humanity.',
}

const C = { sage:'#4a7c59', sageL:'#7fb08f', navy:'#1a2e1f', mid:'#5a5a5a', cream:'#faf7f2', border:'#e8e2d9' }

export default function About() {
  return (
    <>
      <Nav />
      <section style={{ background:`linear-gradient(135deg,#0d1e14 0%,#1d6e63 100%)`, padding:'5rem 1.5rem 4rem', color:'white', textAlign:'center' }}>
        <p style={{ fontSize:'0.78rem', textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(255,255,255,0.55)', marginBottom:'0.75rem' }}>Made in Australia · Tech 4 Humanity</p>
        <h1 style={{ fontFamily:'Fraunces,serif', fontSize:'clamp(2rem,4.5vw,3rem)', fontWeight:900, marginBottom:'1rem', lineHeight:1.15 }}>
          Built for teachers.<br />Powered by AI.<br /><em style={{ fontStyle:'normal', color:C.sageL }}>Grounded in humanity.</em>
        </h1>
        <p style={{ color:'rgba(255,255,255,0.75)', fontSize:'1.05rem', maxWidth:600, margin:'0 auto' }}>
          Reading Buddy is a product of Tech 4 Humanity — an Australian R&D company building AI tools that amplify what humans do best, not replace them.
        </p>
      </section>

      <section style={{ padding:'5rem 1.5rem', background:C.cream }}>
        <div style={{ maxWidth:760, margin:'0 auto' }}>
          <h2 style={{ fontFamily:'Fraunces,serif', fontSize:'clamp(1.5rem,3vw,2rem)', fontWeight:800, color:C.navy, marginBottom:'1.25rem' }}>The problem we're solving</h2>
          <p style={{ color:C.mid, lineHeight:1.8, marginBottom:'1.25rem' }}>
            Australian schools spend tens of thousands of dollars on physical reading book sets that need replacing every few years. Teachers spend hours every week tracking reading progress, writing reports, levelling students, and communicating with parents — all manually.
          </p>
          <p style={{ color:C.mid, lineHeight:1.8, marginBottom:'1.25rem' }}>
            For NDIS providers, the problem is even more acute. Documentation requirements are heavy, evidence standards are strict, and admin overhead cuts directly into billable time and participant outcomes.
          </p>
          <p style={{ color:C.mid, lineHeight:1.8 }}>
            Reading Buddy was built to eliminate all of that. Not to replace teachers — to give them their time back.
          </p>
        </div>
      </section>

      <section style={{ padding:'5rem 1.5rem', background:'white' }}>
        <div style={{ maxWidth:760, margin:'0 auto' }}>
          <h2 style={{ fontFamily:'Fraunces,serif', fontSize:'clamp(1.4rem,3vw,1.8rem)', fontWeight:800, color:C.navy, marginBottom:'1rem' }}>The Augmented Humanity Coach model</h2>
          <p style={{ color:C.mid, lineHeight:1.8, marginBottom:'2rem' }}>
            We call our AI model the Augmented Humanity Coach (AHC). The principle is simple: AI should amplify human capability, not substitute human judgement. Reading Buddy listens, analyses, and generates — but teachers approve, adapt, and act.
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'1.25rem' }}>
            {[
              ['🇦🇺','Australian-built','Designed for the Australian curriculum, NDIS standards, and Privacy Act requirements. Not adapted from overseas.',C.sage],
              ['🔬','R&D backed','Tech 4 Humanity is an R&D company. Reading Buddy is supported by continuous research into literacy outcomes and AI accuracy.','#2980b9'],
              ['👩‍🏫','Teacher-first design','Every feature was validated with classroom teachers, reading specialists, and NDIS practitioners before shipping.','#e67e22'],
              ['🔒','Privacy by design','Student and participant data never leaves Australian servers. Privacy protection is built into the architecture, not bolted on.','#8e44ad'],
            ].map(([icon,t,d,accent]) => (
              <div key={t} style={{ background:C.cream, borderRadius:14, padding:'1.5rem', borderTop:`3px solid ${accent as string}` }}>
                <div style={{ fontSize:'1.5rem', marginBottom:'0.5rem' }}>{icon}</div>
                <h4 style={{ fontFamily:'Fraunces,serif', fontWeight:800, fontSize:'0.9rem', color:C.navy, marginBottom:'0.4rem' }}>{t}</h4>
                <p style={{ fontSize:'0.8rem', color:C.mid, lineHeight:1.6, margin:0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding:'5rem 1.5rem', background:C.cream }}>
        <div style={{ maxWidth:760, margin:'0 auto' }}>
          <h2 style={{ fontFamily:'Fraunces,serif', fontSize:'clamp(1.4rem,3vw,1.8rem)', fontWeight:800, color:C.navy, marginBottom:'1.25rem' }}>Part of the Tech 4 Humanity ecosystem</h2>
          <p style={{ color:C.mid, lineHeight:1.8, marginBottom:'2rem' }}>Reading Buddy is one of several AI-powered products built by Tech 4 Humanity to improve lives through technology that respects and amplifies human capability.</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'1rem' }}>
            {[
              ['🌿','OutcomeReady','NDIS evidence platform for providers, families, and ThrivingOS','https://outcome-ready.vercel.app'],
              ['🤖','AHC','Augmented Humanity Coach — continuous AI coaching','https://augmented-humanity.com'],
              ['🏗️','AI for Tradies','Full-service AI for Australian trades businesses','https://ai4tradies.org'],
              ['🧠','Neural Ennead','729-agent AI operating system framework','https://outcome-ready.vercel.app'],
            ].map(([icon,name,desc,url]) => (
              <Link key={name} href={url} target="_blank" style={{ background:'white', borderRadius:12, padding:'1.25rem', border:`1px solid ${C.border}`, textDecoration:'none', display:'block' }}>
                <div style={{ fontSize:'1.5rem', marginBottom:'0.4rem' }}>{icon}</div>
                <div style={{ fontWeight:700, fontSize:'0.9rem', color:C.navy, marginBottom:'0.25rem' }}>{name}</div>
                <div style={{ fontSize:'0.78rem', color:C.mid, lineHeight:1.5 }}>{desc}</div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop:'2rem', padding:'1.25rem', background:'white', borderRadius:12, border:`1px solid ${C.border}` }}>
            <div style={{ fontWeight:700, fontSize:'0.85rem', color:C.navy, marginBottom:'0.4rem' }}>Tech 4 Humanity Pty Ltd</div>
            <div style={{ fontSize:'0.82rem', color:C.mid }}>ABN 70 666 271 272 · Built in Australia 🇦🇺 · hello@tech4humanity.com.au</div>
          </div>
        </div>
      </section>
    </>
  )
}
