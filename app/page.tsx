"use client"
import { useState } from 'react'
import './page.css'

// Unsplash photo IDs — free, high quality, relevant
const IMGS = {
  // Kids reading
  kidReading1: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80&auto=format',
  kidReading2: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80&auto=format',
  kidReading3: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80&auto=format',
  // Teachers
  teacher1: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80&auto=format',
  teacher2: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80&auto=format',
  // Classroom
  classroom: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80&auto=format',
  // NDIS / clinic
  clinic: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80&auto=format',
  // Home reading
  homeReading: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800&q=80&auto=format',
  // Droid from repo
  droid: 'https://lzfgigiyqpuuxslsygjt.supabase.co/storage/v1/object/public/images/AHC%20droid%20head.webp',
  sceneClassroom: '/scene-classroom.png',
  sceneNdis: '/scene-ndis.png',
  scenePrincipal: '/scene-principal.png',
  sceneHome: '/scene-home.png',
}

// Mini chart component
function AccuracyChart() {
  const data = [
    { month: 'Aug', wpm: 42, acc: 71 },
    { month: 'Sep', wpm: 58, acc: 78 },
    { month: 'Oct', wpm: 74, acc: 83 },
    { month: 'Nov', wpm: 89, acc: 88 },
    { month: 'Dec', wpm: 103, acc: 92 },
    { month: 'Jan', wpm: 118, acc: 95 },
  ]
  const maxWpm = 130
  return (
    <div style={{ background: '#fff', borderRadius: 16, padding: '20px 24px', boxShadow: '0 4px 24px rgba(29,110,99,0.10)', border: '1.5px solid #DDE8E7' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '0.9rem', color: 'var(--navy)' }}>Reading Growth</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: 2 }}>Emma, Year 3 · Semester 1–2</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '1.6rem', color: 'var(--teal)' }}>118</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>WPM current</div>
        </div>
      </div>
      {/* Bar chart */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 80, marginBottom: 8 }}>
        {data.map((d, i) => (
          <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ width: '100%', height: Math.round((d.wpm / maxWpm) * 72), background: i === data.length - 1 ? 'var(--teal)' : 'var(--teal-light)', borderRadius: '4px 4px 0 0', transition: 'height 0.3s' }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {data.map(d => (
          <div key={d.month} style={{ flex: 1, textAlign: 'center', fontSize: '0.65rem', color: 'var(--muted)', fontFamily: 'var(--font-head)', fontWeight: 600 }}>{d.month}</div>
        ))}
      </div>
      {/* Accuracy line */}
      <div style={{ marginTop: 12, display: 'flex', gap: 6, alignItems: 'center' }}>
        <div style={{ width: 24, height: 3, background: 'var(--amber)', borderRadius: 2 }} />
        <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>Accuracy: 71% → 95%</span>
        <span style={{ marginLeft: 'auto', fontSize: '0.72rem', fontFamily: 'var(--font-head)', fontWeight: 700, color: 'var(--teal)' }}>↑ +24%</span>
      </div>
    </div>
  )
}

