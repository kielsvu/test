'use client'

import type { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement> & {
  name: string
}

function ReactIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
    </svg>
  )
}

function NextIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.5 8v8M7.5 8h2.2l6.8 8V8M16.5 8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TypeScriptIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" />
      <path d="M6.2 9.2h6.1M9.25 9.2v7.2M14 12.4c.45-.75 1.25-1.15 2.2-1.15 1.15 0 1.85.55 1.85 1.45 0 .85-.55 1.2-1.75 1.6-1.05.35-1.45.7-1.45 1.35 0 .65.55 1.1 1.45 1.1.8 0 1.45-.3 1.95-.9" stroke="var(--tech-icon-bg, #080808)" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function JavaScriptIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" />
      <path d="M7 16.2c.35.8 1.05 1.25 1.95 1.25 1.05 0 1.75-.55 1.75-1.4 0-.75-.45-1.15-1.65-1.65-1.4-.55-2.05-1.2-2.05-2.35 0-1.2.95-2.05 2.35-2.05 1.05 0 1.85.4 2.3 1.2M14 10.2h4M16 10.2v7" stroke="var(--tech-icon-bg, #080808)" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HtmlIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M5 3h14l-1.3 15.2L12 21l-5.7-2.8L5 3Z" fill="currentColor" />
      <path d="M8 7h8l-.2 2H10l.2 2h5.5l-.45 4.2L12 16.4l-3.25-1.2-.25-2h2l.1.8 1.4.5 1.45-.5.15-1H8.3L8 7Z" fill="var(--tech-icon-bg, #080808)" />
    </svg>
  )
}

function CssIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M5 3h14l-1.3 15.2L12 21l-5.7-2.8L5 3Z" fill="currentColor" />
      <path d="M8 7h8l-.2 2H10l.15 1.5h5.4l-.4 4.2L12 16.4l-3.15-1.2-.2-2h2l.1.75 1.3.5 1.4-.5.1-.95H8.35L8 7Z" fill="var(--tech-icon-bg, #080808)" />
    </svg>
  )
}

function TailwindIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4.5 13.5C5.5 9.8 7.5 8 10.5 8c4.5 0 4.2 5 7.2 5 1.05 0 1.65-.35 2.3-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 18c1-3.7 3-5.5 6-5.5 4.5 0 4.2 5 7.2 5 1.05 0 1.65-.35 2.3-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function NodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3.2 20 7.6v8.8L12 20.8 4 16.4V7.6L12 3.2Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 10.2v4.1c0 .7.35 1.05 1.05 1.05h.8c.7 0 1.05-.35 1.05-1.05v-1.15M12 9.2v5.1c0 .7.35 1.05 1.05 1.05h.8c.7 0 1.05-.35 1.05-1.05v-1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function GitIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="m10.1 4.2 9.7 9.7-5.9 5.9-9.7-9.7a2 2 0 0 1 0-2.8l3.1-3.1a2 2 0 0 1 2.8 0Z" fill="currentColor" />
      <circle cx="9" cy="9" r="1.2" fill="var(--tech-icon-bg, #080808)" />
      <circle cx="14.5" cy="14.5" r="1.2" fill="var(--tech-icon-bg, #080808)" />
      <path d="m9.8 9.8 3.4 3.4" stroke="var(--tech-icon-bg, #080808)" strokeWidth="1.1" />
    </svg>
  )
}

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 3a9 9 0 0 0-2.85 17.54c.45.08.62-.2.62-.44v-1.54c-2.52.55-3.05-1.07-3.05-1.07-.41-1.05-1-1.33-1-1.33-.82-.56.06-.55.06-.55.9.07 1.38.93 1.38.93.81 1.38 2.12.98 2.64.75.08-.59.32-.98.58-1.21-2.01-.23-4.13-1-4.13-4.45 0-.98.35-1.78.93-2.41-.09-.23-.4-1.14.09-2.37 0 0 .76-.24 2.48.92a8.65 8.65 0 0 1 4.52 0c1.72-1.16 2.48-.92 2.48-.92.49 1.23.18 2.14.09 2.37.58.63.93 1.43.93 2.41 0 3.46-2.12 4.21-4.14 4.44.33.29.62.86.62 1.74v2.57c0 .24.16.52.63.43A9 9 0 0 0 12 3Z" />
    </svg>
  )
}

export default function TechStackIcon({ name, ...props }: Props) {
  const key = name.toLowerCase()

  if (key === 'react') return <ReactIcon {...props} />
  if (key === 'nextjs' || key === 'next.js') return <NextIcon {...props} />
  if (key === 'typescript') return <TypeScriptIcon {...props} />
  if (key === 'javascript') return <JavaScriptIcon {...props} />
  if (key === 'html' || key === 'html5') return <HtmlIcon {...props} />
  if (key === 'css' || key === 'css3') return <CssIcon {...props} />
  if (key === 'tailwind' || key === 'tailwind css') return <TailwindIcon {...props} />
  if (key === 'node' || key === 'node.js') return <NodeIcon {...props} />
  if (key === 'git') return <GitIcon {...props} />
  if (key === 'github') return <GithubIcon {...props} />

  return null
}
