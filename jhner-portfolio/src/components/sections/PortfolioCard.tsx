'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { IconArrowUpRight, IconZoomIn } from '@/components/icons'
import type { Project } from '@/hooks/usePortfolio'

type Props = {
  project: Project
  index: number
  onOpen: (project: Project) => void
}

export default function PortfolioCard({ project, index, onOpen }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [imgError, setImgError] = useState(false)
  const [hasPointer] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )

  const techList: string[] =
    typeof project.tech_stack === 'string'
      ? (project.tech_stack as string).split(',').map((t: string) => t.trim()).filter(Boolean).slice(0, 3)
      : Array.isArray(project.tech_stack)
      ? (project.tech_stack as string[]).slice(0, 3)
      : []

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      onClick={() => onOpen(project)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(project) }}
      style={{
        cursor: 'pointer',
        borderRadius: 20,
        border: '1px solid var(--border)',
        background: 'var(--bg-card)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        overflow: 'hidden',
        transition: 'border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
        outline: 'none',
      }}
      onMouseEnter={(e) => {
        if (!hasPointer) return
        e.currentTarget.style.borderColor = 'var(--border-hover)'
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 16px 48px rgba(178,132,255,0.08)'
      }}
      onMouseLeave={(e) => {
        if (!hasPointer) return
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent)'
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)'
      }}
    >
      {/* Image */}
      <div
        style={{
          width: '100%',
          aspectRatio: '16/9',
          background: 'var(--bg-card-solid)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {project.image_url && !imgError ? (
          <img
            src={project.image_url}
            alt={project.title}
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--accent-glow)',
            }}
          >
            <IconZoomIn size={24} color="var(--text-muted)" />
          </div>
        )}
        {/* Overlay on hover */}
        <div
          className="card-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(5,5,5,0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.25s ease',
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              border: '1.5px solid rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
          >
            <IconArrowUpRight size={18} />
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '18px 20px 20px' }}>
        {project.category && (
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              color: 'var(--accent)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 7,
            }}
          >
            {project.category}
          </div>
        )}

        <h3
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            marginBottom: 7,
            lineHeight: 1.3,
          }}
        >
          {project.title}
        </h3>

        {project.description && (
          <p
            style={{
              fontSize: 13,
              color: 'var(--text-muted)',
              lineHeight: 1.65,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              marginBottom: 14,
            }}
          >
            {project.description}
          </p>
        )}

        {/* Tech pills */}
        {techList.length > 0 && (
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {techList.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9,
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border)',
                  borderRadius: 999,
                  padding: '3px 8px',
                  background: 'var(--bg-card-solid)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* CSS for overlay on hover */}
      <style>{`
        div[role="button"]:hover .card-overlay { opacity: 1 !important; }
      `}</style>
    </motion.div>
  )
}
