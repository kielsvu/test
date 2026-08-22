'use client'

import { motion } from 'framer-motion'
import { JHLogo } from '@/components/icons'

const ease = [0.22, 1, 0.36, 1] as const

export default function WelcomeScreen() {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: '#050505',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {/* Subtle ambient glow */}
      <div
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(178,132,255,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: ease }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* JH Logo Mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: ease, delay: 0.1 }}
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            border: '1px solid rgba(178, 132, 255, 0.2)',
            background: 'rgba(178, 132, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 4,
          }}
        >
          <JHLogo size={44} />
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: ease, delay: 0.45 }}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(22px, 5vw, 32px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#F5F3FA',
          }}
        >
          Jhner
        </motion.div>

        {/* Role */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: ease, delay: 0.7 }}
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--accent, #B284FF)',
          }}
        >
          Full-Stack Developer
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: ease, delay: 1 }}
          style={{
            marginTop: 20,
            width: 80,
            height: 1,
            background: 'rgba(178, 132, 255, 0.12)',
            borderRadius: 999,
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.2, ease: 'easeInOut', delay: 1.1 }}
            style={{
              height: '100%',
              background: 'var(--accent, #B284FF)',
              borderRadius: 999,
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
