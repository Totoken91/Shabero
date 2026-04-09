import type { QuizMode, QuizQuestion, Phrase } from '../types'
import { scenarios } from '../data/scenarios'

function getAllPhrases(): Phrase[] {
  return scenarios.flatMap((s) => s.phrases)
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickDistractors(correct: Phrase, pool: Phrase[], count: number, key: keyof Phrase): string[] {
  const filtered = pool.filter((p) => p[key] !== correct[key])
  const shuffled = shuffle(filtered)
  return shuffled.slice(0, count).map((p) => p[key] as string)
}

function generateJpFr(phrases: Phrase[], count: number): QuizQuestion[] {
  const selected = shuffle(phrases).slice(0, count)
  return selected.map((p) => {
    const distractors = pickDistractors(p, phrases, 3, 'fr')
    return {
      question: p.jp,
      correct: p.fr,
      options: shuffle([p.fr, ...distractors]),
      explanation: `${p.romaji} — ${p.note}`,
    }
  })
}

function generateFrJp(phrases: Phrase[], count: number): QuizQuestion[] {
  const selected = shuffle(phrases).slice(0, count)
  return selected.map((p) => {
    const distractors = pickDistractors(p, phrases, 3, 'jp')
    return {
      question: p.fr,
      correct: p.jp,
      options: shuffle([p.jp, ...distractors]),
      explanation: `${p.romaji} — ${p.note}`,
    }
  })
}

function generateContexte(phrases: Phrase[], count: number): QuizQuestion[] {
  const withContext = phrases.filter((p) => p.who === 'you' || p.who === 'them')
  const selected = shuffle(withContext).slice(0, count)
  return selected.map((p) => {
    const distractors = pickDistractors(p, phrases, 3, 'jp')
    const situationPrefix = p.who === 'them' ? 'On te dit : ' : 'Tu veux dire : '
    return {
      question: `${situationPrefix}${p.fr}`,
      correct: p.jp,
      options: shuffle([p.jp, ...distractors]),
      explanation: `${p.romaji} — ${p.note}`,
    }
  })
}

export function generateQuiz(mode: QuizMode, count = 10): QuizQuestion[] {
  const phrases = getAllPhrases()

  switch (mode) {
    case 'jp-fr':
      return generateJpFr(phrases, count)
    case 'fr-jp':
      return generateFrJp(phrases, count)
    case 'contexte':
      return generateContexte(phrases, count)
  }
}
