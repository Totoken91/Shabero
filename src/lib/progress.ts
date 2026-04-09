const KEY = 'shabero-progress'

export interface UserProgress {
  confidence: Record<string, number>
  wrongPhrases: string[]
  kana: Record<string, number> // "hiragana-1" → consecutive correct count (mastered at 3)
}

function load(): UserProgress {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { confidence: {}, wrongPhrases: [], kana: {} }
}

function save(p: UserProgress) {
  localStorage.setItem(KEY, JSON.stringify(p))
}

export function getConfidence(scenarioId: string): number {
  return load().confidence[scenarioId] ?? 0
}

export function recordAnswer(scenarioId: string, phraseId: string, correct: boolean) {
  const p = load()
  const current = p.confidence[scenarioId] ?? 0

  if (correct) {
    p.confidence[scenarioId] = Math.min(100, current + 8)
    p.wrongPhrases = p.wrongPhrases.filter((id) => id !== phraseId)
  } else {
    p.confidence[scenarioId] = Math.max(0, current - 3)
    if (!p.wrongPhrases.includes(phraseId)) {
      p.wrongPhrases.push(phraseId)
    }
  }

  save(p)
}

export function getWrongPhrases(): string[] {
  return load().wrongPhrases
}

export function getAllConfidence(): Record<string, number> {
  return load().confidence
}

// === Kana progress ===
export function getKanaStreak(type: string, groupId: number): number {
  return load().kana[`${type}-${groupId}`] ?? 0
}

export function isKanaGroupMastered(type: string, groupId: number): boolean {
  return getKanaStreak(type, groupId) >= 3
}

export function recordKanaAnswer(type: string, groupId: number, allCorrect: boolean) {
  const p = load()
  const key = `${type}-${groupId}`
  if (allCorrect) {
    p.kana[key] = (p.kana[key] ?? 0) + 1
  } else {
    p.kana[key] = 0
  }
  save(p)
}

export function getAllKanaProgress(): Record<string, number> {
  return load().kana
}
