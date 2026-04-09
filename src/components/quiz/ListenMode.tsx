import { useState, useCallback, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, SpeakerHigh } from '@phosphor-icons/react'
import { generateListenQuiz } from '../../lib/quizGenerator'
import { speakJapanese } from '../../lib/audio'
import { recordAnswer, getConfidence } from '../../lib/progress'
import type { ListenQuestion } from '../../lib/quizGenerator'

export default function ListenMode() {
  const { scenarioId } = useParams<{ scenarioId: string }>()
  const navigate = useNavigate()

  const [questions] = useState<ListenQuestion[]>(() => generateListenQuiz(scenarioId!, 10))
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  const q = questions[current]
  const isLast = current >= questions.length

  // Auto-play audio on new question
  useEffect(() => {
    if (!isLast && q) {
      const timer = setTimeout(() => speakJapanese(q.phrase.audioText ?? q.phrase.jp), 300)
      return () => clearTimeout(timer)
    }
  }, [current, isLast, q])

  const handleSelect = useCallback((option: string) => {
    if (selected) return
    setSelected(option)
    const correct = option === q.phrase.fr
    if (correct) setScore((s) => s + 1)
    recordAnswer(scenarioId!, q.phrase.id ?? '', correct)

    // Replay audio on wrong answer
    if (!correct) {
      setTimeout(() => speakJapanese(q.phrase.audioText ?? q.phrase.jp), 500)
    }
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
          <button onClick={() => { setCurrent(0); setScore(0); setSelected(null) }} className="aero-card flex-1 cursor-pointer p-3 text-center">
            <span className="relative z-10 text-[13px] font-bold text-[var(--text)]">Rejouer</span>
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

      {/* Progress */}
      <div className="phrase-card p-3 mb-4 text-center">
        <div className="relative z-10 h-1.5 rounded-full bg-[#D4E8F5] overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #2196F3, #1565C0)' }}
            animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>
        <p className="relative z-10 text-[11px] text-[var(--text-light)] mt-1">{current + 1} / {questions.length}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.2 }}
        >
          {/* Big play button */}
          <div className="phrase-card p-8 mb-4 text-center">
            <button
              onClick={() => speakJapanese(q.phrase.audioText ?? q.phrase.jp)}
              className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-full cursor-pointer"
              style={{
                background: 'linear-gradient(to bottom, #5DADE2 0%, #2196F3 40%, #1976D2 40%, #1565C0 100%)',
                border: '2px solid #0D47A1',
                boxShadow: '0 4px 12px rgba(0,80,160,0.3), inset 0 1px 0 rgba(255,255,255,0.4)',
              }}
            >
              <SpeakerHigh size={28} weight="bold" className="text-white" />
            </button>
            <p className="relative z-10 text-[13px] text-[var(--text-light)] mt-3">Écoute la phrase</p>
          </div>

          {/* 4 FR options */}
          <div className="flex flex-col gap-2">
            {q.options.map((opt) => {
              const isCorrect = opt === q.phrase.fr
              const isSelected = selected === opt
              const showResult = selected !== null

              let cls = ''
              if (showResult && isCorrect) cls = 'quiz-correct'
              else if (showResult && isSelected && !isCorrect) cls = 'quiz-wrong'

              return (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  disabled={selected !== null}
                  className={`phrase-card p-3 text-left cursor-pointer ${cls}`}
                >
                  <span className="relative z-10 text-[14px] font-bold text-[var(--text)]">{opt}</span>
                </button>
              )
            })}
          </div>

          {/* Feedback */}
          {selected && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="phrase-card p-4 mt-3">
              <p className="relative z-10 text-[13px] font-bold text-[var(--text)]">
                {selected === q.phrase.fr ? '✓ Correct !' : `✗ C'était : ${q.phrase.fr}`}
              </p>
              <p className="relative z-10 text-[12px] text-sky-700 mt-1">{q.phrase.romaji}</p>
              {q.phrase.tip && <p className="relative z-10 text-[11px] text-[var(--text-light)] mt-1">{q.phrase.tip}</p>}
            </motion.div>
          )}

          {selected && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleNext}
              className="phrase-badge !text-[13px] !px-5 !py-2 !rounded-lg cursor-pointer mt-3 ml-auto block"
            >
              {current + 1 >= questions.length ? 'Voir le résultat' : 'Suivant →'}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
