export type Project = {
  id: string
  title: string
  description: string
  image_url?: string
  live_url?: string
  github_url?: string
  technologies: string[]
  key_features: string[]
  image_urls: string[]
}

export const projects: Project[] = [
  {
    id: 'jhner-portfolio',
    title: 'Jhner.dev',
    description: 'A personal portfolio focused on clean interfaces, responsive layouts, and polished frontend interactions.',
    image_url: '/assets/bandd.png',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    key_features: ['Responsive interface', 'Animated sections', 'Modern portfolio layout'],
    image_urls: ['/assets/bandd.png'],
  },
  {
    id: 'frontend-experiments',
    title: 'Frontend Experiments',
    description: 'A collection of frontend experiments built to explore interaction design, motion, reusable components, and responsive UI.',
    image_url: '/assets/PP.png',
    technologies: ['React', 'TypeScript', 'CSS', 'Framer Motion'],
    key_features: ['Reusable components', 'Motion design', 'Mobile-friendly layouts'],
    image_urls: ['/assets/PP.png'],
  },
  {
    id: 'web-projects',
    title: 'Web Projects',
    description: 'Selected web development work demonstrating practical programming, interface design, and attention to detail.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    key_features: ['Clean structure', 'Responsive design', 'Accessible interactions'],
    image_urls: [],
  },
]

export const techStacks = [
  { id: 'typescript', name: 'TypeScript' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'react', name: 'React' },
  { id: 'nextjs', name: 'Next.js' },
  { id: 'tailwind', name: 'Tailwind CSS' },
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },
  { id: 'git', name: 'Git' },
]
