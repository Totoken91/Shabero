import { useMemo } from 'react'

interface QuizOptionsProps {
  options: string[]
  correct: string
  onAnswer: (option: string) => void
  answered: string | null
}

function shuffle<T>(array: T[]): T[] {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export default function QuizOptions({ options, correct, onAnswer, answered }: QuizOptionsProps) {
  const shuffled = useMemo(() => shuffle(options), [options])

  return (
    <div className="flex flex-col gap-3 w-full">
      {shuffled.map((option) => {
        let extraClasses = ''
        if (answered !== null) {
          if (option === correct) {
            extraClasses = 'bg-green-100 border-green-400'
          } else if (option === answered) {
            extraClasses = 'bg-red-100 border-red-400'
          }
        }

        return (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            disabled={answered !== null}
            className={`glass-sm w-full py-3 px-4 text-left font-semibold text-[var(--text)] transition-all duration-150 disabled:cursor-default ${extraClasses}`}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
