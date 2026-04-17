import { useLocale } from '../../lib/locale'

interface Props {
  active: 'phrases' | 'panneaux'
  onChange: (tab: 'phrases' | 'panneaux') => void
}

export default function DicoToggle({ active, onChange }: Props) {
  const lang = useLocale((s) => s.lang)

  return (
    <div className="flex justify-center mb-4">
      <div className="inline-flex rounded-lg overflow-hidden border border-[#8CC4DE]">
        <button
          onClick={() => onChange('phrases')}
          className={`dico-toggle-btn ${active === 'phrases' ? 'dico-toggle-btn--active' : ''}`}
        >
          {lang === 'en' ? 'Phrases' : 'Phrases'}
        </button>
        <button
          onClick={() => onChange('panneaux')}
          className={`dico-toggle-btn ${active === 'panneaux' ? 'dico-toggle-btn--active' : ''}`}
        >
          {lang === 'en' ? 'Signs' : 'Panneaux'}
        </button>
      </div>
    </div>
  )
}
