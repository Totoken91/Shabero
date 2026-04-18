import { createContext, useContext, useEffect, useState } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { Capacitor } from '@capacitor/core'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'
import { supabase } from './supabase'
import { pullFromCloud } from './sync'
import { cancelStreakReminder } from './notifications'
import type { ShaberoUserData, CategoryProgress } from './store'

function wipeAllLocalData() {
  // Remove every app-related key, including Supabase auth cache
  const keys = Object.keys(localStorage)
  for (const key of keys) {
    if (key.startsWith('shabero-') || key.startsWith('sb-')) {
      localStorage.removeItem(key)
    }
  }
}

const KEY = 'shabero-user'

interface AuthContext {
  user: User | null
  session: Session | null
  loading: boolean
  signOut: () => Promise<void>
  deleteAccount: () => Promise<{ error: string | null }>
}

const AuthCtx = createContext<AuthContext>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
  deleteAccount: async () => ({ error: null }),
})

/**
 * Smart merge: combines local and cloud data without losing progress.
 * - Boolean "done" flags: true wins over false
 * - Numbers: max wins
 * - Arrays: union
 * - Categories: per-category best completion
 * - Strings/dates: prefer non-empty local, fallback to cloud
 */
function smartMerge(local: Partial<ShaberoUserData>, cloud: Partial<ShaberoUserData>): Partial<ShaberoUserData> {
  const out: Partial<ShaberoUserData> = { ...local }

  // Onboarding: true wins — critical to prevent re-triggering onboarding
  out.onboardingDone = Boolean(local.onboardingDone) || Boolean(cloud.onboardingDone)

  // Travel mode: prefer local if set, else cloud
  out.travelMode = local.travelMode || cloud.travelMode || 'normal'
  out.displayMode = local.displayMode || cloud.displayMode || 'all'
  out.firstUseDate = local.firstUseDate || cloud.firstUseDate || new Date().toISOString().split('T')[0]

  // Streak: take the version with highest longest
  const lS = local.streak, cS = cloud.streak
  if (lS || cS) {
    out.streak = {
      current: Math.max(lS?.current ?? 0, cS?.current ?? 0),
      longest: Math.max(lS?.longest ?? 0, cS?.longest ?? 0),
      lastActiveDate: lS?.lastActiveDate || cS?.lastActiveDate || '',
    }
  }

  // Categories: per-category best
  const categoryIds = new Set([
    ...Object.keys(local.categories ?? {}),
    ...Object.keys(cloud.categories ?? {}),
  ])
  const mergedCats: Record<string, CategoryProgress> = {}
  for (const id of categoryIds) {
    const l = local.categories?.[id]
    const c = cloud.categories?.[id]
    if (!l) { mergedCats[id] = c as CategoryProgress; continue }
    if (!c) { mergedCats[id] = l; continue }
    mergedCats[id] = {
      step1Complete: l.step1Complete || c.step1Complete,
      step2Complete: l.step2Complete || c.step2Complete,
      step2Score: Math.max(l.step2Score ?? 0, c.step2Score ?? 0),
      step3Complete: l.step3Complete || c.step3Complete,
      step3Score: Math.max(l.step3Score ?? 0, c.step3Score ?? 0),
      stampEarned: l.stampEarned || c.stampEarned,
      stampDate: l.stampDate || c.stampDate,
      phrasesListened: Array.from(new Set([
        ...(l.phrasesListened ?? []),
        ...(c.phrasesListened ?? []),
      ])),
    }
  }
  out.categories = mergedCats

  // Quiz
  const lQ = local.quiz, cQ = cloud.quiz
  out.quiz = {
    wrongPhrases: Array.from(new Set([
      ...(lQ?.wrongPhrases ?? []),
      ...(cQ?.wrongPhrases ?? []),
    ])),
    lastReviewDate: lQ?.lastReviewDate || cQ?.lastReviewDate || '',
    reviewDoneToday: Boolean(lQ?.reviewDoneToday) || Boolean(cQ?.reviewDoneToday),
    marathonRecord: Math.max(lQ?.marathonRecord ?? 0, cQ?.marathonRecord ?? 0),
  }

  // XP: local only (cloud doesn't sync XP currently) — keep local
  if (local.xp) out.xp = local.xp

  // seenMessages: union
  out.seenMessages = Array.from(new Set([
    ...(local.seenMessages ?? []),
    ...(cloud.seenMessages ?? []),
  ]))

  // Totals: max
  out.totalPhrasesListened = Math.max(local.totalPhrasesListened ?? 0, cloud.totalPhrasesListened ?? 0)
  out.totalQuizCompleted = Math.max(local.totalQuizCompleted ?? 0, cloud.totalQuizCompleted ?? 0)

  // dailyQuota: prefer local (day-scoped, local is source of truth)
  out.dailyQuota = local.dailyQuota ?? cloud.dailyQuota

  return out
}

async function syncFromCloudOnce() {
  try {
    const cloudData = await pullFromCloud()
    if (!cloudData) return

    const raw = localStorage.getItem(KEY)
    const local: Partial<ShaberoUserData> = raw ? JSON.parse(raw) : {}
    const merged = smartMerge(local, cloudData)
    localStorage.setItem(KEY, JSON.stringify(merged))

    // Notify React components that localStorage changed
    window.dispatchEvent(new CustomEvent('shabero-data-synced'))
  } catch (e) {
    console.error('Cloud sync failed:', e)
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let syncedOnce = false

    const init = async () => {
      try {
        // Handle PKCE callback: exchange ?code= for session
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')
        if (code) {
          try {
            const { error } = await supabase.auth.exchangeCodeForSession(code)
            if (error) console.error('OAuth code exchange failed:', error.message)
          } catch (e) {
            console.error('OAuth code exchange threw:', e)
          }
          window.history.replaceState({}, '', window.location.pathname)
        }

        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user && !syncedOnce) {
          syncedOnce = true
          // Don't await — let sync run in background so loading unblocks immediately.
          // onAuthStateChange listeners will pick up changes via the shabero-data-synced event.
          syncFromCloudOnce()
        }
      } catch (e) {
        console.error('Auth init failed:', e)
      } finally {
        setLoading(false)
      }
    }

    init()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      // Only sync on fresh sign-in, not on TOKEN_REFRESHED or other events
      // INITIAL_SESSION is handled by init() above
      if (session?.user && event === 'SIGNED_IN' && !syncedOnce) {
        syncedOnce = true
        await syncFromCloudOnce()
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const deleteAccount = async (): Promise<{ error: string | null }> => {
    const { data: { session: currentSession } } = await supabase.auth.getSession()
    if (!currentSession) return { error: 'Non connecté' }

    const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/delete-account`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${currentSession.access_token}`,
        'Content-Type': 'application/json',
      },
    })

    const json = await res.json()
    if (!res.ok) return { error: json.error ?? 'Erreur serveur' }

    // Wipe all app data: progress, language, cached auth
    wipeAllLocalData()

    // Cancel any scheduled local notifications
    await cancelStreakReminder().catch(() => {})

    // Clear native Google Sign-In cache on Android so user can pick a different account
    if (Capacitor.isNativePlatform()) {
      try { await GoogleAuth.signOut() } catch {}
    }

    await supabase.auth.signOut()
    return { error: null }
  }

  return (
    <AuthCtx.Provider value={{ user, session, loading, signOut, deleteAccount }}>
      {children}
    </AuthCtx.Provider>
  )
}

export function useAuth() {
  return useContext(AuthCtx)
}
