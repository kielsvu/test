import type { Metadata } from 'next'
import './globals.css'
import RefreshRedirect from '@/components/RefreshRedirect'
import SettingsInit from '@/components/ui/SettingsInit'

export const metadata: Metadata = {
  title: 'Jhner — Full-Stack Developer',
  description:
    'Portfolio of Jhner, a full-stack developer building clean and reliable web applications.',
  keywords: ['full-stack developer', 'web developer', 'portfolio', 'Jhner', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Jhner' }],
  openGraph: {
    title: 'Jhner — Full-Stack Developer',
    description:
      'Portfolio of Jhner, a full-stack developer building clean and reliable web applications.',
    url: 'https://jhner.github.io',
    siteName: 'Jhner Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jhner — Full-Stack Developer',
    description:
      'Portfolio of Jhner, a full-stack developer building clean and reliable web applications.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark" data-accent="purple" data-animations="on" data-intensity="balanced" data-bg-effects="on" data-glass="on">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#050505" />
      </head>
      <body>
        <SettingsInit />
        <RefreshRedirect />
        {children}
      </body>
    </html>
  )
}
