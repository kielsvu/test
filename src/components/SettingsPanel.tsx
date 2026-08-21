'use client'

import { useEffect, useState } from 'react'
import { Settings2, X, Moon, Sun, Sparkles } from 'lucide-react'

const defaults = {
  theme: 'dark',
  accent: 'purple',
  motion: 'balanced',
  background: true,
  glass: true,
}

export default function SettingsPanel() {
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState(defaults)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('jhner-settings')
      if (saved) setSettings({ ...defaults, ...JSON.parse(saved) })
    } catch {}
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    root.dataset.theme = settings.theme
    root.dataset.accent = settings.accent
    body.dataset.motion = settings.motion === 'off' ? 'off' : 'on'
    body.dataset.motionLevel = settings.motion
    body.dataset.background = settings.background ? 'on' : 'off'
    body.dataset.glass = settings.glass ? 'on' : 'off'
    localStorage.setItem('jhner-settings', JSON.stringify(settings))
  }, [settings])

  const update = (key: keyof typeof defaults, value: string | boolean) => {
    setSettings((current) => ({ ...current, [key]: value }))
  }

  return (
    <div className="fixed bottom-5 right-5 z-[70]">
      {open && (
        <div className="mb-3 w-[min(340px,calc(100vw-40px))] rounded-3xl border border-white/10 bg-[#0b0b0f]/95 p-5 shadow-2xl backdrop-blur-xl">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Display settings</p>
              <p className="mt-1 text-[11px] text-white/40">Saved on this device</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close settings" className="rounded-xl border border-white/10 p-2 text-white/60 transition hover:text-white">
              <X size={15} />
            </button>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <p className="mb-2 text-white/45">THEME</p>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => update('theme', 'dark')} className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 ${settings.theme === 'dark' ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-white' : 'border-white/10 text-white/50'}`}><Moon size={14} /> Dark</button>
                <button onClick={() => update('theme', 'light')} className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 ${settings.theme === 'light' ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-black' : 'border-white/10 text-white/50'}`}><Sun size={14} /> Light</button>
              </div>
            </div>

            <div>
              <p className="mb-2 text-white/45">ACCENT</p>
              <div className="grid grid-cols-5 gap-2">
                {['purple', 'blue', 'green', 'rose', 'cyan'].map((accent) => (
                  <button key={accent} onClick={() => update('accent', accent)} aria-label={`${accent} accent`} className={`h-8 rounded-lg border ${settings.accent === accent ? 'border-white' : 'border-white/10'}`} style={{ background: `var(--${accent})` }} />
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-white/45">ANIMATION INTENSITY</p>
              <div className="grid grid-cols-4 gap-2">
                {['full', 'balanced', 'subtle', 'off'].map((level) => (
                  <button key={level} onClick={() => update('motion', level)} className={`rounded-xl border px-2 py-2 capitalize ${settings.motion === level ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-white' : 'border-white/10 text-white/45'}`}>{level}</button>
                ))}
              </div>
            </div>

            <Toggle label="Background effects" value={settings.background} onChange={(value) => update('background', value)} />
            <Toggle label="Glass effects" value={settings.glass} onChange={(value) => update('glass', value)} />
          </div>
        </div>
      )}

      <button onClick={() => setOpen((value) => !value)} aria-label="Open display settings" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#0b0b0f]/90 text-white/70 shadow-xl backdrop-blur-md transition hover:border-[var(--accent)] hover:text-white">
        {open ? <X size={17} /> : <Settings2 size={17} />}
      </button>
    </div>
  )
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (value: boolean) => void }) {
  return (
    <button onClick={() => onChange(!value)} className="flex w-full items-center justify-between rounded-xl border border-white/10 px-3 py-3 text-left text-white/70">
      <span className="flex items-center gap-2"><Sparkles size={13} /> {label}</span>
      <span className={`relative h-5 w-9 rounded-full transition ${value ? 'bg-[var(--accent)]' : 'bg-white/15'}`}><span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${value ? 'translate-x-4' : 'translate-x-0.5'}`} /></span>
    </button>
  )
}
