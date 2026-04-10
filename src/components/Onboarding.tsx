import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Airplane, Calendar, Cloud } from '@phosphor-icons/react'
import { completeOnboarding } from '../lib/store'

const MODES = [
  { id: 'intensive' as const, icon: Airplane, label: 'Dans moins de 2 semaines', desc: 'Mode intensif — 10 phrases/jour', color: '#E53935' },
  { id: 'normal' as const, icon: Calendar, label: 'Dans 1-3 mois', desc: 'Mode normal — 5 phrases/jour', color: '#2196F3' },
  { id: 'zen' as const, icon: Cloud, label: 'Je rêve juste du Japon', desc: 'Mode zen — 3 phrases/jour', color: '#4CAF50' },
]

interface Props {
  onComplete: () => void
}

export default function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState(0)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: 'linear-gradient(160deg, #4AA3DF 0%, #7EC8E3 30%, #B8E2F2 60%, #D4F0FC 100%)' }}>
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" className="phrase-card p-8 max-w-[400px] w-full text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}>
            <p className="relative z-10 text-[48px]">🇯🇵</p>
            <h1 className="relative z-10 text-[28px] font-[900] text-[var(--text)] mt-3">Bienvenue sur Shabero</h1>
            <p className="relative z-10 text-[14px] text-[var(--text-light)] mt-2">Apprends les phrases essentielles pour ton voyage au Japon</p>
            <button onClick={() => setStep(1)} className="phrase-badge !text-[14px] !px-6 !py-3 !rounded-lg cursor-pointer mt-6 mx-auto block">
              C'est parti
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1" className="phrase-card p-6 max-w-[400px] w-full text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}>
            <h2 className="relative z-10 text-[20px] font-[800] text-[var(--text)]">Tu pars quand ?</h2>
            <p className="relative z-10 text-[13px] text-[var(--text-light)] mt-1">On adapte le rythme à ton voyage</p>

            <div className="flex flex-col gap-3 mt-5">
              {MODES.map((m) => {
                const Icon = m.icon
                return (
                  <motion.button
                    key={m.id}
                    onClick={() => { completeOnboarding(m.id); setStep(2) }}
                    className="aero-card cursor-pointer p-4 flex items-center gap-3 text-left"
                    whileHover={{ y: -2, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="icon-aqua shrink-0" style={{ background: `linear-gradient(to bottom, ${m.color}88 0%, ${m.color} 40%, ${m.color}dd 40%, ${m.color}aa 100%)`, borderColor: `${m.color}99` }}>
                      <Icon size={20} weight="bold" className="text-white relative z-10" />
                    </div>
                    <div className="relative z-10">
                      <span className="font-bold text-[14px] text-[var(--text)] block">{m.label}</span>
                      <span className="text-[11px] text-[var(--text-light)]">{m.desc}</span>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" className="phrase-card p-8 max-w-[400px] w-full text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}>
            <p className="relative z-10 text-[48px]">🛂</p>
            <h2 className="relative z-10 text-[22px] font-[800] text-[var(--text)] mt-3">Ton Passeport est prêt</h2>
            <p className="relative z-10 text-[13px] text-[var(--text-light)] mt-2">Maîtrise chaque catégorie pour gagner tes tampons</p>

            <div className="flex justify-center gap-2 mt-4">
              {['🍙', '🍶', '🚅', '🛍️', '🏥', '🤝', '💬', '🌙', '💀'].map((e, i) => (
                <span key={i} className="w-8 h-8 rounded-full flex items-center justify-center text-[14px]" style={{ border: '2px dashed #C0D4E0', background: 'rgba(200,220,235,0.15)' }}>
                  <span style={{ opacity: 0.3 }}>{e}</span>
                </span>
              ))}
            </div>

            <button onClick={onComplete} className="phrase-badge !text-[14px] !px-6 !py-3 !rounded-lg cursor-pointer mt-6 mx-auto block">
              Commencer
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
