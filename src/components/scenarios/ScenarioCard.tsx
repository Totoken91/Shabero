import type { Scenario } from '../../types'
import type { ComponentType } from 'react'
import type { IconProps } from '@phosphor-icons/react'
import {
  Storefront,
  BeerBottle,
  Train,
  ShoppingBag,
  FirstAid,
  ChatCircleDots,
} from '@phosphor-icons/react'

const ICONS: Record<string, ComponentType<IconProps>> = {
  konbini: Storefront,
  izakaya: BeerBottle,
  trains: Train,
  shopping: ShoppingBag,
  urgences: FirstAid,
  socialiser: ChatCircleDots,
}

const ICON_COLORS: Record<string, string> = {
  konbini: '#f5923a',
  izakaya: '#f06fa0',
  trains: '#3a9fd1',
  shopping: '#2bbfb0',
  urgences: '#e05555',
  socialiser: '#8b5cf6',
}

interface ScenarioCardProps {
  scenario: Scenario
  onClick: () => void
}

export default function ScenarioCard({ scenario, onClick }: ScenarioCardProps) {
  const Icon = ICONS[scenario.id] ?? Storefront
  const color = ICON_COLORS[scenario.id] ?? 'var(--blue)'

  return (
    <button
      onClick={onClick}
      className="glass-sm cursor-pointer p-4 flex flex-col items-start gap-2.5 text-left transition-transform duration-150 active:scale-95 hover:scale-[1.02]"
    >
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center"
        style={{
          background: `${color}18`,
          color,
        }}
      >
        <Icon size={24} weight="duotone" />
      </div>

      <span className="font-bold text-[14px] text-[var(--text)] leading-tight">
        {scenario.name}
      </span>

      <span className="text-[11px] text-[var(--text-2)] opacity-60 leading-snug">
        {scenario.description}
      </span>

      <span
        className="mt-auto text-[11px] font-bold px-2.5 py-0.5 rounded-full text-white"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
      >
        {scenario.phrases.length} phrases
      </span>
    </button>
  )
}
