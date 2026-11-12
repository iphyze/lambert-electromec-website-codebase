'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { A11y, Autoplay, EffectFade, Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Activity,
  ArrowDown,
  CheckCircle2,
  ClipboardCheck,
  Gauge,
  RefreshCw,
  Settings2,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection.jsx'
import facilitySlide1 from '@/assets/images/facility/slide-1.webp'
import facilitySlide2 from '@/assets/images/facility/slide-2.webp'
import facilitySlide3 from '@/assets/images/facility/slide-3.webp'
import facilitySlide4 from '@/assets/images/facility/slide-4.webp'
import facilitySlide5 from '@/assets/images/facility/slide-5.webp'
import facilitySlide6 from '@/assets/images/facility/slide-6.webp'
import facilityManagementImage from '@/assets/images/facility/fmgt.webp'
import { listPublicFacilityProjects } from '@/lib/api/facilityProjects.js'
import './FacilityManagementPage.css'

const serviceIcons = [ShieldCheck, RefreshCw, Wrench, Sparkles]
const operationsIcons = [ClipboardCheck, Activity, Gauge]

const heroSlideImages = [
  facilitySlide1,
  facilitySlide2,
  facilitySlide3,
  facilitySlide4,
  facilitySlide5,
  facilitySlide6,
]

const renderHeroTitle = (title = '') => (
  <span className="lem-hero-title-text">
    {title.split(' ').map((word, index) => (
      <span
        className="lem-hero-title-word"
        data-word={word}
        key={`${word}-${index}`}
        style={{ '--word-index': index }}
      >
        {word}
      </span>
    ))}
  </span>
)

const splitWorkDone = (value = '') => {
  const separatorIndex = value.indexOf(':')

  if (separatorIndex === -1) {
    return { title: '', items: value.trim() }
  }

  return {
    title: value.slice(0, separatorIndex).trim(),
    items: value.slice(separatorIndex + 1).trim(),
  }
}

