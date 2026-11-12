'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import {
  BatteryCharging,
  Bolt,
  ChartNoAxesCombined,
  CircleGauge,
  Factory,
  Flame,
  Leaf,
  PlugZap,
  SearchCheck,
  Settings,
  Sun,
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
import PowerImage from '@/assets/images/divisions/power.webp'
import CapabilitiesImage from '@/assets/images/divisions/capailities.webp'
import './DivisionsPowerSection.css'

const serviceIcons = {
  generation: Factory,
  distribution: PlugZap,
  renewable: Leaf,
  storage: BatteryCharging,
  audit: ChartNoAxesCombined,
  studies: SearchCheck,
  maintenance: Wrench,
}

const detailIcons = {
  generation: Flame,
  renewable: Sun,
  storage: BatteryCharging,
  audit: CircleGauge,
  operations: Settings,
}

const DivisionsPowerSection = ({ content }) => {
  const sectionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.06,
    margin: '0px 0px -7% 0px',
  })
  const [activeDetail, setActiveDetail] = useState(0)

  if (!content) return null

  const image = PowerImage?.src || PowerImage
  const capabilityImage = CapabilitiesImage?.src || CapabilitiesImage
  const motionProps = getDivisionMotionProps(shouldReduceMotion, isInView)
  const selectedDetail = content.details?.[activeDetail] || content.details?.[0]
  const SelectedIcon = detailIcons[selectedDetail?.key] || Settings

  return (
    <AnimatedSection id="power-solutions" className="divisions-power section-padding" amount={0.04}>
      <div className="divisions-power-bg" aria-hidden="true">
        <span className="divisions-power-grid" />
        <span className="divisions-power-orbit divisions-power-orbit-one" />
        <span className="divisions-power-orbit divisions-power-orbit-two" />
        <span className="divisions-power-current" />
      </div>

      <div className="container divisions-power-container" ref={sectionRef}>
        <motion.div className="divisions-power-hero" variants={divisionStagger} {...motionProps}>
          <motion.div className="divisions-power-copy" variants={divisionFadeLeft}>
            <span className="divisions-power-kicker"><Bolt size={17} aria-hidden="true" />{content.eyebrow}</span>
            <h2>{content.title}</h2>
            <p>{content.intro}</p>
            <p>{content.presence}</p>
          </motion.div>

          <motion.figure className="divisions-power-photo" variants={divisionFadeRight}>
            {image ? <img src={image} alt={content.title} loading="lazy" decoding="async" /> : null}
            <span className="divisions-power-photo-shade" aria-hidden="true" />
            <span className="divisions-power-photo-scan" aria-hidden="true" />
            <figcaption>
              <span className="divisions-power-photo-icon" aria-hidden="true"><Bolt size={28} /></span>
              <div>
                <span>{content.visualLabel}</span>
                <strong>{content.visualValue}</strong>
              </div>
            </figcaption>
          </motion.figure>
        </motion.div>

        <motion.div className="divisions-power-command" variants={divisionStagger} {...motionProps}>
          <motion.article className="divisions-power-capability-copy" variants={divisionFadeLeft}>
            <span>01 / {content.capabilities.title}</span>
            <h3>{content.capabilities.title}</h3>
            <strong>{content.capabilities.lead}</strong>
            <p>{content.capabilities.body}</p>

            {capabilityImage ? (
              <figure className="divisions-power-capability-image" aria-hidden="true">
                <img src={capabilityImage} alt="" loading="lazy" decoding="async" />
                <span className="divisions-power-capability-image-shade" />
                <figcaption>
                  <Bolt size={19} />
                  <span>{content.capabilities.title}</span>
                </figcaption>
              </figure>
            ) : null}
          </motion.article>

          <motion.div className="divisions-power-model-board" variants={divisionFadeRight}>
            <span className="divisions-power-model-ring divisions-power-model-ring-one" aria-hidden="true" />
            <span className="divisions-power-model-ring divisions-power-model-ring-two" aria-hidden="true" />
            <span className="divisions-power-model-link divisions-power-model-link-one" aria-hidden="true" />
            <span className="divisions-power-model-link divisions-power-model-link-two" aria-hidden="true" />
            <span className="divisions-power-model-link divisions-power-model-link-three" aria-hidden="true" />
            <div className="divisions-power-model-core" aria-hidden="true">
              <Bolt size={28} />
              <span>{content.capabilities.title}</span>
            </div>

            {content.capabilities.models.map((model, index) => (
              <motion.article
                className={`divisions-power-model divisions-power-model-${index + 1}`}
                key={model.code}
                variants={divisionFadeUp}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{model.code}</strong>
                <p>{model.text}</p>
                <i aria-hidden="true" />
              </motion.article>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="divisions-power-services" variants={divisionStagger} {...motionProps}>
          <motion.header variants={divisionFadeUp}>
            <span>02 / {content.services.title}</span>
            <h3>{content.services.title}</h3>
            <p>{content.services.intro}</p>
          </motion.header>

          <div className="divisions-power-service-grid">
            {content.services.items.map((service, index) => {
              const Icon = serviceIcons[service.icon] || Bolt

              return (
                <motion.article key={service.title} variants={divisionFadeUp}>
                  <span className="divisions-power-service-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="divisions-power-service-icon" aria-hidden="true"><Icon size={25} /></span>
                  <h4>{service.title}</h4>
                  <span className="divisions-power-service-signal" aria-hidden="true"><i /></span>
                </motion.article>
              )
            })}
          </div>
        </motion.div>

        <motion.div className="divisions-power-details" variants={divisionStagger} {...motionProps}>
          <motion.div className="divisions-power-detail-nav" variants={divisionFadeLeft} role="tablist" aria-label={content.services.title}>
            {content.details.map((detail, index) => {
              const Icon = detailIcons[detail.key] || Settings
              const isActive = index === activeDetail

              return (
                <button
                  key={detail.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="divisions-power-detail-panel"
                  className={isActive ? 'is-active' : ''}
                  onClick={() => setActiveDetail(index)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <Icon size={20} aria-hidden="true" />
                  <strong>{detail.title}</strong>
                  <i aria-hidden="true" />
                </button>
              )
            })}
          </motion.div>

          <motion.div className="divisions-power-detail-stage" variants={divisionFadeRight}>
            <AnimatePresence mode="wait" initial={false}>
              {selectedDetail ? (
                <motion.article
                  id="divisions-power-detail-panel"
                  key={selectedDetail.key}
                  role="tabpanel"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                >
                  <header>
                    <span className="divisions-power-detail-icon" aria-hidden="true"><SelectedIcon size={28} /></span>
                    <div>
                      <span>{selectedDetail.eyebrow}</span>
                      <h3>{selectedDetail.title}</h3>
                    </div>
                  </header>

                  {selectedDetail.intro ? <p className="divisions-power-detail-intro">{selectedDetail.intro}</p> : null}
                  {selectedDetail.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

                  {selectedDetail.blocks?.length ? (
                    <div className="divisions-power-detail-blocks">
                      {selectedDetail.blocks.map((block) => (
                        <section key={block.title}>
                          <h4>{block.title}</h4>
                          {block.text ? <p>{block.text}</p> : null}
                          {block.items?.length ? (
                            <ul>{block.items.map((item, itemIndex) => <li key={`${item}-${itemIndex}`}>{item}</li>)}</ul>
                          ) : null}
                        </section>
                      ))}
                    </div>
                  ) : null}

                  {selectedDetail.items?.length ? (
                    <ul className="divisions-power-detail-list">
                      {selectedDetail.items.map((item, itemIndex) => <li key={`${item}-${itemIndex}`}>{item}</li>)}
                    </ul>
                  ) : null}

                </motion.article>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

export default DivisionsPowerSection
