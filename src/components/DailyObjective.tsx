import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import { getDailyQuota, getUserData, getCategoryProgress, getWrongPhrases } from '../lib/store'
import { scenarios } from '../data/scenarios'

type UserState = 'no_content' | 'listened_only' | 'has_quizzed'

function getUserState(): UserState {
  const data = getUserData()
  const cats = Object.values(data.categories)
  const anyStep1 = cats.some((c) => c.step1Complete)
  const anyQuiz = cats.some((c) => c.step2Complete || c.step2Score > 0 || c.step3Score > 0)
  const hasWrong = getWrongPhrases().length > 0

  if (!anyStep1) return 'no_content'
  if (!anyQuiz && !hasWrong) return 'listened_only'
  return 'has_quizzed'
}

function getSessionLabel(type: string, index: number): string {
  const data = getUserData()
  const mode = data.travelMode

  if (type === 'daily_review') return 'Révision du jour'
  if (type === 'category_step') {
    // Find next incomplete category
    const cat = scenarios.find((s) => {
      const p = getCategoryProgress(s.id)
      return !p.step1Complete || !p.step2Complete || !p.step3Complete
    })
    if (cat) {
      const p = getCategoryProgress(cat.id)
      const step = !p.step1Complete ? 'Écoute' : !p.step2Complete ? 'Comprends' : 'Parle'
      return `${cat.name} — ${step}`
    }
    return 'Avancer une catégorie'
  }
  if (type === 'quick_quiz') return 'Quiz rapide'
  if (type === 'marathon') return 'Marathon'
  if (type === 'kana_group') return 'Kana'

  // Generic fallback by mode
  if (mode === 'intensive') {
    const labels = ['Révision du jour', 'Avancer une catégorie', 'Quiz rapide']
    return labels[index] ?? 'Session libre'
  }
  if (mode === 'normal') {
    const labels = ['Révision du jour', 'Avancer ou quiz']
    return labels[index] ?? 'Session libre'
  }
  return 'Session du jour'
}

function getSuggestedSessions(mode: 'intensive' | 'normal' | 'zen', state: UserState): string[] {
  if (state === 'no_content') {
    if (mode === 'intensive') return ['first_category', 'first_category', 'first_category']
    if (mode === 'normal') return ['first_category', 'first_category']
    return ['first_category']
  }

  if (state === 'listened_only') {
    if (mode === 'intensive') return ['first_quiz', 'category_step', 'quick_quiz']
    if (mode === 'normal') return ['first_quiz', 'category_step']
    return ['first_quiz']
  }

  // has_quizzed — normal flow
  if (mode === 'intensive') return ['daily_review', 'category_step', 'quick_quiz']
  if (mode === 'normal') return ['daily_review', 'category_step']
  return ['daily_review']
}

function getSuggestionLabel(type: string): string {
  if (type === 'first_category') return 'Découvre ta première catégorie'
  if (type === 'first_quiz') return 'Teste-toi sur tes premières phrases'
  return getSessionLabel(type, 0)
}

export default function DailyObjective() {
  const navigate = useNavigate()
  const quota = getDailyQuota()
  const data = getUserData()
  const state = getUserState()
  const suggestions = getSuggestedSessions(data.travelMode, state)

  const completed = quota.sessionsCompleted.length
  const required = quota.sessionsRequired
  const allDone = completed >= required
  const pct = Math.min(100, Math.round((completed / required) * 100))

  return (
    <motion.div
      className="daily-objective"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <p className="relative z-10 text-[13px] font-bold text-[#1A3A5C] mb-3">
        📋 Objectif du jour
      </p>

      <div className="relative z-10 flex flex-col gap-1.5">
        {suggestions.map((type, i) => {
          const isDone = i < completed
          return (
            <button
              key={i}
              onClick={() => {
                if (isDone) return
                if (type === 'first_category') navigate('/situations/politesse/listen')
                else if (type === 'first_quiz') {
                  const cat = scenarios.find((s) => getCategoryProgress(s.id).step1Complete)
                  if (cat) navigate(`/situations/${cat.id}/understand`)
                }
                else if (type === 'daily_review') navigate('/entrainement/review')
                else if (type === 'category_step') {
                  const cat = scenarios.find((s) => {
                    const p = getCategoryProgress(s.id)
                    return !p.step1Complete || !p.step2Complete || !p.step3Complete
                  })
                  if (cat) navigate(`/situations/${cat.id}`)
                }
                else if (type === 'quick_quiz') navigate('/entrainement/categories')
                else if (type === 'marathon') navigate('/entrainement/marathon')
              }}
              className="flex items-center gap-2 py-1 bg-transparent border-none cursor-pointer text-left p-0"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              <span
                className="w-5 h-5 rounded flex items-center justify-center text-[11px] font-bold shrink-0"
                style={isDone ? {
                  background: 'linear-gradient(to bottom, #7ED56F 0%, #3AAD2B 100%)',
                  color: 'white',
                  border: '1px solid #2D8E22',
                } : {
                  background: 'linear-gradient(to bottom, #F0F8FF, #D8EDFA)',
                  color: '#5A7A9A',
                  border: '1px solid #B0D0E5',
                }}
              >
                {isDone ? '✓' : ''}
              </span>
              <span
                className="text-[14px] font-bold"
                style={{
                  color: isDone ? '#5A7A9A' : '#1A3A5C',
                  textDecoration: isDone ? 'line-through' : 'none',
                  textDecorationColor: 'rgba(90,122,154,0.3)',
                }}
              >
                {getSuggestionLabel(type)}
              </span>
              {!isDone && <ArrowRight size={14} weight="bold" className="ml-auto text-[#8CC4DE]" />}
            </button>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="quota-bar">
        <div
          className={`quota-bar-fill ${allDone ? 'complete' : ''}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <p className="relative z-10 text-[12px] font-bold mt-2 text-center" style={{ color: '#5A7A9A' }}>
        {allDone ? (
          <>
            <span>{completed}/{required} ✨ Streak maintenu ! Reviens demain 🔥</span>
            <br />
            <span className="text-[11px] font-normal">(mais tu peux continuer si tu veux)</span>
          </>
        ) : (
          `${completed}/${required} — Encore ${required - completed} session${required - completed > 1 ? 's' : ''} pour ton streak 🔥`
        )}
      </p>
    </motion.div>
  )
}
