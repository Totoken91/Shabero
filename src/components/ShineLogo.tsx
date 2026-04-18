import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Airplane, Gear, SignOut, Trash, Globe, Bug } from '@phosphor-icons/react'
import { useAuth } from '../lib/auth'
import { useLocale, useUI } from '../lib/locale'

export default function ShineLogo() {
  const { signOut, deleteAccount } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [showDebug, setShowDebug] = useState(false)
  const ui = useUI()
  const lang = useLocale((s) => s.lang)
  const setLang = useLocale((s) => s.setLang)

  const debugData = (() => {
    try {
      const raw = localStorage.getItem('shabero-user')
      if (!raw) return 'No localStorage data'
      return JSON.stringify(JSON.parse(raw), null, 2)
    } catch (e) {
      return `Error: ${e}`
    }
  })()

  const handleDelete = async () => {
    setDeleting(true)
    setDeleteError(null)

    // Start server-side deletion in background. Even if it's slow or fails,
    // we've wiped local and the user gets a clean slate.
    deleteAccount().catch(() => {})

    // Give the edge function a short head start, then wipe everything locally
    // and force a full reload. Maximum total blocking time: 2 seconds.
    setTimeout(() => {
      try {
        const keys = Object.keys(localStorage)
        for (const key of keys) {
          if (key.startsWith('shabero-') || key.startsWith('sb-')) {
            localStorage.removeItem(key)
          }
        }
      } catch {}
      window.location.href = '/'
    }, 2000)
  }

  return (
    <motion.header
      className="header-aero"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <button
        onClick={() => { setMenuOpen(!menuOpen); setConfirmDelete(false); setDeleteError(null) }}
        className="absolute right-3 z-20 flex items-center justify-center bg-transparent border-none cursor-pointer"
        style={{
          top: 'calc(50% + env(safe-area-inset-top, 0px) / 2)',
          transform: 'translateY(-50%)',
          width: 44,
          height: 44,
          color: 'white',
        }}
        title={ui('settings.settings')}
      >
        <Gear size={22} weight="bold" style={{ opacity: 0.7 }} />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9998]"
              onClick={() => { setMenuOpen(false); setConfirmDelete(false) }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -8 }}
              transition={{ duration: 0.15 }}
              className="fixed right-4 z-[9999] rounded-xl overflow-hidden"
              style={{
                top: 'calc(env(safe-area-inset-top, 0px) + 70px)',
                background: 'linear-gradient(to bottom, #EAF4FC, #D6EBF8)',
                border: '1px solid #8CC4DE',
                boxShadow: '0 4px 20px rgba(0,80,140,0.25)',
                minWidth: 240,
              }}
            >
              {!confirmDelete ? (
                <>
                  {/* Language switcher */}
                  <div className="flex items-center gap-2.5 px-4 py-3" style={{ color: 'var(--text)' }}>
                    <Globe size={17} weight="bold" style={{ color: '#1976D2' }} />
                    <span className="text-[14px] font-bold flex-1">{ui('settings.language')}</span>
                    <div className="flex gap-1">
                      {(['fr', 'en'] as const).map((l) => (
                        <button
                          key={l}
                          onClick={() => setLang(l)}
                          className="text-[11px] font-bold px-2 py-1 rounded-md cursor-pointer border-none"
                          style={{
                            background: lang === l ? 'linear-gradient(to bottom, #5DADE2 0%, #2196F3 40%, #1976D2 40%, #1565C0 100%)' : 'transparent',
                            color: lang === l ? 'white' : 'var(--text-light)',
                            textShadow: lang === l ? '0 -1px 0 rgba(0,0,0,0.15)' : 'none',
                          }}
                        >
                          {l.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ height: 1, background: '#B8DCF0' }} />
                  <button
                    onClick={() => { signOut(); setMenuOpen(false) }}
                    className="w-full flex items-center gap-2.5 px-4 py-3.5 text-[14px] font-bold bg-transparent border-none cursor-pointer text-left active:bg-white/50"
                    style={{ color: 'var(--text)' }}
                  >
                    <SignOut size={17} weight="bold" style={{ color: '#1976D2' }} />
                    {ui('settings.signOut')}
                  </button>
                  <div style={{ height: 1, background: '#B8DCF0' }} />
                  <button
                    onClick={() => setConfirmDelete(true)}
                    className="w-full flex items-center gap-2.5 px-4 py-3.5 text-[14px] font-bold bg-transparent border-none cursor-pointer text-left active:bg-white/50"
                    style={{ color: '#C62828' }}
                  >
                    <Trash size={17} weight="bold" />
                    {ui('settings.deleteAccount')}
                  </button>
                  <div style={{ height: 1, background: '#B8DCF0' }} />
                  <button
                    onClick={() => setShowDebug((s) => !s)}
                    className="w-full flex items-center gap-2.5 px-4 py-3.5 text-[14px] font-bold bg-transparent border-none cursor-pointer text-left active:bg-white/50"
                    style={{ color: '#666' }}
                  >
                    <Bug size={17} weight="bold" />
                    Debug localStorage
                  </button>
                </>
              ) : (
                <div className="p-4 flex flex-col gap-3">
                  <p className="text-[13px] font-bold text-center m-0" style={{ color: 'var(--text)' }}>
                    {ui('settings.deleteConfirm')}
                  </p>
                  {deleteError && (
                    <p className="text-[11px] font-bold text-center text-red-600 m-0">{deleteError}</p>
                  )}
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="w-full py-2.5 rounded-lg text-[14px] font-bold text-white border-none cursor-pointer"
                    style={{ background: deleting ? '#EF9A9A' : '#C62828' }}
                  >
                    {deleting ? '...' : (lang === 'en' ? 'Yes, delete permanently' : 'Oui, supprimer définitivement')}
                  </button>
                  <button
                    onClick={() => { setConfirmDelete(false); setDeleteError(null) }}
                    className="w-full py-2.5 rounded-lg text-[14px] font-bold border-none cursor-pointer"
                    style={{ background: 'transparent', color: 'var(--text-light)' }}
                  >
                    {lang === 'en' ? 'Cancel' : 'Annuler'}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Debug overlay — shows raw localStorage content */}
      <AnimatePresence>
        {showDebug && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[10000]"
              style={{ background: 'rgba(0,0,0,0.85)' }}
              onClick={() => { setShowDebug(false); setMenuOpen(false) }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 z-[10001] rounded-xl overflow-hidden flex flex-col"
              style={{ background: '#1a1a1a', border: '1px solid #0f0' }}
            >
              <div style={{
                padding: '12px 16px',
                background: '#000',
                borderBottom: '1px solid #0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span style={{ color: '#0f0', fontFamily: 'monospace', fontSize: 13, fontWeight: 'bold' }}>
                  shabero-user (localStorage)
                </span>
                <button
                  onClick={() => { setShowDebug(false); setMenuOpen(false) }}
                  style={{
                    background: 'transparent',
                    border: '1px solid #0f0',
                    color: '#0f0',
                    padding: '4px 10px',
                    fontSize: 11,
                    fontFamily: 'monospace',
                    cursor: 'pointer',
                    borderRadius: 4,
                  }}
                >
                  close
                </button>
              </div>
              <pre style={{
                flex: 1,
                overflow: 'auto',
                margin: 0,
                padding: 12,
                color: '#0f0',
                fontSize: 11,
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
              }}>
                {debugData}
              </pre>
              <div style={{ padding: 10, borderTop: '1px solid #0f0', display: 'flex', gap: 8 }}>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(debugData).catch(() => {})
                  }}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: '1px solid #0f0',
                    color: '#0f0',
                    padding: '8px',
                    fontSize: 11,
                    fontFamily: 'monospace',
                    cursor: 'pointer',
                    borderRadius: 4,
                  }}
                >
                  copy
                </button>
                <button
                  onClick={() => {
                    if (confirm('WIPE localStorage? This will reset the app.')) {
                      localStorage.removeItem('shabero-user')
                      localStorage.removeItem('shabero-lang')
                      window.location.reload()
                    }
                  }}
                  style={{
                    flex: 1,
                    background: '#C62828',
                    border: '1px solid #C62828',
                    color: 'white',
                    padding: '8px',
                    fontSize: 11,
                    fontFamily: 'monospace',
                    cursor: 'pointer',
                    borderRadius: 4,
                  }}
                >
                  wipe
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex items-center justify-center gap-3">
        <div className="icon-airplane">
          <Airplane size={20} weight="bold" className="text-white relative z-10" />
        </div>

        <h1
          className="text-[44px] font-[900] m-0"
          style={{
            color: '#fff',
            textShadow: '0 1px 0 rgba(255,255,255,0.4), 0 2px 4px rgba(0,50,100,0.4)',
          }}
        >
          Shabero
        </h1>
      </div>

      <p
        className="relative z-10 font-jp text-[14px] mt-2 tracking-wider"
        style={{
          color: 'rgba(255,255,255,0.9)',
          textShadow: '0 1px 2px rgba(0,60,120,0.25)',
        }}
      >
        しゃべろう — {ui('auth.tagline')}
      </p>

      <div className="header-ornament relative z-10" />
    </motion.header>
  )
}
