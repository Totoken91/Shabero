import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Stamp } from '@phosphor-icons/react'
import { scenarios } from '../data/scenarios'
import { getStreak, getGlobalProgress, getCategoryStepInfo, getXPData, getLevelFromXP, getXPForNextLevel } from '../lib/store'
import CategoryCard from './CategoryCard'
import TipOfTheDay from './TipOfTheDay'
import DailyObjective from './DailyObjective'

type HubState = 'fresh' | 'started'

function getHubState(): HubState {
  return getGlobalProgress(scenarios.length) > 0 ? 'started' : 'fresh'
}

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

function XPBar() {
  const xp = getXPData()
  const info = getLevelFromXP(xp.totalXP)
  const next = getXPForNextLevel(info.level)
  const pct = info.level >= 30 ? 100 : Math.round(((xp.totalXP - next.current) / (next.next - next.current)) * 100)
  const remaining = info.level >= 30 ? 0 : next.next - xp.totalXP

  return (
    <div className="phrase-card p-4">
      <div className="relative z-10 flex items-center gap-3 mb-2">
        <div
          className="level-badge shrink-0"
          style={{ background: `linear-gradient(to bottom, var(--card-top), var(--card-bot))`, width: 40, height: 40, fontSize: 20 }}
        >
          {info.badge}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold text-[var(--text)] truncate">{info.badge} {info.title} — Niveau {info.level}</p>
          <div className="xp-bar-container mt-1">
            <motion.div
              className={`xp-bar-fill ${info.tier}`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(pct, 2)}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <p className="text-[10px] text-[var(--text-light)] mt-0.5">
            {info.level >= 30 ? 'Niveau max !' : `${remaining.toLocaleString()} XP jusqu'au niveau ${info.level + 1}`}
          </p>
        </div>
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

function ContinueCard() {
  const navigate = useNavigate()

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
  const state = getHubState()

  return (
    <div className="flex flex-col gap-3">
      {/* Streak + Global gauge */}
      <div className="grid grid-cols-2 gap-3">
        <StreakDisplay />
        <GlobalGauge />
      </div>

      {/* XP bar */}
      <XPBar />

      {/* Daily objective */}
      <DailyObjective />

      {/* Continue */}
      {state !== 'fresh' && <ContinueCard />}

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

      {/* Tip of the day */}
      <TipOfTheDay />

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
