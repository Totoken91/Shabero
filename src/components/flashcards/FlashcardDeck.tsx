import { useState } from 'react'
import { flashcardCategories } from '../../data/flashcards'
import { useAppStore } from '../../store/appStore'
import { XP_REWARDS } from '../../lib/xp'
import CategorySelector from './CategorySelector'
import FlashcardCard from './FlashcardCard'

export default function FlashcardDeck() {
  const [activeCategory, setActiveCategory] = useState(flashcardCategories[0].id)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const addXP = useAppStore((s) => s.addXP)
  const markFlashcardSeen = useAppStore((s) => s.markFlashcardSeen)

  const category = flashcardCategories.find((c) => c.id === activeCategory) ?? flashcardCategories[0]
  const cards = category.cards
  const card = cards[currentIndex]

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id)
    setCurrentIndex(0)
    setFlipped(false)
  }

  const goNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((i) => i + 1)
      setFlipped(false)
    }
  }

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1)
      setFlipped(false)
    }
  }

  const handleReview = () => {
    setFlipped(false)
    goNext()
  }

  const handleKnown = () => {
    addXP(XP_REWARDS.FLASHCARD_KNOWN)
    markFlashcardSeen(activeCategory, currentIndex)
    setFlipped(false)
    goNext()
  }

  return (
    <div className="flex flex-col gap-4">
      <CategorySelector
        categories={flashcardCategories}
        activeId={activeCategory}
        onSelect={handleCategoryChange}
      />

      {card && <FlashcardCard card={card} flipped={flipped} onFlip={() => setFlipped((f) => !f)} />}

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="glass-sm rounded-full w-10 h-10 flex items-center justify-center text-[var(--text)] disabled:opacity-30 transition-opacity"
        >
          &larr;
        </button>

        <span className="text-sm font-bold text-[var(--text-2)]">
          {currentIndex + 1} / {cards.length}
        </span>

        <button
          onClick={goNext}
          disabled={currentIndex === cards.length - 1}
          className="glass-sm rounded-full w-10 h-10 flex items-center justify-center text-[var(--text)] disabled:opacity-30 transition-opacity"
        >
          &rarr;
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleReview}
          className="glass-sm flex-1 rounded-xl px-4 py-3 font-bold text-[var(--text)] transition-transform active:scale-95"
        >
          😬 À revoir
        </button>
        <button
          onClick={handleKnown}
          className="flex-1 rounded-xl px-4 py-3 font-bold text-white transition-transform active:scale-95"
          style={{ background: 'linear-gradient(135deg, #22c55e, #10b981)' }}
        >
          ✅ Je sais !
        </button>
      </div>
    </div>
  )
}
