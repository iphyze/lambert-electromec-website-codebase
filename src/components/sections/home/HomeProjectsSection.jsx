'use client'

import { useEffect, useRef, useState } from 'react'
import LocalizedLink from '@/components/navigation/LocalizedLink.jsx'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { A11y, Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import AnimatedSection from '@/components/ui/AnimatedSection.jsx'
import { listPublicProjects } from '@/lib/api/projects.js'

const FEATURED_PROJECT_LIMIT = 10

const runtimeLabels = {
  en: {
    loading: 'Loading featured projects…',
    error: 'Featured projects are temporarily unavailable.',
    retry: 'Try again',
    empty: 'No featured projects have been selected yet.',
  },
  fr: {
    loading: 'Chargement des projets en vedette…',
    error: 'Les projets en vedette sont temporairement indisponibles.',
    retry: 'Réessayer',
    empty: 'Aucun projet en vedette n’a encore été sélectionné.',
  },
}

const revealContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
}

const revealUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.56, ease: [0.22, 1, 0.36, 1] },
  },
}

const floatingCardVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.982, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.986,
    filter: 'blur(6px)',
    transition: { duration: 0.22, ease: 'easeOut' },
  },
}

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M5 12h12.2m-5.1-5.2L17.3 12l-5.2 5.2" />
  </svg>
)

const ProjectInfoCard = ({ project, content, className = '', animate = false }) => {
  if (!project) return null

  const CardTag = animate ? motion.article : 'article'
  const animationProps = animate
    ? {
        variants: floatingCardVariants,
        initial: 'hidden',
        animate: 'visible',
        exit: 'exit',
      }
    : {}

  return (
    <CardTag className={`home-project-info-card ${className}`.trim()} {...animationProps}>
      <span className="home-project-count">{String(project.index + 1).padStart(2, '0')}</span>
      <span className="home-project-category">{project.category}</span>
      <h3>{project.title}</h3>
      <div className="home-project-meta">
        <span>{project.location}</span>
      </div>
      <p>{project.description}</p>
      <LocalizedLink className="home-project-link" href={project.href || '/projects'}>
        <span>{project.ctaLabel || content.ctaLabel || 'Explore'}</span>
        <ArrowIcon />
      </LocalizedLink>
    </CardTag>
  )
}

const normalizeHomeProject = (project, index, content) => ({
  ...project,
  index,
  image: project.homeImageSrc || project.featuredImageSrc || '',
  imageAlt: project.homeImageSrc ? (project.homeImageAlt || project.title) : (project.imageAlt || project.title),
  category: project.divisionName || '',
  description: project.summary || '',
  href: `/projects/${project.slug}/`,
  ctaLabel: content?.ctaLabel,
})

