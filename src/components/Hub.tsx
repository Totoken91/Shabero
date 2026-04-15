import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Stamp, CaretDown } from '@phosphor-icons/react'
import { scenarios } from '../data/scenarios'
import { getStreak, getGlobalProgress, getCategoryStepInfo, getXPData, getLevelFromXP, getXPForNextLevel, getDailyQuota, getCategoryProgress } from '../lib/store'
import CategoryCard from './CategoryCard'
import TipOfTheDay from './TipOfTheDay'
import DailyObjective from './DailyObjective'

const CATEGORY_GROUPS = [
  { key: 'bases', emoji: '🎒', label: 'Les bases', ids: ['politesse', 'parlersoi', 'nombres', 'navigation'] },
  { key: 'quotidien', emoji: '🍜', label: 'Quotidien', ids: ['konbini', 'izakaya', 'trains', 'shopping', 'hotel', 'urgences'] },
  { key: 'social', emoji: '🎉', label: 'Social', ids: ['socialiser', 'reactions', 'nightlife', 'insultes'] },
]

// Determine how much to show based on progression
function getVisibility() {
  const xp = getXPData()
  const { current } = getStreak()
  const quota = getDailyQuota()
  const pct = getGlobalProgress(scenarios.length)
  const totalSessions = quota.sessionsCompleted.length
  const hasAnyXP = xp.totalXP > 0
  const hasCompletedASession = totalSessions > 0 || hasAnyXP

  return {
    isFresh: !hasCompletedASession,
    showStreak: current >= 2 || (hasCompletedASession && current > 0),
    showXP: hasAnyXP,
    showGauge: pct > 0,
    showContinue: false, // Removed: DailyObjective handles this now
  }
}

function StreakDisplay() {
  const { current, longest } = getStreak()
  const flames = current >= 14 ? '🔥🔥🔥' : current >= 7 ? '🔥🔥' : '🔥'

  return (
    <div className="phrase-card p-4 flex items-center gap-3">
      <span className="relative z-10 text-[28px]">{flames}</span>
      <div className="relative z-10">
        <span className="font-bold text-[18px] text-[var(--text)]">{current} jour{current > 1 ? 's' : ''}</span>
        {longest > current && (
          <span className="text-[11px] text-[var(--text-light)] block">Record : {longest} jours</span>
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
  const xpCurrent = xp.totalXP - next.current
  const xpNeeded = next.next - next.current

  return (
    <div className="phrase-card" style={{ padding: '8px 12px' }}>
      <div className="relative z-10 flex items-center gap-2">
        <span className="text-[16px] shrink-0">{info.badge}</span>
        <span className="text-[12px] font-bold text-[var(--text)] shrink-0">Nv.{info.level}</span>
        <div className="flex-1 xp-bar-container" style={{ height: 10 }}>
          <motion.div
            className={`xp-bar-fill ${info.tier}`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(pct, 2)}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <span className="text-[11px] font-bold text-[var(--text-light)] shrink-0">
          {info.level >= 30 ? 'MAX' : `${xpCurrent}/${xpNeeded} XP`}
        </span>
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

function getGroupProgress(ids: string[]) {
  let started = 0
  let done = 0
  for (const id of ids) {
    const p = getCategoryProgress(id)
    if (p.stampEarned) { done++; started++ }
    else if (p.step1Complete || p.step2Complete || p.step3Complete) started++
  }
  return { started, done, total: ids.length }
}

function CategoryGroup({ group, defaultOpen, navigate }: {
  group: typeof CATEGORY_GROUPS[number]
  defaultOpen: boolean
  navigate: ReturnType<typeof useNavigate>
}) {
  const [open, setOpen] = useState(defaultOpen)
  const cats = group.ids.map(id => scenarios.find(s => s.id === id)!).filter(Boolean)
  const { started, done, total } = getGroupProgress(group.ids)

  return (
    <div>
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="aero-card cursor-pointer w-full flex items-center gap-2.5"
        style={{ padding: '10px 14px' }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative z-10 text-[18px]">{group.emoji}</span>
        <span className="relative z-10 flex-1 text-left font-bold text-[14px] text-[var(--text)]">
          {group.label}
        </span>
        {!open && started > 0 && (
          <span className="relative z-10 text-[11px] font-bold text-[var(--text-light)]">
            {done === total ? '✅' : `${done}/${total}`}
          </span>
        )}
        <motion.span
          className="relative z-10"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <CaretDown size={16} weight="bold" className="text-[var(--text-light)]" />
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 mt-3">
              {cats.map((s, i) => (
                <CategoryCard key={s.id} scenario={s} index={i} onClick={() => navigate(`/situations/${s.id}`)} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
  const vis = getVisibility()
  const quota = getDailyQuota()
  const allDone = quota.sessionsCompleted.length >= quota.sessionsRequired

  return (
    <div className="flex flex-col gap-3">
      {/* Stats row — only show what's earned */}
      {(vis.showStreak || vis.showGauge) && (
        <div className={`grid gap-3 ${vis.showStreak && vis.showGauge ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {vis.showStreak && <StreakDisplay />}
          {vis.showGauge && <GlobalGauge />}
        </div>
      )}

      {/* XP bar — only after earning XP */}
      {vis.showXP && <XPBar />}

      {/* Daily objective — always visible, adapts its own content */}
      <DailyObjective />

      {/* Continue — only when daily objective is fully complete */}
      {allDone && !vis.isFresh && <ContinueCard />}

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

      {/* Category groups */}
      <p className="text-[12px] font-bold text-white text-center mt-2" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}>
        Toutes les catégories
      </p>
      <div className="flex flex-col gap-3">
        {CATEGORY_GROUPS.map((g) => (
          <CategoryGroup key={g.key} group={g} defaultOpen={g.key === 'bases'} navigate={navigate} />
        ))}
      </div>
    </div>
  )
}
