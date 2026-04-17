import { useLocation, useNavigate } from 'react-router-dom'
import { Headphones, Brain, TextAa, Book } from '@phosphor-icons/react'
import type { ComponentType } from 'react'
import type { IconProps } from '@phosphor-icons/react'
import { useUI } from '../lib/locale'
import type { UIKey } from '../i18n/ui'

interface Tab {
  id: string
  labelKey: UIKey
  icon: ComponentType<IconProps>
  path: string
}

const TABS: Tab[] = [
  { id: 'situations', labelKey: 'nav.situations', icon: Headphones, path: '/situations' },
  { id: 'entrainement', labelKey: 'nav.training', icon: Brain, path: '/entrainement' },
  { id: 'kana', labelKey: 'nav.kana', icon: TextAa, path: '/kana' },
  { id: 'dico', labelKey: 'nav.dico', icon: Book, path: '/dico' },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const ui = useUI()

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
            <span className="text-[10px] mt-0.5">{ui(tab.labelKey)}</span>
          </button>
        )
      })}
    </nav>
  )
}
