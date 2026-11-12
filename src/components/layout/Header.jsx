'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ChevronDown,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  Sun,
  X,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { navigation } from '@/config/navigation.config.js'
import { divisionSectionTargets } from '@/config/divisions.config.js'
import { siteConfig } from '@/config/site.config.js'
import { useTheme } from '@/contexts/ThemeContext.jsx'
import { getLocaleFromPathname, stripLocaleFromPathname, withLocalePath } from '@/i18n/config.js'
import { useScrollLock } from '@/hooks/useScrollLock.js'
import { useFocusTrap } from '@/hooks/useFocusTrap.js'
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XSocialIcon,
} from '@/components/icons/SocialIcons.jsx'
import LanguageToggle from './LanguageToggle.jsx'

const sectionSubmenuTargets = {
  '/about/profile': '/about#profile',
  '/about/history': '/about#history',
  '/about/mission-vision': '/about#mission-vision',
  '/corporate/solution-provider': '/corporate#solutions-provider',
  '/corporate/solutions-provider': '/corporate#solutions-provider',
  '/corporate/hse': '/corporate#hse',
  '/corporate/qms': '/corporate#iso-qms',
  '/corporate/qms-iso': '/corporate#iso-qms',
  '/corporate/iso-qms': '/corporate#iso-qms',
  '/corporate/csr': '/corporate#csr',
  '/divisions': '/divisions',
  '/division': '/divisions',
  ...divisionSectionTargets,
}

const resolveNavigationHref = (href = '') => {
  const normalizedHref = href.length > 1 ? href.replace(/\/+$/, '') : href
  return sectionSubmenuTargets[normalizedHref] || href
}

const getNavigationHash = (href = '') => (
  href.includes('#') ? href.slice(href.indexOf('#')) : ''
)

const socialLinks = [
  { key: 'linkedin', label: 'LinkedIn', icon: LinkedinIcon },
  { key: 'instagram', label: 'Instagram', icon: InstagramIcon },
  { key: 'facebook', label: 'Facebook', icon: FacebookIcon },
  { key: 'x', label: 'X', icon: XSocialIcon },
]

