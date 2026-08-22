'use client'

import { useEffect } from 'react'
import { loadSettings, applySettings } from '@/lib/settings'

export default function SettingsInit() {
  useEffect(() => {
    const s = loadSettings()
    applySettings(s)
  }, [])

  return null
}
