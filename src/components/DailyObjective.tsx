import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getDailyQuota, getUserData, getCategoryProgress, getWrongPhrases, getXPData } from '../lib/store'
import { scenarios } from '../data/scenarios'
import { useUI, useT, useLocale } from '../lib/locale'
import type { UIKey } from '../i18n/ui'

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

function getSuggestedSessions(mode: 'intensive' | 'normal' | 'zen', state: UserState): string[] {
  if (state === 'no_content') {
    return ['first_category']
  }

  if (state === 'listened_only') {
    if (mode === 'intensive') return ['first_quiz', 'category_step', 'quick_quiz']
    if (mode === 'normal') return ['first_quiz', 'category_step']
    return ['first_quiz']
  }

  if (mode === 'intensive') return ['daily_review', 'category_step', 'quick_quiz']
  if (mode === 'normal') return ['daily_review', 'category_step']
  return ['daily_review']
}

function getSessionLabelKey(type: string): UIKey {
  if (type === 'daily_review') return 'daily.reviewOfDay'
  if (type === 'category_step') return 'daily.advanceCategory'
  if (type === 'quick_quiz') return 'daily.quickQuiz'
  if (type === 'marathon') return 'daily.marathon'
  if (type === 'first_category') return 'daily.discoverFirst'
  if (type === 'first_quiz') return 'daily.testFirst'
  return 'daily.sessionOfDay'
}

function getSessionEmoji(type: string, index: number): string {
  if (type === 'first_category') return '🎧'
  if (type === 'first_quiz') return '🧠'
  if (type === 'daily_review') return '🔄'
  if (type === 'category_step') return '📖'
  if (type === 'quick_quiz') return '⚡'
  if (type === 'marathon') return '🏃'
  if (type === 'kana_group') return '🔤'
  return ['🎯', '📚', '💪'][index] ?? '🎯'
}

function navigateToSession(type: string, navigate: ReturnType<typeof useNavigate>) {
  if (type === 'first_category') { navigate('/situations/politesse/listen'); return }
  if (type === 'first_quiz') {
    const cat = scenarios.find((s) => getCategoryProgress(s.id).step1Complete)
    navigate(cat ? `/situations/${cat.id}/understand` : '/situations/politesse/listen')
    return
  }
  if (type === 'daily_review') { navigate('/entrainement/review'); return }
  if (type === 'category_step') {
    const cat = scenarios.find((s) => {
      const p = getCategoryProgress(s.id)
      return !p.step1Complete || !p.step2Complete || !p.step3Complete
    })
    navigate(cat ? `/situations/${cat.id}` : '/situations')
    return
  }
  if (type === 'quick_quiz') { navigate('/entrainement/categories'); return }
  if (type === 'marathon') { navigate('/entrainement/marathon'); return }
  // Fallback — always navigate somewhere so the button never feels broken
  navigate('/situations')
}

