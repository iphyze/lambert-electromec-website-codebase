import { publicApiFetch } from './client.js'

const normalizePagination = (pagination = {}) => ({
  page: Number(pagination.page || 1),
  limit: Number(pagination.limit || 12),
  total: Number(pagination.total || 0),
  totalPages: Number(pagination.total_pages || 1),
  hasPrevious: Boolean(pagination.has_previous),
  hasNext: Boolean(pagination.has_next),
})

export const normalizeListProject = (project = {}) => ({
  id: Number(project.id || 0),
  key: String(project.slug || ''),
  slug: String(project.slug || ''),
  title: String(project.title || ''),
  summary: String(project.summary || ''),
  location: String(project.location || ''),
  projectYear: project.project_year || null,
  featured: Boolean(project.featured),
  publishedAt: project.published_at || null,
  divisionKey: String(project.division?.key || ''),
  divisionSlug: String(project.division?.slug || ''),
  divisionName: String(project.division?.name || ''),
  featuredImageSrc: String(project.featured_image?.url || ''),
  imageAlt: String(project.featured_image?.alt_text || project.title || ''),
  homeImageSrc: String(project.home_image?.url || ''),
  homeImageAlt: String(project.home_image?.alt_text || project.title || ''),
  imageCount: Number(project.image_count || 0),
})

const normalizeDetailProject = (project = {}) => {
  const images = Array.isArray(project.images)
    ? project.images
      .filter((image) => image?.url)
      .map((image) => ({
        id: Number(image.id || 0),
        src: String(image.url || ''),
        alt: String(image.alt_text || project.title || ''),
        caption: String(image.caption || ''),
        isFeatured: Boolean(image.is_featured),
        displayOrder: Number(image.display_order || 0),
      }))
    : []

  const featuredImage = images.find((image) => image.isFeatured)
    || (project.featured_image?.url ? {
      id: Number(project.featured_image.id || 0),
      src: String(project.featured_image.url || ''),
      alt: String(project.featured_image.alt_text || project.title || ''),
      caption: String(project.featured_image.caption || ''),
      isFeatured: true,
      displayOrder: Number(project.featured_image.display_order || 0),
    } : null)
    || images[0]
    || null

  return {
    id: Number(project.id || 0),
    key: String(project.slug || ''),
    slug: String(project.slug || ''),
    title: String(project.title || ''),
    summary: String(project.summary || ''),
    location: String(project.location || ''),
    featured: Boolean(project.featured),
    publishedAt: project.published_at || null,
    divisionKey: String(project.division?.key || ''),
    divisionSlug: String(project.division?.slug || ''),
    divisionName: String(project.division?.name || ''),
    featuredImageSrc: featuredImage?.src || '',
    imageAlt: featuredImage?.alt || String(project.title || ''),
    galleryImages: images,
    galleryImageSrcs: images
      .filter((image) => image.id !== featuredImage?.id)
      .map((image) => image.src),
    details: {
      description: String(project.description || ''),
      workDone: String(project.work_done || ''),
      projectYear: project.project_year || null,
    },
    seo: {
      title: String(project.seo?.title || project.title || ''),
      description: String(project.seo?.description || project.summary || ''),
    },
  }
}

export const listPublicProjects = async (params = {}, options = {}) => {
  const payload = await publicApiFetch('/projects', {
    params: {
      lang: params.locale || 'en',
      page: params.page || 1,
      limit: params.limit || 48,
      division: params.division || '',
      search: params.search || '',
      featured: params.featured ? 1 : '',
    },
    signal: options.signal,
    cache: options.cache,
  })

  return {
    items: (payload?.data || []).map(normalizeListProject),
    pagination: normalizePagination(payload?.pagination),
  }
}

export const listAllPublicProjects = async ({ locale = 'en', featured = false } = {}, options = {}) => {
  const items = []
  let page = 1
  let totalPages = 1

  do {
    const result = await listPublicProjects({
      locale,
      featured,
      page,
      limit: 48,
    }, options)

    items.push(...result.items)
    totalPages = Math.max(1, result.pagination.totalPages)
    page += 1
  } while (page <= totalPages && page <= 100)

  return items
}

export const getPublicProjectBySlug = async (slug, locale = 'en', options = {}) => {
  const payload = await publicApiFetch('/projects/detail', {
    params: {
      slug,
      lang: locale,
    },
    signal: options.signal,
    cache: options.cache,
  })

  return normalizeDetailProject(payload?.data || {})
}
