import { playCorrect, playWrong } from '../../lib/sounds'
import { useState, useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, SpeakerHigh } from '@phosphor-icons/react'
import { scenarios } from '../../data/scenarios'
import { speakJapanese } from '../../lib/audio'
import { getWrongPhrases, setReviewDone, getUserData, addWrongPhrase, removeWrongPhrase, awardQuizAnswerXP, awardPerfectScoreXP, addXP } from '../../lib/store'
import { showXPToast } from '../../lib/xpToast'
import type { Phrase } from '../../types'
import { useUI, useLocale } from '../../lib/locale'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a
}

function meaning(p: Phrase, lang: 'fr' | 'en') {
  return lang === 'en' && p.en ? p.en : p.fr
}

function pickReviewPhrases(count: number): Phrase[] {
  const all = scenarios.flatMap((s) => s.phrases)
  const wrongIds = getWrongPhrases()

  const wrong = all.filter((p) => p.id && wrongIds.includes(p.id))
  const rest = all.filter((p) => !p.id || !wrongIds.includes(p.id))

  return [...shuffle(wrong), ...shuffle(rest)].slice(0, count)
}

function makeQuestions(phrases: Phrase[], lang: 'fr' | 'en') {
  const all = scenarios.flatMap((s) => s.phrases)
  return phrases.map((p) => {
    const correct = meaning(p, lang)
    const distractors = shuffle(all.filter((d) => meaning(d, lang) !== correct)).slice(0, 3).map((d) => meaning(d, lang))
    return { phrase: p, options: shuffle([correct, ...distractors]), correct }
  })
}

export default function DailyReview() {
  const navigate = useNavigate()
  const ui = useUI()
  const lang = useLocale((s) => s.lang)
  const data = getUserData()
  const count = data.travelMode === 'intensive' ? 10 : data.travelMode === 'zen' ? 3 : 5

  const [questions] = useState(() => makeQuestions(pickReviewPhrases(count), lang))
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [correct, setCorrect] = useState(0)

  const q = questions[current]
  const isLast = current >= questions.length
  const tracked = useRef(false)

  useEffect(() => {
    if (isLast && !tracked.current) {
      tracked.current = true
      addXP(30)
      showXPToast(30, 'Revision !')
      if (correct === questions.length) { const b = awardPerfectScoreXP(); if (b > 0) setTimeout(() => showXPToast(b, 'PARFAIT !'), 400) }
      setReviewDone()
    }
  }, [isLast])

  useEffect(() => {
    if (!isLast && q) setTimeout(() => speakJapanese(q.phrase.audioText ?? q.phrase.jp, 0.85, q.phrase.id), 300)
  }, [current, isLast])

  const handleSelect = useCallback((opt: string) => {
    if (selected) return
    setSelected(opt)
    const isCorrect = opt === q.correct
    const xp = awardQuizAnswerXP(isCorrect)
    showXPToast(xp)
    if (isCorrect) { setCorrect((c) => c + 1); if (q.phrase.id) removeWrongPhrase(q.phrase.id); playCorrect() }
    else { playWrong(); if (q.phrase.id) addWrongPhrase(q.phrase.id); setTimeout(() => speakJapanese(q.phrase.audioText ?? q.phrase.jp, 0.85, q.phrase.id), 500) }
  }, [selected, q])

  if (isLast) {
    return (
      <div className="max-w-[400px] mx-auto">
        <div className="phrase-card p-6 text-center">
          <p className="relative z-10 text-[28px] font-[900] text-[var(--text)]">{correct}/{questions.length}</p>
          <p className="relative z-10 text-[14px] font-bold text-emerald-600 mt-1">{lang === 'en' ? 'Review done!' : 'Révision terminée !'}</p>
          <p className="relative z-10 text-[12px] text-[var(--text-light)] mt-2">{lang === 'en' ? 'Come back tomorrow to keep your streak' : 'Reviens demain pour garder ton streak'}</p>
        </div>
        <button onClick={() => navigate('/situations')} className="aero-card cursor-pointer p-3 text-center w-full mt-4">
          <span className="relative z-10 text-[13px] font-bold text-[var(--text)]">{ui('common.back')}</span>
        </button>
      </div>
    )
  }

  return (
    <div className="pb-8">
      <motion.button onClick={() => navigate('/situations')} className="mb-3 flex items-center gap-1.5 text-white font-bold text-[14px] cursor-pointer bg-transparent border-none p-0" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }} whileTap={{ scale: 0.95 }}>
        <ArrowLeft size={18} weight="bold" /> {ui('common.back')}
      </motion.button>

      <div className="detail-header p-4 text-white text-center mb-4">
        <h1 className="relative z-10 text-[18px] font-[800] m-0">{ui('quiz.reviewTitle')}</h1>
        <div className="relative z-10 mt-2 h-1.5 rounded-full bg-white/20 overflow-hidden">
          <motion.div className="h-full rounded-full bg-white/60" animate={{ width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>
        <p className="relative z-10 text-[11px] text-white/60 mt-1">{current + 1} / {questions.length}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
          <div className="phrase-card p-8 mb-4 text-center">
            <button onClick={() => speakJapanese(q.phrase.audioText ?? q.phrase.jp, 0.85, q.phrase.id)} className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-full cursor-pointer" style={{ background: 'linear-gradient(to bottom, #FFD54F 0%, #FFB300 40%, #FFA000 40%, #FF8F00 100%)', border: '2px solid #E65100', boxShadow: '0 4px 12px rgba(180,80,0,0.25), inset 0 1px 0 rgba(255,255,255,0.4)' }}>
              <SpeakerHigh size={28} weight="bold" className="text-white" />
            </button>
            <p className="relative z-10 text-[13px] text-[var(--text-light)] mt-3">{lang === 'en' ? 'Listen to the phrase' : 'Écoute la phrase'}</p>
          </div>

          <div className="flex flex-col gap-2">
            {q.options.map((opt) => {
              const isC = opt === q.correct; const isSel = selected === opt; const show = selected !== null
              let cls = ''; if (show && isC) cls = 'quiz-correct'; else if (show && isSel && !isC) cls = 'quiz-wrong'
              return (
                <button key={opt} onClick={() => handleSelect(opt)} disabled={show} className={`phrase-card p-3 text-left cursor-pointer ${cls}`}>
                  <span className="relative z-10 text-[14px] font-bold text-[var(--text)]">{opt}</span>
                </button>
              )
            })}
          </div>

          {selected && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="phrase-card p-4 mt-3">
              <p className="relative z-10 text-[13px] font-bold text-[var(--text)]">{selected === q.correct ? (lang === 'en' ? '✓ Correct!' : '✓ Correct !') : (lang === 'en' ? `✗ It was: ${q.correct}` : `✗ C'était : ${q.correct}`)}</p>
              <p className="relative z-10 text-[12px] text-sky-700 mt-1">{q.phrase.romaji}</p>
            </motion.div>
          )}

          {selected && (
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => { setSelected(null); setCurrent((c) => c + 1) }} className="phrase-badge !text-[13px] !px-5 !py-2 !rounded-lg cursor-pointer mt-3 ml-auto block">
              {current + 1 >= questions.length ? (lang === 'en' ? 'Finish' : 'Terminer') : (lang === 'en' ? 'Next →' : 'Suivant →')}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
