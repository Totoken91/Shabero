import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Headphones, Microphone, Repeat, ArrowLeft } from '@phosphor-icons/react'
import { scenarios } from '../../data/scenarios'
import { getConfidence } from '../../lib/progress'

const MODES = [
  {
    id: 'listen',
    label: 'Écoute et comprends',
    description: 'Un audio se joue, tu choisis la bonne traduction',
    icon: Headphones,
    style: { bg: 'linear-gradient(to bottom, #5DADE2 0%, #2196F3 40%, #1976D2 40%, #1565C0 100%)', border: '#0D47A1' },
  },
  {
    id: 'speak',
    label: 'Comment on dit ?',
    description: 'On te donne la situation, tu écoutes et choisis la bonne phrase',
    icon: Microphone,
    style: { bg: 'linear-gradient(to bottom, #81C784 0%, #4CAF50 40%, #388E3C 40%, #2E7D32 100%)', border: '#1B5E20' },
  },
  {
    id: 'repeat',
    label: 'Répète la phrase',
    description: 'Écoute et répète à voix haute — drill de prononciation',
    icon: Repeat,
    style: { bg: 'linear-gradient(to bottom, #FFA940 0%, #FF8C00 40%, #E67300 40%, #CC6200 100%)', border: '#B55500' },
  },
] as const

export default function QuizModeSelect() {
  const { scenarioId } = useParams<{ scenarioId: string }>()
  const navigate = useNavigate()

  const scenario = scenarios.find((s) => s.id === scenarioId)
  if (!scenario) {
    navigate('/entrainement')
    return null
  }

  const confidence = getConfidence(scenarioId!)
  const barColor = confidence >= 70 ? '#34A853' : confidence >= 40 ? '#F5A623' : '#E53935'

  return (
    <div className="max-w-[500px] mx-auto">
      <motion.button
        onClick={() => navigate('/entrainement')}
        className="mb-3 flex items-center gap-1.5 text-white font-bold text-[14px] cursor-pointer bg-transparent border-none p-0"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={18} weight="bold" />
        Retour
      </motion.button>

      <div className="phrase-card p-5 mb-4 text-center">
        <h2 className="relative z-10 text-[18px] font-[800] text-[var(--text)] m-0">{scenario.name}</h2>
        <p className="relative z-10 text-[12px] text-[var(--text-light)] mt-1">{scenario.phrases.length} phrases</p>

        {/* Confidence gauge */}
        <div className="relative z-10 mt-3">
          <div className="flex justify-between text-[11px] font-bold mb-1">
            <span className="text-[var(--text-light)]">Confiance</span>
            <span style={{ color: barColor }}>{confidence}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-[#D4E8F5] overflow-hidden border border-[#B0D0E5]">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${barColor}, ${barColor}cc)` }}
              initial={{ width: 0 }}
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {MODES.map((mode, i) => {
          const Icon = mode.icon
          return (
            <motion.button
              key={mode.id}
              onClick={() => navigate(`/entrainement/${scenarioId}/${mode.id}`)}
              className="aero-card cursor-pointer p-4 flex items-center gap-4 text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
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
                <span className="font-bold text-[15px] text-[var(--text)] block">{mode.label}</span>
                <span className="text-[11px] text-[var(--text-light)]">{mode.description}</span>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
