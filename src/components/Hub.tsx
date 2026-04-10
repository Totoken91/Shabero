import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lightning, ArrowRight, Stamp } from '@phosphor-icons/react'
import { scenarios } from '../data/scenarios'
import { getStreak, getGlobalProgress, getUserData, isReviewDoneToday, getCategoryStepInfo } from '../lib/store'
import CategoryCard from './CategoryCard'

function StreakDisplay() {
  const { current, longest } = getStreak()
  const flames = current >= 14 ? '🔥🔥🔥' : current >= 7 ? '🔥🔥' : '🔥'

  return (
    <div className="phrase-card p-4 flex items-center gap-3">
      <span className="relative z-10 text-[28px]">{current > 0 ? flames : '💤'}</span>
      <div className="relative z-10">
        {current > 0 ? (
          <>
            <span className="font-bold text-[18px] text-[var(--text)]">{current} jour{current > 1 ? 's' : ''}</span>
            {longest > current && (
              <span className="text-[11px] text-[var(--text-light)] block">Record : {longest} jours</span>
            )}
          </>
        ) : (
          <>
            <span className="font-bold text-[14px] text-[var(--text)]">Commence ta série !</span>
            {longest > 0 && <span className="text-[11px] text-[var(--text-light)] block">Record : {longest} jours</span>}
          </>
        )}
      </div>
    </div>
  )
}

function GlobalGauge() {
  const pct = getGlobalProgress(scenarios.length)
  const msg = pct >= 80 ? 'Tu es presque un local' : pct >= 50 ? 'Les Japonais vont être impressionnés' : pct >= 20 ? 'Tu comprends déjà plus que la plupart des touristes' : 'Les premiers pas sont les plus importants !'
  const barColor = pct >= 80 ? '#D4A800' : pct >= 50 ? '#34A853' : '#2196F3'

  return (
    <div className="phrase-card p-4">
      <div className="relative z-10 flex justify-between items-baseline mb-1">
        <span className="text-[12px] font-bold text-[var(--text)]">Prêt pour le Japon</span>
        <span className="text-[14px] font-[800]" style={{ color: barColor }}>{pct}%</span>
      </div>
      <div className="relative z-10 h-3 rounded-full overflow-hidden" style={{ background: 'linear-gradient(to bottom, #E0E0E0, #C8C8C8)', border: '1px solid #B0B0B0', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(to bottom, ${barColor}cc 0%, ${barColor} 45%, ${barColor}dd 45%, ${barColor}99 100%)`, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)' }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>
      <p className="relative z-10 text-[11px] text-[var(--text-light)] mt-1.5">{msg}</p>
    </div>
  )
}

function DailyReview() {
  const navigate = useNavigate()
  const done = isReviewDoneToday()
  const data = getUserData()
  const reviewCount = data.travelMode === 'intensive' ? 10 : data.travelMode === 'zen' ? 3 : 5

  return (
    <motion.button
      onClick={() => !done && navigate('/entrainement/review')}
      className={`aero-card cursor-pointer p-4 flex items-center gap-3 text-left w-full ${done ? 'opacity-60' : ''}`}
      whileHover={done ? {} : { y: -2, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
      whileTap={done ? {} : { scale: 0.98 }}
      style={!done ? { borderColor: '#D4A800', borderWidth: 2 } : {}}
    >
      <div className="icon-aqua shrink-0" style={{ background: done ? 'linear-gradient(to bottom, #90A4AE 0%, #607D8B 40%, #546E7A 40%, #37474F 100%)' : 'linear-gradient(to bottom, #FFD54F 0%, #FFB300 40%, #FFA000 40%, #FF8F00 100%)', borderColor: done ? '#37474F' : '#E65100' }}>
        <Lightning size={22} weight="bold" className="text-white relative z-10" />
      </div>
      <div className="relative z-10 flex-1">
        <span className="font-bold text-[14px] text-[var(--text)] block">{done ? 'Révision faite !' : 'Révision du jour'}</span>
        <span className="text-[11px] text-[var(--text-light)]">{done ? 'Reviens demain' : `${reviewCount} phrases à revoir`}</span>
      </div>
      {!done && <ArrowRight size={18} weight="bold" className="relative z-10 text-[var(--text-light)]" />}
    </motion.button>
  )
}

function ContinueCard() {
  const navigate = useNavigate()

  // Find the first incomplete category
  for (const s of scenarios) {
    const { current, pct } = getCategoryStepInfo(s.id)
    if (pct < 100) {
      const stepLabel = current === 1 ? 'Écoute' : current === 2 ? 'Comprends' : 'Parle'
      return (
        <motion.button
          onClick={() => navigate(`/situations/${s.id}`)}
          className="aero-card cursor-pointer p-4 flex items-center gap-3 text-left w-full"
          whileHover={{ y: -2, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative z-10 flex-1">
            <span className="text-[11px] text-[var(--text-light)] block">Continuer</span>
            <span className="font-bold text-[14px] text-[var(--text)] block">{s.name}</span>
            <span className="text-[11px] text-[var(--text-light)]">Étape {current}/3 — {stepLabel}</span>
          </div>
          <div className="relative z-10 w-14">
            <div className="h-2 rounded-full overflow-hidden" style={{ background: '#D4E8F5', border: '1px solid #B0D0E5' }}>
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: '#2196F3' }} />
            </div>
            <span className="text-[10px] font-bold text-sky-600 block text-right mt-0.5">{pct}%</span>
          </div>
          <ArrowRight size={18} weight="bold" className="relative z-10 text-[var(--text-light)]" />
        </motion.button>
      )
    }
  }
  return null
}

export default function Hub() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-3">
      {/* Streak + Global gauge */}
      <div className="grid grid-cols-2 gap-3">
        <StreakDisplay />
        <GlobalGauge />
      </div>

      {/* Daily review */}
      <DailyReview />

      {/* Continue */}
      <ContinueCard />

      {/* Passport link */}
      <motion.button
        onClick={() => navigate('/passeport')}
        className="aero-card cursor-pointer p-3 flex items-center justify-center gap-2"
        whileHover={{ y: -2, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
        whileTap={{ scale: 0.98 }}
      >
        <Stamp size={18} weight="bold" className="relative z-10 text-[var(--text)]" />
        <span className="relative z-10 text-[13px] font-bold text-[var(--text)]">Mon Passeport</span>
      </motion.button>

      {/* Category grid */}
      <p className="text-[12px] font-bold text-white text-center mt-2" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}>
        Toutes les catégories
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {scenarios.map((s, i) => (
          <CategoryCard key={s.id} scenario={s} index={i} onClick={() => navigate(`/situations/${s.id}`)} />
        ))}
      </div>
    </div>
  )
}
