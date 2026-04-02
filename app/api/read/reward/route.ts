export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const { running_record_id, reader_id, buddy } = await req.json()
  if (!running_record_id || !reader_id)
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )

  const { data: rr } = await supabase
    .from('rb_running_record')
    .select('accuracy_pct, accuracy_band')
    .eq('running_record_id', running_record_id)
    .single()

  if (!rr) return NextResponse.json({ error: 'Record not found' }, { status: 404 })

  const { data: starsRow } = await supabase.rpc('rb_compute_stars_from_band', {
    p_band: rr.accuracy_band || 'INSTRUCTIONAL',
    p_accuracy: rr.accuracy_pct || 0,
  })
  const stars: number = starsRow ?? 1

  // Write stars + buddy to the most recent session row for this reader
  await supabase.from('or_reading_session')
    .update({ stars, buddy: buddy || 'spark' })
    .eq('user_id', reader_id)
    .order('created_at', { ascending: false })
    .limit(1)

  await supabase.rpc('rb_update_streak', { p_user_id: reader_id })

  const { data: streakRow } = await supabase
    .from('rb_reading_streaks')
    .select('current_streak')
    .eq('user_id', reader_id)
    .single()
  const streak: number = streakRow?.current_streak ?? 1

  const { data: newAchievements } = await supabase.rpc('rb_check_and_award_achievements', {
    p_user_id: reader_id,
    p_buddy: buddy || 'spark',
  })

  return NextResponse.json({ ok: true, stars, streak, newAchievements: newAchievements ?? [] })
}
