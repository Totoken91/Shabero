import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppState } from '../types'
import { getLevel } from '../lib/xp'

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      xp: 0,
      level: 1,
      scenariosViewed: [],
      flashcardsSeen: {},
      quizScore: { correct: 0, wrong: 0 },
      rpgStars: {},

      addXP: (amount) =>
        set((s) => {
          const newXP = s.xp + amount
          return { xp: newXP, level: getLevel(newXP) }
        }),

      markScenarioViewed: (id) =>
        set((s) => ({
          scenariosViewed: s.scenariosViewed.includes(id)
            ? s.scenariosViewed
            : [...s.scenariosViewed, id],
        })),

      markFlashcardSeen: (categoryId, index) =>
        set((s) => {
          const prev = s.flashcardsSeen[categoryId] ?? []
          if (prev.includes(index)) return s
          return {
            flashcardsSeen: {
              ...s.flashcardsSeen,
              [categoryId]: [...prev, index],
            },
          }
        }),

      recordQuizAnswer: (correct) =>
        set((s) => ({
          quizScore: correct
            ? { ...s.quizScore, correct: s.quizScore.correct + 1 }
            : { ...s.quizScore, wrong: s.quizScore.wrong + 1 },
        })),

      resetQuizScore: () => set({ quizScore: { correct: 0, wrong: 0 } }),

      setRPGStars: (sceneId, stars) =>
        set((s) => ({
          rpgStars: {
            ...s.rpgStars,
            [sceneId]: Math.max(s.rpgStars[sceneId] ?? 0, stars),
          },
        })),
    }),
    { name: 'shabero-store' }
  )
)
