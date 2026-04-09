import { useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from '@phosphor-icons/react'
import { generateQuiz } from '../../lib/quizGenerator'
import type { QuizMode } from '../../types'
import QuizResult from './QuizResult'

const MODE_LABELS: Record<QuizMode, string> = {
  'jp-fr': 'JP → FR',
  'fr-jp': 'FR → JP',
  contexte: 'Contexte',
}

export default function QuizSession() {
  const { mode } = useParams<{ mode: string }>()
  const navigate = useNavigate()
  const quizMode = (mode as QuizMode) ?? 'jp-fr'

  const [questions, setQuestions] = useState(() => generateQuiz(quizMode))
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const q = questions[current]
  const isJp = quizMode === 'jp-fr'

  const handleSelect = useCallback(
    (option: string) => {
      if (selected) return
      setSelected(option)
      if (option === q.correct) setScore((s) => s + 1)
    },
    [selected, q]
  )

  const handleNext = useCallback(() => {
    if (current + 1 >= questions.length) {
      setDone(true)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
    }
  }, [current, questions.length])

  const handleReplay = useCallback(() => {
    setQuestions(generateQuiz(quizMode))
    setCurrent(0)
    setScore(0)
    setSelected(null)
    setDone(false)
  }, [quizMode])

  if (done) {
    return (
      <div className="max-w-lg mx-auto px-4 py-4">
        <QuizResult score={score} total={questions.length} onReplay={handleReplay} />
      </div>
    )
  }

  return (
    <div className="pb-8">
      <motion.button
        onClick={() => navigate('/quiz')}
        className="mb-3 flex items-center gap-1.5 text-white font-bold text-[14px] cursor-pointer bg-transparent border-none p-0"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={18} weight="bold" />
        Retour
      </motion.button>

      {/* Header with score */}
      <div className="detail-header p-4 text-white text-center mb-4">
        <p className="relative z-10 text-[13px] font-bold">{MODE_LABELS[quizMode]}</p>
        <div className="relative z-10 flex justify-center gap-4 mt-1 text-[12px]">
          <span className="text-green-200">Correct : {score}</span>
          <span className="text-red-200">Faux : {current - score + (selected && selected !== q.correct ? 0 : 0)}</span>
        </div>
        {/* Progress */}
        <div className="relative z-10 mt-2 h-1.5 rounded-full bg-white/20 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-white/60"
            animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>
        <p className="relative z-10 text-[11px] text-white/60 mt-1">{current + 1} / {questions.length}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.2 }}
        >
          {/* Question */}
          <div className="phrase-card p-5 mb-4 text-center">
            <p className={`relative z-10 ${isJp ? 'font-jp text-[26px]' : 'text-[18px]'} font-bold text-[var(--text)]`}>
              {q.question}
            </p>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-2">
            {q.options.map((opt) => {
              const isSelected = selected === opt
              const isCorrect = opt === q.correct
              const showResult = selected !== null

              let extraClass = ''
              if (showResult && isCorrect) extraClass = 'quiz-correct'
              else if (showResult && isSelected && !isCorrect) extraClass = 'quiz-wrong'

              return (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  disabled={selected !== null}
                  className={`phrase-card p-3 text-left cursor-pointer transition-all ${extraClass} ${!showResult ? 'hover:!shadow-[0_4px_16px_rgba(0,100,160,0.2)]' : ''}`}
                >
                  <span className={`relative z-10 ${isJp ? 'text-[14px]' : 'font-jp text-[16px]'} font-bold text-[var(--text)]`}>
                    {opt}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Feedback */}
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="phrase-card p-4 mt-3"
            >
              <p className="relative z-10 text-[13px] text-[var(--text)]">
                {selected === q.correct ? '✓ Bonne réponse !' : `✗ La réponse était : ${q.correct}`}
              </p>
              <p className="relative z-10 text-[12px] text-[var(--text-light)] mt-1">{q.explanation}</p>
            </motion.div>
          )}

          {/* Next button */}
          {selected && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleNext}
              className="phrase-badge !text-[13px] !px-5 !py-2 !rounded-lg cursor-pointer mt-3 ml-auto block"
            >
              {current + 1 >= questions.length ? 'Voir le score' : 'Suivant →'}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
