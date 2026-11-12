'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import {
  BadgeCheck,
  CheckCircle2,
  Clock3,
  Leaf,
  MessageSquareText,
  PackageCheck,
  Scale,
  ShieldCheck,
  UsersRound,
} from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection.jsx'

const commitmentIcons = [
  CheckCircle2,
  Scale,
  UsersRound,
  PackageCheck,
  MessageSquareText,
  Clock3,
]

const standardIcons = {
  quality: BadgeCheck,
  environment: Leaf,
  safety: ShieldCheck,
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

const revealLeft = {
  hidden: { opacity: 0, x: -30, scale: 0.985 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
  },
}

const revealRight = {
  hidden: { opacity: 0, x: 30, scale: 0.985 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
  },
}

const CorporateIsoQmsSection = ({ content }) => {
  const sectionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.1,
    margin: '0px 0px -8% 0px',
  })

  if (!content) return null

  const motionProps = shouldReduceMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  return (
    <AnimatedSection
      id="iso-qms"
      className="corporate-iso-section section-padding"
      amount={0.08}
    >
      <div className="corporate-iso-background" aria-hidden="true">
        <span className="corporate-iso-grid" />
        <span className="corporate-iso-dots" />
        <span className="corporate-iso-ring corporate-iso-ring-one" />
        <span className="corporate-iso-ring corporate-iso-ring-two" />
      </div>

      <div className="container corporate-iso-container" ref={sectionRef}>
        <motion.header className="corporate-iso-heading" variants={revealGroup} {...motionProps}>
          <motion.span className="corporate-iso-eyebrow" variants={revealUp}>
            <BadgeCheck size={17} aria-hidden="true" />
            {content.eyebrow}
          </motion.span>
          <motion.div className="corporate-iso-heading-grid" variants={revealUp}>
            <h2>{content.title}</h2>
            <p>{content.lead}</p>
          </motion.div>
        </motion.header>

        <motion.div className="corporate-iso-overview" variants={revealGroup} {...motionProps}>
          <motion.article className="corporate-iso-copy-panel" variants={revealLeft}>
            <div className="corporate-iso-copy-index" aria-hidden="true">
              <span>03</span>
              <i />
            </div>
            <span className="corporate-iso-copy-label">{content.systemLabel}</span>
            <h3>{content.systemTitle}</h3>
            <p>{content.body}</p>
          </motion.article>

          <motion.div className="corporate-iso-standards" variants={revealRight}>
            <div className="corporate-iso-orbit" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <div className="corporate-iso-core" aria-hidden="true">
              <strong>IMS</strong>
              <small>{content.coreCaption}</small>
            </div>

            <div className="corporate-iso-standard-list">
              {content.standards?.map((standard, index) => {
                const Icon = standardIcons[standard.icon] || BadgeCheck

                return (
                  <article
                    className={`corporate-iso-standard corporate-iso-standard-${index + 1}`}
                    key={standard.code}
                    style={{ '--standard-index': index }}
                  >
                    <span className="corporate-iso-standard-icon" aria-hidden="true">
                      <Icon size={21} />
                    </span>
                    <div>
                      <strong>{standard.code}</strong>
                      <span>{standard.label}</span>
                    </div>
                    <i aria-hidden="true" />
                  </article>
                )
              })}
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="corporate-iso-commitments" variants={revealGroup} {...motionProps}>
          <motion.div className="corporate-iso-commitments-head" variants={revealUp}>
            <span>{content.commitmentsLabel}</span>
            <h3>{content.commitmentsTitle}</h3>
          </motion.div>

          <div className="corporate-iso-commitment-grid">
            {content.commitments?.map((commitment, index) => {
              const Icon = commitmentIcons[index] || CheckCircle2

              return (
                <motion.article
                  className="corporate-iso-commitment"
                  key={commitment}
                  variants={revealUp}
                  style={{ '--commitment-index': index }}
                >
                  <span className="corporate-iso-commitment-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="corporate-iso-commitment-icon" aria-hidden="true">
                    <Icon size={21} />
                  </span>
                  <p>{commitment}</p>
                  <span className="corporate-iso-commitment-line" aria-hidden="true">
                    <i />
                  </span>
                </motion.article>
              )
            })}
          </div>
        </motion.div>

        <motion.aside className="corporate-iso-assurance" variants={revealUp} {...motionProps}>
          <span className="corporate-iso-assurance-icon" aria-hidden="true">
            <ShieldCheck size={25} />
          </span>
          <div>
            <span>{content.assuranceLabel}</span>
            <p>{content.conclusion}</p>
          </div>
        </motion.aside>
      </div>
    </AnimatedSection>
  )
}

export default CorporateIsoQmsSection
