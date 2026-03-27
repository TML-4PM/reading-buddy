'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'

const C = { sage:'#4a7c59', sageL:'#7fb08f', navy:'#1a2e1f', mid:'#5a5a5a', cream:'#faf7f2', border:'#e8e2d9' }

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', org:'', role:'', plan:'', message:'' })
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      await new Promise(r => setTimeout(r, 800))
      setStatus('success')
    } catch { setStatus('error') }
  }

  const input = { width:'100%', padding:'0.75rem 1rem', border:`1.5px solid ${C.border}`, borderRadius:10, fontSize:'0.9rem', fontFamily:'DM Sans,sans-serif', outline:'none', boxSizing:'border-box' as const }

  return (
    <>
      <Nav />
      <section style={{ background:`linear-gradient(135deg,#0d1e14,#1d6e63)`, padding:'5rem 1.5rem 4rem', color:'white', textAlign:'center' }}>
        <h1 style={{ fontFamily:'Fraunces,serif', fontSize:'clamp(2rem,4vw,2.8rem)', fontWeight:900, marginBottom:'1rem' }}>Talk to our team</h1>
        <p style={{ color:'rgba(255,255,255,0.75)', fontSize:'1.05rem', maxWidth:480, margin:'0 auto' }}>We'll put together a proposal that fits your school or organisation.</p>
      </section>

      <section style={{ padding:'5rem 1.5rem', background:C.cream }}>
        <div style={{ maxWidth:640, margin:'0 auto' }}>
          {status==='success' ? (
            <div style={{ background:'white', borderRadius:16, padding:'4rem 2rem', textAlign:'center', border:`1px solid ${C.border}` }}>
              <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>✅</div>
              <h2 style={{ fontFamily:'Fraunces,serif', fontWeight:800, color:C.navy, marginBottom:'0.5rem' }}>Message received</h2>
              <p style={{ color:C.mid }}>We'll be in touch within one business day.</p>
            </div>
          ) : (
            <div style={{ background:'white', borderRadius:16, padding:'2.5rem', border:`1px solid ${C.border}` }}>
              <form onSubmit={submit} style={{ display:'grid', gap:'1rem' }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                  <div>
                    <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:C.navy, marginBottom:'0.4rem', textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>Full name *</label>
                    <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={input} placeholder="Jane Smith"/>
                  </div>
                  <div>
                    <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:C.navy, marginBottom:'0.4rem', textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>Email *</label>
                    <input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={input} placeholder="jane@school.edu.au"/>
                  </div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                  <div>
                    <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:C.navy, marginBottom:'0.4rem', textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>School / Organisation</label>
                    <input value={form.org} onChange={e=>setForm({...form,org:e.target.value})} style={input} placeholder="Northside Primary"/>
                  </div>
                  <div>
                    <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:C.navy, marginBottom:'0.4rem', textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>Your role</label>
                    <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})} style={input}>
                      <option value="">Select…</option>
                      <option>Principal</option>
                      <option>Assistant Principal</option>
                      <option>IT / Technology Lead</option>
                      <option>Learning Support Coordinator</option>
                      <option>NDIS Provider / Manager</option>
                      <option>District / System Administrator</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:C.navy, marginBottom:'0.4rem', textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>I'm interested in</label>
                  <select value={form.plan} onChange={e=>setForm({...form,plan:e.target.value})} style={input}>
                    <option value="">Select…</option>
                    <option value="free">Free trial — one classroom</option>
                    <option value="premium">Premium Classroom ($59/mo)</option>
                    <option value="school">School Plan ($5,900/yr)</option>
                    <option value="enterprise">Enterprise ($35k+)</option>
                    <option value="ndis">NDIS provider plan</option>
                    <option value="demo">Product demo</option>
                  </select>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:C.navy, marginBottom:'0.4rem', textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>How can we help?</label>
                  <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows={4} style={{...input, resize:'vertical' as const}} placeholder="Tell us about your school, your current reading program, and what you're hoping Reading Buddy can help with."/>
                </div>
                <button type="submit" disabled={status==='loading'} style={{ background:C.sage, color:'white', padding:'1rem', borderRadius:50, fontWeight:700, fontSize:'1rem', border:'none', cursor:'pointer', opacity:status==='loading' ? 0.7 : 1, fontFamily:'DM Sans,sans-serif' }}>
                  {status==='loading' ? 'Sending…' : 'Send message →'}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
