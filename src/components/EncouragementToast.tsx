import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getNextEncouragement } from '../lib/encouragements'

export default function EncouragementToast() {
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    // Check after a short delay so data has time to update
    const timer = setTimeout(() => {
      const msg = getNextEncouragement()
      if (msg) setMessage(msg)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="fixed top-4 left-4 right-4 z-[100] flex justify-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
        >
          <div
            className="phrase-card p-4 max-w-[400px] w-full text-center cursor-pointer"
            onClick={() => setMessage(null)}
            style={{ borderColor: '#D4A800', borderWidth: 2, boxShadow: '0 4px 20px rgba(0,80,140,0.2)' }}
          >
            <p className="relative z-10 text-[13px] font-bold text-[var(--text)]">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
