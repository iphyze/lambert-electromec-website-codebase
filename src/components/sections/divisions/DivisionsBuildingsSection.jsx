'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import {
  ArrowUpRight,
  Building2,
  CircuitBoard,
  Droplets,
  Factory,
  Fan,
  Flame,
  Layers3,
  LockKeyhole,
  PlugZap,
  ShieldCheck,
  Sparkles,
  Wrench,
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
import BuildingImageOne from '@/assets/images/divisions/building-1.webp'
import BuildingImageTwo from '@/assets/images/divisions/building-2.webp'
import ElectricalImage from '@/assets/images/divisions/elect-2.webp'
import FitOutImageOne from '@/assets/images/divisions/fit-1.webp'
import FitOutImageTwo from '@/assets/images/divisions/fit-2.webp'
import FitOutImageThree from '@/assets/images/divisions/fit-3.webp'
import FitOutImageFour from '@/assets/images/divisions/fit-4.webp'
import FitOutImageFive from '@/assets/images/divisions/fit-5.webp'
import FitOutImageSix from '@/assets/images/divisions/fit-6.webp'
import './DivisionsBuildingsSection.css'

const electricalIcons = {
  highVoltage: Zap,
  lowVoltage: PlugZap,
  extraLowVoltage: CircuitBoard,
}

const fitOutIcons = {
  outlets: PlugZap,
  floors: Layers3,
  hvac: Fan,
  fire: Flame,
  security: LockKeyhole,
  plumbing: Droplets,
}

const fitOutImages = [
  FitOutImageOne,
  FitOutImageTwo,
  FitOutImageThree,
  FitOutImageFour,
  FitOutImageFive,
  FitOutImageSix,
].map((image) => image?.src || image)

const assetSrc = (image) => image?.src || image || ''

