import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function getStreakMessage(streak: number, isRecord: boolean): string {
  if (isRecord) return `🏆 NOUVEAU RECORD ! ${streak} jour${streak > 1 ? 's' : ''} !`
  if (streak >= 30) return '30 JOURS. Respect absolu. 👑🔥'
  if (streak >= 14) return '2 semaines ! Légendaire ! 🔥🔥🔥'
  if (streak >= 7) return 'Une semaine ! Inarrêtable ! 🔥🔥'
  if (streak >= 3) return 'Tu tiens le rythme ! 🔥'
  return "C'est parti ! 🔥"
}

function playStreakSound() {
  try {
    const ctx = new AudioContext()
    const now = ctx.currentTime

    const whoosh = ctx.createOscillator()
    const whooshGain = ctx.createGain()
    const filter = ctx.createBiquadFilter()
    whoosh.type = 'sawtooth'
    whoosh.frequency.setValueAtTime(100, now)
    whoosh.frequency.exponentialRampToValueAtTime(600, now + 0.3)
    whooshGain.gain.setValueAtTime(0.1, now)
    whooshGain.gain.linearRampToValueAtTime(0.2, now + 0.15)
    whooshGain.gain.exponentialRampToValueAtTime(0.01, now + 0.4)
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(2000, now)
    whoosh.connect(filter)
    filter.connect(whooshGain)
    whooshGain.connect(ctx.destination)
    whoosh.start(now)
    whoosh.stop(now + 0.4)

    const ding = ctx.createOscillator()
    const dingGain = ctx.createGain()
    ding.type = 'sine'
    ding.frequency.setValueAtTime(880, now + 0.3)
    dingGain.gain.setValueAtTime(0.25, now + 0.3)
    dingGain.gain.exponentialRampToValueAtTime(0.01, now + 0.8)
    ding.connect(dingGain)
    dingGain.connect(ctx.destination)
    ding.start(now + 0.3)
    ding.stop(now + 0.8)
  } catch {}
}

function playRecordSound() {
  playStreakSound()
  try {
    const ctx = new AudioContext()
    const now = ctx.currentTime
    const notes = [523.25, 659.25, 783.99]
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, now + 0.4 + i * 0.08)
      gain.gain.setValueAtTime(0.15, now + 0.4 + i * 0.08)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 1.2)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now + 0.4 + i * 0.08)
      osc.stop(now + 1.2)
    })
  } catch {}
}

function launchFireParticles(isRecord: boolean) {
  const container = document.createElement('div')
  container.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:10001;overflow:hidden;'
  document.body.appendChild(container)

  const cx = window.innerWidth / 2
  const cy = window.innerHeight / 2 - 20
  const count = isRecord ? 40 : 25

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div')
    const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.5 - 0.25)
    const dist = 60 + Math.random() * 120
    const endX = Math.cos(angle) * dist
    const endY = Math.sin(angle) * dist - 30
    const size = 4 + Math.random() * 8
    const delay = Math.random() * 0.3
    const color = isRecord
      ? 'radial-gradient(circle, #FFFFFF 0%, #FFD700 40%, #FFC400 100%)'
      : 'radial-gradient(circle, #FFD700 0%, #FF6B35 50%, #FF4500 100%)'

    p.style.cssText = `
      position:absolute;left:${cx}px;top:${cy}px;
      width:${size}px;height:${size}px;border-radius:50%;
      background:${color};
      --endX:${endX}px;--endY:${endY}px;
      animation:fire-particle 0.8s ease-out ${delay}s forwards;
      box-shadow:0 0 ${size}px ${isRecord ? '#FFD700' : '#FF4500'};
    `
    container.appendChild(p)
  }

  setTimeout(() => container.remove(), 1500)
}

function launchGoldenConfetti() {
  const container = document.createElement('div')
  container.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:10002;overflow:hidden;'
  document.body.appendChild(container)

  const colors = ['#FFD700', '#FFC400', '#FFB300', '#FFE082', '#FFFFFF']
  for (let i = 0; i < 40; i++) {
    const c = document.createElement('div')
    const color = colors[Math.floor(Math.random() * colors.length)]
    const size = Math.random() * 8 + 4
    c.style.cssText = `
      position:absolute;top:-10px;left:${Math.random() * 100}%;
      width:${size}px;height:${size * 0.6}px;
      background:${color};border-radius:2px;
      animation:confetti-fall 2.5s ease-in ${Math.random() * 0.5}s forwards;
      transform:rotate(${Math.random() * 360}deg);
    `
    container.appendChild(c)
  }

  setTimeout(() => container.remove(), 3500)
}

export default function StreakAnimation() {
  const [visible, setVisible] = useState(false)
  const [streak, setStreak] = useState(0)
  const [isRecord, setIsRecord] = useState(false)

  const dismiss = useCallback(() => setVisible(false), [])

  useEffect(() => {
    const handler = (e: Event) => {
      const { streak: s, isRecord: r } = (e as CustomEvent).detail
      setStreak(s)
      setIsRecord(r)
      setVisible(true)

      // Sound
      if (r) playRecordSound()
      else playStreakSound()

      // Particles after 500ms
      setTimeout(() => launchFireParticles(r), 500)

      // Golden confetti for records
      if (r) setTimeout(() => launchGoldenConfetti(), 600)
    }

    window.addEventListener('streak-earned', handler)
    return () => window.removeEventListener('streak-earned', handler)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={dismiss}
          style={{ background: 'rgba(0,0,0,0.35)' }}
        >
          {/* Flame + number */}
          <motion.div
            className="relative"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: [0.3, 1.5, 1], opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15, mass: 1, delay: 0.15 }}
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ delay: 1.0, duration: 0.4, ease: 'easeInOut' }}
            >
              <div className={`streak-flame ${isRecord ? 'record' : ''}`} />
              <motion.span
                className="absolute top-1/2 left-1/2 font-[900] text-white z-10"
                style={{
                  transform: 'translate(-50%, -55%)',
                  fontSize: 42,
                  fontFamily: 'Nunito, sans-serif',
                  textShadow: isRecord
                    ? '0 0 10px rgba(255,215,0,0.7), 0 2px 4px rgba(0,0,0,0.3), 0 0 30px rgba(255,215,0,0.4)'
                    : '0 0 10px rgba(255,100,0,0.6), 0 2px 4px rgba(0,0,0,0.3), 0 0 30px rgba(255,150,0,0.3)',
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.35 }}
              >
                {streak}
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Message */}
          <motion.p
            className="text-white text-center font-bold mt-4 px-6"
            style={{
              fontSize: 18,
              fontFamily: 'Nunito, sans-serif',
              textShadow: '0 1px 3px rgba(0,0,0,0.3)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.4 }}
          >
            {getStreakMessage(streak, isRecord)}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
