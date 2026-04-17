import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, SpeakerHigh, ArrowRight } from '@phosphor-icons/react'
import { generateRepeatDrill } from '../../lib/quizGenerator'
import { speakJapanese } from '../../lib/audio'
import { completeSession, addXP } from '../../lib/store'
import { showXPToast } from '../../lib/xpToast'
import type { RepeatQuestion } from '../../lib/quizGenerator'
import { useUI, useT, useLocale } from '../../lib/locale'

export default function RepeatMode() {
  const { scenarioId } = useParams<{ scenarioId: string }>()
  const navigate = useNavigate()
  const ui = useUI()
  const t = useT()
  const lang = useLocale((s) => s.lang)

  const [questions] = useState<RepeatQuestion[]>(() => generateRepeatDrill(scenarioId!, 10))
  const [current, setCurrent] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const isLast = current >= questions.length
  const q = questions[current]
  const tracked = useRef(false)

  useEffect(() => {
    if (isLast && !tracked.current) {
      tracked.current = true
      addXP(40)
      showXPToast(40, 'Drill !')
      completeSession('quick_quiz')
    }
  }, [isLast])

  if (isLast) {
    return (
      <div className="max-w-[400px] mx-auto">
        <div className="phrase-card p-6 text-center">
          <p className="relative z-10 text-[20px] font-[800] text-[var(--text)]">{lang === 'en' ? 'Drill complete!' : 'Drill terminé !'}</p>
          <p className="relative z-10 text-[13px] text-[var(--text-light)] mt-2">{lang === 'en' ? `You practiced ${questions.length} phrases.` : `Tu as pratiqué ${questions.length} phrases.`}</p>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={() => navigate(`/entrainement/${scenarioId}`)} className="aero-card flex-1 cursor-pointer p-3 text-center">
            <span className="relative z-10 text-[13px] font-bold text-[var(--text)]">{ui('common.back')}</span>
          </button>
          <button onClick={() => { setCurrent(0); setRevealed(false) }} className="aero-card flex-1 cursor-pointer p-3 text-center">
            <span className="relative z-10 text-[13px] font-bold text-[var(--text)]">{lang === 'en' ? 'Restart' : 'Recommencer'}</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-8">
      <motion.button
        onClick={() => navigate(`/entrainement/${scenarioId}`)}
        className="mb-3 flex items-center gap-1.5 text-white font-bold text-[14px] cursor-pointer bg-transparent border-none p-0"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={18} weight="bold" />
        {ui('common.back')}
      </motion.button>

      <div className="phrase-card p-3 mb-4 text-center">
        <div className="relative z-10 h-1.5 rounded-full bg-[#D4E8F5] overflow-hidden">
          <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #FF8C00, #E67300)' }} animate={{ width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>
        <p className="relative z-10 text-[11px] text-[var(--text-light)] mt-1">{current + 1} / {questions.length}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
          {/* Big play button */}
          <div className="phrase-card p-8 mb-4 text-center">
            <button
              onClick={() => speakJapanese(q.phrase.audioText ?? q.phrase.jp, 0.75, q.phrase.id)}
              className="relative z-10 inline-flex items-center justify-center w-20 h-20 rounded-full cursor-pointer"
              style={{
                background: 'linear-gradient(to bottom, #FFA940 0%, #FF8C00 40%, #E67300 40%, #CC6200 100%)',
                border: '2px solid #B55500',
                boxShadow: '0 4px 12px rgba(180,80,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)',
              }}
            >
              <SpeakerHigh size={32} weight="bold" className="text-white" />
            </button>
            <p className="relative z-10 text-[13px] text-[var(--text-light)] mt-3">{lang === 'en' ? 'Listen and repeat out loud' : 'Écoute et répète à voix haute'}</p>
          </div>

          <div className="phrase-card p-5 mb-3 text-center">
            <p className="relative z-10 text-[22px] font-[800] text-[var(--text)]">{q.phrase.romaji}</p>
            <p className="relative z-10 text-[13px] text-[var(--text-light)] mt-2">{t(q.phrase.fr, q.phrase.en)}</p>
          </div>

          {!revealed ? (
            <button onClick={() => setRevealed(true)} className="phrase-card p-3 w-full text-center cursor-pointer">
              <span className="relative z-10 text-[12px] text-[var(--text-light)]">{lang === 'en' ? 'Show kana / kanji' : 'Voir les kana / kanji'}</span>
            </button>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="phrase-card p-4 text-center">
              {q.phrase.hiragana && <p className="relative z-10 font-jp text-[18px] text-[#5A8AB0]">{q.phrase.hiragana}</p>}
              <p className="relative z-10 font-jp text-[14px] text-[#8AAFC0] mt-1">{q.phrase.jp}</p>
            </motion.div>
          )}

          {/* Nav buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => speakJapanese(q.phrase.audioText ?? q.phrase.jp, 0.55, q.phrase.id)}
              className="speaker-btn !w-auto !rounded-lg px-4 py-2 flex items-center gap-1.5 text-[13px] font-bold"
            >
              <SpeakerHigh size={14} weight="bold" />
              {ui('common.slow')}
            </button>
            <button
              onClick={() => { setCurrent((c) => c + 1); setRevealed(false) }}
              className="phrase-badge !text-[13px] !px-5 !py-2 !rounded-lg flex items-center gap-1.5 cursor-pointer ml-auto"
            >
              {lang === 'en' ? 'Next' : 'Suivant'} <ArrowRight size={14} weight="bold" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
