'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import {
  Building2,
  Database,
  Factory,
  Globe2,
  Landmark,
  MapPinned,
  MoveRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Wrench,
  Zap,
} from 'lucide-react'
import LocalizedLink from '@/components/navigation/LocalizedLink.jsx'
import AnimatedSection from '@/components/ui/AnimatedSection.jsx'
const aboutProfileImages = require.context(
  '../../../assets/images/about-profile',
  false,
  /\.webp$/i,
)

const getProfileImage = (name) => {
  const matchingKey = aboutProfileImages.keys().find((key) =>
    key.replace(/^\.\//, '').replace(/\.webp$/i, '') === name,
  )

  if (!matchingKey) return ''

  const image = aboutProfileImages(matchingKey)
  const asset = image?.default || image

  return asset?.src || asset || ''
}

const profileSlides = [
  { main: 'buildings-big', secondary: 'building-small' },
  { main: 'data-center-big', secondary: 'data-center-small' },
  { main: 'oil-gas-big', secondary: 'oil-gas-small' },
  { main: 'power-big', secondary: 'power-small' },
]

const capabilityIcons = {
  buildings: Building2,
  power: Zap,
  oilGas: Factory,
  dataCenters: Database,
  facilityManagement: Wrench,
}

const revealContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
}

const revealUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
  },
}

const revealVisual = {
  hidden: { opacity: 0, y: 22, scale: 0.988 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  },
}

