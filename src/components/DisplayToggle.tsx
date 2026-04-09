import type { DisplayMode } from '../types'

interface Props {
  mode: DisplayMode
  onChange: (mode: DisplayMode) => void
}

const OPTIONS: { value: DisplayMode; label: string }[] = [
  { value: 'romaji', label: 'Romaji' },
  { value: 'romaji+kana', label: 'Romaji + Kana' },
  { value: 'all', label: 'Tout' },
]

export default function DisplayToggle({ mode, onChange }: Props) {
  return (
    <div className="flex justify-center mb-4">
      <div className="inline-flex rounded-lg overflow-hidden border border-[#8CC4DE]">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`dico-toggle-btn ${mode === opt.value ? 'dico-toggle-btn--active' : ''}`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
