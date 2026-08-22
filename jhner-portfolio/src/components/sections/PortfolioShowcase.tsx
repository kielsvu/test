'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { usePortfolio } from '@/hooks/usePortfolio'
import PortfolioCard from './PortfolioCard'
import ProjectModal from './ProjectModal'
import {
  IconCode,
  IconAward,
  IconLayers,
  IconGlobe,
  IconArrowUpRight,
} from '@/components/icons'
import type { Project } from '@/hooks/usePortfolio'

type Tab = 'projects' | 'certificates' | 'techstack'

const ease = [0.22, 1, 0.36, 1] as const

export default function PortfolioShowcase() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { projects, certificates, techStack, isLoading } = usePortfolio()
  const [activeTab, setActiveTab] = useState<Tab>('projects')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const tabs: { key: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    { key: 'projects',     label: 'Projects',      icon: <IconCode size={14} />,   count: projects?.length ?? 0 },
    { key: 'certificates', label: 'Certificates',  icon: <IconAward size={14} />,  count: certificates?.length ?? 0 },
    { key: 'techstack',    label: 'Tech Stack',    icon: <IconLayers size={14} />, count: techStack?.length ?? 0 },
  ]

  return (
    <section
      id="portfolio"
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
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'var(--accent)', letterSpacing: '0.24em', textTransform: 'uppercase' }}>
          02 / Portfolio
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease, delay: 0.08 }}
        style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: 32 }}
      >
        Selected <span style={{ color: 'var(--accent)' }}>Work</span>
      </motion.h2>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease, delay: 0.18 }}
        style={{ display: 'flex', gap: 6, marginBottom: 36, flexWrap: 'wrap' }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: '8px 16px',
              borderRadius: 999,
              border: `1px solid ${activeTab === tab.key ? 'var(--accent)' : 'var(--border)'}`,
              background: activeTab === tab.key ? 'var(--accent-glow)' : 'transparent',
              color: activeTab === tab.key ? 'var(--accent)' : 'var(--text-muted)',
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.06em',
              cursor: 'pointer',
              transition: 'all 0.22s ease',
            }}
          >
            {tab.icon}
            {tab.label}
            {tab.count > 0 && (
              <span
                style={{
                  fontSize: 9,
                  background: activeTab === tab.key ? 'var(--accent)' : 'var(--border)',
                  color: activeTab === tab.key ? '#fff' : 'var(--text-muted)',
                  borderRadius: 999,
                  padding: '1px 6px',
                  transition: 'all 0.22s ease',
                }}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  borderRadius: 20,
                  border: '1px solid var(--border)',
                  background: 'var(--bg-card)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ aspectRatio: '16/9', background: 'var(--bg-card-solid)', animation: 'pulse 1.5s ease-in-out infinite' }} />
                <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ height: 14, width: '60%', borderRadius: 6, background: 'var(--bg-card-solid)', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  <div style={{ height: 10, width: '85%', borderRadius: 6, background: 'var(--bg-card-solid)', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  <div style={{ height: 10, width: '72%', borderRadius: 6, background: 'var(--bg-card-solid)', animation: 'pulse 1.5s ease-in-out infinite' }} />
                </div>
              </div>
            ))}
            <style>{`@keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }`}</style>
          </motion.div>
        ) : activeTab === 'projects' ? (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.38, ease }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}
          >
            {(projects ?? []).map((project, i) => (
              <PortfolioCard
                key={project.id}
                project={project}
                index={i}
                onOpen={setSelectedProject}
              />
            ))}
            {(projects ?? []).length === 0 && <EmptyState label="No projects yet" />}
          </motion.div>
        ) : activeTab === 'certificates' ? (
          <motion.div
            key="certificates"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.38, ease }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}
          >
            {(certificates ?? []).map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} />
            ))}
            {(certificates ?? []).length === 0 && <EmptyState label="No certificates yet" />}
          </motion.div>
        ) : (
          <motion.div
            key="techstack"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.38, ease }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}
          >
            {(techStack ?? []).map((tech, i) => (
              <TechCard key={tech.id} tech={tech} index={i} />
            ))}
            {(techStack ?? []).length === 0 && <EmptyState label="No tech stack entries yet" />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}

function CertCard({ cert, index }: { cert: Record<string, unknown>; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hasPointer] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
      style={{
        borderRadius: 18,
        border: '1px solid var(--border)',
        background: 'var(--bg-card)',
        padding: '20px',
        transition: 'border-color 0.25s ease, transform 0.25s ease',
      }}
      onMouseEnter={(e) => {
        if (!hasPointer) return
        e.currentTarget.style.borderColor = 'var(--border-hover)'
        e.currentTarget.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={(e) => {
        if (!hasPointer) return
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: 'var(--accent-glow)',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent)',
          marginBottom: 14,
        }}
      >
        <IconAward size={16} />
      </div>

      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>
        {(cert.issuer as string) || 'Certificate'}
      </div>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.015em', lineHeight: 1.35, marginBottom: 8 }}>
        {cert.title as string}
      </h3>
      {cert.date && (
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'var(--text-muted)' }}>
          {cert.date as string}
        </div>
      )}
      {cert.credential_url && (
        <a
          href={cert.credential_url as string}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 12, fontSize: 11, fontFamily: "'DM Mono', monospace", color: 'var(--accent)', textDecoration: 'none', letterSpacing: '0.04em' }}
        >
          View credential <IconArrowUpRight size={11} />
        </a>
      )}
    </motion.div>
  )
}

function TechCard({ tech, index }: { tech: Record<string, unknown>; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hasPointer] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
      style={{
        borderRadius: 14,
        border: '1px solid var(--border)',
        background: 'var(--bg-card)',
        padding: '16px 14px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        textAlign: 'center',
        transition: 'border-color 0.25s ease, transform 0.25s ease',
      }}
      onMouseEnter={(e) => {
        if (!hasPointer) return
        e.currentTarget.style.borderColor = 'var(--border-hover)'
        e.currentTarget.style.transform = 'scale(1.04)'
      }}
      onMouseLeave={(e) => {
        if (!hasPointer) return
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      {tech.icon_url ? (
        <img src={tech.icon_url as string} alt={tech.name as string} style={{ width: 28, height: 28, objectFit: 'contain' }} />
      ) : (
        <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
          <IconGlobe size={20} />
        </div>
      )}
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '-0.01em' }}>
        {tech.name as string}
      </div>
      {tech.category && (
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
          {tech.category as string}
        </div>
      )}
    </motion.div>
  )
}

function EmptyState({ label }: { label: string }) {
  return (
    <div
      style={{
        gridColumn: '1/-1',
        textAlign: 'center',
        padding: '48px 24px',
        fontFamily: "'DM Mono', monospace",
        fontSize: 12,
        color: 'var(--text-muted)',
        letterSpacing: '0.08em',
      }}
    >
      {label}
    </div>
  )
}
