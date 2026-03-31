import { NextResponse } from 'next/server'

const BRIDGE_URL = 'https://m5oqj21chd.execute-api.ap-southeast-2.amazonaws.com/lambda/invoke'
const BRIDGE_KEY = 'bk_tOH8P5WD3mxBKfICa4yI56vJhpuYOynfdf1d_GfvdK4'

async function bridge(sql: string) {
  const r = await fetch(BRIDGE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': BRIDGE_KEY },
    body: JSON.stringify({ fn: 'troy-sql-executor', route: 'sql', sql })
  })
  return r.json()
}

async function sendEmail(to: string, subject: string, body: string, replyTo?: string) {
  const r = await fetch(BRIDGE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': BRIDGE_KEY },
    body: JSON.stringify({
      fn: 'troy-ses-sender',
      to,
      subject,
      body,
      ...(replyTo ? { reply_to: replyTo } : {})
    })
  })
  return r.json()
}

export async function POST(request: Request) {
  try {
    const { first_name, last_name, email, organisation, role, state, students, hear, plan } = await request.json()

    if (!first_name || !last_name || !email || !organisation || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const noteJson = JSON.stringify({
      plan, state, students, hear, campaign: 'rb-launch-2026'
    }).replace(/'/g, "''")

    // Write to cap_leads
    await bridge(`
      INSERT INTO cap_leads (first_name, last_name, email, organisation, role, lead_source, status, notes, created_at)
      VALUES (
        '${first_name.replace(/'/g, "''")}',
        '${last_name.replace(/'/g, "''")}',
        '${email.replace(/'/g, "''")}',
        '${organisation.replace(/'/g, "''")}',
        '${role}',
        'reading-buddy-signup', 'new',
        '${noteJson}',
        NOW()
      ) ON CONFLICT DO NOTHING
    `)

    // Confirmation to user
    await sendEmail(
      email,
      `Welcome to Reading Buddy — you're in, ${first_name}!`,
      `Hi ${first_name},\n\nYou're on the list! 🎉\n\nWe'll have your trial ready within 24 hours. No credit card. No lock-in.\n\nWhat happens next:\n→ Watch for a follow-up from readingbuddy@outcome-ready.com\n→ We'll set up your classroom access personally\n→ First session takes under 5 minutes\n\nQuestions? Reply to this email.\n\nTroy Latter\nReading Buddy by Outcome Ready\nreadingbuddy@outcome-ready.com\nTech 4 Humanity Pty Ltd · ABN 70 666 271 272`,
      'readingbuddy@outcome-ready.com'
    )

    // Team notification
    await sendEmail(
      'readingbuddy@outcome-ready.com',
      `🆕 New Reading Buddy signup — ${first_name} ${last_name} (${plan || 'unknown'})`,
      `Name: ${first_name} ${last_name}\nEmail: ${email}\nOrg: ${organisation}\nRole: ${role}\nState: ${state || '-'}\nStudents: ${students || '-'}\nPlan: ${plan || '-'}\nHeard via: ${hear || '-'}`
    )

    return NextResponse.json({ ok: true })

  } catch (err) {
    console.error('Signup error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
