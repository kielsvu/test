'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconX, IconCheck } from '@/components/icons'
import {
  loadSettings,
  saveSettings,
  applySettings,
  DEFAULT_SETTINGS,
  type Settings,
  type Theme,
  type Accent,
  type Intensity,
} from '@/lib/settings'

type Props = {
  open: boolean
  onClose: () => void
}

export default function SettingsPanel({ open, onClose }: Props) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setSettings(loadSettings())
  }, [])

  const update = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value }
      saveSettings(next)
      applySettings(next)
      return next
    })
  }, [])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!mounted) return null

  const accentOptions: { value: Accent; label: string; color: string }[] = [
    { value: 'purple', label: 'Purple', color: '#B284FF' },
    { value: 'blue',   label: 'Blue',   color: '#60A5FA' },
    { value: 'green',  label: 'Green',  color: '#34D399' },
    { value: 'rose',   label: 'Rose',   color: '#FB7185' },
    { value: 'cyan',   label: 'Cyan',   color: '#22D3EE' },
  ]

  const intensityOptions: { value: Intensity; label: string }[] = [
    { value: 'full',     label: 'Full'     },
    { value: 'balanced', label: 'Balanced' },
    { value: 'subtle',   label: 'Subtle'   },
    { value: 'off',      label: 'Off'      },
  ]

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              background: 'rgba(0,0,0,0.5)',
            }}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Settings"
            className="glass custom-scroll"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(340px, 92vw)',
              zIndex: 201,
              background: 'var(--bg-secondary)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderLeft: '1px solid var(--border)',
              overflowY: 'auto',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 28,
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 2 }}>
                  Preferences
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>Settings</h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close settings"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  border: '1px solid var(--border)',
                  background: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
              >
                <IconX size={14} />
              </button>
            </div>

            {/* THEME */}
            <Section label="Theme">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {(['dark', 'light'] as Theme[]).map((t) => (
                  <OptionButton
                    key={t}
                    active={settings.theme === t}
                    onClick={() => update('theme', t)}
                    label={t.charAt(0).toUpperCase() + t.slice(1)}
                  />
                ))}
              </div>
            </Section>

            {/* ACCENT */}
            <Section label="Accent Color">
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {accentOptions.map(({ value, label, color }) => (
                  <button
                    key={value}
                    onClick={() => update('accent', value)}
                    title={label}
                    aria-label={`Accent ${label}`}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      border: settings.accent === value ? `2px solid ${color}` : '2px solid transparent',
                      background: color,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.15s ease, border 0.15s ease',
                      transform: settings.accent === value ? 'scale(1.12)' : 'scale(1)',
                      boxShadow: settings.accent === value ? `0 0 10px ${color}55` : 'none',
                    }}
                  >
                    {settings.accent === value && <IconCheck size={14} color="#fff" />}
                  </button>
                ))}
              </div>
            </Section>

            {/* ANIMATIONS */}
            <Section label="Animations">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <OptionButton active={settings.animations} onClick={() => update('animations', true)} label="On" />
                <OptionButton active={!settings.animations} onClick={() => update('animations', false)} label="Off" />
              </div>
            </Section>

            {/* INTENSITY */}
            <Section label="Animation Intensity">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {intensityOptions.map(({ value, label }) => (
                  <OptionButton
                    key={value}
                    active={settings.intensity === value}
                    onClick={() => update('intensity', value)}
                    label={label}
                  />
                ))}
              </div>
            </Section>

            {/* BACKGROUND EFFECTS */}
            <Section label="Background Effects">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <OptionButton active={settings.bgEffects} onClick={() => update('bgEffects', true)} label="On" />
                <OptionButton active={!settings.bgEffects} onClick={() => update('bgEffects', false)} label="Off" />
              </div>
            </Section>

            {/* GLASS */}
            <Section label="Glass Effects">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <OptionButton active={settings.glass} onClick={() => update('glass', true)} label="On" />
                <OptionButton active={!settings.glass} onClick={() => update('glass', false)} label="Off" />
              </div>
            </Section>

            {/* Reset */}
            <div style={{ marginTop: 'auto', paddingTop: 8 }}>
              <button
                onClick={() => {
                  saveSettings(DEFAULT_SETTINGS)
                  applySettings(DEFAULT_SETTINGS)
                  setSettings(DEFAULT_SETTINGS)
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: 12,
                  border: '1px solid var(--border)',
                  background: 'transparent',
                  color: 'var(--text-muted)',
                  fontSize: 12,
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
              >
                Reset to defaults
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.16em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
        {label}
      </div>
      {children}
    </div>
  )
}

function OptionButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '9px 12px',
        borderRadius: 10,
        border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
        background: active ? 'var(--accent-glow)' : 'transparent',
        color: active ? 'var(--accent)' : 'var(--text-muted)',
        fontSize: 12,
        fontFamily: "'DM Mono', monospace",
        letterSpacing: '0.05em',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textAlign: 'center',
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.borderColor = 'var(--border-hover)'
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.borderColor = 'var(--border)'
      }}
    >
      {label}
    </button>
  )
}
