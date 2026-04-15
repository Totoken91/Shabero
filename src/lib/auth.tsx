import { createContext, useContext, useEffect, useRef, useState } from 'react'
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
  const [authDebug, setAuthDebug] = useState<string[]>([])
  // Capture whether we arrived from an OAuth redirect (before URL gets cleaned)
  const hadOAuthCode = useRef(window.location.search.includes('code='))

  useEffect(() => {
    const logs: string[] = []
    const log = (msg: string) => {
      logs.push(msg)
      setAuthDebug([...logs])
    }

    if (hadOAuthCode.current) {
      log(`OAuth redirect detected`)
      log(`href: ${window.location.href}`)
      const sbKeys = Object.keys(localStorage).filter(k => k.startsWith('sb-'))
      log(`sb-keys: ${sbKeys.length > 0 ? sbKeys.join(', ') : 'NONE'}`)
    }

    // Let detectSessionInUrl handle PKCE code exchange automatically.
    // onAuthStateChange fires INITIAL_SESSION after exchange completes.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (hadOAuthCode.current) {
        log(`${event}: ${newSession ? `OK (${newSession.user.email})` : 'no session'}`)
      }

      setSession(newSession)
      setUser(newSession?.user ?? null)
      if (newSession?.user) syncFromCloud()
      setLoading(false)

      // Clean URL params after auth processing
      if (window.location.search) {
        window.history.replaceState({}, '', window.location.pathname)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const syncFromCloud = async () => {
    const cloudData = await pullFromCloud()
    if (!cloudData) return
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

    localStorage.removeItem('shabero-user')
    await supabase.auth.signOut()
    return { error: null }
  }

  return (
    <AuthCtx.Provider value={{ user, session, loading, signOut, deleteAccount }}>
      {children}
      {/* Temporary debug overlay — only shows after a failed OAuth redirect */}
      {hadOAuthCode.current && !session && !loading && authDebug.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(0,0,0,0.92)',
          color: '#0f0',
          fontSize: 11,
          padding: '10px 14px',
          zIndex: 99999,
          fontFamily: 'monospace',
          maxHeight: 160,
          overflow: 'auto',
          borderTop: '2px solid #0f0',
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: 4, color: '#ff0' }}>OAuth Debug:</div>
          {authDebug.map((l, i) => <div key={i}>{l}</div>)}
        </div>
      )}
    </AuthCtx.Provider>
  )
}

export function useAuth() {
  return useContext(AuthCtx)
}
