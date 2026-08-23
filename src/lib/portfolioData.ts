export type LocalProject = {
  id: string
  title: string
  description: string
  image_url?: string
  image_urls?: string[]
  live_url?: string
  github_url?: string
  technologies?: string
  key_features?: string
}

export type LocalCertificate = {
  id: string
  title: string
  image_url: string
}

export type LocalTechStack = {
  id: string
  name: string
  logo_key: string
}

export const projects: LocalProject[] = []

export const certificates: LocalCertificate[] = []

export const techStacks: LocalTechStack[] = [
  { id: 'react', name: 'React', logo_key: 'react' },
  { id: 'nextjs', name: 'Next.js', logo_key: 'nextjs' },
  { id: 'typescript', name: 'TypeScript', logo_key: 'typescript' },
  { id: 'javascript', name: 'JavaScript', logo_key: 'javascript' },
  { id: 'html', name: 'HTML5', logo_key: 'html' },
  { id: 'css', name: 'CSS3', logo_key: 'css' },
  { id: 'tailwind', name: 'Tailwind CSS', logo_key: 'tailwind' },
  { id: 'node', name: 'Node.js', logo_key: 'node' },
  { id: 'git', name: 'Git', logo_key: 'git' },
  { id: 'github', name: 'GitHub', logo_key: 'github' },
]
