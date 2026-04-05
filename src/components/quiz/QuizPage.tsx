import { useState, useMemo, useCallback } from 'react'
import { useAppStore } from '../../store/appStore'
import { quizQuestions } from '../../data/quiz'
import { XP_REWARDS } from '../../lib/xp'
import QuizQuestion from './QuizQuestion'
import QuizOptions from './QuizOptions'
import QuizFeedback from './QuizFeedback'

function shuffle<T>(array: T[]): T[] {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export default function QuizPage() {
  const { quizScore, addXP, recordQuizAnswer, resetQuizScore } = useAppStore()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answered, setAnswered] = useState<string | null>(null)
  const [shuffleKey, setShuffleKey] = useState(0)

  const shuffledQuestions = useMemo(() => shuffle(quizQuestions), [shuffleKey])

  const isFinished = currentIndex >= shuffledQuestions.length
  const currentQuestion = isFinished ? null : shuffledQuestions[currentIndex]

  const handleAnswer = useCallback(
    (option: string) => {
      if (answered !== null || !currentQuestion) return
      setAnswered(option)
      const isCorrect = option === currentQuestion.correct
      if (isCorrect) {
        addXP(XP_REWARDS.QUIZ_CORRECT)
        recordQuizAnswer(true)
      } else {
        recordQuizAnswer(false)
      }
    },
    [answered, currentQuestion, addXP, recordQuizAnswer]
  )

  const handleNext = () => {
    setAnswered(null)
    setCurrentIndex((i) => i + 1)
  }

  const handleRestart = () => {
    resetQuizScore()
    setCurrentIndex(0)
    setAnswered(null)
    setShuffleKey((k) => k + 1)
  }

  if (isFinished) {
    const total = quizScore.correct + quizScore.wrong
    return (
      <div className="flex flex-col items-center gap-6 py-10 px-4 text-center">
        <p className="text-4xl">🎉</p>
        <h2 className="text-2xl font-bold text-[var(--text)]">Quiz terminé !</h2>
        <p className="text-lg text-[var(--text)]">
          Score : {quizScore.correct} / {total}
        </p>
        <p className="text-sm text-[var(--text-2)]">
          {quizScore.correct} bonne{quizScore.correct > 1 ? 's' : ''} réponse{quizScore.correct > 1 ? 's' : ''} et {quizScore.wrong} erreur{quizScore.wrong > 1 ? 's' : ''}
        </p>
        <button onClick={handleRestart} className="btn-cta mt-4">
          Recommencer
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 py-4 px-4">
      {/* Score display */}
      <div className="flex items-center justify-center gap-4 text-sm font-semibold text-[var(--text)]">
        <span>✅ {quizScore.correct}</span>
        <span>|</span>
        <span>❌ {quizScore.wrong}</span>
      </div>

      {/* Progress */}
      <p className="text-center text-xs text-[var(--text-2)]">
        Question {currentIndex + 1} / {shuffledQuestions.length}
      </p>

      {/* Question */}
      {currentQuestion && (
        <>
          <QuizQuestion question={currentQuestion} />

          <QuizOptions
            options={currentQuestion.options}
            correct={currentQuestion.correct}
            onAnswer={handleAnswer}
            answered={answered}
          />

          {/* Feedback */}
          {answered !== null && (
            <QuizFeedback
              isCorrect={answered === currentQuestion.correct}
              explanation={currentQuestion.expl}
            />
          )}

          {/* Next button */}
          {answered !== null && (
            <button onClick={handleNext} className="btn-cta self-center mt-2">
              Question suivante →
            </button>
          )}
        </>
      )}
    </div>
  )
}
