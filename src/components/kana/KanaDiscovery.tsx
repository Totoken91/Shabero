import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, SpeakerHigh } from '@phosphor-icons/react'
import { hiraganaGroups, katakanaGroups } from '../../data/kana'
import { speakJapanese } from '../../lib/audio'

export default function KanaDiscovery() {
  const { type, groupId } = useParams<{ type: string; groupId: string }>()
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)

  const groups = type === 'katakana' ? katakanaGroups : hiraganaGroups
  const group = groups.find((g) => g.id === Number(groupId))

  if (!group) {
    navigate(`/kana/${type}`)
    return null
  }

  const kana = group.kana[index]
  const isLast = index >= group.kana.length - 1

  return (
    <div className="pb-8">
      <motion.button
        onClick={() => navigate(`/kana/${type}`)}
        className="mb-3 flex items-center gap-1.5 text-white font-bold text-[14px] cursor-pointer bg-transparent border-none p-0"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={18} weight="bold" />
        Retour
      </motion.button>

      <div className="detail-header p-4 text-white text-center mb-4">
        <h1 className="relative z-10 text-[18px] font-[800] m-0">{group.name}</h1>
        <p className="relative z-10 text-[12px] text-white/70 mt-1">
          {type === 'hiragana' ? 'Hiragana' : 'Katakana'} — Découverte
        </p>
        <div className="relative z-10 flex justify-center gap-2 mt-2">
          {group.kana.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: i === index ? 'white' : 'rgba(255,255,255,0.3)' }}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.2 }}
          className="phrase-card p-8 text-center"
        >
          {/* Big kana */}
          <p className="relative z-10 font-jp text-[80px] font-bold text-[var(--text)] leading-none">
            {kana.character}
          </p>

          {/* Romaji */}
          <p className="relative z-10 text-[28px] font-[800] text-sky-600 mt-3">
            {kana.romaji}
          </p>

          {/* Audio */}
          <button
            onClick={() => speakJapanese(kana.character, 0.7)}
            className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-full cursor-pointer mt-4"
            style={{
              background: 'linear-gradient(to bottom, #5DADE2 0%, #2196F3 40%, #1976D2 40%, #1565C0 100%)',
              border: '1px solid #0D47A1',
              boxShadow: '0 3px 8px rgba(0,80,160,0.25), inset 0 1px 0 rgba(255,255,255,0.3)',
            }}
          >
            <SpeakerHigh size={22} weight="bold" className="text-white" />
          </button>

          {/* Mnemonic */}
          {kana.mnemonic && (
            <p className="relative z-10 text-[12px] text-[var(--text-light)] mt-4 italic">
              {kana.mnemonic}
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3 mt-4">
        {index > 0 && (
          <button
            onClick={() => setIndex(index - 1)}
            className="speaker-btn !w-auto !rounded-lg px-4 py-2 flex items-center gap-1.5 text-[13px] font-bold"
          >
            <ArrowLeft size={14} weight="bold" /> Précédent
          </button>
        )}
        <button
          onClick={() => isLast ? navigate(`/kana/${type}/${groupId}/exercise`) : setIndex(index + 1)}
          className="phrase-badge !text-[13px] !px-5 !py-2 !rounded-lg flex items-center gap-1.5 cursor-pointer ml-auto"
        >
          {isLast ? 'Exercice →' : 'Suivant'} <ArrowRight size={14} weight="bold" />
        </button>
      </div>
    </div>
  )
}
