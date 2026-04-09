import { motion } from 'framer-motion'
import { BookOpen, Users, Lifebuoy, Rocket } from '@phosphor-icons/react'
import type { ComponentType } from 'react'
import type { IconProps } from '@phosphor-icons/react'
import type { Lesson } from '../../types'

const CAT_ICONS: Record<string, ComponentType<IconProps>> = {
  bases: BookOpen,
  social: Users,
  survie: Lifebuoy,
  avance: Rocket,
}

const CAT_STYLES: Record<string, { bg: string; border: string; badge: string }> = {
  bases:  { bg: 'linear-gradient(to bottom, #5DADE2 0%, #2196F3 45%, #1565C0 100%)', border: '#0D4F9E', badge: 'badge-trains' },
  social: { bg: 'linear-gradient(to bottom, #BA68C8 0%, #9C27B0 45%, #6A1B9A 100%)', border: '#4A148C', badge: 'badge-socialiser' },
  survie: { bg: 'linear-gradient(to bottom, #EF5350 0%, #F44336 45%, #C62828 100%)', border: '#A01010', badge: 'badge-urgences' },
  avance: { bg: 'linear-gradient(to bottom, #FFA940 0%, #FF8C00 45%, #E67300 100%)', border: '#CC6600', badge: 'badge-konbini' },
}

interface Props {
  lesson: Lesson
  index: number
  onClick: () => void
}

export default function LessonCard({ lesson, index, onClick }: Props) {
  const Icon = CAT_ICONS[lesson.category] ?? BookOpen
  const style = CAT_STYLES[lesson.category] ?? CAT_STYLES.bases

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
        {lesson.title}
      </span>

      <span className="relative z-10 text-[11px] text-[var(--text-light)] leading-snug">
        {lesson.description}
      </span>

      <div className="relative z-10 mt-auto">
        <span className={`phrase-badge ${style.badge}`}>{lesson.steps.length} étapes</span>
      </div>
    </motion.button>
  )
}
