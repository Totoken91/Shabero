import { motion } from 'framer-motion'
import {
  Storefront,
  BeerBottle,
  Train,
  ShoppingBag,
  FirstAid,
  ChatCircleDots,
  Smiley,
  MoonStars,
} from '@phosphor-icons/react'
import type { ComponentType } from 'react'
import type { IconProps } from '@phosphor-icons/react'
import type { Scenario } from '../types'

const ICONS: Record<string, ComponentType<IconProps>> = {
  konbini: Storefront,
  izakaya: BeerBottle,
  trains: Train,
  shopping: ShoppingBag,
  urgences: FirstAid,
  socialiser: ChatCircleDots,
  reactions: Smiley,
  nightlife: MoonStars,
}

// Aqua-style gradient: light top → main → dark bottom + border
const ICON_STYLES: Record<string, { bg: string; border: string }> = {
  konbini:    { bg: 'linear-gradient(to bottom, #FFA940 0%, #FF8C00 45%, #E67300 100%)', border: '#CC6600' },
  izakaya:    { bg: 'linear-gradient(to bottom, #FF6EB4 0%, #E91E8C 45%, #C4167A 100%)', border: '#A0125F' },
  trains:     { bg: 'linear-gradient(to bottom, #5DADE2 0%, #2196F3 45%, #1565C0 100%)', border: '#0D4F9E' },
  shopping:   { bg: 'linear-gradient(to bottom, #81C784 0%, #4CAF50 45%, #2E7D32 100%)', border: '#1B5E20' },
  urgences:   { bg: 'linear-gradient(to bottom, #EF5350 0%, #F44336 45%, #C62828 100%)', border: '#A01010' },
  socialiser: { bg: 'linear-gradient(to bottom, #BA68C8 0%, #9C27B0 45%, #6A1B9A 100%)', border: '#4A148C' },
  reactions:  { bg: 'linear-gradient(to bottom, #81C784 0%, #66BB6A 45%, #43A047 100%)', border: '#2E7D32' },
  nightlife:  { bg: 'linear-gradient(to bottom, #7986CB 0%, #5C6BC0 45%, #3949AB 100%)', border: '#283593' },
}

interface CategoryCardProps {
  scenario: Scenario
  index: number
  onClick: () => void
}

export default function CategoryCard({ scenario, index, onClick }: CategoryCardProps) {
  const Icon = ICONS[scenario.id] ?? Storefront
  const iconStyle = ICON_STYLES[scenario.id] ?? ICON_STYLES.konbini

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
      {/* Aqua-style icon circle */}
      <div
        className="icon-aqua"
        style={{
          background: iconStyle.bg,
          borderColor: iconStyle.border,
        }}
      >
        <Icon size={22} weight="bold" className="text-white relative z-10" />
      </div>

      <span className="relative z-10 font-bold text-[14px] text-[var(--text)] leading-tight">
        {scenario.name}
      </span>

      <span className="relative z-10 text-[11px] text-[var(--text-light)] leading-snug">
        {scenario.description}
      </span>

      <div className="relative z-10 mt-auto">
        <span className={`phrase-badge badge-${scenario.id}`}>{scenario.phrases.length} phrases</span>
      </div>
    </motion.button>
  )
}
