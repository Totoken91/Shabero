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
  const hadOAuthCode = useRef(window.location.search.includes('code='))

  useEffect(() => {
    const logs: string[] = []
    const log = (msg: string) => {
      logs.push(msg)
      setAuthDebug([...logs])
    }

    const init = async () => {
      const code = new URLSearchParams(window.location.search).get('code')

      if (code) {
        log(`code: ${code.substring(0, 12)}...`)
        log(`href: ${window.location.href}`)

        // Dump all sb- storage keys and their values
        const sbKeys = Object.keys(localStorage).filter(k => k.startsWith('sb-'))
        for (const key of sbKeys) {
          const val = localStorage.getItem(key)
          const short = key.replace('sb-svtkoecdcazighskgqgb-auth-', '')
          if (val && val.length < 100) {
            log(`${short}: ${val}`)
          } else if (val) {
            log(`${short}: [${val.length} chars]`)
          }
        }

        // Attempt manual PKCE exchange
        try {
          log('exchangeCodeForSession...')
          const { data, error } = await supabase.auth.exchangeCodeForSession(code)

          if (error) {
            log(`FAIL: ${error.message}`)
            log(`status: ${(error as any).status ?? '?'}`)
          } else if (data?.session) {
            log(`OK: ${data.session.user.email}`)
          } else {
            log(`no error, no session`)
          }
        } catch (e) {
          log(`THREW: ${e instanceof Error ? e.message : JSON.stringify(e)}`)
        }

        window.history.replaceState({}, '', window.location.pathname)
      }

      // Load session (existing or freshly exchanged)
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) syncFromCloud()
      setLoading(false)
    }

    init()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)
      if (newSession?.user) syncFromCloud()
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
      {/* Debug overlay — only after failed OAuth redirect */}
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
          maxHeight: 200,
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
