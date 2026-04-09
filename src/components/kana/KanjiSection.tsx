import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, SpeakerHigh } from '@phosphor-icons/react'
import { kanjiCategories } from '../../data/kana'
import { speakJapanese } from '../../lib/audio'

export function KanjiCategoryList() {
  const navigate = useNavigate()

  return (
    <div className="max-w-[500px] mx-auto">
      <motion.button
        onClick={() => navigate('/kana')}
        className="mb-3 flex items-center gap-1.5 text-white font-bold text-[14px] cursor-pointer bg-transparent border-none p-0"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={18} weight="bold" />
        Retour
      </motion.button>

      <div className="phrase-card p-5 mb-4 text-center">
        <h2 className="relative z-10 text-[20px] font-[800] text-[var(--text)] m-0">Kanji essentiels</h2>
        <p className="relative z-10 text-[12px] text-[var(--text-light)] mt-1">Les kanji que tout voyageur doit reconnaître</p>
      </div>

      <div className="flex flex-col gap-2">
        {kanjiCategories.map((cat, i) => (
          <motion.button
            key={cat.id}
            onClick={() => navigate(`/kana/kanji/${cat.id}`)}
            className="aero-card cursor-pointer p-4 flex items-center gap-3 text-left"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            whileHover={{ y: -2, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative z-10 w-10 h-10 rounded-lg flex items-center justify-center font-jp text-[20px] font-bold text-[var(--text)]"
              style={{ background: 'linear-gradient(to bottom, #F0F8FF, #D8EDFA)', border: '1px solid #B0D4EA' }}>
              {cat.entries[0].kanji}
            </div>
            <div className="relative z-10 flex-1">
              <span className="font-bold text-[14px] text-[var(--text)] block">{cat.name}</span>
              <span className="text-[11px] text-[var(--text-light)]">{cat.description}</span>
            </div>
            <span className="relative z-10 phrase-badge badge-trains">{cat.entries.length}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export function KanjiDetail() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()

  const category = kanjiCategories.find((c) => c.id === categoryId)
  if (!category) { navigate('/kana/kanji'); return null }

  return (
    <div className="pb-8">
      <motion.button
        onClick={() => navigate('/kana/kanji')}
        className="mb-3 flex items-center gap-1.5 text-white font-bold text-[14px] cursor-pointer bg-transparent border-none p-0"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={18} weight="bold" />
        Retour
      </motion.button>

      <div className="detail-header p-5 text-white text-center mb-4">
        <h1 className="relative z-10 text-[20px] font-[800] m-0">{category.name}</h1>
        <p className="relative z-10 text-[12px] text-white/70 mt-1">{category.description}</p>
      </div>

      <div className="flex flex-col gap-2">
        {category.entries.map((entry, i) => (
          <motion.div
            key={i}
            className="phrase-card p-4 flex items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.3 }}
          >
            {/* Big kanji */}
            <div className="relative z-10 shrink-0 w-14 h-14 rounded-lg flex items-center justify-center font-jp text-[28px] font-bold text-[var(--text)]"
              style={{ background: 'linear-gradient(to bottom, #F0F8FF, #D8EDFA)', border: '1px solid #B0D4EA' }}>
              {entry.kanji}
            </div>

            <div className="relative z-10 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-[800] text-[var(--text)]">{entry.reading}</span>
                <button
                  onClick={() => speakJapanese(entry.kanji, 0.7)}
                  className="speaker-btn !w-7 !h-7"
                >
                  <SpeakerHigh size={13} weight="bold" />
                </button>
              </div>
              <p className="text-[13px] font-bold text-sky-700">{entry.meaning}</p>
              <p className="text-[11px] text-[var(--text-light)]">{entry.context}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
