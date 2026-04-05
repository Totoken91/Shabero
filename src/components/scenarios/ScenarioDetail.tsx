import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, SpeakerHigh } from '@phosphor-icons/react'
import { scenarios } from '../../data/scenarios'
import type { Phrase } from '../../types'

const NOTE_GRADIENTS: Record<string, string> = {
  default: 'linear-gradient(135deg, var(--orange), var(--pink))',
  green: 'linear-gradient(135deg, var(--teal), var(--green))',
  blue: 'linear-gradient(135deg, var(--blue), var(--teal))',
}

function PhraseCard({ phrase, index }: { phrase: Phrase; index: number }) {
  const gradient = NOTE_GRADIENTS[phrase.noteType ?? 'default']

  return (
    <div
      className="glass-sm p-4 flex flex-col gap-2 phrase-card"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-jp text-[18px] font-bold text-[var(--text)] leading-snug">
          {phrase.jp}
        </span>
        <button
          className="shrink-0 mt-0.5 w-8 h-8 rounded-full flex items-center justify-center bg-white/40 border border-white/60 text-[var(--blue)] cursor-pointer transition-transform active:scale-90"
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

      <span className="text-[13px] font-semibold" style={{ color: 'var(--blue-2)' }}>
        {phrase.romaji}
      </span>

      <span className="text-[13px] text-gray-500">{phrase.fr}</span>

      {phrase.note && (
        <span
          className="mt-0.5 self-start text-[11px] font-bold text-white px-2.5 py-0.5 rounded-full"
          style={{ background: gradient }}
        >
          {phrase.note}
        </span>
      )}
    </div>
  )
}

export default function ScenarioDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const scenario = scenarios.find((s) => s.id === id)

  if (!scenario) {
    return (
      <div className="p-6 text-center text-[var(--text-2)]">
        Scénario introuvable.
      </div>
    )
  }

  return (
    <div className="pb-8">
      <button
        onClick={() => navigate('/')}
        className="mb-3 flex items-center gap-1.5 text-[var(--blue-2)] font-bold text-[14px] cursor-pointer bg-transparent border-none p-0"
      >
        <ArrowLeft size={18} weight="bold" />
        Retour
      </button>

      <div
        className="p-5 rounded-[var(--radius-lg)] text-white flex flex-col items-center gap-2 text-center mb-4"
        style={{
          background: 'linear-gradient(135deg, var(--blue), var(--teal))',
          boxShadow: '0 6px 24px rgba(29,122,181,0.30)',
        }}
      >
        <h1 className="text-[22px] font-[800] m-0">{scenario.name}</h1>
        <p className="text-[13px] opacity-85 m-0">{scenario.description}</p>
      </div>

      <div className="flex flex-col gap-3">
        {scenario.phrases.map((phrase, i) => (
          <PhraseCard key={i} phrase={phrase} index={i} />
        ))}
      </div>
    </div>
  )
}
