import { publicApiFetch } from './client.js'

const normalizePagination = (pagination = {}) => ({
  page: Number(pagination.page || 1),
  limit: Number(pagination.limit || 12),
  total: Number(pagination.total || 0),
  totalPages: Number(pagination.total_pages || 1),
  hasPrevious: Boolean(pagination.has_previous),
  hasNext: Boolean(pagination.has_next),
})

const formatPublishedDate = (value, locale = 'en') => {
  if (!value) return ''

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)

  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

const normalizeResource = (resource = {}, locale = 'en') => {
  const extension = String(resource.file?.extension || '').trim().toUpperCase()

  return {
    id: Number(resource.id || 0),
    slug: String(resource.slug || ''),
    reference: String(resource.reference || ''),
    title: String(resource.title || ''),
    description: String(resource.description || ''),
    featured: Boolean(resource.featured),
    publishedAt: resource.published_at || null,
    date: formatPublishedDate(resource.published_at, locale),
    category: String(resource.category?.slug || ''),
    categoryLabel: String(resource.category?.name || ''),
    categoryId: Number(resource.category?.id || 0),
    href: String(resource.file?.url || ''),
    fileName: String(resource.file?.name || ''),
    mimeType: String(resource.file?.mime_type || ''),
    type: extension || 'FILE',
    sizeBytes: Number(resource.file?.size_bytes || 0),
    coverImage: resource.cover_image?.url ? {
      url: String(resource.cover_image.url || ''),
      name: String(resource.cover_image.name || ''),
      mimeType: String(resource.cover_image.mime_type || ''),
      sizeBytes: Number(resource.cover_image.size_bytes || 0),
      width: Number(resource.cover_image.width || 0),
      height: Number(resource.cover_image.height || 0),
    } : null,
  }
}

export const listPublicMediaResources = async (params = {}, options = {}) => {
  const locale = params.locale || 'en'
  const payload = await publicApiFetch('/media-center', {
    params: {
      lang: locale,
      page: params.page || 1,
      limit: params.limit || 50,
      category: params.category || '',
      search: params.search || '',
      featured: params.featured ? 1 : '',
    },
    signal: options.signal,
  })

  return {
    items: (payload?.data || []).map((resource) => normalizeResource(resource, locale)),
    pagination: normalizePagination(payload?.pagination),
  }
}

export const listAllPublicMediaResources = async ({ locale = 'en', featured = false } = {}, options = {}) => {
  const items = []
  let page = 1
  let totalPages = 1

  do {
    const result = await listPublicMediaResources({
      locale,
      featured,
      page,
      limit: 50,
    }, options)

    items.push(...result.items)
    totalPages = Math.max(1, result.pagination.totalPages)
    page += 1
  } while (page <= totalPages && page <= 100)

  return items
}

export const listPublicMediaCategories = async (locale = 'en', options = {}) => {
  const payload = await publicApiFetch('/media-center/categories', {
    params: { lang: locale },
    signal: options.signal,
  })

  return (payload?.data || []).map((category) => ({
    id: Number(category.id || 0),
    key: String(category.slug || ''),
    slug: String(category.slug || ''),
    label: String(category.name || ''),
    displayOrder: Number(category.display_order || 0),
  }))
}
