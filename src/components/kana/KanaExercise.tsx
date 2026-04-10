import { playCorrect, playWrong } from '../../lib/sounds'
import { useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, SpeakerHigh } from '@phosphor-icons/react'
import { hiraganaGroups, katakanaGroups, type Kana } from '../../data/kana'
import { speakJapanese } from '../../lib/audio'
import { recordKanaAnswer, isKanaGroupMastered } from '../../lib/progress'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface Question {
  prompt: string        // what's shown big
  promptIsKana: boolean // true = kana shown, pick romaji. false = romaji shown, pick kana
  correct: string
  options: string[]
  kana: Kana
}

function generateQuestions(groupKana: Kana[], allKana: Kana[]): Question[] {
  const questions: Question[] = []

  // Round 1: kana → romaji
  for (const k of shuffle(groupKana)) {
    const distractors = shuffle(allKana.filter((d) => d.romaji !== k.romaji))
      .slice(0, 3).map((d) => d.romaji)
    questions.push({
      prompt: k.character,
      promptIsKana: true,
      correct: k.romaji,
      options: shuffle([k.romaji, ...distractors]),
      kana: k,
    })
  }

  // Round 2: romaji → kana
  for (const k of shuffle(groupKana)) {
    const distractors = shuffle(allKana.filter((d) => d.character !== k.character))
      .slice(0, 3).map((d) => d.character)
    questions.push({
      prompt: k.romaji,
      promptIsKana: false,
      correct: k.character,
      options: shuffle([k.character, ...distractors]),
      kana: k,
    })
  }

  return questions
}

export default function KanaExercise() {
  const { type, groupId } = useParams<{ type: string; groupId: string }>()
  const navigate = useNavigate()

  const groups = type === 'katakana' ? katakanaGroups : hiraganaGroups
  const group = groups.find((g) => g.id === Number(groupId))

  // Generate questions ONCE on mount — stable reference
  const [questions] = useState(() => {
    if (!group) return []
    const allKana = groups.flatMap((g) => g.kana)
    return generateQuestions(group.kana, allKana)
  })

  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [errors, setErrors] = useState(0)

  if (!group) { navigate(`/kana/${type}`); return null }

  const total = questions.length
  const isLast = current >= total

  const handleSelect = useCallback((opt: string) => {
    if (selected) return
    setSelected(opt)
    const correct = opt === questions[current].correct
    if (correct) { playCorrect() } else { setErrors((e) => e + 1); playWrong() }
    speakJapanese(questions[current].kana.character, 0.7)
  }, [selected, current, questions])

  const handleNext = useCallback(() => {
    setSelected(null)
    setCurrent((c) => c + 1)
  }, [])

  if (isLast) {
    const perfect = errors === 0
    recordKanaAnswer(type!, Number(groupId), perfect)
    const mastered = isKanaGroupMastered(type!, Number(groupId))

    return (
      <div className="max-w-[400px] mx-auto">
        <div className="phrase-card p-6 text-center">
          <p className="relative z-10 text-[28px] font-[900] text-[var(--text)]">
            {total - errors}/{total}
          </p>
          <p className="relative z-10 text-[14px] font-bold text-[var(--text)] mt-1">
            {perfect ? 'Parfait !' : errors <= 2 ? 'Presque !' : 'Continue !'}
          </p>
          {mastered && (
            <span className="relative z-10 inline-block mt-3 px-4 py-1 rounded-full text-[12px] font-bold text-white"
              style={{ background: 'linear-gradient(to bottom, #FFD54F 0%, #FFB300 40%, #FFA000 40%, #FF8F00 100%)', border: '1px solid #E65100', boxShadow: '0 1px 3px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)', textShadow: '0 -1px 0 rgba(0,0,0,0.15)' }}>
              Groupe maîtrisé !
            </span>
          )}
          {!mastered && (
            <p className="relative z-10 text-[11px] text-[var(--text-light)] mt-2">
              Fais 3 sessions parfaites pour maîtriser ce groupe
            </p>
          )}
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={() => navigate(`/kana/${type}`)} className="aero-card flex-1 cursor-pointer p-3 text-center">
            <span className="relative z-10 text-[13px] font-bold text-[var(--text)]">Groupes</span>
          </button>
          <button onClick={() => { setCurrent(0); setErrors(0); setSelected(null) }} className="aero-card flex-1 cursor-pointer p-3 text-center">
            <span className="relative z-10 text-[13px] font-bold text-[var(--text)]">Rejouer</span>
          </button>
        </div>
      </div>
    )
  }

  const q = questions[current]

  return (
    <div className="pb-8">
      <motion.button
        onClick={() => navigate(`/kana/${type}`)}
        className="mb-3 flex items-center gap-1.5 text-white font-bold text-[14px] cursor-pointer bg-transparent border-none p-0"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={18} weight="bold" />
        Retour
      </motion.button>

      <div className="phrase-card p-3 mb-4 text-center">
        <div className="relative z-10 h-1.5 rounded-full bg-[#D4E8F5] overflow-hidden">
          <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #9C27B0, #6A1B9A)' }} animate={{ width: `${((current + 1) / total) * 100}%` }} />
        </div>
        <p className="relative z-10 text-[11px] text-[var(--text-light)] mt-1">{current + 1} / {total}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
          {/* Prompt */}
          <div className="phrase-card p-8 mb-4 text-center">
            <p className={`relative z-10 ${q.promptIsKana ? 'font-jp text-[64px]' : 'text-[36px]'} font-bold text-[var(--text)] leading-none`}>
              {q.prompt}
            </p>
            {q.promptIsKana && (
              <button
                onClick={() => speakJapanese(q.kana.character, 0.7)}
                className="relative z-10 mt-3 inline-flex items-center justify-center w-10 h-10 rounded-full cursor-pointer"
                style={{ background: 'linear-gradient(to bottom, #F0F8FF 0%, #D8EDFA 45%, #CCE5F5 45%, #B0D4EA 100%)', border: '1px solid #98C4DE' }}
              >
                <SpeakerHigh size={18} weight="bold" className="text-[var(--text)]" />
              </button>
            )}
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-2">
            {q.options.map((opt) => {
              const isCorrect = opt === q.correct
              const isChosen = selected === opt
              const show = selected !== null
              let cls = ''
              if (show && isCorrect) cls = 'quiz-correct'
              else if (show && isChosen && !isCorrect) cls = 'quiz-wrong'

              return (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  disabled={show}
                  className={`phrase-card p-4 text-center cursor-pointer ${cls}`}
                >
                  <span className={`relative z-10 ${q.promptIsKana ? 'text-[18px]' : 'font-jp text-[28px]'} font-bold text-[var(--text)]`}>
                    {opt}
                  </span>
                </button>
              )
            })}
          </div>

          {selected && (
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={handleNext} className="phrase-badge !text-[13px] !px-5 !py-2 !rounded-lg cursor-pointer mt-3 ml-auto block">
              Suivant →
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
