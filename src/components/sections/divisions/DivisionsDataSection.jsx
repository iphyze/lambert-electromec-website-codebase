'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import {
  Cable,
  CircuitBoard,
  LockKeyhole,
  Network,
  Radio,
  Server,
  ShieldCheck,
  Snowflake,
  Video,
  Zap,
} from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection.jsx'
import {
  divisionFadeLeft,
  divisionFadeRight,
  divisionFadeUp,
  divisionStagger,
  getDivisionMotionProps,
} from './divisionsAssets.js'
import DataCenterImage from '@/assets/images/divisions/data-center.webp'
import AudioImage1 from '@/assets/images/divisions/audio/img-1.webp'
import AudioImage2 from '@/assets/images/divisions/audio/img-2.webp'
import AudioImage3 from '@/assets/images/divisions/audio/img-3.webp'
import AudioImage4 from '@/assets/images/divisions/audio/img-4.webp'
import AudioImage5 from '@/assets/images/divisions/audio/img-5.webp'
import './DivisionsDataSection.css'

const groupIcons = {
  structured: Network,
  electrical: Zap,
  mechanical: Snowflake,
  cabling: Cable,
  security: LockKeyhole,
  audiovisual: Video,
}

const detailImages = [
  null,
  AudioImage1,
  AudioImage2,
  AudioImage3,
  AudioImage4,
  AudioImage5,
]

const DivisionsDataSection = ({ content }) => {
  const sectionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.06,
    margin: '0px 0px -7% 0px',
  })
  const [activeGroup, setActiveGroup] = useState(0)

  if (!content) return null

  const motionProps = getDivisionMotionProps(shouldReduceMotion, isInView)
  const image = DataCenterImage?.src || DataCenterImage
  const selectedGroup = content.groups?.[activeGroup] || content.groups?.[0]
  const SelectedIcon = groupIcons[selectedGroup?.icon] || Server
  const selectedImageAsset = detailImages[activeGroup]
  const selectedImage = selectedImageAsset?.src || selectedImageAsset || null

  return (
    <AnimatedSection id="data-center" className="divisions-data section-padding" amount={0.04}>
      <div className="divisions-data-bg" aria-hidden="true">
        <span className="divisions-data-grid" />
        <span className="divisions-data-radar" />
        <span className="divisions-data-node divisions-data-node-one" />
        <span className="divisions-data-node divisions-data-node-two" />
        <span className="divisions-data-node divisions-data-node-three" />
      </div>

      <div className="container divisions-data-container" ref={sectionRef}>
        <motion.div className="divisions-data-hero" variants={divisionStagger} {...motionProps}>
          <motion.div className="divisions-data-copy" variants={divisionFadeLeft}>
            <span className="divisions-data-kicker"><Server size={17} aria-hidden="true" />{content.eyebrow}</span>
            <h2>{content.title}</h2>
            <p>{content.intro}</p>

            <div className="divisions-data-status">
              <span aria-hidden="true"><Radio size={22} /></span>
              <div>
                <span>{content.visualLabel}</span>
                <strong>{content.visualValue}</strong>
              </div>
              <i aria-hidden="true" />
            </div>
          </motion.div>

          <motion.figure className="divisions-data-photo" variants={divisionFadeRight}>
            {image ? <img src={image} alt={content.title} loading="lazy" decoding="async" /> : null}
            <span className="divisions-data-photo-shade" aria-hidden="true" />
            <span className="divisions-data-photo-grid" aria-hidden="true" />
            <figcaption>
              <span>03</span>
              <strong>{content.title}</strong>
            </figcaption>
          </motion.figure>
        </motion.div>

        <motion.div className="divisions-data-console" variants={divisionStagger} {...motionProps}>
          <motion.div className="divisions-data-topology" variants={divisionFadeLeft}>
            <div className="divisions-data-topology-head">
              <span>{content.visualLabel}</span>
              <strong>{content.visualValue}</strong>
            </div>

            <div className="divisions-data-map">
              <span className="divisions-data-map-ring divisions-data-map-ring-one" aria-hidden="true" />
              <span className="divisions-data-map-ring divisions-data-map-ring-two" aria-hidden="true" />
              <span className="divisions-data-map-line divisions-data-map-line-one" aria-hidden="true" />
              <span className="divisions-data-map-line divisions-data-map-line-two" aria-hidden="true" />
              <span className="divisions-data-map-line divisions-data-map-line-three" aria-hidden="true" />

              <div className="divisions-data-core" aria-hidden="true">
                <Server size={30} />
                <span>{content.title}</span>
              </div>

              {content.groups.map((group, index) => {
                const Icon = groupIcons[group.icon] || CircuitBoard
                const isActive = index === activeGroup

                return (
                  <button
                    key={`${group.title}-${group.subtitle}`}
                    type="button"
                    className={`divisions-data-map-node divisions-data-map-node-${index + 1} ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveGroup(index)}
                    aria-pressed={isActive}
                  >
                    <span aria-hidden="true"><Icon size={21} /></span>
                    <strong>{group.title}</strong>
                    <small>{String(index + 1).padStart(2, '0')}</small>
                    <i aria-hidden="true" />
                  </button>
                )
              })}
            </div>
          </motion.div>

          <motion.div className="divisions-data-detail" variants={divisionFadeRight}>
            <AnimatePresence mode="wait" initial={false}>
              {selectedGroup ? (
                <motion.article
                  key={`${selectedGroup.title}-${selectedGroup.subtitle}`}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                >
                  <header>
                    <span className="divisions-data-detail-icon" aria-hidden="true"><SelectedIcon size={28} /></span>
                    <div>
                      <span>{String(activeGroup + 1).padStart(2, '0')}</span>
                      <h3>{selectedGroup.title}</h3>
                      <p>{selectedGroup.subtitle}</p>
                    </div>
                  </header>

                  <ul>
                    {selectedGroup.items.map((item, itemIndex) => (
                      <li key={`${item}-${itemIndex}`}>
                        <ShieldCheck size={15} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {selectedGroup.items.length <= 7 && selectedImage ? (
                    <figure className="divisions-data-detail-image" aria-hidden="true">
                      <img src={selectedImage} alt="" loading="lazy" decoding="async" />
                      <span className="divisions-data-detail-image-shade" />
                      <figcaption>{selectedGroup.subtitle}</figcaption>
                    </figure>
                  ) : null}
                </motion.article>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <motion.div className="divisions-data-capability-strip" variants={divisionStagger} {...motionProps}>
          {content.groups.map((group, index) => {
            const Icon = groupIcons[group.icon] || CircuitBoard

            return (
              <motion.button
                key={`${group.title}-${index}`}
                type="button"
                variants={divisionFadeUp}
                className={index === activeGroup ? 'is-active' : ''}
                onClick={() => setActiveGroup(index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <i aria-hidden="true"><Icon size={21} /></i>
                <strong>{group.title}</strong>
                <small>{group.subtitle}</small>
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

export default DivisionsDataSection
