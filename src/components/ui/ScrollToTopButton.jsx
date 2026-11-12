'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { getLocaleFromPathname } from '@/i18n/config.js'

const ArrowUpIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 19V5" />
    <path d="m6.5 10.5 5.5-5.5 5.5 5.5" />
  </svg>
)

const scrollLabels = {
  en: 'Scroll back to top',
  fr: 'Retour en haut de page',
}

const ScrollToTopButton = () => {
  const pathname = usePathname() || '/'
  const [isVisible, setIsVisible] = useState(false)
  const language = getLocaleFromPathname(pathname)
  const label = scrollLabels[language]

  useEffect(() => {
    let ticking = false

    const updateVisibility = () => {
      setIsVisible(window.scrollY > 560)
      ticking = false
    }

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(updateVisibility)
    }

    updateVisibility()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      className={`scroll-to-top${isVisible ? ' is-visible' : ''}`}
      type="button"
      aria-label={label}
      title={label}
      onClick={handleClick}
    >
      <ArrowUpIcon />
    </button>
  )
}

export default ScrollToTopButton
