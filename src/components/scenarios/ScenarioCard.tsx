import type { Scenario } from '../../types'

interface ScenarioCardProps {
  scenario: Scenario
  onClick: () => void
}

export default function ScenarioCard({ scenario, onClick }: ScenarioCardProps) {
  return (
    <button
      onClick={onClick}
      className="glass-sm cursor-pointer p-4 flex flex-col items-start gap-2 text-left transition-transform duration-150 active:scale-95 hover:scale-[1.03]"
    >
      <span className="text-[36px] leading-none">{scenario.icon}</span>

      <span className="font-bold text-[var(--text)]">{scenario.name}</span>

      <span className="text-[12px] text-[var(--text-2)] opacity-70 leading-snug">
        {scenario.description}
      </span>

      <span
        className="mt-auto text-[11px] font-bold px-2.5 py-0.5 rounded-full text-white"
        style={{ background: 'linear-gradient(135deg, var(--blue), var(--teal))' }}
      >
        {scenario.phrases.length} phrases
      </span>
    </button>
  )
}
