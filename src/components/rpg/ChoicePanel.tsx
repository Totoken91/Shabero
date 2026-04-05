import type { DialogueChoice } from '../../types'

interface ChoicePanelProps {
  choices: DialogueChoice[]
  onChoose: (choice: DialogueChoice) => void
  selected: DialogueChoice | null
}

export default function ChoicePanel({ choices, onChoose, selected }: ChoicePanelProps) {
  return (
    <div className="flex flex-col gap-2 w-full animate-fade-up">
      {choices.map((choice, i) => {
        const isSelected = selected === choice
        const isDisabled = selected !== null

        let bgClass = 'glass-sm'
        if (selected !== null) {
          if (choice.isCorrect) {
            bgClass = 'bg-green-400/30 border-2 border-green-400/60 rounded-[var(--radius-md)]'
          } else if (isSelected) {
            bgClass = 'bg-red-400/30 border-2 border-red-400/60 rounded-[var(--radius-md)]'
          } else {
            bgClass = 'glass-sm opacity-50'
          }
        }

        return (
          <div key={i}>
            <button
              onClick={() => !isDisabled && onChoose(choice)}
              disabled={isDisabled}
              className={`w-full text-left px-4 py-3 cursor-pointer transition-transform duration-150 ${
                !isDisabled ? 'active:scale-[0.98] hover:scale-[1.01]' : ''
              } ${bgClass}`}
            >
              <p className="text-[14px] font-semibold text-[var(--text)]">
                {choice.text}
              </p>
              <p className="text-[12px] font-jp text-[var(--text-2)] opacity-70 mt-0.5">
                {choice.jp}
              </p>
            </button>
            {isSelected && (
              <p className="animate-fade-up text-[12px] text-[var(--text-2)] mt-1.5 px-2 leading-snug">
                {choice.note}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
