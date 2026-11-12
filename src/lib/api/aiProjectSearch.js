import { PUBLIC_API_BASE_URL, PublicApiError } from './client.js'
import { normalizeListProject } from './projects.js'

export const AI_PROJECT_SEARCH_ENDPOINT = PUBLIC_API_BASE_URL
  ? `${PUBLIC_API_BASE_URL}/ai/project-search`
  : ''

export const hasAiProjectSearch = Boolean(AI_PROJECT_SEARCH_ENDPOINT)

export const searchLambertProjectsWithAi = async ({ query, locale = 'en', signal } = {}) => {
  if (!AI_PROJECT_SEARCH_ENDPOINT) {
    throw new PublicApiError('AI Project Search is not configured.', {
      code: 'AI_PROJECT_SEARCH_NOT_CONFIGURED',
    })
  }

  const response = await fetch(AI_PROJECT_SEARCH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      locale: locale === 'fr' ? 'fr' : 'en',
    }),
    cache: 'no-store',
    signal,
  })

  let payload = null
  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  if (!response.ok || payload?.status === 'Failed' || payload?.success === false) {
    throw new PublicApiError(payload?.message || 'AI Project Search is temporarily unavailable.', {
      status: response.status,
      code: response.status === 429 ? 'AI_PROJECT_SEARCH_RATE_LIMITED' : 'AI_PROJECT_SEARCH_REQUEST_FAILED',
      payload,
    })
  }

  const data = payload?.data
  if (!data || !Array.isArray(data.items)) {
    throw new PublicApiError('AI Project Search returned an invalid response.', {
      status: response.status,
      code: 'AI_PROJECT_SEARCH_INVALID_RESPONSE',
      payload,
    })
  }

  return {
    query: String(data.query || query || ''),
    summary: String(data.summary || ''),
    locale: data.locale === 'fr' ? 'fr' : 'en',
    engine: data.engine === 'openai' ? 'openai' : 'local',
    resultCount: Number(data.result_count || 0),
    items: data.items.map(normalizeListProject),
  }
}
