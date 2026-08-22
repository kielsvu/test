'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { JHLogo, IconMenu, IconX, IconSettings } from '@/components/icons'

type NavbarProps = {
  onSettingsOpen: () => void
}

export default function Navbar({ onSettingsOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mounted, setMounted] = useState(false)
  const [showNavbar, setShowNavbar] = useState(false)
  const [hasPointer, setHasPointer] = useState(false)

  useEffect(() => {
    setMounted(true)
    setHasPointer(window.matchMedia('(hover: hover) and (pointer: fine)').matches)

    const handleResize = () => setIsMobile(window.innerWidth < 768)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = ['home', 'about', 'portfolio', 'contact']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= 140 && rect.bottom >= 140) {
          setActiveSection(id)
          break
        }
      }
    }

    handleResize()
    handleScroll()
    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const played = sessionStorage.getItem('navbarPlayed')
    if (played) { setShowNavbar(true); return }
    const t = setTimeout(() => {
      setShowNavbar(true)
      sessionStorage.setItem('navbarPlayed', 'true')
    }, 3200)
    return () => clearTimeout(t)
  }, [])

  if (!mounted) return null

  const smoothScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const target = document.querySelector(id)
    if (!target) return
    const start = window.scrollY
    const end = target.getBoundingClientRect().top + window.scrollY - 3
    const dist = end - start
    const dur = 1100
    let startTime: number | null = null

    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
    const step = (now: number) => {
      if (!startTime) startTime = now
      const elapsed = now - startTime
      const prog = Math.min(elapsed / dur, 1)
      window.scrollTo({ top: start + dist * ease(prog) })
      if (elapsed < dur) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
    setOpen(false)
  }

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'Contact', id: 'contact' },
  ]

  const navBg = scrolled
    ? 'rgba(8,8,10,0.88)'
    : 'rgba(8,8,10,0.55)'

  return (
    <motion.nav
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: showNavbar ? 1 : 0, y: showNavbar ? 0 : -40 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 18,
        left: isMobile ? 16 : 52,
        right: isMobile ? 16 : 52,
        zIndex: 50,
      }}
    >
      {/* Main bar */}
      <div
        className="glass"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '10px 18px' : '10px 24px',
          borderRadius: 999,
          background: navBg,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid var(--border)',
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}
      >
        {/* JH Logo */}
        <a
          href="#home"
          onClick={(e) => smoothScrollTo(e, '#home')}
          aria-label="Go to top"
          style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
        >
          <JHLogo size={isMobile ? 28 : 32} />
        </a>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => smoothScrollTo(e, `#${item.id}`)}
                  style={{
                    position: 'relative',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 12,
                    color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                    textDecoration: 'none',
                    letterSpacing: '0.08em',
                    paddingBottom: 4,
                    transition: 'color 0.25s ease',
                  }}
                >
                  {item.label}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: 1.5,
                      background: 'var(--accent)',
                      borderRadius: 999,
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.28s ease',
                    }}
                  />
                </a>
              )
            })}
          </div>
        )}

        {/* Right controls */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* Settings */}
          <button
            onClick={onSettingsOpen}
            aria-label="Open settings"
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              border: '1px solid var(--border)',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              transition: 'border-color 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!hasPointer) return
              e.currentTarget.style.borderColor = 'var(--border-hover)'
              e.currentTarget.style.color = 'var(--accent)'
            }}
            onMouseLeave={(e) => {
              if (!hasPointer) return
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}
          >
            <IconSettings size={15} />
          </button>

          {/* Mobile menu toggle */}
          {isMobile && (
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                border: '1px solid var(--border)',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-primary)',
              }}
            >
              {open ? <IconX size={15} /> : <IconMenu size={15} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isMobile && open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass"
            style={{
              marginTop: 10,
              borderRadius: 20,
              background: 'rgba(8,8,10,0.92)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid var(--border)',
              padding: '12px 4px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => smoothScrollTo(e, `#${item.id}`)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 20px',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 13,
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    borderRadius: 12,
                    margin: '2px 8px',
                    transition: 'background 0.2s ease, color 0.2s ease',
                    background: isActive ? 'var(--accent-glow)' : 'transparent',
                  }}
                >
                  {item.label}
                </a>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
