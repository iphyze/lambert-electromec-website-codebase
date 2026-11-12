'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { flushSync } from 'react-dom'
import PageLoader from '@/components/ui/PageLoader'

export const NAVIGATION_START_EVENT = 'lambert:navigation-start'

const MIN_VISIBLE_MS = 360
const EXIT_MS = 180
const HARD_NAVIGATION_FALLBACK_MS = 5500
const FAILSAFE_MS = 10000
const TOP_THRESHOLD_PX = 2
const MAX_SCROLL_SETTLE_FRAMES = 12

const NAVIGATION_ASSET_ERROR_PATTERN = /chunkloaderror|loading chunk|failed to fetch dynamically imported module|importing a module script failed|failed to load module script|failed to fetch rsc|failed to fetch server response/i

const getErrorMessage = (value) => {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (value instanceof Error) return `${value.name}: ${value.message}`
  return String(value?.message || value?.reason?.message || value)
}

const PageTransitionLoader = () => {
  const pathname = usePathname()
  const [phase, setPhase] = useState('idle')
  const startedAtRef = useRef(0)
  const hideTimerRef = useRef(null)
  const exitTimerRef = useRef(null)
  const failsafeTimerRef = useRef(null)
  const hardNavigationTimerRef = useRef(null)
  const settleFrameRef = useRef(null)
  const startPathRef = useRef('')
  const pendingHrefRef = useRef('')
  const exitStartedRef = useRef(false)
  const currentPathRef = useRef(pathname || '/')

  const cancelSettleFrame = useCallback(() => {
    if (settleFrameRef.current) {
      window.cancelAnimationFrame(settleFrameRef.current)
      settleFrameRef.current = null
    }
  }, [])

  const clearHardNavigationFallback = useCallback(() => {
    if (hardNavigationTimerRef.current) {
      window.clearTimeout(hardNavigationTimerRef.current)
      hardNavigationTimerRef.current = null
    }
  }, [])

  const clearTimers = useCallback(() => {
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current)
    if (exitTimerRef.current) window.clearTimeout(exitTimerRef.current)
    if (failsafeTimerRef.current) window.clearTimeout(failsafeTimerRef.current)

    hideTimerRef.current = null
    exitTimerRef.current = null
    failsafeTimerRef.current = null
    clearHardNavigationFallback()
    cancelSettleFrame()
  }, [cancelSettleFrame, clearHardNavigationFallback])

  const hardNavigateToPending = useCallback(() => {
    const pendingHref = pendingHrefRef.current
    if (!pendingHref) return

    clearHardNavigationFallback()

    if (failsafeTimerRef.current) {
      window.clearTimeout(failsafeTimerRef.current)
      failsafeTimerRef.current = null
    }

    let targetUrl
    try {
      targetUrl = new URL(pendingHref, window.location.href)
    } catch {
      return
    }

    const currentUrl = new URL(window.location.href)
    const alreadyAtTarget = targetUrl.pathname === currentUrl.pathname
      && targetUrl.search === currentUrl.search
      && targetUrl.hash === currentUrl.hash

    // A failed App Router transition can update the URL before the new React
    // tree commits. In that case a reload is safer than another push attempt.
    if (alreadyAtTarget) {
      window.location.reload()
      return
    }

    window.location.assign(targetUrl.href)
  }, [clearHardNavigationFallback])

  const completeExit = useCallback(() => {
    clearTimers()
    startPathRef.current = ''
    pendingHrefRef.current = ''
    setPhase('idle')
  }, [clearTimers])

  const beginExit = useCallback(() => {
    if (exitStartedRef.current) return
    exitStartedRef.current = true

    clearHardNavigationFallback()
    pendingHrefRef.current = ''

    if (failsafeTimerRef.current) {
      window.clearTimeout(failsafeTimerRef.current)
      failsafeTimerRef.current = null
    }

    const elapsed = Date.now() - startedAtRef.current
    const remaining = Math.max(MIN_VISIBLE_MS - elapsed, 0)

    hideTimerRef.current = window.setTimeout(() => {
      hideTimerRef.current = null
      setPhase('exiting')
      exitTimerRef.current = window.setTimeout(completeExit, EXIT_MS)
    }, remaining)
  }, [clearHardNavigationFallback, completeExit])

  const waitForNewPagePosition = useCallback(() => {
    cancelSettleFrame()

    const hash = window.location.hash
    const targetId = hash ? decodeURIComponent(hash.replace(/^#/, '')) : ''
    const target = targetId ? document.getElementById(targetId) : null

    if (target) {
      target.scrollIntoView({ behavior: 'auto', block: 'start' })
      settleFrameRef.current = window.requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'auto', block: 'start' })
        settleFrameRef.current = window.requestAnimationFrame(beginExit)
      })
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    let frameCount = 0

    const confirmAtTop = () => {
      frameCount += 1

      const scrollingElement = document.scrollingElement || document.documentElement
      const isAtTop = window.scrollY <= TOP_THRESHOLD_PX
        && (scrollingElement?.scrollTop || 0) <= TOP_THRESHOLD_PX

      if (isAtTop || frameCount >= MAX_SCROLL_SETTLE_FRAMES) {
        settleFrameRef.current = window.requestAnimationFrame(beginExit)
        return
      }

      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      settleFrameRef.current = window.requestAnimationFrame(confirmAtTop)
    }

    settleFrameRef.current = window.requestAnimationFrame(confirmAtTop)
  }, [beginExit, cancelSettleFrame])

  const startLoading = useCallback((targetHref = '') => {
    clearTimers()
    startedAtRef.current = Date.now()
    startPathRef.current = currentPathRef.current
    pendingHrefRef.current = targetHref || ''
    exitStartedRef.current = false

    // Commit the loader before Next starts fetching route/chunk data so the
    // click always produces immediate visible feedback.
    flushSync(() => {
      setPhase('loading')
    })

    if (targetHref) {
      hardNavigationTimerRef.current = window.setTimeout(() => {
        hardNavigateToPending()
      }, HARD_NAVIGATION_FALLBACK_MS)
    }

    failsafeTimerRef.current = window.setTimeout(() => {
      if (pendingHrefRef.current) {
        hardNavigateToPending()
        return
      }

      if (!window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }
      beginExit()
    }, FAILSAFE_MS)
  }, [beginExit, clearTimers, hardNavigateToPending])

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const handleDocumentClick = (event) => {
      if (
        event.defaultPrevented
        || event.button !== 0
        || event.metaKey
        || event.ctrlKey
        || event.shiftKey
        || event.altKey
      ) return

      const anchor = event.target.closest?.('a[href]')
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return

      const rawHref = anchor.getAttribute('href')
      if (!rawHref || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) return

      let nextUrl
      try {
        nextUrl = new URL(anchor.href, window.location.href)
      } catch {
        return
      }

      if (nextUrl.origin !== window.location.origin) return

      const currentUrl = new URL(window.location.href)

      // Same-route query/hash changes do not need a full-page transition.
      if (nextUrl.pathname === currentUrl.pathname) return

      startLoading(nextUrl.href)
    }

    const handleCustomStart = (event) => {
      const targetHref = event instanceof CustomEvent ? event.detail?.href : ''
      startLoading(targetHref || '')
    }

    const handlePopState = () => {
      const nextPath = window.location.pathname || '/'
      if (nextPath !== currentPathRef.current) startLoading()
    }

    const recoverNavigation = (errorLike, assetUrl = '') => {
      if (!pendingHrefRef.current) return

      const message = `${getErrorMessage(errorLike)} ${assetUrl}`
      if (NAVIGATION_ASSET_ERROR_PATTERN.test(message) || assetUrl.includes('/_next/static/')) {
        hardNavigateToPending()
      }
    }

    const handleWindowError = (event) => {
      const assetUrl = event?.target?.src || event?.target?.href || ''
      recoverNavigation(event?.error || event?.message, assetUrl)
    }

    const handleUnhandledRejection = (event) => {
      recoverNavigation(event?.reason)
    }

    document.addEventListener('click', handleDocumentClick, true)
    window.addEventListener(NAVIGATION_START_EVENT, handleCustomStart)
    window.addEventListener('popstate', handlePopState)
    window.addEventListener('error', handleWindowError, true)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      document.removeEventListener('click', handleDocumentClick, true)
      window.removeEventListener(NAVIGATION_START_EVENT, handleCustomStart)
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('error', handleWindowError, true)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      clearTimers()
    }
  }, [clearTimers, hardNavigateToPending, startLoading])

  useEffect(() => {
    const previousPath = currentPathRef.current
    currentPathRef.current = pathname || '/'

    if (phase !== 'loading' || !startPathRef.current || pathname === previousPath) return undefined

    // The App Router committed the new route successfully, so the native
    // navigation watchdog is no longer needed.
    clearHardNavigationFallback()
    pendingHrefRef.current = ''
    waitForNewPagePosition()
    return cancelSettleFrame
  }, [pathname, phase, waitForNewPagePosition, cancelSettleFrame, clearHardNavigationFallback])

  if (phase === 'idle') return null

  return <PageLoader routeTransition exiting={phase === 'exiting'} />
}

export default PageTransitionLoader
