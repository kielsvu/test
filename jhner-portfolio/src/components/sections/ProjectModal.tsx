'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  IconX,
  IconExternalLink,
  IconGitHub,
  IconLayers,
  IconBox,
  IconSparkles,
  IconArrowUpRight,
} from '@/components/icons'
import type { Project } from '@/hooks/usePortfolio'

type Props = {
  project: Project | null
  onClose: () => void
}

const ease = [0.22, 1, 0.36, 1] as const

export default function ProjectModal({ project, onClose }: Props) {
  const [hasPointer, setHasPointer] = useState(false)

  useEffect(() => {
    setHasPointer(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  // Lock body scroll + close on Escape
  useEffect(() => {
    if (!project) return
    document.body.style.overflow = 'hidden'
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handler)
    }
  }, [project, onClose])

  const techList: string[] =
    typeof project?.tech_stack === 'string'
      ? (project.tech_stack as string).split(',').map((t: string) => t.trim()).filter(Boolean)
      : Array.isArray(project?.tech_stack)
      ? (project.tech_stack as string[])
      : []

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 300,
              background: 'rgba(0,0,0,0.72)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.93, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 30 }}
            transition={{ duration: 0.38, ease }}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            className="custom-scroll"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 301,
              width: 'min(720px, 94vw)',
              maxHeight: '88vh',
              overflowY: 'auto',
              borderRadius: 24,
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              padding: 'clamp(22px, 4vw, 36px)',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 24,
                gap: 12,
              }}
            >
              <div style={{ flex: 1 }}>
                {project.category && (
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10,
                      color: 'var(--accent)',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      marginBottom: 7,
                    }}
                  >
                    {project.category}
                  </div>
                )}
                <h2
                  style={{
                    fontSize: 'clamp(20px, 3.5vw, 28px)',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.18,
                  }}
                >
                  {project.title}
                </h2>
              </div>

              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '1px solid var(--border)',
                  background: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  flexShrink: 0,
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!hasPointer) return
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.color = 'var(--accent)'
                }}
                onMouseLeave={(e) => {
                  if (!hasPointer) return
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.color = 'var(--text-muted)'
                }}
              >
                <IconX size={14} />
              </button>
            </div>

            {/* Cover image */}
            {project.image_url && (
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  marginBottom: 24,
                  background: 'var(--bg-card-solid)',
                }}
              >
                <img
                  src={project.image_url}
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}

            {/* Description */}
            {project.description && (
              <InfoBlock icon={<IconSparkles size={15} />} title="Overview">
                <p
                  style={{
                    fontSize: 14,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.8,
                  }}
                >
                  {project.description}
                </p>
              </InfoBlock>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <InfoBlock icon={<IconLayers size={15} />} title="Key Features">
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {(project.features as string[]).map((f, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        fontSize: 14,
                        color: 'var(--text-secondary)',
                        lineHeight: 1.7,
                        listStyle: 'none',
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          background: 'var(--accent)',
                          marginTop: 8,
                          flexShrink: 0,
                        }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </InfoBlock>
            )}

            {/* Tech stack */}
            {techList.length > 0 && (
              <InfoBlock icon={<IconBox size={15} />} title="Technologies">
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                  {techList.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 10,
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border)',
                        borderRadius: 999,
                        padding: '4px 11px',
                        background: 'var(--bg-card)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </InfoBlock>
            )}

            {/* Action links */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
              {project.live_url && (
                <LinkBtn
                  href={project.live_url}
                  icon={<IconExternalLink size={13} />}
                  label="Live Demo"
                  hasPointer={hasPointer}
                  primary
                />
              )}
              {project.github_url && (
                <LinkBtn
                  href={project.github_url}
                  icon={<IconGitHub size={13} />}
                  label="Source Code"
                  hasPointer={hasPointer}
                />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function InfoBlock({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          marginBottom: 10,
          color: 'var(--accent)',
        }}
      >
        {icon}
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}
        >
          {title}
        </span>
      </div>
      {children}
    </div>
  )
}

function LinkBtn({
  href,
  icon,
  label,
  hasPointer,
  primary = false,
}: {
  href: string
  icon: React.ReactNode
  label: string
  hasPointer: boolean
  primary?: boolean
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        padding: '10px 18px',
        borderRadius: 999,
        border: primary ? 'none' : '1px solid var(--border)',
        background: primary ? 'var(--accent)' : 'transparent',
        color: primary ? '#fff' : 'var(--text-secondary)',
        fontSize: 12,
        fontFamily: "'DM Mono', monospace",
        letterSpacing: '0.05em',
        textDecoration: 'none',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
      }}
      onMouseEnter={(e) => {
        if (!hasPointer) return
        e.currentTarget.style.opacity = '0.85'
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={(e) => {
        if (!hasPointer) return
        e.currentTarget.style.opacity = '1'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {icon}
      {label}
      {!primary && <IconArrowUpRight size={11} />}
    </a>
  )
}
