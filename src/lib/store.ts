import { schedulePush } from './sync'
import { scheduleStreakReminder } from './notifications'
import { Capacitor } from '@capacitor/core'

const KEY = 'shabero-user'

export interface CategoryProgress {
  step1Complete: boolean      // Écoute (browsed all phrases)
  step2Complete: boolean      // Comprends (quiz audio→FR ≥80%)
  step2Score: number          // Best score %
  step3Complete: boolean      // Parle (quiz FR→audio ≥80%)
  step3Score: number
  stampEarned: boolean
  stampDate?: string
  phrasesListened: string[]   // IDs marked as "compris" in step1
}

export interface DailyQuota {
  date: string
  sessionsRequired: number
  sessionsCompleted: string[]
  streakEarned: boolean
}

export type SessionType =
  | 'daily_review'
  | 'category_step'
  | 'quick_quiz'
  | 'marathon'
  | 'kana_group'

export interface ShaberoUserData {
  onboardingDone: boolean
  travelMode: 'intensive' | 'normal' | 'zen'

  streak: {
    current: number
    longest: number
    lastActiveDate: string
  }

  dailyQuota: DailyQuota

  categories: Record<string, CategoryProgress>

  quiz: {
    wrongPhrases: string[]
    lastReviewDate: string
    reviewDoneToday: boolean
    marathonRecord: number
  }

  displayMode: 'romaji' | 'romaji+kana' | 'all'
  seenMessages: string[]
  totalPhrasesListened: number
  totalQuizCompleted: number
  firstUseDate: string
}

const defaults = (): ShaberoUserData => ({
  onboardingDone: false,
  travelMode: 'normal',
  streak: { current: 0, longest: 0, lastActiveDate: '' },
  dailyQuota: { date: '', sessionsRequired: 2, sessionsCompleted: [], streakEarned: false },
  categories: {},
  quiz: { wrongPhrases: [], lastReviewDate: '', reviewDoneToday: false, marathonRecord: 0 },
  displayMode: 'all',
  seenMessages: [],
  totalPhrasesListened: 0,
  totalQuizCompleted: 0,
  firstUseDate: new Date().toISOString().split('T')[0],
})

const defaultCat = (): CategoryProgress => ({
  step1Complete: false, step2Complete: false, step2Score: 0,
  step3Complete: false, step3Score: 0, stampEarned: false,
  phrasesListened: [],
})

// --- Core load/save ---
function load(): ShaberoUserData {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...defaults(), ...JSON.parse(raw) }
  } catch {}
  return defaults()
}

function save(d: ShaberoUserData) {
  localStorage.setItem(KEY, JSON.stringify(d))
  schedulePush()
}

export function getUserData(): ShaberoUserData {
  return load()
}

// --- Category progress ---
export function getCategoryProgress(id: string): CategoryProgress {
  return load().categories[id] ?? defaultCat()
}

function updateCategory(id: string, fn: (c: CategoryProgress) => void) {
  const d = load()
  if (!d.categories[id]) d.categories[id] = defaultCat()
  fn(d.categories[id])
  save(d)
}

export function markPhraseListened(categoryId: string, phraseId: string) {
  updateCategory(categoryId, (c) => {
    if (!c.phrasesListened.includes(phraseId)) {
      c.phrasesListened.push(phraseId)
    }
  })
  const d = load()
  d.totalPhrasesListened += 1
  save(d)
}

export function completeStep1(categoryId: string) {
  updateCategory(categoryId, (c) => { c.step1Complete = true })
  completeSession('category_step')
}

export function completeStep2(categoryId: string, score: number) {
  updateCategory(categoryId, (c) => {
    c.step2Score = Math.max(c.step2Score, score)
    if (score >= 80) c.step2Complete = true
  })
  recordQuizComplete()
  completeSession('category_step')
}

export function completeStep3(categoryId: string, score: number) {
  let justEarnedFirstStamp = false

  updateCategory(categoryId, (c) => {
    c.step3Score = Math.max(c.step3Score, score)
    if (score >= 80) c.step3Complete = true
    if (c.step1Complete && c.step2Complete && c.step3Complete && !c.stampEarned) {
      c.stampEarned = true
      c.stampDate = new Date().toISOString().split('T')[0]
      const d = load()
      const totalStamps = Object.values(d.categories).filter((cat) => cat.stampEarned).length
      if (totalStamps === 0) justEarnedFirstStamp = true
    }
  })
  recordQuizComplete()
  completeSession('category_step')

  if (justEarnedFirstStamp && Capacitor.isNativePlatform()) {
    import('@capacitor-community/in-app-review').then(({ InAppReview }) => {
      InAppReview.requestReview()
    })
  }
}

export function getCategoryStepInfo(id: string): { current: 1 | 2 | 3; pct: number } {
  const c = getCategoryProgress(id)
  if (!c.step1Complete) return { current: 1, pct: 0 }
  if (!c.step2Complete) return { current: 2, pct: 33 }
  if (!c.step3Complete) return { current: 3, pct: 66 }
  return { current: 3, pct: 100 }
}

// --- Global progress ---
export function getGlobalProgress(totalCategories: number): number {
  const d = load()
  let steps = 0
  for (const c of Object.values(d.categories)) {
    if (c.step1Complete) steps++
    if (c.step2Complete) steps++
    if (c.step3Complete) steps++
  }
  return Math.round((steps / (totalCategories * 3)) * 100)
}

