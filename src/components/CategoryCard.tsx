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
  Skull,
  Buildings,
  MapTrifold,
  HandsPraying,
  Hash,
  IdentificationCard,
  Key,
} from '@phosphor-icons/react'
import type { ComponentType } from 'react'
import type { IconProps } from '@phosphor-icons/react'
import type { Scenario } from '../types'
import { getCategoryProgress, getCategoryStepInfo } from '../lib/store'
import { useT } from '../lib/locale'

const ICONS: Record<string, ComponentType<IconProps>> = {
  konbini: Storefront,
  izakaya: BeerBottle,
  trains: Train,
  shopping: ShoppingBag,
  urgences: FirstAid,
  socialiser: ChatCircleDots,
  reactions: Smiley,
  nightlife: MoonStars,
  insultes: Skull,
  hotel: Buildings,
  checkin: Key,
  navigation: MapTrifold,
  politesse: HandsPraying,
  nombres: Hash,
  parlersoi: IdentificationCard,
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
  insultes:   { bg: 'linear-gradient(to bottom, #78909C 0%, #546E7A 45%, #37474F 100%)', border: '#263238' },
  hotel:      { bg: 'linear-gradient(to bottom, #5C6BC0 0%, #3F51B5 45%, #283593 100%)', border: '#1A237E' },
  checkin:    { bg: 'linear-gradient(to bottom, #FFCA28 0%, #FFB300 45%, #FF8F00 100%)', border: '#E65100' },
  navigation: { bg: 'linear-gradient(to bottom, #4DD0E1 0%, #00ACC1 45%, #00838F 100%)', border: '#006064' },
  politesse:  { bg: 'linear-gradient(to bottom, #FFD54F 0%, #FFC107 45%, #FFA000 100%)', border: '#E65100' },
  nombres:    { bg: 'linear-gradient(to bottom, #7986CB 0%, #5C6BC0 45%, #3949AB 100%)', border: '#283593' },
  parlersoi:  { bg: 'linear-gradient(to bottom, #42A5F5 0%, #1E88E5 45%, #1565C0 100%)', border: '#0D47A1' },
}

interface CategoryCardProps {
  scenario: Scenario
  index: number
  onClick: () => void
}

export default function CategoryCard({ scenario, index, onClick }: CategoryCardProps) {
  const Icon = ICONS[scenario.id] ?? Storefront
  const iconStyle = ICON_STYLES[scenario.id] ?? ICON_STYLES.konbini
  const t = useT()

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
        {t(scenario.name, scenario.name_en)}
      </span>

      <span className="relative z-10 text-[11px] text-[var(--text-light)] leading-snug">
        {t(scenario.description, scenario.description_en)}
      </span>

      {/* Step indicators + progress */}
      {(() => {
        const prog = getCategoryProgress(scenario.id)
        const { pct } = getCategoryStepInfo(scenario.id)
        return (
          <div className="relative z-10 mt-auto w-full">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className={`w-4 h-4 rounded-full text-[8px] font-bold flex items-center justify-center ${prog.step1Complete ? 'bg-emerald-500 text-white' : 'bg-[#D4E8F5] text-[var(--text-light)]'}`}>1</span>
              <span className={`w-4 h-4 rounded-full text-[8px] font-bold flex items-center justify-center ${prog.step2Complete ? 'bg-emerald-500 text-white' : 'bg-[#D4E8F5] text-[var(--text-light)]'}`}>2</span>
              <span className={`w-4 h-4 rounded-full text-[8px] font-bold flex items-center justify-center ${prog.step3Complete ? 'bg-emerald-500 text-white' : 'bg-[#D4E8F5] text-[var(--text-light)]'}`}>3</span>
              {prog.stampEarned && <span className="mastered-badge ml-auto !text-[9px] !px-1.5 !py-0">★</span>}
            </div>
            {pct > 0 && (
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#D4E8F5', border: '1px solid #B0D0E5' }}>
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct >= 100 ? '#D4A800' : '#34A853' }} />
              </div>
            )}
          </div>
        )
      })()}
    </motion.button>
  )
}
