import { playCorrect, playWrong } from '../../lib/sounds'
import { useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, SpeakerHigh } from '@phosphor-icons/react'
import { scenarios } from '../../data/scenarios'
import { speakJapanese } from '../../lib/audio'
import { completeStep3, addWrongPhrase, removeWrongPhrase, getCategoryProgress, awardQuizAnswerXP, awardStepXP, awardStampXP, awardPerfectScoreXP } from '../../lib/store'
import { showXPToast } from '../../lib/xpToast'
import { celebrate } from '../../lib/celebrate'
import type { Phrase } from '../../types'

const STAMP_ICONS: Record<string, string> = {
  konbini: '🍙', izakaya: '🍶', trains: '🚅', shopping: '🛍️', urgences: '🏥',
  socialiser: '🤝', reactions: '💬', nightlife: '🌙', insultes: '🤬',
  hotel: '🏨', navigation: '🗺️', politesse: '🙏', nombres: '🔢',
  parlersoi: '🪪',
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a
}

function makeQuestions(phrases: Phrase[], allPhrases: Phrase[]) {
  return shuffle(phrases).map((p) => {
    const distractors = shuffle(allPhrases.filter((d) => d.jp !== p.jp)).slice(0, 3)
    return { correctPhrase: p, situation: p.situation ?? p.fr, options: shuffle([p, ...distractors]) }
  })
}

export default function StepSpeak() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const scenario = scenarios.find((s) => s.id === id)
  const allPhrases = scenarios.flatMap((s) => s.phrases)

  const [questions] = useState(() => scenario ? makeQuestions(scenario.phrases, allPhrases) : [])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [correct, setCorrect] = useState(0)

  const q = questions[current]
  const isLast = current >= questions.length

  const handleSelect = useCallback((idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    const isCorrect = q.options[idx].jp === q.correctPhrase.jp
    const xp = awardQuizAnswerXP(isCorrect)
    showXPToast(xp)
    if (isCorrect) { setCorrect((c) => c + 1); if (q.correctPhrase.id) removeWrongPhrase(q.correctPhrase.id); playCorrect() }
    else { playWrong(); if (q.correctPhrase.id) addWrongPhrase(q.correctPhrase.id) }
  }, [selected, q])

  if (!scenario) return null

  if (isLast) {
    const wasMastered = getCategoryProgress(id!).stampEarned
    const score = Math.round((correct / questions.length) * 100)
    const stepXP = awardStepXP(`${id}-step3`, 100)
    if (stepXP > 0) showXPToast(stepXP, 'Etape 3 !')
    if (score === 100) { const bonus = awardPerfectScoreXP(); if (bonus > 0) setTimeout(() => showXPToast(bonus, 'BONUS'), 400) }
    completeStep3(id!, score)
    const passed = score >= 80
    const nowMastered = getCategoryProgress(id!).stampEarned

    // Celebrate if stamp was just earned
    if (nowMastered && !wasMastered) {
      const stampXP = awardStampXP(id!)
      if (stampXP > 0) setTimeout(() => showXPToast(stampXP, 'Tampon !'), 600)
      setTimeout(() => celebrate(), 300)
    }

    return (
      <div className="max-w-[400px] mx-auto">
        <div className="phrase-card p-6 text-center">
          <p className="relative z-10 text-[28px] font-[900] text-[var(--text)]">{score}%</p>
          <p className="relative z-10 text-[14px] font-bold text-[var(--text)] mt-1">{correct}/{questions.length} bonnes réponses</p>
          {nowMastered && !wasMastered && (
            <div className="relative z-10 mt-3">
              <div className="stamp-impact inline-flex items-center justify-center w-20 h-20 rounded-full mx-auto stamp-glow" style={{ border: '4px solid #C0392B', background: 'rgba(192,57,43,0.08)' }}>
                <span className="text-[40px]">{STAMP_ICONS[id!] ?? '🏅'}</span>
              </div>
              <p className="text-[16px] font-[800] text-amber-600 mt-2">Catégorie maîtrisée !</p>
            </div>
          )}
          <p className="relative z-10 text-[13px] mt-2" style={{ color: passed ? '#34A853' : '#E53935' }}>
            {passed ? (nowMastered ? '' : 'Étape validée !') : 'Il faut 80% pour valider. Réécoute les phrases !'}
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
          <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #4CAF50, #2E7D32)' }} animate={{ width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>
        <p className="relative z-10 text-[11px] text-[var(--text-light)] mt-1">Étape 3 — Parle • {current + 1}/{questions.length}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
          <div className="phrase-card p-5 mb-4 text-center">
            <p className="relative z-10 text-[15px] font-bold text-[var(--text)]">{q.situation}</p>
            <p className="relative z-10 text-[12px] text-[var(--text-light)] mt-1">Écoute et choisis la bonne phrase</p>
          </div>

          <div className="flex flex-col gap-2">
            {q.options.map((opt, idx) => {
              const isC = opt.jp === q.correctPhrase.jp; const isCh = selected === idx; const show = selected !== null
              let cls = ''; if (show && isC) cls = 'quiz-correct'; else if (show && isCh && !isC) cls = 'quiz-wrong'
              return (
                <div key={idx} className={`phrase-card p-3 flex items-center gap-3 ${cls}`}>
                  <button onClick={() => speakJapanese(opt.audioText ?? opt.jp, 0.85, opt.id)} className="relative z-10 inline-flex items-center justify-center w-10 h-10 rounded-full shrink-0 cursor-pointer" style={{ background: 'linear-gradient(to bottom, #F0F8FF 0%, #D8EDFA 45%, #CCE5F5 45%, #B0D4EA 100%)', border: '1px solid #98C4DE' }}>
                    <SpeakerHigh size={18} weight="bold" className="text-[var(--text)]" />
                  </button>
                  <button onClick={() => handleSelect(idx)} disabled={show} className="relative z-10 flex-1 text-left cursor-pointer bg-transparent border-none p-0">
                    <span className="text-[13px] font-bold text-[var(--text)]">Option {String.fromCharCode(65 + idx)}</span>
                    {show && isC && <span className="block text-[12px] text-sky-700 mt-0.5">{opt.romaji}</span>}
                  </button>
                </div>
              )
            })}
          </div>

          {selected !== null && (
            <>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="phrase-card p-4 mt-3">
                <p className="relative z-10 text-[13px] font-bold text-[var(--text)]">{q.options[selected].jp === q.correctPhrase.jp ? '✓ Correct !' : '✗ Pas celle-là...'}</p>
                <p className="relative z-10 text-[14px] font-bold text-sky-700 mt-1">{q.correctPhrase.romaji}</p>
                <p className="relative z-10 text-[12px] text-[var(--text)] mt-0.5">{q.correctPhrase.fr}</p>
              </motion.div>
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => { setSelected(null); setCurrent((c) => c + 1) }} className="phrase-badge !text-[13px] !px-5 !py-2 !rounded-lg cursor-pointer mt-3 ml-auto block">
                {current + 1 >= questions.length ? 'Voir le résultat' : 'Suivant →'}
              </motion.button>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
