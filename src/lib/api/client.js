const trimTrailingSlash = (value = '') => String(value).replace(/\/+$/, '')

export const PUBLIC_API_BASE_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_API_BASE_URL || '',
)

export const hasPublicApi = Boolean(PUBLIC_API_BASE_URL)

export class PublicApiError extends Error {
  constructor(message, { status = 0, code = 'PUBLIC_API_ERROR', payload = null } = {}) {
    super(message)
    this.name = 'PublicApiError'
    this.status = status
    this.code = code
    this.payload = payload
  }
}

const buildApiUrl = (path, params = {}) => {
  if (!PUBLIC_API_BASE_URL) {
    throw new PublicApiError('Public API is not configured.', {
      code: 'PUBLIC_API_NOT_CONFIGURED',
    })
  }

  const normalizedPath = String(path || '').startsWith('/') ? path : `/${path}`
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return
    searchParams.set(key, String(value))
  })

  const query = searchParams.toString()
  return `${PUBLIC_API_BASE_URL}${normalizedPath}${query ? `?${query}` : ''}`
}

export const publicApiFetch = async (path, { params = {}, signal, cache = 'no-store' } = {}) => {
  const response = await fetch(buildApiUrl(path, params), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    cache,
    signal,
  })

  let payload = null
  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  if (!response.ok || payload?.status === 'Failed') {
    throw new PublicApiError(payload?.message || 'Unable to load public content.', {
      status: response.status,
      code: response.status === 404 ? 'PUBLIC_API_NOT_FOUND' : 'PUBLIC_API_REQUEST_FAILED',
      payload,
    })
  }

  return payload
}
