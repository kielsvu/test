import PortfolioDetailClient from './PortfolioDetailClient'

export function generateStaticParams() {
  const ids = (process.env.PORTFOLIO_IDS || '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)

  return ids.map((id) => ({ id }))
}

export default function Page() {
  return <PortfolioDetailClient />
}
