import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getXPData, getXPForNextLevel, type TierKey } from '../lib/store'

const TIER_COLORS: Record<TierKey, string> = {
  tourist: '#55C146',
  traveler: '#2196F3',
  explorer: '#9C27B0',
  adventurer: '#FF8C00',
  local: '#F44336',
  honor: '#FFC107',
  master: '#FFD700',
}

const TIER_MESSAGES: Record<string, string> = {
  'traveler': "Tu n'es plus un simple touriste. Tu VOYAGES.\nLes Japonais commencent \u00e0 t'entendre. \u2708\uFE0F",
  'explorer': "Tu explores au-del\u00e0 du guide. Tu comprends ce qu'on te dit.\nLe Japon s'ouvre \u00e0 toi. \u{1F9ED}",
  'adventurer': "Tu vas l\u00e0 o\u00f9 les touristes ne vont pas.\nTu parles, tu oses, tu vis le Japon. \u26F0\uFE0F",
  'local': "Les Japonais ne te regardent plus comme un touriste.\nTu fais partie du paysage. \u26E9\uFE0F",
  'honor': "\u65E5\u672C\u8A9E\u304A\u4E0A\u624B\u3067\u3059\u306D \u2014 et cette fois c'est pas juste de la politesse.\nTu forces le respect. \u{1F3EF}",
  'master': "\u304A\u75B2\u308C\u69D8\u3067\u3057\u305F\u3002 Tu as atteint le sommet.\nLe Japon n'a plus de secrets pour toi. \u{1F451}",
}

function playLevelUpSound() {
  try {
    const ctx = new AudioContext()
    const now = ctx.currentTime

    const notes = [261.63, 329.63, 392.00, 523.25]
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now + i * 0.1)
      gain.gain.setValueAtTime(0, now + i * 0.1)
      gain.gain.linearRampToValueAtTime(0.3, now + i * 0.1 + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.5)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now + i * 0.1)
      osc.stop(now + i * 0.1 + 0.5)
    })

    const bass = ctx.createOscillator()
    const bassGain = ctx.createGain()
    bass.type = 'sine'
    bass.frequency.setValueAtTime(80, now)
    bass.frequency.exponentialRampToValueAtTime(40, now + 0.3)
    bassGain.gain.setValueAtTime(0.4, now)
    bassGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3)
    bass.connect(bassGain)
    bassGain.connect(ctx.destination)
    bass.start(now)
    bass.stop(now + 0.3)
  } catch {}
}

function playTierUpSound() {
  playLevelUpSound()
  try {
    const ctx = new AudioContext()
    const now = ctx.currentTime
    const shimmer = ctx.createOscillator()
    const shimmerGain = ctx.createGain()
    shimmer.type = 'triangle'
    shimmer.frequency.setValueAtTime(1046.50, now + 0.3)
    shimmerGain.gain.setValueAtTime(0.15, now + 0.3)
    shimmerGain.gain.exponentialRampToValueAtTime(0.01, now + 1.0)
    shimmer.connect(shimmerGain)
    shimmerGain.connect(ctx.destination)
    shimmer.start(now + 0.3)
    shimmer.stop(now + 1.0)
  } catch {}
}

function launchLevelParticles(color: string, count: number) {
  const container = document.createElement('div')
  container.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:10001;overflow:hidden;'
  document.body.appendChild(container)

  const cx = window.innerWidth / 2
  const cy = window.innerHeight / 2

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div')
    const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.3)
    const dist = 100 + Math.random() * 150
    const dx = Math.cos(angle) * dist
    const dy = Math.sin(angle) * dist
    const size = 4 + Math.random() * 6
    const delay = Math.random() * 0.2

    p.style.cssText = `
      position:absolute;left:${cx}px;top:${cy}px;
      width:${size}px;height:${size}px;border-radius:50%;
      background:radial-gradient(circle, white 0%, ${color} 70%);
      --dx:${dx}px;--dy:${dy}px;
      animation:level-particle 0.8s ease-out ${delay}s forwards;
      box-shadow:0 0 4px ${color};
    `
    container.appendChild(p)
  }

  setTimeout(() => container.remove(), 1500)
}

export default function LevelUpAnimation() {
  const [visible, setVisible] = useState(false)
  const [level, setLevel] = useState(0)
  const [title, setTitle] = useState('')
  const [badge, setBadge] = useState('')
  const [tier, setTier] = useState<TierKey>('tourist')
  const [tierChanged, setTierChanged] = useState(false)

  const dismiss = useCallback(() => setVisible(false), [])

  useEffect(() => {
    const handler = (e: Event) => {
      const d = (e as CustomEvent).detail
      setLevel(d.level)
      setTitle(d.title)
      setBadge(d.badge)
      setTier(d.tier)
      setTierChanged(d.tierChanged)
      setVisible(true)

      if (d.tierChanged) playTierUpSound()
      else playLevelUpSound()

      const color = TIER_COLORS[d.tier as TierKey] ?? '#FFD700'
      setTimeout(() => launchLevelParticles(color, d.tierChanged ? 60 : 35), 500)
    }

    window.addEventListener('level-up', handler)
    return () => window.removeEventListener('level-up', handler)
  }, [])

  const color = TIER_COLORS[tier]
  const xpData = getXPData()
  const nextInfo = getXPForNextLevel(level)
  const tierMsg = tierChanged ? TIER_MESSAGES[tier] : null

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
          style={{ background: tierChanged ? `rgba(0,0,20,0.7)` : 'rgba(0,0,20,0.5)' }}
        >
          {/* Badge */}
          <motion.div
            className="level-badge"
            style={{
              background: `linear-gradient(to bottom, ${color}88, ${color}cc)`,
              width: 72,
              height: 72,
              fontSize: 36,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.3, 1] }}
            transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
          >
            {badge}
          </motion.div>

          {/* Level number */}
          <motion.div
            className="text-white font-[900] mt-3"
            style={{
              fontSize: 48,
              fontFamily: 'Nunito, sans-serif',
              textShadow: `0 0 20px ${color}80, 0 2px 4px rgba(0,0,0,0.3)`,
            }}
            initial={{ scale: 3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 250, damping: 20, delay: 0.4 }}
          >
            {level}
          </motion.div>

          {/* Title */}
          <motion.p
            className="text-white text-center font-bold"
            style={{
              fontSize: tierChanged ? 20 : 16,
              fontFamily: 'Nunito, sans-serif',
              textShadow: '0 1px 3px rgba(0,0,0,0.3)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            {tierChanged ? `Tu es maintenant un ${title} !` : `Niveau ${level} !`}
          </motion.p>

          {/* Tier change message */}
          {tierMsg && (
            <motion.p
              className="text-white/80 text-center mt-2 px-8 whitespace-pre-line"
              style={{
                fontSize: 13,
                fontFamily: 'Nunito, sans-serif',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              {tierMsg}
            </motion.p>
          )}

          {/* Next level info */}
          {level < 30 && (
            <motion.p
              className="text-white/50 text-center mt-4"
              style={{ fontSize: 12, fontFamily: 'Nunito, sans-serif' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.4 }}
            >
              Prochain niveau : {nextInfo.next.toLocaleString()} XP (encore {(nextInfo.next - xpData.totalXP).toLocaleString()} XP)
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
