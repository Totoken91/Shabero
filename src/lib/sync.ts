import { supabase } from './supabase'
import { getUserData, type ShaberoUserData } from './store'

// Map store data → Supabase row
function toRow(d: ShaberoUserData) {
  return {
    onboarding_done: d.onboardingDone,
    travel_mode: d.travelMode,
    display_mode: d.displayMode,
    streak_current: d.streak.current,
    streak_longest: d.streak.longest,
    streak_last_active_date: d.streak.lastActiveDate,
    categories: d.categories,
    quiz_wrong_phrases: d.quiz.wrongPhrases,
    quiz_last_review_date: d.quiz.lastReviewDate,
    quiz_review_done_today: d.quiz.reviewDoneToday,
    quiz_marathon_record: d.quiz.marathonRecord,
    seen_messages: d.seenMessages,
    total_phrases_listened: d.totalPhrasesListened,
    total_quiz_completed: d.totalQuizCompleted,
    first_use_date: d.firstUseDate,
  }
}

// Map Supabase row → store data
export function fromRow(row: Record<string, unknown>): Partial<ShaberoUserData> {
  return {
    onboardingDone: row.onboarding_done as boolean,
    travelMode: row.travel_mode as ShaberoUserData['travelMode'],
    displayMode: row.display_mode as ShaberoUserData['displayMode'],
    streak: {
      current: row.streak_current as number,
      longest: row.streak_longest as number,
      lastActiveDate: row.streak_last_active_date as string,
    },
    categories: (row.categories ?? {}) as ShaberoUserData['categories'],
    quiz: {
      wrongPhrases: (row.quiz_wrong_phrases ?? []) as string[],
      lastReviewDate: row.quiz_last_review_date as string,
      reviewDoneToday: row.quiz_review_done_today as boolean,
      marathonRecord: row.quiz_marathon_record as number,
    },
    seenMessages: (row.seen_messages ?? []) as string[],
    totalPhrasesListened: row.total_phrases_listened as number,
    totalQuizCompleted: row.total_quiz_completed as number,
    firstUseDate: row.first_use_date as string,
  }
}

// Debounced push to cloud
let pushTimer: ReturnType<typeof setTimeout> | null = null

export function schedulePush() {
  if (pushTimer) clearTimeout(pushTimer)
  pushTimer = setTimeout(() => pushToCloud(), 1500)
}

export async function pushToCloud() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const d = getUserData()
  await supabase.from('profiles').upsert({ id: user.id, ...toRow(d) })
}

export async function pullFromCloud(): Promise<Partial<ShaberoUserData> | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error || !data) return null
  return fromRow(data as Record<string, unknown>)
}
