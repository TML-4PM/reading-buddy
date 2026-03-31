import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, name, role, report_type } = await req.json()
    if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 })

    const SUPABASE_URL = 'https://lzfgigiyqpuuxslsygjt.supabase.co'
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || ''

    // Insert into cap_leads
    await fetch(`${SUPABASE_URL}/rest/v1/cap_leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'apikey': SUPABASE_KEY,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        email,
        name,
        source: `reading-buddy-download-${report_type}`,
        status: 'new',
        notes: `Downloaded: ${report_type} sample report. Role: ${role || 'not specified'}`,
        biz_key: 'OUTRD',
        created_at: new Date().toISOString(),
      }),
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    // Non-blocking — download still works
    return NextResponse.json({ ok: true })
  }
}
