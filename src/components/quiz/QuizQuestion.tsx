import type { QuizQuestion } from '../../types'

interface QuizQuestionProps {
  question: QuizQuestion
}

export default function QuizQuestion({ question }: QuizQuestionProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="font-jp text-2xl font-bold text-center text-[var(--text)]">
        {question.jp}
      </p>
      <p className="text-sm text-[var(--text-2)] italic">
        {question.ctx}
      </p>
    </div>
  )
}
