import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'NDIS Mode — Reading Buddy',
  description: 'NDIS-compliant progress notes, goal tracking, and plan review evidence — automatically generated from every reading session.',
}

const C = { sage:'#4a7c59', sageL:'#7fb08f', navy:'#1a2e1f', mid:'#5a5a5a', cream:'#faf7f2', border:'#e8e2d9' }

export default function NDIS() {
  return (
    <>
      <Nav />
      <section style={{ background:`linear-gradient(135deg,#0d1e14 0%,#1d6e63 100%)`, padding:'5rem 1.5rem 4rem', color:'white', textAlign:'center' }}>
        <p style={{ fontSize:'0.78rem', textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(255,255,255,0.55)', marginBottom:'0.75rem' }}>NDIS Mode · Australian Compliance</p>
        <h1 style={{ fontFamily:'Fraunces,serif', fontSize:'clamp(2rem,4.5vw,3rem)', fontWeight:900, marginBottom:'1rem', lineHeight:1.15 }}>
          NDIS documentation.<br /><em style={{ fontStyle:'normal', color:C.sageL }}>Automated.</em>
        </h1>
        <p style={{ color:'rgba(255,255,255,0.75)', fontSize:'1.05rem', maxWidth:580, margin:'0 auto 2rem', lineHeight:1.7 }}>
          Reading Buddy generates compliant progress notes, tracks participant goals, and produces plan review evidence — automatically, from every reading session.
        </p>
        <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
          <Link href="/contact?plan=ndis" style={{ background:C.sage, color:'white', padding:'0.875rem 2rem', borderRadius:50, fontWeight:700, textDecoration:'none' }}>Talk to our NDIS team</Link>
          <Link href="mailto:readingbuddies@outcome-ready.com?subject=NDIS+Trial" style={{ border:'2px solid rgba(255,255,255,0.4)', color:'white', padding:'0.875rem 2rem', borderRadius:50, fontWeight:600, textDecoration:'none' }}>Start free trial</Link>
        </div>
      </section>

      <section style={{ padding:'5rem 1.5rem', background:C.cream }}>
        <div style={{ maxWidth:1060, margin:'0 auto' }}>
          <p style={{ fontSize:'0.78rem', textTransform:'uppercase', letterSpacing:'0.12em', color:C.sage, fontWeight:700, marginBottom:'0.75rem', textAlign:'center' }}>The NDIS documentation problem</p>
          <h2 style={{ fontFamily:'Fraunces,serif', fontSize:'clamp(1.5rem,3vw,2rem)', fontWeight:800, color:C.navy, textAlign:'center', marginBottom:'2.5rem' }}>Every provider knows it. The paperwork load is unsustainable.</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'1.25rem' }}>
            {[
              ['⏱','Hours of manual note-writing','Therapists spend 2-4 hours per week writing progress notes that could be generated in seconds from session data.','#c0392b'],
              ['📋','Inconsistent evidence','NDIS auditors flag documentation gaps. Manual notes vary by practitioner, shift, and workload.','#e67e22'],
              ['📁','No data continuity','When a participant changes provider, reading history and progress data is lost or inaccessible.','#8e44ad'],
              ['💸','Billing hours lost to admin','Every hour spent on paperwork is an hour not billed. Documentation overhead cuts into provider viability.','#2980b9'],
            ].map(([icon,t,d,accent]) => (
              <div key={t} style={{ background:'white', borderRadius:14, padding:'1.5rem', borderTop:`3px solid ${accent as string}` }}>
                <div style={{ fontSize:'1.75rem', marginBottom:'0.5rem' }}>{icon}</div>
                <h4 style={{ fontFamily:'Fraunces,serif', fontWeight:800, fontSize:'0.95rem', color:C.navy, marginBottom:'0.4rem' }}>{t}</h4>
                <p style={{ fontSize:'0.82rem', color:C.mid, lineHeight:1.65, margin:0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding:'5rem 1.5rem', background:'white' }}>
        <div style={{ maxWidth:1060, margin:'0 auto' }}>
          <p style={{ fontSize:'0.78rem', textTransform:'uppercase', letterSpacing:'0.12em', color:C.sage, fontWeight:700, marginBottom:'0.75rem', textAlign:'center' }}>How Reading Buddy solves it</p>
          <h2 style={{ fontFamily:'Fraunces,serif', fontSize:'clamp(1.5rem,3vw,2rem)', fontWeight:800, color:C.navy, textAlign:'center', marginBottom:'2.5rem' }}>Built with NDIS providers. Aligned to Australian standards.</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1.5rem' }}>
            {[
              ['🤖','AI session notes','Every reading session auto-generates an NDIS-aligned progress note. Review, edit, approve — one click.',C.sage],
              ['🎯','Goal tracking','Map reading sessions to participant NDIS goals. Track progress against targets with measurable outcomes.',C.sageL],
              ['📊','Evidence reports','Plan review reports generated automatically. Goal progress, reading gains, and intervention evidence — NDIS-ready.',C.navy],
              ['👥','Multi-participant dashboard','Manage a full caseload from one view. Spot who needs attention, who is progressing, who is at risk.','#8e44ad'],
              ['🔄','Provider handover packs','When participants change providers, their reading history, goals, and progress transfer cleanly.','#e67e22'],
              ['📱','Works on any device','Tablet, phone, laptop. Sessions happen wherever the participant is — Reading Buddy works there too.','#2980b9'],
            ].map(([icon,t,d,accent]) => (
              <div key={t} style={{ background:C.cream, borderRadius:14, padding:'1.5rem', border:`1px solid ${C.border}`, borderLeft:`4px solid ${accent as string}` }}>
                <div style={{ fontSize:'1.5rem', marginBottom:'0.5rem' }}>{icon}</div>
                <h4 style={{ fontFamily:'Fraunces,serif', fontWeight:800, fontSize:'0.95rem', color:C.navy, marginBottom:'0.4rem' }}>{t}</h4>
                <p style={{ fontSize:'0.82rem', color:C.mid, lineHeight:1.65, margin:0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding:'5rem 1.5rem', background:C.cream }}>
        <div style={{ maxWidth:760, margin:'0 auto' }}>
          <p style={{ fontSize:'0.78rem', textTransform:'uppercase', letterSpacing:'0.12em', color:C.sage, fontWeight:700, marginBottom:'0.75rem', textAlign:'center' }}>Provider workflow</p>
          <h2 style={{ fontFamily:'Fraunces,serif', fontSize:'clamp(1.4rem,3vw,1.8rem)', fontWeight:800, color:C.navy, textAlign:'center', marginBottom:'2.5rem' }}>From session to evidence report — fully automated.</h2>
          <div style={{ display:'flex', flexDirection:'column' as const, gap:'1rem' }}>
            {[
              ['01','Onboard participants','Add participants, link their NDIS goals, and set reading benchmarks in minutes.'],
              ['02','Run reading sessions','Participant reads — on any device. AI listens, scores WPM, accuracy, prosody, and comprehension.'],
              ['03','Review auto-generated notes','NDIS progress note appears immediately. Review and approve — usually under 2 minutes.'],
              ['04','Track against goals','Dashboard shows goal progress over time. Flags when a participant is ahead, on track, or falling behind.'],
              ['05','Export for plan reviews','One-click export of all session data, goal progress, and reading gains — formatted for NDIS plan review.'],
            ].map(([num,t,d]) => (
              <div key={num} style={{ display:'flex', gap:'1rem', background:'white', borderRadius:12, padding:'1.25rem 1.5rem', border:`1px solid ${C.border}` }}>
                <div style={{ background:C.sage, color:'white', width:36, height:36, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Fraunces,serif', fontWeight:800, fontSize:'0.85rem', flexShrink:0 }}>{num}</div>
                <div>
                  <div style={{ fontWeight:700, fontSize:'0.9rem', color:C.navy, marginBottom:'0.25rem' }}>{t}</div>
                  <div style={{ fontSize:'0.82rem', color:C.mid, lineHeight:1.6 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background:`linear-gradient(135deg,#0d1e14,#1a3c2d)`, padding:'4rem 1.5rem', textAlign:'center', color:'white' }}>
        <div style={{ maxWidth:560, margin:'0 auto' }}>
          <h2 style={{ fontFamily:'Fraunces,serif', fontSize:'clamp(1.5rem,3vw,2rem)', fontWeight:800, marginBottom:'1rem' }}>See Reading Buddy NDIS mode in action</h2>
          <p style={{ color:'rgba(255,255,255,0.75)', marginBottom:'2rem', lineHeight:1.7 }}>We'll walk you through how documentation works for your caseload — no obligations.</p>
          <Link href="/contact?plan=ndis" style={{ background:C.sage, color:'white', padding:'1rem 2.5rem', borderRadius:50, fontWeight:700, textDecoration:'none', display:'inline-block' }}>Talk to our NDIS team →</Link>
        </div>
      </section>
    </>
  )
}
