'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  CalendarDays,
  Check,
  ChevronDown,
  Download,
  ExternalLink,
  FileText,
  Filter,
  LoaderCircle,
  Search,
  TriangleAlert,
  X,
} from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader.jsx'
import {
  listAllPublicMediaResources,
  listPublicMediaCategories,
} from '@/lib/api/mediaCenter.js'
import './MediaCenterPage.css'

const normalize = (value = '') => value.toLowerCase().trim()

const staticFallbackEnabled = () => {
  const configured = String(process.env.NEXT_PUBLIC_MEDIA_CENTER_STATIC_FALLBACK || '')
    .trim()
    .toLowerCase()

  if (configured === 'true') return true
  if (configured === 'false') return false

  return process.env.NODE_ENV !== 'production'
}

const runtimeLabels = {
  en: {
    loadingTitle: 'Loading resources',
    loadingText: 'Please wait while the latest Media Center resources are loaded.',
    errorTitle: 'Unable to load resources',
    errorText: 'The Media Center could not be loaded. Please try again.',
    retryLabel: 'Try again',
  },
  fr: {
    loadingTitle: 'Chargement des ressources',
    loadingText: 'Veuillez patienter pendant le chargement des dernières ressources du Centre média.',
    errorTitle: 'Impossible de charger les ressources',
    errorText: 'Le Centre média n’a pas pu être chargé. Veuillez réessayer.',
    retryLabel: 'Réessayer',
  },
}

