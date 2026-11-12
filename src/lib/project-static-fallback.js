import { hydrateProjectImages } from './project-images.js'

export const projectStaticFallbackEnabled = () => {
  const configured = String(process.env.NEXT_PUBLIC_PROJECTS_STATIC_FALLBACK || '')
    .trim()
    .toLowerCase()

  if (configured === 'true') return true
  if (configured === 'false') return false

  return process.env.NODE_ENV !== 'production'
}

export const buildProjectStaticFallback = (projects = []) => {
  if (!projectStaticFallbackEnabled()) return []
  return hydrateProjectImages(projects)
}
