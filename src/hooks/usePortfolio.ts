import { projects, techStacks } from '@/data/portfolio'

export default function usePortfolio() {
  return {
    projects,
    techStacks,
    loading: false,
  }
}
