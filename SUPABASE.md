# 🗄️ Reading Buddy — Supabase Reference

> Project: `lzfgigiyqpuuxslsygjt`  
> Region: `ap-southeast-2`  
> Service URL: `https://lzfgigiyqpuuxslsygjt.supabase.co`

---

## Bridge (single execution engine)

All database operations go through the T4H bridge:

```
URL:     https://m5oqj21chd.execute-api.ap-southeast-2.amazonaws.com/lambda/invoke
Header:  x-api-key: bk_tOH8P5WD3mxBKfICa4yI56vJhpuYOynfdf1d_GfvdK4
Method:  POST

Envelope:
{
  "fn": "troy-sql-executor",
  "route": "sql",
  "sql": "SELECT ..."
}
```

Fallback — Supabase REST direct:
```
POST https://lzfgigiyqpuuxslsygjt.supabase.co/rest/v1/rpc/exec_sql
apikey: <service_role_key>
{ "query": "SELECT ..." }
```

---

## Tables Used by Reading Buddy

### `cap_campaigns`
Stores the two active campaigns.

```sql
SELECT * FROM cap_campaigns
WHERE slug IN ('rb-launch-2026', 'or-rb-launch-2026');
```

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| name | text | Campaign display name |
| slug | text | Unique identifier |
| status | text | `active` \| `paused` \| `complete` |
| landing_page_url | text | Primary site URL |
| product_price | numeric | Base price |
| settings | jsonb | owner, wave, co_brand, urls, Stripe links |
| start_date | date | |
| created_at | timestamptz | |

### `cap_social_posts`
12 posts queued across LinkedIn + email.

```sql
SELECT platform, scheduled_for::date, status, LEFT(content, 120)
FROM cap_social_posts
WHERE campaign_id IN (
  SELECT id FROM cap_campaigns
  WHERE slug IN ('rb-launch-2026', 'or-rb-launch-2026')
)
ORDER BY scheduled_for;
```

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| campaign_id | uuid | FK → cap_campaigns.id |
| platform | text | `linkedin` \| `email` |
| content | text | Full post copy |
| link_url | text | Destination URL |
| scheduled_for | timestamptz | Post date |
| status | text | `queued` \| `sent` \| `failed` |
| posted_at | timestamptz | Actual send time |
| engagement | jsonb | Likes, clicks etc |

### `cap_leads`
All free trial signups land here.

```sql
SELECT first_name, last_name, email, organisation, role,
       notes->>'plan' as plan, created_at
FROM cap_leads
WHERE lead_source = 'reading-buddy-signup'
ORDER BY created_at DESC;
```

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| first_name | text | |
| last_name | text | |
| email | text | |
| organisation | text | School or provider name |
| role | text | classroom_teacher, principal, ndis_provider etc |
| lead_source | text | `reading-buddy-signup` |
| status | text | `new` \| `contacted` \| `converted` |
| notes | jsonb | `{ plan, state, students, hear, campaign }` |
| created_at | timestamptz | |

### `cap_secrets`
All RB configuration stored here.

```sql
SELECT key, LEFT(value, 50) FROM cap_secrets
WHERE key LIKE 'RB_%' OR key LIKE 'STRIPE_%LINK'
ORDER BY key;
```

Key RB secrets:

| Key | Description |
|---|---|
| `RB_SITE_URL` | `https://reading-buddy-by-outcome-ready.vercel.app` |
| `RB_SIGNUP_URL` | `/signup` route |
| `RB_MARKETING_URL` | `/marketing` route |
| `RB_LEARN_URL` | `/learn` route |
| `RB_FAVICON_URL` | AHC droid head webp |
| `RB_CONTACT_EMAIL` | `readingbuddies@outcome-ready.com` |
| `RB_ABN` | `70 666 271 272` |
| `RB_VERCEL_PROJECT_ID` | `prj_8w7AoZqaFeeMhlsPacjjNiWfGlkX` |
| `STRIPE_MONTHLY_LINK` | buy.stripe.com monthly |
| `STRIPE_ANNUAL_LINK` | buy.stripe.com annual |
| `STRIPE_SCHOOL_LINK` | buy.stripe.com school |
| `OR_SITE_URL` | OutcomeReady site URL |

