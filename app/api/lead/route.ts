import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const PLAN_SEGMENT_MAP: Record<string, string> = {
  freemium:        'Classroom',
  premium_monthly: 'Classroom',
  premium_annual:  'Classroom',
  school:          'School-wide',
  free:            'Classroom',
  premium:         'Classroom',
  enterprise:      'School-wide',
  ndis:            'Clinic',
  demo:            'Classroom',
}

const ROLE_SEGMENT_MAP: Record<string, string> = {
  classroom_teacher:        'Classroom',
  reading_specialist:       'Classroom',
  principal:                'School-wide',
  ndis_provider:            'Clinic',
  curriculum_coordinator:   'Classroom',
  parent:                   'Home',
  'Principal':              'School-wide',
  'Assistant Principal':    'School-wide',
  'IT / Technology Lead':   'School-wide',
  'Learning Support Coordinator': 'Classroom',
  'NDIS Provider / Manager': 'Clinic',
  'District / System Administrator': 'School-wide',
}

const PLAN_NOTION_MAP: Record<string, string> = {
  freemium:        'Public & Private Schools',
  premium_monthly: 'Public & Private Schools',
  premium_annual:  'Public & Private Schools',
  school:          'School Leaders',
  free:            'Public & Private Schools',
  premium:         'Public & Private Schools',
  enterprise:      'School Leaders',
  ndis:            'NDIS Providers',
  demo:            'Public & Private Schools',
}

async function writeToNotion(
  full_name: string, email: string, organisation: string,
  role: string, plan: string, state: string, notes: string
) {
  const NOTION_KEY = process.env.NOTION_KEY
  const NOTION_DB_ID = process.env.NOTION_RB_DB_ID
  if (!NOTION_KEY || !NOTION_DB_ID) return

  const segment = PLAN_SEGMENT_MAP[plan] ?? ROLE_SEGMENT_MAP[role] ?? 'Classroom'
  const notionPlan = PLAN_NOTION_MAP[plan] ?? 'Public & Private Schools'

  const props: Record<string, unknown> = {
    'Contact Name': { title: [{ text: { content: full_name || email } }] },
    'Email': { email },
    'Organisation': { rich_text: [{ text: { content: organisation } }] },
    'Segment': { select: { name: segment } },
    'Status': { select: { name: 'Lead' } },
    'Plan': { select: { name: notionPlan } },
    'First Contact Date': { date: { start: new Date().toISOString().split('T')[0] } },
    'Notes': { rich_text: [{ text: { content: notes } }] },
  }

  // Only include State if valid
  const validStates = ['NSW','VIC','QLD','WA','SA','TAS','ACT','NT']
  if (state && validStates.includes(state.toUpperCase())) {
    props['State'] = { select: { name: state.toUpperCase() } }
  }

  await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_KEY}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ parent: { database_id: NOTION_DB_ID }, properties: props }),
  })
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_KEY

  if (!url || !key) {
    return NextResponse.json({ ok: false, error: 'service_unavailable' }, { status: 503 })
  }

  const supabase = createClient(url, key)

  // Normalise field names from both signup + contact forms
  const full_name = body.full_name
    ?? (body.first_name ? `${body.first_name} ${body.last_name ?? ''}`.trim() : null)
    ?? body.name
    ?? null
  const email: string = body.email ?? ''
  const organisation: string = body.organisation ?? body.org ?? ''
  const role: string = body.role ?? body.role_title ?? ''
  const plan: string = body.plan ?? body.lead_type ?? ''
  const state: string = body.state ?? ''
  const message: string = body.message ?? ''

  const payload = {
    biz_key: 'reading-buddy',
    source: body.source ?? 'reading-buddy-website',
    lead_type: plan || 'contact',
    full_name,
    email,
    phone: body.phone ?? null,
    company: organisation || null,
    role_title: role || null,
    message: message || null,
    landing_page: body.landing_page ?? '/',
    consent_terms: !!body.consent_terms,
    consent_marketing: !!body.consent_marketing,
    raw_payload: body,
  }

  const { data, error } = await supabase
    .from('cap_leads')
    .insert(payload)
    .select('id')
    .single()

  if (error) {
    console.error('cap_leads insert error:', error)
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  // Notion — non-blocking
  try {
    await writeToNotion(full_name ?? email, email, organisation, role, plan, state, message)
  } catch (err) {
    console.error('Notion write failed (non-blocking):', err)
  }

  return NextResponse.json({ ok: true, lead_id: data?.id })
}
