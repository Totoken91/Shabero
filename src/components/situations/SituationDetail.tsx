import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from '@phosphor-icons/react'
import { scenarios } from '../../data/scenarios'
import type { DisplayMode } from '../../types'
import { getDisplayMode, setDisplayMode } from '../../lib/displayMode'
import DisplayToggle from '../DisplayToggle'
import PhraseCard from './PhraseCard'

export default function SituationDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [mode, setMode] = useState<DisplayMode>(getDisplayMode)

  const scenario = scenarios.find((s) => s.id === id)

  if (!scenario) {
    return <div className="p-6 text-center text-[var(--text-light)]">Catégorie introuvable.</div>
  }

  const handleModeChange = (m: DisplayMode) => {
    setMode(m)
    setDisplayMode(m)
  }

  return (
    <div className="pb-8">
      <motion.button
        onClick={() => navigate('/situations')}
        className="mb-3 flex items-center gap-1.5 text-white font-bold text-[14px] cursor-pointer bg-transparent border-none p-0"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={18} weight="bold" />
        Retour
      </motion.button>

      <motion.div
        className="detail-header p-5 text-white text-center mb-4"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h1 className="relative z-10 text-[20px] font-[800] m-0">{scenario.name}</h1>
        <p className="relative z-10 text-[13px] text-white/80 mt-1">{scenario.description}</p>
        <p className="relative z-10 text-[11px] text-white/50 mt-1">{scenario.phrases.length} phrases</p>
      </motion.div>

      <DisplayToggle mode={mode} onChange={handleModeChange} />

      <div className="flex flex-col gap-3">
        {scenario.phrases.map((phrase, i) => (
          <PhraseCard key={phrase.id} phrase={phrase} index={i} displayMode={mode} />
        ))}
      </div>
    </div>
  )
}
