'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { ArrowDownRight, Clock3, Landmark, MapPin } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection.jsx'
import historyImage from '@/assets/images/about-profile/history.webp'

const revealContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
}

const revealItem = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.56, ease: [0.22, 1, 0.36, 1] },
  },
}

const revealVisual = {
  hidden: { opacity: 0, x: 28, scale: 0.985 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
  },
}

const AboutHistorySection = ({ content }) => {
  const sectionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.14,
    margin: '0px 0px -9% 0px',
  })

  if (!content) return null

  const image = historyImage?.src || historyImage
  const motionProps = shouldReduceMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  return (
    <AnimatedSection id="history" className="about-history-section section-padding" amount={0.08}>
      <div className="about-history-background" aria-hidden="true">
        <span className="about-history-grid" />
        <span className="about-history-orbit about-history-orbit-one" />
        <span className="about-history-orbit about-history-orbit-two" />
      </div>

      <div className="container about-history-container" ref={sectionRef}>
        <motion.div className="about-history-copy" variants={revealContainer} {...motionProps}>
          <motion.span className="section-kicker" variants={revealItem}>{content.eyebrow}</motion.span>
          <motion.h2 variants={revealItem}>{content.title}</motion.h2>
          <motion.p className="about-history-text" variants={revealItem}>{content.description}</motion.p>

          <motion.div className="about-history-origin" variants={revealItem}>
            <span className="about-history-origin-icon" aria-hidden="true">
              <Landmark size={21} />
            </span>
            <div>
              <span>{content.origin?.label}</span>
              <strong>{content.origin?.value}</strong>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="about-history-visual" variants={revealVisual} {...motionProps}>
          <div className="about-history-image-frame">
            {image ? (
              <img
                src={image}
                alt={content.image?.alt || ''}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <span className="about-history-image-fallback" aria-hidden="true" />
            )}
            <span className="about-history-image-overlay" aria-hidden="true" />
            <span className="about-history-image-pattern" aria-hidden="true" />
          </div>

          <div className="about-history-timeline" aria-label={content.timelineLabel}>
            {content.milestones?.map((milestone, index) => (
              <motion.article
                key={`${milestone.year}-${milestone.title}`}
                className="about-history-milestone"
                variants={revealItem}
              >
                <span className="about-history-milestone-dot" aria-hidden="true" />
                <span className="about-history-milestone-year">{milestone.year}</span>
                <strong>{milestone.title}</strong>
                {milestone.detail ? <p>{milestone.detail}</p> : null}
                {index === content.milestones.length - 1 ? (
                  <ArrowDownRight size={18} aria-hidden="true" />
                ) : null}
              </motion.article>
            ))}
          </div>

          <div className="about-history-badge">
            <Clock3 size={20} aria-hidden="true" />
            <div>
              <span>{content.badge?.label}</span>
              <strong>{content.badge?.value}</strong>
            </div>
          </div>

          <span className="about-history-location" aria-hidden="true">
            <MapPin size={15} />
            {content.locationLabel}
          </span>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

export default AboutHistorySection
