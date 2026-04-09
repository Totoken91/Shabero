import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowCounterClockwise, House } from '@phosphor-icons/react'

interface Props {
  score: number
  total: number
  onReplay: () => void
}

export default function QuizResult({ score, total, onReplay }: Props) {
  const pct = Math.round((score / total) * 100)
  const emoji = pct >= 80 ? 'Sugoi !' : pct >= 50 ? 'Pas mal !' : 'Ganbatte !'
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-[400px] mx-auto"
    >
      <div className="phrase-card p-6 text-center">
        <p className="relative z-10 text-[32px] font-[900] text-[var(--text)]">
          {score}/{total}
        </p>
        <p className="relative z-10 text-[16px] font-bold text-[var(--text)] mt-1">{emoji}</p>
        <p className="relative z-10 text-[13px] text-[var(--text-light)] mt-2">
          {pct}% de bonnes réponses
        </p>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={onReplay}
          className="aero-card flex-1 cursor-pointer p-3 flex items-center justify-center gap-2 text-[13px] font-bold text-[var(--text)]"
        >
          <ArrowCounterClockwise size={16} weight="bold" className="relative z-10" />
          <span className="relative z-10">Rejouer</span>
        </button>
        <button
          onClick={() => navigate('/quiz')}
          className="aero-card flex-1 cursor-pointer p-3 flex items-center justify-center gap-2 text-[13px] font-bold text-[var(--text)]"
        >
          <House size={16} weight="bold" className="relative z-10" />
          <span className="relative z-10">Modes</span>
        </button>
      </div>
    </motion.div>
  )
}
