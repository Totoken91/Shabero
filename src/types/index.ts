// === Scenarios ===
export interface Phrase {
  jp: string
  romaji: string
  fr: string
  note: string
  noteType?: 'default' | 'green' | 'blue'
}

export interface Scenario {
  id: string
  icon: string
  name: string
  description: string
  phrases: Phrase[]
}

// === Flashcards ===
export interface Flashcard {
  jp: string
  romaji: string
  fr: string
  context: string
  tip: string
}

export interface FlashcardCategory {
  id: string
  name: string
  cards: Flashcard[]
}

// === Quiz ===
export interface QuizQuestion {
  jp: string
  ctx: string
  correct: string
  options: string[]
  expl: string
}

// === RPG ===
export interface DialogueChoice {
  text: string
  jp: string
  isCorrect: boolean
  note: string
  nextNodeId: string
}

export interface SceneNode {
  id: string
  type: 'dialogue' | 'choice' | 'end'
  npcText?: string
  npcRomaji?: string
  choices?: DialogueChoice[]
  next?: string
  endData?: {
    stars: 1 | 2 | 3
    summary: string
  }
}

export interface RPGScene {
  id: string
  title: string
  description: string
  icon: string
  difficulty: 'debutant' | 'moyen' | 'hardcore'
  estimatedTime: string
  startNodeId: string
  nodes: Record<string, SceneNode>
}

// === Store ===
export interface AppState {
  xp: number
  level: number
  scenariosViewed: string[]
  flashcardsSeen: Record<string, number[]>
  quizScore: { correct: number; wrong: number }
  rpgStars: Record<string, number>
  addXP: (amount: number) => void
  markScenarioViewed: (id: string) => void
  markFlashcardSeen: (categoryId: string, index: number) => void
  recordQuizAnswer: (correct: boolean) => void
  resetQuizScore: () => void
  setRPGStars: (sceneId: string, stars: number) => void
}
