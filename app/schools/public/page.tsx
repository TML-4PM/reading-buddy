import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Reading Buddy for Public Schools — AI reading intelligence for every student',
  description: 'Replace $48,000 in levelled readers. Live NAPLAN-aligned data, automated parent reports, and whole-school dashboards for $5,900/yr.',
}

const C = { sage:'#4a7c59', sageL:'#7fb08f', navy:'#1a2e1f', mid:'#5a5a5a', cream:'#faf7f2', border:'#e8e2d9' }

export default function PublicSchools() {
  return (
    <>
      <Nav />
      <section style={{ background:`linear-gradient(135deg,#0d1e14 0%,#1d6e63 100%)`, padding:'5rem 1.5rem 4rem', color:'white', textAlign:'center' }}>
        <p style={{ fontSize:'0.78rem', textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(255,255,255,0.55)', marginBottom:'0.75rem' }}>Government Schools</p>
        <h1 style={{ fontFamily:'Fraunces,serif', fontSize:'clamp(2rem,4.5vw,3rem)', fontWeight:900, marginBottom:'1rem', lineHeight:1.15 }}>
          Every student measured.<br />Every session.<br /><em style={{ fontStyle:'normal', color:C.sageL }}>No extra budget.</em>
        </h1>
        <p style={{ color:'rgba(255,255,255,0.75)', fontSize:'1.05rem', maxWidth:600, margin:'0 auto 2rem', lineHeight:1.7 }}>
          Reading Buddy replaces $48,000 in levelled readers and hours of manual admin for $5,900 per year. Live NAPLAN-aligned data, automated parent reports, and whole-school dashboards — included.
        </p>
        <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
          <Link href="/contact?plan=school" style={{ background:C.sage, color:'white', padding:'0.875rem 2rem', borderRadius:50, fontWeight:700, textDecoration:'none' }}>Start school plan — $5,900/yr</Link>
          <Link href="mailto:readingbuddies@outcome-ready.com?subject=Free+Trial+Public" style={{ border:'2px solid rgba(255,255,255,0.4)', color:'white', padding:'0.875rem 2rem', borderRadius:50, fontWeight:600, textDecoration:'none' }}>Try free — one classroom</Link>
        </div>
      </section>

      <section style={{ padding:'5rem 1.5rem', background:C.cream }}>
        <div style={{ maxWidth:1060, margin:'0 auto' }}>
          <h2 style={{ fontFamily:'Fraunces,serif', fontSize:'clamp(1.5rem,3vw,2rem)', fontWeight:800, color:C.navy, marginBottom:'2.5rem', textAlign:'center' }}>What public schools are dealing with</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'1.25rem' }}>
            {[
              ['📊','NAPLAN pressure with no live data','You find out where students are at test time. Reading Buddy gives you the same picture every week, so you are never surprised.','#c0392b'],
              ['💰','Tight budgets, high expectations','Government schools face funding constraints but are held to the same outcomes. Reading Buddy costs less than one book set.','#e67e22'],
              ['📝','Reporting burden on teachers','Every hour spent on reading records, levelling, and parent reports is an hour not spent teaching.','#8e44ad'],
              ['🎯','Intervention timing','Students fall behind before the data arrives. Live metrics mean you catch the gap in week two, not term four.','#2980b9'],
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
          <h2 style={{ fontFamily:'Fraunces,serif', fontSize:'clamp(1.5rem,3vw,2rem)', fontWeight:800, color:C.navy, marginBottom:'2.5rem', textAlign:'center' }}>What public schools get</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'1rem' }}>
            {[
              ['16×','Book sets replaced','$48,000 in levelled readers replaced by one $5,900/yr subscription',C.sage],
              ['6 hrs','Per teacher per week','Saved on marking, levelling, reporting, and parent communications',C.sageL],
              ['Live','NAPLAN readiness view','Real-time reading level vs year-level benchmark for every student',C.navy],
              ['1-click','Funding evidence','Export literacy progress reports for disability funding, LBOTE, integration applications','#8e44ad'],
            ].map(([stat,label,desc,accent]) => (
              <div key={label} style={{ background:C.cream, borderRadius:14, padding:'1.5rem', textAlign:'center', border:`1px solid ${C.border}` }}>
                <div style={{ fontFamily:'Fraunces,serif', fontWeight:900, fontSize:'2rem', color:accent as string, marginBottom:'0.25rem' }}>{stat}</div>
                <div style={{ fontWeight:700, fontSize:'0.85rem', color:C.navy, marginBottom:'0.5rem' }}>{label}</div>
                <div style={{ fontSize:'0.78rem', color:C.mid, lineHeight:1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding:'5rem 1.5rem', background:C.cream }}>
        <div style={{ maxWidth:760, margin:'0 auto', textAlign:'center' }}>
          <h2 style={{ fontFamily:'Fraunces,serif', fontSize:'clamp(1.4rem,3vw,1.8rem)', fontWeight:800, color:C.navy, marginBottom:'2.5rem' }}>Simple, transparent pricing</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'1.25rem' }}>
            {[
              { tier:'Start free', price:'Free', desc:'1 classroom, unlimited students, core metrics. No credit card.', cta:'Get started free', href:'mailto:readingbuddies@outcome-ready.com?subject=Free+Trial', featured:false },
              { tier:'Whole school', price:'$5,900/yr', desc:'Up to 10 classrooms. School dashboard. All features. Extra classrooms $590/yr each.', cta:'Start school plan', href:'/contact?plan=school', featured:true },
            ].map(p => (
              <div key={p.tier} style={{ background:p.featured ? C.navy : 'white', borderRadius:16, padding:'2rem', border:p.featured ? 'none' : `1px solid ${C.border}` }}>
                <div style={{ fontSize:'0.78rem', fontWeight:700, color:p.featured ? 'rgba(255,255,255,0.6)' : C.mid, marginBottom:'0.5rem', textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>{p.tier}</div>
                <div style={{ fontFamily:'Fraunces,serif', fontWeight:900, fontSize:'1.8rem', color:p.featured ? 'white' : C.navy, marginBottom:'0.5rem' }}>{p.price}</div>
                <p style={{ fontSize:'0.82rem', color:p.featured ? 'rgba(255,255,255,0.7)' : C.mid, lineHeight:1.6, marginBottom:'1.5rem' }}>{p.desc}</p>
                <Link href={p.href} style={{ display:'block', background:p.featured ? C.sage : 'transparent', color:p.featured ? 'white' : C.sage, border:`2px solid ${C.sage}`, padding:'0.75rem', borderRadius:50, fontWeight:700, textDecoration:'none', fontSize:'0.875rem', textAlign:'center' as const }}>{p.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
