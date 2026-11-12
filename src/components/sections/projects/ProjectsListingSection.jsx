'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  ArrowUpRight,
  Building2,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  LoaderCircle,
  MapPin,
  Search,
  TriangleAlert,
  X,
} from 'lucide-react'
import { withLocalePath } from '@/i18n/config.js'
import AiProjectSearch from './AiProjectSearch.jsx'
import ProjectImage from './ProjectImage.jsx'
import './ProjectsListingSection.css'

const PAGE_SIZE = 9
const normalizeSearchValue = (value = '') => value.trim().toLocaleLowerCase()

const buildPaginationItems = (currentPage, totalPages) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 'ellipsis-end', totalPages]
  }

  if (currentPage >= totalPages - 2) {
    return [1, 'ellipsis-start', totalPages - 2, totalPages - 1, totalPages]
  }

  return [1, 'ellipsis-start', currentPage, 'ellipsis-end', totalPages]
}

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.085,
      delayChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.18 },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 34,
    scale: 0.975,
    filter: 'blur(7px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.58,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const runtimeLabels = {
  en: {
    loadingTitle: 'Loading projects',
    loadingText: 'Please wait while the latest projects are loaded.',
    errorTitle: 'Unable to load projects',
    errorText: 'Please try again.',
    retryLabel: 'Try again',
  },
  fr: {
    loadingTitle: 'Chargement des projets',
    loadingText: 'Veuillez patienter pendant le chargement des derniers projets.',
    errorTitle: 'Impossible de charger les projets',
    errorText: 'Veuillez réessayer.',
    retryLabel: 'Réessayer',
  },
}

