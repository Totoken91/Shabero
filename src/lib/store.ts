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

export interface XPData {
  totalXP: number
  currentLevel: number
  phrasesListenedXP: string[]
  phrasesComprisXP: string[]
  stepsCompletedXP: string[]
  stampsEarnedXP: string[]
  kanaGroupsXP: string[]
  welcomeXPEarned: boolean
  totalXPFromQuiz: number
  totalXPFromListening: number
  perfectScores: number
  levelUpDates: string[]
}

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

  xp: XPData

  displayMode: 'romaji' | 'romaji+kana' | 'all'
  seenMessages: string[]
  totalPhrasesListened: number
  totalQuizCompleted: number
  firstUseDate: string
}

const defaultXP = (): XPData => ({
  totalXP: 0,
  currentLevel: 1,
  phrasesListenedXP: [],
  phrasesComprisXP: [],
  stepsCompletedXP: [],
  stampsEarnedXP: [],
  kanaGroupsXP: [],
  welcomeXPEarned: false,
  totalXPFromQuiz: 0,
  totalXPFromListening: 0,
  perfectScores: 0,
  levelUpDates: [],
})

const defaults = (): ShaberoUserData => ({
  onboardingDone: false,
  travelMode: 'normal',
  streak: { current: 0, longest: 0, lastActiveDate: '' },
  dailyQuota: { date: '', sessionsRequired: 2, sessionsCompleted: [], streakEarned: false },
  categories: {},
  quiz: { wrongPhrases: [], lastReviewDate: '', reviewDoneToday: false, marathonRecord: 0 },
  xp: defaultXP(),
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
    if (raw) {
      const parsed = { ...defaults(), ...JSON.parse(raw) }
      if (!parsed.xp) parsed.xp = defaultXP()
      return parsed
    }
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

    // Update streak — lastActiveDate reflects LAST day quota was met
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

    // Award streak XP
    addXP(20)

    // Dispatch event for streak animation
    window.dispatchEvent(new CustomEvent('streak-earned', {
      detail: { streak: d.streak.current, isRecord },
    }))
  } else {
    // Save session progress but DON'T set lastActiveDate
    // lastActiveDate is only set when quota is met (streak earned)
    save(d)
  }
}

