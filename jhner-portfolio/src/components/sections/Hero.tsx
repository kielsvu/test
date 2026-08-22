'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import App from '@/components/band/App'
import TextType from '@/components/band/TextType'
import { loadSettings } from '@/lib/settings'

const skills = ['TypeScript', 'React.js', 'Next.js', 'Node.js', 'Tailwind']

type HeroProps = {
  showApp: boolean
}

export default function Hero({ showApp }: HeroProps) {
  const [startAnim, setStartAnim] = useState(false)
  const [bgEffects, setBgEffects] = useState(true)

  useEffect(() => {
    const s = loadSettings()
    setBgEffects(s.bgEffects)

    // Listen for settings changes via storage events
    const onStorage = () => {
      const updated = loadSettings()
      setBgEffects(updated.bgEffects)
    }
    window.addEventListener('storage', onStorage)

    const heroPlayed = sessionStorage.getItem('heroPlayed')
    if (heroPlayed === 'true') {
      setStartAnim(true)
      return () => window.removeEventListener('storage', onStorage)
    }

    const textTimer = setTimeout(() => setStartAnim(true), 3400)
    const markTimer = setTimeout(() => sessionStorage.setItem('heroPlayed', 'true'), 4900)

    return () => {
      clearTimeout(textTimer)
      clearTimeout(markTimer)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  return (
    <section
      id="home"
      className="px-6 md:pl-[110px] md:pr-[60px]"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 3D Band card — only when bgEffects on and showApp */}
      {bgEffects && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 40,
            pointerEvents: showApp ? 'auto' : 'none',
          }}
        >
          {showApp && <App />}
        </div>
      )}

      {/* Text content */}
      <div
        className="md:max-w-[580px]"
        style={{ width: '100%', position: 'relative', zIndex: 5 }}
      >
        {/* Available badge */}
        <motion.div
          initial={false}
          animate={
            startAnim
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 24, filter: 'blur(8px)' }
          }
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 22, display: 'flex', alignItems: 'center', gap: 8 }}
        >
          {/* Pulsing dot */}
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'var(--accent)',
              display: 'inline-block',
              boxShadow: '0 0 0 0 var(--accent)',
              animation: 'pulse-dot 2s ease-in-out infinite',
            }}
          />
          <style>{`
            @keyframes pulse-dot {
              0%,100% { box-shadow: 0 0 0 0 rgba(178,132,255,0.5); }
              50% { box-shadow: 0 0 0 5px rgba(178,132,255,0); }
            }
          `}</style>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: 'var(--text-muted)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            Available for work
          </span>
        </motion.div>

        {/* Heading */}
        <div>
          <motion.h1
            initial={false}
            animate={
              startAnim
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.88, y: 44 }
            }
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: 'clamp(36px, 6.5vw, 66px)',
              fontWeight: 800,
              lineHeight: 1.04,
              color: 'var(--text-primary)',
              letterSpacing: '-0.035em',
              marginBottom: 0,
            }}
          >
            Full-Stack
          </motion.h1>

          <motion.h1
            initial={false}
            animate={
              startAnim
                ? { opacity: 1, x: 0, rotate: 0 }
                : { opacity: 0, x: -70, rotate: -3 }
            }
            transition={{ duration: 0.95, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: 'clamp(36px, 6.5vw, 66px)',
              fontWeight: 800,
              lineHeight: 1.04,
              color: 'var(--accent)',
              letterSpacing: '-0.035em',
              marginBottom: 24,
            }}
          >
            Developer
          </motion.h1>
        </div>

        {/* Typing text */}
        <motion.div
          initial={false}
          animate={startAnim ? { opacity: 1, x: 0 } : { opacity: 0, x: 36 }}
          transition={{ duration: 0.75, delay: 0.32 }}
          style={{ marginBottom: 14 }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 14,
              color: 'var(--text-secondary)',
              letterSpacing: '0.06em',
            }}
          >
            <TextType
              text={['Full-Stack Engineer', 'Open to Work', 'Building for the web']}
              typingSpeed={72}
              pauseDuration={1600}
              showCursor
              cursorCharacter="_"
              deletingSpeed={48}
              cursorBlinkDuration={0.5}
            />
          </span>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={false}
          animate={
            startAnim
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 44, scale: 0.97 }
          }
          transition={{ duration: 0.95, delay: 0.48 }}
          style={{ marginBottom: 28, maxWidth: 440 }}
        >
          <p
            style={{
              fontSize: 14,
              color: 'var(--text-secondary)',
              lineHeight: 1.85,
              letterSpacing: '0.01em',
            }}
          >
            I build full-stack web apps with a focus on clean interfaces and
            solid backend structure. I care about things working well and
            looking good at the same time.
          </p>
        </motion.div>

        {/* Skill chips */}
        <motion.div
          initial="hidden"
          animate={startAnim ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.09, delayChildren: 0.64 } },
          }}
          style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 30 }}
        >
          {skills.map((s) => (
            <motion.span
              key={s}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.85 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.45 }}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: 'var(--text-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 999,
                padding: '5px 12px',
                background: 'var(--bg-card)',
                letterSpacing: '0.04em',
              }}
            >
              {s}
            </motion.span>
          ))}
        </motion.div>

        {/* Footer hints */}
        <motion.div
          initial={false}
          animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ duration: 0.75, delay: 0.96 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 5 }}
        >
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'var(--text-muted)' }}>
            ↓ explore my work below
          </span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'var(--text-muted)' }}>
            ↗ open to full-time and freelance
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={false}
        animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
        transition={{ duration: 0.85, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          bottom: 36,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          animate={{ y: [0, 6, 0], opacity: [0.8, 0.5, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
        >
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Scroll
          </span>
          {/* SVG arrow down */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
