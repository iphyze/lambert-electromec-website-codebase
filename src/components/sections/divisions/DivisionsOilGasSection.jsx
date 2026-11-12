'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import {
  Boxes,
  Building2,
  Factory,
  Flame,
  Gauge,
  HardHat,
  Network,
  Settings2,
  ShieldCheck,
  Wrench,
} from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection.jsx'
import {
  divisionFadeLeft,
  divisionFadeRight,
  divisionFadeUp,
  divisionStagger,
  getDivisionMotionProps,
} from './divisionsAssets.js'
import OilGasImage from '@/assets/images/divisions/oil-gas.webp'
import ServiceSlideOne from '@/assets/images/divisions/slides/slide-1.webp'
import ServiceSlideTwo from '@/assets/images/divisions/slides/slide-2.webp'
import ServiceSlideThree from '@/assets/images/divisions/slides/slide-3.webp'
import ServiceSlideFour from '@/assets/images/divisions/slides/slide-4.webp'
import ServiceSlideFive from '@/assets/images/divisions/slides/slide-5.webp'
import ServiceSlideSix from '@/assets/images/divisions/slides/slide-6.webp'
import ServiceSlideSeven from '@/assets/images/divisions/slides/slide-7.webp'
import ServiceSlideEight from '@/assets/images/divisions/slides/slide-8.webp'
import './DivisionsOilGasSection.css'

const overviewIcons = [Gauge, HardHat, ShieldCheck, Wrench, Settings2, Flame]

const groupIcons = {
  engineering: Settings2,
  refinery: Factory,
  civil: Building2,
  commissioning: Gauge,
  piping: Wrench,
  storage: Boxes,
  controls: Network,
  environment: ShieldCheck,
}

const processImages = [
  ServiceSlideOne,
  ServiceSlideTwo,
  ServiceSlideThree,
  ServiceSlideFour,
  ServiceSlideFive,
  ServiceSlideSix,
  ServiceSlideSeven,
  ServiceSlideEight,
].map((image) => image?.src || image || '')

const DivisionsOilGasSection = ({ content }) => {
  const sectionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.05,
    margin: '0px 0px -7% 0px',
  })
  const [activeGroup, setActiveGroup] = useState(0)

  if (!content) return null

  const motionProps = getDivisionMotionProps(shouldReduceMotion, isInView)
  const image = OilGasImage?.src || OilGasImage
  const selectedGroup = content.groups?.[activeGroup] || content.groups?.[0]
  const SelectedIcon = groupIcons[selectedGroup?.icon] || Factory
  const selectedImage = processImages[activeGroup] || ''

  return (
    <AnimatedSection id="oil-gas" className="divisions-oil section-padding" amount={0.04}>
      <div className="divisions-oil-bg" aria-hidden="true">
        <span className="divisions-oil-grid" />
        <span className="divisions-oil-pipe divisions-oil-pipe-one" />
        <span className="divisions-oil-pipe divisions-oil-pipe-two" />
        <span className="divisions-oil-glint" />
      </div>

      <div className="container divisions-oil-container" ref={sectionRef}>
        <motion.div className="divisions-oil-hero" variants={divisionStagger} {...motionProps}>
          <motion.div className="divisions-oil-copy" variants={divisionFadeLeft}>
            <span className="divisions-oil-kicker"><Flame size={17} aria-hidden="true" />{content.eyebrow}</span>
            <h2>{content.title}</h2>
            <p>{content.intro}</p>
            <p>{content.secondary}</p>

            <div className="divisions-oil-metrics">
              {content.metrics.map((metric) => (
                <article key={`${metric.value}-${metric.label}`}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </article>
              ))}
            </div>
          </motion.div>

          <motion.figure className="divisions-oil-photo" variants={divisionFadeRight}>
            {image ? <img src={image} alt={content.title} loading="lazy" decoding="async" /> : null}
            <span className="divisions-oil-photo-shade" aria-hidden="true" />
            <span className="divisions-oil-photo-scan" aria-hidden="true" />
            <figcaption>
              <div>
                <span>{content.visualLabel}</span>
                <strong>{content.visualValue}</strong>
              </div>
              <i aria-hidden="true"><Factory size={25} /></i>
            </figcaption>
          </motion.figure>
        </motion.div>

        <motion.div className="divisions-oil-overview" variants={divisionStagger} {...motionProps}>
          <motion.header variants={divisionFadeLeft}>
            <span>EPCC</span>
            <h3>{content.overview.title}</h3>
          </motion.header>

          <div className="divisions-oil-overview-track">
            <span className="divisions-oil-overview-line" aria-hidden="true"><i /></span>
            {content.overview.items.map((item, index) => {
              const Icon = overviewIcons[index] || Gauge

              return (
                <motion.article key={`${item}-${index}`} variants={divisionFadeUp}>
                  <span className="divisions-oil-overview-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="divisions-oil-overview-icon" aria-hidden="true"><Icon size={22} /></span>
                  <strong>{item}</strong>
                  <i aria-hidden="true" />
                </motion.article>
              )
            })}
          </div>
        </motion.div>

        <motion.div className="divisions-oil-services-heading" variants={divisionStagger} {...motionProps}>
          <motion.div variants={divisionFadeLeft}>
            <span>{content.servicesIntro.eyebrow}</span>
            <h3>{content.servicesIntro.title}</h3>
          </motion.div>
          <motion.p variants={divisionFadeRight}>{content.servicesIntro.text}</motion.p>
        </motion.div>

        <motion.div className="divisions-oil-process" variants={divisionStagger} {...motionProps}>
          <motion.div className="divisions-oil-process-nav" variants={divisionFadeLeft} role="tablist" aria-label={content.servicesIntro.title}>
            {content.groups.map((group, index) => {
              const Icon = groupIcons[group.icon] || Factory
              const isActive = index === activeGroup

              return (
                <button
                  key={group.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="divisions-oil-process-panel"
                  className={isActive ? 'is-active' : ''}
                  onClick={() => setActiveGroup(index)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <i aria-hidden="true"><Icon size={21} /></i>
                  <strong>{group.title}</strong>
                  <small aria-hidden="true" />
                </button>
              )
            })}
          </motion.div>

          <motion.div className="divisions-oil-process-stage" variants={divisionFadeRight}>
            <AnimatePresence mode="wait" initial={false}>
              {selectedGroup ? (
                <motion.article
                  id="divisions-oil-process-panel"
                  key={selectedGroup.title}
                  role="tabpanel"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                >
                  <header>
                    <span className="divisions-oil-process-icon" aria-hidden="true"><SelectedIcon size={29} /></span>
                    <div>
                      <span>{String(activeGroup + 1).padStart(2, '0')}</span>
                      <h3>{selectedGroup.title}</h3>
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

                  <span className="divisions-oil-process-flow" aria-hidden="true"><i /></span>

                  <figure className="divisions-oil-process-image" aria-hidden="true">
                    {selectedImage ? <img src={selectedImage} alt="" loading="lazy" decoding="async" /> : null}
                    <span className="divisions-oil-process-image-shade" />
                    <figcaption>{selectedGroup.title}</figcaption>
                  </figure>
                </motion.article>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

export default DivisionsOilGasSection
