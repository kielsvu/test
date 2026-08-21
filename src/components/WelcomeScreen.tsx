'use client'

import { motion } from 'framer-motion'

export default function WelcomeScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex h-screen w-full items-center justify-center overflow-hidden bg-[#050507] px-5">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex w-full max-w-sm flex-col items-center text-center"
      >
        <div className="jhner-mark mb-5" aria-label="JH">JH</div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.6 }} className="text-lg font-semibold tracking-tight text-white">Jhner</motion.p>
        <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">Full-Stack Developer</motion.p>
        <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 0.5, duration: 0.7 }} className="mt-7 h-px w-28 origin-center bg-[var(--accent)]" />
      </motion.div>
    </div>
  )
}
