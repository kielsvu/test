'use client'

import type { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement> & { name: string }

function LetterIcon({ letter, ...props }: SVGProps<SVGSVGElement> & { letter: string }) {
  return <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="3" fill="currentColor" />
    <text x="12" y="15.8" textAnchor="middle" fontSize={letter.length > 3 ? "6.2" : "8.5"} fontWeight="800" fontFamily="Arial,sans-serif" fill="var(--tech-icon-bg,#080808)">{letter}</text>
  </svg>
}

function ReactIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" {...p}><ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" stroke="currentColor" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="1.8" fill="currentColor"/></svg> }
function NextIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M7.5 8v8M7.5 8h2.2l6.8 8V8M16.5 8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg> }
function TypeScriptIcon(p: SVGProps<SVGSVGElement>) { return <LetterIcon letter="TS" {...p}/> }
function JavaScriptIcon(p: SVGProps<SVGSVGElement>) { return <LetterIcon letter="JS" {...p}/> }
function HtmlIcon(p: SVGProps<SVGSVGElement>) { return <LetterIcon letter="HTML" {...p}/> }
function CssIcon(p: SVGProps<SVGSVGElement>) { return <LetterIcon letter="CSS" {...p}/> }
function TailwindIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M4.5 13.5C5.5 9.8 7.5 8 10.5 8c4.5 0 4.2 5 7.2 5 1.05 0 1.65-.35 2.3-1M4 18c1-3.7 3-5.5 6-5.5 4.5 0 4.2 5 7.2 5 1.05 0 1.65-.35 2.3-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg> }
function NodeIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3.2 20 7.6v8.8L12 20.8 4 16.4V7.6L12 3.2Z" stroke="currentColor" strokeWidth="1.5"/><path d="M9 10.2v4.1c0 .7.35 1.05 1.05 1.05h.8c.7 0 1.05-.35 1.05-1.05v-1.15M12 9.2v5.1c0 .7.35 1.05 1.05 1.05h.8c.7 0 1.05-.35 1.05-1.05v-1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> }
function GitIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" {...p}><path d="m10.1 4.2 9.7 9.7-5.9 5.9-9.7-9.7a2 2 0 0 1 0-2.8l3.1-3.1a2 2 0 0 1 2.8 0Z" fill="currentColor"/><circle cx="9" cy="9" r="1.2" fill="var(--tech-icon-bg,#080808)"/><circle cx="14.5" cy="14.5" r="1.2" fill="var(--tech-icon-bg,#080808)"/></svg> }
function GithubIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 3a9 9 0 0 0-2.85 17.54c.45.08.62-.2.62-.44v-1.54c-2.52.55-3.05-1.07-3.05-1.07-.41-1.05-1-1.33-1-1.33-.82-.56.06-.55.06-.55.9.07 1.38.93 1.38.93.81 1.38 2.12.98 2.64.75.08-.59.32-.98.58-1.21-2.01-.23-4.13-1-4.13-4.45 0-.98.35-1.78.93-2.41-.09-.23-.4-1.14.09-2.37 0 0 .76-.24 2.48.92a8.65 8.65 0 0 1 4.52 0c1.72-1.16 2.48-.92 2.48-.92.49 1.23.18 2.14.09 2.37.58.63.93 1.43.93 2.41 0 3.46-2.12 4.21-4.14 4.44.33.29.62.86.62 1.74v2.57c0 .24.16.52.63.43A9 9 0 0 0 12 3Z"/></svg> }
function LuaIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6"/><circle cx="9" cy="9" r="2.1" fill="currentColor"/><circle cx="15.5" cy="15.2" r="1.5" fill="currentColor"/></svg> }
function CIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M19 7.5a7.5 7.5 0 1 0 0 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg> }
function CppIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M18.5 7.5a7.5 7.5 0 1 0 0 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><path d="M17 9.5h4M19 7.5v4M17 14.5h4M19 12.5v4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/></svg> }
function CSharpIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M16.5 8a5 5 0 1 0 0 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><path d="M17.2 10.5h4M17.2 13.5h4M19.2 9v6" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round"/></svg> }
function PhpIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" {...p}><ellipse cx="12" cy="12" rx="9" ry="5.2" stroke="currentColor" strokeWidth="1.5"/><path d="M7.2 14.5V9.5h2.1c1.6 0 2.4.8 2.4 2s-.8 2-2.4 2H7.2M13.2 14.5V9.5h2c1.55 0 2.4.8 2.4 2s-.85 2-2.4 2h-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> }
function PythonIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3.5H9.9A3.4 3.4 0 0 0 6.5 6.9v3.2h5.7v1.5H5.9A2.9 2.9 0 0 0 3 14.5v1.2a2.9 2.9 0 0 0 2.9 2.9h1.7v-2.4a3 3 0 0 1 3-3H14a2.8 2.8 0 0 0 2.8-2.8V6.4a2.9 2.9 0 0 0-2.9-2.9H12Z" fill="currentColor"/><circle cx="9.1" cy="6.8" r=".8" fill="var(--tech-icon-bg,#080808)"/><path d="M12 20.5h2.1a3.4 3.4 0 0 0 3.4-3.4v-3.2h-5.7v-1.5h6.3a2.9 2.9 0 0 1 2.9 2.9v1.2a2.9 2.9 0 0 1-2.9 2.9h-1.7v-2.4a3 3 0 0 0-3-3H10a2.8 2.8 0 0 0-2.8 2.8v1.2a2.9 2.9 0 0 0 2.9 2.9H12Z" fill="currentColor" opacity=".72"/><circle cx="14.9" cy="17.2" r=".8" fill="var(--tech-icon-bg,#080808)"/></svg> }
function JavaIcon(p: SVGProps<SVGSVGElement>) { return <LetterIcon letter="JAVA" {...p}/> }
function KotlinIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M5 4h14L9.5 12 19 20H5l7.2-8L5 4Z" fill="currentColor"/></svg> }

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
  if (key === 'tsx') return <LetterIcon letter="TSX" {...props} />
  if (key === 'jsx') return <LetterIcon letter="JSX" {...props} />
  if (key === 'sql') return <LetterIcon letter="SQL" {...props} />
  if (key === 'lua') return <LuaIcon {...props} />
  if (key === 'c') return <CIcon {...props} />
  if (key === 'c++' || key === 'cpp') return <CppIcon {...props} />
  if (key === 'c#' || key === 'csharp') return <CSharpIcon {...props} />
  if (key === 'php') return <PhpIcon {...props} />
  if (key === 'python') return <PythonIcon {...props} />
  if (key === 'java') return <JavaIcon {...props} />
  if (key === 'kotlin') return <KotlinIcon {...props} />
  return null
}
