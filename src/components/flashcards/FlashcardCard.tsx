import type { Flashcard } from '../../types'

interface FlashcardCardProps {
  card: Flashcard
  flipped: boolean
  onFlip: () => void
}

export default function FlashcardCard({ card, flipped, onFlip }: FlashcardCardProps) {
  return (
    <div className="perspective cursor-pointer" style={{ minHeight: 280 }} onClick={onFlip}>
      <div className={`flip-card${flipped ? ' flipped' : ''}`}>
        {/* Front face */}
        <div className="flip-front absolute inset-0 glass flex flex-col items-center justify-center rounded-2xl p-6 text-center">
          <span className="font-jp text-3xl font-bold text-[var(--text)]">{card.jp}</span>
          <span className="mt-3 text-sm italic text-[var(--text-2)] opacity-70">{card.context}</span>
          <span className="mt-auto text-xs text-[var(--text-2)] opacity-50">Tap pour retourner</span>
        </div>

        {/* Back face */}
        <div className="flip-back absolute inset-0 glass flex flex-col items-center justify-center rounded-2xl p-6 text-center gap-3">
          <span className="text-xl font-semibold text-[var(--blue-2)]">{card.romaji}</span>
          <span className="text-lg font-bold text-[var(--text)]">{card.fr}</span>
          {card.tip && (
            <span className="glass-sm mt-2 rounded-full px-3 py-1 text-xs italic text-[var(--text-2)]">
              {card.tip}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
