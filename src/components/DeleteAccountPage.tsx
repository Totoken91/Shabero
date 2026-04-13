import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function DeleteAccountPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Sign in first
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) {
        setError('Email ou mot de passe incorrect')
        return
      }

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setError('Erreur de connexion')
        return
      }

      // Call delete account edge function
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/delete-account`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        setError('Erreur lors de la suppression')
        return
      }

      await supabase.auth.signOut()
      setDone(true)
    } catch {
      setError('Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Compte supprimé</h1>
          <p style={styles.text}>
            Ton compte et toutes tes données ont été supprimés définitivement.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Supprimer mon compte Shabero</h1>
        <p style={styles.text}>
          Cette action est irréversible. Toutes tes données de progression,
          tes scores et ton compte seront supprimés définitivement.
        </p>

        <form onSubmit={handleDelete} style={styles.form}>
          <input
            type="email"
            placeholder="ton@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Suppression...' : 'Supprimer définitivement mon compte'}
          </button>
        </form>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100dvh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    background: '#f5f5f5',
    fontFamily: 'system-ui, sans-serif',
  },
  card: {
    background: 'white',
    borderRadius: 12,
    padding: 32,
    maxWidth: 420,
    width: '100%',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    margin: '0 0 12px',
    color: '#1a1a1a',
  },
  text: {
    fontSize: 14,
    color: '#666',
    lineHeight: 1.5,
    margin: '0 0 24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 12,
  },
  input: {
    padding: '10px 12px',
    borderRadius: 8,
    border: '1px solid #ddd',
    fontSize: 14,
    outline: 'none',
  },
  error: {
    color: '#dc2626',
    fontSize: 13,
    fontWeight: 600,
    margin: 0,
  },
  button: {
    padding: '12px 16px',
    borderRadius: 8,
    border: 'none',
    background: '#dc2626',
    color: 'white',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    marginTop: 8,
  },
}
