import { useLocation, useNavigate } from 'react-router-dom'
import { ChatText, Signpost } from '@phosphor-icons/react'

const TABS = [
  { id: 'phrases', label: 'Phrases', icon: ChatText, path: '/' },
  { id: 'panneaux', label: 'Panneaux', icon: Signpost, path: '/panneaux' },
] as const

export default function TabNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const currentTab = TABS.find((t) =>
    t.path === '/'
      ? location.pathname === '/' || location.pathname.startsWith('/scenario')
      : location.pathname.startsWith(t.path)
  )?.id ?? 'phrases'

  return (
    <nav className="tab-nav">
      {TABS.map((tab) => {
        const active = tab.id === currentTab
        const Icon = tab.icon
        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className={`tab-btn ${active ? 'tab-btn--active' : ''}`}
          >
            <Icon size={16} weight={active ? 'bold' : 'regular'} />
            <span>{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
