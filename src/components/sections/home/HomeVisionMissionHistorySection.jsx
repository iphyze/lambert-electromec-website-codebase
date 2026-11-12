'use client'

import { useRef } from 'react'
import LocalizedLink from '@/components/navigation/LocalizedLink.jsx'
import { motion, useInView, useReducedMotion } from 'motion/react'
import AnimatedSection from '@/components/ui/AnimatedSection.jsx'
import { getHomeSlideImage } from '@/lib/home-images.js'
import AboutImageFive from '@/assets/images/home-about/about-5.webp'



const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M5 12h12.2m-5.1-5.2L17.3 12l-5.2 5.2" />
  </svg>
)

const StatementIcon = ({ type }) => {
  if (type === 'mission') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 3.5v17" />
        <path d="M5.2 7.6c2.3-1.7 4.6-1.7 6.8 0 2.2 1.7 4.5 1.7 6.8 0v7.8c-2.3 1.7-4.6 1.7-6.8 0-2.2-1.7-4.5-1.7-6.8 0V7.6Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M2.8 12s3.2-6.3 9.2-6.3S21.2 12 21.2 12s-3.2 6.3-9.2 6.3S2.8 12 2.8 12Z" />
      <path d="M12 15.1a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2Z" />
    </svg>
  )
}

const HistoryIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 7.2v5l3.2 1.9" />
    <path d="M4.6 6.3A9 9 0 1 1 3.1 13" />
    <path d="M3.1 4.1v4.1h4.1" />
  </svg>
)

const HomeStoryImage = ({ src, title }) => {
  if (!src) return null

  return (
    <figure className="home-story-image">
      <img src={src.src} alt={title || ''} loading="lazy" decoding="async" />
    </figure>
  )
}


const revealContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.08,
    },
  },
}

const revealUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const revealCard = {
  hidden: { opacity: 0, y: 20, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.54, ease: [0.22, 1, 0.36, 1] },
  },
}

const StatementCard = ({ statement, index }) => {
  if (!statement) return null

  return (
    <motion.article className={`home-statement-card home-statement-card-${statement.type || index + 1}`} variants={revealCard}>
      <div className="home-statement-icon">
        <StatementIcon type={statement.type} />
      </div>
      <div>
        <span>{statement.kicker}</span>
        <h3>{statement.title}</h3>
        <p>{statement.text}</p>
      </div>
    </motion.article>
  )
}

const HomeVisionMissionHistorySection = ({ content }) => {
  const shouldReduceMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.14, margin: '0px 0px -8% 0px' })

  if (!content) return null

  const statements = content.statements || []
  const motionProps = shouldReduceMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  return (
    <AnimatedSection className="home-story-section section-padding">
      <div className="home-story-bg" aria-hidden="true">
        <span className="home-story-grid-pattern" />
        <span className="home-story-orbit home-story-orbit-one" />
        <span className="home-story-orbit home-story-orbit-two" />
      </div>

      <div className="container home-story-container" ref={sectionRef}>
        <motion.div className="home-story-heading" variants={revealContainer} {...motionProps}>
          {content.eyebrow ? <motion.span className="section-kicker" variants={revealUp}>{content.eyebrow}</motion.span> : null}
          <motion.h2 variants={revealUp}>{content.title}</motion.h2>
          {content.description ? <motion.p variants={revealUp}>{content.description}</motion.p> : null}
        </motion.div>

        <motion.div className="home-story-layout" variants={revealContainer} {...motionProps}>
          <motion.div className="home-story-statements" variants={revealContainer}>
            {statements.map((statement, index) => (
              <StatementCard statement={statement} index={index} key={statement.type || statement.title} />
            ))}
          </motion.div>

          <motion.article className="home-history-card" variants={revealCard}>
            <div className="home-history-content">
              <div className="home-history-icon">
                <HistoryIcon />
              </div>
              <span>{content.history?.kicker}</span>
              <h3>{content.history?.title}</h3>
              <p>{content.history?.text}</p>
              {content.cta ? (
                <LocalizedLink className="section-button section-button-primary home-story-button" href={content.cta.href || '/about/history'}>
                  <span>{content.cta.label}</span>
                  <ArrowIcon />
                </LocalizedLink>
              ) : null}
            </div>

            <div className="home-history-visual" aria-hidden="true">
              <HomeStoryImage src={AboutImageFive || 'Slider-4'} title={content.history?.imageTitle} />
              <div className="home-history-year-card">
                <strong>{content.history?.year}</strong>
                <span>{content.history?.yearLabel}</span>
              </div>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

export default HomeVisionMissionHistorySection
