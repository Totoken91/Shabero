import { createContext, useContext, useEffect, useState } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from './supabase'
import { pullFromCloud } from './sync'

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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      // Handle PKCE callback after OAuth redirect (web)
      const params = new URLSearchParams(window.location.search)
      const code = params.get('code')
      if (code) {
        await supabase.auth.exchangeCodeForSession(code)
        window.history.replaceState({}, '', window.location.pathname)
      }

      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) syncFromCloud()
      setLoading(false)
    }

    init()

    // Listen for auth changes (sign in, sign out, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) syncFromCloud()
    })

    return () => subscription.unsubscribe()
  }, [])

  const syncFromCloud = async () => {
    const cloudData = await pullFromCloud()
    if (!cloudData) return

    // Merge: keep local data if cloud is empty, otherwise use cloud
    const raw = localStorage.getItem(KEY)
    const local = raw ? JSON.parse(raw) : {}
    const merged = { ...local, ...cloudData }
    localStorage.setItem(KEY, JSON.stringify(merged))
  }

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

    // Clear local data and sign out
    localStorage.removeItem('shabero-user')
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
