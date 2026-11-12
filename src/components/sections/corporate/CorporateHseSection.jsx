'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import {
  Activity,
  Gauge,
  Megaphone,
  ScanSearch,
  ShieldCheck,
  Siren,
} from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection.jsx'
import hseImage from '@/assets/images/corporate/hse.webp'

const practiceIcons = {
  drills: Siren,
  awareness: Megaphone,
  performance: Gauge,
  reporting: ScanSearch,
}

const revealGroup = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
}

const revealUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.56, ease: [0.22, 1, 0.36, 1] },
  },
}

const revealVisual = {
  hidden: { opacity: 0, x: -30, scale: 0.985 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
}

const revealPanel = {
  hidden: { opacity: 0, x: 30, scale: 0.99 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
  },
}

const CorporateHseSection = ({ content }) => {
  const sectionContentRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(sectionContentRef, {
    once: false,
    amount: 0.12,
    margin: '0px 0px -8% 0px',
  })

  if (!content) return null

  const image = hseImage?.src || hseImage
  const motionProps = shouldReduceMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  return (
    <AnimatedSection id="hse" className="corporate-hse-section section-padding" amount={0.08}>
      <div className="corporate-hse-background" aria-hidden="true">
        <span className="corporate-hse-grid" />
        <span className="corporate-hse-sweep" />
        <span className="corporate-hse-ring corporate-hse-ring-one" />
        <span className="corporate-hse-ring corporate-hse-ring-two" />
      </div>

      <div className="container corporate-hse-container" ref={sectionContentRef}>
        <motion.header className="corporate-hse-heading" variants={revealGroup} {...motionProps}>
          <motion.span className="corporate-hse-eyebrow" variants={revealUp}>
            <ShieldCheck size={17} aria-hidden="true" />
            {content.eyebrow}
          </motion.span>
          <motion.h2 variants={revealUp}>{content.title}</motion.h2>
          <motion.p className="corporate-hse-heading-intro" variants={revealUp}>
            {content.intro}
          </motion.p>
        </motion.header>

        <motion.div className="corporate-hse-command" variants={revealGroup} {...motionProps}>
          <motion.figure className="corporate-hse-visual" variants={revealVisual}>
            {image ? (
              <img
                src={image}
                alt={content.imageAlt || ''}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <span className="corporate-hse-image-fallback" aria-hidden="true" />
            )}
            <span className="corporate-hse-image-shade" aria-hidden="true" />
            <span className="corporate-hse-image-lines" aria-hidden="true" />
            <span className="corporate-hse-scan-line" aria-hidden="true" />

            <div className="corporate-hse-visual-index" aria-hidden="true">
              <span>HSE</span>
              <strong>02</strong>
            </div>

            <figcaption className="corporate-hse-visual-caption">
              <span className="corporate-hse-visual-icon" aria-hidden="true">
                <ShieldCheck size={28} />
              </span>
              <div>
                <span>{content.visualLabel}</span>
                <strong>{content.visualValue}</strong>
              </div>
            </figcaption>
          </motion.figure>

          <motion.article className="corporate-hse-policy" variants={revealPanel}>
            <div className="corporate-hse-policy-head">
              <span className="corporate-hse-policy-icon" aria-hidden="true">
                <Activity size={24} />
              </span>
              <div>
                <span>{content.policyLabel}</span>
                <h3>{content.policyTitle}</h3>
              </div>
            </div>

            <p className="corporate-hse-statement">{content.statement}</p>

            <div className="corporate-hse-policy-system">
              <span className="corporate-hse-policy-system-icon" aria-hidden="true">
                <Activity size={24} />
              </span>
              <div>
                <span>{content.practicesLabel}</span>
                <strong>{content.practicesTitle}</strong>
              </div>
            </div>
          </motion.article>
        </motion.div>

        <motion.div
          className="corporate-hse-practices"
          variants={revealGroup}
          {...motionProps}
          aria-label={content.practicesLabel}
        >
          {content.practices?.map((practice, index) => {
            const Icon = practiceIcons[practice.icon] || ShieldCheck

            return (
              <motion.article
                className="corporate-hse-practice"
                key={practice.title}
                variants={revealUp}
                style={{ '--practice-index': index }}
              >
                <span className="corporate-hse-practice-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="corporate-hse-practice-icon" aria-hidden="true">
                  <Icon size={26} />
                </span>
                <h4>{practice.title}</h4>
                <span className="corporate-hse-practice-track" aria-hidden="true">
                  <i />
                </span>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

export default CorporateHseSection
