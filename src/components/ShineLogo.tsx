import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Airplane, Gear, SignOut, Trash } from '@phosphor-icons/react'
import { useAuth } from '../lib/auth'

export default function ShineLogo() {
  const { signOut, deleteAccount } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const handleDelete = async () => {
    setDeleting(true)
    setDeleteError(null)
    const { error } = await deleteAccount()
    if (error) {
      setDeleteError(error)
      setDeleting(false)
    }
    // On success, auth state change will redirect to AuthScreen automatically
  }

  return (
    <motion.header
      className="header-aero"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Bouton settings */}
      <div
        className="absolute right-4 z-20"
        style={{ top: 'calc(50% + env(safe-area-inset-top, 0px) / 2)' }}
      >
        <button
          onClick={() => { setMenuOpen(!menuOpen); setConfirmDelete(false); setDeleteError(null) }}
          className="flex items-center bg-transparent border-none cursor-pointer opacity-60 hover:opacity-100 transition-opacity p-1"
          style={{ color: 'white' }}
          title="Paramètres"
        >
          <Gear size={18} weight="bold" />
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -6 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-1 rounded-xl overflow-hidden"
              style={{
                background: 'linear-gradient(to bottom, #EAF4FC, #D6EBF8)',
                border: '1px solid #8CC4DE',
                boxShadow: '0 4px 16px rgba(0,80,140,0.2)',
                minWidth: 200,
              }}
            >
              {!confirmDelete ? (
                <>
                  <button
                    onClick={() => { signOut(); setMenuOpen(false) }}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] font-bold bg-transparent border-none cursor-pointer text-left hover:bg-white/40 transition-colors"
                    style={{ color: 'var(--text)' }}
                  >
                    <SignOut size={15} weight="bold" style={{ color: '#1976D2' }} />
                    Se déconnecter
                  </button>
                  <div style={{ height: 1, background: '#B8DCF0' }} />
                  <button
                    onClick={() => setConfirmDelete(true)}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] font-bold bg-transparent border-none cursor-pointer text-left hover:bg-white/40 transition-colors"
                    style={{ color: '#C62828' }}
                  >
                    <Trash size={15} weight="bold" />
                    Supprimer mon compte
                  </button>
                </>
              ) : (
                <div className="p-4 flex flex-col gap-3">
                  <p className="text-[12px] font-bold text-center m-0" style={{ color: 'var(--text)' }}>
                    Toute ta progression sera perdue. Es-tu sûr ?
                  </p>
                  {deleteError && (
                    <p className="text-[11px] font-bold text-center text-red-600 m-0">{deleteError}</p>
                  )}
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="w-full py-2 rounded-lg text-[13px] font-bold text-white border-none cursor-pointer"
                    style={{ background: deleting ? '#EF9A9A' : '#C62828' }}
                  >
                    {deleting ? '...' : 'Oui, supprimer définitivement'}
                  </button>
                  <button
                    onClick={() => { setConfirmDelete(false); setDeleteError(null) }}
                    className="w-full py-2 rounded-lg text-[13px] font-bold border-none cursor-pointer"
                    style={{ background: 'transparent', color: 'var(--text-light)' }}
                  >
                    Annuler
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
        しゃべろう — Parle comme un vrai Japonais
      </p>

      <div className="header-ornament relative z-10" />
    </motion.header>
  )
}
