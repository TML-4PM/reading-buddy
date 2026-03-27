# 📣 Reading Buddy — Campaign Operations Guide

> Owner: Sofia Rodriguez, Chief Sales Officer, WorkFamilyAI  
> Co-brand: OutcomeReady (OUTRD)  
> Wave: 10 · Loop: ON · Cadence: Daily

---

## Campaign Registry

| Field | Value |
|---|---|
| RB Campaign slug | `rb-launch-2026` |
| OR Campaign slug | `or-rb-launch-2026` |
| Status | `active` |
| Start date | 2026-03-28 |
| Contact | readingbuddies@outcome-ready.com |
| ABN | 70 666 271 272 |

---

## Social Post Schedule

12 posts queued. 9 LinkedIn + 3 email. Staggered daily.

| Date | Platform | Preview |
|---|---|---|
| 2026-03-28 | LinkedIn | 🧠✨ Did you know? Your brain is like a superhero when you read! |
| 2026-03-29 | LinkedIn | 📊 Reading assessment hasn't changed in 30 years. Until now. |
| 2026-03-30 | LinkedIn | 🏫 A full-time reading coordinator costs $90–110k/yr... |
| 2026-03-31 | LinkedIn | 🎯 Every time a student reads, 6 reports generate automatically... |
| 2026-04-01 | Email | Subject: Your reading coordinator costs $100k/yr. This costs $4,900. |
| 2026-04-02 | Email | Subject: Spark your child's curiosity as they master reading |
| 2026-04-03 | LinkedIn | 🎯 OutcomeReady + Reading Buddy = the complete Australian literacy stack |
| 2026-04-04 | LinkedIn | 📋 Stop rejected NDIS claims... |
| 2026-04-05 | LinkedIn | 🇦🇺 Built in Australia. Stored in Australia. Compliant with Privacy Act. |
| 2026-04-06 | Email | Subject: NDIS documentation that writes itself |
| 2026-04-07 | LinkedIn | 📣 Sofia Rodriguez, Chief Sales Officer @ WorkFamily AI... |
| 2026-04-08 | LinkedIn | 🚀 Reading Buddy is live. AI reading intelligence for Australian schools. |

### Query scheduled posts
```sql
SELECT platform, scheduled_for::date as date, status, LEFT(content,100) as preview
FROM cap_social_posts
WHERE campaign_id IN (
  SELECT id FROM cap_campaigns
  WHERE slug IN ('rb-launch-2026','or-rb-launch-2026')
)
ORDER BY scheduled_for;
```

### Mark a post as sent
```sql
UPDATE cap_social_posts
SET status = 'sent', posted_at = NOW()
WHERE id = '<post_uuid>';
```

---

## Sofia Rodriguez Agent

```sql
SELECT * FROM t4h_campaign_agents WHERE agent_name = 'Sofia Rodriguez';
```

| Field | Value |
|---|---|
| Pod | Outbound |
| Role | Chief Sales Officer |
| Scope | WFAI\|OUTRD |
| Trigger | Scheduled · Daily |
| Input | cap_social_posts |
| Output | cap_leads |
| Status | active |

---

## Lead Capture

New leads from `/signup` write to `cap_leads` with:
- `lead_source = 'reading-buddy-signup'`
- `notes` JSON: `{ plan, state, students, hear, campaign }`

Database trigger `trg_notify_rb_signup` fires SES notification on every INSERT.

### Monitor leads
```sql
SELECT
  first_name, last_name, email, organisation, role,
  notes->>'plan' as plan,
  notes->>'state' as state,
  created_at
FROM cap_leads
WHERE lead_source = 'reading-buddy-signup'
ORDER BY created_at DESC
LIMIT 50;
```

---

## Lambda Functions

| Function | Status | Trigger | Description |
|---|---|---|---|
| `rb-signup-handler` | ACTIVE | WEBHOOK | No-card signup → cap_leads + SES |
| `rb-lead-notifier` | ACTIVE | WEBHOOK | SES alert on new lead |
| `rb-campaign-poster` | CODE_READY | EVENTBRIDGE | Posts to LinkedIn/email *(needs LinkedIn API key)* |

### Invoke via bridge
```json
POST https://m5oqj21chd.execute-api.ap-southeast-2.amazonaws.com/lambda/invoke
x-api-key: bk_tOH8P5WD3mxBKfICa4yI56vJhpuYOynfdf1d_GfvdK4

{ "fn": "rb-signup-handler", "action": "process" }
```

---

## Blockers

| Blocker | What's needed | Impact |
|---|---|---|
| LinkedIn API key | `LINKEDIN_ACCESS_TOKEN` in cap_secrets | Posts auto-publish (currently manual) |
| `rb-campaign-poster` deploy | LinkedIn creds → deploy Lambda | Full autonomous loop |

### Wire LinkedIn when ready
```sql
INSERT INTO cap_secrets (key, value)
VALUES ('LINKEDIN_ACCESS_TOKEN', '<token>')
ON CONFLICT (key) DO UPDATE SET value = '<token>';
```

---

## Stripe Checkout Links

| Plan | Monthly/Annual | Link |
|---|---|---|
| Premium Classroom | $59/mo | `https://buy.stripe.com/9B6aEWdQo2GPfFha524ZG0h` |
| Premium Annual | $590/yr | `https://buy.stripe.com/fZubJ013C3KTgJl2CA4ZG0i` |
| Premium School | $4,900/yr | `https://buy.stripe.com/fZufZgeUsa9hbp1dhe4ZG0j` |

---

## Command Centre Queries (page: `reading-buddy`)

| Key | Description |
|---|---|
| `rb_campaign_overview` | Campaign status + posts queued/sent |
| `rb_post_schedule` | Full social post schedule |
| `rb_leads_funnel` | Signup leads by status |
| `rb_site_health` | All 4 Vercel routes + HTTP status |
| `rb_sofia_agent` | Agent config and status |
