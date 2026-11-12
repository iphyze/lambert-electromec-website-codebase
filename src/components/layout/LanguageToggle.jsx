'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Check, ChevronDown, Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getLocaleFromPathname, switchLocalePath } from '@/i18n/config.js'
import { NAVIGATION_START_EVENT } from '@/components/navigation/PageTransitionLoader.jsx'
import { trackEvent } from '@/lib/analytics'

const languages = [
  { value: 'en', label: 'English', shortLabel: 'EN' },
  { value: 'fr', label: 'Français', shortLabel: 'FR' },
]

const LanguageToggle = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useTranslation()
  const wrapperRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const activeLanguage = getLocaleFromPathname(pathname)
  const selectedLanguage = languages.find((language) => language.value === activeLanguage) ?? languages[0]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const switchLanguage = (nextLanguage) => {
    const currentPathname = typeof window === 'undefined'
      ? pathname
      : window.location.pathname
    const nextPath = switchLocalePath(currentPathname, nextLanguage)
    const hash = typeof window === 'undefined' ? '' : window.location.hash

    setIsOpen(false)
    if (nextLanguage !== activeLanguage) trackEvent('language_switch', nextLanguage)

    if (nextPath !== currentPathname && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(NAVIGATION_START_EVENT, { detail: { href: `${nextPath}${hash}` } }))
    }

    const isRuntimeProjectDetail = /^\/(?:fr\/)?projects\/[^/]+\/?$/.test(currentPathname || '')

    if (isRuntimeProjectDetail && typeof window !== 'undefined') {
      window.location.assign(`${nextPath}${hash}`)
      return
    }

    router.push(`${nextPath}${hash}`)
  }

  return (
    <div className={`language-picker ${isOpen ? 'is-open' : ''}`} ref={wrapperRef}>
      <button
        className="language-picker-trigger"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={t('actions.switchLanguage')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="language-picker-icon" aria-hidden="true">
          <Languages size={15} />
        </span>
        <span className="language-picker-current">
          <strong>{selectedLanguage.shortLabel}</strong>
        </span>
        <ChevronDown className="language-picker-chevron" size={14} aria-hidden="true" />
      </button>

      <div className="language-picker-menu" role="listbox" aria-label={t('actions.switchLanguage')}>
        {languages.map((language) => {
          const isSelected = language.value === activeLanguage

          return (
            <button
              key={language.value}
              className={`language-picker-option ${isSelected ? 'is-selected' : ''}`}
              type="button"
              onClick={() => switchLanguage(language.value)}
              role="option"
              aria-selected={isSelected}
            >
              <span className="language-option-code">{language.shortLabel}</span>
              <span className="language-option-label">{language.label}</span>
              {isSelected ? <Check size={14} aria-hidden="true" /> : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default LanguageToggle
