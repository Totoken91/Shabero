import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, SpeakerHigh, Lightbulb } from '@phosphor-icons/react'
import { lessons } from '../../data/lessons'

export default function LessonPlayer() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)

  const lesson = lessons.find((l) => l.id === id)
  if (!lesson) {
    return <div className="p-6 text-center text-[var(--text-light)]">Leçon introuvable.</div>
  }

  const total = lesson.steps.length
  const isLast = step >= total
  const current = lesson.steps[step]

  return (
    <div className="pb-8">
      <motion.button
        onClick={() => navigate('/cours')}
        className="mb-3 flex items-center gap-1.5 text-white font-bold text-[14px] cursor-pointer bg-transparent border-none p-0"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={18} weight="bold" />
        Retour
      </motion.button>

      <div className="detail-header p-5 text-white text-center mb-4">
        <h1 className="relative z-10 text-[20px] font-[800] m-0">{lesson.title}</h1>
        {/* Progress bar */}
        <div className="relative z-10 mt-3 h-2 rounded-full bg-white/20 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #5AC87A, #34A853)' }}
            animate={{ width: `${isLast ? 100 : (step / total) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="relative z-10 text-[12px] text-white/70 mt-1">
          {isLast ? 'Terminé !' : `${step + 1} / ${total}`}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {isLast ? (
          /* Recap screen */
          <motion.div
            key="recap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="phrase-card p-5 mb-4 text-center">
              <p className="relative z-10 text-[18px] font-bold text-[var(--text)]">
                Leçon terminée !
              </p>
              <p className="relative z-10 text-[13px] text-[var(--text-light)] mt-2">
                Tu as appris {total} phrases. Voici le récap :
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {lesson.steps.map((s, i) => (
                <div key={i} className="phrase-card p-3 flex flex-col gap-1">
                  <span className="relative z-10 font-jp text-[16px] font-bold text-[var(--text)]">{s.jp}</span>
                  <span className="relative z-10 text-[12px] text-sky-700">{s.romaji}</span>
                  <span className="relative z-10 text-[12px] text-[var(--text-light)]">{s.fr}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Step view */
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
          >
            {/* Context */}
            <div className="phrase-card p-4 mb-3">
              <p className="relative z-10 text-[13px] text-[var(--text-light)] italic leading-relaxed">
                {current.context}
              </p>
            </div>

            {/* Phrase */}
            <div className="phrase-card p-5 mb-3">
              <div className="relative z-10 flex items-start justify-between gap-2">
                <span className="font-jp text-[24px] font-bold text-[var(--text)] leading-snug">
                  {current.jp}
                </span>
                <button
                  className="speaker-btn shrink-0 mt-1"
                  onClick={() => {
                    const u = new SpeechSynthesisUtterance(current.jp)
                    u.lang = 'ja-JP'
                    u.rate = 0.85
                    speechSynthesis.speak(u)
                  }}
                >
                  <SpeakerHigh size={16} weight="bold" />
                </button>
              </div>
              <p className="relative z-10 text-[14px] font-semibold text-sky-700 mt-2">{current.romaji}</p>
              <p className="relative z-10 text-[15px] font-bold text-[var(--text)] mt-1">{current.fr}</p>
            </div>

            {/* Explanation */}
            <div className="phrase-card p-4 mb-3">
              <p className="relative z-10 text-[13px] text-[var(--text)] leading-relaxed">
                {current.explanation}
              </p>
              {current.tip && (
                <div className="relative z-10 flex items-start gap-2 mt-3 pt-3 border-t border-[#BBDAEE]">
                  <Lightbulb size={16} weight="bold" className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[12px] text-[var(--text-light)]">{current.tip}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3 mt-4">
        {step > 0 && !isLast && (
          <button
            onClick={() => setStep(step - 1)}
            className="speaker-btn !w-auto !rounded-lg px-4 py-2 flex items-center gap-1.5 text-[13px] font-bold"
          >
            <ArrowLeft size={14} weight="bold" />
            Précédent
          </button>
        )}
        <button
          onClick={() => (isLast ? navigate('/cours') : setStep(step + 1))}
          className="phrase-badge !text-[13px] !px-5 !py-2 !rounded-lg flex items-center gap-1.5 cursor-pointer ml-auto"
        >
          {isLast ? 'Retour aux cours' : 'Suivant'}
          {!isLast && <ArrowRight size={14} weight="bold" />}
        </button>
      </div>
    </div>
  )
}
