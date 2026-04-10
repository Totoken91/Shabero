import { getUserData, hasSeenMessage, markMessageSeen } from './store'
import { scenarios } from '../data/scenarios'

interface Encouragement {
  id: string
  message: string
  condition: () => boolean
}

const MESSAGES: Encouragement[] = [
  {
    id: 'first-listen',
    message: 'Tu viens d\'écouter ta première phrase ! 🎉',
    condition: () => getUserData().totalPhrasesListened >= 1,
  },
  {
    id: '10-phrases',
    message: 'Tu comprends déjà 10 phrases, c\'est plus que la plupart des touristes !',
    condition: () => getUserData().totalPhrasesListened >= 10,
  },
  {
    id: 'first-quiz',
    message: 'Ton oreille s\'habitue au japonais 👂',
    condition: () => getUserData().totalQuizCompleted >= 1,
  },
  {
    id: 'first-stamp',
    message: 'Premier tampon dans ton passeport ! 🛂',
    condition: () => {
      const d = getUserData()
      return Object.values(d.categories).some((c) => c.stampEarned)
    },
  },
  {
    id: 'half-stamps',
    message: 'À mi-chemin ! Les Japonais vont être impressionnés 🏯',
    condition: () => {
      const d = getUserData()
      const earned = Object.values(d.categories).filter((c) => c.stampEarned).length
      return earned >= Math.ceil(scenarios.length / 2)
    },
  },
  {
    id: 'all-stamps',
    message: '🎌 Passeport complet ! Tu es officiellement prêt pour le Japon. いってらっしゃい！',
    condition: () => {
      const d = getUserData()
      const earned = Object.values(d.categories).filter((c) => c.stampEarned).length
      return earned >= scenarios.length
    },
  },
  {
    id: 'streak-3',
    message: '3 jours d\'affilée ! L\'habitude se forme 🔥',
    condition: () => getUserData().streak.current >= 3,
  },
  {
    id: 'streak-7',
    message: 'Une semaine complète ! Tu es sérieux 💪',
    condition: () => getUserData().streak.current >= 7,
  },
  {
    id: 'streak-14',
    message: '2 semaines ! Tu es plus régulier que la plupart des étudiants de japonais',
    condition: () => getUserData().streak.current >= 14,
  },
  {
    id: 'streak-30',
    message: '30 JOURS. Respect. 🏆',
    condition: () => getUserData().streak.current >= 30,
  },
]

/**
 * Returns the next unseen encouragement message that matches, or null.
 */
export function getNextEncouragement(): string | null {
  for (const msg of MESSAGES) {
    if (!hasSeenMessage(msg.id) && msg.condition()) {
      markMessageSeen(msg.id)
      return msg.message
    }
  }
  return null
}