export default function DailyObjective() {
  const navigate = useNavigate()
  const quota = getDailyQuota()
  const data = getUserData()
  const xp = getXPData()
  const state = getUserState()
  const suggestions = getSuggestedSessions(data.travelMode, state)
  const isFresh = xp.totalXP === 0 && quota.sessionsCompleted.length === 0
  const ui = useUI()
  const t = useT()
  const lang = useLocale((s) => s.lang)

  const completed = quota.sessionsCompleted.length
  const required = quota.sessionsRequired
  const allDone = completed >= required
  // Streak is secured after just 1 exercise — the quota is a bonus intensity goal
  const streakSecured = completed >= 1

  const getSubtitle = (type: string): string | null => {
    if (type === 'first_category') return ui('daily.basicPoliteness')
    if (type === 'first_quiz') {
      const cat = scenarios.find((s) => getCategoryProgress(s.id).step1Complete)
      return cat ? t(cat.name, cat.name_en) : null
    }
    if (type === 'category_step') {
      const cat = scenarios.find((s) => {
        const p = getCategoryProgress(s.id)
        return !p.step1Complete || !p.step2Complete || !p.step3Complete
      })
      return cat ? t(cat.name, cat.name_en) : null
    }
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        background: 'linear-gradient(to bottom, #FFF8F0, #FFF3E0)',
        border: '1px solid #FFD9A8',
        borderLeft: '4px solid #FF9800',
        borderRadius: 12,
        padding: '16px 14px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      <p style={{ fontSize: 14, fontWeight: 800, color: '#1A3A5C', margin: '0 0 12px' }}>
        {isFresh ? ui('daily.whereToStart') : ui('daily.objectiveOfDay')}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {suggestions.map((type, i) => {
          const isDone = i < completed
          const emoji = getSessionEmoji(type, i)
          const subtitle = getSubtitle(type)
          const label = ui(getSessionLabelKey(type))

          if (isDone) {
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 12px',
                  borderRadius: 10,
                  background: 'linear-gradient(to bottom, #E8F5E9, #C8E6C9)',
                  border: '1px solid #A5D6A7',
                }}
              >
                <span style={{ fontSize: 16 }}>✅</span>
                <span style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#5A7A5A',
                  textDecoration: 'line-through',
                  textDecorationColor: 'rgba(90,122,90,0.4)',
                  fontFamily: 'Nunito, sans-serif',
                }}>
                  {label}
                </span>
              </div>
            )
          }

          return (
            <motion.button
              key={i}
              onClick={() => navigateToSession(type, navigate)}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 14px',
                borderRadius: 10,
                background: 'linear-gradient(to bottom, #5DADE2 0%, #2196F3 40%, #1976D2 40%, #1565C0 100%)',
                border: '1px solid #0D47A1',
                boxShadow: '0 2px 6px rgba(21,101,192,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                fontFamily: 'Nunito, sans-serif',
              }}
            >
              <span style={{ fontSize: 18, flexShrink: 0 }}>{emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{
                  fontSize: 14,
                  fontWeight: 800,
                  color: '#fff',
                  textShadow: '0 -1px 0 rgba(0,0,0,0.15)',
                  display: 'block',
                }}>
                  {label}
                </span>
                {subtitle && (
                  <span style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.75)',
                    display: 'block',
                    marginTop: 1,
                  }}>
                    {subtitle}
                  </span>
                )}
              </div>
              <span style={{
                fontSize: 18,
                color: 'rgba(255,255,255,0.6)',
              }}>›</span>
            </motion.button>
          )
        })}
      </div>

      {/* Progress bar */}
      {!isFresh && (
        <>
          <div style={{
            height: 6,
            borderRadius: 3,
            background: 'linear-gradient(to bottom, #E0D0C0, #D0C0A8)',
            border: '1px solid #C0A888',
            marginTop: 12,
            overflow: 'hidden',
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, Math.round((completed / required) * 100))}%` }}
              transition={{ duration: 0.6 }}
              style={{
                height: '100%',
                borderRadius: 3,
                background: streakSecured
                  ? 'linear-gradient(to bottom, #7ED56F, #3AAD2B)'
                  : 'linear-gradient(to bottom, #FFB74D, #FF9800)',
              }}
            />
          </div>
          <p style={{
            fontSize: 12,
            fontWeight: 700,
            color: '#8A6A4A',
            textAlign: 'center',
            margin: '8px 0 0',
          }}>
            {streakSecured ? (
              allDone
                ? `${completed}/${required} ✨ ${ui('daily.streakKept')}`
                : `${completed}/${required} 🔥 ${ui('daily.streakKept')}`
            ) : (
              lang === 'en'
                ? `${completed}/${required} — Do 1 exercise to keep your streak 🔥`
                : `${completed}/${required} — Fais 1 exo pour maintenir ton streak 🔥`
            )}
          </p>
        </>
      )}
    </motion.div>
  )
}
