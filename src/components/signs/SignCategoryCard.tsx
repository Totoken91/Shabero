import { motion } from 'framer-motion'
import {
  Train,
  MapPin,
  Storefront,
  Toilet,
  Warning,
} from '@phosphor-icons/react'
import type { ComponentType } from 'react'
import type { IconProps } from '@phosphor-icons/react'
import type { SignCategory } from '../../types'

const ICONS: Record<string, ComponentType<IconProps>> = {
  gare: Train,
  rue: MapPin,
  magasins: Storefront,
  toilettes: Toilet,
  danger: Warning,
}

const ICON_STYLES: Record<string, { bg: string; border: string }> = {
  gare:      { bg: 'linear-gradient(to bottom, #5DADE2 0%, #2196F3 45%, #1565C0 100%)', border: '#0D4F9E' },
  rue:       { bg: 'linear-gradient(to bottom, #81C784 0%, #4CAF50 45%, #2E7D32 100%)', border: '#1B5E20' },
  magasins:  { bg: 'linear-gradient(to bottom, #FFA940 0%, #FF8C00 45%, #E67300 100%)', border: '#CC6600' },
  toilettes: { bg: 'linear-gradient(to bottom, #7986CB 0%, #5C6BC0 45%, #3949AB 100%)', border: '#283593' },
  danger:    { bg: 'linear-gradient(to bottom, #EF5350 0%, #F44336 45%, #C62828 100%)', border: '#A01010' },
}

const BADGE_CLASSES: Record<string, string> = {
  gare: 'badge-trains',
  rue: 'badge-shopping',
  magasins: 'badge-konbini',
  toilettes: 'badge-nightlife',
  danger: 'badge-urgences',
}

interface Props {
  category: SignCategory
  index: number
  onClick: () => void
}

export default function SignCategoryCard({ category, index, onClick }: Props) {
  const Icon = ICONS[category.id] ?? MapPin
  const style = ICON_STYLES[category.id] ?? ICON_STYLES.rue

  return (
    <motion.button
      onClick={onClick}
      className="aero-card cursor-pointer p-5 flex flex-col items-start gap-3 text-left"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -3, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className="icon-aqua"
        style={{ background: style.bg, borderColor: style.border }}
      >
        <Icon size={22} weight="bold" className="text-white relative z-10" />
      </div>

      <span className="relative z-10 font-bold text-[14px] text-[var(--text)] leading-tight">
        {category.name}
      </span>

      <span className="relative z-10 text-[11px] text-[var(--text-light)] leading-snug">
        {category.description}
      </span>

      <div className="relative z-10 mt-auto">
        <span className={`phrase-badge ${BADGE_CLASSES[category.id] ?? ''}`}>
          {category.signs.length} panneaux
        </span>
      </div>
    </motion.button>
  )
}
