'use client'

import { useEffect, useId, useRef } from 'react'

const SCRIPT_ID = 'cloudflare-turnstile-script'
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

const loadTurnstile = () => new Promise((resolve, reject) => {
  if (typeof window === 'undefined') return
  if (window.turnstile) {
    resolve(window.turnstile)
    return
  }

  const existing = document.getElementById(SCRIPT_ID)
  if (existing) {
    existing.addEventListener('load', () => resolve(window.turnstile), { once: true })
    existing.addEventListener('error', reject, { once: true })
    return
  }

  const script = document.createElement('script')
  script.id = SCRIPT_ID
  script.src = SCRIPT_SRC
  script.async = true
  script.defer = true
  script.addEventListener('load', () => resolve(window.turnstile), { once: true })
  script.addEventListener('error', reject, { once: true })
  document.head.appendChild(script)
})

const TurnstileWidget = ({ siteKey, onVerify, onExpire, resetNonce = 0 }) => {
  const reactId = useId()
  const containerRef = useRef(null)
  const widgetIdRef = useRef(null)

  useEffect(() => {
    if (!siteKey || !containerRef.current) return undefined

    let active = true

    loadTurnstile()
      .then((turnstile) => {
        if (!active || !turnstile || !containerRef.current) return
        if (widgetIdRef.current !== null) return

        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: 'auto',
          size: 'flexible',
          action: 'contact_form',
          callback: (token) => onVerify?.(token),
          'expired-callback': () => onExpire?.(),
          'timeout-callback': () => onExpire?.(),
          'error-callback': () => onExpire?.(),
        })
      })
      .catch(() => onExpire?.())

    return () => {
      active = false
      if (window.turnstile && widgetIdRef.current !== null) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch {
          // Ignore cleanup failures from a widget already removed by the provider.
        }
      }
      widgetIdRef.current = null
    }
  }, [siteKey, onExpire, onVerify, reactId])

  useEffect(() => {
    if (!siteKey || !window.turnstile || widgetIdRef.current === null) return
    try {
      window.turnstile.reset(widgetIdRef.current)
    } catch {
      // Widget may still be initializing; the next render will create a fresh challenge.
    }
  }, [resetNonce, siteKey])

  if (!siteKey) return null

  return <div className="contact-turnstile" ref={containerRef} data-widget-id={reactId} />
}

export default TurnstileWidget
