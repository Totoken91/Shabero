import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from '@phosphor-icons/react'
import { signCategories } from '../../data/signs'
import type { Sign } from '../../types'

function SignCard({ sign, index }: { sign: Sign; index: number }) {
  return (
    <motion.div
      className="phrase-card p-4 flex flex-col gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35, ease: 'easeOut' }}
    >
      <div className="relative z-10 flex items-baseline gap-3">
        <span className="font-jp text-[22px] font-bold text-[var(--text)]">
          {sign.jp}
        </span>
      </div>

      <span className="relative z-10 text-[13px] font-semibold text-sky-700">
        {sign.romaji}
      </span>

      <span className="relative z-10 text-[14px] font-bold text-[var(--text)]">
        {sign.fr}
      </span>

      <span className="relative z-10 text-[12px] text-[var(--text-light)]">
        {sign.note}
      </span>
    </motion.div>
  )
}

export default function SignDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const category = signCategories.find((c) => c.id === id)

  if (!category) {
    return (
      <div className="p-6 text-center text-[var(--text-light)]">
        Catégorie introuvable.
      </div>
    )
  }

  return (
    <div className="pb-8">
      <motion.button
        onClick={() => navigate('/panneaux')}
        className="mb-3 flex items-center gap-1.5 text-white font-bold text-[14px] cursor-pointer bg-transparent border-none p-0"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
        whileHover={{ x: -3 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={18} weight="bold" />
        Retour
      </motion.button>

      <motion.div
        className="detail-header p-5 text-white flex flex-col items-center gap-2 text-center mb-4"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="relative z-10 text-[22px] font-[800] m-0">{category.name}</h1>
        <p className="relative z-10 text-[13px] text-white/80 m-0">{category.description}</p>
      </motion.div>

      <div className="flex flex-col gap-3">
        {category.signs.map((sign, i) => (
          <SignCard key={i} sign={sign} index={i} />
        ))}
      </div>
    </div>
  )
}
