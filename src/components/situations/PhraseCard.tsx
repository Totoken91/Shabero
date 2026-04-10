import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { SpeakerHigh, SpeakerSlash, Clock } from '@phosphor-icons/react'
import type { Phrase, DisplayMode } from '../../types'

interface Props {
  phrase: Phrase
  index: number
  displayMode: DisplayMode
  onListen?: () => void
}

export default function PhraseCard({ phrase, index, displayMode, onListen }: Props) {
  const [playing, setPlaying] = useState(false)
  const ttsText = phrase.audioText ?? phrase.jp
  const tip = phrase.tip ?? phrase.note

  const handlePlay = useCallback(
    (rate = 0.85) => {
      if (playing) {
        speechSynthesis.cancel()
        setPlaying(false)
        return
      }
      setPlaying(true)
      onListen?.()
      const u = new SpeechSynthesisUtterance(ttsText)
      u.lang = 'ja-JP'
      u.rate = rate
      const voices = speechSynthesis.getVoices()
      const jpVoice = voices.find((v) => v.lang.startsWith('ja'))
      if (jpVoice) u.voice = jpVoice
      u.onend = () => setPlaying(false)
      u.onerror = () => setPlaying(false)
      speechSynthesis.cancel()
      speechSynthesis.speak(u)
    },
    [ttsText, playing]
  )

  return (
    <motion.div
      className="phrase-card p-4 flex flex-col gap-2"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: 'easeOut' }}
    >
      {/* Who badge */}
      {phrase.who && (
        <span
          className={`relative z-10 self-start text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
            phrase.who === 'you'
              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
              : 'bg-amber-100 text-amber-700 border border-amber-200'
          }`}
        >
          {phrase.who === 'you' ? 'Toi' : 'Eux'}
        </span>
      )}

      {/* Situation context (if available) */}
      {phrase.situation && (
        <p className="relative z-10 text-[12px] text-[var(--text-light)] italic leading-relaxed">
          {phrase.situation}
        </p>
      )}

      {/* Romaji — PRIMARY */}
      <div className="relative z-10 flex items-center gap-2">
        <p className="text-[20px] font-[800] text-[var(--text)] leading-snug flex-1">
          {phrase.romaji}
        </p>
        <div className="flex gap-1 shrink-0">
          <button
            onClick={() => handlePlay(0.85)}
            className="speaker-btn"
            aria-label={playing ? 'Stop' : 'Écouter'}
          >
            {playing ? <SpeakerSlash size={16} weight="bold" /> : <SpeakerHigh size={16} weight="bold" />}
          </button>
          <button
            onClick={() => handlePlay(0.6)}
            className="speaker-btn !w-[28px] !h-[28px]"
            aria-label="Lent"
            title="Lent"
          >
            <Clock size={13} weight="bold" />
          </button>
        </div>
      </div>

      {/* Hiragana (if available) */}
      {displayMode !== 'romaji' && phrase.hiragana && (
        <p className="relative z-10 font-jp text-[16px] text-[#5A8AB0] leading-snug">
          {phrase.hiragana}
        </p>
      )}

      {/* Kanji */}
      {displayMode === 'all' && (
        <p className="relative z-10 font-jp text-[13px] text-[#8AAFC0] leading-snug">
          {phrase.jp}
        </p>
      )}

      {/* French translation */}
      <p className="relative z-10 text-[13px] text-[var(--text)] font-semibold">
        {phrase.fr}
      </p>

      {/* Tip / Note */}
      {tip && (
        <p className="relative z-10 text-[11px] text-[var(--text-light)] bg-[#E8F4FD] rounded-lg px-3 py-1.5 border border-[#C8E2F0]">
          {tip}
        </p>
      )}
    </motion.div>
  )
}
