'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { getLocaleFromPathname } from '@/i18n/config'
import {
  analyticsAllowed,
  flushEngagement,
  officeCodeForPhone,
  pauseEngagement,
  resumeEngagement,
  trackEvent,
  trackPageview,
  updateScrollDepth,
} from '@/lib/analytics'

// Cookie-free website statistics. Renders nothing.
const AnalyticsTracker = () => {
  const pathname = usePathname() || '/'
  const isFirstRef = useRef(true)

  // Page views: first load (after the page is idle) and every navigation.
  useEffect(() => {
    if (!analyticsAllowed()) return undefined

    const record = () => {
      try {
        trackPageview({
          path: window.location.pathname || pathname,
          locale: getLocaleFromPathname(pathname),
          isFirst: isFirstRef.current,
        })
        isFirstRef.current = false
      } catch {
        // never break the page
      }
    }

    if (isFirstRef.current) {
      if ('requestIdleCallback' in window) {
        const id = window.requestIdleCallback(record, { timeout: 2500 })
        return () => window.cancelIdleCallback?.(id)
      }
      const timer = window.setTimeout(record, 800)
      return () => window.clearTimeout(timer)
    }

    record()
    return undefined
  }, [pathname])

  // Engagement (visible time, scroll depth) and delegated action clicks.
  useEffect(() => {
    if (!analyticsAllowed()) return undefined

    let scrollFrame = 0
    const onScroll = () => {
      if (scrollFrame) return
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0
        updateScrollDepth()
      })
    }
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        pauseEngagement()
        flushEngagement()
      } else {
        resumeEngagement()
      }
    }
    const onPageHide = () => {
      pauseEngagement()
      flushEngagement()
    }
    const onBlur = () => pauseEngagement()
    const onFocus = () => resumeEngagement()

    const onClick = (event) => {
      try {
        const link = event.target?.closest?.('a[href], [data-analytics-event]')
        if (!link) return

        const namedEvent = link.getAttribute('data-analytics-event')
        if (namedEvent) {
          trackEvent(namedEvent, link.getAttribute('data-analytics-label') || '')
          return
        }

        const href = link.getAttribute('href') || ''
        if (href.startsWith('tel:')) {
          trackEvent('phone_click', officeCodeForPhone(href.slice(4)))
        } else if (href.startsWith('mailto:')) {
          trackEvent('email_click')
        } else if (/^https?:\/\//i.test(href)) {
          const url = new URL(href, window.location.href)
          const ownHost = window.location.hostname.replace(/^www\./, '')
          const targetHost = url.hostname.replace(/^www\./, '')
          if (targetHost && targetHost !== ownHost) {
            trackEvent('outbound_click', targetHost)
          }
        }
      } catch {
        // ignore
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', onPageHide)
    window.addEventListener('blur', onBlur)
    window.addEventListener('focus', onFocus)
    document.addEventListener('click', onClick, { capture: true })

    return () => {
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', onPageHide)
      window.removeEventListener('blur', onBlur)
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('click', onClick, { capture: true })
    }
  }, [])

  return null
}

export default AnalyticsTracker
