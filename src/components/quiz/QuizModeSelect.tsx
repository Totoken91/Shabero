import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Translate, ArrowsLeftRight, ChatCenteredText } from '@phosphor-icons/react'

const MODES = [
  {
    id: 'jp-fr',
    label: 'JP → FR',
    description: 'On te montre du japonais, tu trouves la traduction',
    icon: Translate,
    style: { bg: 'linear-gradient(to bottom, #5DADE2 0%, #2196F3 45%, #1565C0 100%)', border: '#0D4F9E' },
  },
  {
    id: 'fr-jp',
    label: 'FR → JP',
    description: 'On te montre du français, tu trouves la phrase japonaise',
    icon: ArrowsLeftRight,
    style: { bg: 'linear-gradient(to bottom, #81C784 0%, #4CAF50 45%, #2E7D32 100%)', border: '#1B5E20' },
  },
  {
    id: 'contexte',
    label: 'Contexte',
    description: 'On te donne une situation, tu choisis la bonne réponse',
    icon: ChatCenteredText,
    style: { bg: 'linear-gradient(to bottom, #FFA940 0%, #FF8C00 45%, #E67300 100%)', border: '#CC6600' },
  },
] as const

export default function QuizModeSelect() {
  const navigate = useNavigate()

  return (
    <div className="max-w-[500px] mx-auto">
      <div className="phrase-card p-5 mb-5 text-center">
        <h2 className="relative z-10 text-[20px] font-[800] text-[var(--text)] m-0">Choisis ton mode</h2>
        <p className="relative z-10 text-[13px] text-[var(--text-light)] mt-1">10 questions par session</p>
      </div>

      <div className="flex flex-col gap-3">
        {MODES.map((mode, i) => {
          const Icon = mode.icon
          return (
            <motion.button
              key={mode.id}
              onClick={() => navigate(`/quiz/${mode.id}`)}
              className="aero-card cursor-pointer p-5 flex items-center gap-4 text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ y: -2, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className="icon-aqua shrink-0"
                style={{ background: mode.style.bg, borderColor: mode.style.border }}
              >
                <Icon size={22} weight="bold" className="text-white relative z-10" />
              </div>
              <div className="relative z-10">
                <span className="font-bold text-[16px] text-[var(--text)] block">{mode.label}</span>
                <span className="text-[12px] text-[var(--text-light)]">{mode.description}</span>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
