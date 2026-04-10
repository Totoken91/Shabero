import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, SpeakerHigh, Trophy } from '@phosphor-icons/react'
import { scenarios } from '../../data/scenarios'
import { speakJapanese } from '../../lib/audio'
import { getMarathonRecord, setMarathonRecord, addWrongPhrase, removeWrongPhrase } from '../../lib/store'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a
}

function makeQuestions() {
  const all = scenarios.flatMap((s) => s.phrases)
  const selected = shuffle(all).slice(0, 20)
  return selected.map((p) => {
    const distractors = shuffle(all.filter((d) => d.fr !== p.fr)).slice(0, 3).map((d) => d.fr)
    return { phrase: p, options: shuffle([p.fr, ...distractors]) }
  })
}

export default function Marathon() {
  const navigate = useNavigate()
  const [questions] = useState(makeQuestions)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [correct, setCorrect] = useState(0)

  const q = questions[current]
  const isLast = current >= questions.length
  const record = getMarathonRecord()

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

  if (isLast) {
    const score = Math.round((correct / questions.length) * 100)
    setMarathonRecord(score)
    const isNewRecord = score > record && record > 0
    const msg = score >= 95 ? 'Parfait ! Tu es un pro 🏆' : score >= 80 ? 'Excellent ! 🔥' : score >= 50 ? 'Pas mal du tout ! 💪' : 'Continue l\'écoute, ça va venir ! 🌱'

    return (
      <div className="max-w-[400px] mx-auto">
        <div className="phrase-card p-6 text-center">
          <p className="relative z-10 text-[32px] font-[900] text-[var(--text)]">{score}%</p>
          <p className="relative z-10 text-[14px] font-bold text-[var(--text)] mt-1">{msg}</p>
          <p className="relative z-10 text-[12px] text-[var(--text-light)] mt-1">{correct}/{questions.length} bonnes réponses</p>

          {isNewRecord && (
            <p className="relative z-10 text-[14px] font-[800] text-amber-600 mt-3">
              <Trophy size={16} weight="fill" className="inline mr-1" />
              Nouveau record !
            </p>
          )}

          <p className="relative z-10 text-[11px] text-[var(--text-light)] mt-2">
            Record : {Math.max(score, record)}%
          </p>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={() => navigate('/entrainement')} className="aero-card flex-1 cursor-pointer p-3 text-center">
            <span className="relative z-10 text-[13px] font-bold text-[var(--text)]">Retour</span>
          </button>
          <button onClick={() => { setCurrent(0); setCorrect(0); setSelected(null) }} className="aero-card flex-1 cursor-pointer p-3 text-center">
            <span className="relative z-10 text-[13px] font-bold text-[var(--text)]">Rejouer</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-8">
      <motion.button onClick={() => navigate('/entrainement')} className="mb-3 flex items-center gap-1.5 text-white font-bold text-[14px] cursor-pointer bg-transparent border-none p-0" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }} whileTap={{ scale: 0.95 }}>
        <ArrowLeft size={18} weight="bold" /> Retour
      </motion.button>

      <div className="detail-header p-4 text-white text-center mb-4">
        <h1 className="relative z-10 text-[18px] font-[800] m-0">Marathon</h1>
        <div className="relative z-10 mt-2 h-1.5 rounded-full bg-white/20 overflow-hidden">
          <motion.div className="h-full rounded-full bg-white/60" animate={{ width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>
        <p className="relative z-10 text-[11px] text-white/60 mt-1">{current + 1} / {questions.length}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
          <div className="phrase-card p-8 mb-4 text-center">
            <button onClick={() => speakJapanese(q.phrase.audioText ?? q.phrase.jp, 0.85, q.phrase.id)} className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-full cursor-pointer" style={{ background: 'linear-gradient(to bottom, #EF5350 0%, #F44336 40%, #D32F2F 40%, #C62828 100%)', border: '2px solid #A01010', boxShadow: '0 4px 12px rgba(160,16,16,0.3), inset 0 1px 0 rgba(255,255,255,0.3)' }}>
              <SpeakerHigh size={28} weight="bold" className="text-white" />
            </button>
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
            <>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="phrase-card p-4 mt-3">
                <p className="relative z-10 text-[13px] font-bold text-[var(--text)]">{selected === q.phrase.fr ? '✓ Correct !' : `✗ C'était : ${q.phrase.fr}`}</p>
                <p className="relative z-10 text-[12px] text-sky-700 mt-1">{q.phrase.romaji}</p>
              </motion.div>
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => { setSelected(null); setCurrent((c) => c + 1) }} className="phrase-badge !text-[13px] !px-5 !py-2 !rounded-lg cursor-pointer mt-3 ml-auto block">
                {current + 1 >= questions.length ? 'Voir le score' : 'Suivant →'}
              </motion.button>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