const AboutProfileSection = ({ content }) => {
  const shouldReduceMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.12,
    margin: '0px 0px -8% 0px',
  })
  const [trackIndex, setTrackIndex] = useState(1)
  const [transitionEnabled, setTransitionEnabled] = useState(true)
  const swipeStartX = useRef(null)
  const isAnimating = useRef(false)

  const activeSlide = (trackIndex - 1 + profileSlides.length) % profileSlides.length

  const goToPreviousSlide = () => {
    if (isAnimating.current) return
    isAnimating.current = true
    setTransitionEnabled(true)
    setTrackIndex((current) => current - 1)
  }

  const goToNextSlide = () => {
    if (isAnimating.current) return
    isAnimating.current = true
    setTransitionEnabled(true)
    setTrackIndex((current) => current + 1)
  }

  const handleTrackTransitionEnd = (event) => {
    if (event.propertyName !== 'transform') return

    let resetIndex = null

    if (trackIndex === 0) resetIndex = profileSlides.length
    if (trackIndex === profileSlides.length + 1) resetIndex = 1

    if (resetIndex === null) {
      isAnimating.current = false
      return
    }

    setTransitionEnabled(false)
    setTrackIndex(resetIndex)

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setTransitionEnabled(true)
        isAnimating.current = false
      })
    })
  }

  const handlePointerDown = (event) => {
    if (event.target.closest?.('.about-profile-slider-controls')) return
    if (event.pointerType === 'mouse' && event.button !== 0) return
    swipeStartX.current = event.clientX
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const handlePointerUp = (event) => {
    if (swipeStartX.current === null) return

    const distance = event.clientX - swipeStartX.current
    swipeStartX.current = null

    if (Math.abs(distance) < 44) return
    if (distance > 0) goToPreviousSlide()
    else goToNextSlide()
  }

  const handlePointerCancel = () => {
    swipeStartX.current = null
  }

  useEffect(() => {
    if (shouldReduceMotion || !isInView || profileSlides.length < 2) return undefined

    const timer = window.setTimeout(() => {
      if (isAnimating.current) return
      isAnimating.current = true
      setTransitionEnabled(true)
      setTrackIndex((current) => current + 1)
    }, 5000)

    return () => window.clearTimeout(timer)
  }, [trackIndex, isInView, shouldReduceMotion])

  if (!content) return null

  const motionProps = shouldReduceMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  const resolvedSlides = profileSlides.map((slide, realIndex) => ({
    ...slide,
    realIndex,
    mainImage: getProfileImage(slide.main),
    secondaryImage: getProfileImage(slide.secondary),
  }))

  const loopedSlides = [
    { ...resolvedSlides[resolvedSlides.length - 1], loopKey: 'clone-last' },
    ...resolvedSlides.map((slide) => ({ ...slide, loopKey: `slide-${slide.realIndex}` })),
    { ...resolvedSlides[0], loopKey: 'clone-first' },
  ]

  return (
    <AnimatedSection id="profile" className="about-profile-section section-padding" amount={0.08}>
      <div className="about-profile-background" aria-hidden="true">
        <span className="about-profile-grid" />
        <span className="about-profile-dots about-profile-dots-one" />
        <span className="about-profile-dots about-profile-dots-two" />
      </div>

      <div className="container about-profile-container" ref={sectionRef}>
        <motion.div className="about-profile-overview" variants={revealContainer} {...motionProps}>
          <motion.div
            className="about-profile-visual"
            variants={revealVisual}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
            <div className="about-profile-image-frame about-profile-image-main">
              <div
                className="about-profile-slide-track"
                style={{
                  transform: `translate3d(-${trackIndex * 100}%, 0, 0)`,
                  transitionDuration: shouldReduceMotion || !transitionEnabled ? '0ms' : undefined,
                }}
                onTransitionEnd={handleTrackTransitionEnd}
              >
                {loopedSlides.map((slide) => (
                  slide.mainImage ? (
                    <img
                      key={`main-${slide.loopKey}`}
                      className="about-profile-slide-image"
                      src={slide.mainImage}
                      alt={slide.realIndex === activeSlide ? (content.images?.main?.alt || '') : ''}
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                    />
                  ) : (
                    <span className="about-profile-image-fallback about-profile-slide-image" key={`main-${slide.loopKey}`} aria-hidden="true" />
                  )
                ))}
              </div>
              <span className="about-profile-image-overlay" aria-hidden="true" />
              <span className="about-profile-image-index" aria-hidden="true">
                {String(activeSlide + 1).padStart(2, '0')}
              </span>
              <div className="about-profile-slider-controls" aria-label="Profile image controls">
                <button type="button" onClick={goToPreviousSlide} aria-label="Previous profile image">
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <button type="button" onClick={goToNextSlide} aria-label="Next profile image">
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="about-profile-image-frame about-profile-image-secondary">
              <div
                className="about-profile-slide-track"
                style={{
                  transform: `translate3d(-${trackIndex * 100}%, 0, 0)`,
                  transitionDuration: shouldReduceMotion || !transitionEnabled ? '0ms' : undefined,
                }}
              >
                {loopedSlides.map((slide) => (
                  slide.secondaryImage ? (
                    <img
                      key={`secondary-${slide.loopKey}`}
                      className="about-profile-slide-image"
                      src={slide.secondaryImage}
                      alt={slide.realIndex === activeSlide ? (content.images?.secondary?.alt || '') : ''}
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                    />
                  ) : (
                    <span className="about-profile-image-fallback about-profile-slide-image" key={`secondary-${slide.loopKey}`} aria-hidden="true" />
                  )
                ))}
              </div>
              <span className="about-profile-image-overlay" aria-hidden="true" />
            </div>

            <div className="about-profile-visual-card">
              <ShieldCheck size={24} aria-hidden="true" />
              <div>
                <span>{content.visualCard?.eyebrow}</span>
                <strong>{content.visualCard?.title}</strong>
              </div>
            </div>
          </motion.div>

          <motion.div className="about-profile-copy" variants={revealContainer}>
            <motion.span className="section-kicker" variants={revealUp}>{content.eyebrow}</motion.span>
            <motion.h2 variants={revealUp}>{content.title}</motion.h2>
            <motion.p className="about-profile-lead" variants={revealUp}>{content.lead}</motion.p>
            <motion.p className="about-profile-text" variants={revealUp}>{content.description}</motion.p>

            <motion.div className="about-profile-signature" variants={revealUp}>
              <span>{content.signature?.label}</span>
              <strong>{content.signature?.value}</strong>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div className="about-profile-capabilities" variants={revealContainer} {...motionProps}>
          <motion.div className="about-profile-section-heading" variants={revealUp}>
            <span>{content.capabilities?.eyebrow}</span>
            <h3>{content.capabilities?.title}</h3>
            <p>{content.capabilities?.description}</p>
          </motion.div>

          <motion.div className="about-profile-capability-grid" variants={revealContainer}>
            {content.capabilities?.items?.map((item, index) => {
              const Icon = capabilityIcons[item.icon] || Landmark

              return (
                <motion.article
                  className="about-profile-capability-card"
                  key={item.title}
                  variants={revealUp}
                >
                  <span className="about-profile-capability-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="about-profile-capability-icon" aria-hidden="true">
                    <Icon size={22} />
                  </span>
                  <h4>{item.title}</h4>
                </motion.article>
              )
            })}
          </motion.div>
        </motion.div>

        <motion.div className="about-profile-detail-grid" variants={revealContainer} {...motionProps}>
          <motion.article className="about-profile-detail-card about-profile-detail-card-presence" variants={revealUp}>
            <span className="about-profile-detail-icon" aria-hidden="true">
              <MapPinned size={24} />
            </span>
            <span className="about-profile-detail-eyebrow">{content.presence?.eyebrow}</span>
            <h3>{content.presence?.title}</h3>
            <p>{content.presence?.description}</p>
            <div className="about-profile-location-list" aria-label={content.presence?.locationsLabel}>
              {content.presence?.locations?.map((location) => (
                <span key={location}>{location}</span>
              ))}
            </div>
          </motion.article>

          <motion.article className="about-profile-detail-card about-profile-detail-card-heritage" variants={revealUp}>
            <span className="about-profile-detail-icon" aria-hidden="true">
              <Globe2 size={24} />
            </span>
            <span className="about-profile-detail-eyebrow">{content.heritage?.eyebrow}</span>
            <h3>{content.heritage?.title}</h3>
            <p>{content.heritage?.description}</p>
            {content.heritage?.cta ? (
              <LocalizedLink className="about-profile-link" href={content.heritage.cta.href}>
                <span>{content.heritage.cta.label}</span>
                <MoveRight size={18} aria-hidden="true" />
              </LocalizedLink>
            ) : null}
          </motion.article>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

export default AboutProfileSection
