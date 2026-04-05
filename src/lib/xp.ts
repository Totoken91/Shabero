export const XP_REWARDS = {
  SCENARIO_VIEW: 10,
  FLASHCARD_KNOWN: 5,
  QUIZ_CORRECT: 15,
  RPG_1_STAR: 30,
  RPG_2_STAR: 50,
  RPG_3_STAR: 80,
} as const

export const LEVELS = [
  { level: 1, min: 0, max: 499, label: 'Touriste curieux' },
  { level: 2, min: 500, max: 1199, label: 'Voyageur debrouillard' },
  { level: 3, min: 1200, max: 2499, label: 'Aventurier confirme' },
  { level: 4, min: 2500, max: Infinity, label: 'Sensei du voyage' },
] as const

export function getLevel(xp: number): number {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].min) return LEVELS[i].level
  }
  return 1
}

export function getLevelInfo(xp: number) {
  const level = getLevel(xp)
  const current = LEVELS[level - 1]
  const nextLevel = LEVELS[level] ?? null
  const xpInLevel = xp - current.min
  const xpForLevel = nextLevel ? nextLevel.min - current.min : current.max - current.min
  const progress = nextLevel ? xpInLevel / xpForLevel : 1

  return { level, label: current.label, xp, xpInLevel, xpForLevel, progress }
}