const ProjectsListingSection = ({
  content,
  projects = [],
  divisions = [],
  locale = 'en',
  loading = false,
  error = null,
  onRetry,
}) => {
  const shouldReduceMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const filterRef = useRef(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeDivision, setActiveDivision] = useState('all')
  const [filterOpen, setFilterOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [aiSearch, setAiSearch] = useState(null)

  const projectPool = aiSearch?.items ?? projects

  const divisionLabels = useMemo(() => {
    const labels = { ...content.divisions }

    divisions.forEach((division) => {
      if (division.key && division.name) labels[division.key] = division.name
    })

    projects.concat(projectPool).forEach((project) => {
      if (project.divisionKey && project.divisionName) {
        labels[project.divisionKey] = project.divisionName
      }
    })

    return labels
  }, [content.divisions, divisions, projectPool, projects])

  const filterOptions = useMemo(() => {
    const orderedKeys = []

    divisions.forEach((division) => {
      if (division.key && !orderedKeys.includes(division.key)) orderedKeys.push(division.key)
    })

    Object.keys(content.divisions).forEach((key) => {
      if (!orderedKeys.includes(key)) orderedKeys.push(key)
    })

    projectPool.forEach((project) => {
      if (project.divisionKey && !orderedKeys.includes(project.divisionKey)) orderedKeys.push(project.divisionKey)
    })

    return [
      { key: 'all', label: content.allLabel },
      ...orderedKeys.map((key) => ({ key, label: divisionLabels[key] || key })),
    ]
  }, [content.allLabel, content.divisions, divisionLabels, divisions, projectPool])

  const activeDivisionLabel = activeDivision === 'all'
    ? content.allLabel
    : divisionLabels[activeDivision]

  const divisionCounts = useMemo(() => {
    const counts = projectPool.reduce((accumulator, project) => {
      accumulator[project.divisionKey] = (accumulator[project.divisionKey] || 0) + 1
      return accumulator
    }, {})

    return {
      all: projectPool.length,
      ...counts,
    }
  }, [projectPool])

  const filteredProjects = useMemo(() => {
    const normalizedSearch = normalizeSearchValue(searchTerm)

    return projectPool.filter((project) => {
      const matchesDivision = activeDivision === 'all' || project.divisionKey === activeDivision
      if (!matchesDivision) return false
      if (!normalizedSearch) return true

      const divisionLabel = divisionLabels[project.divisionKey] || project.divisionName || ''
      const searchable = [
        project.title,
        project.location,
        project.summary,
        divisionLabel,
      ]
        .filter(Boolean)
        .join(' ')
        .toLocaleLowerCase()

      return searchable.includes(normalizedSearch)
    })
  }, [activeDivision, divisionLabels, projectPool, searchTerm])

  const pageCount = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE))
  const paginationItems = useMemo(() => buildPaginationItems(page, pageCount), [page, pageCount])
  const visibleProjects = filteredProjects.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const resultsAnimationKey = [
    aiSearch?.query ? `ai:${normalizeSearchValue(aiSearch.query)}` : 'all-projects',
    activeDivision,
    normalizeSearchValue(searchTerm),
    page,
  ].join('|')

  useEffect(() => {
    setPage(1)
  }, [activeDivision, searchTerm])

  useEffect(() => {
    if (page > pageCount) setPage(pageCount)
  }, [page, pageCount])

  useEffect(() => {
    if (!filterOpen) return undefined

    const handlePointerDown = (event) => {
      if (!filterRef.current?.contains(event.target)) setFilterOpen(false)
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setFilterOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [filterOpen])

  const changePage = (nextPage) => {
    const safePage = Math.min(Math.max(nextPage, 1), pageCount)
    if (safePage === page) return

    setPage(safePage)
    window.requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth', block: 'start' })
    })
  }

  const changeDivision = (divisionKey) => {
    setActiveDivision(divisionKey)
    setFilterOpen(false)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setActiveDivision('all')
    setFilterOpen(false)
  }

  const handleAiSearchResults = (result) => {
    setAiSearch(result)
    setSearchTerm('')
    setActiveDivision('all')
    setFilterOpen(false)
    setPage(1)
  }

  const clearAiSearch = () => {
    setAiSearch(null)
    setSearchTerm('')
    setActiveDivision('all')
    setFilterOpen(false)
    setPage(1)
  }

  const resultCountLabel = filteredProjects.length === 1 ? content.projectLabel : content.projectsLabel
  const labels = runtimeLabels[locale] || runtimeLabels.en

  return (
    <section className="projects-listing-section section-padding">
      <div className="projects-listing-backdrop" aria-hidden="true">
        <span className="projects-listing-grid-pattern" />
        <span className="projects-listing-glow projects-listing-glow-one" />
        <span className="projects-listing-glow projects-listing-glow-two" />
      </div>

      <div className="container projects-listing-container" ref={sectionRef}>
        <motion.div
          className="projects-listing-heading"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-kicker">{content.eyebrow}</span>
          <div className="projects-listing-heading-copy">
            <h2>{content.title}</h2>
            <p>{content.description}</p>
          </div>
        </motion.div>

        {loading || error ? (
          <motion.div
            className={`projects-empty-state projects-runtime-state ${error ? 'is-error' : 'is-loading'}`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role={error ? 'alert' : 'status'}
            aria-live="polite"
          >
            <span className="projects-empty-icon projects-runtime-state-icon">
              {error ? (
                <TriangleAlert size={25} aria-hidden="true" />
              ) : (
                <LoaderCircle size={25} className="projects-runtime-spinner" aria-hidden="true" />
              )}
            </span>
            <h3>{error ? labels.errorTitle : labels.loadingTitle}</h3>
            <p>{error ? labels.errorText : labels.loadingText}</p>
            {error && onRetry ? (
              <button type="button" onClick={onRetry}>{labels.retryLabel}</button>
            ) : null}
          </motion.div>
        ) : (
          <>
        <AiProjectSearch
          locale={locale}
          activeSearch={aiSearch}
          onResults={handleAiSearchResults}
          onClear={clearAiSearch}
        />

        <motion.div
          className="projects-toolbar"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
          <label className="projects-search" aria-label={content.searchLabel}>
            <Search size={19} aria-hidden="true" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={content.searchPlaceholder}
              aria-label={content.searchLabel}
            />
            {searchTerm ? (
              <button
                type="button"
                className="projects-search-clear"
                aria-label={content.clearFiltersLabel}
                onClick={() => setSearchTerm('')}
              >
                <X size={17} aria-hidden="true" />
              </button>
            ) : null}
          </label>

          <div className="projects-filter-control" ref={filterRef}>
            <button
              type="button"
              className={`projects-filter-trigger ${filterOpen ? 'is-open' : ''}`}
              aria-expanded={filterOpen}
              aria-haspopup="menu"
              onClick={() => setFilterOpen((current) => !current)}
            >
              <span className="projects-filter-trigger-icon">
                <Filter size={17} aria-hidden="true" />
              </span>
              <span className="projects-filter-trigger-copy">
                <small>{content.filterLabel}</small>
                <strong>{activeDivisionLabel}</strong>
              </span>
              <span className="projects-filter-trigger-count">{divisionCounts[activeDivision] || 0}</span>
              <ChevronDown size={17} className="projects-filter-chevron" aria-hidden="true" />
            </button>

            <AnimatePresence>
              {filterOpen ? (
                <motion.div
                  className="projects-filter-menu"
                  role="menu"
                  aria-label={content.filterLabel}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6, scale: 0.985 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  {filterOptions.map((option) => {
                    const isActive = option.key === activeDivision

                    return (
                      <button
                        type="button"
                        key={option.key}
                        role="menuitemradio"
                        aria-checked={isActive}
                        className={`projects-filter-option ${isActive ? 'is-active' : ''}`}
                        onClick={() => changeDivision(option.key)}
                      >
                        <span className="projects-filter-option-check">
                          {isActive ? <Check size={14} aria-hidden="true" /> : null}
                        </span>
                        <span>{option.label}</span>
                        <small>{divisionCounts[option.key] || 0}</small>
                      </button>
                    )
                  })}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="projects-results-bar">
          <p>
            {content.showingLabel} <strong>{filteredProjects.length}</strong> {resultCountLabel}
          </p>
          {(activeDivision !== 'all' || searchTerm) ? (
            <button type="button" onClick={clearFilters}>
              <X size={15} aria-hidden="true" />
              <span>{content.clearFiltersLabel}</span>
            </button>
          ) : null}
        </div>

        <AnimatePresence mode="wait">
          {visibleProjects.length ? (
            <motion.div
              className="projects-grid"
              key={resultsAnimationKey}
              variants={shouldReduceMotion ? undefined : gridVariants}
              initial={shouldReduceMotion ? false : 'hidden'}
              animate={shouldReduceMotion ? { opacity: 1 } : 'visible'}
              exit={shouldReduceMotion ? undefined : 'exit'}
            >
              {visibleProjects.map((project, index) => (
                <a
                  className="projects-card-link"
                  href={withLocalePath(`/projects/${project.key}/`, locale)}
                  key={project.key}
                  aria-label={`${content.viewProjectLabel}: ${project.title}`}
                >
                  <motion.article
                    className="projects-card"
                    variants={shouldReduceMotion ? undefined : cardVariants}
                    whileHover={shouldReduceMotion ? undefined : { y: -7 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  >
                    <div className="projects-card-media">
                      <ProjectImage
                        src={project.featuredImageSrc}
                        alt={project.imageAlt || project.title}
                        className="projects-card-image"
                        loading={index < 2 ? 'eager' : 'lazy'}
                        fetchPriority={index < 2 ? 'high' : 'auto'}
                      />
                      <span className="projects-card-shade" aria-hidden="true" />
                      <span className="projects-card-index">{String((page - 1) * PAGE_SIZE + index + 1).padStart(2, '0')}</span>
                      <span className="projects-card-division">
                        <Building2 size={14} aria-hidden="true" />
                        {divisionLabels[project.divisionKey] || project.divisionName}
                      </span>
                    </div>

                    <div className="projects-card-body">
                      <div className="projects-card-location">
                        <MapPin size={15} aria-hidden="true" />
                        <span>{project.location}</span>
                      </div>
                      <h3>{project.title}</h3>
                      <p>{project.summary}</p>
                      <span className="projects-card-cta">
                        <span>{content.viewProjectLabel}</span>
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </span>
                    </div>
                    <span className="projects-card-accent" aria-hidden="true" />
                  </motion.article>
                </a>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="projects-empty-state"
              key="projects-empty"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="projects-empty-icon"><Search size={24} aria-hidden="true" /></span>
              <h3>{content.noResultsTitle}</h3>
              <p>{content.noResultsText}</p>
              <button type="button" onClick={clearFilters}>{content.clearFiltersLabel}</button>
            </motion.div>
          )}
        </AnimatePresence>

        {pageCount > 1 ? (
          <nav className="projects-pagination" aria-label={`${content.pageLabel} ${page}`}>
            <button
              type="button"
              className="projects-pagination-arrow"
              onClick={() => changePage(page - 1)}
              disabled={page === 1}
              aria-label={content.previousLabel}
            >
              <ChevronLeft size={18} aria-hidden="true" />
              <span>{content.previousLabel}</span>
            </button>

            <div className="projects-pagination-pages">
              {paginationItems.map((item) => {
                if (typeof item === 'string') {
                  return (
                    <span className="projects-pagination-ellipsis" key={item} aria-hidden="true">
                      …
                    </span>
                  )
                }

                return (
                  <button
                    type="button"
                    key={item}
                    className={item === page ? 'is-active' : ''}
                    aria-current={item === page ? 'page' : undefined}
                    aria-label={`${content.pageLabel} ${item}`}
                    onClick={() => changePage(item)}
                  >
                    {item}
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              className="projects-pagination-arrow"
              onClick={() => changePage(page + 1)}
              disabled={page === pageCount}
              aria-label={content.nextLabel}
            >
              <span>{content.nextLabel}</span>
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </nav>
        ) : null}
          </>
        )}
      </div>
    </section>
  )
}

export default ProjectsListingSection
