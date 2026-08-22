'use client'

import { useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Code2,
  Layers,
  X,
} from 'lucide-react'
import { projects } from '@/lib/portfolioData'

export default function PortfolioDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [currentImage, setCurrentImage] = useState(0)
  const [previewOpen, setPreviewOpen] = useState(false)

  const project = useMemo(
    () => projects.find((item) => item.id === id),
    [id]
  )

  if (!project) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-white/50 mb-5">Project not found.</p>
          <button
            onClick={() => router.push('/#portfolio')}
            className="px-5 py-3 rounded-full border border-white/10 bg-white/5"
          >
            Back to portfolio
          </button>
        </div>
      </main>
    )
  }

  const galleryImages = project.image_urls.length
    ? project.image_urls
    : project.image_url
      ? [project.image_url]
      : []

  const nextImage = () => {
    setCurrentImage((prev) => Math.min(prev + 1, galleryImages.length - 1))
  }

  const prevImage = () => {
    setCurrentImage((prev) => Math.max(prev - 1, 0))
  }

  return (
    <>
      <AnimatePresence>
        {previewOpen && galleryImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex items-center justify-center px-6"
          >
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center"
            >
              <X size={18} />
            </button>

            {currentImage > 0 && (
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            <motion.img
              key={currentImage}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              src={galleryImages[currentImage]}
              alt={project.title}
              className="max-w-[85vw] max-h-[80vh] rounded-3xl object-contain"
            />

            {currentImage < galleryImages.length - 1 && (
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen text-white px-6 md:px-10 lg:px-16 py-8 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#1a1a1a_0%,#0a0a0a_35%,#050505_100%)]" />
        <div className="absolute top-[-200px] left-[-120px] w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-[140px] -z-10" />
        <div className="absolute bottom-[-250px] right-[-150px] w-[550px] h-[550px] rounded-full bg-white/[0.04] blur-[160px] -z-10" />

        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-10 items-start max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-[560px]"
          >
            <button
              onClick={() => router.push('/#portfolio')}
              className="inline-flex items-center gap-2 text-[13px] text-white/50 hover:text-white mb-8"
            >
              <ArrowLeft size={14} />
              Back
            </button>

            <h1 className="text-[30px] md:text-[44px] font-bold leading-tight tracking-tight mb-4">
              {project.title}
            </h1>
            <div className="h-[2px] w-16 bg-white/30 rounded-full mb-6" />

            <p className="text-sm leading-7 text-white/60 mb-8">
              {project.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <Code2 size={18} className="mb-4" />
                <p className="text-xs text-white/40 mb-2">TECHNOLOGIES</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span key={technology} className="text-xs text-white/70 rounded-full border border-white/10 px-3 py-1.5">
                      {technology}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <Layers size={18} className="mb-4" />
                <p className="text-xs text-white/40 mb-2">KEY FEATURES</p>
                <div className="space-y-2">
                  {project.key_features.map((feature) => (
                    <p key={feature} className="text-xs text-white/65">{feature}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.live_url && (
                <a href={project.live_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-3 text-sm">
                  Live Demo <ExternalLink size={14} />
                </a>
              )}
              {project.github_url && (
                <a href={project.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm">
                  Source <Github size={14} />
                </a>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-8"
          >
            <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
              <button
                disabled={!galleryImages.length}
                onClick={() => setPreviewOpen(true)}
                className="w-full aspect-[4/3] rounded-[22px] overflow-hidden bg-white/[0.03] border border-white/10 flex items-center justify-center"
              >
                {galleryImages.length ? (
                  <img src={galleryImages[currentImage]} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm text-white/30">Project preview</span>
                )}
              </button>

              {galleryImages.length > 1 && (
                <div className="flex justify-between mt-4">
                  <button onClick={prevImage} disabled={currentImage === 0} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center disabled:opacity-30">
                    <ChevronLeft size={16} />
                  </button>
                  <button onClick={nextImage} disabled={currentImage === galleryImages.length - 1} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center disabled:opacity-30">
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </>
  )
}
