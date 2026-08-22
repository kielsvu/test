'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import WelcomeScreen from '@/components/WelcomeScreen'
import Navbar from '@/components/ui/Navbar'
import SettingsPanel from '@/components/ui/SettingsPanel'
import AnimatedBackground from '@/components/AnimatedBackground'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import PortfolioShowcase from '@/components/sections/PortfolioShowcase'
import ContactSection from '@/components/sections/contact/ContactSection'
import { hasSeenIntro, markIntroSeen } from '@/lib/introState'

export default function Home() {
  const [showIntro, setShowIntro] = useState(false)
  const [showMain, setShowMain] = useState(false)
  const [showApp, setShowApp] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    const seen = hasSeenIntro()
    if (!seen) {
      setShowIntro(true)
      const t1 = setTimeout(() => {
        setShowIntro(false)
        markIntroSeen()
      }, 3000)
      const t2 = setTimeout(() => setShowMain(true), 3200)
      const t3 = setTimeout(() => setShowApp(true), 4600)
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    } else {
      setShowMain(true)
      setShowApp(true)
    }
  }, [])

  return (
    <>
      {/* Intro screen */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
          >
            <WelcomeScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main site */}
      <AnimatePresence>
        {showMain && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatedBackground />
            <Navbar onSettingsOpen={() => setSettingsOpen(true)} />

            <main style={{ position: 'relative', zIndex: 1 }}>
              <Hero showApp={showApp} />
              <About />
              <PortfolioShowcase />
              <ContactSection />
            </main>

            <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