// --- Streak ---
export function getStreak() {
  const d = load()
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

  // User is considered "active today" if they have sessions, even if quota not met yet
  const activeToday = d.dailyQuota.date === today && d.dailyQuota.sessionsCompleted.length > 0

  // Streak is alive if last earned was today/yesterday, OR user is active today
  if (d.streak.lastActiveDate !== today && d.streak.lastActiveDate !== yesterday && !activeToday) {
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
  // No welcome XP — user starts at 0
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

// --- XP & Levels ---
const LEVEL_XPS = [
  0, 0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700,
  3300, 4000, 4800, 5700, 6700, 7900, 9300, 10900, 12700, 14700,
  17200, 20200, 23700, 27700, 32200, 37200, 43200, 50200, 58200, 68200,
]

const TIERS = [
  { maxLevel: 5, title: 'Touriste', badge: '\u{1F9F3}', tier: 'tourist' },
  { maxLevel: 10, title: 'Voyageur', badge: '\u2708\uFE0F', tier: 'traveler' },
  { maxLevel: 15, title: 'Explorateur', badge: '\u{1F9ED}', tier: 'explorer' },
  { maxLevel: 20, title: 'Aventurier', badge: '\u26F0\uFE0F', tier: 'adventurer' },
  { maxLevel: 25, title: 'Local', badge: '\u26E9\uFE0F', tier: 'local' },
  { maxLevel: 29, title: "Japonais d'honneur", badge: '\u{1F3EF}', tier: 'honor' },
  { maxLevel: 30, title: 'Ma\u00eetre', badge: '\u{1F451}', tier: 'master' },
] as const

export type TierKey = typeof TIERS[number]['tier']

export function getLevelFromXP(totalXP: number) {
  let level = 1
  for (let i = 1; i < LEVEL_XPS.length; i++) {
    if (totalXP >= LEVEL_XPS[i]) level = i
    else break
  }
  const tierInfo = TIERS.find(t => level <= t.maxLevel)!
  return { level, title: tierInfo.title, badge: tierInfo.badge, tier: tierInfo.tier as TierKey }
}

export function getXPForNextLevel(currentLevel: number) {
  if (currentLevel >= 30) return { current: 68200, next: 68200, remaining: 0 }
  return {
    current: LEVEL_XPS[currentLevel],
    next: LEVEL_XPS[currentLevel + 1],
    remaining: LEVEL_XPS[currentLevel + 1] - LEVEL_XPS[currentLevel],
  }
}

export function getXPData() {
  const d = load()
  return d.xp
}

export function addXP(amount: number, source: 'quiz' | 'listening' | 'other' = 'other'): {
  newTotal: number
  leveledUp: boolean
  newLevel: number
  oldLevel: number
  tierChanged: boolean
  newTier: TierKey
} {
  const d = load()
  const oldInfo = getLevelFromXP(d.xp.totalXP)
  d.xp.totalXP += amount
  const newInfo = getLevelFromXP(d.xp.totalXP)

  const leveledUp = newInfo.level > oldInfo.level
  const tierChanged = newInfo.tier !== oldInfo.tier

  if (leveledUp) {
    d.xp.currentLevel = newInfo.level
    d.xp.levelUpDates.push(new Date().toISOString())
  }

  if (source === 'quiz') d.xp.totalXPFromQuiz += amount
  else if (source === 'listening') d.xp.totalXPFromListening += amount

  save(d)

  if (leveledUp) {
    window.dispatchEvent(new CustomEvent('level-up', {
      detail: { level: newInfo.level, title: newInfo.title, badge: newInfo.badge, tier: newInfo.tier, tierChanged },
    }))
  }

  return {
    newTotal: d.xp.totalXP,
    leveledUp,
    newLevel: newInfo.level,
    oldLevel: oldInfo.level,
    tierChanged,
    newTier: newInfo.tier,
  }
}

export function awardPhraseListenXP(phraseId: string) {
  const d = load()
  if (d.xp.phrasesListenedXP.includes(phraseId)) return 0
  d.xp.phrasesListenedXP.push(phraseId)
  save(d)
  addXP(3, 'listening')
  return 3
}

export function awardPhraseComprisXP(phraseId: string) {
  const d = load()
  if (d.xp.phrasesComprisXP.includes(phraseId)) return 0
  d.xp.phrasesComprisXP.push(phraseId)
  save(d)
  addXP(5, 'listening')
  return 5
}

export function awardStepXP(stepKey: string, amount: number) {
  const d = load()
  if (d.xp.stepsCompletedXP.includes(stepKey)) return 0
  d.xp.stepsCompletedXP.push(stepKey)
  save(d)
  addXP(amount)
  return amount
}

export function awardStampXP(categoryId: string) {
  const d = load()
  if (d.xp.stampsEarnedXP.includes(categoryId)) return 0
  d.xp.stampsEarnedXP.push(categoryId)
  save(d)
  addXP(150)
  return 150
}

export function awardQuizAnswerXP(correct: boolean) {
  const amount = correct ? 10 : 3
  addXP(amount, 'quiz')
  return amount
}

export function awardPerfectScoreXP() {
  const d = load()
  d.xp.perfectScores += 1
  save(d)
  addXP(25, 'quiz')
  return 25
}

export function awardKanaGroupXP(groupKey: string) {
  const d = load()
  if (d.xp.kanaGroupsXP.includes(groupKey)) return 0
  d.xp.kanaGroupsXP.push(groupKey)
  save(d)
  addXP(60)
  return 60
}

export function awardWelcomeXP() {
  const d = load()
  if (d.xp.welcomeXPEarned) return 0
  d.xp.welcomeXPEarned = true
  save(d)
  addXP(50)
  return 50
}
