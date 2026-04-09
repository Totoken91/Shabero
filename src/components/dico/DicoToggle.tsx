interface Props {
  active: 'phrases' | 'panneaux'
  onChange: (tab: 'phrases' | 'panneaux') => void
}

export default function DicoToggle({ active, onChange }: Props) {
  return (
    <div className="flex justify-center mb-4">
      <div className="inline-flex rounded-lg overflow-hidden border border-[#8CC4DE]">
        <button
          onClick={() => onChange('phrases')}
          className={`dico-toggle-btn ${active === 'phrases' ? 'dico-toggle-btn--active' : ''}`}
        >
          Phrases
        </button>
        <button
          onClick={() => onChange('panneaux')}
          className={`dico-toggle-btn ${active === 'panneaux' ? 'dico-toggle-btn--active' : ''}`}
        >
          Panneaux
        </button>
      </div>
    </div>
  )
}
