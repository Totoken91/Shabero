import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { scenarios } from '../../data/scenarios'
import { useAppStore } from '../../store/appStore'
import type { Phrase } from '../../types'

const NOTE_GRADIENTS: Record<string, string> = {
  default: 'linear-gradient(135deg, var(--orange), var(--pink))',
  green: 'linear-gradient(135deg, var(--teal), var(--green))',
  blue: 'linear-gradient(135deg, var(--blue), var(--teal))',
}

function PhraseCard({ phrase }: { phrase: Phrase }) {
  const gradient = NOTE_GRADIENTS[phrase.noteType ?? 'default']

  return (
    <div className="glass-sm p-4 flex flex-col gap-1.5 animate-fade-up">
      <span className="font-jp text-[18px] font-bold text-[var(--text)]">
        {phrase.jp}
      </span>
      <span className="text-[13px]" style={{ color: 'var(--blue-2)' }}>
        {phrase.romaji}
      </span>
      <span className="text-[13px] text-gray-500">{phrase.fr}</span>
      {phrase.note && (
        <span
          className="mt-1 self-start text-[11px] font-bold text-white px-2.5 py-0.5 rounded-full"
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
  const scenariosViewed = useAppStore((s) => s.scenariosViewed)

  const scenario = scenarios.find((s) => s.id === id)

  useEffect(() => {
    if (!scenario || !id) return
    if (!scenariosViewed.includes(id)) {
      useAppStore.getState().addXP(10)
      useAppStore.getState().markScenarioViewed(id)
    }
  }, [id, scenario, scenariosViewed])

  if (!scenario) {
    return (
      <div className="p-6 text-center text-[var(--text-2)]">
        Scenario introuvable.
      </div>
    )
  }

  return (
    <div className="pb-tab">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="m-4 mb-0 flex items-center gap-1 text-[var(--blue-2)] font-bold text-[14px] cursor-pointer bg-transparent border-none"
      >
        <span className="text-[20px] leading-none">&larr;</span>
        Retour
      </button>

      {/* Header */}
      <div
        className="mx-4 mt-3 p-5 rounded-[var(--radius-lg)] text-white flex flex-col items-center gap-2 text-center"
        style={{
          background: 'linear-gradient(135deg, var(--blue), var(--teal))',
          boxShadow: '0 6px 24px rgba(29,122,181,0.30)',
        }}
      >
        <span className="text-[44px] leading-none">{scenario.icon}</span>
        <h1 className="text-[20px] font-bold m-0">{scenario.name}</h1>
        <p className="text-[13px] opacity-85 m-0">{scenario.description}</p>
      </div>

      {/* Phrase list */}
      <div className="flex flex-col gap-3 p-4">
        {scenario.phrases.map((phrase, i) => (
          <PhraseCard key={i} phrase={phrase} />
        ))}
      </div>
    </div>
  )
}
