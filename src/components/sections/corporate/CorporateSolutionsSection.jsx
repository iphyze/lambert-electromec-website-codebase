'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import {
  Boxes,
  DraftingCompass,
  HardHat,
  Lightbulb,
  Network,
  PackageCheck,
  Sparkles,
  Wrench,
} from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection.jsx'

const capabilityIcons = {
  concept: Lightbulb,
  drawings: DraftingCompass,
  coordination: Network,
  construction: HardHat,
  maintenance: Wrench,
}

const revealGroup = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.085,
      delayChildren: 0.04,
    },
  },
}

const revealUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.54, ease: [0.22, 1, 0.36, 1] },
  },
}

const revealBoard = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
  },
}

const CorporateSolutionsSection = ({ content }) => {
  const shouldReduceMotion = useReducedMotion()
  const sectionContentRef = useRef(null)
  const isInView = useInView(sectionContentRef, {
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
      id="solutions-provider"
      className="corporate-solutions-section section-padding"
      amount={0.08}
    >
      <div className="corporate-solutions-background" aria-hidden="true">
        <span className="corporate-solutions-grid" />
        <span className="corporate-solutions-orbit corporate-solutions-orbit-one" />
        <span className="corporate-solutions-orbit corporate-solutions-orbit-two" />
        <span className="corporate-solutions-dots" />
      </div>

      <div className="container corporate-solutions-container" ref={sectionContentRef}>
        <motion.header
          className="corporate-solutions-heading"
          variants={revealGroup}
          {...motionProps}
        >
          <motion.span className="corporate-solutions-eyebrow" variants={revealUp}>
            <Sparkles size={16} aria-hidden="true" />
            {content.eyebrow}
          </motion.span>
          <motion.h2 variants={revealUp}>{content.title}</motion.h2>
          <motion.p variants={revealUp}>{content.lead}</motion.p>
        </motion.header>

        <motion.div
          className="corporate-solutions-layout"
          variants={revealGroup}
          {...motionProps}
        >
          <motion.article className="corporate-solutions-narrative" variants={revealUp}>
            <div className="corporate-solutions-narrative-head">
              <span className="corporate-solutions-narrative-icon" aria-hidden="true">
                <Boxes size={23} />
              </span>
              <div>
                <span>{content.operatingLabel}</span>
                <strong>Lambert Electromec</strong>
              </div>
            </div>

            <div className="corporate-solutions-copy">
              {content.body?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="corporate-solutions-delivery-note">
              <PackageCheck size={20} aria-hidden="true" />
              <div>
                <span>{content.footerLabel}</span>
                <p>{content.footerText}</p>
              </div>
            </div>
          </motion.article>

          <motion.div className="corporate-solutions-system" variants={revealBoard}>
            <div className="corporate-solutions-system-head">
              <div>
                <span>{content.systemLabel}</span>
                <h3>{content.systemTitle}</h3>
              </div>
              <div className="corporate-solutions-live-indicator" aria-hidden="true">
                <i className="corporate-solutions-live-dot" />
                <i className="corporate-solutions-live-dot is-active" />
                <i className="corporate-solutions-live-dot" />
              </div>
            </div>

            <div className="corporate-solutions-map" aria-label={content.capabilitiesLabel}>
              <span className="corporate-solutions-track corporate-solutions-track-one" aria-hidden="true" />
              <span className="corporate-solutions-track corporate-solutions-track-two" aria-hidden="true" />
              <span className="corporate-solutions-track corporate-solutions-track-three" aria-hidden="true" />

              <div className="corporate-solutions-core">
                <span>{content.coreLabel}</span>
                <small>{content.coreCaption}</small>
                <i aria-hidden="true" />
              </div>

              <motion.div className="corporate-solutions-capability-grid" variants={revealGroup}>
                {content.capabilities?.map((item, index) => {
                  const Icon = capabilityIcons[item.icon] || Lightbulb

                  return (
                    <motion.article
                      className={`corporate-solutions-capability corporate-solutions-capability-${index + 1}`}
                      key={item.title}
                      variants={revealUp}
                      style={{ '--capability-index': index }}
                    >
                      <span className="corporate-solutions-capability-number">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="corporate-solutions-capability-icon" aria-hidden="true">
                        <Icon size={24} />
                      </span>
                      <h4>{item.title}</h4>
                      <span className="corporate-solutions-capability-signal" aria-hidden="true" />
                    </motion.article>
                  )
                })}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

export default CorporateSolutionsSection
