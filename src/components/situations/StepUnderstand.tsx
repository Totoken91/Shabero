import { useState, useCallback, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, SpeakerHigh } from '@phosphor-icons/react'
import { scenarios } from '../../data/scenarios'
import { speakJapanese } from '../../lib/audio'
import { completeStep2, addWrongPhrase, removeWrongPhrase } from '../../lib/store'
import type { Phrase } from '../../types'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a
}

function makeQuestions(phrases: Phrase[], allPhrases: Phrase[]) {
  return shuffle(phrases).map((p) => {
    const distractors = shuffle(allPhrases.filter((d) => d.fr !== p.fr)).slice(0, 3).map((d) => d.fr)
    return { phrase: p, options: shuffle([p.fr, ...distractors]) }
  })
}

export default function StepUnderstand() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const scenario = scenarios.find((s) => s.id === id)
  const allPhrases = scenarios.flatMap((s) => s.phrases)

  const [questions] = useState(() => scenario ? makeQuestions(scenario.phrases, allPhrases) : [])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [correct, setCorrect] = useState(0)

  const q = questions[current]
  const isLast = current >= questions.length

  useEffect(() => {
    if (!isLast && q) setTimeout(() => speakJapanese(q.phrase.audioText ?? q.phrase.jp, 0.85, q.phrase.id), 300)
  }, [current, isLast])

  const handleSelect = useCallback((opt: string) => {
    if (selected) return
    setSelected(opt)
    const isCorrect = opt === q.phrase.fr
    if (isCorrect) { setCorrect((c) => c + 1); if (q.phrase.id) removeWrongPhrase(q.phrase.id) }
    else { if (q.phrase.id) addWrongPhrase(q.phrase.id); setTimeout(() => speakJapanese(q.phrase.audioText ?? q.phrase.jp, 0.85, q.phrase.id), 500) }
  }, [selected, q])

  const handleNext = useCallback(() => { setSelected(null); setCurrent((c) => c + 1) }, [])

  if (!scenario) return null

  if (isLast) {
    const score = Math.round((correct / questions.length) * 100)
    completeStep2(id!, score)
    const passed = score >= 80

    return (
      <div className="max-w-[400px] mx-auto">
        <div className="phrase-card p-6 text-center">
          <p className="relative z-10 text-[28px] font-[900] text-[var(--text)]">{score}%</p>
          <p className="relative z-10 text-[14px] font-bold text-[var(--text)] mt-1">{correct}/{questions.length} bonnes réponses</p>
          <p className="relative z-10 text-[13px] mt-2" style={{ color: passed ? '#34A853' : '#E53935' }}>
            {passed ? 'Étape validée !' : 'Il faut 80% pour valider. Réécoute les phrases !'}
          </p>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={() => navigate(`/situations/${id}`)} className="aero-card flex-1 cursor-pointer p-3 text-center">
            <span className="relative z-10 text-[13px] font-bold text-[var(--text)]">Retour</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-8">
      <motion.button onClick={() => navigate(`/situations/${id}`)} className="mb-3 flex items-center gap-1.5 text-white font-bold text-[14px] cursor-pointer bg-transparent border-none p-0" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }} whileTap={{ scale: 0.95 }}>
        <ArrowLeft size={18} weight="bold" /> Retour
      </motion.button>

      <div className="phrase-card p-3 mb-4 text-center">
        <div className="relative z-10 h-1.5 rounded-full bg-[#D4E8F5] overflow-hidden">
          <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #2196F3, #1565C0)' }} animate={{ width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>
        <p className="relative z-10 text-[11px] text-[var(--text-light)] mt-1">Étape 2 — Comprends • {current + 1}/{questions.length}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
          <div className="phrase-card p-8 mb-4 text-center">
            <button onClick={() => speakJapanese(q.phrase.audioText ?? q.phrase.jp, 0.85, q.phrase.id)} className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-full cursor-pointer" style={{ background: 'linear-gradient(to bottom, #5DADE2 0%, #2196F3 40%, #1976D2 40%, #1565C0 100%)', border: '2px solid #0D47A1', boxShadow: '0 4px 12px rgba(0,80,160,0.3), inset 0 1px 0 rgba(255,255,255,0.4)' }}>
              <SpeakerHigh size={28} weight="bold" className="text-white" />
            </button>
            <p className="relative z-10 text-[13px] text-[var(--text-light)] mt-3">Écoute la phrase</p>
          </div>

          <div className="flex flex-col gap-2">
            {q.options.map((opt) => {
              const isC = opt === q.phrase.fr; const isSel = selected === opt; const show = selected !== null
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
              <p className="relative z-10 text-[13px] font-bold text-[var(--text)]">{selected === q.phrase.fr ? '✓ Correct !' : `✗ C'était : ${q.phrase.fr}`}</p>
              <p className="relative z-10 text-[12px] text-sky-700 mt-1">{q.phrase.romaji}</p>
            </motion.div>
          )}

          {selected && (
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={handleNext} className="phrase-badge !text-[13px] !px-5 !py-2 !rounded-lg cursor-pointer mt-3 ml-auto block">
              {current + 1 >= questions.length ? 'Voir le résultat' : 'Suivant →'}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
