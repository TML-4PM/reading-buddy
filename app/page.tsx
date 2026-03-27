'use client'

export default function Home() {
  return (
    <>
      <style>{`

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

:root {
  --red: #E5534B;
  --red-dark: #cc3f38;
  --yellow: #F5C346;
  --black: #111111;
  --gray: #555;
  --light-gray: #f5f5f5;
}

body { font-family: 'DM Sans', sans-serif; color: var(--black); background: white; }

/* ============================================================
   MY LEARNING BUDDY SECTION — exact match to screenshots
   ============================================================ */

/* NAV */
.mlb-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 40px;
  background: white;
  border-bottom: 1px solid #eee;
}
.mlb-logo {
  font-family: 'Caveat', cursive;
  font-size: 1.5rem; font-weight: 700; color: var(--black);
  line-height: 1.15; text-decoration: none;
}
.mlb-nav-links { display: flex; align-items: center; gap: 40px; }
.mlb-nav-links a {
  text-decoration: none; color: var(--black); font-size: 0.95rem;
  font-weight: 400; transition: color 0.15s;
}
.mlb-nav-links a:hover { color: var(--gray); }
.mlb-login {
  background: var(--red); color: white;
  border: none; border-radius: 99px;
  padding: 10px 28px; font-size: 0.95rem; font-weight: 500;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer; transition: background 0.15s;
  text-decoration: none;
}
.mlb-login:hover { background: var(--red-dark); }

/* HERO */
.mlb-hero {
  min-height: 100vh;
  display: flex; align-items: center;
  padding: 100px 40px 60px;
  gap: 60px;
  max-width: 1200px; margin: 0 auto;
}
.mlb-hero-text { flex: 1; max-width: 480px; }
.mlb-hero-text h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400; line-height: 1.2;
  color: var(--black); margin-bottom: 24px;
  letter-spacing: -0.02em;
}
.mlb-hero-text p {
  font-size: 1rem; color: var(--gray);
  line-height: 1.75; margin-bottom: 36px;
  font-weight: 300;
}
.mlb-start-btn {
  background: var(--red); color: white;
  border: none; border-radius: 12px;
  padding: 18px 0; font-size: 1rem; font-weight: 500;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer; width: 240px; display: block;
  text-align: center; text-decoration: none;
  transition: background 0.15s;
}
.mlb-start-btn:hover { background: var(--red-dark); }

/* PHONE MOCKUP */
.mlb-phone-wrap { flex: 0 0 360px; display: flex; justify-content: center; align-items: center; }
.mlb-phone {
  width: 260px; height: 530px;
  background: white;
  border: 8px solid #111;
  border-radius: 44px;
  position: relative;
  box-shadow: 0 30px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.08);
  overflow: hidden;
  display: flex; flex-direction: column;
  align-items: center;
}
.phone-notch {
  width: 90px; height: 22px;
  background: #111; border-radius: 0 0 14px 14px;
  margin-top: 0; flex-shrink: 0;
  align-self: center;
}
.phone-content {
  flex: 1; width: 100%; display: flex;
  flex-direction: column; align-items: center;
  justify-content: space-between;
  padding: 16px 12px 0;
}
.phone-celebration {
  display: flex; flex-direction: column; align-items: center;
  gap: 4px;
}
.confetti-row {
  display: flex; gap: 6px; justify-content: center;
  margin-bottom: 8px;
}
.confetti-dot {
  width: 8px; height: 8px; border-radius: 50%;
}
.confetti-squig { font-size: 1.4rem; }
.phone-excellent {
  font-size: 1rem; font-weight: 700; color: var(--black);
  text-align: center;
}
.phone-sub { font-size: 0.72rem; color: var(--gray); text-align: center; font-style: italic; }

/* ABC Characters */
.abc-chars {
  display: flex; align-items: flex-end; gap: 0;
  width: 100%; justify-content: center;
  margin-bottom: 0;
}
.char {
  position: relative; display: flex; flex-direction: column;
  align-items: center; justify-content: flex-end;
}
/* A - red triangle-ish */
.char-a {
  width: 58px; height: 72px;
  background: #E5534B;
  border-radius: 8px 8px 0 0;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  display: flex; align-items: center; justify-content: center;
}
/* B - teal rounded */
.char-b {
  width: 62px; height: 80px;
  background: #4BBFB5;
  border-radius: 0 0 0 0;
  display: flex; align-items: center; justify-content: center;
}
/* C - green */
.char-c {
  width: 58px; height: 66px;
  background: #5BB85A;
  border-radius: 0;
  display: flex; align-items: center; justify-content: center;
}
/* D - yellow round */
.char-d {
  width: 64px; height: 60px;
  background: #F5C346;
  border-radius: 50% 50% 0 0;
  display: flex; align-items: center; justify-content: center;
}
.char-letter {
  font-family: 'Caveat', cursive;
  font-size: 1.6rem; font-weight: 700; color: white;
  position: absolute; bottom: 12px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}
.char-face {
  position: absolute; top: 30%; font-size: 0.5rem;
  line-height: 1;
}

/* --- YELLOW SECTIONS --- */
.mlb-yellow { background: var(--yellow); }

.mlb-feature-row {
  display: flex; align-items: center;
  gap: 60px; padding: 80px 40px;
  max-width: 1200px; margin: 0 auto;
}
.mlb-feature-row.reverse { flex-direction: row-reverse; }
.mlb-feature-phone { flex: 0 0 240px; }
.mlb-feature-text { flex: 1; }
.mlb-feature-text h2 { font-size: 1.35rem; font-weight: 700; margin-bottom: 10px; color: var(--black); }
.mlb-feature-text p { font-size: 1rem; color: var(--black); line-height: 1.7; font-weight: 300; }

/* Small phone for feature sections */
.phone-sm {
  width: 200px; height: 400px;
  background: white;
  border: 7px solid #111;
  border-radius: 36px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  overflow: hidden;
  display: flex; flex-direction: column;
  align-items: center;
}
.phone-sm-notch {
  width: 70px; height: 16px;
  background: #111; border-radius: 0 0 10px 10px;
  flex-shrink: 0;
}
.phone-sm-content {
  flex: 1; width: 100%;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 12px;
}

/* Mic button */
.mic-btn {
  width: 70px; height: 70px; background: var(--red);
  border-radius: 50%; display: flex; align-items: center;
  justify-content: center; font-size: 1.6rem;
}
.mic-label { font-size: 0.7rem; color: var(--gray); margin-top: 8px; }
.phone-word { font-size: 1.1rem; font-weight: 700; color: var(--black); margin-bottom: 16px; }

/* Red circle */
.try-again-circle {
  width: 90px; height: 90px; background: var(--red);
  border-radius: 50%; display: flex; align-items: center;
  justify-content: center; text-align: center;
  font-size: 0.72rem; font-weight: 600; color: white;
  line-height: 1.3;
}
.brave-text { font-size: 0.68rem; color: var(--gray); margin-top: 12px; text-align: center; }

/* Loading screen */
.loading-title { font-family: 'Caveat', cursive; font-size: 1.2rem; font-weight: 700; color: var(--black); text-align: center; margin-bottom: 4px; }
.loading-sub { font-size: 0.62rem; color: var(--gray); text-align: center; margin-bottom: 16px; line-height: 1.5; }
.loading-bar-wrap { width: 120px; height: 12px; background: #eee; border-radius: 99px; overflow: hidden; }
.loading-bar { height: 100%; width: 20%; background: var(--red); border-radius: 99px; }

/* Donut chart */
.donut-wrap { width: 100px; height: 100px; margin: 0 auto 8px; }
.donut-title { font-size: 0.68rem; font-weight: 600; color: var(--black); text-align: center; margin-bottom: 8px; }

/* Wide yellow text sections */
.mlb-wide-text {
  padding: 80px 40px;
  max-width: 900px; margin: 0 auto;
  text-align: center;
}
.mlb-wide-text p {
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  line-height: 1.7; color: var(--black); font-weight: 300;
  margin-bottom: 24px;
}

/* HOW IT WORKS centered phone */
.mlb-hiw {
  padding: 60px 40px 80px;
  text-align: center;
  max-width: 1200px; margin: 0 auto;
}
.mlb-hiw h2 { font-size: 1.8rem; font-weight: 700; margin-bottom: 40px; }
.phone-lg-wrap {
  display: inline-block;
  background: #FFF3D4; border-radius: 28px; padding: 24px;
}
.phone-lg {
  width: 240px; height: 480px;
  background: white;
  border: 7px solid #111;
  border-radius: 40px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  overflow: hidden;
  display: flex; flex-direction: column;
  align-items: center;
}
.phone-lg-notch {
  width: 80px; height: 18px;
  background: #111; border-radius: 0 0 12px 12px;
  flex-shrink: 0;
}
.phone-lg-content {
  flex: 1; width: 100%;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 12px;
}
.play-btn {
  width: 60px; height: 60px; background: var(--red);
  border-radius: 50%; display: flex; align-items: center;
  justify-content: center; font-size: 1.4rem;
  position: absolute;
}
.phone-abc-sm {
  display: flex; gap: 4px; margin-top: 16px;
}
.abc-block-sm {
  width: 40px; height: 50px; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Caveat', cursive; font-size: 1.1rem;
  font-weight: 700; color: white;
}

/* GET IN TOUCH */
.mlb-contact {
  padding: 80px 40px;
  max-width: 680px; margin: 0 auto;
  text-align: center;
}
.mlb-contact h2 { font-size: 1.8rem; font-weight: 400; margin-bottom: 12px; letter-spacing: -0.02em; }
.mlb-contact p { font-size: 1rem; color: var(--gray); margin-bottom: 40px; }
.contact-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; text-align: left; }
.contact-field label { font-size: 0.88rem; font-weight: 500; color: var(--black); }
.contact-field input, .contact-field textarea {
  padding: 14px 16px;
  border: 1px solid #ddd; border-radius: 8px;
  font-family: 'DM Sans', sans-serif; font-size: 0.95rem;
  color: var(--black); background: white;
  transition: border-color 0.15s;
  resize: none;
}
.contact-field input:focus, .contact-field textarea:focus {
  outline: none; border-color: var(--red);
}
.contact-field textarea { height: 140px; }
.send-btn {
  display: block; width: 100%;
  background: var(--red); color: white;
  border: none; border-radius: 12px;
  padding: 18px; font-size: 1rem; font-weight: 500;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer; margin-top: 24px;
  transition: background 0.15s;
}
.send-btn:hover { background: var(--red-dark); }

/* ============================================================
   READING BUDDY CONTENT — unchanged
   ============================================================ */

.rb-section { padding: 80px 40px; }
.rb-inner { max-width: 1100px; margin: 0 auto; }
.rb-bg { background: #F9FAFB; }

.rb-eyebrow {
  font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em;
  text-transform: uppercase; color: #9CA3AF;
  display: block; margin-bottom: 12px;
}
.rb-h2 {
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 700; line-height: 1.2; margin-bottom: 12px; color: var(--black);
}
.rb-lead {
  font-size: 1rem; color: #6B7280; line-height: 1.75;
  max-width: 560px; margin-bottom: 32px;
}

/* STICKY NAV for RB section */
.rb-nav {
  position: sticky; top: 0; z-index: 100;
  background: rgba(255,255,255,0.97);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #E5E7EB;
  padding: 0 40px;
}
.rb-nav-inner {
  max-width: 1100px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
  height: 60px;
}
.rb-logo { font-size: 1rem; font-weight: 700; color: var(--black); text-decoration: none; }
.rb-links { display: flex; gap: 4px; align-items: center; }
.rb-links a {
  text-decoration: none; color: #6B7280; font-size: 0.85rem; font-weight: 500;
  padding: 6px 12px; border-radius: 6px; transition: all 0.15s;
}
.rb-links a:hover { color: var(--black); background: #F3F4F6; }
.rb-cta-btn {
  background: var(--black); color: white !important;
  border-radius: 8px !important; font-weight: 600 !important;
}
.rb-cta-btn:hover { background: #374151 !important; }

/* STATS */
.stats-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; background: #E5E7EB; border-radius: 12px; overflow: hidden; margin-top: 40px; }
.stat-cell { background: white; padding: 28px 20px; text-align: center; }
.stat-num { font-size: 2rem; font-weight: 700; }
.stat-lbl { font-size: 0.78rem; color: #9CA3AF; margin-top: 4px; }

/* BA TABLE */
.ba-wrap { background: white; border-radius: 12px; border: 1px solid #E5E7EB; overflow: hidden; margin-top: 32px; }
.ba-wrap table { width: 100%; border-collapse: collapse; font-size: 0.88rem; }
.ba-wrap th { background: var(--black); color: white; padding: 12px 20px; text-align: left; font-weight: 600; font-size: 0.76rem; letter-spacing: 0.05em; }
.ba-wrap th.g { color: #34D399; }
.ba-wrap td { padding: 14px 20px; border-bottom: 1px solid #F3F4F6; vertical-align: top; }
.ba-wrap tr:last-child td { border-bottom: none; }
.ba-wrap .bef { color: #9CA3AF; }
.ba-wrap .bef small { display: block; font-size: 0.75rem; color: #D1D5DB; margin-top: 2px; }
.ba-wrap .aft { color: var(--black); font-weight: 500; }
.ba-wrap .aft small { display: block; font-size: 0.75rem; color: #10B981; margin-top: 2px; }
.ba-wrap .arr { text-align: center; color: #D1D5DB; }

/* STEPS */
.steps-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 12px; margin-top: 36px; }
.step-card { background: white; border: 1px solid #E5E7EB; border-radius: 12px; padding: 20px 14px; text-align: center; position: relative; }
.step-n { position: absolute; top: 10px; left: 12px; font-size: 0.68rem; font-weight: 600; color: #D1D5DB; }
.step-icon { font-size: 1.8rem; margin-bottom: 10px; display: block; }
.step-card h3 { font-size: 0.85rem; font-weight: 600; margin-bottom: 6px; }
.step-card p { font-size: 0.76rem; color: #6B7280; line-height: 1.5; }
.step-badge { display: inline-block; margin-top: 8px; background: #F0FDF4; color: #16A34A; font-size: 0.68rem; font-weight: 600; padding: 2px 8px; border-radius: 99px; }

/* ENV GRID */
.env-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; margin-top: 36px; }
.env-card { background: white; border: 1px solid #E5E7EB; border-radius: 12px; padding: 24px; }
.env-card h3 { font-size: 1rem; font-weight: 600; margin-bottom: 8px; }
.env-card p { font-size: 0.85rem; color: #6B7280; line-height: 1.65; margin-bottom: 14px; }
.env-card a { font-size: 0.82rem; color: var(--black); font-weight: 600; text-decoration: none; }

/* REPORTS */
.rpts-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin-top: 36px; }
.rpt-card { background: white; border: 1px solid #E5E7EB; border-radius: 12px; padding: 22px; }
.rpt-card .ri { font-size: 1.5rem; margin-bottom: 10px; display: block; }
.rpt-card h4 { font-size: 0.9rem; font-weight: 600; margin-bottom: 6px; }
.rpt-card p { font-size: 0.8rem; color: #6B7280; line-height: 1.5; }

/* NDIS */
.ndis-checks { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
.ndis-checks span { background: #F0FDF4; color: #15803D; font-size: 0.8rem; font-weight: 600; padding: 5px 12px; border-radius: 99px; }
.ndis-prob-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 24px; }
.ndis-prob { background: white; border: 1px solid #E5E7EB; border-radius: 10px; padding: 18px; }
.ndis-prob h3 { font-size: 0.88rem; font-weight: 600; margin-bottom: 6px; }
.ndis-prob p { font-size: 0.8rem; color: #6B7280; line-height: 1.5; }
.workflow { display: flex; flex-direction: column; gap: 10px; margin-top: 24px; }
.wf-step { display: flex; gap: 14px; align-items: flex-start; background: white; border: 1px solid #E5E7EB; border-radius: 10px; padding: 18px; }
.wf-num { width: 28px; height: 28px; background: var(--black); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.76rem; font-weight: 700; flex-shrink: 0; margin-top: 2px; }
.wf-step h3 { font-size: 0.88rem; font-weight: 600; margin-bottom: 3px; }
.wf-step p { font-size: 0.8rem; color: #6B7280; line-height: 1.5; }
.comp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 20px; }
.comp-card { background: white; border: 1px solid #E5E7EB; border-radius: 10px; padding: 16px; display: flex; gap: 10px; }
.comp-icon { font-size: 1.3rem; flex-shrink: 0; }
.comp-card h4 { font-size: 0.85rem; font-weight: 600; margin-bottom: 3px; }
.comp-card p { font-size: 0.78rem; color: #6B7280; line-height: 1.4; }

/* PRICING */
.price-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; margin-top: 40px; }
.pc { background: white; border: 1px solid #E5E7EB; border-radius: 12px; padding: 24px 20px; position: relative; }
.pc.feat { background: var(--black); border-color: var(--black); color: white; }
.pop { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #10B981; color: white; font-size: 0.68rem; font-weight: 700; padding: 3px 10px; border-radius: 99px; white-space: nowrap; }
.pc-name { font-size: 0.76rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #9CA3AF; margin-bottom: 6px; }
.pc-name.w { color: rgba(255,255,255,0.5); }
.pc-price { font-size: 2rem; font-weight: 700; line-height: 1; }
.pc-price.w { color: white; }
.pc-per { font-size: 0.76rem; color: #9CA3AF; margin-top: 3px; margin-bottom: 18px; }
.pc-per.w { color: rgba(255,255,255,0.45); }
.pc-feats { list-style: none; margin-bottom: 20px; }
.pc-feats li { font-size: 0.8rem; padding: 4px 0; border-bottom: 1px solid #F3F4F6; display: flex; gap: 7px; color: #374151; }
.pc-feats li.w { color: rgba(255,255,255,0.8); border-color: rgba(255,255,255,0.1); }
.pc-feats li.dim { color: #D1D5DB; }
.pc-feats li.dimw { color: rgba(255,255,255,0.22); border-color: rgba(255,255,255,0.08); }
.pc-feats li::before { content: '✓'; color: #10B981; font-weight: 700; flex-shrink: 0; }
.pc-feats li.dim::before, .pc-feats li.dimw::before { content: '–'; color: #D1D5DB; }
.btn-pc { display: block; width: 100%; padding: 10px; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 600; border: none; border-radius: 8px; cursor: pointer; text-align: center; text-decoration: none; transition: all 0.15s; }
.btn-pc.dark { background: var(--black); color: white; }
.btn-pc.dark:hover { background: #374151; }
.btn-pc.white { background: white; color: var(--black); }
.btn-pc.white:hover { background: #F9FAFB; }
.btn-pc.out { background: transparent; color: #9CA3AF; border: 1px solid #E5E7EB; }

/* TABLES */
.tbl-wrap { background: white; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden; margin-top: 32px; }
.tbl-wrap table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
.tbl-wrap th { background: var(--black); color: white; padding: 11px 16px; text-align: left; font-weight: 600; font-size: 0.76rem; }
.tbl-wrap td { padding: 11px 16px; border-bottom: 1px solid #F3F4F6; }
.tbl-wrap tr:last-child td { border-bottom: none; background: #F0FDF4; font-weight: 600; }
.tbl-wrap .old { color: #9CA3AF; }
.tbl-wrap .sav { color: #10B981; font-weight: 600; }

/* FAQ */
.faq-wrap { max-width: 660px; margin: 36px auto 0; }
.faq-item { background: white; border: 1px solid #E5E7EB; border-radius: 10px; margin-bottom: 8px; overflow: hidden; }
.faq-q { width: 100%; text-align: left; background: none; border: none; padding: 16px 18px; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 0.9rem; color: var(--black); cursor: pointer; display: flex; justify-content: space-between; gap: 16px; align-items: center; }
.faq-q .tog { color: #9CA3AF; transition: transform 0.2s; flex-shrink: 0; }
.faq-item.open .tog { transform: rotate(45deg); }
.faq-a { display: none; padding: 0 18px 16px; font-size: 0.85rem; color: #6B7280; line-height: 1.7; }
.faq-item.open .faq-a { display: block; }

/* CTA FINAL */
.cta-final { background: var(--black); border-radius: 16px; margin: 0 40px 80px; padding: 60px 40px; text-align: center; }
.cta-final h2 { font-size: clamp(1.5rem, 2.5vw, 2rem); font-weight: 700; color: white; margin-bottom: 12px; }
.cta-final p { color: rgba(255,255,255,0.5); margin-bottom: 28px; }
.cta-btns { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
.btn-cw { background: white; color: var(--black); padding: 12px 22px; font-weight: 600; border-radius: 8px; text-decoration: none; font-size: 0.9rem; display: inline-block; }
.btn-cg { background: rgba(255,255,255,0.1); color: white; padding: 11px 20px; font-weight: 500; border-radius: 8px; text-decoration: none; font-size: 0.86rem; display: inline-block; border: 1px solid rgba(255,255,255,0.18); }

/* FOOTER */
footer { background: var(--black); color: rgba(255,255,255,0.45); padding: 48px 40px 28px; font-size: 0.82rem; }
.ft-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr repeat(3,auto); gap: 40px; }
.ft-logo { font-size: 1.05rem; font-weight: 700; color: white; margin-bottom: 8px; }
.ft-tag { font-size: 0.78rem; line-height: 1.6; max-width: 170px; }
.ft-col h4 { color: rgba(255,255,255,0.75); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; font-weight: 600; }
.ft-col a { display: block; color: rgba(255,255,255,0.45); text-decoration: none; margin-bottom: 7px; transition: color 0.15s; }
.ft-col a:hover { color: white; }
.ft-bottom { max-width: 1100px; margin: 24px auto 0; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; font-size: 0.76rem; }

/* RESPONSIVE */
@media (max-width: 900px) {
  .mlb-hero { flex-direction: column; padding-top: 100px; text-align: center; }
  .mlb-hero-text { max-width: 100%; }
  .mlb-start-btn { margin: 0 auto; }
  .mlb-feature-row { flex-direction: column !important; text-align: center; }
  .mlb-feature-phone { flex: none; }
  .steps-grid { grid-template-columns: repeat(3,1fr); }
  .price-grid { grid-template-columns: repeat(2,1fr); }
  .ft-inner { grid-template-columns: 1fr 1fr; }
  .env-grid { grid-template-columns: 1fr; }
  .rpts-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 600px) {
  .mlb-nav { padding: 14px 20px; }
  .mlb-hero { padding: 90px 20px 40px; }
  .mlb-feature-row { padding: 50px 20px; }
  .rb-section { padding: 60px 20px; }
  .steps-grid { grid-template-columns: 1fr 1fr; }
  .price-grid { grid-template-columns: 1fr; }
  .stats-row { grid-template-columns: 1fr 1fr; }
  .ft-inner { grid-template-columns: 1fr 1fr; }
  .rpts-grid { grid-template-columns: 1fr; }
  .ndis-prob-grid { grid-template-columns: 1fr; }
  .comp-grid { grid-template-columns: 1fr; }
  .cta-final { margin: 0 20px 60px; padding: 40px 20px; }
  .rb-nav { padding: 0 20px; }
  .mlb-wide-text { padding: 50px 20px; }
}
`}</style>
      <div dangerouslySetInnerHTML={{ __html: `

<!-- ================================================
     MY LEARNING BUDDY — Exact screenshot recreation
     ================================================ -->

<!-- NAV -->
<nav class="mlb-nav">
  <a href="#" class="mlb-logo">My<br>Learning<br>Buddy</a>
  <div class="mlb-nav-links">
    <a href="#about">About Us</a>
    <a href="#contact-section">Contact Us</a>
    <a href="https://reading-buddy-8zy68b2nr-troys-projects-t4h-machine.vercel.app/signup" class="mlb-login">Login</a>
  </div>
</nav>

<!-- HERO — white, left text, right phone -->
<section class="mlb-hero">
  <div class="mlb-hero-text">
    <h1>Spark Your Child's Curiosity As They Master Reading</h1>
    <p>Designed for ages 5–8, this safe, distraction-free application uses the phonics approach to help kids learn to read. Instead of points, it rewards their curiosity with answers to their many questions—building confidence and a love for learning.</p>
    <a href="https://reading-buddy-8zy68b2nr-troys-projects-t4h-machine.vercel.app/signup?plan=freemium" class="mlb-start-btn">Start Learning</a>
  </div>
  <div class="mlb-phone-wrap">
    <div class="mlb-phone">
      <div class="phone-notch"></div>
      <div class="phone-content">
        <div class="phone-celebration">
          <div class="confetti-row">
            <span class="confetti-squig" style="color:#4BBFB5">〜</span>
            <span class="confetti-squig" style="color:#F5C346">⌒</span>
            <span class="confetti-squig" style="color:#E5534B">〜</span>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:8px;">
            <span style="color:#4BBFB5;font-size:1.8rem;font-weight:900;font-family:'Caveat',cursive">2</span>
            <span style="color:#F5C346;font-size:1.8rem;font-weight:900;font-family:'Caveat',cursive">y</span>
            <span style="color:#E5534B;font-size:1.8rem;font-weight:900;font-family:'Caveat',cursive">6</span>
          </div>
          <div class="phone-excellent">Excellent!</div>
          <div class="phone-sub">You read 'sat' perfectly</div>
        </div>
        <!-- ABC Characters at bottom -->
        <div class="abc-chars">
          <!-- A -->
          <div style="position:relative;width:58px;height:70px;flex-shrink:0;">
            <svg viewBox="0 0 58 70" width="58" height="70">
              <path d="M29,4 L54,66 L4,66 Z" fill="#E5534B" rx="6"/>
              <text x="29" y="60" text-anchor="middle" font-family="Caveat,cursive" font-size="22" font-weight="700" fill="white">A</text>
              <text x="20" y="48" font-size="7" fill="rgba(0,0,0,0.4)">ˇ ˇ</text>
              <text x="22" y="55" font-size="6" fill="rgba(0,0,0,0.4)"> ⌣ </text>
            </svg>
          </div>
          <!-- B -->
          <div style="position:relative;width:62px;height:78px;flex-shrink:0;">
            <svg viewBox="0 0 62 78" width="62" height="78">
              <rect x="2" y="2" width="58" height="76" fill="#4BBFB5"/>
              <text x="31" y="56" text-anchor="middle" font-family="Caveat,cursive" font-size="34" font-weight="700" fill="white">B</text>
              <text x="18" y="34" font-size="8" fill="rgba(0,0,0,0.35)">- -</text>
              <text x="19" y="43" font-size="7" fill="rgba(0,0,0,0.35)"> ‿ </text>
            </svg>
          </div>
          <!-- C -->
          <div style="position:relative;width:58px;height:64px;flex-shrink:0;">
            <svg viewBox="0 0 58 64" width="58" height="64">
              <rect x="2" y="2" width="54" height="62" fill="#5BB85A"/>
              <text x="29" y="48" text-anchor="middle" font-family="Caveat,cursive" font-size="30" font-weight="700" fill="white">C</text>
              <text x="14" y="26" font-size="7" fill="rgba(0,0,0,0.3)">⌢ ⌢</text>
              <text x="17" y="34" font-size="6" fill="rgba(0,0,0,0.3)">  ⌣  </text>
            </svg>
          </div>
          <!-- D -->
          <div style="position:relative;width:64px;height:60px;flex-shrink:0;">
            <svg viewBox="0 0 64 60" width="64" height="60">
              <ellipse cx="32" cy="40" rx="30" ry="28" fill="#F5C346"/>
              <text x="32" y="50" text-anchor="middle" font-family="Caveat,cursive" font-size="26" font-weight="700" fill="white">D</text>
              <text x="20" y="28" font-size="7" fill="rgba(0,0,0,0.3)">⌢  ⌢</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- YELLOW SECTION 1 — exploration text + phone -->
<section style="background: var(--yellow);">
  <div class="mlb-feature-row">
    <div class="mlb-feature-phone">
      <div class="phone-sm" style="border-color:#111;">
        <div class="phone-sm-notch"></div>
        <div class="phone-sm-content">
          <div style="font-size:0.72rem;color:#555;text-align:center;margin-bottom:14px;font-style:italic;">Ready to start your reading adventure?</div>
          <a href="#" style="background:#E5534B;color:white;border-radius:8px;padding:10px 20px;font-size:0.82rem;font-weight:500;font-family:'DM Sans',sans-serif;text-decoration:none;">Start Reading</a>
          <div class="phone-abc-sm" style="margin-top:20px;">
            <div class="abc-block-sm" style="background:#E5534B;">A</div>
            <div class="abc-block-sm" style="background:#4BBFB5;">B</div>
            <div class="abc-block-sm" style="background:#5BB85A;">C</div>
            <div class="abc-block-sm" style="background:#F5C346;color:#111;">D</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mlb-feature-text">
      <p style="font-size:clamp(1.3rem,2.5vw,1.7rem);line-height:1.5;font-weight:400;margin-bottom:28px;">Give your child the gift of confident reading and the freedom to explore their world.</p>
      <a href="https://reading-buddy-8zy68b2nr-troys-projects-t4h-machine.vercel.app/signup?plan=freemium" style="background:#111;color:white;border-radius:10px;padding:16px 32px;font-size:1rem;font-weight:500;font-family:'DM Sans',sans-serif;text-decoration:none;display:inline-block;">Start Learning</a>
    </div>
  </div>
</section>

<!-- WHITE SECTION — curiosity text + phone -->
<section>
  <div class="mlb-feature-row reverse">
    <div class="mlb-feature-phone">
      <div class="phone-sm">
        <div class="phone-sm-notch"></div>
        <div class="phone-sm-content">
          <div style="text-align:center;">
            <div style="font-size:1rem;font-weight:700;color:#111;margin-bottom:4px;">Excellent!</div>
            <div style="font-size:0.65rem;color:#555;">Brilliant reading! You're a superstar! 🌈</div>
            <div class="phone-abc-sm" style="margin-top:20px;justify-content:center;">
              <div class="abc-block-sm" style="background:#E5534B;">A</div>
              <div class="abc-block-sm" style="background:#4BBFB5;">B</div>
              <div class="abc-block-sm" style="background:#5BB85A;">C</div>
              <div class="abc-block-sm" style="background:#F5C346;color:#111;">D</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mlb-feature-text">
      <p style="font-size:1.05rem;line-height:1.8;margin-bottom:20px;">No points. No gamification. Just pure, unfiltered curiosity driving a deeper love of reading.</p>
      <p style="font-size:1.05rem;line-height:1.8;">Watch your child's confidence soar as they unlock new knowledge and gain the freedom to explore fresh ideas—no judgment, no barriers.</p>
    </div>
  </div>
</section>

<!-- HOW IT WORKS + KEY FEATURES -->
<section>
  <div class="mlb-hiw">
    <h2>How It Works</h2>
    <div class="phone-lg-wrap">
      <div style="position:relative;display:inline-flex;align-items:center;justify-content:center;">
        <div class="phone-lg">
          <div class="phone-lg-notch"></div>
          <div class="phone-lg-content">
            <div class="loading-title">Reading<br>Buddy</div>
            <div class="loading-sub" style="margin-top:8px;">Reading makes your imagination<br>grow bigger and stronger! 🌱</div>
            <div class="loading-sub">Getting everything ready...</div>
            <div class="loading-bar-wrap"><div class="loading-bar"></div></div>
            <div class="phone-abc-sm" style="margin-top:20px;justify-content:center;">
              <div class="abc-block-sm" style="background:#E5534B;width:44px;height:54px;font-size:1.3rem;">A</div>
              <div class="abc-block-sm" style="background:#4BBFB5;width:44px;height:54px;font-size:1.3rem;">B</div>
              <div class="abc-block-sm" style="background:#5BB85A;width:44px;height:54px;font-size:1.3rem;">C</div>
              <div class="abc-block-sm" style="background:#F5C346;color:#111;width:44px;height:54px;font-size:1.3rem;">D</div>
            </div>
          </div>
        </div>
        <div style="position:absolute;width:60px;height:60px;background:#E5534B;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.5rem;">▶</div>
      </div>
    </div>
  </div>
</section>

<!-- FEATURES — alternating -->
<section>
  <div class="mlb-feature-row reverse">
    <div class="mlb-feature-phone">
      <div class="phone-sm">
        <div class="phone-sm-notch"></div>
        <div class="phone-sm-content">
          <div class="phone-word">Dine</div>
          <div class="mic-btn">🎙️</div>
          <div class="mic-label">Press to record</div>
        </div>
      </div>
    </div>
    <div class="mlb-feature-text">
      <p style="font-size:1.1rem;line-height:1.8;margin-bottom:16px;">Reading shouldn't just be about sounding out words—it's a launchpad for boundless exploration.</p>
      <p style="font-size:1rem;line-height:1.8;color:#555;">Our AI-powered reading companion transforms routine practice into a journey of discovery. As your child reads aloud, they receive personalized, gentle guidance tailored to their level. After every three correct answers, they can ask our Learning Buddy anything that sparks their curiosity—about dinosaurs, volcanoes, space, or any other wonder they dream up.</p>
    </div>
  </div>
</section>

<section style="background:#fafafa;">
  <div class="rb-inner" style="max-width:1200px;">
    <h2 style="font-size:1.5rem;font-weight:700;margin-bottom:32px;">Key Features</h2>
    <div class="mlb-feature-row" style="padding:0;gap:40px;">
      <div class="mlb-feature-text">
        <h2>AI-Guided Practice</h2>
        <p style="margin-bottom:0;">Personalized support ensures steady progress and builds strong reading foundations.</p>
      </div>
      <div class="mlb-feature-phone">
        <div class="phone-sm">
          <div class="phone-sm-notch"></div>
          <div class="phone-sm-content">
            <div class="loading-title" style="font-size:1.1rem;">Reading Buddy</div>
            <div class="loading-sub">Getting everything ready...</div>
            <div class="loading-bar-wrap"><div class="loading-bar"></div></div>
          </div>
        </div>
      </div>
    </div>
    <div style="height:40px;"></div>
    <div class="mlb-feature-row reverse" style="padding:0;gap:40px;">
      <div class="mlb-feature-text">
        <h2>Distraction-Free Design</h2>
        <p style="margin-bottom:0;">A clean, ad-free interface keeps the focus on reading and exploration—no gimmicks or pop-ups.</p>
      </div>
      <div class="mlb-feature-phone">
        <div class="phone-sm">
          <div class="phone-sm-notch"></div>
          <div class="phone-sm-content">
            <div style="font-size:0.72rem;color:#555;margin-bottom:16px;">← End Session</div>
            <div class="phone-word">Dine</div>
            <div class="mic-btn" style="width:56px;height:56px;font-size:1.3rem;">⏹</div>
          </div>
        </div>
      </div>
    </div>
    <div style="height:40px;"></div>
    <div class="mlb-feature-row" style="padding:0;gap:40px;">
      <div class="mlb-feature-text">
        <h2>Adaptive Growth</h2>
        <p style="margin-bottom:0;">Difficulty adjusts as your child improves, ensuring they're always challenged—never overwhelmed.</p>
      </div>
      <div class="mlb-feature-phone">
        <div class="phone-sm">
          <div class="phone-sm-notch"></div>
          <div class="phone-sm-content">
            <div class="try-again-circle">Give it<br>another<br>try!</div>
            <div class="brave-text">You're brave for trying! Let's do it again!</div>
          </div>
        </div>
      </div>
    </div>
    <div style="height:40px;"></div>
    <div class="mlb-feature-row reverse" style="padding:0;gap:40px;">
      <div class="mlb-feature-text">
        <h2>Parent Dashboard</h2>
        <p style="margin-bottom:0;">Stay in the loop with real-time progress insights. Discover your child's current reading level and emerging interests.</p>
      </div>
      <div class="mlb-feature-phone">
        <div class="phone-sm">
          <div class="phone-sm-notch"></div>
          <div class="phone-sm-content">
            <div class="donut-title">Reading Accuracy Distribution</div>
            <!-- Simple donut via conic-gradient -->
            <div style="width:80px;height:80px;border-radius:50%;background:conic-gradient(#10B981 0% 60%,#F5C346 60% 75%,#E5534B 75% 100%);margin:0 auto 8px;"></div>
            <div style="font-size:0.62rem;color:#555;text-align:center;margin-bottom:8px;">Sessions</div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;font-size:0.58rem;color:#555;text-align:center;border-top:1px solid #eee;padding-top:4px;">
              <span>3.5 min</span><span>75.0%</span><span>4</span>
              <span style="color:#9CA3AF">Duration</span><span style="color:#9CA3AF">Accuracy</span><span style="color:#9CA3AF">Attempts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CONTACT -->
<section id="contact-section">
  <div class="mlb-contact">
    <h2>Get In Touch</h2>
    <p>Have questions? We're here to help your child succeed</p>
    <div class="contact-field"><label>Name</label><input type="text" placeholder="Enter your name"></div>
    <div class="contact-field"><label>Email</label><input type="email" placeholder="you@example.com"></div>
    <div class="contact-field"><label>Message</label><textarea placeholder="How can we help?"></textarea></div>
    <button class="send-btn">Send Message</button>
  </div>
</section>

<!-- ================================================
     READING BUDDY PRODUCT SITE — starts here
     ================================================ -->

<!-- SECTION DIVIDER -->
<div style="background:#F5C346;padding:40px;text-align:center;">
  <div style="max-width:700px;margin:0 auto;">
    <div style="font-family:'Caveat',cursive;font-size:1.2rem;color:#111;margin-bottom:8px;">For teachers, schools &amp; NDIS providers</div>
    <h2 style="font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;color:#111;margin-bottom:8px;">Reading Buddy for Schools &amp; Providers</h2>
    <p style="color:#555;font-size:0.95rem;margin-bottom:20px;">AI-powered reading intelligence for Australian classrooms and NDIS providers. Automated scoring, reporting, and NDIS documentation.</p>
    <a href="#rb-pricing" style="background:#111;color:white;border-radius:10px;padding:14px 28px;font-size:0.95rem;font-weight:600;text-decoration:none;display:inline-block;">See school &amp; provider plans →</a>
  </div>
</div>

<!-- STICKY NAV -->
<nav class="rb-nav">
  <div class="rb-nav-inner">
    <a href="#" class="rb-logo">📖 Reading Buddy — Schools &amp; NDIS</a>
    <div class="rb-links">
      <a href="#rb-features">Features</a>
      <a href="#rb-ndis">NDIS</a>
      <a href="#rb-pricing">Pricing</a>
      <a href="https://reading-buddy-8zy68b2nr-troys-projects-t4h-machine.vercel.app/signup?plan=freemium" class="rb-cta-btn">Start Free</a>
    </div>
  </div>
</nav>

<!-- STATS + INTRO -->
<div class="rb-section" id="rb-features">
  <div class="rb-inner">
    <span class="rb-eyebrow">🇦🇺 Built for Australian Schools &amp; NDIS Providers</span>
    <h2 class="rb-h2">From reading session to report in under 60 seconds.</h2>
    <p class="rb-lead">Reading Buddy listens, scores, reports, and recommends — automatically, in real time, for every student, in every session.</p>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:32px;">
      <a href="https://reading-buddy-8zy68b2nr-troys-projects-t4h-machine.vercel.app/signup?plan=freemium" class="btn-pc dark" style="width:auto;padding:12px 22px;">Start free — one class</a>
      <a href="https://buy.stripe.com/9B6aEWdQo2GPfFha524ZG0h" class="btn-pc out" style="width:auto;padding:12px 20px;">Start Premium — $59/mo</a>
    </div>
    <div class="stats-row">
      <div class="stat-cell"><div class="stat-num">16×</div><div class="stat-lbl">Book sets replaced</div></div>
      <div class="stat-cell"><div class="stat-num">6 hrs</div><div class="stat-lbl">Saved per teacher/week</div></div>
      <div class="stat-cell"><div class="stat-num">30s</div><div class="stat-lbl">Full session scored</div></div>
      <div class="stat-cell"><div class="stat-num">100%</div><div class="stat-lbl">NDIS compliance</div></div>
    </div>
  </div>
</div>

<!-- BEFORE / AFTER -->
<div class="rb-section rb-bg">
  <div class="rb-inner">
    <span class="rb-eyebrow">Reading assessment has not changed in 30 years. Until now.</span>
    <h2 class="rb-h2">Plastic tubs and clipboards, replaced.</h2>
    <div class="ba-wrap">
      <table>
        <thead><tr><th>Before</th><th></th><th class="g">With Reading Buddy ✓</th></tr></thead>
        <tbody>
          <tr><td class="bef">Plastic tubs of levelled readers<small>$3,000 per series, needs replacing every few years</small></td><td class="arr">→</td><td class="aft">Unlimited digital library, AI-levelled in real time<small>Included in all plans</small></td></tr>
          <tr><td class="bef">Paper running records and clipboards<small>Manual, inconsistent, sits in a binder</small></td><td class="arr">→</td><td class="aft">Automated session capture, every metric scored instantly<small>Zero admin</small></td></tr>
          <tr><td class="bef">Hand-written parent reports<small>1–2 hrs/week, often skipped or generic</small></td><td class="arr">→</td><td class="aft">Plain-English snapshots, auto-generated after every session<small>One click</small></td></tr>
          <tr><td class="bef">Manual NDIS progress notes<small>2–4 hrs/week per provider, inconsistent quality</small></td><td class="arr">→</td><td class="aft">NDIS-aligned progress notes from every session<small>Audit-ready</small></td></tr>
          <tr><td class="bef">End-of-term reading data<small>Retrospective, delayed, static spreadsheets</small></td><td class="arr">→</td><td class="aft">Live growth charts against national benchmarks<small>Real-time</small></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- STEPS -->
<div class="rb-section">
  <div class="rb-inner">
    <span class="rb-eyebrow">The process</span>
    <h2 class="rb-h2">Five steps. Fully automated.</h2>
    <div class="steps-grid">
      <div class="step-card"><div class="step-n">01</div><span class="step-icon">🎙️</span><h3>Student reads aloud</h3><p>Any device. No setup. Session starts in seconds.</p><span class="step-badge">Zero prep</span></div>
      <div class="step-card"><div class="step-n">02</div><span class="step-icon">🤖</span><h3>AI scores instantly</h3><p>WPM, accuracy, prosody, fluency scored in real time.</p><span class="step-badge">&lt; 30 seconds</span></div>
      <div class="step-card"><div class="step-n">03</div><span class="step-icon">📋</span><h3>Reports write themselves</h3><p>Parent snapshot, NDIS note, class summary — all auto-drafted.</p><span class="step-badge">6 report types</span></div>
      <div class="step-card"><div class="step-n">04</div><span class="step-icon">📊</span><h3>Dashboard shows all</h3><p>Teacher, principal, provider — all live, one screen.</p><span class="step-badge">Live data</span></div>
      <div class="step-card"><div class="step-n">05</div><span class="step-icon">📚</span><h3>Books recommended</h3><p>Personalised pick-list per student every session.</p><span class="step-badge">Personalised</span></div>
    </div>
  </div>
</div>

<!-- WORKS EVERYWHERE -->
<div class="rb-section rb-bg">
  <div class="rb-inner">
    <span class="rb-eyebrow">Works everywhere</span>
    <h2 class="rb-h2">Classroom. Clinic. Home. School-wide.</h2>
    <div class="env-grid">
      <div class="env-card"><div style="font-size:1.4rem;margin-bottom:8px;">🏫</div><h3>In the classroom</h3><p>Every student scored. Every session. Teachers get metrics, not marking.</p><a href="https://reading-buddy-8zy68b2nr-troys-projects-t4h-machine.vercel.app/schools/public">See classroom features →</a></div>
      <div class="env-card"><div style="font-size:1.4rem;margin-bottom:8px;">🩺</div><h3>In the clinic</h3><p>NDIS documentation, done. Progress notes, goals tracked, evidence generated.</p><a href="https://reading-buddy-8zy68b2nr-troys-projects-t4h-machine.vercel.app/ndis">See NDIS mode →</a></div>
      <div class="env-card"><div style="font-size:1.4rem;margin-bottom:8px;">🏠</div><h3>At home</h3><p>Plain-English snapshots after every session. What to practise, how they're going.</p><a href="https://reading-buddy-8zy68b2nr-troys-projects-t4h-machine.vercel.app/signup?plan=freemium">Start free trial →</a></div>
      <div class="env-card"><div style="font-size:1.4rem;margin-bottom:8px;">🏢</div><h3>Across the school</h3><p>Principals see every classroom live. No data requests, no waiting for term reports.</p><a href="https://reading-buddy-8zy68b2nr-troys-projects-t4h-machine.vercel.app/contact?plan=school">See school plan →</a></div>
    </div>
  </div>
</div>

<!-- SIX REPORTS -->
<div class="rb-section">
  <div class="rb-inner">
    <span class="rb-eyebrow">AI reports</span>
    <h2 class="rb-h2">Six reports. All automatic. All from one session.</h2>
    <div class="rpts-grid">
      <div class="rpt-card"><span class="ri">🤖</span><h4>Session summary</h4><p>WPM, accuracy, prosody, reading age estimate, and intervention flags. Instant.</p></div>
      <div class="rpt-card"><span class="ri">📈</span><h4>Growth trajectory</h4><p>Month-over-month growth against national benchmarks. Exportable PDF.</p></div>
      <div class="rpt-card"><span class="ri">📋</span><h4>NDIS progress note</h4><p>Goal-referenced, Practice Standards aligned, timestamped. One-minute review.</p></div>
      <div class="rpt-card"><span class="ri">👨‍👩‍👧</span><h4>Parent snapshot</h4><p>Plain-English summary of session, progress, and what to practise at home.</p></div>
      <div class="rpt-card"><span class="ri">🏫</span><h4>Class health report</h4><p>Every student in one view. Colour-coded alerts. On track / needs intervention.</p></div>
      <div class="rpt-card"><span class="ri">📚</span><h4>Book recommendations</h4><p>Personalised reading list based on level, history, and interests. Every session.</p></div>
    </div>
  </div>
</div>

<!-- NDIS -->
<div class="rb-section rb-bg" id="rb-ndis">
  <div class="rb-inner">
    <span class="rb-eyebrow">NDIS Mode · Australian Compliance</span>
    <h2 class="rb-h2">NDIS documentation. Automated.</h2>
    <p class="rb-lead">Compliant progress notes, goal tracking, and plan review evidence — automatically, from every reading session.</p>
    <div class="ndis-checks">
      <span>✓ Goal-aligned progress tracking</span>
      <span>✓ Compliant session notes</span>
      <span>✓ Participant-level dashboards</span>
      <span>✓ Provider reporting exports</span>
      <span>✓ Multi-participant management</span>
      <span>✓ Australian data sovereignty</span>
    </div>
    <div class="ndis-prob-grid">
      <div class="ndis-prob"><h3>⏱ Hours of manual note-writing</h3><p>Therapists spend 2–4 hours/week writing notes that could be generated in seconds.</p></div>
      <div class="ndis-prob"><h3>📋 Inconsistent evidence</h3><p>Manual notes vary by practitioner, shift, and workload. Auditors flag gaps.</p></div>
      <div class="ndis-prob"><h3>📁 No data continuity</h3><p>When a participant changes provider, reading history is lost or inaccessible.</p></div>
      <div class="ndis-prob"><h3>💸 Billing hours lost to admin</h3><p>Every hour on paperwork is an hour not billed. Documentation cuts into viability.</p></div>
    </div>
    <h3 style="font-size:1rem;font-weight:700;margin:32px 0 14px;">Provider workflow — session to evidence report, fully automated</h3>
    <div class="workflow">
      <div class="wf-step"><div class="wf-num">01</div><div><h3>Onboard participants in minutes</h3><p>Add participants, link NDIS goals, set reading benchmarks from national standards or custom targets.</p></div></div>
      <div class="wf-step"><div class="wf-num">02</div><div><h3>Run a reading session</h3><p>Participant reads aloud. Reading Buddy captures WPM, accuracy, prosody, and comprehension in real time. No manual scoring.</p></div></div>
      <div class="wf-step"><div class="wf-num">03</div><div><h3>Review the AI-generated note</h3><p>Draft progress note is ready the moment the session ends. Already aligned to the participant's NDIS goals.</p></div></div>
      <div class="wf-step"><div class="wf-num">04</div><div><h3>Approve and file</h3><p>One click to approve and store. Timestamped, audit-ready, linked to the session recording.</p></div></div>
      <div class="wf-step"><div class="wf-num">05</div><div><h3>Generate a plan review report</h3><p>Select the date range. Full evidence report generated — goal progress, reading gains, intervention records, outcomes.</p></div></div>
      <div class="wf-step"><div class="wf-num">06</div><div><h3>Share with participants and families</h3><p>Plain-English snapshots to families. Detailed clinical notes stay with the provider. Both auto-generated.</p></div></div>
    </div>
    <h3 style="font-size:1rem;font-weight:700;margin:32px 0 14px;">Built for Australian compliance</h3>
    <div class="comp-grid">
      <div class="comp-card"><span class="comp-icon">✅</span><div><h4>NDIS Practice Standards aligned</h4><p>Notes and evidence structured to meet Practice Standards for registered providers.</p></div></div>
      <div class="comp-card"><span class="comp-icon">🔒</span><div><h4>Australian data sovereignty</h4><p>All data stored in Australian data centres. No overseas transfer. APPs compliant.</p></div></div>
      <div class="comp-card"><span class="comp-icon">📝</span><div><h4>Audit-ready records</h4><p>Every note is timestamped, versioned, and linked to the session. Audit trails automatic.</p></div></div>
      <div class="comp-card"><span class="comp-icon">🎯</span><div><h4>Goal-referenced outcomes</h4><p>Reports show progress against the participant's actual NDIS goals — not generic metrics.</p></div></div>
    </div>
  </div>
</div>

<!-- PRICING -->
<div class="rb-section" id="rb-pricing">
  <div class="rb-inner">
    <div style="text-align:center;">
      <span class="rb-eyebrow">Value-based pricing · No lock-in · Cancel anytime</span>
      <h2 class="rb-h2">Less than one book set.<br>More than a full-time coordinator.</h2>
    </div>
    <div class="price-grid">
      <div class="pc">
        <div class="pc-name">Freemium</div>
        <div class="pc-price">Free</div>
        <div class="pc-per">Try with one class — no strings</div>
        <ul class="pc-feats">
          <li>1 classroom, unlimited students</li>
          <li>Core metrics (WPM, accuracy, prosody)</li>
          <li>Basic teacher snapshots</li>
          <li>3 months data retention</li>
          <li class="dim">Parent reports</li>
          <li class="dim">NDIS mode</li>
          <li class="dim">Growth charts</li>
        </ul>
        <a href="https://reading-buddy-8zy68b2nr-troys-projects-t4h-machine.vercel.app/signup?plan=freemium" class="btn-pc dark">Get Started Free</a>
      </div>
      <div class="pc feat">
        <div class="pop">⭐ Most Popular</div>
        <div class="pc-name w">Premium Classroom</div>
        <div class="pc-price w">$59<span style="font-size:1rem">/mo</span></div>
        <div class="pc-per w">or $590/yr (save 17%)</div>
        <ul class="pc-feats">
          <li class="w">1 classroom, unlimited students</li>
          <li class="w">Full metrics + growth charts</li>
          <li class="w">Teacher + parent one-click snapshots</li>
          <li class="w">AI book recommendations</li>
          <li class="w">NDIS mode (full)</li>
          <li class="w">12 months data retention</li>
          <li class="dimw">Multi-classroom dashboard</li>
        </ul>
        <a href="https://buy.stripe.com/9B6aEWdQo2GPfFha524ZG0h" class="btn-pc white">Start Free Trial</a>
      </div>
      <div class="pc">
        <div class="pc-name">Premium School</div>
        <div class="pc-price">$4,900<span style="font-size:0.9rem">/yr</span></div>
        <div class="pc-per">16 book sets = $48,000. This is $4,900.</div>
        <ul class="pc-feats">
          <li>Up to 10 classrooms (+$590/extra/yr)</li>
          <li>School-wide literacy dashboard</li>
          <li>All Premium Classroom features</li>
          <li>Basic LMS / SIS integrations</li>
          <li>12 months data retention</li>
          <li class="dim">Multi-site analytics</li>
        </ul>
        <a href="https://buy.stripe.com/fZufZgeUsa9hbp1dhe4ZG0j" class="btn-pc dark">Start School Plan</a>
      </div>
      <div class="pc">
        <div class="pc-name">Enterprise</div>
        <div class="pc-price" style="font-size:1.5rem;">From $35k<span style="font-size:0.85rem">/yr</span></div>
        <div class="pc-per">A coordinator costs $90–110k/yr.</div>
        <ul class="pc-feats">
          <li>Unlimited schools &amp; sites</li>
          <li>Custom integrations (LMS, SIS, NDIS)</li>
          <li>Governance &amp; compliance dashboards</li>
          <li>Multi-site analytics</li>
          <li>Unlimited data retention</li>
          <li>Phone support + onboarding</li>
        </ul>
        <a href="https://reading-buddy-8zy68b2nr-troys-projects-t4h-machine.vercel.app/contact?plan=enterprise" class="btn-pc out">Contact Sales →</a>
      </div>
    </div>

    <div class="tbl-wrap">
      <table>
        <thead><tr><th>Cost item</th><th>Traditional</th><th>Reading Buddy</th><th>Annual saving</th></tr></thead>
        <tbody>
          <tr><td>Book series (4 grades × 4 sets)</td><td class="old">$48,000 (~$9,600/yr)</td><td>Included</td><td class="sav">~$9,600/yr</td></tr>
          <tr><td>Levelling &amp; tracking admin</td><td class="old">~$8,000/yr</td><td>Automated</td><td class="sav">~$8,000/yr</td></tr>
          <tr><td>Parent report writing</td><td class="old">~$4,000/yr</td><td>One-click</td><td class="sav">~$4,000/yr</td></tr>
          <tr><td>NDIS documentation</td><td class="old">~$6,000/yr</td><td>One-click</td><td class="sav">~$6,000/yr</td></tr>
          <tr><td>Book replacement &amp; updates</td><td class="old">$5,000–10,000/yr</td><td>$0</td><td class="sav">~$7,500/yr</td></tr>
          <tr><td><strong>Total (conservative)</strong></td><td>~$75,000/yr</td><td>$4,900/yr</td><td class="sav">&gt;$70,000/yr saved</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- FAQ -->
<div class="rb-section rb-bg">
  <div class="rb-inner">
    <div style="text-align:center;"><span class="rb-eyebrow">Common questions</span><h2 class="rb-h2">Quick answers.</h2></div>
    <div class="faq-wrap">
      <div class="faq-item"><button class="faq-q" onclick="this.closest('.faq-item').classList.toggle('open')">Why is this cheaper than physical books? <span class="tog">+</span></button><div class="faq-a">Physical books cost $3,000 per series and need replacing every few years. Reading Buddy is digital, adaptive, and always current — one subscription covers all levels, all students, all year.</div></div>
      <div class="faq-item"><button class="faq-q" onclick="this.closest('.faq-item').classList.toggle('open')">Does it replace a reading coordinator? <span class="tog">+</span></button><div class="faq-a">For many schools, partly or fully. Tracking, levelling, reporting, parent comms, and NDIS documentation are all automated. Coordinators focus on high-value intervention, not admin.</div></div>
      <div class="faq-item"><button class="faq-q" onclick="this.closest('.faq-item').classList.toggle('open')">Is there a free trial for Premium? <span class="tog">+</span></button><div class="faq-a">Yes — all Premium plans include a 14-day free trial. No credit card required.</div></div>
      <div class="faq-item"><button class="faq-q" onclick="this.closest('.faq-item').classList.toggle('open')">What is NDIS mode? <span class="tog">+</span></button><div class="faq-a">NDIS mode generates compliant progress notes and evidence reports for plan reviews. Designed with Australian NDIS providers, aligned to NDIS Practice Standards out of the box.</div></div>
      <div class="faq-item"><button class="faq-q" onclick="this.closest('.faq-item').classList.toggle('open')">Is student data stored in Australia? <span class="tog">+</span></button><div class="faq-a">Yes. All data stored in Australian data centres, encrypted at rest and in transit, compliant with the Australian Privacy Act.</div></div>
    </div>
  </div>
</div>

<!-- FINAL CTA -->
<div class="rb-section" style="padding-bottom:0;">
  <div class="cta-final">
    <h2>The future of reading is not plastic tubs and paper records.</h2>
    <p>Start free with one classroom. No credit card. No setup. Results from session one.</p>
    <div class="cta-btns">
      <a href="https://reading-buddy-8zy68b2nr-troys-projects-t4h-machine.vercel.app/signup?plan=freemium" class="btn-cw">Start free — one class</a>
      <a href="https://buy.stripe.com/9B6aEWdQo2GPfFha524ZG0h" class="btn-cg">Start Premium — $59/mo</a>
      <a href="https://reading-buddy-8zy68b2nr-troys-projects-t4h-machine.vercel.app/contact?plan=enterprise" class="btn-cg">Talk to sales →</a>
    </div>
  </div>
</div>

<!-- FOOTER -->
<footer>
  <div class="ft-inner">
    <div>
      <div class="ft-logo">📖 Reading Buddy</div>
      <div class="ft-tag">AI-powered reading intelligence for Australian schools and NDIS providers.</div>
      <div style="margin-top:10px;font-size:0.75rem;">Tech 4 Humanity Pty Ltd · ABN 61 605 746 618</div>
    </div>
    <div class="ft-col">
      <h4>Product</h4>
      <a href="https://reading-buddy-8zy68b2nr-troys-projects-t4h-machine.vercel.app/features">Features</a>
      <a href="#rb-pricing">Pricing</a>
      <a href="https://reading-buddy-8zy68b2nr-troys-projects-t4h-machine.vercel.app/ndis">NDIS Mode</a>
      <a href="https://reading-buddy-8zy68b2nr-troys-projects-t4h-machine.vercel.app/schools/public">Public Schools</a>
      <a href="https://reading-buddy-8zy68b2nr-troys-projects-t4h-machine.vercel.app/about">About</a>
    </div>
    <div class="ft-col">
      <h4>Get Started</h4>
      <a href="https://reading-buddy-8zy68b2nr-troys-projects-t4h-machine.vercel.app/signup?plan=freemium">Free trial</a>
      <a href="https://buy.stripe.com/9B6aEWdQo2GPfFha524ZG0h">Premium</a>
      <a href="https://reading-buddy-8zy68b2nr-troys-projects-t4h-machine.vercel.app/contact?plan=school">School plan</a>
      <a href="https://reading-buddy-8zy68b2nr-troys-projects-t4h-machine.vercel.app/contact?plan=enterprise">Enterprise</a>
    </div>
    <div class="ft-col">
      <h4>Legal</h4>
      <a href="https://reading-buddy-8zy68b2nr-troys-projects-t4h-machine.vercel.app/privacy">Privacy Policy</a>
      <a href="https://reading-buddy-8zy68b2nr-troys-projects-t4h-machine.vercel.app/terms">Terms of Service</a>
      <a href="https://reading-buddy-8zy68b2nr-troys-projects-t4h-machine.vercel.app/contact">Contact</a>
    </div>
  </div>
  <div class="ft-bottom">
    <div>© 2026 Tech 4 Humanity Pty Ltd. All rights reserved.</div>
    <div>🇦🇺 Built in Australia</div>
  </div>
</footer>

` }} />
    </>
  )
}
