import type { Phrase } from '../types'
import { scenarios } from '../data/scenarios'
import { getWrongPhrases } from './progress'

export type TrainingMode = 'listen' | 'speak' | 'repeat'

export interface ListenQuestion {
  mode: 'listen'
  phrase: Phrase
  options: string[]
  correctAnswer: string
}

export interface SpeakQuestion {
  mode: 'speak'
  situation: string
  correctPhrase: Phrase
  options: Phrase[]
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

function meaning(p: Phrase, lang: 'fr' | 'en'): string {
  return lang === 'en' && p.en ? p.en : p.fr
}

export function generateListenQuiz(scenarioId: string, count = 10, lang: 'fr' | 'en' = 'fr'): ListenQuestion[] {
  const phrases = getPhrasesForScenario(scenarioId)
  const allPhrases = getAllPhrases()
  const wrongIds = getWrongPhrases()

  const wrongOnes = phrases.filter((p) => p.id && wrongIds.includes(p.id))
  const rest = phrases.filter((p) => !p.id || !wrongIds.includes(p.id))
  const ordered = [...shuffle(wrongOnes), ...shuffle(rest)].slice(0, count)

  return ordered.map((p) => {
    const correct = meaning(p, lang)
    const distractors = shuffle(
      allPhrases.filter((d) => meaning(d, lang) !== correct)
    ).slice(0, 3).map((d) => meaning(d, lang))

    return {
      mode: 'listen',
      phrase: p,
      options: shuffle([correct, ...distractors]),
      correctAnswer: correct,
    }
  })
}

export function generateSpeakQuiz(scenarioId: string, count = 10, lang: 'fr' | 'en' = 'fr'): SpeakQuestion[] {
  const phrases = getPhrasesForScenario(scenarioId)
  const allPhrases = getAllPhrases()

  return shuffle(phrases).slice(0, count).map((p) => {
    const distractors = shuffle(
      allPhrases.filter((d) => d.jp !== p.jp)
    ).slice(0, 3)

    const situationFr = p.situation ?? p.fr
    const situationEn = p.situation_en ?? p.en ?? situationFr
    const situation = lang === 'en' ? situationEn : situationFr

    return {
      mode: 'speak',
      situation,
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