function ClassHealthChart() {
  const students = [
    { name: 'Emma', level: 95, status: 'on-track' },
    { name: 'Liam', level: 88, status: 'on-track' },
    { name: 'Aisha', level: 72, status: 'watch' },
    { name: 'Noah', level: 61, status: 'alert' },
    { name: 'Zoe', level: 91, status: 'on-track' },
    { name: 'Kai', level: 55, status: 'alert' },
  ]
  const color = (s: string) => s === 'on-track' ? 'var(--teal)' : s === 'watch' ? 'var(--amber)' : '#E8534A'
  return (
    <div style={{ background: '#fff', borderRadius: 16, padding: '20px 24px', boxShadow: '0 4px 24px rgba(29,110,99,0.10)', border: '1.5px solid #DDE8E7' }}>
      <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '0.9rem', color: 'var(--navy)', marginBottom: 4 }}>Class Health — Year 3B</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: 14 }}>Live · Ms Thompson · 26 students</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {students.map(s => (
          <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 52, fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: '0.78rem', color: 'var(--navy)' }}>{s.name}</div>
            <div style={{ flex: 1, height: 8, background: '#F0F0F0', borderRadius: 40, overflow: 'hidden' }}>
              <div style={{ width: `${s.level}%`, height: '100%', background: color(s.status), borderRadius: 40 }} />
            </div>
            <div style={{ width: 28, fontSize: '0.7rem', fontFamily: 'var(--font-head)', fontWeight: 700, color: color(s.status), textAlign: 'right' }}>{s.level}%</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, display: 'flex', gap: 12 }}>
        {[['on-track','On Track','var(--teal)'],['watch','Watch','var(--amber)'],['alert','Alert','#E8534A']].map(([k,l,c]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
            <span style={{ fontSize: '0.68rem', color: 'var(--muted)' }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Reading Buddies buddy SVGs ──────────────────────────────────────────────
const BUDDY_SVGS: Record<string, string> = {
  spark: `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><rect width="72" height="72" fill="#FFF3DC"/><ellipse cx="36" cy="54" rx="18" ry="14" fill="#E8762B"/><circle cx="36" cy="32" r="18" fill="#E8762B"/><polygon points="20,20 14,8 28,18" fill="#E8762B"/><polygon points="52,20 58,8 44,18" fill="#E8762B"/><polygon points="21,19 15,10 27,18" fill="#F5A07A"/><polygon points="51,19 57,10 45,18" fill="#F5A07A"/><ellipse cx="36" cy="36" rx="11" ry="9" fill="#FDE8C8"/><circle cx="30" cy="29" r="3" fill="white"/><circle cx="42" cy="29" r="3" fill="white"/><circle cx="31" cy="29" r="1.5" fill="#1A2340"/><circle cx="43" cy="29" r="1.5" fill="#1A2340"/><circle cx="31.5" cy="28.5" r="0.6" fill="white"/><circle cx="43.5" cy="28.5" r="0.6" fill="white"/><ellipse cx="36" cy="35" rx="2.5" ry="1.8" fill="#1A2340"/><path d="M32 38 Q36 42 40 38" stroke="#1A2340" stroke-width="1.2" fill="none" stroke-linecap="round"/><circle cx="25" cy="34" r="3.5" fill="#F5A07A" opacity="0.5"/><circle cx="47" cy="34" r="3.5" fill="#F5A07A" opacity="0.5"/></svg>`,
  luna: `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><rect width="72" height="72" fill="#EAF5FF"/><ellipse cx="36" cy="30" rx="20" ry="18" fill="#8B7EC8"/><path d="M20 44 Q14 52 18 60 Q22 52 24 46" fill="#8B7EC8"/><path d="M27 48 Q24 58 28 64 Q30 54 30 48" fill="#8B7EC8"/><path d="M36 50 Q36 60 36 66 Q38 58 38 50" fill="#8B7EC8"/><path d="M45 48 Q48 58 44 64 Q44 54 42 48" fill="#8B7EC8"/><path d="M52 44 Q58 52 54 60 Q50 52 48 46" fill="#8B7EC8"/><ellipse cx="36" cy="32" rx="13" ry="11" fill="#BEB3E8"/><circle cx="29" cy="26" r="4" fill="white"/><circle cx="43" cy="26" r="4" fill="white"/><circle cx="30" cy="26" r="2" fill="#1A2340"/><circle cx="44" cy="26" r="2" fill="#1A2340"/><circle cx="30.7" cy="25.3" r="0.8" fill="white"/><circle cx="44.7" cy="25.3" r="0.8" fill="white"/><path d="M30 35 Q36 40 42 35" stroke="#1A2340" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>`,
  pip: `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><rect width="72" height="72" fill="#F0F8E8"/><ellipse cx="36" cy="54" rx="16" ry="13" fill="#C4904A"/><circle cx="36" cy="32" r="18" fill="#C4904A"/><circle cx="20" cy="18" r="7" fill="#C4904A"/><circle cx="52" cy="18" r="7" fill="#C4904A"/><circle cx="20" cy="18" r="4" fill="#E8B070"/><circle cx="52" cy="18" r="4" fill="#E8B070"/><ellipse cx="36" cy="37" rx="10" ry="7" fill="#E8B070"/><circle cx="29" cy="29" r="3.5" fill="white"/><circle cx="43" cy="29" r="3.5" fill="white"/><circle cx="30" cy="29" r="1.8" fill="#1A2340"/><circle cx="44" cy="29" r="1.8" fill="#1A2340"/><circle cx="30.7" cy="28.3" r="0.7" fill="white"/><circle cx="44.7" cy="28.3" r="0.7" fill="white"/><ellipse cx="36" cy="34" rx="2.5" ry="2" fill="#1A2340"/><path d="M31 39 Q36 43 41 39" stroke="#1A2340" stroke-width="1.2" fill="none" stroke-linecap="round"/><circle cx="24" cy="36" r="4" fill="#D4704A" opacity="0.35"/><circle cx="48" cy="36" r="4" fill="#D4704A" opacity="0.35"/></svg>`,
  nova: `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><rect width="72" height="72" fill="#FFF0F8"/><ellipse cx="22" cy="30" rx="15" ry="18" fill="#F06090" opacity="0.85" transform="rotate(-20,22,30)"/><ellipse cx="50" cy="30" rx="15" ry="18" fill="#F06090" opacity="0.85" transform="rotate(20,50,30)"/><ellipse cx="20" cy="46" rx="11" ry="12" fill="#C040A0" opacity="0.7" transform="rotate(15,20,46)"/><ellipse cx="52" cy="46" rx="11" ry="12" fill="#C040A0" opacity="0.7" transform="rotate(-15,52,46)"/><circle cx="22" cy="26" r="5" fill="white" opacity="0.6"/><circle cx="50" cy="26" r="5" fill="white" opacity="0.6"/><ellipse cx="36" cy="36" rx="5" ry="14" fill="#7A3090"/><circle cx="36" cy="20" r="7" fill="#7A3090"/><circle cx="33" cy="18" r="2.5" fill="white"/><circle cx="39" cy="18" r="2.5" fill="white"/><circle cx="33.5" cy="18" r="1.2" fill="#1A2340"/><circle cx="39.5" cy="18" r="1.2" fill="#1A2340"/><path d="M32 23 Q36 27 40 23" stroke="#1A2340" stroke-width="1" fill="none" stroke-linecap="round"/><path d="M33 14 Q28 8 25 5" stroke="#7A3090" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M39 14 Q44 8 47 5" stroke="#7A3090" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="25" cy="5" r="2" fill="#F06090"/><circle cx="47" cy="5" r="2" fill="#F06090"/></svg>`,
}

// ── Book cover SVGs ─────────────────────────────────────────────────────────
function coverSVG(key: string, bg: string): string {
  const covers: Record<string, string> = {
    cat: `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="130" fill="${bg}"/><rect width="200" height="70" fill="#87CEEB" opacity="0.4"/><rect x="20" y="90" width="160" height="16" rx="4" fill="#E8763C" opacity="0.8"/><ellipse cx="100" cy="82" rx="22" ry="16" fill="#F5A623"/><circle cx="100" cy="60" r="18" fill="#F5A623"/><polygon points="86,48 82,36 94,46" fill="#F5A623"/><polygon points="114,48 118,36 106,46" fill="#F5A623"/><polygon points="87,47 84,38 93,45" fill="#FFD0B0"/><polygon points="113,47 116,38 107,45" fill="#FFD0B0"/><ellipse cx="100" cy="36" rx="11" ry="9" fill="#FDE8C8"/><circle cx="94" cy="57" r="4" fill="white"/><circle cx="106" cy="57" r="4" fill="white"/><circle cx="95" cy="57" r="2" fill="#1A2340"/><circle cx="107" cy="57" r="2" fill="#1A2340"/><circle cx="95.7" cy="56.3" r="0.8" fill="white"/><circle cx="107.7" cy="56.3" r="0.8" fill="white"/><ellipse cx="100" cy="64" rx="1.5" ry="1.2" fill="#1A2340"/><path d="M95 67 Q100 71 105 67" stroke="#1A2340" stroke-width="1" fill="none" stroke-linecap="round"/><line x1="80" y1="63" x2="95" y2="64" stroke="#1A2340" stroke-width="0.8" opacity="0.6"/><line x1="80" y1="66" x2="95" y2="65" stroke="#1A2340" stroke-width="0.8" opacity="0.6"/><line x1="120" y1="63" x2="105" y2="64" stroke="#1A2340" stroke-width="0.8" opacity="0.6"/><line x1="120" y1="66" x2="105" y2="65" stroke="#1A2340" stroke-width="0.8" opacity="0.6"/><path d="M122 82 Q140 70 136 55" stroke="#F5A623" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="28" cy="20" r="10" fill="#FFD700" opacity="0.9"/></svg>`,
    bee: `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="130" fill="${bg}"/><rect width="200" height="60" fill="#87CEEB" opacity="0.5"/><circle cx="30" cy="105" r="12" fill="#FFB3C6"/><circle cx="30" cy="93" r="6" fill="#FFD700"/><circle cx="170" cy="108" r="10" fill="#FFB3C6"/><circle cx="170" cy="97" r="5" fill="#FFD700"/><rect x="0" y="112" width="200" height="18" rx="2" fill="#6DBF67"/><ellipse cx="100" cy="65" rx="26" ry="18" fill="#FFD700"/><rect x="80" y="56" width="10" height="18" rx="2" fill="#1A2340" opacity="0.7"/><rect x="96" y="56" width="10" height="18" rx="2" fill="#1A2340" opacity="0.7"/><rect x="112" y="56" width="10" height="18" rx="2" fill="#1A2340" opacity="0.7"/><ellipse cx="90" cy="52" rx="18" ry="12" fill="white" opacity="0.75" transform="rotate(-20,90,52)"/><ellipse cx="110" cy="52" rx="18" ry="12" fill="white" opacity="0.75" transform="rotate(20,110,52)"/><circle cx="124" cy="65" r="14" fill="#FFD700"/><circle cx="120" cy="61" r="3.5" fill="white"/><circle cx="129" cy="61" r="3.5" fill="white"/><circle cx="120.5" cy="61" r="1.8" fill="#1A2340"/><circle cx="129.5" cy="61" r="1.8" fill="#1A2340"/><path d="M118 67 Q124 72 130 67" stroke="#1A2340" stroke-width="1.2" fill="none" stroke-linecap="round"/><polygon points="74,60 74,70 66,65" fill="#E8762B"/></svg>`,
    duck: `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="130" fill="${bg}"/><rect width="200" height="65" fill="#87CEEB" opacity="0.5"/><ellipse cx="100" cy="110" rx="60" ry="10" fill="#5BB8D4" opacity="0.4"/><ellipse cx="100" cy="112" rx="35" ry="13" fill="#66BB6A"/><ellipse cx="96" cy="88" rx="30" ry="22" fill="#F5C842"/><ellipse cx="92" cy="90" rx="18" ry="12" fill="#E8A820" opacity="0.6"/><rect x="110" y="68" width="16" height="22" rx="8" fill="#F5C842"/><circle cx="120" cy="62" r="16" fill="#2E7D32"/><ellipse cx="136" cy="64" rx="9" ry="5" fill="#FF8C00"/><line x1="127" y1="64" x2="145" y2="64" stroke="#CC6600" stroke-width="1"/><circle cx="124" cy="59" r="4" fill="white"/><circle cx="125" cy="59" r="2" fill="#1A2340"/><circle cx="125.7" cy="58.3" r="0.8" fill="white"/><ellipse cx="80" cy="108" rx="12" ry="5" fill="#FF8C00" opacity="0.9"/><ellipse cx="104" cy="109" rx="12" ry="5" fill="#FF8C00" opacity="0.9"/></svg>`,
    frog: `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="130" fill="${bg}"/><ellipse cx="100" cy="118" rx="90" ry="16" fill="#5BB8D4" opacity="0.4"/><ellipse cx="100" cy="112" rx="35" ry="13" fill="#66BB6A"/><ellipse cx="100" cy="88" rx="30" ry="22" fill="#4CAF50"/><ellipse cx="68" cy="100" rx="14" ry="8" fill="#4CAF50" transform="rotate(-20,68,100)"/><ellipse cx="132" cy="100" rx="14" ry="8" fill="#4CAF50" transform="rotate(20,132,100)"/><circle cx="100" cy="68" r="22" fill="#4CAF50"/><circle cx="87" cy="54" r="10" fill="#81C784"/><circle cx="113" cy="54" r="10" fill="#81C784"/><circle cx="87" cy="54" r="6" fill="white"/><circle cx="113" cy="54" r="6" fill="white"/><circle cx="88" cy="54" r="3.5" fill="#1A2340"/><circle cx="114" cy="54" r="3.5" fill="#1A2340"/><circle cx="89" cy="53" r="1.2" fill="white"/><circle cx="115" cy="53" r="1.2" fill="white"/><path d="M80 72 Q100 84 120 72" stroke="#1A2340" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
    robot: `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="130" fill="${bg}"/><rect x="0" y="100" width="200" height="30" fill="#E8E8F0" opacity="0.5"/><rect x="70" y="65" width="60" height="50" rx="8" fill="#5BB8D4"/><rect x="80" y="75" width="40" height="28" rx="4" fill="#3A9AB8"/><circle cx="90" cy="84" r="4" fill="#FF6B6B"/><circle cx="100" cy="84" r="4" fill="#FFD700"/><circle cx="110" cy="84" r="4" fill="#6BFF6B"/><rect x="83" y="90" width="34" height="10" rx="3" fill="#1A2340" opacity="0.8"/><rect x="42" y="68" width="28" height="12" rx="6" fill="#5BB8D4"/><rect x="130" y="68" width="28" height="12" rx="6" fill="#5BB8D4"/><rect x="68" y="30" width="64" height="38" rx="12" fill="#5BB8D4"/><rect x="98" y="18" width="4" height="14" rx="2" fill="#3A9AB8"/><circle cx="100" cy="16" r="5" fill="#FF6B6B"/><rect x="78" y="38" width="18" height="14" rx="4" fill="#1A2340"/><rect x="104" y="38" width="18" height="14" rx="4" fill="#1A2340"/><rect x="80" y="40" width="14" height="10" rx="3" fill="#00BFFF" opacity="0.9"/><rect x="106" y="40" width="14" height="10" rx="3" fill="#00BFFF" opacity="0.9"/><circle cx="87" cy="45" r="3" fill="white" opacity="0.7"/><circle cx="113" cy="45" r="3" fill="white" opacity="0.7"/><rect x="84" y="58" width="32" height="6" rx="3" fill="#3A9AB8"/></svg>`,
    dino: `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="130" fill="${bg}"/><rect x="0" y="108" width="200" height="22" fill="#6DBF67" opacity="0.6"/><ellipse cx="90" cy="88" rx="42" ry="26" fill="#66BB6A"/><ellipse cx="90" cy="90" rx="28" ry="18" fill="#A5D6A7" opacity="0.7"/><rect x="110" y="58" width="22" height="34" rx="11" fill="#66BB6A"/><ellipse cx="128" cy="52" rx="26" ry="18" fill="#66BB6A"/><ellipse cx="150" cy="54" rx="12" ry="8" fill="#4CAF50"/><circle cx="132" cy="46" r="6" fill="white"/><circle cx="133" cy="46" r="3.5" fill="#1A2340"/><circle cx="134" cy="45" r="1.2" fill="white"/><polygon points="100,62 104,52 108,62" fill="#4CAF50"/><polygon points="112,56 116,46 120,56" fill="#4CAF50"/><polygon points="124,50 128,40 132,50" fill="#4CAF50"/><rect x="58" y="110" width="18" height="18" rx="6" fill="#78909C"/><rect x="80" y="112" width="18" height="16" rx="6" fill="#4CAF50"/><rect x="102" y="112" width="18" height="16" rx="6" fill="#4CAF50"/><circle cx="24" cy="22" r="12" fill="#FFD700" opacity="0.85"/></svg>`,
    wave: `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="130" fill="${bg}"/><rect width="200" height="60" fill="#87CEEB" opacity="0.5"/><circle cx="160" cy="22" r="14" fill="#FFD700" opacity="0.9"/><path d="M0 75 Q25 65 50 75 Q75 85 100 75 Q125 65 150 75 Q175 85 200 75 L200 130 L0 130 Z" fill="#1E88E5" opacity="0.8"/><path d="M0 88 Q25 78 50 88 Q75 98 100 88 Q125 78 150 88 Q175 98 200 88 L200 130 L0 130 Z" fill="#1565C0" opacity="0.7"/><ellipse cx="100" cy="72" rx="36" ry="9" fill="#FF6B35" transform="rotate(-8,100,72)"/><ellipse cx="104" cy="63" rx="9" ry="11" fill="#FFB74D"/><circle cx="104" cy="50" r="10" fill="#FFDAB9"/><circle cx="100" cy="49" r="2" fill="#1A2340"/><circle cx="108" cy="49" r="2" fill="#1A2340"/><path d="M100 54 Q104 57 108 54" stroke="#1A2340" stroke-width="1" fill="none" stroke-linecap="round"/></svg>`,
    space: `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="130" fill="${bg}"/><rect width="200" height="130" fill="#0D1B4B" opacity="0.85"/><circle cx="20" cy="15" r="1.5" fill="white" opacity="0.9"/><circle cx="80" cy="20" r="1.5" fill="white" opacity="0.9"/><circle cx="160" cy="22" r="2" fill="white" opacity="0.9"/><circle cx="10" cy="90" r="1.5" fill="white" opacity="0.8"/><circle cx="160" cy="45" r="20" fill="#8B7EC8"/><ellipse cx="160" cy="45" rx="30" ry="8" fill="#C4B8F0" opacity="0.5"/><rect x="85" y="40" width="30" height="55" rx="6" fill="#E8E8F0"/><polygon points="85,40 115,40 100,18" fill="#FF6B6B"/><circle cx="100" cy="55" r="10" fill="#87CEEB"/><circle cx="100" cy="55" r="7" fill="#5BB8D4"/><circle cx="100" cy="53" r="5" fill="#FFDAB9"/><circle cx="98" cy="51.5" r="1.2" fill="#1A2340"/><circle cx="102" cy="51.5" r="1.2" fill="#1A2340"/><polygon points="85,75 72,88 85,88" fill="#FF6B6B"/><polygon points="115,75 128,88 115,88" fill="#FF6B6B"/><path d="M88 95 Q100 115 112 95 Q106 108 100 120 Q94 108 88 95Z" fill="#FF8C00" opacity="0.9"/></svg>`,
    elephant: `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="130" fill="${bg}"/><rect x="0" y="108" width="200" height="22" fill="#A5D6A7" opacity="0.5"/><ellipse cx="94" cy="88" rx="46" ry="32" fill="#90A4AE"/><ellipse cx="54" cy="76" rx="22" ry="26" fill="#78909C"/><ellipse cx="57" cy="78" rx="14" ry="18" fill="#FFCDD2" opacity="0.6"/><circle cx="78" cy="72" r="32" fill="#90A4AE"/><circle cx="63" cy="64" r="6" fill="white"/><circle cx="64" cy="64" r="3.5" fill="#1A2340"/><circle cx="64.8" cy="63.2" r="1.2" fill="white"/><path d="M62 82 Q50 95 55 112 Q60 118 65 110 Q62 98 70 88" fill="#90A4AE"/><path d="M68 84 Q58 92 54 100" stroke="#FFF9C4" stroke-width="4" fill="none" stroke-linecap="round"/><rect x="58" y="110" width="18" height="18" rx="6" fill="#78909C"/><rect x="80" y="112" width="18" height="16" rx="6" fill="#78909C"/><rect x="102" y="112" width="18" height="16" rx="6" fill="#78909C"/><rect x="122" y="110" width="18" height="18" rx="6" fill="#78909C"/><circle cx="175" cy="18" r="12" fill="#FFD700" opacity="0.85"/></svg>`,
  }
  return covers[key] || covers['cat']
}

// ── Book data ────────────────────────────────────────────────────────────────
interface BookEntry { title: string; level: string; levelColor: string; bg: string; coverKey: string; featured?: boolean }
type LevelMap = Record<string, BookEntry[]>
type BookMap  = Record<string, LevelMap>

const RB_BOOKS: BookMap = {
  phonics: {
    prep: [
      { title:'Cat Sat on a Mat',  level:'Level 1', levelColor:'#F0714A', bg:'#FFF0ED', coverKey:'cat',  featured:false },
      { title:'The Big Bad Bug',   level:'Level 1', levelColor:'#F5A623', bg:'#FFFBEA', coverKey:'bee',  featured:false },
      { title:'Duck in the Mud',   level:'Level 2', levelColor:'#4CAF50', bg:'#F0FFF0', coverKey:'duck', featured:true  },
      { title:'Hop, Frog, Hop!',   level:'Level 1', levelColor:'#5BB8D4', bg:'#EDF9FF', coverKey:'frog', featured:false },
    ],
    y1: [
      { title:'The Ship Trip',     level:'Level 3', levelColor:'#5BB8D4', bg:'#EDF9FF', coverKey:'wave',  featured:false },
      { title:'Shout it Out!',     level:'Level 4', levelColor:'#2BB5A0', bg:'#E8FBF8', coverKey:'robot', featured:true  },
      { title:'Night Light Flight',level:'Level 3', levelColor:'#8B7EC8', bg:'#F2EEFF', coverKey:'space', featured:false },
      { title:'Climbing Higher',   level:'Level 4', levelColor:'#FF9800', bg:'#FFF8EC', coverKey:'frog',  featured:false },
    ],
    y2: [
      { title:'Space Explorer',    level:'Level 5', levelColor:'#8B7EC8', bg:'#F2EEFF', coverKey:'space', featured:true  },
      { title:'Dinosaur Dreams',   level:'Level 5', levelColor:'#4CAF50', bg:'#F0FFF0', coverKey:'dino',  featured:false },
      { title:'The Eruption',      level:'Level 6', levelColor:'#F0714A', bg:'#FFF0ED', coverKey:'wave',  featured:false },
      { title:'Deep Sea Dash',     level:'Level 6', levelColor:'#5BB8D4', bg:'#EDF9FF', coverKey:'robot', featured:false },
    ],
  },
  stories: {
    prep: [
      { title:'My Magic Garden',   level:'Level 1', levelColor:'#4CAF50', bg:'#F0FFF0', coverKey:'frog',  featured:true  },
      { title:'Rainbow Pony',      level:'Level 1', levelColor:'#E91E8C', bg:'#FFF0F8', coverKey:'dino',  featured:false },
      { title:'Pizza for Pets',    level:'Level 2', levelColor:'#FF9800', bg:'#FFF8EC', coverKey:'robot', featured:false },
      { title:'The Big Show',      level:'Level 2', levelColor:'#8B7EC8', bg:'#F2EEFF', coverKey:'cat',   featured:false },
    ],
    y1: [
      { title:'Robot Best Friend', level:'Level 3', levelColor:'#5BB8D4', bg:'#EDF9FF', coverKey:'robot', featured:true  },
      { title:'Lost on an Island', level:'Level 3', levelColor:'#4CAF50', bg:'#F0FFF0', coverKey:'wave',  featured:false },
      { title:'Super Granny',      level:'Level 4', levelColor:'#F0714A', bg:'#FFF0ED', coverKey:'dino',  featured:false },
      { title:'The Friendly Dragon',level:'Level 4',levelColor:'#F5A623', bg:'#FFFBEA', coverKey:'space', featured:false },
    ],
    y2: [
      { title:'Around the World',  level:'Level 5', levelColor:'#5BB8D4', bg:'#EDF9FF', coverKey:'dino',  featured:true  },
      { title:'The Mystery Mask',  level:'Level 5', levelColor:'#8B7EC8', bg:'#F2EEFF', coverKey:'space', featured:false },
      { title:'The Last Kick',     level:'Level 6', levelColor:'#4CAF50', bg:'#F0FFF0', coverKey:'robot', featured:false },
      { title:'Rock Star Kid',     level:'Level 6', levelColor:'#F5A623', bg:'#FFFBEA', coverKey:'wave',  featured:false },
    ],
  },
  rhymes: {
    prep: [
      { title:'Rain Rain Come Again',level:'Level 1',levelColor:'#5BB8D4',bg:'#EDF9FF',coverKey:'duck',featured:true  },
      { title:'Twinkle Twinkle AI', level:'Level 1',levelColor:'#F5A623',bg:'#FFFBEA',coverKey:'cat',  featured:false },
      { title:'Baa Baa Smart Sheep',level:'Level 1',levelColor:'#F0714A',bg:'#FFF0ED',coverKey:'bee',  featured:false },
      { title:'The Silly Song',     level:'Level 2',levelColor:'#4CAF50',bg:'#F0FFF0',coverKey:'frog', featured:false },
    ],
    y1: [
      { title:"Rhyme Time Monsters",level:'Level 3',levelColor:'#FF9800',bg:'#FFF8EC',coverKey:'frog', featured:true  },
      { title:'Flowers in Rhyme',   level:'Level 3',levelColor:'#E91E8C',bg:'#FFF0F8',coverKey:'wave', featured:false },
      { title:"The Lion's Poem",    level:'Level 4',levelColor:'#F5A623',bg:'#FFFBEA',coverKey:'cat',  featured:false },
      { title:'Colour Poems',       level:'Level 4',levelColor:'#5BB8D4',bg:'#EDF9FF',coverKey:'dino', featured:false },
    ],
    y2: [
      { title:'Aussie Rhyme Time',  level:'Level 5',levelColor:'#4CAF50',bg:'#F0FFF0',coverKey:'wave',    featured:true  },
      { title:'Surf School Poems',  level:'Level 5',levelColor:'#5BB8D4',bg:'#EDF9FF',coverKey:'space',   featured:false },
      { title:'Bedtime Verse',      level:'Level 6',levelColor:'#8B7EC8',bg:'#F2EEFF',coverKey:'dino',    featured:false },
      { title:'The Spinning Poem',  level:'Level 6',levelColor:'#F0714A',bg:'#FFF0ED',coverKey:'elephant',featured:false },
    ],
  },
  facts: {
    prep: [
      { title:'Why Elephants Are Big',level:'Level 1',levelColor:'#FF9800',bg:'#FFF8EC',coverKey:'elephant',featured:true  },
      { title:'How Stars Shine',      level:'Level 1',levelColor:'#F5A623',bg:'#FFFBEA',coverKey:'space',   featured:false },
      { title:'Where Waves Come From',level:'Level 2',levelColor:'#5BB8D4',bg:'#EDF9FF',coverKey:'duck',    featured:false },
      { title:'Seeds and Trees',      level:'Level 2',levelColor:'#4CAF50',bg:'#F0FFF0',coverKey:'bee',     featured:false },
    ],
    y1: [
      { title:'Dinos Were Real!',   level:'Level 3',levelColor:'#4CAF50',bg:'#F0FFF0',coverKey:'dino',    featured:true  },
      { title:'Our Planet Spins',   level:'Level 3',levelColor:'#5BB8D4',bg:'#EDF9FF',coverKey:'elephant',featured:false },
      { title:'Bees Build Hexagons',level:'Level 4',levelColor:'#F5A623',bg:'#FFFBEA',coverKey:'bee',     featured:false },
      { title:'The Water Cycle',    level:'Level 4',levelColor:'#5BB8D4',bg:'#EDF9FF',coverKey:'cat',     featured:false },
    ],
    y2: [
      { title:'Telescopes and Space',level:'Level 5',levelColor:'#8B7EC8',bg:'#F2EEFF',coverKey:'space',   featured:true  },
      { title:'Tiny Living Things', level:'Level 5',levelColor:'#4CAF50',bg:'#F0FFF0',coverKey:'elephant',featured:false },
      { title:'How Lightning Works',level:'Level 6',levelColor:'#F5A623',bg:'#FFFBEA',coverKey:'dino',    featured:false },
      { title:'Magnets and Force',  level:'Level 6',levelColor:'#F0714A',bg:'#FFF0ED',coverKey:'robot',   featured:false },
    ],
  },
}

// ── Reading Buddies weblet ───────────────────────────────────────────────────
function ReadingBuddiesWeblet() {
  const [buddy, setBuddy]   = useState<'spark'|'luna'|'pip'|'nova'>('spark')
  const [level, setLevel]   = useState<'prep'|'y1'|'y2'>('prep')
  const [btype, setBtype]   = useState<'phonics'|'stories'|'rhymes'|'facts'>('phonics')

  const buddyMeta = {
    spark: { label:'Spark', color:'#E8762B' },
    luna:  { label:'Luna',  color:'#8B7EC8' },
    pip:   { label:'Pip',   color:'#C4904A' },
    nova:  { label:'Nova',  color:'#F06090' },
  }

  const typeColors: Record<string, string> = {
    phonics:'#F0714A', stories:'#8B7EC8', rhymes:'#5BB8D4', facts:'#F5A623'
  }

  const books: BookEntry[] = RB_BOOKS[btype]?.[level] || []

  const bm = buddyMeta[buddy]

  return (
    <div className="rb-weblet-section" id="try-it">
      <div className="rb-weblet-inner">
        <div className="rb-weblet-header">
          <div className="rb-weblet-badge">📖 AI Books · Kindy to Year 2</div>
          <h2>Read with your Reading Buddy</h2>
          <p>Pick your buddy, choose your level, find a book — and read together.</p>
        </div>
        <div className="rb-weblet-app">
          <div className="rb-weblet-topbar">
            <div className="rb-dots"><div className="rb-dot rb-dot-r"/><div className="rb-dot rb-dot-y"/><div className="rb-dot rb-dot-g"/></div>
            <div className="rb-weblet-topbar-logo">📖 Reading Buddies — Student View</div>
            <div className="rb-weblet-topbar-tag">LIVE DEMO</div>
          </div>
          <div className="rb-weblet-body">

            {/* Title */}
            <div style={{ textAlign:'center', marginBottom:20 }}>
              <div style={{ fontFamily:'Fraunces,serif', fontWeight:900, fontSize:'1.6rem', color:'#1a2e1f' }}>Reading Buddies</div>
              <div style={{ fontSize:'0.8rem', color:'#4a6b52', marginTop:4 }}>AI books for Kindy to Year 2</div>
            </div>

            {/* Buddy picker */}
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:'0.65rem', fontWeight:800, letterSpacing:'1.2px', textTransform:'uppercase', color:'#4a6b52', textAlign:'center', marginBottom:10 }}>Pick your buddy</div>
              <div style={{ display:'flex', justifyContent:'center', gap:14 }}>
                {(['spark','luna','pip','nova'] as const).map(b => (
                  <div key={b} onClick={() => setBuddy(b)} style={{ cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
                    <div style={{ width:56, height:56, borderRadius:'50%', overflow:'hidden', border:`3px solid ${buddy===b ? buddyMeta[b].color : '#ddd'}`, boxShadow: buddy===b ? `0 0 0 3px ${buddyMeta[b].color}33` : 'none', transition:'all 0.2s' }}
                      dangerouslySetInnerHTML={{ __html: BUDDY_SVGS[b] }} />
                    <span style={{ fontSize:'0.68rem', fontWeight:700, color: buddy===b ? buddyMeta[b].color : '#7A8099' }}>{buddyMeta[b].label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Level */}
            <div style={{ marginBottom:12 }}>
              <div style={{ fontSize:'0.65rem', fontWeight:800, letterSpacing:'1.2px', textTransform:'uppercase', color:'#4a6b52', textAlign:'center', marginBottom:8 }}>Reading level</div>
              <div style={{ display:'flex', justifyContent:'center', gap:8 }}>
                {([['prep','🌱 Kindy'],['y1','⭐ Year 1'],['y2','🚀 Year 2']] as const).map(([lv,lb]) => (
                  <button key={lv} onClick={() => setLevel(lv)} style={{ padding:'7px 14px', borderRadius:40, border:`2px solid ${level===lv ? '#2BB5A0' : '#DDD8CF'}`, background: level===lv ? '#2BB5A0' : 'white', color: level===lv ? 'white' : '#7A8099', fontFamily:'inherit', fontWeight:700, fontSize:'0.72rem', cursor:'pointer', transition:'all 0.2s' }}>{lb}</button>
                ))}
              </div>
            </div>

            {/* Type */}
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:'0.65rem', fontWeight:800, letterSpacing:'1.2px', textTransform:'uppercase', color:'#4a6b52', textAlign:'center', marginBottom:8 }}>Type of book</div>
              <div style={{ display:'flex', justifyContent:'center', gap:7, flexWrap:'wrap' }}>
                {([['phonics','🔤 Phonics'],['stories','🌈 Stories'],['rhymes','🎵 Rhymes'],['facts','🔬 Facts']] as const).map(([bt,bl]) => (
                  <button key={bt} onClick={() => setBtype(bt)} style={{ padding:'6px 13px', borderRadius:10, border:`2px solid ${btype===bt ? typeColors[bt] : '#DDD8CF'}`, background: btype===bt ? typeColors[bt] : 'white', color: btype===bt ? 'white' : '#7A8099', fontFamily:'inherit', fontWeight:700, fontSize:'0.72rem', cursor:'pointer', transition:'all 0.2s' }}>{bl}</button>
                ))}
              </div>
            </div>

            {/* Books grid */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:16 }}>
              {books.map((bk, i) => (
                <div key={i} onClick={() => alert(`📖 Opening "${bk.title}" with ${bm.label}!`)}
                  style={{ gridColumn: bk.featured ? 'span 2' : 'span 1', background:'white', borderRadius:12, overflow:'hidden', cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,0.07)', display:'flex', flexDirection: bk.featured ? 'row' : 'column', transition:'transform 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform='translateY(-3px) rotate(-1deg)')}
                  onMouseLeave={e => (e.currentTarget.style.transform='none')}
                >
                  <div style={{ flexShrink:0, ...(bk.featured ? { width:100, minHeight:90 } : { height:90 }) }}
                    dangerouslySetInnerHTML={{ __html: coverSVG(bk.coverKey, bk.bg) }} />
                  <div style={{ padding:'8px 10px 10px' }}>
                    <span style={{ display:'inline-block', fontSize:'0.6rem', fontWeight:800, letterSpacing:'0.6px', textTransform:'uppercase', padding:'2px 7px', borderRadius:20, marginBottom:4, background:`${bk.levelColor}22`, color:bk.levelColor }}>{bk.level}</span>
                    <div style={{ fontSize:'0.72rem', fontWeight:800, color:'#1A2340', lineHeight:1.3, marginBottom:3 }}>{bk.title}</div>
                    <div style={{ fontSize:'0.62rem', fontWeight:600, color:'#7A8099' }}>{bm.label} reads with you</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ textAlign:'center' }}>
              <a href="/signup?plan=freemium" style={{ display:'inline-block', background:'#2BB5A0', color:'white', fontFamily:'Fraunces,serif', fontWeight:800, fontSize:'0.95rem', padding:'11px 28px', borderRadius:40, textDecoration:'none', boxShadow:'0 4px 0 #1E8C7A', transition:'transform 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.transform='translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform='none')}
              >
                Start Reading with {bm.label} 📖
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}


export default function Home() {
  return (
    <>
      {/* NAV */}
      <nav className="rb-nav">
        <div className="rb-nav-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://lzfgigiyqpuuxslsygjt.supabase.co/storage/v1/object/public/images/AHC%20droid%20head.webp" alt="Reading Buddy" style={{ height: 32, width: 'auto' }} />
          Reading Buddy
        </div>
        <ul className="rb-nav-links">
          <li><a href="#try-it">Try it Free</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#contexts">Schools & NDIS</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/signup?plan=premium_monthly" className="rb-nav-cta">Get Started</a></li>
        </ul>
      </nav>

      {/* HERO — full-bleed classroom photo + droid */}
      <section className="rb-hero" style={{ position: 'relative', overflow: 'hidden', minHeight: '90vh', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 0, padding: 0 }}>
        {/* Left: copy */}
        <div style={{ padding: '80px 5% 60px 7%', zIndex: 2, position: 'relative' }}>
          <div className="rb-badge">🇦🇺 Built in Australia · NDIS Ready · AI-Powered</div>
          <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(2.2rem,4.5vw,3.4rem)', lineHeight: 1.15, color: 'var(--navy)', marginBottom: 20 }}>
            Reading tests used to be clipboards.<br /><em style={{ fontStyle: 'normal', background: 'linear-gradient(135deg,var(--teal),var(--teal-mid))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>This is what comes next.</em>
          </h1>
          <div className="rb-brain" style={{ marginBottom: 20 }}>🧠✨ Your brain is like a superhero when you read!</div>
          <p className="rb-hero-sub">AI reading intelligence that listens, scores, reports, and recommends — automatically, in real time, for every student, in every session.</p>
          <div className="rb-hero-actions">
            <a href="/signup" className="rb-btn rb-btn-primary">▶ Start Free — No Card</a>
            <a href="#pricing" className="rb-btn rb-btn-outline">See Pricing</a>
          </div>
          {/* Stat pills */}
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            {[['16×','Book sets replaced'],['30s','To score a session'],['100%','NDIS compliance'],['∞','Books — customised per child']].map(([n,l]) => (
              <div key={n} style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 40, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '1rem', color: 'var(--teal)' }}>{n}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Right: photo collage */}
        <div style={{ position: 'relative', height: '90vh', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMGS.classroom} alt="Students reading in classroom" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          {/* Droid overlay */}
          <div style={{ position: 'absolute', bottom: 40, right: 40, background: 'rgba(255,255,255,0.95)', borderRadius: 20, padding: '16px 20px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: 12, backdropFilter: 'blur(8px)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://lzfgigiyqpuuxslsygjt.supabase.co/storage/v1/object/public/images/AHC%20droid%20head.webp" alt="AI Droid" style={{ height: 56, width: 'auto' }} />
            <div>
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '0.85rem', color: 'var(--navy)' }}>Session scored ✓</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>WPM: 118 · Accuracy: 94%</div>
            </div>
          </div>
          {/* Gradient overlay on left edge */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, var(--cream) 0%, transparent 30%)' }} />
        </div>
      </section>

      {/* SOCIAL PROOF STRIP */}
      <div style={{ background: 'var(--teal)', padding: '20px 5%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
        {[
          ['$48,000', 'in book sets replaced per school'],
          ['6 hrs/wk', 'saved per teacher'],
          ['< 30 sec', 'to score a full session'],
          ['100%', 'NDIS Practice Standards compliant'],
        ].map(([n, l]) => (
          <div key={n} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '1.5rem', color: 'var(--white)' }}>{n}</div>
            <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)' }}>{l}</div>
          </div>
        ))}
      </div>

      {/* DROID FEATURE SECTION */}
      <section className="rb-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        <div>
          <div className="rb-section-label">Meet your AI reading coach</div>
          <h2 className="rb-section-title">The Augmented Humanity Coach — built to amplify teachers, not replace them.</h2>
          <p className="rb-section-sub" style={{ marginBottom: 24 }}>Reading Buddy's AI engine listens to every student read aloud, scores instantly, and generates 6 different reports simultaneously — before the student has closed the book.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ['🎙', 'Listens in real time — any device, no hardware'],
              ['⚡', 'Scores WPM, accuracy, prosody in under 30 seconds'],
              ['📋', 'Generates NDIS progress notes automatically'],
              ['📊', 'Plots growth against national benchmarks, live'],
              ['📚', 'Customisable book library — your texts, your curriculum, per child'],
            ].map(([icon, text]) => (
              <div key={text} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: 2 }}>{icon}</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--navy-mid)', lineHeight: 1.6 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://lzfgigiyqpuuxslsygjt.supabase.co/storage/v1/object/public/images/AHC%20droid%20head.webp" alt="Reading Buddy AI Droid" style={{ width: '100%', maxWidth: 320, height: 'auto' }} />
          <div style={{ fontSize: '0.8rem', color: 'var(--muted)', textAlign: 'center', fontStyle: 'italic' }}>
            🤖 Augmented Humanity Coach · Reading intelligence engine
          </div>
        </div>
      </section>

      {/* KIDS + TEACHER PHOTO STRIP */}
      <section style={{ padding: '0 0 80px', background: 'var(--cream-dark)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, height: 340 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMGS.kidReading1} alt="Child reading with Reading Buddy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMGS.teacher1} alt="Teacher reviewing student progress" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMGS.kidReading2} alt="Students learning to read" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ padding: '64px 5% 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <div className="rb-section-label">For teachers</div>
              <h2 className="rb-section-title">6 hours back every week. Starting Monday.</h2>
              <p className="rb-section-sub">Marking, levelling, reporting, parent communications — all automated. Reading Buddy gives teachers the data they need, without the admin they dread.</p>
              <a href="mailto:readingbuddy@outcome-ready.com" style={{ display: 'inline-block', marginTop: 24, fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--teal)' }}>Talk to us about your school →</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <AccuracyChart />
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING BUDDY WEBLET */}
      <ReadingBuddiesWeblet />

      {/* CLASS HEALTH DASHBOARD */}
      <section className="rb-section-dark" id="features">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div className="rb-section-label">Principal & school view</div>
            <h2 className="rb-section-title">Whole-school literacy, live. No waiting for term reports.</h2>
            <p className="rb-section-sub" style={{ marginBottom: 24 }}>Every classroom in one dashboard. Colour-coded alerts. Drill down from school to student in two clicks.</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMGS.scenePrincipal} alt="Principal dashboard" style={{ width: '100%', borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <ClassHealthChart />
            <AccuracyChart />
          </div>
        </div>
      </section>

      {/* TEACHER PHOTO + SCENE */}
      <section className="rb-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
        <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', height: 460 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMGS.teacher2} alt="Teacher using Reading Buddy in classroom" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, background: 'rgba(255,255,255,0.95)', borderRadius: 14, padding: '14px 18px', backdropFilter: 'blur(8px)' }}>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '0.88rem', color: 'var(--navy)', marginBottom: 4 }}>Ms Thompson, Year 3</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>"Reading Buddy saved me 8 hours of reporting this week alone."</div>
          </div>
        </div>
        <div>
          <div className="rb-section-label">How it works</div>
          <h2 className="rb-section-title">From session to report in under 60 seconds.</h2>
          <div className="rb-steps" style={{ marginTop: 24 }}>
            {[
              { num: '01', icon: '🎙', title: 'Student reads aloud', desc: 'Any tablet, phone, or laptop. Session starts in seconds.', tag: 'Zero prep time' },
              { num: '02', icon: '🤖', title: 'AI scores instantly', desc: 'WPM, accuracy, prosody. Results before the student closes the book.', tag: '< 30 seconds' },
              { num: '03', icon: '📋', title: 'Reports write themselves', desc: '6 report types auto-generated from every session.', tag: '6 reports' },
              { num: '04', icon: '📊', title: 'Dashboard shows all', desc: 'Teacher → classroom → school → NDIS — live.', tag: 'Real-time' },
            ].map(s => (
              <div key={s.num} className="rb-step" data-num={s.num} style={{ marginBottom: 16 }}>
                <div className="rb-step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="rb-step-tag">{s.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTEXTS — flip cards */}
      <section className="rb-section-dark" id="contexts">
        <div className="rb-text-center" style={{ marginBottom: 48 }}>
          <div className="rb-section-label">Designed for every environment</div>
          <h2 className="rb-section-title">Classroom. Clinic. Home. School-wide.</h2>
          <p className="rb-section-sub" style={{ marginTop: 8, opacity: 0.7, fontSize: '0.85rem' }}>Hover each card to see how it works in your context</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {[
            {
              color: '#1a2e4a',
              icon: '🏫',
              title: 'In the Classroom',
              tagline: 'Student reads aloud. AI listens, scores, and reports instantly. No clipboards, no manual levelling.',
              pills: [{ val: '30s', label: 'Session scored' }, { val: '0', label: 'Manual effort' }, { val: 'Real-time', label: 'Reports' }],
              img: IMGS.sceneClassroom,
              link: 'Public & Private Schools',
              linkHref: 'mailto:readingbuddy@outcome-ready.com?subject=Schools',
              backDesc: 'Every student scored in every session. Teachers receive six automatic reports — no marking, no clipboards, no levelling kits.',
              bullets: ['WPM, accuracy & prosody scored in 30 seconds', 'Growth tracked against national benchmarks', 'Parent snapshots auto-sent after each session', 'Works on any classroom device — no hardware'],
            },
            {
              color: '#1a4a3a',
              icon: '🎯',
              title: 'In the Clinic',
              tagline: 'NDIS progress notes generated the moment the session ends. Compliant, timestamped, audit-ready.',
              pills: [{ val: '1-click', label: 'NDIS notes' }, { val: '100%', label: 'Compliant' }, { val: '0hr', label: 'Admin time' }],
              img: IMGS.sceneNdis,
              link: 'NDIS Providers',
              linkHref: 'mailto:readingbuddy@outcome-ready.com?subject=NDIS',
              backDesc: 'NDIS Practice Standards–aligned progress notes generated automatically. Providers spend their time in therapy, not paperwork.',
              bullets: ['Goal-referenced notes — no copy-paste', 'Timestamped & audit-ready from day one', 'Books mapped directly to participant NDIS goals', 'Bulk export for plan reviews & audits'],
            },
            {
              color: '#4a2a7a',
              icon: '🏠',
              title: 'At Home',
              tagline: 'Parent snapshots in plain English, sent automatically after every session. No jargon, no effort.',
              pills: [{ val: 'Auto', label: 'Parent reports' }, { val: 'Plain', label: 'English only' }, { val: 'Every', label: 'Session' }],
              img: IMGS.sceneHome,
              link: 'Parents',
              linkHref: 'mailto:readingbuddy@outcome-ready.com?subject=Parents',
              backDesc: 'Parents stay in the loop without needing to understand reading levels. Plain-English snapshots land automatically after every session.',
              bullets: ['What they practised — in simple language', 'Progress vs. reading age benchmarks', 'What to work on at home this week', 'No app install required for parents'],
            },
            {
              color: '#7a3a1a',
              icon: '📊',
              title: 'Across the School',
              tagline: 'Live literacy dashboard across every classroom. Principals see the full picture — not at term end, right now.',
              pills: [{ val: 'Live', label: 'Dashboard' }, { val: 'All', label: 'Classrooms' }, { val: 'NAPLAN', label: 'Ready' }],
              img: IMGS.scenePrincipal,
              link: 'School Leaders',
              linkHref: 'mailto:readingbuddy@outcome-ready.com?subject=SchoolLeaders',
              backDesc: 'Principals see literacy health across every classroom in real time — colour-coded alerts, drill down from school to student in two clicks.',
              bullets: ['Whole-school literacy dashboard — live', 'Colour-coded: on track / watch / alert', 'Drill down: school → class → student', 'NAPLAN-ready reporting built in'],
            },
          ].map(c => (
            <div key={c.title} className="rb-ctx-wrap">
              <div className="rb-ctx-inner">
                {/* FRONT */}
                <div className="rb-ctx-front" style={{ border: `1.5px solid ${c.color}` }}>
                  <div className="rb-ctx-left" style={{ background: c.color }}>
                    <div>
                      <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>{c.icon}</div>
                      <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '0.95rem', color: '#fff', marginBottom: 10 }}>{c.title}</div>
                      <div className="rb-ctx-tagline">{c.tagline}</div>
                    </div>
                    <div className="rb-ctx-pills">
                      {c.pills.map(p => (
                        <div key={p.label} className="rb-ctx-pill">
                          <span className="rb-ctx-pill-val">{p.val}</span>
                          <span className="rb-ctx-pill-label">{p.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rb-ctx-right">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.img} alt={c.title} />
                    <div className="rb-ctx-flip-hint">hover to flip →</div>
                  </div>
                </div>
                {/* BACK */}
                <div className="rb-ctx-back" style={{ border: `1.5px solid ${c.color}` }}>
                  <div className="rb-ctx-back-icon">{c.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--navy)', marginBottom: 8 }}>{c.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.65, marginBottom: 16 }}>{c.backDesc}</p>
                  <ul>
                    {c.bullets.map(b => <li key={b}>{b}</li>)}
                  </ul>
                  <a href={c.linkHref} className="rb-ctx-link">{c.link} →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6 REPORTS */}
      <section className="rb-section">
        <div className="rb-text-center" style={{ maxWidth: 580, margin: '0 auto 48px' }}>
          <div className="rb-section-label">Six reports from one session</div>
          <h2 className="rb-section-title">All automatic. All from one reading.</h2>
          <p className="rb-section-sub">No templates, no copy-paste. Every time a student reads, six reports appear simultaneously.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32, alignItems: 'start' }}>
          <div className="rb-reports-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {[
              { icon: '🤖', title: 'Session Summary', desc: 'WPM, accuracy, prosody, reading age estimate, and intervention flags.' },
              { icon: '📈', title: 'Growth Trajectory', desc: 'Month-over-month growth vs national benchmarks. PDF exportable.' },
              { icon: '📋', title: 'NDIS Progress Note', desc: 'Goal-referenced, Practice Standards aligned, timestamped.' },
              { icon: '👨‍👩‍👧', title: 'Parent Snapshot', desc: 'Plain-English. What they worked on, how they\'re going, what to practise.' },
              { icon: '🏫', title: 'Class Health Report', desc: 'Every student: on track, needs a push, or urgent intervention.' },
              { icon: '📚', title: 'Book Recommendations', desc: 'AI-matched to level, history, and interests. Library catalogue linked.' },
            ].map(r => (
              <div key={r.title} className="rb-report">
                <div className="rb-report-icon">{r.icon}</div>
                <h4>{r.title}</h4>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>
          {/* Live charts column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <AccuracyChart />
            <ClassHealthChart />
          </div>
        </div>
      </section>

      {/* PRICING */}
      {/* CUSTOMISABLE BOOKS SECTION */}
      <section className="rb-section" id="custom-books" style={{ background: 'linear-gradient(135deg, #f0f8f3 0%, #e8f5ee 100%)', borderTop: '1px solid #c5dfc9' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="rb-section-label">Key Differentiator</div>
          <h2 className="rb-section-title" style={{ color: 'var(--navy)' }}>Books customised to every child.<br />Not one size fits all.</h2>
          <p className="rb-section-sub" style={{ maxWidth: 560, margin: '12px auto 0' }}>Reading Buddy isn't locked to a single book series. Upload your own texts, align to your school's reading program, and customise books per class or per individual child — automatically matched to their learning outcomes.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '📖', title: 'Your texts, your program', desc: 'Upload PDFs, Word docs, or URLs. Reading Buddy turns any text into a fully scored, assessed reading session.' },
            { icon: '🎯', title: 'Per-child customisation', desc: 'Assign specific books to individual students based on their reading level, interests, or NDIS goals. Automatically.' },
            { icon: '🏫', title: 'Per-class libraries', desc: 'Each teacher builds their own class library. Aligned to PM Readers, Oxford, Sunshine, or your school\'s chosen program.' },
            { icon: '🇦🇺', title: 'Curriculum-mapped', desc: 'Books tagged to Australian Curriculum outcomes. Progress data links directly to reporting requirements.' },
            { icon: '🎗', title: 'NDIS goal-aligned content', desc: 'For NDIS providers — books mapped directly to participant goals. Every session generates goal-referenced evidence.' },
            { icon: '📊', title: 'Tracks every custom text', desc: 'Same WPM, accuracy, prosody scoring on any text. Growth charts work across your entire custom library.' },
          ].map(f => (
            <div key={f.title} style={{ background: 'white', borderRadius: 14, padding: '1.5rem', border: '1.5px solid #c5dfc9', boxShadow: '0 2px 12px rgba(29,110,99,0.06)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.6rem' }}>{f.icon}</div>
              <h4 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--navy)', marginBottom: '0.4rem' }}>{f.title}</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ background: 'white', borderRadius: 16, padding: '1.5rem 2rem', border: '2px solid #4a7c59', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '2.5rem' }}>💡</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1rem', color: 'var(--navy)', marginBottom: 4 }}>Every competitor locks you into their book series. We don't.</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>Your school has already invested in a reading program. Reading Buddy works with it — not against it. Keep your PM Readers, your Oxford books, your school library. Just add AI.</div>
          </div>
          <a href="mailto:readingbuddy@outcome-ready.com?subject=Custom+Books" className="rb-btn rb-btn-primary" style={{ whiteSpace: 'nowrap' }}>See how it works →</a>
        </div>
      </section>

      <section className="rb-section-navy" id="pricing">
        <div className="rb-text-center">
          <div className="rb-section-label light">Value-based pricing · No lock-in · Cancel anytime</div>
          <h2 className="rb-section-title light">Less than one book set.<br />More than a full-time coordinator.</h2>
          <p className="rb-section-sub light">A single reading series costs $3,000. Four grades, four sets — $48,000. Plus hours of weekly admin.</p>
        </div>
        <div className="rb-pricing-grid">
          <div className="rb-plan">
            <div className="rb-plan-name">Freemium</div>
            <div className="rb-plan-price">Free</div>
            <div className="rb-plan-freq">Forever · No credit card</div>
            <ul className="rb-plan-features">
              <li><span className="rb-check">✓</span>1 classroom, unlimited students</li>
              <li><span className="rb-check">✓</span>Core metrics (WPM, accuracy)</li>
              <li><span className="rb-check">✓</span>Basic teacher snapshots</li>
              <li><span className="rb-check">✓</span>3 months data retention</li>
              <li><span className="rb-cross">–</span>Parent reports</li>
              <li><span className="rb-cross">–</span>NDIS mode</li>
            </ul>
            <a href="mailto:readingbuddy@outcome-ready.com?subject=Freemium" className="rb-plan-cta">Get Started Free</a>
          </div>
          <div className="rb-plan popular">
            <div className="rb-popular-badge">⭐ Most Popular</div>
            <div className="rb-plan-name">Premium Classroom</div>
            <div className="rb-plan-price">$59<span>/mo</span></div>
            <div className="rb-plan-freq">or $590/year — save 17%</div>
            <ul className="rb-plan-features">
              <li><span className="rb-check">✓</span>1 classroom, unlimited students</li>
              <li><span className="rb-check">✓</span>Full metrics + growth charts</li>
              <li><span className="rb-check">✓</span>Teacher + parent snapshots</li>
              <li><span className="rb-check">✓</span>AI book recommendations</li>
              <li><span className="rb-check">✓</span>NDIS mode — full</li>
              <li><span className="rb-check">✓</span>12 months data retention</li>
            </ul>
            <a href="/signup?plan=premium_monthly" className="rb-plan-cta">Start Free Trial — $59/mo</a>
            <a href="/signup?plan=premium_annual" style={{display:'block',textAlign:'center',fontFamily:'var(--font-head)',fontWeight:700,fontSize:'0.78rem',color:'rgba(255,255,255,0.7)',marginTop:8}}>Annual billing ($590/yr) →</a>
          </div>
          <div className="rb-plan">
            <div className="rb-plan-name">Premium School</div>
            <div className="rb-plan-price">$4,900<span style={{ fontSize: '0.9rem' }}>/yr</span></div>
            <div className="rb-plan-freq">💡 16 book sets = $48,000. This is $4,900/yr.</div>
            <ul className="rb-plan-features">
              <li><span className="rb-check">✓</span>Up to 10 classrooms</li>
              <li><span className="rb-check">✓</span>School-wide literacy dashboard</li>
              <li><span className="rb-check">✓</span>All Premium Classroom features</li>
              <li><span className="rb-check">✓</span>Basic LMS / SIS integrations</li>
              <li><span className="rb-cross">–</span>Multi-site analytics</li>
            </ul>
            <a href="/signup?plan=school" className="rb-plan-cta">Start School Plan</a>
          </div>
          <div className="rb-plan">
            <div className="rb-plan-name">Enterprise</div>
            <div className="rb-plan-price" style={{ fontSize: '1.6rem' }}>From $35k</div>
            <div className="rb-plan-freq">💡 Full-time coordinator = $90–110k/yr.</div>
            <ul className="rb-plan-features">
              <li><span className="rb-check">✓</span>Unlimited schools / sites</li>
              <li><span className="rb-check">✓</span>Custom LMS/SIS/NDIS integrations</li>
              <li><span className="rb-check">✓</span>Governance dashboards</li>
              <li><span className="rb-check">✓</span>Phone support + onboarding</li>
              <li><span className="rb-check">✓</span>Unlimited data retention</li>
            </ul>
            <a href="mailto:readingbuddy@outcome-ready.com?subject=Enterprise" className="rb-plan-cta">Contact Sales</a>
          </div>
        </div>
      </section>

      {/* KID PHOTO CTA */}
      <div style={{ position: 'relative', height: 380, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMGS.kidReading3} alt="Child reading with Reading Buddy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(29,110,99,0.85) 0%, rgba(42,157,143,0.7) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 5%' }}>
          <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#fff', marginBottom: 12 }}>Start free. Upgrade when it pays for itself.</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', maxWidth: 480, marginBottom: 32 }}>Try one classroom free. The time saved on reporting alone covers the upgrade.</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="mailto:readingbuddy@outcome-ready.com?subject=Free+Trial" className="rb-btn-white">Start free — one classroom</a>
            <a href="mailto:readingbuddy@outcome-ready.com?subject=Talk+to+Sales" className="rb-btn-white-outline">Talk to Sales</a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="rb-footer" id="contact">
        <div className="rb-footer-grid">
          <div>
            <div className="rb-footer-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://lzfgigiyqpuuxslsygjt.supabase.co/storage/v1/object/public/images/AHC%20droid%20head.webp" alt="Reading Buddy" style={{ height: 36, width: 'auto', filter: 'brightness(0) invert(1)' }} />
              Reading Buddy
            </div>
            <p className="rb-footer-about">AI-powered reading intelligence for Australian schools and NDIS providers. Built to replace plastic tubs, clipboards, and hours of weekly admin.</p>
            <div className="rb-footer-contact">
              ✉️ <a href="mailto:readingbuddy@outcome-ready.com">readingbuddy@outcome-ready.com</a>
              <div style={{ fontSize: '0.8rem', marginTop: 6 }}>Tech 4 Humanity Pty Ltd · ABN 70 666 271 272</div>
            </div>
          </div>
          <div className="rb-footer-col">
            <h4>Product</h4>
            <ul>
              <li><a href="#try-it">Try it Free</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#contexts">NDIS Mode</a></li>
              <li><a href="/marketing">App Preview</a></li>
            </ul>
          </div>
          <div className="rb-footer-col">
            <h4>Get Started</h4>
            <ul>
              <li><a href="mailto:readingbuddy@outcome-ready.com?subject=Free+Trial">Free Trial</a></li>
              <li><a href="mailto:readingbuddy@outcome-ready.com?subject=Premium">Premium Classroom</a></li>
              <li><a href="/signup?plan=school">School Plan</a></li>
              <li><a href="mailto:readingbuddy@outcome-ready.com?subject=Enterprise">Enterprise</a></li>
            </ul>
          </div>
          <div className="rb-footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
            <h4 style={{ marginTop: 20 }}>Data</h4>
            <ul>
              <li><a href="#">Australian Servers 🇦🇺</a></li>
              <li><a href="#">Privacy Act Compliant</a></li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '1rem', textAlign: 'center' }}>Also from Tech 4 Humanity</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              ['OutcomeReady', 'https://outcome-ready.vercel.app'],
              ['ThrivingOS', 'https://outcome-ready.vercel.app/thriving-kids'],
              ['AI for Tradies', 'https://ai4tradies.org'],
              ['Valdocco Primary', 'https://valdocco-primary.vercel.app'],
              ['Augmented Memories', 'https://augmentedmemories.org'],
              ['AHC', 'https://augmented-humanity.com'],
            ].map(([name, url]) => (
              <a key={name} href={url} style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}>{name}</a>
            ))}
          </div>
        </div>
        <div className="rb-footer-bottom">
          <p>© 2026 Tech 4 Humanity Pty Ltd. All rights reserved. Built in Australia 🇦🇺</p>
          <div className="rb-abn">ABN 70 666 271 272</div>
        </div>
      </footer>
    </>
  )
}
