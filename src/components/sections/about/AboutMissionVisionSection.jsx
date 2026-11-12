'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { Eye, Flag, MoveUpRight, Target } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection.jsx'

const revealContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
}

const revealCard = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  },
}

const revealItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const StatementCard = ({ type, content }) => {
  const isVision = type === 'vision'
  const Icon = isVision ? Eye : Flag
  const AccentIcon = isVision ? Target : MoveUpRight

  return (
    <motion.article
      className={`about-purpose-card about-purpose-card-${type}`}
      variants={revealCard}
    >
      <span className="about-purpose-card-pattern" aria-hidden="true" />
      <span className="about-purpose-card-index" aria-hidden="true">
        {isVision ? '01' : '02'}
      </span>

      <div className="about-purpose-card-head">
        <span className="about-purpose-icon" aria-hidden="true">
          <Icon size={25} />
        </span>
        <div>
          <span className="about-purpose-label">{content.label}</span>
          <h3>{content.title}</h3>
        </div>
      </div>

      <p className="about-purpose-statement">{content.statement}</p>

      <div className="about-purpose-detail">
        <span className="about-purpose-detail-icon" aria-hidden="true">
          <AccentIcon size={20} />
        </span>
        <p>{content.description}</p>
      </div>
    </motion.article>
  )
}

const AboutMissionVisionSection = ({ content }) => {
  const sectionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.12,
    margin: '0px 0px -8% 0px',
  })

  if (!content) return null

  const motionProps = shouldReduceMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  return (
    <AnimatedSection
      id="mission-vision"
      className="about-purpose-section section-padding"
      amount={0.08}
    >
      <div className="about-purpose-background" aria-hidden="true">
        <span className="about-purpose-grid" />
        <span className="about-purpose-lines" />
        <span className="about-purpose-dots about-purpose-dots-one" />
        <span className="about-purpose-dots about-purpose-dots-two" />
      </div>

      <div className="container about-purpose-container" ref={sectionRef}>
        <motion.div className="about-purpose-heading" variants={revealContainer} {...motionProps}>
          <motion.span className="section-kicker" variants={revealItem}>{content.eyebrow}</motion.span>
          <motion.h2 variants={revealItem}>{content.title}</motion.h2>
          {content.description ? (
            <motion.p variants={revealItem}>{content.description}</motion.p>
          ) : null}
        </motion.div>

        <motion.div className="about-purpose-grid-layout" variants={revealContainer} {...motionProps}>
          <StatementCard type="vision" content={content.vision} />
          <StatementCard type="mission" content={content.mission} />
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

export default AboutMissionVisionSection
