const trimTrailingSlash = (value = '') => String(value || '').replace(/\/+$/, '')

const LAMBERT_PRODUCTION_API_BASE_URL = 'https://api.lambertelectromec.com.ng/lambert-server/api'
const LAMBERT_PRODUCTION_HOSTS = new Set([
  'web.lambertelectromec.com.ng',
  'lambertelectromec.com.ng',
  'www.lambertelectromec.com.ng',
])

export const CONTACT_API_BASE_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_API_BASE_URL || '',
)

const isLoopbackApiUrl = (value = '') => {
  const raw = trimTrailingSlash(value)
  if (!raw) return false

  try {
    const hostname = new URL(raw).hostname.toLowerCase()
    return hostname === 'localhost'
      || hostname === '127.0.0.1'
      || hostname === '::1'
  } catch {
    return false
  }
}

export const resolveContactApiBaseUrl = () => {
  if (typeof window === 'undefined') return CONTACT_API_BASE_URL

  const hostname = window.location.hostname.toLowerCase()
  const isProductionWebsite = LAMBERT_PRODUCTION_HOSTS.has(hostname)

  if (isProductionWebsite && (!CONTACT_API_BASE_URL || isLoopbackApiUrl(CONTACT_API_BASE_URL))) {
    return LAMBERT_PRODUCTION_API_BASE_URL
  }

  return CONTACT_API_BASE_URL
}

const contactEndpoint = (path) => {
  const baseUrl = resolveContactApiBaseUrl()
  return baseUrl ? `${baseUrl}${path}` : ''
}

// Kept as exported values for backwards compatibility. Submission/fetch calls
// resolve the URL again at runtime so a production browser can never be sent to
// localhost by a stale build-time environment value.
export const CONTACT_SUBMISSION_ENDPOINT = CONTACT_API_BASE_URL
  ? `${CONTACT_API_BASE_URL}/contact/submit`
  : ''

export const CONTACT_SUBJECTS_ENDPOINT = CONTACT_API_BASE_URL
  ? `${CONTACT_API_BASE_URL}/contact/subjects`
  : ''

export const hasContactSubmissionEndpoint = Boolean(
  CONTACT_SUBMISSION_ENDPOINT || LAMBERT_PRODUCTION_API_BASE_URL,
)

export const fetchContactSubjects = async ({ locale = 'en', signal } = {}) => {
  const subjectsEndpoint = contactEndpoint('/contact/subjects')
  if (!subjectsEndpoint) {
    return { configured: false, items: [] }
  }

  const lang = locale === 'fr' ? 'fr' : 'en'
  const response = await fetch(`${subjectsEndpoint}?lang=${encodeURIComponent(lang)}`, {
    headers: {
      Accept: 'application/json',
    },
    signal,
  })

  let payload = null
  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  if (!response.ok || payload?.status === 'Failed') {
    const error = new Error(payload?.message || 'CONTACT_SUBJECTS_FAILED')
    error.status = response.status
    error.payload = payload
    throw error
  }

  const items = Array.isArray(payload?.data)
    ? payload.data
        .filter((item) => item && typeof item.value === 'string' && typeof item.label === 'string')
        .map((item) => ({ value: item.value, label: item.label }))
    : []

  return {
    configured: true,
    items,
  }
}

export const buildContactSubmissionBody = ({ values, locale, elapsedMs, turnstileToken }) => {
  const body = new FormData()
  const isJobVacancy = values.subject?.value === 'job-vacancy'

  body.append('subject', values.subject?.value || '')
  body.append('full_name', values.fullName.trim())
  body.append('email', values.email.trim())
  body.append('phone', values.phone.trim())
  body.append('message', values.message.trim())
  body.append('locale', locale)
  body.append('terms_accepted', values.termsAccepted ? '1' : '0')
  body.append('form_elapsed_ms', String(elapsedMs))

  if (typeof window !== 'undefined') {
    body.append('page_url', window.location.href)
  }

  if (turnstileToken) {
    body.append('turnstile_token', turnstileToken)
  }

  if (isJobVacancy) {
    const positionValue = values.position?.value || ''
    const locationValue = values.location?.value || ''

    body.append('position', positionValue)
    body.append('position_label', values.position?.label || '')
    body.append('other_position', positionValue === 'other-positions' ? values.otherPosition.trim() : '')
    body.append('location', locationValue)
    body.append('location_label', values.location?.label || '')
    body.append('other_location', locationValue === 'other' ? values.otherLocation.trim() : '')

    const cv = values.cv?.[0]
    if (cv) body.append('cv', cv)
  }

  // Honeypot is intentionally submitted so the backend can reject non-empty values too.
  body.append('website', values.website || '')

  return body
}

export const submitContactForm = async ({ values, locale, elapsedMs, turnstileToken, signal }) => {
  const submissionEndpoint = contactEndpoint('/contact/submit')
  if (!submissionEndpoint) {
    return { configured: false }
  }

  const response = await fetch(submissionEndpoint, {
    method: 'POST',
    body: buildContactSubmissionBody({ values, locale, elapsedMs, turnstileToken }),
    headers: {
      Accept: 'application/json',
    },
    signal,
  })

  let payload = null
  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  if (!response.ok || payload?.success === false) {
    const error = new Error(payload?.message || 'CONTACT_SUBMISSION_FAILED')
    error.status = response.status
    error.payload = payload
    throw error
  }

  return {
    configured: true,
    payload,
  }
}
