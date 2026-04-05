import type { FlashcardCategory } from '../../types'

interface CategorySelectorProps {
  categories: FlashcardCategory[]
  activeId: string
  onSelect: (id: string) => void
}

export default function CategorySelector({ categories, activeId, onSelect }: CategorySelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`shrink-0 rounded-full px-4 py-2 font-bold transition-all duration-150 ${
            cat.id === activeId
              ? 'btn-cta text-white'
              : 'glass-sm text-[var(--text-2)]'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
