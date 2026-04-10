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

export interface ShaberoUserData {
  onboardingDone: boolean
  travelMode: 'intensive' | 'normal' | 'zen'

  streak: {
    current: number
    longest: number
    lastActiveDate: string
  }

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
  recordActivity()
}

export function completeStep2(categoryId: string, score: number) {
  updateCategory(categoryId, (c) => {
    c.step2Score = Math.max(c.step2Score, score)
    if (score >= 80) c.step2Complete = true
  })
  recordQuizComplete()
  recordActivity()
}

export function completeStep3(categoryId: string, score: number) {
  updateCategory(categoryId, (c) => {
    c.step3Score = Math.max(c.step3Score, score)
    if (score >= 80) c.step3Complete = true
    if (c.step1Complete && c.step2Complete && c.step3Complete && !c.stampEarned) {
      c.stampEarned = true
      c.stampDate = new Date().toISOString().split('T')[0]
    }
  })
  recordQuizComplete()
  recordActivity()
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

// --- Streak ---
function recordActivity() {
  const d = load()
  const today = new Date().toISOString().split('T')[0]
  if (d.streak.lastActiveDate === today) return

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  if (d.streak.lastActiveDate === yesterday) {
    d.streak.current += 1
  } else {
    d.streak.current = 1
  }
  if (d.streak.current > d.streak.longest) {
    d.streak.longest = d.streak.current
  }
  d.streak.lastActiveDate = today
  save(d)
}

export function getStreak() {
  const d = load()
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

  // If last active was before yesterday, streak is broken
  if (d.streak.lastActiveDate !== today && d.streak.lastActiveDate !== yesterday) {
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
  recordActivity()
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
