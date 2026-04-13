import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from '@phosphor-icons/react'
import { scenarios } from '../../data/scenarios'
import { getDisplayMode, setDisplayMode as saveMode } from '../../lib/store'
import { markPhraseListened, completeStep1, getCategoryProgress, awardStepXP } from '../../lib/store'
import { showXPToast } from '../../lib/xpToast'
import type { DisplayMode } from '../../types'
import DisplayToggle from '../DisplayToggle'
import PhraseCard from './PhraseCard'

export default function StepListen() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [mode, setMode] = useState<DisplayMode>(getDisplayMode)

  const scenario = scenarios.find((s) => s.id === id)
  if (!scenario) return null

  const progress = getCategoryProgress(id!)

  const handleModeChange = (m: DisplayMode) => { setMode(m); saveMode(m) }

  const handleComplete = () => {
    const xp = awardStepXP(`${id}-step1`, 50)
    if (xp > 0) showXPToast(xp, 'Etape 1 !')
    completeStep1(id!)
    navigate(`/situations/${id}`)
  }

  return (
    <div className="pb-8">
      <motion.button
        onClick={() => navigate(`/situations/${id}`)}
        className="mb-3 flex items-center gap-1.5 text-white font-bold text-[14px] cursor-pointer bg-transparent border-none p-0"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={18} weight="bold" />
        Retour
      </motion.button>

      <div className="detail-header p-4 text-white text-center mb-4">
        <h1 className="relative z-10 text-[18px] font-[800] m-0">Étape 1 — Écoute</h1>
        <p className="relative z-10 text-[12px] text-white/70 mt-1">{scenario.name} • {scenario.phrases.length} phrases</p>
      </div>

      <DisplayToggle mode={mode} onChange={handleModeChange} />

      <div className="flex flex-col gap-3">
        {scenario.phrases.map((phrase, i) => (
          <PhraseCard
            key={phrase.id ?? i}
            phrase={phrase}
            index={i}
            displayMode={mode}
            onListen={() => phrase.id && markPhraseListened(id!, phrase.id)}
          />
        ))}
      </div>

      <button
        onClick={handleComplete}
        className="phrase-badge !text-[14px] !px-6 !py-3 !rounded-lg cursor-pointer mt-6 mx-auto block"
      >
        {progress.step1Complete ? 'Réécouter terminé' : 'J\'ai tout écouté'}
      </button>
    </div>
  )
}
