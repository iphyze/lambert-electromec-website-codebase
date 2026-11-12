import { PUBLIC_API_BASE_URL, PublicApiError } from './client'

export const AI_ASSISTANT_ENDPOINT = PUBLIC_API_BASE_URL
  ? `${PUBLIC_API_BASE_URL}/ai/assistant`
  : ''

export const hasAiAssistant = Boolean(AI_ASSISTANT_ENDPOINT)

export const askLambertAssistant = async ({ message, locale = 'en', history = [], signal } = {}) => {
  if (!AI_ASSISTANT_ENDPOINT) {
    throw new PublicApiError('The Lambert assistant is not configured.', {
      code: 'AI_ASSISTANT_NOT_CONFIGURED',
    })
  }

  const response = await fetch(AI_ASSISTANT_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      locale: locale === 'fr' ? 'fr' : 'en',
      history,
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
    throw new PublicApiError(payload?.message || 'The Lambert assistant is temporarily unavailable.', {
      status: response.status,
      code: response.status === 429 ? 'AI_ASSISTANT_RATE_LIMITED' : 'AI_ASSISTANT_REQUEST_FAILED',
      payload,
    })
  }

  const data = payload?.data
  if (!data || typeof data.answer !== 'string') {
    throw new PublicApiError('The Lambert assistant returned an invalid response.', {
      status: response.status,
      code: 'AI_ASSISTANT_INVALID_RESPONSE',
      payload,
    })
  }

  return {
    answer: data.answer.trim(),
    links: Array.isArray(data.links)
      ? data.links.filter((link) => link && typeof link.title === 'string' && typeof link.url === 'string')
      : [],
    shouldContact: Boolean(data.should_contact),
    cannotConfirm: Boolean(data.cannot_confirm),
    locale: data.locale === 'fr' ? 'fr' : 'en',
  }
}
