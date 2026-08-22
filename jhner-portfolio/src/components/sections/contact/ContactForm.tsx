'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  IconUser,
  IconMail,
  IconMessageSquare,
  IconSend,
  IconArrowUpRight,
  IconGitHub,
  IconLinkedIn,
  IconInstagram,
  IconYouTube,
} from '@/components/icons'

const ease = [0.22, 1, 0.36, 1] as const

// ── Replace these with your real links ──
const SOCIALS = [
  { icon: <IconGitHub size={17} />,   label: 'GitHub',   href: 'https://github.com/YOUR_USERNAME',        color: '#ccc' },
  { icon: <IconLinkedIn size={17} />, label: 'LinkedIn', href: 'https://linkedin.com/in/YOUR_USERNAME',   color: '#0A66C2' },
  { icon: <IconInstagram size={17} />,label: 'Instagram',href: 'https://instagram.com/YOUR_USERNAME',     color: '#E1306C' },
  { icon: <IconYouTube size={17} />,  label: 'YouTube',  href: 'https://youtube.com/@YOUR_USERNAME',      color: '#FF0000' },
]

type FormState = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [hasPointer] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) return
    setFormState('sending')

    // Connect to your preferred form handler here
    // Options: Formspree (https://formspree.io), EmailJS, Netlify Forms, etc.
    // Example with Formspree:
    //   const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //     method: 'POST', body: JSON.stringify({ name, email, message }),
    //     headers: { 'Content-Type': 'application/json' },
    //   })
    //   setFormState(res.ok ? 'sent' : 'error')

    // For now — simulate success after 1.2s
    await new Promise((r) => setTimeout(r, 1200))
    setFormState('sent')
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 'clamp(28px, 5vw, 60px)',
        alignItems: 'start',
      }}
    >
      {/* Left — socials */}
      <div>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: 10 }}
        >
          Let's build something
          <span style={{ color: 'var(--accent)' }}> together</span>
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease, delay: 0.1 }}
          style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 28 }}
        >
          Have a project in mind or just want to say hi? Send a message or reach
          out through any of the platforms below.
        </motion.p>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease, delay: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          {SOCIALS.map(({ icon, label, href, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                borderRadius: 14,
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 600,
                transition: 'border-color 0.22s ease, color 0.22s ease, background 0.22s ease',
              }}
              onMouseEnter={(e) => {
                if (!hasPointer) return
                e.currentTarget.style.borderColor = 'var(--border-hover)'
                e.currentTarget.style.color = 'var(--text-primary)'
              }}
              onMouseLeave={(e) => {
                if (!hasPointer) return
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text-secondary)'
              }}
            >
              <span style={{ color, flexShrink: 0 }}>{icon}</span>
              {label}
              <IconArrowUpRight size={12} color="var(--text-muted)" style={{ marginLeft: 'auto' }} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Right — form */}
      <motion.div
        initial={{ opacity: 0, x: 28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease, delay: 0.12 }}
        style={{
          borderRadius: 22,
          border: '1px solid var(--border)',
          background: 'var(--bg-card)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          padding: 'clamp(20px, 4vw, 32px)',
        }}
      >
        {formState === 'sent' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease }}
            style={{ textAlign: 'center', padding: '32px 0' }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'var(--accent-glow)',
                border: '1px solid var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <IconSend size={22} color="var(--accent)" />
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Message Sent</h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Thanks for reaching out. I will get back to you soon.
            </p>
            <button
              onClick={() => setFormState('idle')}
              style={{
                marginTop: 20,
                padding: '8px 20px',
                borderRadius: 999,
                border: '1px solid var(--border)',
                background: 'transparent',
                color: 'var(--text-muted)',
                fontSize: 12,
                fontFamily: "'DM Mono', monospace",
                cursor: 'pointer',
                transition: 'border-color 0.2s, color 0.2s',
              }}
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4 }}>
              Send a Message
            </div>

            <FormField
              icon={<IconUser size={14} />}
              placeholder="Your name"
              type="text"
              value={name}
              onChange={setName}
              required
            />
            <FormField
              icon={<IconMail size={14} />}
              placeholder="Your email"
              type="email"
              value={email}
              onChange={setEmail}
              required
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '11px 14px',
                background: 'var(--bg-card-solid)',
                transition: 'border-color 0.2s ease',
              }}
              onFocusCapture={(e) => { e.currentTarget.style.borderColor = 'var(--accent)' }}
              onBlurCapture={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              <span style={{ color: 'var(--text-muted)', paddingTop: 1, flexShrink: 0 }}>
                <IconMessageSquare size={14} />
              </span>
              <textarea
                placeholder="Your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  fontSize: 13,
                  color: 'var(--text-primary)',
                  fontFamily: "'Syne', sans-serif",
                  lineHeight: 1.6,
                }}
              />
            </div>

            {formState === 'error' && (
              <p style={{ fontSize: 12, color: '#FB7185', fontFamily: "'DM Mono', monospace" }}>
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={formState === 'sending'}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '12px',
                borderRadius: 12,
                border: 'none',
                background: 'var(--accent)',
                color: '#fff',
                fontSize: 13,
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                cursor: formState === 'sending' ? 'not-allowed' : 'pointer',
                opacity: formState === 'sending' ? 0.6 : 1,
                transition: 'opacity 0.2s ease, transform 0.2s ease',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={(e) => {
                if (!hasPointer || formState === 'sending') return
                e.currentTarget.style.opacity = '0.88'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                if (!hasPointer) return
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <IconSend size={14} />
              {formState === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  )
}

function FormField({
  icon,
  placeholder,
  type,
  value,
  onChange,
  required,
}: {
  icon: React.ReactNode
  placeholder: string
  type: string
  value: string
  onChange: (v: string) => void
  required?: boolean
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '11px 14px',
        background: 'var(--bg-card-solid)',
        transition: 'border-color 0.2s ease',
      }}
      onFocusCapture={(e) => { e.currentTarget.style.borderColor = 'var(--accent)' }}
      onBlurCapture={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
    >
      <span style={{ color: 'var(--text-muted)', flexShrink: 0 }}>{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          fontSize: 13,
          color: 'var(--text-primary)',
          fontFamily: "'Syne', sans-serif",
        }}
      />
    </div>
  )
}
