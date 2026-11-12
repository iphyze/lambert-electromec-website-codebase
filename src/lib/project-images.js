import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'

const PROJECT_IMAGES_DIRECTORY = path.join(process.cwd(), 'public', 'images', 'projects')
const PROJECT_IMAGE_EXTENSION = '.webp'

const isDirectImageSource = (value = '') => (
  /^(?:https?:)?\/\//i.test(value)
  || value.startsWith('/')
  || value.startsWith('data:')
  || value.startsWith('blob:')
)

const createProjectImageLookup = () => {
  if (!existsSync(PROJECT_IMAGES_DIRECTORY)) return new Map()

  return readdirSync(PROJECT_IMAGES_DIRECTORY, { withFileTypes: true })
    .filter((entry) => (
      entry.isFile()
      && !entry.name.startsWith('.')
      && path.extname(entry.name).toLowerCase() === PROJECT_IMAGE_EXTENSION
    ))
    .sort((first, second) => first.name.localeCompare(second.name))
    .reduce((lookup, entry) => {
      const parsed = path.parse(entry.name)
      const key = parsed.name.toLocaleLowerCase()

      if (!lookup.has(key)) {
        lookup.set(key, `/images/projects/${encodeURIComponent(entry.name)}`)
      }

      return lookup
    }, new Map())
}

const normalizeProjectImagePath = (value) => (
  value.replace(/^(\/images\/projects\/[^?#]+?)\.(?:png|jpe?g)(?=([?#]|$))/i, '$1.webp')
)

const resolveImageSource = (value, lookup) => {
  if (!value) return ''

  const normalizedValue = String(value).trim()
  if (!normalizedValue) return ''
  if (isDirectImageSource(normalizedValue)) return normalizeProjectImagePath(normalizedValue)

  const parsed = path.parse(normalizedValue)
  const lookupKey = (parsed.name || normalizedValue).toLocaleLowerCase()

  return lookup.get(lookupKey) || ''
}

export const hydrateProjectImages = (projects = []) => {
  const lookup = createProjectImageLookup()

  return projects.map((project) => {
    const featuredSource = project.featuredImageUrl
      || project.featuredImageSrc
      || project.featuredImageRef

    const gallerySources = Array.isArray(project.galleryImageUrls) && project.galleryImageUrls.length
      ? project.galleryImageUrls
      : (project.galleryImageRefs || [])

    return {
      ...project,
      featuredImageSrc: resolveImageSource(featuredSource, lookup),
      galleryImageSrcs: gallerySources
        .map((source) => resolveImageSource(source, lookup))
        .filter(Boolean),
    }
  })
}

export const hydrateProjectImage = (project) => {
  if (!project) return null
  return hydrateProjectImages([project])[0] || null
}
