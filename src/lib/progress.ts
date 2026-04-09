const KEY = 'shabero-progress'

export interface UserProgress {
  confidence: Record<string, number> // scenarioId → 0-100
  wrongPhrases: string[]             // phrase IDs that need repetition
}

function load(): UserProgress {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { confidence: {}, wrongPhrases: [] }
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