// --- Daily Quota ---
function getRequiredSessions(mode: 'intensive' | 'normal' | 'zen'): number {
  return mode === 'intensive' ? 3 : mode === 'normal' ? 2 : 1
}

export function getDailyQuota(): DailyQuota {
  const d = load()
  const today = new Date().toISOString().split('T')[0]
  if (d.dailyQuota.date !== today) {
    return {
      date: today,
      sessionsRequired: getRequiredSessions(d.travelMode),
      sessionsCompleted: [],
      streakEarned: false,
    }
  }
  return d.dailyQuota
}

export function completeSession(type: SessionType) {
  const d = load()
  const today = new Date().toISOString().split('T')[0]

  // Init quota for today if needed
  if (d.dailyQuota.date !== today) {
    d.dailyQuota = {
      date: today,
      sessionsRequired: getRequiredSessions(d.travelMode),
      sessionsCompleted: [],
      streakEarned: false,
    }
  }

  // Add session (avoid duplicates of same type in one day — except category_step and quick_quiz)
  if (type === 'daily_review' || type === 'marathon' || type === 'kana_group') {
    if (!d.dailyQuota.sessionsCompleted.includes(type)) {
      d.dailyQuota.sessionsCompleted.push(type)
    }
  } else {
    // category_step and quick_quiz can count multiple times
    d.dailyQuota.sessionsCompleted.push(type)
  }

  // Check if quota is met
  const quotaMet = d.dailyQuota.sessionsCompleted.length >= d.dailyQuota.sessionsRequired

  if (quotaMet && !d.dailyQuota.streakEarned) {
    d.dailyQuota.streakEarned = true

    // Update streak
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    if (d.streak.lastActiveDate === yesterday) {
      d.streak.current += 1
    } else if (d.streak.lastActiveDate !== today) {
      d.streak.current = 1
    }
    const isRecord = d.streak.current > d.streak.longest
    if (isRecord) {
      d.streak.longest = d.streak.current
    }
    d.streak.lastActiveDate = today

    save(d)
    scheduleStreakReminder()

    // Dispatch event for streak animation
    window.dispatchEvent(new CustomEvent('streak-earned', {
      detail: { streak: d.streak.current, isRecord },
    }))
  } else {
    // Track activity date even if quota not met yet
    if (d.streak.lastActiveDate !== today) {
      d.streak.lastActiveDate = today
    }
    save(d)
  }
}

// --- Streak ---
export function getStreak() {
  const d = load()
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

  // If last active was before yesterday, streak is broken — reset stored value
  if (d.streak.lastActiveDate !== today && d.streak.lastActiveDate !== yesterday) {
    if (d.streak.current !== 0) {
      d.streak.current = 0
      save(d)
    }
    return { current: 0, longest: d.streak.longest }
  }
  return { current: d.streak.current, longest: d.streak.longest }
}

// --- Quiz tracking ---
export function addWrongPhrase(phraseId: string) {
  const d = load()
  if (!d.quiz.wrongPhrases.includes(phraseId)) {
    d.quiz.wrongPhrases.push(phraseId)
  }
  save(d)
}

export function removeWrongPhrase(phraseId: string) {
  const d = load()
  d.quiz.wrongPhrases = d.quiz.wrongPhrases.filter((id) => id !== phraseId)
  save(d)
}

export function getWrongPhrases(): string[] {
  return load().quiz.wrongPhrases
}

function recordQuizComplete() {
  const d = load()
  d.totalQuizCompleted += 1
  save(d)
}

export function setReviewDone() {
  const d = load()
  d.quiz.reviewDoneToday = true
  d.quiz.lastReviewDate = new Date().toISOString().split('T')[0]
  save(d)
  completeSession('daily_review')
}

export function isReviewDoneToday(): boolean {
  const d = load()
  const today = new Date().toISOString().split('T')[0]
  return d.quiz.lastReviewDate === today && d.quiz.reviewDoneToday
}

// --- Display mode ---
export function getDisplayMode(): 'romaji' | 'romaji+kana' | 'all' {
  return load().displayMode
}

export function setDisplayMode(mode: 'romaji' | 'romaji+kana' | 'all') {
  const d = load()
  d.displayMode = mode
  save(d)
}

// --- Onboarding ---
export function isOnboardingDone(): boolean {
  return load().onboardingDone
}

export function completeOnboarding(mode: 'intensive' | 'normal' | 'zen') {
  const d = load()
  d.onboardingDone = true
  d.travelMode = mode
  save(d)
}

export function getTravelMode(): 'intensive' | 'normal' | 'zen' {
  return load().travelMode
}

export function setTravelMode(mode: 'intensive' | 'normal' | 'zen') {
  const d = load()
  d.travelMode = mode
  // Recalculate today's quota requirement
  const today = new Date().toISOString().split('T')[0]
  if (d.dailyQuota.date === today) {
    d.dailyQuota.sessionsRequired = getRequiredSessions(mode)
  }
  save(d)
}

// --- Marathon ---
export function getMarathonRecord(): number {
  return load().quiz.marathonRecord
}

export function setMarathonRecord(score: number) {
  const d = load()
  if (score > d.quiz.marathonRecord) {
    d.quiz.marathonRecord = score
  }
  save(d)
  completeSession('marathon')
}

// --- Encouragements ---
export function hasSeenMessage(id: string): boolean {
  return load().seenMessages.includes(id)
}

export function markMessageSeen(id: string) {
  const d = load()
  if (!d.seenMessages.includes(id)) {
    d.seenMessages.push(id)
  }
  save(d)
}
