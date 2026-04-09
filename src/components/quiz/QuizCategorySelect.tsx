import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { scenarios } from '../../data/scenarios'
import { getAllConfidence } from '../../lib/progress'

export default function QuizCategorySelect() {
  const navigate = useNavigate()
  const confidence = getAllConfidence()

  return (
    <div className="max-w-[500px] mx-auto">
      <div className="phrase-card p-5 mb-4 text-center">
        <h2 className="relative z-10 text-[20px] font-[800] text-[var(--text)] m-0">Entraînement</h2>
        <p className="relative z-10 text-[12px] text-[var(--text-light)] mt-1">Choisis une catégorie</p>
      </div>

      <div className="flex flex-col gap-2">
        {scenarios.map((s, i) => {
          const conf = confidence[s.id] ?? 0
          const barColor = conf >= 70 ? '#34A853' : conf >= 40 ? '#F5A623' : '#E53935'

          return (
            <motion.button
              key={s.id}
              onClick={() => navigate(`/entrainement/${s.id}`)}
              className="aero-card cursor-pointer p-4 flex items-center gap-3 text-left"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              whileHover={{ y: -2, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative z-10 flex-1 min-w-0">
                <span className="font-bold text-[14px] text-[var(--text)] block truncate">{s.name}</span>
                <span className="text-[11px] text-[var(--text-light)] block truncate">{s.phrases.length} phrases</span>
              </div>

              {/* Mini confidence bar */}
              <div className="relative z-10 w-20 shrink-0">
                <div className="h-2 rounded-full bg-[#D4E8F5] overflow-hidden border border-[#B0D0E5]">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${conf}%`,
                      background: `linear-gradient(90deg, ${barColor}, ${barColor}cc)`,
                    }}
                  />
                </div>
                {conf > 0 && (
                  <span className="text-[10px] font-bold block text-right mt-0.5" style={{ color: barColor }}>
                    {conf}%
                  </span>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