const scrollToSection = (id) => {
  const target = document.getElementById(id)
  if (!target) return
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const FacilityManagementPage = ({ content, locale = 'en' }) => {
  const shouldReduceMotion = useReducedMotion()
  const [activeSection, setActiveSection] = useState('lem-overview')
  const [activeHeroSlide, setActiveHeroSlide] = useState(0)
  const [facilityProjects, setFacilityProjects] = useState(() => process.env.NODE_ENV === 'development' ? content.facilities.items : [])
  const [facilityProjectsLoading, setFacilityProjectsLoading] = useState(true)
  const [facilityProjectsError, setFacilityProjectsError] = useState('')
  const heroSwiperRef = useRef(null)

  const capabilityLabels = locale === 'fr'
    ? { advantages: 'Avantages client', services: 'Lignes de service' }
    : { advantages: 'Client advantages', services: 'Service lines' }

  const heroSlides = useMemo(() => ([
    {
      title: content.hero.title,
      description: content.hero.description,
      image: heroSlideImages[0],
      type: 'intro',
    },
    ...content.hero.highlights.map((title, index) => ({
      title,
      description: content.hero.highlightDescriptions?.[index] || '',
      image: heroSlideImages[(index + 1) % heroSlideImages.length],
      type: 'highlight',
    })),
  ]), [content.hero.description, content.hero.highlights, content.hero.title, content.hero.highlightDescriptions])

  const navigationItems = useMemo(() => ([
    { id: 'lem-overview', label: content.overview.heading },
    { id: 'lem-services', label: content.maintenanceServices.heading },
    { id: 'lem-operations', label: content.operations.heading },
    { id: 'lem-facilities', label: content.facilities.heading },
  ]), [content])

  useEffect(() => {
    const controller = new AbortController()
    setFacilityProjectsLoading(true)
    setFacilityProjectsError('')

    listPublicFacilityProjects(locale, { signal: controller.signal })
      .then((items) => {
        if (items.length) {
          setFacilityProjects(items)
        } else if (process.env.NODE_ENV !== 'development') {
          setFacilityProjects([])
        }
      })
      .catch((error) => {
        if (error?.name === 'AbortError' || error?.name === 'CanceledError') return
        setFacilityProjectsError(locale === 'fr'
          ? 'Impossible de charger les projets de gestion des installations.'
          : 'Unable to load Facility Management projects.')
        if (process.env.NODE_ENV !== 'development') setFacilityProjects([])
      })
      .finally(() => {
        if (!controller.signal.aborted) setFacilityProjectsLoading(false)
      })

    return () => controller.abort()
  }, [locale, content.facilities.items])

  useEffect(() => {
    const targets = navigationItems
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)

    if (!targets.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target?.id) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-24% 0px -60% 0px', threshold: [0.08, 0.22, 0.45] },
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [navigationItems])

  return (
    <div className="lem-page" lang={locale}>
      <section className="lem-hero" aria-label={content.hero.title}>
        <Swiper
          className="lem-hero-swiper"
          modules={[Autoplay, EffectFade, Keyboard, A11y]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={950}
          loop={false}
          rewind={heroSlides.length > 1}
          keyboard={{ enabled: true }}
          allowTouchMove
          onSwiper={(swiper) => { heroSwiperRef.current = swiper }}
          onSlideChange={(swiper) => setActiveHeroSlide(swiper.realIndex)}
          autoplay={shouldReduceMotion || heroSlides.length < 2 ? false : {
            delay: 6200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          a11y={{
            prevSlideMessage: 'Previous LEM Maintenance highlight',
            nextSlideMessage: 'Next LEM Maintenance highlight',
          }}
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={`${slide.title}-${index}`} className="lem-hero-slide">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="lem-hero-image"
              />
              <span className="lem-hero-overlay" aria-hidden="true" />
              <span className="lem-hero-noise" aria-hidden="true" />

              <div className="container lem-hero-slide-inner">
                <div className="lem-hero-copy">
                  <span className="lem-hero-eyebrow">{content.hero.title}</span>
                  <h1>{renderHeroTitle(slide.title)}</h1>
                  {slide.description ? (
                    <p className="lem-hero-description">{slide.description}</p>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => scrollToSection('lem-overview')}
                    className="lem-hero-scroll"
                  >
                    <span>{content.overview.heading}</span>
                    <ArrowDown size={17} aria-hidden="true" />
                  </button>

                  <div className="lem-hero-pagination" aria-label="LEM Maintenance hero slides">
                    {heroSlides.map((heroSlide, heroIndex) => (
                      <button
                        type="button"
                        key={`${heroSlide.title}-${heroIndex}-indicator`}
                        className={activeHeroSlide === heroIndex ? 'active' : ''}
                        onClick={() => heroSwiperRef.current?.slideTo(heroIndex)}
                        aria-label={`Go to slide ${heroIndex + 1}`}
                        aria-current={activeHeroSlide === heroIndex ? 'true' : undefined}
                      >
                        <span>{String(heroIndex + 1).padStart(2, '0')}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </section>

      <nav className="lem-section-nav" aria-label={content.hero.title}>
        <div className="container">
          <div className="lem-section-nav-panel">
            {navigationItems.map((item, index) => (
              <button
                type="button"
                key={item.id}
                className={activeSection === item.id ? 'active' : ''}
                onClick={() => scrollToSection(item.id)}
              >
                <span className="lem-nav-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="lem-nav-label">{item.label}</span>
                <span className="lem-nav-indicator" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </nav>

      <AnimatedSection id="lem-overview" className="lem-overview section-padding">
        <div className="container">
          <div className="lem-overview-heading">
            <div className="lem-editorial-marker">
              <span>01</span>
              <i aria-hidden="true" />
            </div>
            <div className="lem-section-heading">
              <span className="lem-kicker">{content.overview.heading}</span>
              <h2>{content.overview.servicesIntro}</h2>
            </div>
          </div>

          <div className="lem-service-type-grid">
            {content.overview.serviceTypes.map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length]
              return (
                <motion.article
                  key={`${service.title}-${index}`}
                  className="lem-service-type-card"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.22 }}
                  transition={{ duration: 0.54, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="lem-service-card-top">
                    <span className="lem-card-icon"><Icon size={22} aria-hidden="true" /></span>
                    <span className="lem-card-number">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3>{service.title}{locale === 'fr' ? ' :' : ':'}</h3>
                  <p>{service.body}</p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="lem-services" className="lem-capabilities section-padding">
        <div className="container">
          <div className="lem-capabilities-header">
            <div className="lem-capabilities-heading">
              <div className="lem-editorial-marker">
                <span>02</span>
                <i aria-hidden="true" />
              </div>
              <span className="lem-capabilities-kicker">{content.overview.heading}</span>
              <h2>{content.maintenanceServices.heading}</h2>
            </div>

            <div className="lem-capabilities-summary" aria-label={content.maintenanceServices.heading}>
              <div>
                <strong>{String(content.overview.advantages.length).padStart(2, '0')}</strong>
                <span>{capabilityLabels.advantages}</span>
              </div>
              <div>
                <strong>{String(content.maintenanceServices.items.length).padStart(2, '0')}</strong>
                <span>{capabilityLabels.services}</span>
              </div>
            </div>
          </div>

          <div className="lem-capabilities-overview-grid">
            <motion.aside
              className="lem-capabilities-story-card"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="lem-capabilities-story-head">
                <div className="lem-capabilities-story-icon" aria-hidden="true">
                  <Settings2 size={24} />
                </div>
                <span>{content.overview.heading}</span>
              </div>
              <p className="lem-solution-copy">{content.overview.solution}</p>
            </motion.aside>

            <div className="lem-capabilities-advantages-panel">
              <div className="lem-capabilities-panel-heading">
                <div>
                  <span>{capabilityLabels.advantages}</span>
                  <strong>{String(content.overview.advantages.length).padStart(2, '0')}</strong>
                </div>
                <ShieldCheck size={22} aria-hidden="true" />
              </div>

              <div className="lem-advantages-list">
                {content.overview.advantages.map((item, index) => (
                  <motion.div
                    className="lem-advantage"
                    key={`${item}-${index}`}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.4, delay: (index % 6) * 0.04 }}
                  >
                    <span className="lem-advantage-index">{String(index + 1).padStart(2, '0')}</span>
                    <CheckCircle2 size={16} aria-hidden="true" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="lem-capabilities-services">
            <div className="lem-capabilities-services-heading">
              <div>
                <span>{capabilityLabels.services}</span>
                <strong>{content.maintenanceServices.heading}</strong>
              </div>
              <span className="lem-services-count">{String(content.maintenanceServices.items.length).padStart(2, '0')}</span>
            </div>

            <div className="lem-maintenance-services-list">
              {content.maintenanceServices.items.map((item, index) => {
                const Icon = serviceIcons[index % serviceIcons.length]
                return (
                  <motion.article
                    className="lem-maintenance-service"
                    key={`${item}-${index}`}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.18 }}
                    transition={{ duration: 0.42, delay: (index % 8) * 0.03 }}
                  >
                    <div className="lem-maintenance-service-top">
                      <span className="lem-maintenance-service-icon"><Icon size={17} aria-hidden="true" /></span>
                      <span className="lem-maintenance-service-number">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <p>{item}</p>
                    <span className="lem-maintenance-service-line" aria-hidden="true" />
                  </motion.article>
                )
              })}
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="lem-operations" className="lem-operations section-padding">
        <div className="container">
          <div className="lem-operations-heading">
            <div className="lem-editorial-marker">
              <span>03</span>
              <i aria-hidden="true" />
            </div>
            <div className="lem-section-heading">
              <h2>{content.operations.heading}</h2>
              <p>{content.operations.intro}</p>
            </div>
          </div>

          <div className="lem-operations-layout">
            <motion.div
              className="lem-operations-media"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={facilityManagementImage}
                alt={content.operations.heading}
                fill
                sizes="(max-width: 900px) 100vw, 48vw"
                className="lem-operations-image"
              />
              <div className="lem-operations-media-overlay" aria-hidden="true" />
              <div className="lem-operations-mark" aria-hidden="true"><Settings2 size={30} /></div>
            </motion.div>

            <div className="lem-operations-list">
              {content.operations.items.map((item, index) => {
                const Icon = operationsIcons[index % operationsIcons.length]
                return (
                  <motion.article
                    className="lem-operation-card"
                    key={`${item}-${index}`}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.46, delay: index * 0.08 }}
                  >
                    <div className="lem-operation-card-head">
                      <span className="lem-operation-icon"><Icon size={20} aria-hidden="true" /></span>
                      <span className="lem-operation-number">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h3>{item}</h3>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </div>
      </AnimatedSection>

      <section id="lem-facilities" className="lem-facilities section-padding">
        <div className="container">
          <motion.div
            className="lem-facilities-heading"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="lem-editorial-marker">
              <span>04</span>
              <i aria-hidden="true" />
            </div>
            <div className="lem-section-heading">
              <h2>{content.facilities.heading}</h2>
              <p>{content.facilities.intro}</p>
            </div>
          </motion.div>

          {facilityProjectsLoading && facilityProjects.length === 0 ? (
            <div className="lem-facility-state" role="status">
              {locale === 'fr' ? 'Chargement des projets…' : 'Loading Facility Management projects…'}
            </div>
          ) : null}

          {facilityProjectsError && facilityProjects.length === 0 ? (
            <div className="lem-facility-state lem-facility-state-error" role="alert">{facilityProjectsError}</div>
          ) : null}

          {!facilityProjectsLoading && !facilityProjectsError && facilityProjects.length === 0 ? (
            <div className="lem-facility-state">
              {locale === 'fr' ? 'Aucun projet publié pour le moment.' : 'No published Facility Management projects yet.'}
            </div>
          ) : null}

          <div className="lem-facility-grid">
            {facilityProjects.map((facility, index) => (
              <motion.article
                className="lem-facility-card"
                key={`${facility.title}-${index}`}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.56, delay: (index % 4) * 0.055, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="lem-facility-media">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    loading="lazy"
                    className="lem-facility-image"
                  />
                  <div className="lem-facility-image-shade" aria-hidden="true" />
                  <span className="lem-facility-index">{String(index + 1).padStart(2, '0')}</span>
                </div>

                <div className="lem-facility-content">
                  <h3>{facility.title}</h3>
                  <p>{facility.description}</p>
                  {facility.workDone ? (() => {
                    const workDone = splitWorkDone(facility.workDone)
                    return (
                      <div className="lem-work-done">
                        {workDone.title ? <span className="lem-work-done-title">{workDone.title}</span> : null}
                        <p>{workDone.items}</p>
                      </div>
                    )
                  })() : null}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default FacilityManagementPage
