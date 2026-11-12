'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowLeft, LoaderCircle, TriangleAlert } from 'lucide-react'
import JsonLd from '@/components/common/JsonLd.jsx'
import ProjectDetailSection from '@/components/sections/projects/ProjectDetailSection.jsx'
import { getPublicProjectBySlug } from '@/lib/api/projects.js'
import { buildBreadcrumbStructuredData } from '@/lib/structured-data.js'
import { siteConfig } from '@/config/site.config.js'
import { withLocalePath } from '@/i18n/config.js'

const RUNTIME_DETAIL_SLUG = '__runtime-detail__'

const stateLabels = {
  en: {
    loadingTitle: 'Loading project',
    loadingText: 'Please wait while the latest project information is loaded.',
    errorTitle: 'Unable to load project',
    errorText: 'Please try again.',
    notFoundTitle: 'Project not found',
    notFoundText: 'The requested project is not available.',
    retryLabel: 'Try again',
    backLabel: 'Back to Projects',
  },
  fr: {
    loadingTitle: 'Chargement du projet',
    loadingText: 'Veuillez patienter pendant le chargement des dernières informations du projet.',
    errorTitle: 'Impossible de charger le projet',
    errorText: 'Veuillez réessayer.',
    notFoundTitle: 'Projet introuvable',
    notFoundText: 'Le projet demandé n’est pas disponible.',
    retryLabel: 'Réessayer',
    backLabel: 'Retour aux projets',
  },
}

const getProjectSlug = (pathname = '') => {
  const segments = pathname.split('/').filter(Boolean)
  const projectsIndex = segments.indexOf('projects')
  if (projectsIndex < 0) return ''

  const slug = segments[projectsIndex + 1] || ''
  if (!slug || slug === RUNTIME_DETAIL_SLUG) return ''

  try {
    return decodeURIComponent(slug)
  } catch {
    return slug
  }
}

const ensureMeta = (selector, attributes = {}) => {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement(selector.startsWith('link') ? 'link' : 'meta')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([name, value]) => {
    if (value) element.setAttribute(name, value)
  })

  return element
}

const applyRuntimeMetadata = (project, locale, pathname) => {
  if (!project || typeof document === 'undefined') return

  const title = project.seo?.title || project.title
  const description = project.seo?.description || project.summary || project.details?.description || ''
  const canonicalPath = pathname.endsWith('/') ? pathname : `${pathname}/`
  const canonicalUrl = new URL(canonicalPath, siteConfig.url).toString()
  const baseProjectPath = `/projects/${project.slug || project.key}/`
  const englishUrl = new URL(withLocalePath(baseProjectPath, 'en'), siteConfig.url).toString()
  const frenchUrl = new URL(withLocalePath(baseProjectPath, 'fr'), siteConfig.url).toString()

  document.title = `${title} | ${siteConfig.name}`

  ensureMeta('meta[name="description"]', { name: 'description', content: description })
  ensureMeta('meta[property="og:title"]', { property: 'og:title', content: title })
  ensureMeta('meta[property="og:description"]', { property: 'og:description', content: description })
  ensureMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
  ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
  ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
  ensureMeta('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl })
  ensureMeta('link[rel="alternate"][hreflang="en"]', { rel: 'alternate', hreflang: 'en', href: englishUrl })
  ensureMeta('link[rel="alternate"][hreflang="fr"]', { rel: 'alternate', hreflang: 'fr', href: frenchUrl })
  ensureMeta('link[rel="alternate"][hreflang="x-default"]', { rel: 'alternate', hreflang: 'x-default', href: englishUrl })

  if (project.featuredImageSrc) {
    ensureMeta('meta[property="og:image"]', { property: 'og:image', content: project.featuredImageSrc })
    ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: project.featuredImageSrc })
  }

  document.documentElement.lang = locale
}

