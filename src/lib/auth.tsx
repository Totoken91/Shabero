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
    // Use onAuthStateChange exclusively — it fires INITIAL_SESSION
    // only AFTER PKCE code exchange completes (if ?code= is in URL)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) syncFromCloud()
      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        setLoading(false)
      }
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
