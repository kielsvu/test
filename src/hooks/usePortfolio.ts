'use client'

import { useEffect, useState } from 'react'
import { projects, techStacks } from '@/lib/portfolioData'

export default function usePortfolio() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 150)
    return () => window.clearTimeout(timer)
  }, [])

  return {
    projects,
    techStacks,
    loading,
  }
}
