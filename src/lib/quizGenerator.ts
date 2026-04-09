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

function pickDistractors(correct: Phrase, pool: Phrase[], count: number, key: 'fr' | 'jp'): string[] {
  const filtered = pool.filter((p) => p[key] !== correct[key])
  return shuffle(filtered).slice(0, count).map((p) => p[key])
}

function generateJpFr(phrases: Phrase[], count: number): QuizQuestion[] {
  return shuffle(phrases).slice(0, count).map((p) => {
    const distractors = pickDistractors(p, phrases, 3, 'fr')
    return {
      question: p.jp,
      correct: p.fr,
      options: shuffle([p.fr, ...distractors]),
      explanation: `${p.romaji} — ${p.tip ?? p.note ?? p.situation ?? ''}`,
    }
  })
}

function generateFrJp(phrases: Phrase[], count: number): QuizQuestion[] {
  return shuffle(phrases).slice(0, count).map((p) => {
    const distractors = pickDistractors(p, phrases, 3, 'jp')
    return {
      question: p.fr,
      correct: p.jp,
      options: shuffle([p.jp, ...distractors]),
      explanation: `${p.romaji} — ${p.tip ?? p.note ?? p.situation ?? ''}`,
    }
  })
}

function generateContexte(phrases: Phrase[], count: number): QuizQuestion[] {
  return shuffle(phrases).slice(0, count).map((p) => {
    const distractors = pickDistractors(p, phrases, 3, 'jp')
    return {
      question: p.situation ?? p.fr,
      correct: p.jp,
      options: shuffle([p.jp, ...distractors]),
      explanation: `${p.romaji} — ${p.tip ?? p.note ?? p.fr}`,
    }
  })
}

export function generateQuiz(mode: QuizMode, count = 10): QuizQuestion[] {
  const phrases = getAllPhrases()
  switch (mode) {
    case 'jp-fr': return generateJpFr(phrases, count)
    case 'fr-jp': return generateFrJp(phrases, count)
    case 'contexte': return generateContexte(phrases, count)
  }
}
