# 🚀 Reading Buddy — Deployment Runbook

> Vercel Project: `reading-buddy-by-outcome-ready`  
> Project ID: `prj_8w7AoZqaFeeMhlsPacjjNiWfGlkX`  
> Team: `team_IKIr2Kcs38KGo8Zs60yNtm7Y`  
> GitHub: `TML-4PM/reading-buddy` (main branch)  
> Alias: `reading-buddy-by-outcome-ready.vercel.app`

---

## Standard Deploy (Git push → auto-build)

```bash
git add .
git commit -m "feat: your change"
git push origin main
# Vercel auto-deploys in ~60-90 seconds
```

---

## Force Deploy via Bridge

```bash
curl -X POST \
  https://m5oqj21chd.execute-api.ap-southeast-2.amazonaws.com/lambda/invoke \
  -H "x-api-key: bk_tOH8P5WD3mxBKfICa4yI56vJhpuYOynfdf1d_GfvdK4" \
  -H "Content-Type: application/json" \
  -d '{
    "fn": "troy-sql-executor",
    "route": "sql",
    "sql": "SELECT value FROM cap_secrets WHERE key = '"'"'GITHUB_PAT'"'"'"
  }'
```

Then trigger Vercel deploy via API:
```bash
curl -X POST \
  "https://api.vercel.com/v13/deployments?forceNew=1" \
  -H "Authorization: Bearer <VERCEL_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "reading-buddy-by-outcome-ready",
    "gitSource": {
      "type": "github",
      "repoId": "1193302208",
      "ref": "main"
    }
  }'
```

---

## Promote to Alias

```bash
curl -X POST \
  "https://api.vercel.com/v2/deployments/<DEPLOY_ID>/aliases" \
  -H "Authorization: Bearer <VERCEL_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"alias": "reading-buddy-by-outcome-ready.vercel.app"}'
```

---

## Environment Variables (Vercel)

Set via Vercel dashboard → Project → Settings → Environment Variables.

| Key | Where used |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase client |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe.js |
| `STRIPE_SECRET_KEY` | Server-side Stripe |
| `STRIPE_WEBHOOK_SECRET` | Webhook verification |
| `NEXT_PUBLIC_RB_LINK_MONTHLY` | Pricing CTA |
| `NEXT_PUBLIC_RB_LINK_ANNUAL` | Pricing CTA |
| `NEXT_PUBLIC_RB_LINK_SCHOOL` | Pricing CTA |

---

## Route Verification

After every deploy, verify:

```bash
BASE="https://reading-buddy-by-outcome-ready.vercel.app"
for path in "" "/signup" "/signup?plan=premium_monthly" "/signup?plan=school" "/marketing" "/learn" "/pricing" "/favicon.webp" "/droid.png"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$path")
  echo "$path → $STATUS"
done
```

Expected: all `200`.

---

## Rollback

```bash
# List recent deployments
curl -H "Authorization: Bearer <VERCEL_TOKEN>" \
  "https://api.vercel.com/v6/deployments?projectId=prj_8w7AoZqaFeeMhlsPacjjNiWfGlkX&limit=5"

# Promote a previous deployment
curl -X POST \
  "https://api.vercel.com/v2/deployments/<PREVIOUS_DEPLOY_ID>/aliases" \
  -H "Authorization: Bearer <VERCEL_TOKEN>" \
  -d '{"alias": "reading-buddy-by-outcome-ready.vercel.app"}'
```

---

## GitHub PAT

PAT is stored in `cap_secrets.GITHUB_PAT`. Expires **2026-06-17**.  
Renew at: https://github.com/settings/tokens  
Update after renewal:

```sql
UPDATE cap_secrets SET value = '<new_pat>' WHERE key = 'GITHUB_PAT';
```

---

## Key Files to Know

| File | Purpose |
|---|---|
| `app/page.tsx` | Main site — edit here for homepage changes |
| `app/signup/page.tsx` | Free trial form — edit here for signup flow |
| `app/marketing/page.tsx` | App marketing page |
| `app/learn/page.tsx` | Kids weblet |
| `app/page.css` | All CSS variables and shared styles |
| `app/layout.tsx` | Metadata, favicon, fonts |
| `public/favicon.webp` | AHC droid head (from Supabase storage) |
| `public/droid.png` | Droid mascot used in hero + weblet |
## Deploy 2026-03-30T08:32:53Z
- app/read/page.tsx — AI running record capture UI
- app/api/read/presign/route.ts — S3 pre-signed upload
- app/api/read/process/route.ts — Lambda async trigger
- AWS SDK deps added to package.json

