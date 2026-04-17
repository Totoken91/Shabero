import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lightning, Target, Trophy, ArrowRight } from '@phosphor-icons/react'
import { scenarios } from '../../data/scenarios'
import { isReviewDoneToday, getMarathonRecord, getUserData, getCategoryStepInfo } from '../../lib/store'
import { useUI, useT } from '../../lib/locale'

export default function QuizCategorySelect() {
  const navigate = useNavigate()
  const reviewDone = isReviewDoneToday()
  const marathonRecord = getMarathonRecord()
  const data = getUserData()
  const reviewCount = data.travelMode === 'intensive' ? 10 : data.travelMode === 'zen' ? 3 : 5
  const ui = useUI()
  const t = useT()

  return (
    <div className="max-w-[500px] mx-auto">
      <div className="phrase-card p-5 mb-4 text-center">
        <h2 className="relative z-10 text-[20px] font-[800] text-[var(--text)] m-0">{ui('quiz.training')}</h2>
      </div>

      {/* 3 big mode cards */}
      <div className="flex flex-col gap-3 mb-5">
        {/* Daily review */}
        <motion.button
          onClick={() => !reviewDone && navigate('/entrainement/review')}
          className={`aero-card cursor-pointer p-4 flex items-center gap-3 text-left ${reviewDone ? 'opacity-50' : ''}`}
          whileHover={reviewDone ? {} : { y: -2, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
          whileTap={reviewDone ? {} : { scale: 0.98 }}
          style={!reviewDone ? { borderColor: '#D4A800', borderWidth: 2 } : {}}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: reviewDone ? 0.5 : 1, y: 0 }}
        >
          <div className="icon-aqua shrink-0" style={{ background: 'linear-gradient(to bottom, #FFD54F 0%, #FFB300 40%, #FFA000 40%, #FF8F00 100%)', borderColor: '#E65100' }}>
            <Lightning size={22} weight="bold" className="text-white relative z-10" />
          </div>
          <div className="relative z-10 flex-1">
            <span className="font-bold text-[14px] text-[var(--text)] block">{reviewDone ? ui('quiz.reviewDone') : ui('quiz.reviewTitle')}</span>
            <span className="text-[11px] text-[var(--text-light)]">{reviewDone ? ui('quiz.backTomorrow') : `${reviewCount} ${ui('quiz.phrasesReviewed')}`}</span>
          </div>
          {!reviewDone && <ArrowRight size={16} weight="bold" className="relative z-10 text-[var(--text-light)]" />}
        </motion.button>

        {/* Quiz by category */}
        <motion.button
          onClick={() => navigate('/entrainement/categories')}
          className="aero-card cursor-pointer p-4 flex items-center gap-3 text-left"
          whileHover={{ y: -2, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
        >
          <div className="icon-aqua shrink-0" style={{ background: 'linear-gradient(to bottom, #5DADE2 0%, #2196F3 40%, #1976D2 40%, #1565C0 100%)', borderColor: '#0D47A1' }}>
            <Target size={22} weight="bold" className="text-white relative z-10" />
          </div>
          <div className="relative z-10 flex-1">
            <span className="font-bold text-[14px] text-[var(--text)] block">{ui('quiz.byCategory')}</span>
            <span className="text-[11px] text-[var(--text-light)]">{ui('quiz.chooseCategory')}</span>
          </div>
          <ArrowRight size={16} weight="bold" className="relative z-10 text-[var(--text-light)]" />
        </motion.button>

        {/* Marathon */}
        <motion.button
          onClick={() => navigate('/entrainement/marathon')}
          className="aero-card cursor-pointer p-4 flex items-center gap-3 text-left"
          whileHover={{ y: -2, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
        >
          <div className="icon-aqua shrink-0" style={{ background: 'linear-gradient(to bottom, #EF5350 0%, #F44336 40%, #D32F2F 40%, #C62828 100%)', borderColor: '#A01010' }}>
            <Trophy size={22} weight="bold" className="text-white relative z-10" />
          </div>
          <div className="relative z-10 flex-1">
            <span className="font-bold text-[14px] text-[var(--text)] block">{ui('quiz.marathon')}</span>
            <span className="text-[11px] text-[var(--text-light)]">
              {ui('quiz.allPhrasesRecord')} {marathonRecord > 0 ? `: ${marathonRecord}%` : ` • ${ui('quiz.questions')}`}
            </span>
          </div>
          <ArrowRight size={16} weight="bold" className="relative z-10 text-[var(--text-light)]" />
        </motion.button>
      </div>

      {/* Category progress list */}
      <p className="text-[12px] font-bold text-[var(--text-light)] text-center mb-2">{ui('quiz.categoryProgress')}</p>
      <div className="flex flex-col gap-1.5">
        {scenarios.map((s) => {
          const { pct } = getCategoryStepInfo(s.id)
          const barColor = pct >= 100 ? '#D4A800' : pct > 0 ? '#2196F3' : '#C0D4E0'
          return (
            <div key={s.id} className="flex items-center gap-2 px-1">
              <span className="text-[12px] text-[var(--text)] font-bold w-24 truncate">{t(s.name, s.name_en)}</span>
              <div className="flex-1 h-2 rounded-full bg-[#D4E8F5] overflow-hidden border border-[#B0D0E5]">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: barColor }} />
              </div>
              {pct >= 100 && <span className="text-[10px]">🏅</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
