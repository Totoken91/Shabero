import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, SpeakerHigh } from '@phosphor-icons/react'
import { scenarios } from '../../data/scenarios'
import type { Phrase } from '../../types'

function PhraseCard({ phrase, index }: { phrase: Phrase; index: number }) {
  const noteClass =
    phrase.noteType === 'green'
      ? 'note-green'
      : phrase.noteType === 'blue'
        ? 'note-blue'
        : 'note-default'

  return (
    <motion.div
      className="phrase-card p-4 flex flex-col gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35, ease: 'easeOut' }}
    >
      {/* Who badge */}
      {phrase.who && (
        <span
          className={`relative z-10 self-start text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
            phrase.who === 'you'
              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
              : 'bg-amber-100 text-amber-700 border border-amber-200'
          }`}
        >
          {phrase.who === 'you' ? 'Toi' : 'Eux'}
        </span>
      )}

      <div className="relative z-10 flex items-start justify-between gap-2">
        <span className="font-jp text-[18px] font-bold text-[var(--text)] leading-snug">
          {phrase.jp}
        </span>
        <button
          className="speaker-btn shrink-0 mt-0.5"
          aria-label="Écouter"
          onClick={() => {
            const u = new SpeechSynthesisUtterance(phrase.jp)
            u.lang = 'ja-JP'
            u.rate = 0.85
            speechSynthesis.speak(u)
          }}
        >
          <SpeakerHigh size={16} weight="bold" />
        </button>
      </div>

      <span className="relative z-10 text-[13px] font-semibold text-sky-700">
        {phrase.romaji}
      </span>

      <span className="relative z-10 text-[13px] text-[var(--text-light)]">{phrase.fr}</span>

      {phrase.note && (
        <span className={`relative z-10 note-badge ${noteClass} mt-0.5 self-start`}>
          {phrase.note}
        </span>
      )}
    </motion.div>
  )
}

export default function ScenarioDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const scenario = scenarios.find((s) => s.id === id)

  if (!scenario) {
    return (
      <div className="p-6 text-center text-[var(--text-light)]">
        Scénario introuvable.
      </div>
    )
  }

  return (
    <div className="pb-8">
      <motion.button
        onClick={() => navigate('/dico')}
        className="mb-3 flex items-center gap-1.5 text-white font-bold text-[14px] cursor-pointer bg-transparent border-none p-0"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
        whileHover={{ x: -3 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={18} weight="bold" />
        Retour
      </motion.button>

      <motion.div
        className="detail-header p-5 text-white flex flex-col items-center gap-2 text-center mb-4"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="relative z-10 text-[22px] font-[800] m-0">{scenario.name}</h1>
        <p className="relative z-10 text-[13px] text-white/80 m-0">{scenario.description}</p>
      </motion.div>

      <div className="flex flex-col gap-3">
        {scenario.phrases.map((phrase, i) => (
          <PhraseCard key={i} phrase={phrase} index={i} />
        ))}
      </div>
    </div>
  )
}