### `infra_sites_registry`
4 Reading Buddy surfaces registered.

```sql
SELECT slug, display_name, status, is_live, http_code, primary_url
FROM infra_sites_registry
WHERE vercel_project_id = 'prj_8w7AoZqaFeeMhlsPacjjNiWfGlkX'
ORDER BY slug;
```

| Slug | URL |
|---|---|
| `reading-buddy-by-outcome-ready` | Main site |
| `reading-buddy-signup` | Free trial |
| `reading-buddy-marketing` | Marketing microsite |
| `reading-buddy-learn` | Kids weblet |

### `mcp_lambda_registry`
3 Lambda functions registered.

```sql
SELECT function_name, status, invocation_pattern, description
FROM mcp_lambda_registry
WHERE function_name LIKE 'rb-%';
```

| Function | Status | Trigger |
|---|---|---|
| `rb-signup-handler` | ACTIVE | WEBHOOK |
| `rb-lead-notifier` | ACTIVE | WEBHOOK |
| `rb-campaign-poster` | CODE_READY | EVENTBRIDGE |

### `t4h_campaign_agents`
Sofia Rodriguez wired as campaign owner.

```sql
SELECT * FROM t4h_campaign_agents WHERE agent_name = 'Sofia Rodriguez';
```

### `command_centre_queries` (page: `reading-buddy`)
5 CCQs for the CC dashboard.

```sql
SELECT key, description FROM command_centre_queries
WHERE page_id = 'reading-buddy';
```

| Key | Description |
|---|---|
| `rb_campaign_overview` | Campaign status + posts |
| `rb_post_schedule` | Social post schedule |
| `rb_leads_funnel` | Leads by status |
| `rb_site_health` | All 4 routes + HTTP |
| `rb_sofia_agent` | Agent status |

### `t4h_ui_snippet` (page: `reading-buddy`)
1 widget registered: `rb-campaign-widget`.

```sql
SELECT slug, title FROM t4h_ui_snippet WHERE page_key = 'reading-buddy';
```

---

## Triggers

### `trg_notify_rb_signup`
Fires on every INSERT to `cap_leads` where `lead_source = 'reading-buddy-signup'`.  
Calls `troy-ses-sender` via `pg_net.http_post` to notify `readingbuddies@outcome-ready.com`.

```sql
-- Verify trigger exists
SELECT tgname, tgenabled FROM pg_trigger WHERE tgname = 'trg_notify_rb_signup';

-- Test by inserting a lead
INSERT INTO cap_leads (first_name, last_name, email, lead_source, status)
VALUES ('Test', 'User', 'test@example.com', 'reading-buddy-signup', 'new');
```

---

## Health Check Query

Run this to confirm all RB assets are wired:

```sql
SELECT
  (SELECT COUNT(*) FROM cap_campaigns WHERE slug IN ('rb-launch-2026','or-rb-launch-2026') AND status='active') as campaigns,
  (SELECT COUNT(*) FROM cap_social_posts WHERE campaign_id IN (SELECT id FROM cap_campaigns WHERE slug LIKE '%rb%')) as social_posts,
  (SELECT COUNT(*) FROM infra_sites_registry WHERE vercel_project_id='prj_8w7AoZqaFeeMhlsPacjjNiWfGlkX') as sites,
  (SELECT COUNT(*) FROM mcp_lambda_registry WHERE function_name LIKE 'rb-%') as lambdas,
  (SELECT COUNT(*) FROM command_centre_queries WHERE page_id='reading-buddy') as ccqs,
  (SELECT COUNT(*) FROM cap_leads WHERE lead_source='reading-buddy-signup') as signups,
  (SELECT COUNT(*) FROM pg_trigger WHERE tgname='trg_notify_rb_signup') as trigger_active;
```

Expected: `2 | 12 | 4 | 3 | 5 | 0+ | 1`
