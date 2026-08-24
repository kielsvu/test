'use client'

import type { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement> & { name: string }

function LetterIcon({ letter, ...props }: SVGProps<SVGSVGElement> & { letter: string }) {
  return <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="3" fill="currentColor" />
    <text x="12" y="15.8" textAnchor="middle" fontSize={letter.length > 3 ? "6.2" : "8.5"} fontWeight="800" fontFamily="Arial,sans-serif" fill="var(--tech-icon-bg,#080808)">{letter}</text>
  </svg>
}

function ReactIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" {...p}><ellipse cx="12" cy="12" rx="9.5" ry="3.6" stroke="currentColor" strokeWidth="1.2"/><ellipse cx="12" cy="12" rx="9.5" ry="3.6" transform="rotate(60 12 12)" stroke="currentColor" strokeWidth="1.2"/><ellipse cx="12" cy="12" rx="9.5" ry="3.6" transform="rotate(120 12 12)" stroke="currentColor" strokeWidth="1.2"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg> }
function NextIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" {...p}><rect x="2.5" y="2.5" width="19" height="19" rx="4" stroke="currentColor" strokeWidth="1.2"/><path d="M7.5 7.5v9M7.5 7.5l9 9V7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg> }
function TypeScriptIcon(p: SVGProps<SVGSVGElement>) { return <LetterIcon letter="TS" {...p}/> }
function JavaScriptIcon(p: SVGProps<SVGSVGElement>) { return <LetterIcon letter="JS" {...p}/> }
function HtmlIcon(p: SVGProps<SVGSVGElement>) { return <LetterIcon letter="HTML" {...p}/> }
function CssIcon(p: SVGProps<SVGSVGElement>) { return <LetterIcon letter="CSS" {...p}/> }
function TailwindIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M3 12c1.2-4.8 3.6-7.2 7.2-7.2 5.4 0 5.4 5.4 8.4 5.4 1.8 0 3-.9 3.6-2.7M3 19.2c1.2-4.8 3.6-7.2 7.2-7.2 5.4 0 5.4 5.4 8.4 5.4 1.8 0 3-.9 3.6-2.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> }
function NodeIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 2.5 21 7.25v9.5L12 21.5l-9-4.75V7.25L12 2.5Z" stroke="currentColor" strokeWidth="1.2"/><path d="M8.5 9.5v5M8.5 9.5l7 5V9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg> }
function GitIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" {...p}><circle cx="6" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.3"/><circle cx="6" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.3"/><circle cx="18" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.3"/><path d="M6 15.8V8.2M8.2 6h7.6M8.1 7.9l7.7 7.9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><circle cx="15.8" cy="15.8" r="2.2" stroke="currentColor" strokeWidth="1.3"/></svg> }
function GithubIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 3a9 9 0 0 0-2.85 17.54c.45.08.62-.2.62-.44v-1.54c-2.52.55-3.05-1.07-3.05-1.07-.41-1.05-1-1.33-1-1.33-.82-.56.06-.55.06-.55.9.07 1.38.93 1.38.93.81 1.38 2.12.98 2.64.75.08-.59.32-.98.58-1.21-2.01-.23-4.13-1-4.13-4.45 0-.98.35-1.78.93-2.41-.09-.23-.4-1.14.09-2.37 0 0 .76-.24 2.48.92a8.65 8.65 0 0 1 4.52 0c1.72-1.16 2.48-.92 2.48-.92.49 1.23.18 2.14.09 2.37.58.63.93 1.43.93 2.41 0 3.46-2.12 4.21-4.14 4.44.33.29.62.86.62 1.74v2.57c0 .24.16.52.63.43A9 9 0 0 0 12 3Z"/></svg> }
function LuaIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M19 12a7 7 0 1 1-7-7 5.5 5.5 0 0 0 7 7Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><circle cx="17.5" cy="5.5" r="1.8" stroke="currentColor" strokeWidth="1.2"/></svg> }
function CIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M18.5 8A7 7 0 1 0 18.5 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> }
function CppIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M14 8A6 6 0 1 0 14 16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M17.5 10.5h3M19 9v3M17.5 14h3M19 12.5v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> }
function CSharpIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M13.5 8.5A5.5 5.5 0 1 0 13.5 15.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M17 10h3.5M17 14h3.5M18 8.5v7M20.5 8.5v7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> }
function PhpIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" {...p}><ellipse cx="12" cy="12" rx="9.5" ry="5.5" stroke="currentColor" strokeWidth="1.2"/><path d="M6.5 14.5V9.5h2.4c1.4 0 2.2.7 2.2 1.8S10.3 13 8.9 13H6.5M13 14.5V9.5h2.4c1.4 0 2.1.7 2.1 1.8S16.8 13 15.4 13H13" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round"/></svg> }
function PythonIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M11.5 3C8.5 3 7 4.4 7 6.2v2.3h5v1H5.8C4.3 9.5 3 10.7 3 13v1.5C3 16.5 4.3 18 5.8 18H7.5v-2.2c0-1.6 1.3-2.8 3-2.8h4c1.4 0 2.5-1 2.5-2.3V6.2C17 4.4 15.5 3 13.5 3h-2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><circle cx="9.5" cy="6.5" r="0.9" fill="currentColor"/><path d="M12.5 21C15.5 21 17 19.6 17 17.8v-2.3h-5v-1h6.2c1.5 0 2.8-1.2 2.8-3.5V9.5c0-2 0-1.5 0-1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12.5 21h2c2 0 3.5-1.4 3.5-3.2v-2.3h-1.7v2.2c0 1.6-1.3 2.8-3 2.8h-4c-1.4 0-2.5 1-2.5 2.3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><circle cx="14.5" cy="17.5" r="0.9" fill="currentColor"/></svg> }
function JavaIcon(p: SVGProps<SVGSVGElement>) { return <LetterIcon letter="JAVA" {...p}/> }
function KotlinIcon(p: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M4.5 3.5h15L12 12l7.5 8.5h-15V3.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><path d="M4.5 3.5L12 12 4.5 20.5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg> }

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
