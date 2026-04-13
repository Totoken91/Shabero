import { playCorrect, playWrong } from '../../lib/sounds'
import { useState, useCallback, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, SpeakerHigh } from '@phosphor-icons/react'
import { generateSpeakQuiz } from '../../lib/quizGenerator'
import { speakJapanese } from '../../lib/audio'
import { recordAnswer, getConfidence } from '../../lib/progress'
import { completeSession, awardQuizAnswerXP, awardPerfectScoreXP, addXP } from '../../lib/store'
import { showXPToast } from '../../lib/xpToast'
import type { SpeakQuestion } from '../../lib/quizGenerator'

export default function SpeakMode() {
  const { scenarioId } = useParams<{ scenarioId: string }>()
  const navigate = useNavigate()

  const [questions] = useState<SpeakQuestion[]>(() => generateSpeakQuiz(scenarioId!, 10))
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)

  const q = questions[current]
  const isLast = current >= questions.length
  const tracked = useRef(false)

  useEffect(() => {
    if (isLast && !tracked.current) {
      tracked.current = true
      addXP(40)
      showXPToast(40, 'Quiz !')
      if (score === questions.length) { const b = awardPerfectScoreXP(); if (b > 0) setTimeout(() => showXPToast(b, 'PARFAIT !'), 400) }
      completeSession('quick_quiz')
    }
  }, [isLast])

  const handleSelect = useCallback((idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    const correct = q.options[idx].jp === q.correctPhrase.jp
    const xp = awardQuizAnswerXP(correct)
    showXPToast(xp)
    if (correct) { setScore((s) => s + 1); playCorrect() } else { playWrong() }
    recordAnswer(scenarioId!, q.correctPhrase.id ?? '', correct)
  }, [selected, q, scenarioId])

  const handleNext = useCallback(() => {
    setSelected(null)
    setCurrent((c) => c + 1)
  }, [])

  const confidence = getConfidence(scenarioId!)

  if (isLast) {
    const barColor = confidence >= 70 ? '#34A853' : confidence >= 40 ? '#F5A623' : '#E53935'
    return (
      <div className="max-w-[400px] mx-auto">
        <div className="phrase-card p-6 text-center">
          <p className="relative z-10 text-[28px] font-[900] text-[var(--text)]">{score}/{questions.length}</p>
          <p className="relative z-10 text-[14px] font-bold text-[var(--text)] mt-1">
            {score >= 8 ? 'Sugoi !' : score >= 5 ? 'Pas mal !' : 'Ganbatte !'}
          </p>
          <div className="relative z-10 mt-4">
            <p className="text-[11px] font-bold text-[var(--text-light)] mb-1">Confiance : {confidence}%</p>
            <div className="h-3 rounded-full bg-[#D4E8F5] overflow-hidden border border-[#B0D0E5]">
              <div className="h-full rounded-full" style={{ width: `${confidence}%`, background: barColor }} />
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={() => navigate(`/entrainement/${scenarioId}`)} className="aero-card flex-1 cursor-pointer p-3 text-center">
            <span className="relative z-10 text-[13px] font-bold text-[var(--text)]">Modes</span>
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
        Retour
      </motion.button>

      <div className="phrase-card p-3 mb-4 text-center">
        <div className="relative z-10 h-1.5 rounded-full bg-[#D4E8F5] overflow-hidden">
          <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #4CAF50, #2E7D32)' }} animate={{ width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>
        <p className="relative z-10 text-[11px] text-[var(--text-light)] mt-1">{current + 1} / {questions.length}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
          {/* Situation */}
          <div className="phrase-card p-5 mb-4 text-center">
            <p className="relative z-10 text-[15px] font-bold text-[var(--text)]">{q.situation}</p>
            <p className="relative z-10 text-[12px] text-[var(--text-light)] mt-1">Écoute les options et choisis la bonne</p>
          </div>

          {/* 4 audio options */}
          <div className="flex flex-col gap-2">
            {q.options.map((opt, idx) => {
              const isCorrect = opt.jp === q.correctPhrase.jp
              const isChosen = selected === idx
              const showResult = selected !== null

              let cls = ''
              if (showResult && isCorrect) cls = 'quiz-correct'
              else if (showResult && isChosen && !isCorrect) cls = 'quiz-wrong'

              return (
                <div key={idx} className={`phrase-card p-3 flex items-center gap-3 ${cls}`}>
                  <button
                    onClick={() => speakJapanese(opt.audioText ?? opt.jp, 0.85, opt.id)}
                    className="relative z-10 inline-flex items-center justify-center w-10 h-10 rounded-full shrink-0 cursor-pointer"
                    style={{
                      background: 'linear-gradient(to bottom, #F0F8FF 0%, #D8EDFA 45%, #CCE5F5 45%, #B0D4EA 100%)',
                      border: '1px solid #98C4DE',
                    }}
                  >
                    <SpeakerHigh size={18} weight="bold" className="text-[var(--text)]" />
                  </button>
                  <button
                    onClick={() => handleSelect(idx)}
                    disabled={selected !== null}
                    className="relative z-10 flex-1 text-left cursor-pointer bg-transparent border-none p-0"
                  >
                    <span className="text-[13px] font-bold text-[var(--text)]">Option {String.fromCharCode(65 + idx)}</span>
                    {showResult && isCorrect && (
                      <span className="block text-[12px] text-sky-700 mt-0.5">{opt.romaji}</span>
                    )}
                  </button>
                </div>
              )
            })}
          </div>

          {selected !== null && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="phrase-card p-4 mt-3">
              <p className="relative z-10 text-[13px] font-bold text-[var(--text)]">
                {q.options[selected].jp === q.correctPhrase.jp ? '✓ Correct !' : '✗ Pas celle-là...'}
              </p>
              <p className="relative z-10 text-[14px] font-bold text-sky-700 mt-1">{q.correctPhrase.romaji}</p>
              <p className="relative z-10 text-[12px] text-[var(--text)] mt-0.5">{q.correctPhrase.fr}</p>
            </motion.div>
          )}

          {selected !== null && (
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={handleNext} className="phrase-badge !text-[13px] !px-5 !py-2 !rounded-lg cursor-pointer mt-3 ml-auto block">
              {current + 1 >= questions.length ? 'Voir le résultat' : 'Suivant →'}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
