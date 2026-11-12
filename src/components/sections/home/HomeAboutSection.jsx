'use client'

import { useRef } from 'react'
import LocalizedLink from '@/components/navigation/LocalizedLink.jsx'
import { motion, useInView, useReducedMotion } from 'motion/react'
import AnimatedSection from '@/components/ui/AnimatedSection.jsx'

import AboutImageOne from '@/assets/images/home-about/about-1.webp'
import AboutImageThree from '@/assets/images/home-about/about-3.webp'
import AboutImageFour from '@/assets/images/home-about/about-4.webp'

const HomeAboutImage = ({ src, title, className = '' }) => {
  if (!src) return null

  return (
    <figure className={`home-about-image ${className}`.trim()}>
      <img
        src={src.src}
        alt={title || ''}
        loading="lazy"
        decoding="async"
      />
    </figure>
  )
}

const revealContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
}

const revealUp = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const revealScale = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.99,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.54,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const HomeAboutSection = ({ content }) => {
  const shouldReduceMotion = useReducedMotion()
  const sectionRef = useRef(null)

  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.14,
    margin: '0px 0px -8% 0px',
  })

  if (!content) return null

  const images = content.images || []

  const motionProps = shouldReduceMotion
    ? {
      initial: false,
      animate: 'visible',
    }
    : {
      initial: 'hidden',
      animate: isInView ? 'visible' : 'hidden',
    }

  return (
    <AnimatedSection className="home-about-section section-padding">
      <div className="container home-about-grid" ref={sectionRef}>
        <motion.div
          className="home-about-copy"
          variants={revealContainer}
          {...motionProps}
        >
          {content.eyebrow ? (
            <motion.span
              className="section-kicker"
              variants={revealUp}
            >
              {content.eyebrow}
            </motion.span>
          ) : null}

          <motion.h2 variants={revealUp}>
            {content.title}
          </motion.h2>

          {content.lead ? (
            <motion.p
              className="home-about-lead"
              variants={revealUp}
            >
              {content.lead}
            </motion.p>
          ) : null}

          {content.description ? (
            <motion.p
              className="home-about-text"
              variants={revealUp}
            >
              {content.description}
            </motion.p>
          ) : null}

          {content.highlights?.length ? (
            <motion.div
              className="home-about-highlights"
              aria-label={
                content.highlightsLabel ||
                'Lambert Electromec highlights'
              }
              variants={revealContainer}
            >
              {content.highlights.map((highlight) => (
                <motion.div
                  className="home-about-highlight"
                  key={highlight.label}
                  variants={revealUp}
                >
                  <strong>{highlight.value}</strong>
                  <span>{highlight.label}</span>
                </motion.div>
              ))}
            </motion.div>
          ) : null}

          {content.cta ? (
            <motion.div
              className="home-about-actions"
              variants={revealUp}
            >
              <LocalizedLink
                className="section-button section-button-primary"
                href={content.cta.href || '/about/profile'}
              >
                <span>{content.cta.label}</span>

                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M5 12h12.2m-5.1-5.2L17.3 12l-5.2 5.2" />
                </svg>
              </LocalizedLink>
            </motion.div>
          ) : null}
        </motion.div>

        <motion.div
          className="home-about-visual"
          aria-hidden="true"
          variants={revealContainer}
          {...motionProps}
        >
          <span className="home-about-dots" />
          <span className="home-about-glow" />

          <motion.div
            variants={revealScale}
            className="home-about-motion-frame home-about-motion-frame-main"
          >
            <HomeAboutImage
              src={AboutImageOne}
              title={images[0]?.title}
              className="home-about-image-main"
            />
          </motion.div>

          <motion.div
            className="home-about-side-images"
            variants={revealContainer}
          >
            <motion.div
              variants={revealScale}
              className="home-about-motion-frame"
            >
              <HomeAboutImage
                src={AboutImageFour}
                title={images[1]?.title}
              />
            </motion.div>

            <motion.div
              variants={revealScale}
              className="home-about-motion-frame"
            >
              <HomeAboutImage
                src={AboutImageThree}
                title={images[2]?.title}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="home-about-floating-card"
            variants={revealUp}
          >
            <span>{content.card?.eyebrow}</span>
            <strong>{content.card?.title}</strong>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

export default HomeAboutSection