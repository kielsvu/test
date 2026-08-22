'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ContactForm from './ContactForm'
import CommentsSection from './CommentsSection'

const ease = [0.22, 1, 0.36, 1] as const
const year = new Date().getFullYear()

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: 'clamp(80px, 12vh, 140px) clamp(20px, 6vw, 110px)',
        paddingBottom: 'clamp(48px, 8vh, 80px)',
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
          03 / Contact
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease, delay: 0.08 }}
        style={{ marginBottom: 52 }}
      >
        <ContactForm />
      </motion.div>

      {/* Comments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease, delay: 0.2 }}
        style={{ marginBottom: 52 }}
      >
        <CommentsSection />
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease, delay: 0.32 }}
        style={{
          borderTop: '1px solid var(--border)',
          paddingTop: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            color: 'var(--text-muted)',
            letterSpacing: '0.06em',
          }}
        >
          © {year} Jhner. All rights reserved.
        </div>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
          }}
        >
          Built with Next.js
        </div>
      </motion.div>
    </section>
  )
}