const DivisionsBuildingsSection = ({ content }) => {
  const sectionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.08,
    margin: '0px 0px -7% 0px',
  })
  const [activeFitOutSlide, setActiveFitOutSlide] = useState(0)

  useEffect(() => {
    fitOutImages.forEach((src) => {
      const image = new window.Image()
      image.src = src
    })
  }, [])

  useEffect(() => {
    if (!content || shouldReduceMotion || !isInView) return undefined

    const timer = window.setTimeout(() => {
      setActiveFitOutSlide((current) => (current + 1) % fitOutImages.length)
    }, 5000)

    return () => window.clearTimeout(timer)
  }, [activeFitOutSlide, content, isInView, shouldReduceMotion])

  if (!content) return null

  const motionProps = getDivisionMotionProps(shouldReduceMotion, isInView)
  const primaryImage = assetSrc(BuildingImageOne)
  const secondaryImage = assetSrc(BuildingImageTwo)
  const electricalImage = assetSrc(ElectricalImage)
  const fitOutImage = fitOutImages[activeFitOutSlide]

  return (
    <AnimatedSection
      id="buildings-factories"
      className="divisions-buildings section-padding"
      amount={0.05}
    >
      <div className="divisions-buildings-bg" aria-hidden="true">
        <span className="divisions-buildings-grid" />
        <span className="divisions-buildings-arc divisions-buildings-arc-one" />
        <span className="divisions-buildings-arc divisions-buildings-arc-two" />
      </div>

      <div className="container divisions-buildings-container" ref={sectionRef}>
        <motion.div className="divisions-buildings-hero" variants={divisionStagger} {...motionProps}>
          <motion.div className="divisions-buildings-copy" variants={divisionFadeLeft}>
            <span className="divisions-section-kicker">
              <Building2 size={17} aria-hidden="true" />
              {content.eyebrow}
            </span>
            <h2>{content.title}</h2>
            <p>{content.intro}</p>

            <div className="divisions-buildings-system">
              <span className="divisions-buildings-system-icon" aria-hidden="true">
                <Factory size={25} />
              </span>
              <div>
                <span>{content.visualLabel}</span>
                <strong>{content.visualValue}</strong>
              </div>
              <ArrowUpRight size={18} aria-hidden="true" />
            </div>
          </motion.div>

          <motion.div className="divisions-buildings-visual" variants={divisionFadeRight}>
            <figure className="divisions-buildings-photo divisions-buildings-photo-main">
              {primaryImage ? <img src={primaryImage} alt={`${content.title} project delivery`} loading="lazy" decoding="async" /> : null}
              <span className="divisions-buildings-photo-shade" aria-hidden="true" />
              <figcaption>
                <span>01</span>
                <strong>{content.title}</strong>
              </figcaption>
            </figure>

            <figure className="divisions-buildings-photo divisions-buildings-photo-secondary">
              {secondaryImage ? <img src={secondaryImage} alt={content.electrical.title} loading="lazy" decoding="async" /> : null}
              <span className="divisions-buildings-photo-shade" aria-hidden="true" />
              <figcaption>
                <span>MEP</span>
                <strong>{content.electrical.title}</strong>
              </figcaption>
            </figure>

            <span className="divisions-buildings-measurement" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
          </motion.div>
        </motion.div>

        <motion.div className="divisions-buildings-dossier" variants={divisionStagger} {...motionProps}>
          <motion.aside className="divisions-buildings-dossier-head" variants={divisionFadeLeft}>
            <span className="divisions-section-kicker">
              <Zap size={17} aria-hidden="true" />
              {content.electrical.eyebrow}
            </span>
            <h3>{content.electrical.title}</h3>
            <p>{content.electrical.intro}</p>
            <small>{content.electrical.supportingText}</small>

            {electricalImage ? (
              <figure className="divisions-buildings-dossier-image" aria-hidden="true">
                <img src={electricalImage} alt="" loading="lazy" decoding="async" />
                <span className="divisions-buildings-dossier-image-shade" />
                <figcaption>
                  <Zap size={19} />
                  <span>{content.electrical.eyebrow}</span>
                </figcaption>
              </figure>
            ) : null}
          </motion.aside>

          <div className="divisions-buildings-electrical-grid">
            {content.electrical.groups.map((group, index) => {
              const Icon = electricalIcons[group.icon] || Zap

              return (
                <motion.article
                  className={`divisions-buildings-electrical-card ${group.columns === 2 ? 'is-wide' : ''}`}
                  key={group.title}
                  variants={divisionFadeUp}
                >
                  <header>
                    <span className="divisions-buildings-card-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="divisions-buildings-card-icon" aria-hidden="true"><Icon size={25} /></span>
                  </header>
                  <h4>{group.title}</h4>
                  <ul className={group.columns === 2 ? 'is-two-columns' : ''}>
                    {group.items.map((item, itemIndex) => (
                      <li key={`${item}-${itemIndex}`}>
                        <span aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="divisions-buildings-card-signal" aria-hidden="true"><i /></span>
                </motion.article>
              )
            })}
          </div>
        </motion.div>

        <motion.div className="divisions-buildings-mechanical" variants={divisionStagger} {...motionProps}>
          <motion.header className="divisions-buildings-mechanical-head" variants={divisionFadeLeft}>
            <span className="divisions-section-kicker">
              <Wrench size={17} aria-hidden="true" />
              {content.mechanical.eyebrow}
            </span>
            <h3>{content.mechanical.title}</h3>
            <p>{content.mechanical.intro}</p>
          </motion.header>

          <motion.article className="divisions-buildings-piped" variants={divisionFadeUp}>
            <div className="divisions-buildings-panel-head">
              <span aria-hidden="true"><Droplets size={27} /></span>
              <h4>{content.mechanical.piped.title}</h4>
            </div>
            <ul>
              {content.mechanical.piped.items.map((item, itemIndex) => (
                <li key={`${item}-${itemIndex}`}>
                  <ShieldCheck size={15} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article className="divisions-buildings-hvac" variants={divisionFadeRight}>
            <div className="divisions-buildings-panel-head">
              <span aria-hidden="true"><Fan size={27} /></span>
              <h4>{content.mechanical.hvac.title}</h4>
            </div>
            <div className="divisions-buildings-hvac-grid">
              {content.mechanical.hvac.sectors.map((sector, index) => (
                <article key={sector.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h5>{sector.title}</h5>
                  <p>{sector.text}</p>
                </article>
              ))}
            </div>
          </motion.article>
        </motion.div>

        <motion.div className="divisions-buildings-fitout" variants={divisionStagger} {...motionProps}>
          <motion.div className="divisions-buildings-fitout-copy" variants={divisionFadeLeft}>
            <span className="divisions-section-kicker">
              <Sparkles size={17} aria-hidden="true" />
              {content.fitOut.eyebrow}
            </span>
            <h3>{content.fitOut.title}</h3>
            <p>{content.fitOut.intro}</p>

            <div className="divisions-buildings-fitout-grid">
              {content.fitOut.items.map((item, index) => {
                const Icon = fitOutIcons[item.icon] || Wrench

                return (
                  <motion.article key={item.title} variants={divisionFadeUp}>
                    <span className="divisions-buildings-fitout-icon" aria-hidden="true"><Icon size={23} /></span>
                    <strong>{item.title}</strong>
                    <small>{String(index + 1).padStart(2, '0')}</small>
                  </motion.article>
                )
              })}
            </div>
          </motion.div>

          <motion.figure className="divisions-buildings-fitout-photo" variants={divisionFadeRight}>
            <AnimatePresence initial={false}>
              {fitOutImage ? (
                <motion.img
                  key={fitOutImage}
                  className="divisions-buildings-fitout-slide"
                  src={fitOutImage}
                  alt={content.fitOut?.title || 'Fit-Out Works'}
                  decoding="async"
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.015 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                />
              ) : null}
            </AnimatePresence>
            <span aria-hidden="true" />
            <div className="divisions-buildings-fitout-pagination" role="group" aria-label="Fit-Out Works slides">
              {fitOutImages.map((_, index) => (
                <button
                  key={`fit-out-slide-${index + 1}`}
                  type="button"
                  className={index === activeFitOutSlide ? 'is-active' : ''}
                  onClick={() => setActiveFitOutSlide(index)}
                  aria-label={`Show Fit-Out Works slide ${index + 1}`}
                  aria-pressed={index === activeFitOutSlide}
                />
              ))}
            </div>
            <figcaption>
              <span>{content.fitOut.eyebrow}</span>
              <strong>{content.fitOut.title}</strong>
            </figcaption>
          </motion.figure>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

export default DivisionsBuildingsSection
