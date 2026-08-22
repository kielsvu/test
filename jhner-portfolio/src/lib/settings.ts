export type Theme = 'dark' | 'light'
export type Accent = 'purple' | 'blue' | 'green' | 'rose' | 'cyan'
export type Intensity = 'full' | 'balanced' | 'subtle' | 'off'

export interface Settings {
  theme: Theme
  accent: Accent
  animations: boolean
  intensity: Intensity
  bgEffects: boolean
  glass: boolean
}

export const DEFAULT_SETTINGS: Settings = {
  theme: 'dark',
  accent: 'purple',
  animations: true,
  intensity: 'balanced',
  bgEffects: true,
  glass: true,
}

const KEY = 'jhner-settings'

export function loadSettings(): Settings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS
  try {
    const stored = localStorage.getItem(KEY)
    if (!stored) return DEFAULT_SETTINGS
    return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(s: Settings): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(KEY, JSON.stringify(s))
  } catch {}
}

export function applySettings(s: Settings): void {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.setAttribute('data-theme', s.theme)
  root.setAttribute('data-accent', s.accent)
  root.setAttribute('data-animations', s.animations ? 'on' : 'off')
  root.setAttribute('data-intensity', s.intensity)
  root.setAttribute('data-bg-effects', s.bgEffects ? 'on' : 'off')
  root.setAttribute('data-glass', s.glass ? 'on' : 'off')
}
