// Lambert website statistics client.
//
// Privacy: no cookies, no localStorage/sessionStorage, no personal data.
// Only the page path, language, referrer domain, UTM tags, visible time and
// scroll depth are sent, plus a few named actions with short non-personal
// labels (document reference, office code, language, outbound domain).
// Visitors whose browser sends Do Not Track / Global Privacy Control are not
// counted. Everything is wrapped in try/catch so statistics can never break
// the site.

import { PUBLIC_API_BASE_URL } from '@/lib/api/client'

const ENDPOINT = PUBLIC_API_BASE_URL ? `${PUBLIC_API_BASE_URL}/analytics/collect` : ''
const MAX_ENGAGED_MS = 30 * 60 * 1000

const state = {
  pageViewId: null,
  lastPath: null,
  lastPathAt: 0,
  visibleSince: null,
  engagedMs: 0,
  maxScrollPct: 0,
  lastFlushedMs: -1,
  lastFlushedScroll: -1,
}

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined'

export const analyticsAllowed = () => {
  if (!isBrowser() || !ENDPOINT) return false
  try {
    const nav = window.navigator || {}
    if (nav.doNotTrack === '1' || window.doNotTrack === '1' || nav.globalPrivacyControl === true) return false
    const host = window.location.hostname
    const isLocal = host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local')
    if (isLocal && process.env.NEXT_PUBLIC_ANALYTICS_DEV !== 'true') return false
    return true
  } catch {
    return false
  }
}

const randomId = () => {
  try {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID().replace(/-/g, '')
    const bytes = new Uint8Array(16)
    window.crypto.getRandomValues(bytes)
    return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
  } catch {
    return Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
  }
}

const send = (payload) => {
  try {
    const body = JSON.stringify(payload)
    if (window.navigator?.sendBeacon) {
      const blob = new Blob([body], { type: 'text/plain' })
      if (window.navigator.sendBeacon(ENDPOINT, blob)) return
    }
    window.fetch(ENDPOINT, {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'text/plain' },
      keepalive: true,
      credentials: 'omit',
      mode: 'cors',
    }).catch(() => {})
  } catch {
    // Statistics must never interrupt the visitor.
  }
}

const currentEngagedMs = () => {
  const running = state.visibleSince === null ? 0 : Date.now() - state.visibleSince
  return Math.min(MAX_ENGAGED_MS, Math.max(0, Math.round(state.engagedMs + running)))
}

export const updateScrollDepth = () => {
  try {
    const doc = document.documentElement
    const scrollable = Math.max(doc.scrollHeight, document.body?.scrollHeight || 0)
    if (!scrollable) return
    const seen = Math.min(100, Math.round(((window.scrollY + window.innerHeight) / scrollable) * 100))
    if (seen > state.maxScrollPct) state.maxScrollPct = seen
  } catch {
    // ignore
  }
}

export const pauseEngagement = () => {
  if (state.visibleSince !== null) {
    state.engagedMs += Date.now() - state.visibleSince
    state.visibleSince = null
  }
}

export const resumeEngagement = () => {
  if (state.pageViewId && state.visibleSince === null && document.visibilityState === 'visible') {
    state.visibleSince = Date.now()
  }
}

/** Send the visible time and scroll depth for the current page view. */
export const flushEngagement = () => {
  if (!state.pageViewId || !analyticsAllowed()) return
  const engagedMs = currentEngagedMs()
  if (engagedMs === state.lastFlushedMs && state.maxScrollPct === state.lastFlushedScroll) return
  state.lastFlushedMs = engagedMs
  state.lastFlushedScroll = state.maxScrollPct
  send({
    type: 'engagement',
    page_view_id: state.pageViewId,
    engaged_ms: engagedMs,
    max_scroll_pct: state.maxScrollPct,
  })
}

const readUtm = () => {
  try {
    const params = new URLSearchParams(window.location.search)
    const utm = {
      source: params.get('utm_source') || '',
      medium: params.get('utm_medium') || '',
      campaign: params.get('utm_campaign') || '',
    }
    return utm.source || utm.medium || utm.campaign ? utm : {}
  } catch {
    return {}
  }
}

/** Record a page view. The first page of a visit also sends the referrer. */
export const trackPageview = ({ path, locale, isFirst = false }) => {
  if (!analyticsAllowed() || !path) return
  // Guard against double effects (React development mode, repeated events).
  const now = Date.now()
  if (state.lastPath === path && now - state.lastPathAt < 1500) return

  flushEngagement()
  state.lastPath = path
  state.lastPathAt = now
  state.pageViewId = randomId()
  state.engagedMs = 0
  state.maxScrollPct = 0
  state.lastFlushedMs = -1
  state.lastFlushedScroll = -1
  state.visibleSince = document.visibilityState === 'visible' ? now : null
  updateScrollDepth()

  send({
    type: 'pageview',
    page_view_id: state.pageViewId,
    path,
    locale,
    referrer: isFirst ? document.referrer || '' : '',
    utm: readUtm(),
  })
}

/**
 * Record a named action. Labels must be short and non-personal; the server
 * also validates them and drops anything else.
 */
export const trackEvent = (name, label = '') => {
  if (!analyticsAllowed() || !name) return
  send({
    type: 'event',
    page_view_id: state.pageViewId,
    name,
    label: label ? String(label).slice(0, 120) : '',
  })
}

/** Office code for a Lambert phone number (never the number itself). */
export const officeCodeForPhone = (href = '') => {
  const digits = String(href).replace(/[^\d+]/g, '')
  if (digits.startsWith('+234') || digits.startsWith('234')) return 'NG'
  if (digits.startsWith('+233') || digits.startsWith('233')) return 'GH'
  if (digits.startsWith('+225') || digits.startsWith('225')) return 'CI'
  return ''
}
