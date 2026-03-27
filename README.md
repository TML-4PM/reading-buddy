# 📖 Reading Buddy by Outcome Ready

> AI-powered reading intelligence for Australian schools and NDIS providers.

[![Live](https://img.shields.io/badge/status-live-brightgreen)](https://reading-buddy-by-outcome-ready.vercel.app)
[![Vercel](https://img.shields.io/badge/hosted-Vercel-black)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-lzfgigiyqpuuxslsygjt-3ECF8E)](https://supabase.com)
[![ABN](https://img.shields.io/badge/ABN-70%20666%20271%20272-blue)](https://abr.business.gov.au)

---

## 🌐 Live URLs

| Surface | URL | Status |
|---|---|---|
| **Main site** | https://reading-buddy-by-outcome-ready.vercel.app | ✅ LIVE |
| **Free trial signup** | https://reading-buddy-by-outcome-ready.vercel.app/signup | ✅ LIVE |
| **Marketing microsite** | https://reading-buddy-by-outcome-ready.vercel.app/marketing | ✅ LIVE |
| **Kids learning weblet** | https://reading-buddy-by-outcome-ready.vercel.app/learn | ✅ LIVE |
| **OutcomeReady (co-brand)** | https://outcome-ready-c8dt6jqga-troys-projects-t4h-machine.vercel.app | ✅ LIVE |

---

## 🏗️ Architecture

```
reading-buddy/
├── app/
│   ├── page.tsx              # Main marketing site — hero, features, pricing, weblet
│   ├── page.css              # Unified teal/amber design system
│   ├── layout.tsx            # Next.js App Router layout + AHC droid favicon
│   ├── signup/
│   │   └── page.tsx          # No-card free trial signup → cap_leads + SES
│   ├── marketing/
│   │   └── page.tsx          # learningbuddy.vercel.app style phonics app page
│   ├── learn/
│   │   └── page.tsx          # Interactive kids alphabet weblet
│   ├── pricing/page.tsx      # Pricing page
│   ├── features/page.tsx     # Features
│   ├── ndis/page.tsx         # NDIS mode
│   ├── about/page.tsx        # About
│   ├── contact/page.tsx      # Contact
│   ├── schools/
│   │   ├── public/page.tsx   # Public schools
│   │   └── private/page.tsx  # Private schools
│   └── api/
│       ├── lead/route.ts     # Lead capture API
│       └── start/route.ts    # Session start API
├── components/
│   ├── Nav.tsx               # Navigation component
│   └── FooterSweetSpots.tsx  # Footer component
├── public/
│   ├── droid.png             # Reading Buddy AI droid mascot
│   ├── favicon.webp          # AHC droid head favicon (Supabase storage)
│   ├── favicon.svg           # SVG favicon fallback
│   ├── scene-classroom.png   # Classroom scene image
│   ├── scene-ndis.png        # NDIS clinic scene
│   ├── scene-principal.png   # Principal dashboard scene
│   └── scene-home.png        # Home reading scene
├── package.json
├── next.config.js
├── tsconfig.json
├── README.md                 # This file
├── CAMPAIGN.md               # Campaign operations guide
├── SUPABASE.md               # Supabase schema reference
└── DEPLOY.md                 # Deployment runbook
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14.2 (App Router) |
| Language | TypeScript 5 |
| Styling | CSS variables + custom design system (no Tailwind) |
| Fonts | Nunito (UI) · Lato (body) · Quicksand (kids weblet) · Caveat (marketing) |
| Commerce | Stripe (monthly/annual/school plans) |
| Database | Supabase PostgreSQL (`lzfgigiyqpuuxslsygjt`) |
| Email | AWS SES via `troy-ses-sender` Lambda |
| Hosting | Vercel (team: `team_IKIr2Kcs38KGo8Zs60yNtm7Y`) |
| Images | Unsplash (kids/teachers) + Supabase Storage (droid assets) |

---

## 💰 Pricing Plans

| Plan | Price | Stripe |
|---|---|---|
| Freemium | Free | No checkout — mailto |
| Premium Classroom | $59/mo | `buy.stripe.com/9B6aEWdQo2GPfFha524ZG0h` |
| Premium Annual | $590/yr | `buy.stripe.com/fZubJ013C3KTgJl2CA4ZG0i` |
| Premium School | $4,900/yr | `buy.stripe.com/fZufZgeUsa9hbp1dhe4ZG0j` |
| Enterprise | From $35k | Contact sales |

All trial plans route to `/signup` — **no credit card required**.

---

## 🚀 Free Trial Signup Flow

`/signup?plan=[freemium|premium_monthly|premium_annual|school]`

1. User fills: name, email, school/org, role, state, class size, referral source
2. `cap_leads` row inserted via bridge (`troy-sql-executor`)
3. SES confirmation email → user
4. SES notification → `readingbuddies@outcome-ready.com`
5. Database trigger `trg_notify_rb_signup` fires on INSERT

No Stripe involved. No credit card. Setup within 24 hours.

---

## 🎨 Design System

```css
--teal:        #1D6E63   /* primary */
--teal-mid:    #2A9D8F   /* hover */
--teal-light:  #A8DADC   /* borders */
--teal-pale:   #E8F6F5   /* backgrounds */
--amber:       #F4A261   /* accent / CTA */
--amber-dark:  #E07B3C   /* amber hover */
--cream:       #FFF8F2   /* page background */
--navy:        #1A2744   /* headings */
--navy-mid:    #2C3E60   /* body text */
--muted:       #6B7A99   /* secondary text */
```

---

## 🔧 Local Development

```bash
git clone https://github.com/TML-4PM/reading-buddy
cd reading-buddy
npm install
npm run dev
# → http://localhost:3000
```

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://lzfgigiyqpuuxslsygjt.supabase.co
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=rk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_RB_LINK_MONTHLY=https://buy.stripe.com/9B6aEWdQo2GPfFha524ZG0h
NEXT_PUBLIC_RB_LINK_ANNUAL=https://buy.stripe.com/fZubJ013C3KTgJl2CA4ZG0i
NEXT_PUBLIC_RB_LINK_SCHOOL=https://buy.stripe.com/fZufZgeUsa9hbp1dhe4ZG0j
```

---

## 📦 Deployment

Deployed via Vercel connected to `TML-4PM/reading-buddy` GitHub repo.  
Every push to `main` triggers an automatic build.

```bash
# Force redeploy (bridge)
POST https://m5oqj21chd.execute-api.ap-southeast-2.amazonaws.com/lambda/invoke
x-api-key: bk_tOH8P5WD3mxBKfICa4yI56vJhpuYOynfdf1d_GfvdK4
{"fn":"troy-sql-executor","route":"sql","sql":"..."}
```

**Vercel project:** `prj_8w7AoZqaFeeMhlsPacjjNiWfGlkX`  
**Alias:** `reading-buddy-by-outcome-ready.vercel.app`  
**Team:** `team_IKIr2Kcs38KGo8Zs60yNtm7Y`

---

## 🏢 Entity

**Tech 4 Humanity Pty Ltd**  
ABN: 70 666 271 272  
Contact: readingbuddies@outcome-ready.com  
Built in Australia 🇦🇺 · Data stored in Australian data centres · Privacy Act compliant
