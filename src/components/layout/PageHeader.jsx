'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home, MoveUpRight } from 'lucide-react'
import { getLocaleFromPathname, stripLocaleFromPathname, withLocalePath } from '@/i18n/config.js'
import { getHomeSlideImage } from '@/lib/home-images.js'

const getMenuTargetId = (item) => {
  if (item.targetId) return item.targetId
  if (!item.href?.includes('#')) return ''

  return decodeURIComponent(item.href.split('#')[1] || '')
}

const getMenuPath = (item) => item.href?.split('#')[0] || ''

const isMenuItemActive = (pathname, item, activeTarget) => {
  const targetId = getMenuTargetId(item)

  if (targetId && activeTarget) return targetId === activeTarget

  const activePaths = item.activePaths?.length
    ? item.activePaths
    : [getMenuPath(item) || item.href]

  return activePaths.some((path) => {
    if (path === '/') return pathname === '/'
    return pathname === path || pathname.startsWith(`${path}/`)
  })
}

const getScrollBehaviour = () => (
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
)

const PageHeader = ({
  eyebrow,
  title,
  description,
  imageKey,
  breadcrumbs = [],
  menuItems = [],
  menuLabel = 'Page navigation',
  meta,
}) => {
  const pathname = usePathname() || '/'
  const locale = getLocaleFromPathname(pathname)
  const basePathname = stripLocaleFromPathname(pathname)
  const backgroundImage = getHomeSlideImage(imageKey)

  const menuTargets = useMemo(
    () => menuItems
      .map((item) => ({ item, targetId: getMenuTargetId(item) }))
      .filter(({ targetId }) => Boolean(targetId)),
    [menuItems],
  )

  const [activeTarget, setActiveTarget] = useState(menuTargets[0]?.targetId || '')

  useEffect(() => {
    const hashTarget = decodeURIComponent(window.location.hash.replace(/^#/, ''))
    if (hashTarget) setActiveTarget(hashTarget)
  }, [pathname])

  useEffect(() => {
    const hashTarget = decodeURIComponent(window.location.hash.replace(/^#/, ''))
    if (!hashTarget) return undefined

    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(hashTarget)
      target?.scrollIntoView({ behavior: 'auto', block: 'start' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [pathname])

  useEffect(() => {
    const observedSections = menuTargets
      .map(({ targetId }) => document.getElementById(targetId))
      .filter(Boolean)

    if (!observedSections.length || typeof IntersectionObserver === 'undefined') {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => (
            Math.abs(first.boundingClientRect.top - window.innerHeight * 0.24)
            - Math.abs(second.boundingClientRect.top - window.innerHeight * 0.24)
          ))

        if (visibleEntries[0]?.target?.id) {
          setActiveTarget(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: '-18% 0px -58% 0px',
        threshold: [0, 0.08, 0.2],
      },
    )

    observedSections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [menuTargets])

  const handleMenuClick = (event, item) => {
    const targetId = getMenuTargetId(item)
    if (!targetId) return

    const targetPath = getMenuPath(item) || basePathname
    if (targetPath !== basePathname) return

    const target = document.getElementById(targetId)
    if (!target) return

    event.preventDefault()
    setActiveTarget(targetId)

    const localizedHref = withLocalePath(item.href, locale)
    window.history.pushState(null, '', localizedHref)
    window.dispatchEvent(new Event('hashchange'))
    target.scrollIntoView({ behavior: getScrollBehaviour(), block: 'start' })
  }

  return (
    <section
      className="page-header"
      style={backgroundImage ? { '--page-header-image': `url("${backgroundImage}")` } : undefined}
      aria-labelledby="page-header-title"
    >
      <div className="page-header-image" aria-hidden="true" />
      <div className="page-header-overlay" aria-hidden="true" />
      <div className="page-header-grid" aria-hidden="true" />
      <div className="page-header-orbit page-header-orbit-one" aria-hidden="true" />
      <div className="page-header-orbit page-header-orbit-two" aria-hidden="true" />

      <div className="container page-header-inner">
        <div className="page-header-copy">
          {eyebrow ? <span className="page-header-eyebrow">{eyebrow}</span> : null}
          <h1 id="page-header-title">{title}</h1>
          {description ? <p>{description}</p> : null}

          {breadcrumbs.length ? (
            <nav className="page-header-breadcrumbs" aria-label="Breadcrumb">
              <ol>
                {breadcrumbs.map((item, index) => {
                  const isLast = index === breadcrumbs.length - 1

                  return (
                    <li key={`${item.label}-${item.href || index}`}>
                      {index === 0 ? <Home size={14} aria-hidden="true" /> : null}
                      {item.href && !isLast ? (
                        <Link href={withLocalePath(item.href, locale)}>{item.label}</Link>
                      ) : (
                        <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
                      )}
                      {!isLast ? <ChevronRight size={14} aria-hidden="true" /> : null}
                    </li>
                  )
                })}
              </ol>
            </nav>
          ) : null}
        </div>

        {meta ? (
          <div className="page-header-meta" aria-label={meta.label || meta.value}>
            <span>{meta.label}</span>
            <strong>{meta.value}</strong>
            <MoveUpRight size={18} aria-hidden="true" />
          </div>
        ) : null}
      </div>

      {menuItems.length ? (
        <div className="container page-header-menu-wrap">
          <nav className="page-header-menu" aria-label={menuLabel}>
            {menuItems.map((item, index) => {
              const isActive = isMenuItemActive(basePathname, item, activeTarget)

              return (
                <Link
                  key={item.href}
                  href={withLocalePath(item.href, locale)}
                  className={`page-header-menu-link ${isActive ? 'is-active' : ''}`}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={(event) => handleMenuClick(event, item)}
                >
                  <span className="page-header-menu-number">{String(index + 1).padStart(2, '0')}</span>
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      ) : null}
    </section>
  )
}

export default PageHeader
