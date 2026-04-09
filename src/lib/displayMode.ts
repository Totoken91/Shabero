import type { DisplayMode } from '../types'

const STORAGE_KEY = 'shabero-display-mode'

export function getDisplayMode(): DisplayMode {
  if (typeof window === 'undefined') return 'all'
  return (localStorage.getItem(STORAGE_KEY) as DisplayMode) ?? 'all'
}

export function setDisplayMode(mode: DisplayMode) {
  localStorage.setItem(STORAGE_KEY, mode)
}
