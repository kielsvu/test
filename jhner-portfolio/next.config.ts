import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  // Set basePath if your GitHub Pages repo is NOT username.github.io
  // Example: basePath: '/portfolio'
  // Leave empty if deploying to username.github.io
  // basePath: '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig
