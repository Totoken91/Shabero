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
import GlossyBadge from './GlossyBadge'

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

const ICON_GRADIENTS: Record<string, string> = {
  konbini: 'radial-gradient(circle at 35% 35%, #FFB347 0%, #FF6B35 100%)',
  izakaya: 'radial-gradient(circle at 35% 35%, #FF9AC6 0%, #E0457B 100%)',
  trains: 'radial-gradient(circle at 35% 35%, #87CEEB 0%, #0077B6 100%)',
  shopping: 'radial-gradient(circle at 35% 35%, #7DFFB3 0%, #00C9A7 100%)',
  urgences: 'radial-gradient(circle at 35% 35%, #FF8A8A 0%, #D32F2F 100%)',
  socialiser: 'radial-gradient(circle at 35% 35%, #C9A7FF 0%, #7C3AED 100%)',
  reactions: 'radial-gradient(circle at 35% 35%, #FFD66B 0%, #F5A623 100%)',
  nightlife: 'radial-gradient(circle at 35% 35%, #A78BFA 0%, #6D28D9 100%)',
}

interface CategoryCardProps {
  scenario: Scenario
  index: number
  onClick: () => void
}

export default function CategoryCard({ scenario, index, onClick }: CategoryCardProps) {
  const Icon = ICONS[scenario.id] ?? Storefront
  const iconGrad = ICON_GRADIENTS[scenario.id] ?? ICON_GRADIENTS.konbini

  return (
    <motion.button
      onClick={onClick}
      className="aero-card cursor-pointer p-4 flex flex-col items-start gap-2.5 text-left"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, type: 'spring', stiffness: 120 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Aqua-style icon circle */}
      <div
        className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center relative overflow-hidden"
        style={{
          background: iconGrad,
          boxShadow: '0 4px 12px rgba(0,80,160,0.2), inset 0 -2px 4px rgba(0,0,0,0.1)',
        }}
      >
        {/* Aqua highlight band */}
        <span
          className="absolute top-0 left-0 right-0 h-[48%] pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)',
            borderRadius: '50% 50% 0 0',
          }}
          aria-hidden
        />
        <Icon size={22} weight="bold" className="text-white relative z-10" />
      </div>

      <span className="relative z-10 font-bold text-[14px] text-[var(--text)] leading-tight">
        {scenario.name}
      </span>

      <span className="relative z-10 text-[11px] text-[var(--text-light)] leading-snug">
        {scenario.description}
      </span>

      <div className="relative z-10 mt-auto">
        <GlossyBadge>{scenario.phrases.length} phrases</GlossyBadge>
      </div>
    </motion.button>
  )
}
