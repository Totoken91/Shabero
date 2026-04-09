export interface Phrase {
  jp: string
  romaji: string
  fr: string
  note: string
  noteType?: 'default' | 'green' | 'blue'
  who?: 'them' | 'you'
}

export interface Scenario {
  id: string
  name: string
  description: string
  phrases: Phrase[]
}

export interface Sign {
  jp: string
  romaji: string
  fr: string
  note: string
}

export interface SignCategory {
  id: string
  name: string
  description: string
  signs: Sign[]
}

// === Cours ===
export interface LessonStep {
  context: string
  jp: string
  romaji: string
  fr: string
  explanation: string
  tip?: string
}

export interface Lesson {
  id: string
  title: string
  description: string
  category: 'bases' | 'social' | 'survie' | 'avance'
  steps: LessonStep[]
}

// === Quiz ===
export type QuizMode = 'jp-fr' | 'fr-jp' | 'contexte'

export interface QuizQuestion {
  question: string
  correct: string
  options: string[]
  explanation: string
}
