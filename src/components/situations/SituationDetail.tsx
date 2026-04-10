import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Headphones, Brain, Microphone, Check } from '@phosphor-icons/react'
import { scenarios } from '../../data/scenarios'
import { getCategoryProgress, getCategoryStepInfo } from '../../lib/store'

const STEPS = [
  { key: 1 as const, label: 'Écoute', icon: Headphones, desc: 'Parcours et écoute les phrases' },
  { key: 2 as const, label: 'Comprends', icon: Brain, desc: 'Quiz audio → traduction FR' },
  { key: 3 as const, label: 'Parle', icon: Microphone, desc: 'Trouve la bonne phrase audio' },
]

export default function SituationDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const scenario = scenarios.find((s) => s.id === id)
  if (!scenario) return <div className="p-6 text-center text-[var(--text-light)]">Catégorie introuvable.</div>

  const progress = getCategoryProgress(id!)
  const { pct } = getCategoryStepInfo(id!)
  const barColor = pct >= 100 ? '#D4A800' : pct >= 50 ? '#34A853' : '#2196F3'

  return (
    <div className="pb-8">
      <motion.button
        onClick={() => navigate('/situations')}
        className="mb-3 flex items-center gap-1.5 text-white font-bold text-[14px] cursor-pointer bg-transparent border-none p-0"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={18} weight="bold" />
        Retour
      </motion.button>

      <motion.div
        className="detail-header p-5 text-white text-center mb-4"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h1 className="relative z-10 text-[20px] font-[800] m-0">{scenario.name}</h1>
        <p className="relative z-10 text-[13px] text-white/80 mt-1">{scenario.description}</p>

        {/* Progress bar */}
        <div className="relative z-10 mt-3 h-3 rounded-full overflow-hidden"
          style={{ background: 'linear-gradient(to bottom, #E0E0E0, #C8C8C8)', border: '1px solid #B0B0B0', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(to bottom, ${barColor}aa 0%, ${barColor} 45%, ${barColor}dd 45%, ${barColor}99 100%)`, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)' }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {progress.stampEarned && (
          <span className="relative z-10 inline-block mt-2 mastered-badge">Maîtrisé</span>
        )}
      </motion.div>

      {/* 3 Steps */}
      <div className="flex flex-col gap-3">
        {STEPS.map((step, i) => {
          const done = step.key === 1 ? progress.step1Complete
            : step.key === 2 ? progress.step2Complete
            : progress.step3Complete
          const score = step.key === 2 ? progress.step2Score : step.key === 3 ? progress.step3Score : 0
          const Icon = step.icon

          const route = step.key === 1
            ? `/situations/${id}/listen`
            : step.key === 2
            ? `/situations/${id}/understand`
            : `/situations/${id}/speak`

          return (
            <motion.button
              key={step.key}
              onClick={() => navigate(route)}
              className="aero-card cursor-pointer p-4 flex items-center gap-4 text-left"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              whileHover={{ y: -2, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className="icon-aqua shrink-0"
                style={{
                  background: done
                    ? 'linear-gradient(to bottom, #7ED56F 0%, #55C146 40%, #3AAD2B 40%, #2D8E22 100%)'
                    : 'linear-gradient(to bottom, #5DADE2 0%, #2196F3 40%, #1976D2 40%, #1565C0 100%)',
                  borderColor: done ? '#1B7A14' : '#0D47A1',
                }}
              >
                {done ? (
                  <Check size={22} weight="bold" className="text-white relative z-10" />
                ) : (
                  <Icon size={22} weight="bold" className="text-white relative z-10" />
                )}
              </div>

              <div className="relative z-10 flex-1">
                <span className="font-bold text-[15px] text-[var(--text)] block">
                  Étape {step.key} — {step.label}
                </span>
                <span className="text-[11px] text-[var(--text-light)]">{step.desc}</span>
                {score > 0 && step.key !== 1 && (
                  <span className="text-[11px] text-sky-600 block mt-0.5">Meilleur score : {score}%</span>
                )}
              </div>

              {done && (
                <span className="relative z-10 text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                  Fait
                </span>
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
