'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getLocaleFromPathname, withLocalePath } from '@/i18n/config'
import { divisionSectionTargets } from '@/config/divisions.config.js'

const resolveStaticHref = (href = '/') => {
  const normalizedHref = href.length > 1 ? href.replace(/\/+$/, '') : href
  return divisionSectionTargets[normalizedHref] || href
}

const isRuntimeProjectDetailHref = (href = '') => {
  if (typeof href !== 'string' || !href.startsWith('/')) return false

  const cleanPath = href.split(/[?#]/, 1)[0].replace(/\/+$/, '')
  const segments = cleanPath.split('/').filter(Boolean)
  const projectIndex = segments[0] === 'fr' ? 1 : 0

  return segments[projectIndex] === 'projects'
    && segments.length === projectIndex + 2
    && segments[projectIndex + 1] !== '__runtime-detail__'
}

const LocalizedLink = ({ href = '/', prefetch, ...props }) => {
  const pathname = usePathname() || '/'
  const locale = getLocaleFromPathname(pathname)
  const localizedHref = withLocalePath(resolveStaticHref(href), locale)

  // CMS project detail routes are served by Apache through the statically
  // exported runtime shell. A full document request is required so Next does
  // not request route-segment (__next.*) payloads that do not exist for
  // arbitrary CMS slugs on static hosting.
  if (isRuntimeProjectDetailHref(localizedHref)) {
    return <a href={localizedHref} {...props} />
  }

  return <Link href={localizedHref} prefetch={prefetch} {...props} />
}

export default LocalizedLink