const MediaCenterPage = ({ content, locale = 'en' }) => {
  const shouldReduceMotion = useReducedMotion()
  const [resources, setResources] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const labels = runtimeLabels[locale] || runtimeLabels.en

  const retry = useCallback(() => {
    setReloadKey((current) => current + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    const loadResources = async () => {
      setLoading(true)
      setError(null)

      try {
        const [items, categoryItems] = await Promise.all([
          listAllPublicMediaResources({ locale }, { signal: controller.signal }),
          listPublicMediaCategories(locale, { signal: controller.signal }),
        ])

        if (controller.signal.aborted) return

        const fallbackItems = staticFallbackEnabled() && Array.isArray(content.resources)
          ? content.resources
          : []

        setResources(items.length ? items : fallbackItems)
        setCategories(categoryItems)
      } catch (requestError) {
        if (requestError?.name === 'AbortError' || controller.signal.aborted) return
        setResources([])
        setCategories([])
        setError(requestError)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadResources()

    return () => controller.abort()
  }, [content.resources, locale, reloadKey])

  const filters = useMemo(() => {
    const categoryMap = new Map()

    categories.forEach((category) => {
      if (category.key && category.label && !categoryMap.has(category.key)) {
        categoryMap.set(category.key, category.label)
      }
    })

    resources.forEach((resource) => {
      if (resource.category && resource.categoryLabel && !categoryMap.has(resource.category)) {
        categoryMap.set(resource.category, resource.categoryLabel)
      }
    })

    return [
      { key: 'all', label: content.labels.all },
      ...Array.from(categoryMap.entries()).map(([key, label]) => ({ key, label })),
    ]
  }, [categories, content.labels.all, resources])

  const filteredResources = useMemo(() => {
    const query = normalize(searchTerm)

    return resources.filter((resource) => {
      const matchesCategory = activeCategory === 'all' || resource.category === activeCategory
      const searchableText = normalize([
        resource.title,
        resource.reference,
        resource.categoryLabel,
        resource.description,
        resource.fileName,
      ].filter(Boolean).join(' '))
      const matchesSearch = !query || searchableText.includes(query)
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, resources, searchTerm])

  const activeFilter = filters.find((filter) => filter.key === activeCategory) || filters[0]
  const hasFilters = activeCategory !== 'all' || Boolean(searchTerm.trim())

  useEffect(() => {
    if (activeCategory !== 'all' && !filters.some((filter) => filter.key === activeCategory)) {
      setActiveCategory('all')
    }
  }, [activeCategory, filters])

  const clearFilters = () => {
    setSearchTerm('')
    setActiveCategory('all')
    setIsFilterOpen(false)
  }

  return (
    <main className="media-center-page" lang={locale}>
      <PageHeader
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
        imageKey="Slider-4"
        breadcrumbs={[
          { label: content.labels.home, href: '/' },
          { label: content.hero.title },
        ]}
        meta={{
          label: content.labels.resources,
          value: String(resources.length).padStart(2, '0'),
        }}
      />

      <section className="media-center-library section-padding" aria-labelledby="media-center-library-title">
        <div className="media-center-library-grid" aria-hidden="true" />
        <div className="container media-center-library-inner">
          <div className="media-center-section-heading">
            <span className="section-kicker">{content.labels.featured}</span>
            <h2 id="media-center-library-title">{content.hero.title}</h2>
          </div>

          {loading || error ? (
            <motion.div
              className={`media-center-empty media-center-runtime-state ${error ? 'is-error' : 'is-loading'}`}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              role={error ? 'alert' : 'status'}
              aria-live="polite"
            >
              <span>
                {error ? (
                  <TriangleAlert size={24} aria-hidden="true" />
                ) : (
                  <LoaderCircle className="media-center-runtime-spinner" size={24} aria-hidden="true" />
                )}
              </span>
              <h3>{error ? labels.errorTitle : labels.loadingTitle}</h3>
              <p>{error ? labels.errorText : labels.loadingText}</p>
              {error ? (
                <button type="button" onClick={retry}>{labels.retryLabel}</button>
              ) : null}
            </motion.div>
          ) : (
            <>
              <div className="media-center-toolbar">
                <label className="media-center-search">
                  <Search size={19} aria-hidden="true" />
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder={content.labels.searchPlaceholder}
                    aria-label={content.labels.search}
                  />
                  {searchTerm ? (
                    <button type="button" onClick={() => setSearchTerm('')} aria-label={content.labels.clear}>
                      <X size={16} aria-hidden="true" />
                    </button>
                  ) : null}
                </label>

                <div className="media-center-filter">
                  <button
                    type="button"
                    className={`media-center-filter-trigger ${isFilterOpen ? 'is-open' : ''}`}
                    onClick={() => setIsFilterOpen((current) => !current)}
                    aria-haspopup="menu"
                    aria-expanded={isFilterOpen}
                  >
                    <span className="media-center-filter-icon"><Filter size={17} aria-hidden="true" /></span>
                    <span className="media-center-filter-copy">
                      <small>{content.labels.filter}</small>
                      <strong>{activeFilter?.label || content.labels.all}</strong>
                    </span>
                    <ChevronDown className="media-center-filter-chevron" size={17} aria-hidden="true" />
                  </button>

                  <AnimatePresence>
                    {isFilterOpen ? (
                      <motion.div
                        className="media-center-filter-menu"
                        role="menu"
                        initial={shouldReduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6, scale: 0.985 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {filters.map((filter) => {
                          const isActive = activeCategory === filter.key
                          return (
                            <button
                              type="button"
                              key={filter.key}
                              className={isActive ? 'is-active' : ''}
                              onClick={() => {
                                setActiveCategory(filter.key)
                                setIsFilterOpen(false)
                              }}
                            >
                              <span className="media-center-filter-check">
                                {isActive ? <Check size={13} aria-hidden="true" /> : null}
                              </span>
                              <span>{filter.label}</span>
                            </button>
                          )
                        })}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>

              <div className="media-center-results-bar">
                <p>{content.labels.showing} <strong>{filteredResources.length}</strong> {content.labels.resources}</p>
                {hasFilters ? (
                  <button type="button" onClick={clearFilters}>
                    <X size={14} aria-hidden="true" />
                    <span>{content.labels.clear}</span>
                  </button>
                ) : null}
              </div>

              <AnimatePresence mode="popLayout">
                {filteredResources.length ? (
                  <motion.div
                    className="media-center-resource-grid"
                    layout
                    initial={false}
                  >
                    {filteredResources.map((resource, index) => (
                      <motion.article
                        layout
                        key={resource.slug || resource.id}
                        className="media-center-resource-card"
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 22, scale: 0.985 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={shouldReduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.985 }}
                        transition={{ duration: 0.42, delay: shouldReduceMotion ? 0 : index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="media-center-card-topline">
                          <span className="media-center-card-index">{String(index + 1).padStart(2, '0')}</span>
                          <span className="media-center-card-type">{resource.type}</span>
                        </div>

                        <div className={`media-center-document-visual ${resource.coverImage?.url ? 'has-cover-image' : ''}`.trim()}>
                          {resource.coverImage?.url ? (
                            <div className="media-center-cover-frame">
                              <img
                                className="media-center-cover-image"
                                src={resource.coverImage.url}
                                alt={`${resource.title} cover`}
                                loading="lazy"
                              />
                            </div>
                          ) : (
                            <div className="media-center-document-sheet" aria-hidden="true">
                              <span className="media-center-document-fold" />
                              <FileText size={30} />
                              <i />
                              <i />
                              <i />
                            </div>
                          )}
                        </div>

                        <div className="media-center-card-copy">
                          <span className="media-center-card-category">{resource.categoryLabel}</span>
                          {resource.reference ? <p className="media-center-card-reference">{resource.reference}</p> : null}
                          <h3>{resource.title}</h3>

                          <div className="media-center-card-meta">
                            {resource.date ? (
                              <span><CalendarDays size={15} aria-hidden="true" /> {resource.date}</span>
                            ) : null}
                            <span><FileText size={15} aria-hidden="true" /> {resource.type}</span>
                          </div>
                        </div>

                        <div className="media-center-card-actions">
                          <a
                            href={resource.href}
                            target="_blank"
                            rel="noreferrer"
                            className="media-center-open-link"
                            data-analytics-event="media_opened"
                            data-analytics-label={resource.reference || ''}
                          >
                            <span>{content.labels.open}</span>
                            <ExternalLink size={15} aria-hidden="true" />
                          </a>
                          <a
                            href={resource.href}
                            target="_blank"
                            rel="noreferrer"
                            className="media-center-download-link"
                            download
                            data-analytics-event="media_downloaded"
                            data-analytics-label={resource.reference || ''}
                          >
                            <Download size={16} aria-hidden="true" />
                            <span>{content.labels.download}</span>
                          </a>
                        </div>
                      </motion.article>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    className="media-center-empty"
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <span><Search size={24} aria-hidden="true" /></span>
                    <h3>{content.labels.emptyTitle}</h3>
                    <p>{content.labels.emptyDescription}</p>
                    {hasFilters ? (
                      <button type="button" onClick={clearFilters}>{content.labels.clear}</button>
                    ) : null}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default MediaCenterPage
