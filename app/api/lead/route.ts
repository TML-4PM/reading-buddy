import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY

  if (!url || !key) {
    return NextResponse.json({ ok: false, error: 'service_unavailable' }, { status: 503 })
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } })

  const { data, error } = await supabase
    .from('cap_leads')
    .insert({
      biz_key: 'reading-buddy',
      source: body.source ?? 'reading-buddy-contact',
      lead_type: body.plan || body.lead_type || 'contact',
      full_name: body.name || body.full_name || null,
      email: body.email,
      company: body.org || body.company || null,
      role_title: body.role || body.role_title || null,
      message: body.message || null,
      landing_page: body.landing_page ?? '/contact',
      consent_terms: !!body.consent_terms,
      raw_payload: body,
    })
    .select('id')
    .single()

  if (error) {
    console.error('Reading Buddy lead error:', error)
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  await supabase.from('or_event_log').insert({
    event_name: 'rb_lead',
    page_path: body.landing_page ?? '/contact',
    lead_id: data?.id,
    event_payload: { source: body.source, lead_type: body.plan || 'contact' },
  })

  return NextResponse.json({ ok: true, lead_id: data?.id })
}
