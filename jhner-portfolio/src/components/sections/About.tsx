'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { usePortfolio } from '@/hooks/usePortfolio'
import {
  IconCode,
  IconAward,
  IconGlobe,
  IconFileText,
  IconArrowUpRight,
} from '@/components/icons'

const ease = [0.22, 1, 0.36, 1] as const

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { stats } = usePortfolio()
  const [hasPointer, setHasPointer] = useState(false)

  useEffect(() => {
    setHasPointer(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  const statCards = [
    {
      icon: <IconCode size={18} />,
      label: 'Projects Built',
      value: stats?.projectsCount ?? '—',
    },
    {
      icon: <IconAward size={18} />,
      label: 'Certificates',
      value: stats?.certificatesCount ?? '—',
    },
    {
      icon: <IconGlobe size={18} />,
      label: 'Technologies',
      value: stats?.techStackCount ?? '—',
    },
  ]

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: 'clamp(80px, 12vh, 140px) clamp(20px, 6vw, 110px)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Section tag */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease }}
        style={{ marginBottom: 40 }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: 'var(--accent)',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
          }}
        >
          01 / About
        </span>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(32px, 5vw, 72px)',
          alignItems: 'start',
        }}
      >
        {/* Left — bio */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease, delay: 0.08 }}
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              lineHeight: 1.12,
              marginBottom: 22,
            }}
          >
            Hi, I am{' '}
            <span style={{ color: 'var(--accent)' }}>Jhner</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.85 }}>
              I build full-stack web applications with a focus on clean interfaces and
              reliable backend structure. I care about making things that work well
              and hold up over time.
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.85 }}>
              My work covers the full spectrum from designing UI components to
              building APIs and managing databases. I enjoy the process of turning
              a rough idea into something that actually ships.
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.85 }}>
              Right now I am open to full-time roles and freelance projects. If you
              have something in mind, reach out.
            </p>
          </motion.div>

          {/* Download CV */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease, delay: 0.38 }}
            style={{ marginTop: 28 }}
          >
            <a
              href="/assets/jhner-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 20px',
                borderRadius: 999,
                border: '1px solid var(--border)',
                background: 'transparent',
                color: 'var(--text-secondary)',
                fontSize: 12,
                fontFamily: "'DM Mono', monospace",
                letterSpacing: '0.06em',
                textDecoration: 'none',
                transition: 'border-color 0.25s ease, color 0.25s ease, background 0.25s ease',
              }}
              onMouseEnter={(e) => {
                if (!hasPointer) return
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.color = 'var(--accent)'
                e.currentTarget.style.background = 'var(--accent-glow)'
              }}
              onMouseLeave={(e) => {
                if (!hasPointer) return
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text-secondary)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <IconFileText size={14} />
              Download CV
              <IconArrowUpRight size={12} />
            </a>
          </motion.div>
        </div>

        {/* Right — stat cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {statCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, x: 32 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.18 + i * 0.12 }}
              className="glass hover-lift"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                padding: '20px 22px',
                borderRadius: 16,
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                transition: 'border-color 0.25s ease, transform 0.25s ease',
              }}
              onMouseEnter={(e) => {
                if (!hasPointer) return
                e.currentTarget.style.borderColor = 'var(--border-hover)'
              }}
              onMouseLeave={(e) => {
                if (!hasPointer) return
                e.currentTarget.style.borderColor = 'var(--border)'
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: 'var(--accent-glow)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent)',
                  flexShrink: 0,
                }}
              >
                {card.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 'clamp(22px, 3vw, 28px)',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}
                >
                  {card.value}
                  <span style={{ color: 'var(--accent)', marginLeft: 2 }}>+</span>
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.08em',
                    marginTop: 4,
                  }}
                >
                  {card.label}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Tech note card */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.56 }}
            style={{
              padding: '18px 22px',
              borderRadius: 16,
              border: '1px solid var(--border)',
              background: 'var(--accent-glow)',
            }}
          >
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: 'var(--accent)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              Primary Stack
            </div>
            <div
              style={{
                display: 'flex',
                gap: 6,
                flexWrap: 'wrap',
              }}
            >
              {['TypeScript', 'Next.js', 'React', 'Node.js', 'Postgres', 'Tailwind'].map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10,
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: 999,
                    padding: '3px 9px',
                    background: 'var(--bg-card)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
