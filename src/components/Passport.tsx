import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from '@phosphor-icons/react'
import { scenarios } from '../data/scenarios'
import { getCategoryProgress, getGlobalProgress } from '../lib/store'
import { useUI, useT, useLocale } from '../lib/locale'

const STAMPS: Record<string, { icon: string; label: string }> = {
  konbini:    { icon: '🍙', label: 'Onigiri' },
  izakaya:    { icon: '🍶', label: 'Tokkuri' },
  trains:     { icon: '🚅', label: 'Shinkansen' },
  shopping:   { icon: '🛍️', label: 'Shopping' },
  urgences:   { icon: '🏥', label: 'Urgences' },
  socialiser: { icon: '🤝', label: 'Social' },
  reactions:  { icon: '💬', label: 'Réactions' },
  nightlife:  { icon: '🌙', label: 'Nightlife' },
  insultes:   { icon: '🤬', label: 'Slang' },
  hotel:      { icon: '🏨', label: 'Hôtel' },
  navigation: { icon: '🗺️', label: 'Navigation' },
  politesse:  { icon: '🙏', label: 'Politesse' },
  nombres:    { icon: '🔢', label: 'Nombres' },
}

export default function Passport() {
  const navigate = useNavigate()
  const globalPct = getGlobalProgress(scenarios.length)
  const earned = scenarios.filter((s) => getCategoryProgress(s.id).stampEarned).length
  const ui = useUI()
  const t = useT()
  const lang = useLocale((s) => s.lang)

  return (
    <div className="pb-8">
      <motion.button
        onClick={() => navigate('/situations')}
        className="mb-3 flex items-center gap-1.5 text-white font-bold text-[14px] cursor-pointer bg-transparent border-none p-0"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={18} weight="bold" />
        {ui('common.back')}
      </motion.button>

      {/* Passport cover */}
      <motion.div
        className="passport-cover p-6 text-center mb-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <p className="text-[14px] font-bold tracking-widest uppercase opacity-70">{ui('passport.title')}</p>
        <p className="text-[28px] font-[900] mt-1">しゃべろう</p>
        <p className="text-[13px] mt-1 opacity-80">{ui('passport.tagline')}</p>
        <div className="mt-3 inline-block px-4 py-1 rounded-full text-[12px] font-bold" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}>
          {earned}/{scenarios.length} {ui('passport.stamps')} • {globalPct}% {ui('passport.completed')}
        </div>
      </motion.div>

      {/* Stamp grid */}
      <div className="grid grid-cols-3 gap-3">
        {scenarios.map((s, i) => {
          const prog = getCategoryProgress(s.id)
          const stamp = STAMPS[s.id] ?? { icon: '?', label: s.name }

          return (
            <motion.div
              key={s.id}
              className="phrase-card p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              {/* Stamp circle */}
              <div className={`stamp-circle mx-auto ${prog.stampEarned ? 'stamp-circle--earned' : 'stamp-circle--empty'}`}
                style={prog.stampEarned ? { transform: `rotate(${((s.id.charCodeAt(0) + s.id.charCodeAt(s.id.length - 1)) % 11) - 5}deg)` } : {}}>
                {prog.stampEarned ? (
                  <span className="text-[28px]">{stamp.icon}</span>
                ) : (
                  <span className="text-[20px] text-[#B0C8D8]">?</span>
                )}
              </div>

              <p className="relative z-10 text-[12px] font-bold text-[var(--text)] mt-2">{t(s.name, s.name_en)}</p>

              {prog.stampEarned && prog.stampDate && (
                <p className="relative z-10 text-[10px] text-[var(--text-light)] mt-0.5">
                  {new Date(prog.stampDate).toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR', { day: 'numeric', month: 'short' })}
                </p>
              )}

              {!prog.stampEarned && (
                <p className="relative z-10 text-[10px] text-[var(--text-light)] mt-0.5">
                  {ui('passport.notYet')}
                </p>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Completion message */}
      {earned === scenarios.length && (
        <motion.div
          className="phrase-card p-5 mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="relative z-10 text-[18px] font-[800] text-[var(--text)]">
            {ui('passport.complete')}
          </p>
          <p className="relative z-10 text-[13px] text-[var(--text-light)] mt-1">
            {ui('passport.completeMsg')}
          </p>
        </motion.div>
      )}
    </div>
  )
}
