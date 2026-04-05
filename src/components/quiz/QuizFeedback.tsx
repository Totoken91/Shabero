interface QuizFeedbackProps {
  isCorrect: boolean
  explanation: string
}

export default function QuizFeedback({ isCorrect, explanation }: QuizFeedbackProps) {
  return (
    <div className="animate-fade-up w-full">
      <p className={`font-bold text-lg mb-2 ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
        {isCorrect ? '\u2705 Bien jou\u00e9 !' : '\u274c Pas tout \u00e0 fait...'}
      </p>
      <p className="text-sm text-[var(--text-2)] leading-relaxed">
        {explanation}
      </p>
    </div>
  )
}
