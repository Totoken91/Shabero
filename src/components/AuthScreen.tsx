import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Airplane, EnvelopeSimple, Lock, Eye, EyeSlash } from '@phosphor-icons/react'
import { supabase, OAUTH_REDIRECT_WEB } from '../lib/supabase'
import { Capacitor } from '@capacitor/core'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'
import AeroBackground from './AeroBackground'
import { useUI, useLocale } from '../lib/locale'

type Mode = 'login' | 'signup' | 'forgot'

export default function AuthScreen() {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const ui = useUI()
  const lang = useLocale((s) => s.lang)
  const setLang = useLocale((s) => s.setLang)

  const getErrMsg = (msg: string): string => {
    if (msg.includes('Invalid login credentials')) return ui('auth.errBadCreds')
    if (msg.includes('Email not confirmed')) return ui('auth.errNotConfirmed')
    if (msg.includes('User already registered')) return ui('auth.errAlreadyExists')
    if (msg.includes('Password should be')) return ui('auth.errShortPassword')
    if (msg.includes('Unable to validate email')) return ui('auth.errInvalidEmail')
    if (msg.includes('rate') || msg.includes('429')) return ui('auth.errRateLimit')
    return msg
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) setError(getErrMsg(error.message))
      } else if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) setError(getErrMsg(error.message))
      } else if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email)
        if (error) setError(getErrMsg(error.message))
        else setSuccess(ui('auth.resetSent'))
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setLoading(true)
    setError(null)

    try {
      if (Capacitor.isNativePlatform()) {
        const googleUser = await GoogleAuth.signIn()
        const idToken = googleUser.authentication.idToken

        if (!idToken) {
          setError(ui('auth.googleFailed'))
          return
        }

        const { error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: idToken,
        })
        if (error) setError(getErrMsg(error.message))
      } else {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: OAUTH_REDIRECT_WEB },
        })
        if (error) setError(getErrMsg(error.message))
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      if (!msg.includes('cancelled') && !msg.includes('popup_closed')) {
        setError(ui('auth.googleCancelled'))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AeroBackground />
      <div
        className="min-h-dvh flex flex-col items-center justify-center px-4"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        {/* Logo */}
        <motion.div
          className="flex flex-col items-center mb-8"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="icon-airplane mb-3" style={{ width: 56, height: 56 }}>
            <Airplane size={28} weight="bold" className="text-white relative z-10" />
          </div>
          <h1
            className="text-[40px] font-[900] m-0"
            style={{
              color: '#fff',
              textShadow: '0 1px 0 rgba(255,255,255,0.4), 0 2px 6px rgba(0,50,100,0.5)',
            }}
          >
            Shabero
          </h1>
          <p className="font-jp text-[13px] mt-1" style={{ color: 'rgba(255,255,255,0.85)' }}>
            しゃべろう — {ui('auth.tagline')}
          </p>
          {/* Language toggle */}
          <div className="flex gap-2 mt-3">
            {(['fr', 'en'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="text-[11px] font-bold px-2.5 py-1 rounded-lg cursor-pointer border-none"
                style={{
                  background: lang === l ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.2)',
                  color: lang === l ? '#1976D2' : 'rgba(255,255,255,0.9)',
                }}
              >
                {l === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Card */}
        <motion.div
          className="aero-card w-full max-w-[380px] p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {/* Tab switcher */}
          {mode !== 'forgot' && (
            <div className="flex mb-5 rounded-lg overflow-hidden border border-[#8CC4DE]">
              {(['login', 'signup'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError(null); setSuccess(null) }}
                  className="flex-1 py-2.5 text-[13px] font-bold transition-all cursor-pointer border-none"
                  style={mode === m ? {
                    background: 'linear-gradient(to bottom, #5DADE2 0%, #2196F3 40%, #1976D2 40%, #1565C0 100%)',
                    color: 'white',
                    textShadow: '0 -1px 0 rgba(0,0,0,0.15)',
                  } : {
                    background: 'linear-gradient(to bottom, #F0F8FF 0%, #D8EDFA 50%, #CCE5F5 50%, #B8DCF0 100%)',
                    color: 'var(--text-light)',
                  }}
                >
                  {m === 'login' ? ui('auth.login') : ui('auth.signup')}
                </button>
              ))}
            </div>
          )}

          {mode === 'forgot' && (
            <div className="mb-4">
              <button
                onClick={() => { setMode('login'); setError(null); setSuccess(null) }}
                className="flex items-center gap-1 text-[13px] font-bold cursor-pointer bg-transparent border-none p-0"
                style={{ color: 'var(--text-light)' }}
              >
                {ui('auth.backToLogin')}
              </button>
              <h2 className="text-[16px] font-bold mt-2 mb-0" style={{ color: 'var(--text)' }}>
                {ui('auth.forgotTitle')}
              </h2>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Email */}
            <div className="relative">
              <EnvelopeSimple
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--text-light)' }}
              />
              <input
                type="email"
                placeholder={ui('auth.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 text-[13px] rounded-lg outline-none"
                style={{
                  background: 'linear-gradient(to bottom, #F4FAFF, #E4F2FC)',
                  border: '1px solid #BBDAEE',
                  color: 'var(--text)',
                  fontFamily: 'Nunito, sans-serif',
                }}
              />
            </div>

            {/* Password */}
            {mode !== 'forgot' && (
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--text-light)' }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={ui('auth.passwordPlaceholder')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-9 pr-10 py-2.5 text-[13px] rounded-lg outline-none"
                  style={{
                    background: 'linear-gradient(to bottom, #F4FAFF, #E4F2FC)',
                    border: '1px solid #BBDAEE',
                    color: 'var(--text)',
                    fontFamily: 'Nunito, sans-serif',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-0"
                  style={{ color: 'var(--text-light)' }}
                >
                  {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
                </button>
              </div>
            )}

            {/* Error / Success */}
            <AnimatePresence>
              {error && (
                <motion.p
                  className="text-[12px] font-bold text-red-600 text-center m-0"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {error}
                </motion.p>
              )}
              {success && (
                <motion.p
                  className="text-[12px] font-bold text-emerald-600 text-center m-0"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {success}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-[var(--radius-pill,50px)] text-[14px] font-bold text-white border-none cursor-pointer"
              style={{
                background: loading
                  ? 'linear-gradient(to bottom, #90CAF9, #64B5F6)'
                  : 'linear-gradient(to bottom, #5DADE2 0%, #2196F3 40%, #1976D2 40%, #1565C0 100%)',
                border: '1px solid #0D47A1',
                boxShadow: '0 2px 8px rgba(21,101,192,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
                textShadow: '0 -1px 0 rgba(0,0,0,0.15)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              {loading ? '...' : mode === 'login' ? ui('auth.loginBtn') : mode === 'signup' ? ui('auth.signupFull') : ui('auth.forgotSend')}
            </motion.button>
          </form>

          {/* Forgot password */}
          {mode === 'login' && (
            <button
              onClick={() => { setMode('forgot'); setError(null) }}
              className="w-full mt-2 text-[12px] bg-transparent border-none cursor-pointer"
              style={{ color: 'var(--text-light)' }}
            >
              {ui('auth.forgot')}
            </button>
          )}

          {/* Divider */}
          {mode !== 'forgot' && (
            <>
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px" style={{ background: '#BBDAEE' }} />
                <span className="text-[11px] font-bold" style={{ color: 'var(--text-light)' }}>{ui('common.or')}</span>
                <div className="flex-1 h-px" style={{ background: '#BBDAEE' }} />
              </div>

              {/* Google */}
              <motion.button
                onClick={handleGoogle}
                disabled={loading}
                className="w-full py-2.5 rounded-lg flex items-center justify-center gap-2.5 text-[13px] font-bold cursor-pointer border-none"
                style={{
                  background: 'linear-gradient(to bottom, #F0F8FF 0%, #D8EDFA 50%, #CCE5F5 50%, #B8DCF0 100%)',
                  border: '1px solid #8CC4DE',
                  color: 'var(--text)',
                  boxShadow: '0 1px 3px rgba(0,80,140,0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
                }}
                whileTap={{ scale: 0.97 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {ui('auth.google')}
              </motion.button>
            </>
          )}
        </motion.div>

        <p className="mt-4 text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {ui('auth.cloudNote')}
        </p>
      </div>
    </>
  )
}

