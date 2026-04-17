import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock, Star } from '@phosphor-icons/react'
import { hiraganaGroups, katakanaGroups } from '../../data/kana'
import { isKanaGroupMastered, getKanaStreak } from '../../lib/progress'
import { useUI, useT, useLocale } from '../../lib/locale'

export default function KanaGroupList() {
  const { type } = useParams<{ type: string }>()
  const navigate = useNavigate()
  const ui = useUI()
  const t = useT()
  const lang = useLocale((s) => s.lang)
  const groups = type === 'katakana' ? katakanaGroups : hiraganaGroups
  const label = type === 'katakana' ? 'Katakana' : 'Hiragana'

  return (
    <div className="max-w-[500px] mx-auto">
      <motion.button
        onClick={() => navigate('/kana')}
        className="mb-3 flex items-center gap-1.5 text-white font-bold text-[14px] cursor-pointer bg-transparent border-none p-0"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={18} weight="bold" />
        {ui('common.back')}
      </motion.button>

      <div className="phrase-card p-5 mb-4 text-center">
        <h2 className="relative z-10 text-[20px] font-[800] text-[var(--text)] m-0">{label}</h2>
        <p className="relative z-10 text-[12px] text-[var(--text-light)] mt-1">{lang === 'en' ? '10 groups — 5 kana per group' : '10 groupes — 5 kana par groupe'}</p>
      </div>

      <div className="flex flex-col gap-2">
        {groups.map((group, i) => {
          const mastered = isKanaGroupMastered(type!, group.id)
          const streak = getKanaStreak(type!, group.id)
          const prevMastered = i === 0 || isKanaGroupMastered(type!, groups[i - 1].id)
          const locked = !prevMastered

          return (
            <motion.button
              key={group.id}
              onClick={() => !locked && navigate(`/kana/${type}/${group.id}`)}
              className={`aero-card cursor-pointer p-4 flex items-center gap-3 text-left ${locked ? 'opacity-50' : ''}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: locked ? 0.5 : 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              whileHover={locked ? {} : { y: -2, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
              whileTap={locked ? {} : { scale: 0.98 }}
            >
              {/* Kana preview */}
              <div className="relative z-10 w-10 h-10 rounded-lg flex items-center justify-center font-jp text-[20px] font-bold text-[var(--text)]"
                style={{ background: 'linear-gradient(to bottom, #F0F8FF, #D8EDFA)', border: '1px solid #B0D4EA' }}>
                {locked ? <Lock size={18} weight="bold" className="text-[var(--text-light)]" /> : group.kana[0].character}
              </div>

              <div className="relative z-10 flex-1 min-w-0">
                <span className="font-bold text-[14px] text-[var(--text)] block">{t(group.name, group.name_en)}</span>
                <span className="text-[11px] text-[var(--text-light)] block">
                  {group.kana.map((k) => k.character).join(' ')}
                </span>
              </div>

              {/* Status */}
              <div className="relative z-10 shrink-0">
                {mastered ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                    style={{ background: 'linear-gradient(to bottom, #FFD54F 0%, #FFB300 40%, #FFA000 40%, #FF8F00 100%)', border: '1px solid #E65100' }}>
                    <Star size={10} weight="fill" /> {lang === 'en' ? 'Mastered' : 'Maîtrisé'}
                  </span>
                ) : streak > 0 ? (
                  <span className="text-[11px] font-bold text-sky-600">{streak}/3</span>
                ) : null}
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
