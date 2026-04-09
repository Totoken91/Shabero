import { useLocation, useNavigate } from 'react-router-dom'
import { Headphones, Brain, TextAa, Book } from '@phosphor-icons/react'
import type { ComponentType } from 'react'
import type { IconProps } from '@phosphor-icons/react'

interface Tab {
  id: string
  label: string
  icon: ComponentType<IconProps>
  path: string
}

const TABS: Tab[] = [
  { id: 'situations', label: 'Situations', icon: Headphones, path: '/situations' },
  { id: 'entrainement', label: 'Entraînement', icon: Brain, path: '/entrainement' },
  { id: 'kana', label: 'Kana', icon: TextAa, path: '/kana' },
  { id: 'dico', label: 'Dico', icon: Book, path: '/dico' },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const currentTab = TABS.find(
    (t) => location.pathname === t.path || location.pathname.startsWith(t.path + '/')
  )?.id ?? 'situations'

  return (
    <nav className="bottom-nav">
      {TABS.map((tab) => {
        const active = tab.id === currentTab
        const Icon = tab.icon
        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className={`bottom-nav__btn ${active ? 'bottom-nav__btn--active' : ''}`}
          >
            <Icon size={20} weight={active ? 'fill' : 'regular'} />
            <span className="text-[10px] mt-0.5">{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
