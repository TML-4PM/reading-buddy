import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Reading Buddy for Private Schools — Professional reading intelligence',
  description: 'Professional parent reports, ATAR-aligned tracking, and board-ready literacy data for independent schools.',
}

const C = { sage:'#4a7c59', sageL:'#7fb08f', navy:'#1a2e1f', mid:'#5a5a5a', cream:'#faf7f2', border:'#e8e2d9' }

export default function PrivateSchools() {
  return (
    <>
      <Nav />
      <section style={{ background:`linear-gradient(135deg,#0d1e14 0%,#1a3455 100%)`, padding:'5rem 1.5rem 4rem', color:'white', textAlign:'center' }}>
        <p style={{ fontSize:'0.78rem', textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(255,255,255,0.55)', marginBottom:'0.75rem' }}>Independent and Private Schools</p>
        <h1 style={{ fontFamily:'Fraunces,serif', fontSize:'clamp(2rem,4.5vw,3rem)', fontWeight:900, marginBottom:'1rem', lineHeight:1.15 }}>
          Professional parent reports.<br />ATAR-aligned tracking.<br /><em style={{ fontStyle:'normal', color:C.sageL }}>Board-ready data.</em>
        </h1>
        <p style={{ color:'rgba(255,255,255,0.75)', fontSize:'1.05rem', maxWidth:620, margin:'0 auto 2rem', lineHeight:1.7 }}>
          Reading Buddy gives independent schools the reading intelligence their families expect — automated parent snapshots, above-benchmark tracking, growth analytics, and school-wide dashboards. All from every reading session.
        </p>
        <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
          <Link href="/contact?plan=school" style={{ background:C.sage, color:'white', padding:'0.875rem 2rem', borderRadius:50, fontWeight:700, textDecoration:'none' }}>Start school plan — $5,900/yr</Link>
          <Link href="/contact" style={{ border:'2px solid rgba(255,255,255,0.4)', color:'white', padding:'0.875rem 2rem', borderRadius:50, fontWeight:600, textDecoration:'none' }}>Talk to our schools team</Link>
        </div>
      </section>

      <section style={{ padding:'5rem 1.5rem', background:C.cream }}>
        <div style={{ maxWidth:1060, margin:'0 auto' }}>
          <h2 style={{ fontFamily:'Fraunces,serif', fontSize:'clamp(1.5rem,3vw,2rem)', fontWeight:800, color:C.navy, marginBottom:'2.5rem', textAlign:'center' }}>Built for what independent schools need</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'1.25rem' }}>
            {[
              ['🎓','ATAR and academic outcomes','Early reading fluency predicts academic trajectory. Reading Buddy identifies students at risk of falling behind years before ATAR.','#4a7c59'],
              ['👨‍👩‍👧','Parent engagement','Private school families expect detailed, regular progress updates. Reading Buddy generates professional parent snapshots after every session.','#2980b9'],
              ['🏆','Above-benchmark achievement','Growth charts track each student against year-level benchmarks. The goal is not just meeting — it\'s exceeding. Reading Buddy shows exactly who is accelerating.','#8e44ad'],
              ['🎯','Co-curricular and extension','Reading extension, gifted programs, and tutoring. Reading Buddy tracks progress across all programs in one dashboard.','#e67e22'],
              ['📊','Board-level reporting','Generate school-wide literacy progress reports for board meetings, parent information nights, and accreditation requirements.','#c0392b'],
              ['🔗','LMS integration','Integrates with major LMS platforms used by independent schools. Reading data flows into your existing systems.','#16a085'],
            ].map(([icon,t,d,accent]) => (
              <div key={t} style={{ background:'white', borderRadius:14, padding:'1.5rem', borderLeft:`4px solid ${accent as string}` }}>
                <div style={{ fontSize:'1.5rem', marginBottom:'0.5rem' }}>{icon}</div>
                <h4 style={{ fontFamily:'Fraunces,serif', fontWeight:800, fontSize:'0.95rem', color:C.navy, marginBottom:'0.4rem' }}>{t}</h4>
                <p style={{ fontSize:'0.82rem', color:C.mid, lineHeight:1.65, margin:0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding:'5rem 1.5rem', background:'white' }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <h2 style={{ fontFamily:'Fraunces,serif', fontSize:'clamp(1.4rem,3vw,1.8rem)', fontWeight:800, color:C.navy, marginBottom:'2rem', textAlign:'center' }}>Pricing — one price, whole school</h2>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.875rem' }}>
              <thead>
                <tr style={{ background:C.navy, color:'white' }}>
                  {['Plan','Free','Premium Classroom','Premium School'].map(h => (
                    <th key={h} style={{ padding:'0.75rem 1rem', textAlign:'left' as const, fontFamily:'Fraunces,serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Price','Free','$59/month','$5,900/year'],
                  ['Classrooms','1','1','Up to 10+'],
                  ['Parent reports','Basic','Full','Full'],
                  ['Growth vs benchmark','No','Yes','Yes'],
                  ['School dashboard','No','No','Yes'],
                  ['LMS integration','No','No','Basic'],
                  ['Custom book library','No','Yes','Yes'],
                  ['NDIS mode','No','Full','Full'],
                ].map(([label,...vals]) => (
                  <tr key={label} style={{ borderBottom:`1px solid ${C.border}` }}>
                    <td style={{ padding:'0.75rem 1rem', color:C.navy, fontWeight:600 }}>{label}</td>
                    {vals.map((v,i) => <td key={i} style={{ padding:'0.75rem 1rem', color:v==='No' ? '#ccc' : C.mid }}>{v}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display:'flex', gap:'1rem', justifyContent:'center', marginTop:'2rem', flexWrap:'wrap' }}>
            <Link href="mailto:readingbuddies@outcome-ready.com?subject=Free+Trial+Private" style={{ background:C.sage, color:'white', padding:'0.875rem 2rem', borderRadius:50, fontWeight:700, textDecoration:'none' }}>Start free trial</Link>
            <Link href="/contact?plan=school" style={{ border:`2px solid ${C.sage}`, color:C.sage, padding:'0.875rem 2rem', borderRadius:50, fontWeight:600, textDecoration:'none' }}>Get school plan</Link>
          </div>
        </div>
      </section>
    </>
  )
}
