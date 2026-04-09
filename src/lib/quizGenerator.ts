import type { Phrase } from '../types'
import { scenarios } from '../data/scenarios'
import { getWrongPhrases } from './progress'

export type TrainingMode = 'listen' | 'speak' | 'repeat'

export interface ListenQuestion {
  mode: 'listen'
  phrase: Phrase
  options: string[] // 4 FR translations, one correct
}

export interface SpeakQuestion {
  mode: 'speak'
  situation: string
  correctPhrase: Phrase
  options: Phrase[] // 4 phrases, one correct — user listens to each
}

export interface RepeatQuestion {
  mode: 'repeat'
  phrase: Phrase
}

export type TrainingQuestion = ListenQuestion | SpeakQuestion | RepeatQuestion

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getPhrasesForScenario(scenarioId: string): Phrase[] {
  return scenarios.find((s) => s.id === scenarioId)?.phrases ?? []
}

function getAllPhrases(): Phrase[] {
  return scenarios.flatMap((s) => s.phrases)
}

export function generateListenQuiz(scenarioId: string, count = 10): ListenQuestion[] {
  const phrases = getPhrasesForScenario(scenarioId)
  const allPhrases = getAllPhrases()
  const wrongIds = getWrongPhrases()

  // Prioritize wrong phrases
  const wrongOnes = phrases.filter((p) => p.id && wrongIds.includes(p.id))
  const rest = phrases.filter((p) => !p.id || !wrongIds.includes(p.id))
  const ordered = [...shuffle(wrongOnes), ...shuffle(rest)].slice(0, count)

  return ordered.map((p) => {
    const distractors = shuffle(
      allPhrases.filter((d) => d.fr !== p.fr)
    ).slice(0, 3).map((d) => d.fr)

    return {
      mode: 'listen',
      phrase: p,
      options: shuffle([p.fr, ...distractors]),
    }
  })
}

export function generateSpeakQuiz(scenarioId: string, count = 10): SpeakQuestion[] {
  const phrases = getPhrasesForScenario(scenarioId)
  const allPhrases = getAllPhrases()

  return shuffle(phrases).slice(0, count).map((p) => {
    const distractors = shuffle(
      allPhrases.filter((d) => d.jp !== p.jp)
    ).slice(0, 3)

    return {
      mode: 'speak',
      situation: p.situation ?? p.fr,
      correctPhrase: p,
      options: shuffle([p, ...distractors]),
    }
  })
}

export function generateRepeatDrill(scenarioId: string, count = 10): RepeatQuestion[] {
  const phrases = getPhrasesForScenario(scenarioId)
  return shuffle(phrases).slice(0, count).map((p) => ({
    mode: 'repeat',
    phrase: p,
  }))
}
