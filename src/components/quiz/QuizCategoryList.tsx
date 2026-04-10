import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from '@phosphor-icons/react'
import { scenarios } from '../../data/scenarios'
import { getCategoryStepInfo } from '../../lib/store'

export default function QuizCategoryList() {
  const navigate = useNavigate()

  return (
    <div className="max-w-[500px] mx-auto">
      <motion.button
        onClick={() => navigate('/entrainement')}
        className="mb-3 flex items-center gap-1.5 text-white font-bold text-[14px] cursor-pointer bg-transparent border-none p-0"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={18} weight="bold" /> Retour
      </motion.button>

      <div className="phrase-card p-5 mb-4 text-center">
        <h2 className="relative z-10 text-[20px] font-[800] text-[var(--text)] m-0">Quiz par catégorie</h2>
        <p className="relative z-10 text-[12px] text-[var(--text-light)] mt-1">Choisis ta catégorie</p>
      </div>

      <div className="flex flex-col gap-2">
        {scenarios.map((s, i) => {
          const { pct } = getCategoryStepInfo(s.id)
          return (
            <motion.button
              key={s.id}
              onClick={() => navigate(`/entrainement/${s.id}`)}
              className="aero-card cursor-pointer p-4 flex items-center gap-3 text-left"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
              whileHover={{ y: -2, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative z-10 flex-1 min-w-0">
                <span className="font-bold text-[14px] text-[var(--text)] block truncate">{s.name}</span>
                <span className="text-[11px] text-[var(--text-light)]">{s.phrases.length} phrases</span>
              </div>
              <div className="relative z-10 w-16 shrink-0">
                <div className="h-2 rounded-full bg-[#D4E8F5] overflow-hidden border border-[#B0D0E5]">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct >= 100 ? '#D4A800' : '#2196F3' }} />
                </div>
              </div>
              {pct >= 100 && <span className="text-[10px]">🏅</span>}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