const RuntimeState = ({ locale, type, onRetry }) => {
  const labels = stateLabels[locale] || stateLabels.en
  const isLoading = type === 'loading'
  const isNotFound = type === 'not-found'
  const title = isLoading ? labels.loadingTitle : (isNotFound ? labels.notFoundTitle : labels.errorTitle)
  const text = isLoading ? labels.loadingText : (isNotFound ? labels.notFoundText : labels.errorText)

  return (
    <main className="project-detail-page">
      <section className="project-detail-runtime-state section-padding" role={isLoading ? 'status' : 'alert'} aria-live="polite">
        <div className="container project-detail-runtime-state-inner">
          <span className="project-detail-runtime-state-icon">
            {isLoading ? (
              <LoaderCircle size={27} className="project-detail-runtime-spinner" aria-hidden="true" />
            ) : (
              <TriangleAlert size={27} aria-hidden="true" />
            )}
          </span>
          <h1>{title}</h1>
          <p>{text}</p>
          <div className="project-detail-runtime-actions">
            {!isLoading && !isNotFound && onRetry ? (
              <button type="button" onClick={onRetry}>{labels.retryLabel}</button>
            ) : null}
            {!isLoading ? (
              <a href={withLocalePath('/projects/', locale)}>
                <ArrowLeft size={17} aria-hidden="true" />
                <span>{labels.backLabel}</span>
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  )
}

const ProjectDetailPage = ({ content, locale = 'en', fallbackProjects = [], initialProject = null }) => {
  const routePathname = usePathname() || ''
  const [project, setProject] = useState(initialProject)
  const [state, setState] = useState(initialProject ? 'ready' : 'loading')
  const [resolvedPathname, setResolvedPathname] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  const retry = useCallback(() => {
    setReloadKey((current) => current + 1)
  }, [])

  useEffect(() => {
    const pathname = typeof window !== 'undefined'
      ? window.location.pathname
      : routePathname
    const slug = getProjectSlug(pathname)

    setResolvedPathname(pathname)

    if (!slug) {
      setProject(null)
      setState('not-found')
      return undefined
    }

    const initialProjectSlug = initialProject?.slug || initialProject?.key || ''
    if (reloadKey === 0 && initialProject && initialProjectSlug === slug) {
      setProject(initialProject)
      setState('ready')
      return undefined
    }

    const controller = new AbortController()

    const loadProject = async () => {
      setProject(null)
      setState('loading')

      try {
        const item = await getPublicProjectBySlug(slug, locale, { signal: controller.signal })
        if (controller.signal.aborted) return
        setProject(item)
        setState('ready')
      } catch (requestError) {
        if (requestError?.name === 'AbortError' || controller.signal.aborted) return

        if (requestError?.status === 404 && fallbackProjects.length) {
          const fallbackProject = fallbackProjects.find((item) => (item.slug || item.key) === slug)
          if (fallbackProject) {
            setProject({ ...fallbackProject, slug: fallbackProject.slug || fallbackProject.key })
            setState('ready')
            return
          }
        }

        setProject(null)
        setState(requestError?.status === 404 ? 'not-found' : 'error')
      }
    }

    loadProject()

    return () => controller.abort()
  }, [fallbackProjects, initialProject, locale, reloadKey, routePathname])

  useEffect(() => {
    if (state === 'ready' && project && resolvedPathname) {
      applyRuntimeMetadata(project, locale, resolvedPathname)
    }
  }, [locale, project, resolvedPathname, state])

  if (state !== 'ready' || !project) {
    return <RuntimeState locale={locale} type={state} onRetry={retry} />
  }

  const breadcrumbData = buildBreadcrumbStructuredData({
    items: [
      { name: content.pageHeader.breadcrumbs[0]?.label || 'Home', path: withLocalePath('/', locale) },
      { name: content.pageHeader.breadcrumbs[1]?.label || content.pageHeader.title, path: withLocalePath('/projects/', locale) },
      { name: project.title, path: withLocalePath(`/projects/${project.slug || project.key}/`, locale) },
    ],
  })

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <ProjectDetailSection project={project} content={content} locale={locale} />
    </>
  )
}

export default ProjectDetailPage