const Header = () => {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname() || '/'
  const locale = getLocaleFromPathname(pathname)
  const basePathname = stripLocaleFromPathname(pathname)
  const isFacilityPage = basePathname === '/facility-management' || basePathname.startsWith('/facility-management/')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openMobileSubmenus, setOpenMobileSubmenus] = useState({})
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSubmenuLockedClosed, setIsSubmenuLockedClosed] = useState(false)
  const [currentHash, setCurrentHash] = useState('')
  const mobileMenuButtonRef = useRef(null)
  const mobileMenuCardRef = useRef(null)
  const mobileMenuCloseRef = useRef(null)

  useScrollLock(isMenuOpen)
  useFocusTrap({
    active: isMenuOpen,
    containerRef: mobileMenuCardRef,
    initialFocusRef: mobileMenuCloseRef,
    restoreFocusRef: mobileMenuButtonRef,
  })

  const localizeHref = useCallback((href) => (
    withLocalePath(resolveNavigationHref(href), locale)
  ), [locale])

  const closeNavigationMenus = useCallback(() => {
    setIsMenuOpen(false)
    setOpenMobileSubmenus({})
    setIsSubmenuLockedClosed(true)
  }, [])

  useEffect(() => {
    const updateHeaderState = () => {
      setIsScrolled(window.scrollY > 12)
    }

    updateHeaderState()
    window.addEventListener('scroll', updateHeaderState, { passive: true })

    return () => window.removeEventListener('scroll', updateHeaderState)
  }, [])

  useEffect(() => {
    closeNavigationMenus()
  }, [closeNavigationMenus, pathname])

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash)

    updateHash()
    window.addEventListener('hashchange', updateHash)
    return () => window.removeEventListener('hashchange', updateHash)
  }, [pathname])

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1281px)')

    const closeMobileNavigation = () => {
      if (desktopQuery.matches) {
        setIsMenuOpen(false)
        setOpenMobileSubmenus({})
      }
    }

    closeMobileNavigation()

    if (typeof desktopQuery.addEventListener === 'function') {
      desktopQuery.addEventListener('change', closeMobileNavigation)
      return () => desktopQuery.removeEventListener('change', closeMobileNavigation)
    }

    desktopQuery.addListener(closeMobileNavigation)
    return () => desktopQuery.removeListener(closeMobileNavigation)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return undefined

    const closeWithEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        setOpenMobileSubmenus({})
      }
    }

    window.addEventListener('keydown', closeWithEscape)
    return () => window.removeEventListener('keydown', closeWithEscape)
  }, [isMenuOpen])

  const isParentActive = (href) => {
    const resolvedPath = resolveNavigationHref(href).split('#')[0] || href
    if (resolvedPath === '/') return basePathname === '/'
    return basePathname === resolvedPath || basePathname.startsWith(`${resolvedPath}/`)
  }

  const toggleMobileSubmenu = (href) => {
    setOpenMobileSubmenus((current) => (current[href] ? {} : { [href]: true }))
  }

  const renderDesktopNavigationItem = (item) => {
    const hasChildren = Array.isArray(item.children) && item.children.length > 0
    const parentActive = isParentActive(item.href)
    const isCta = item.variant === 'cta'

    if (!hasChildren) {
      return (
        <Link
          key={item.href}
          href={localizeHref(item.href)}
          className={`nav-link ${isCta ? 'nav-contact-cta' : ''} ${parentActive ? 'active' : ''}`}
          aria-current={parentActive ? 'page' : undefined}
          onClick={closeNavigationMenus}
        >
          {isCta ? (
            <span className="nav-contact-icon" aria-hidden="true">
              <MessageCircle size={15} />
            </span>
          ) : null}
          <span>{t(item.labelKey)}</span>
        </Link>
      )
    }

    return (
      <div
        key={item.href}
        className={`nav-menu-item ${parentActive ? 'is-active' : ''}`}
        onPointerEnter={() => setIsSubmenuLockedClosed(false)}
        onFocusCapture={() => setIsSubmenuLockedClosed(false)}
      >
        <Link href={localizeHref(item.href)} className="nav-link nav-link-parent" onClick={closeNavigationMenus}>
          <span>{t(item.labelKey)}</span>
          <ChevronDown size={14} aria-hidden="true" />
        </Link>

        <div className="submenu" aria-label={`${t(item.labelKey)} submenu`}>
          {item.children.map((child) => {
            const resolvedHref = resolveNavigationHref(child.href)
            const targetHash = getNavigationHash(resolvedHref)
            const targetPath = resolvedHref.split('#')[0] || basePathname
            const isHashActive = targetHash && basePathname === targetPath && currentHash === targetHash
            const isRouteActive = !targetHash && basePathname === targetPath

            return (
              <Link
                key={child.href}
                href={withLocalePath(resolvedHref, locale)}
                className={`submenu-link ${isHashActive || isRouteActive ? 'active' : ''}`}
                onClick={closeNavigationMenus}
              >
                {t(child.labelKey)}
              </Link>
            )
          })}
        </div>
      </div>
    )
  }

  const renderMobileNavigationItem = (item) => {
    const hasChildren = Array.isArray(item.children) && item.children.length > 0
    const parentActive = isParentActive(item.href)
    const isCta = item.variant === 'cta'
    const isExpanded = Boolean(openMobileSubmenus[item.href])
    const submenuId = `mobile-submenu-${item.href.replace(/[^a-z0-9]/gi, '-')}`

    if (!hasChildren) {
      return (
        <Link
          key={item.href}
          href={localizeHref(item.href)}
          className={`mobile-nav-link mobile-nav-single ${isCta ? 'mobile-nav-contact-cta' : ''}`}
          onClick={closeNavigationMenus}
        >
          {isCta ? (
            <span className="nav-contact-icon" aria-hidden="true">
              <MessageCircle size={16} />
            </span>
          ) : null}
          <span>{t(item.labelKey)}</span>
        </Link>
      )
    }

    return (
      <div
        key={item.href}
        className={`mobile-nav-group ${parentActive ? 'is-active' : ''} ${isExpanded ? 'is-expanded' : ''}`}
      >
        <button
          type="button"
          className="mobile-nav-link mobile-nav-parent"
          onClick={() => toggleMobileSubmenu(item.href)}
          aria-expanded={isExpanded}
          aria-controls={submenuId}
        >
          <span>{t(item.labelKey)}</span>
          <ChevronDown size={17} aria-hidden="true" />
        </button>

        <div
          id={submenuId}
          className="mobile-submenu"
          aria-label={`${t(item.labelKey)} submenu`}
        >
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={withLocalePath(resolveNavigationHref(child.href), locale)}
              className="mobile-submenu-link"
              onClick={closeNavigationMenus}
            >
              {t(child.labelKey)}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  const isHomePage = basePathname === '/'
  const brandHref = isFacilityPage ? '/facility-management' : '/'
  const brandLogo = isFacilityPage ? '/images/logo/lem-maintenance-logo.png' : '/images/brand/lambert-logo.png'
  const brandLabel = isFacilityPage ? 'LEM Maintenance' : 'Lambert Electromec'
  const headerClassName = [
    'site-header',
    isHomePage ? 'site-header-home' : '',
    isScrolled ? 'is-scrolled' : '',
    isFacilityPage ? 'site-header-lem' : '',
    isSubmenuLockedClosed ? 'is-submenu-locked-closed' : '',
  ].filter(Boolean).join(' ')

  return (
    <header className={headerClassName}>
      <a href="#main-content" className="skip-link">Skip to content</a>

      <div className="top-contact-bar">
        <div className="container top-contact-inner">
          <div className="top-contact-group">
            <a href={`mailto:${siteConfig.email}`} className="top-contact-link">
              <Mail size={13} aria-hidden="true" />
              <span>{siteConfig.email}</span>
            </a>
          </div>

          <div className="top-socials" aria-label="Social media links">
            {socialLinks.map(({ key, label, icon: Icon }) => (
              <a
                key={key}
                href={siteConfig.socials[key]}
                aria-label={label}
                className="top-social-link"
                target="_blank"
                rel="noreferrer"
              >
                <Icon size={13} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <nav className="container nav-shell" aria-label="Primary navigation">
        <Link href={withLocalePath(brandHref, locale)} className={`brand ${isFacilityPage ? 'brand-lem' : ''}`} aria-label={`${brandLabel} home`}>
          <img src={brandLogo} alt={brandLabel} />
        </Link>

        <div className="nav-links desktop-nav">
          {navigation.map((item) => renderDesktopNavigationItem(item))}
        </div>

        <div className="nav-actions">
          <LanguageToggle />
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={t('actions.switchTheme')}
            aria-pressed={theme === 'dark'}
          >
            <span className="theme-toggle-track" aria-hidden="true">
              <span className="theme-toggle-orb">
                {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
              </span>
            </span>
          </button>
          <button
            ref={mobileMenuButtonRef}
            className="mobile-menu-button"
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-label={isMenuOpen ? t('actions.closeMenu') : t('actions.openMenu')}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation-dialog"
          >
            {isMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div className={`mobile-menu-panel ${isMenuOpen ? 'is-open' : ''}`} aria-hidden={!isMenuOpen}>
        <div className="mobile-menu-backdrop" onClick={closeNavigationMenus} />
        <div
          id="mobile-navigation-dialog"
          ref={mobileMenuCardRef}
          className="mobile-menu-card"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          tabIndex={-1}
        >
          <div className="mobile-menu-head">
            <img src={brandLogo} alt={brandLabel} className={isFacilityPage ? 'mobile-lem-logo' : undefined} />
            <button ref={mobileMenuCloseRef} type="button" className="mobile-menu-close" onClick={closeNavigationMenus} aria-label={t('actions.closeMenu')}>
              <X size={19} aria-hidden="true" />
            </button>
          </div>

          <div className="mobile-menu-scroll">
            <div className="mobile-nav-links">
              {navigation.map((item) => renderMobileNavigationItem(item))}
            </div>
          </div>

          <div className="mobile-menu-footer">
            <div className="mobile-menu-contact">
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}>{siteConfig.phone}</a>
            </div>

            <div className="mobile-menu-socials" aria-label="Social media links">
              {socialLinks.map(({ key, label, icon: Icon }) => (
                <a
                  key={key}
                  href={siteConfig.socials[key]}
                  aria-label={label}
                  className="mobile-social-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
