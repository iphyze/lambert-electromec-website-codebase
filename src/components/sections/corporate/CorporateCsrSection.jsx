'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  HeartHandshake,
  Leaf,
  UsersRound,
} from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection.jsx'
import slide1Image from '@/assets/images/corporate/slide-1.webp'
import slide2Image from '@/assets/images/corporate/slide-2.webp'
import slide3Image from '@/assets/images/corporate/slide-3.webp'
import slide4Image from '@/assets/images/corporate/slide-4.webp'
import slide5Image from '@/assets/images/corporate/slide-5.webp'

const corporateCsrImages = [
  slide1Image?.src || slide1Image,
  slide2Image?.src || slide2Image,
  slide3Image?.src || slide3Image,
  slide4Image?.src || slide4Image,
  slide5Image?.src || slide5Image,
]

const AUTOPLAY_DELAY = 5000

const storyIcons = {
  sustainability: Leaf,
  community: UsersRound,
  inclusion: Accessibility,
  olympics: HeartHandshake,
  education: GraduationCap,
}

const revealGroup = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
}

const revealUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
  },
}

const CorporateCsrSection = ({ content }) => {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()
  const storyCount = content?.stories?.length || 0
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.08,
    margin: '0px 0px -8% 0px',
  })

  useEffect(() => {
    setActiveIndex(0)
  }, [content])

  useEffect(() => {
    corporateCsrImages.forEach((src) => {
      if (!src) return

      const image = new window.Image()
      image.decoding = 'async'
      image.src = src
      image.decode?.().catch(() => {})
    })
  }, [])

  useEffect(() => {
    if (!isInView || shouldReduceMotion || storyCount <= 1) return undefined

    const autoplayTimer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % storyCount)
    }, AUTOPLAY_DELAY)

    return () => window.clearTimeout(autoplayTimer)
  }, [activeIndex, isInView, shouldReduceMotion, storyCount])

  if (!storyCount) return null

  const activeStory = content.stories[activeIndex]
  const activeImage = corporateCsrImages[activeIndex] || ''
  const ActiveIcon = storyIcons[activeStory.icon] || HeartHandshake

  const selectPrevious = () => {
    setActiveIndex((current) => (current - 1 + storyCount) % storyCount)
  }

  const selectNext = () => {
    setActiveIndex((current) => (current + 1) % storyCount)
  }

  const motionProps = shouldReduceMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  return (
    <AnimatedSection id="csr" className="corporate-csr-section section-padding" amount={0.06}>
      <div className="corporate-csr-background" aria-hidden="true">
        <span className="corporate-csr-grid" />
        <span className="corporate-csr-dots" />
        <span className="corporate-csr-arc corporate-csr-arc-one" />
        <span className="corporate-csr-arc corporate-csr-arc-two" />
      </div>

      <div className="container corporate-csr-container" ref={sectionRef}>
        <motion.header className="corporate-csr-heading" variants={revealGroup} {...motionProps}>
          <motion.span className="corporate-csr-eyebrow" variants={revealUp}>
            <HeartHandshake size={18} aria-hidden="true" />
            {content.eyebrow}
          </motion.span>
          <motion.h2 variants={revealUp}>{content.title}</motion.h2>
          <motion.p variants={revealUp}>{content.intro}</motion.p>
        </motion.header>

        <motion.div className="corporate-csr-showcase" variants={revealUp} {...motionProps}>
          <div className="corporate-csr-feature">
            <figure className="corporate-csr-visual">
              <AnimatePresence initial={false} mode="sync">
                {activeImage ? (
                  <motion.img
                    key={`csr-image-${activeIndex}`}
                    src={activeImage}
                    alt={activeStory.title}
                    loading="lazy"
                    decoding="async"
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.035 }}
                    animate={{ opacity: 1, scale: 1.025 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 1.015 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  />
                ) : (
                  <motion.span
                    key={`csr-fallback-${activeIndex}`}
                    className="corporate-csr-image-fallback"
                    aria-hidden="true"
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.45 }}
                  />
                )}
              </AnimatePresence>

              <span className="corporate-csr-image-shade" aria-hidden="true" />
              <span className="corporate-csr-image-pattern" aria-hidden="true" />
              <span className="corporate-csr-scan" aria-hidden="true" />

              <figcaption>
                <span className="corporate-csr-feature-icon" aria-hidden="true">
                  <ActiveIcon size={28} />
                </span>
                <motion.div
                  key={`csr-caption-${activeIndex}`}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span>{String(activeIndex + 1).padStart(2, '0')}</span>
                  <strong>{activeStory.title}</strong>
                </motion.div>
              </figcaption>
            </figure>

            <motion.article
              className="corporate-csr-copy"
              id="corporate-csr-active-story"
              role="tabpanel"
            >
              <motion.div
                key={`csr-copy-${activeIndex}`}
                initial={shouldReduceMotion ? false : { opacity: 0.35, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
              >
                <div className="corporate-csr-copy-topline">
                  <span>{String(activeIndex + 1).padStart(2, '0')}</span>
                  <i aria-hidden="true" />
                  <span>{String(storyCount).padStart(2, '0')}</span>
                </div>
                <h3>{activeStory.title}</h3>
                <div className="corporate-csr-paragraphs">
                  {activeStory.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <div className="corporate-csr-controls" aria-label={content.controlsLabel}>
                  <button type="button" onClick={selectPrevious} aria-label={content.previousLabel}>
                    <ArrowLeft size={20} aria-hidden="true" />
                  </button>
                  <div className="corporate-csr-progress" aria-hidden="true">
                    <span style={{ width: `${((activeIndex + 1) / storyCount) * 100}%` }} />
                  </div>
                  <button type="button" onClick={selectNext} aria-label={content.nextLabel}>
                    <ArrowRight size={20} aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            </motion.article>
          </div>

          <div className="corporate-csr-story-list" role="tablist" aria-label={content.navigationLabel}>
            {content.stories.map((story, index) => {
              const Icon = storyIcons[story.icon] || HeartHandshake
              const isActive = index === activeIndex

              return (
                <button
                  className={isActive ? 'is-active' : ''}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="corporate-csr-active-story"
                  key={story.title}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="corporate-csr-story-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="corporate-csr-story-icon" aria-hidden="true">
                    <Icon size={19} />
                  </span>
                  <span className="corporate-csr-story-title">{story.title}</span>
                  <ArrowRight className="corporate-csr-story-arrow" size={18} aria-hidden="true" />
                </button>
              )
            })}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

export default CorporateCsrSection