const HomeProjectsSection = ({ content, locale = 'en' }) => {
  const shouldReduceMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const prevButtonRef = useRef(null)
  const nextButtonRef = useRef(null)
  const paginationRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.18, margin: '0px 0px -10% 0px' })
  const [activeIndex, setActiveIndex] = useState(0)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    const loadFeaturedProjects = async () => {
      setLoading(true)
      setError(null)

      try {
        const result = await listPublicProjects({
          locale,
          featured: true,
          page: 1,
          limit: FEATURED_PROJECT_LIMIT,
        }, { signal: controller.signal })

        if (!controller.signal.aborted) {
          setProjects(
            result.items
              .slice(0, FEATURED_PROJECT_LIMIT)
              .map((project, index) => normalizeHomeProject(project, index, content)),
          )
          setActiveIndex(0)
        }
      } catch (requestError) {
        if (requestError?.name === 'AbortError' || controller.signal.aborted) return
        setProjects([])
        setError(requestError)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadFeaturedProjects()
    return () => controller.abort()
  }, [content, locale, reloadKey])

  if (!content) return null

  const labels = runtimeLabels[locale] || runtimeLabels.en
  const activeProject = projects.length ? projects[activeIndex % projects.length] || projects[0] : null

  const motionProps = shouldReduceMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  return (
    <AnimatedSection className="home-projects-section section-padding">
      <div className="home-projects-bg" aria-hidden="true">
        <span className="home-projects-grid" />
        <span className="home-projects-ring home-projects-ring-one" />
        <span className="home-projects-ring home-projects-ring-two" />
        <span className="home-projects-dots home-projects-dots-one" />
        <span className="home-projects-dots home-projects-dots-two" />
        <span className="home-projects-glow" />
      </div>

      <div className="container home-projects-container" ref={sectionRef}>
        <motion.div className="home-projects-heading" variants={revealContainer} {...motionProps}>
          {content.eyebrow ? <motion.span className="section-kicker" variants={revealUp}>{content.eyebrow}</motion.span> : null}
          <motion.h2 variants={revealUp}>{content.title}</motion.h2>
          {content.description ? <motion.p variants={revealUp}>{content.description}</motion.p> : null}
        </motion.div>

        {loading || error || !projects.length ? (
          <motion.div
            className={`home-projects-runtime-state${error ? ' is-error' : ''}`}
            variants={revealUp}
            {...motionProps}
            role={error ? 'alert' : 'status'}
            aria-live="polite"
          >
            <p>{loading ? labels.loading : error ? labels.error : labels.empty}</p>
            {error ? (
              <button type="button" onClick={() => setReloadKey((current) => current + 1)}>
                {labels.retry}
              </button>
            ) : null}
          </motion.div>
        ) : (
          <motion.div className="home-projects-slider-shell" variants={revealUp} {...motionProps}>
            <div className="home-projects-controls" aria-label={content.controlsLabel || 'Project slider controls'}>
              <button ref={prevButtonRef} className="home-projects-nav home-projects-nav-prev" type="button" aria-label={content.previousLabel || 'Previous project'}>
                <ArrowIcon />
              </button>
              <div ref={paginationRef} className="home-projects-pagination" />
              <button ref={nextButtonRef} className="home-projects-nav home-projects-nav-next" type="button" aria-label={content.nextLabel || 'Next project'}>
                <ArrowIcon />
              </button>
            </div>

            <Swiper
              key={`${locale}-${projects.map((project) => project.slug).join('|')}`}
              className="home-projects-swiper"
              modules={[Navigation, Pagination, Keyboard, A11y]}
              slidesPerView="auto"
              centeredSlides
              loop={projects.length > 1}
              speed={850}
              spaceBetween={28}
              grabCursor
              keyboard={{ enabled: true }}
              navigation={{
                prevEl: prevButtonRef.current,
                nextEl: nextButtonRef.current,
              }}
              pagination={{
                el: paginationRef.current,
                clickable: true,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevButtonRef.current
                swiper.params.navigation.nextEl = nextButtonRef.current
                swiper.params.pagination.el = paginationRef.current
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.realIndex ?? 0)
              }}
              a11y={{
                prevSlideMessage: content.previousLabel || 'Previous project',
                nextSlideMessage: content.nextLabel || 'Next project',
                paginationBulletMessage: content.paginationLabel || 'Go to project {{index}}',
              }}
            >
              {projects.map((project) => (
                <SwiperSlide className="home-project-slide" key={project.slug || project.title}>
                  <article className="home-project-card-wrap">
                    <div className="home-project-image-wrap">
                      {project.image ? (
                        <img src={project.image} alt={project.imageAlt || project.title} loading="lazy" decoding="async" />
                      ) : (
                        <span className="home-project-image-fallback" aria-hidden="true" />
                      )}
                      <span className="home-project-image-shade" aria-hidden="true" />
                    </div>

                    <ProjectInfoCard project={project} content={content} className="home-project-mobile-card" />
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>

            <AnimatePresence mode="wait">
              <ProjectInfoCard
                key={activeProject.slug || activeProject.title}
                project={activeProject}
                content={content}
                className="home-projects-floating-card"
                animate={!shouldReduceMotion}
              />
            </AnimatePresence>
          </motion.div>
        )}

        <motion.div className="home-projects-footer-actions" variants={revealUp} {...motionProps}>
          <LocalizedLink className="home-projects-view-all" href={content.allProjectsHref || '/projects'}>
            <span>{content.allProjectsLabel || 'View All Projects'}</span>
            <ArrowIcon />
          </LocalizedLink>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

export default HomeProjectsSection
