import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Features — Reading Buddy',
  description: 'AI that listens, scores, reports, and recommends. Automatically, in real time, for every student, every session.',
}

const C = { sage:'#4a7c59', sageL:'#7fb08f', navy:'#1a2e1f', mid:'#5a5a5a', cream:'#faf7f2', border:'#e8e2d9', amber:'#e8a838' }

export default function Features() {
  return (
    <>
      <Nav />
      {/* HERO */}
      <section style={{ background:`linear-gradient(135deg,#0d1e14 0%,#1d6e63 100%)`, padding:'5rem 1.5rem 4rem', color:'white', textAlign:'center' }}>
        <p style={{ fontSize:'0.78rem', textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(255,255,255,0.55)', marginBottom:'0.75rem' }}>The future of reading assessment</p>
        <h1 style={{ fontFamily:'Fraunces,serif', fontSize:'clamp(2rem,4.5vw,3.2rem)', fontWeight:900, marginBottom:'1rem', lineHeight:1.15 }}>
          Reading tests used to be<br />clipboards and plastic tubs.<br /><em style={{ fontStyle:'normal', color:C.sageL }}>This is what comes next.</em>
        </h1>
        <p style={{ color:'rgba(255,255,255,0.75)', fontSize:'1.05rem', maxWidth:560, margin:'0 auto 2rem' }}>
          AI reading intelligence that listens, scores, reports, and recommends — automatically, in real time, for every student, in every session.
        </p>
        <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
          <Link href="mailto:readingbuddies@outcome-ready.com?subject=Free+Trial" style={{ background:C.sage, color:'white', padding:'0.875rem 2rem', borderRadius:50, fontWeight:700, textDecoration:'none' }}>Start free — one class</Link>
          <Link href="/#compare" style={{ border:`2px solid rgba(255,255,255,0.4)`, color:'white', padding:'0.875rem 2rem', borderRadius:50, fontWeight:600, textDecoration:'none' }}>Start Premium — $59/mo</Link>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background:C.sage, padding:'1.5rem', display:'flex', flexWrap:'wrap', gap:'0', justifyContent:'center' }}>
        {[['16×','Book sets replaced'],['6 hrs','Saved per teacher per week'],['30s','To score a full session'],['100%','NDIS compliance rate']].map(([n,l]) => (
          <div key={n} style={{ textAlign:'center', padding:'0.75rem 2.5rem' }}>
            <div style={{ fontFamily:'Fraunces,serif', fontWeight:900, fontSize:'1.75rem', color:'white' }}>{n}</div>
            <div style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.75)' }}>{l}</div>
          </div>
        ))}
      </section>

      {/* BEFORE / AFTER */}
      <section style={{ padding:'5rem 1.5rem', background:C.cream }}>
        <div style={{ maxWidth:1060, margin:'0 auto' }}>
          <p style={{ fontSize:'0.78rem', textTransform:'uppercase', letterSpacing:'0.12em', color:C.sage, fontWeight:700, marginBottom:'0.75rem' }}>Reading assessment hasn't changed in 30 years. Until now.</p>
          <h2 style={{ fontFamily:'Fraunces,serif', fontSize:'clamp(1.6rem,3vw,2.2rem)', fontWeight:800, marginBottom:'3rem', color:C.navy }}>Plastic tubs. Paper records. Manual marking. Hours of docs.<br />Reading Buddy fixes all of it.</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'1.25rem' }}>
            {[
              { icon:'📦', before:'Plastic tubs of levelled readers — $3,000/series, static', after:'Unlimited digital library, AI-levelled, always current — included', label:'Readers' },
              { icon:'📝', before:'Paper running records and clipboards — manual, inconsistent', after:'Automated session capture, every metric scored instantly — zero admin', label:'Records' },
              { icon:'🗓', before:'Scheduled guided reading groups, teacher-led, limited', after:'Every session analysed, even independent reading — always on', label:'Sessions' },
              { icon:'📄', before:'Hand-written parent reports — 1-2 hrs/week, often skipped', after:'Plain-English snapshots auto-generated after every session — one click', label:'Reports' },
              { icon:'📋', before:'Manual NDIS progress notes — 2-4 hrs/week, inconsistent', after:'NDIS-aligned progress notes from every session — audit-ready', label:'NDIS' },
              { icon:'📊', before:'End-of-term reading data — retrospective, delayed', after:'Live growth charts against national benchmarks — real-time', label:'Data' },
            ].map(f => (
              <div key={f.label} style={{ background:'white', borderRadius:14, padding:'1.5rem', border:`1px solid ${C.border}` }}>
                <div style={{ fontSize:'1.75rem', marginBottom:'0.5rem' }}>{f.icon}</div>
                <div style={{ fontFamily:'Fraunces,serif', fontWeight:700, fontSize:'0.9rem', color:C.navy, marginBottom:'0.75rem' }}>{f.label}</div>
                <div style={{ fontSize:'0.82rem', color:'#c0392b', marginBottom:'0.5rem', lineHeight:1.5, paddingLeft:'1rem', borderLeft:'2px solid #e8c0b8' }}>Before: {f.before}</div>
                <div style={{ fontSize:'0.82rem', color:C.sage, lineHeight:1.5, paddingLeft:'1rem', borderLeft:`2px solid ${C.sageL}`, fontWeight:600 }}>With Reading Buddy: {f.after}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 REPORTS */}
      <section style={{ padding:'5rem 1.5rem', background:'white' }}>
        <div style={{ maxWidth:1060, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
            <p style={{ fontSize:'0.78rem', textTransform:'uppercase', letterSpacing:'0.12em', color:C.sage, fontWeight:700, marginBottom:'0.5rem' }}>Six reports from one session</p>
            <h2 style={{ fontFamily:'Fraunces,serif', fontSize:'clamp(1.6rem,3vw,2.2rem)', fontWeight:800, color:C.navy }}>All automatic. All from one reading.</h2>
            <p style={{ color:C.mid, maxWidth:500, margin:'0.75rem auto 0', lineHeight:1.65 }}>No templates, no copy-paste. Every time a student reads, six reports appear simultaneously.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'1.25rem' }}>
            {[
              { icon:'🤖', title:'Session Summary', desc:'WPM, accuracy, prosody, reading age estimate, and intervention flags.', accent:'#4a7c59' },
              { icon:'📈', title:'Growth Trajectory', desc:'Month-over-month growth vs national benchmarks. PDF exportable.', accent:'#2980b9' },
              { icon:'📋', title:'NDIS Progress Note', desc:'Goal-referenced, Practice Standards aligned, timestamped.', accent:'#8e44ad' },
              { icon:'👨‍👩‍👧', title:'Parent Snapshot', desc:'Plain-English. What they worked on, how they\'re going, what to practise.', accent:'#e67e22' },
              { icon:'🏫', title:'Class Health Report', desc:'Every student: on track, needs a push, or urgent intervention.', accent:'#c0392b' },
              { icon:'📚', title:'Book Recommendations', desc:'AI-matched to level, history, interests. Your custom library included.', accent:'#16a085' },
            ].map(r => (
              <div key={r.title} style={{ background:C.cream, borderRadius:14, padding:'1.5rem', borderTop:`3px solid ${r.accent}` }}>
                <div style={{ fontSize:'1.75rem', marginBottom:'0.5rem' }}>{r.icon}</div>
                <h4 style={{ fontFamily:'Fraunces,serif', fontWeight:800, fontSize:'0.95rem', color:C.navy, marginBottom:'0.4rem' }}>{r.title}</h4>
                <p style={{ fontSize:'0.82rem', color:C.mid, lineHeight:1.65, margin:0 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMISABLE BOOKS */}
      <section style={{ padding:'5rem 1.5rem', background:'linear-gradient(135deg,#f0f8f3,#e8f5ee)', borderTop:`2px solid ${C.sageL}` }}>
        <div style={{ maxWidth:1060, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'3rem', alignItems:'center' }}>
            <div>
              <p style={{ fontSize:'0.78rem', textTransform:'uppercase', letterSpacing:'0.12em', color:C.sage, fontWeight:700, marginBottom:'0.75rem' }}>Key differentiator</p>
              <h2 style={{ fontFamily:'Fraunces,serif', fontSize:'clamp(1.5rem,3vw,2rem)', fontWeight:800, color:C.navy, marginBottom:'1rem' }}>Books customised to every child, class, and curriculum.</h2>
              <p style={{ color:C.mid, lineHeight:1.75, marginBottom:'1rem' }}>Every competitor locks you into their book series. Reading Buddy doesn't. Upload your own texts, align to PM Readers, Oxford, or your school's reading program. Map books to NDIS goals. Customise per class or per individual child.</p>
              <Link href="mailto:readingbuddies@outcome-ready.com?subject=Custom+Books" style={{ display:'inline-block', background:C.sage, color:'white', padding:'0.75rem 1.75rem', borderRadius:50, fontWeight:700, textDecoration:'none', fontSize:'0.9rem' }}>See how it works →</Link>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
              {[
                ['📖','Your texts','Upload PDFs, docs, or URLs'],
                ['🎯','Per-child','Books matched to individual goals'],
                ['🏫','Per-class','Each teacher builds their library'],
                ['🇦🇺','Curriculum-mapped','Australian Curriculum outcomes'],
                ['🎗','NDIS-aligned','Goal-referenced custom content'],
                ['📊','Fully tracked','Same scoring on any text'],
              ].map(([icon,t,d]) => (
                <div key={t} style={{ background:'white', borderRadius:10, padding:'0.875rem', border:`1px solid ${C.border}` }}>
                  <div style={{ fontSize:'1.2rem', marginBottom:'0.25rem' }}>{icon}</div>
                  <div style={{ fontWeight:700, fontSize:'0.82rem', color:C.navy, marginBottom:'0.15rem' }}>{t}</div>
                  <div style={{ fontSize:'0.75rem', color:C.mid }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:C.navy, padding:'4rem 1.5rem', textAlign:'center', color:'white' }}>
        <h2 style={{ fontFamily:'Fraunces,serif', fontSize:'clamp(1.6rem,3vw,2.2rem)', fontWeight:800, marginBottom:'1rem' }}>Start free. Upgrade when it pays for itself.</h2>
        <p style={{ color:'rgba(255,255,255,0.75)', marginBottom:'2rem', maxWidth:480, margin:'0 auto 2rem' }}>Try one classroom free. The time saved on reporting alone covers the upgrade.</p>
        <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
          <Link href="mailto:readingbuddies@outcome-ready.com?subject=Free+Trial" style={{ background:C.sage, color:'white', padding:'0.9rem 2rem', borderRadius:50, fontWeight:700, textDecoration:'none' }}>Start free — one classroom</Link>
          <Link href="/contact" style={{ border:'2px solid rgba(255,255,255,0.4)', color:'white', padding:'0.9rem 2rem', borderRadius:50, fontWeight:600, textDecoration:'none' }}>Talk to Sales</Link>
        </div>
      </section>
    </>
  )
}
