'use client'

import { motion, useReducedMotion } from 'motion/react'
import {
  ArrowDown,
  ArrowRight,
  BatteryCharging,
  Building2,
  Check,
  Factory,
  Gauge,
  Globe2,
  Leaf,
  Recycle,
  SearchCheck,
  ShieldCheck,
  SunMedium,
  Wind,
  Zap,
} from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection.jsx'
import ShinyText from '@/components/ui/ShinyText.jsx'
import renewableHeroImage from '@/assets/images/landing/renewable-energy.webp'
import renewableLifecycleImage from '@/assets/images/landing/renewable-energy-small.webp'
import energyProject1 from '@/assets/images/renewable-energy/energy-1.webp'
import energyProject2 from '@/assets/images/renewable-energy/energy-2.webp'
import energyProject3 from '@/assets/images/renewable-energy/energy-3.webp'
import energyProject4 from '@/assets/images/renewable-energy/energy-4.webp'
import energyProject5 from '@/assets/images/renewable-energy/energy-5.webp'
import energyProject6 from '@/assets/images/renewable-energy/energy-6.webp'
import LocalizedLink from '@/components/navigation/LocalizedLink.jsx'
import './RenewableEnergyPage.css'

const solutionIcons = {
  solar: SunMedium,
  storage: BatteryCharging,
  biomass: Recycle,
  wind: Wind,
  audit: SearchCheck,
}

const lifecycleIcons = [SearchCheck, Gauge, Zap, Building2, ShieldCheck]

const trackRecordImages = [
  energyProject1,
  energyProject2,
  energyProject3,
  energyProject4,
  energyProject5,
  energyProject6,
]

const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

const revealUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.56, ease: [0.16, 1, 0.3, 1] },
  },
}

const scrollToId = (id) => {
  if (typeof document === 'undefined') return
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const RenewableEnergyPage = ({ content, locale = 'en' }) => {
  const shouldReduceMotion = useReducedMotion()
  const motionState = shouldReduceMotion
    ? { initial: false, whileInView: 'visible' }
    : { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.16 } }

  return (
    <main className="renewable-page" lang={locale}>
      <section className="renewable-hero" aria-labelledby="renewable-hero-title">
        <img
          className="renewable-hero-image"
          src={renewableHeroImage.src}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <span className="renewable-hero-overlay" aria-hidden="true" />
        <span className="renewable-hero-grid" aria-hidden="true" />
        <span className="renewable-hero-orbit renewable-hero-orbit-one" aria-hidden="true" />
        <span className="renewable-hero-orbit renewable-hero-orbit-two" aria-hidden="true" />

        <div className="container renewable-hero-inner">
          <motion.div
            className="renewable-hero-copy"
            variants={sectionVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate="visible"
          >
            <motion.div className="renewable-hero-kicker" variants={revealUp}>
              <span className="renewable-live-dot" aria-hidden="true" />
              <span>{content.hero.eyebrow}</span>
            </motion.div>

            <motion.h1 id="renewable-hero-title" variants={revealUp}>
              <ShinyText
                text={content.hero.title}
                speed={5.5}
                disabled={shouldReduceMotion}
                className="renewable-title-shine"
              />
            </motion.h1>
            <motion.p className="renewable-hero-tagline" variants={revealUp}>
              {content.hero.tagline}
            </motion.p>
            <motion.div className="renewable-hero-actions" variants={revealUp}>
              <button
                type="button"
                className="renewable-button renewable-button-primary"
                onClick={() => scrollToId(content.hero.primaryCta.target)}
              >
                <span>{content.hero.primaryCta.label}</span>
                <ArrowDown size={18} aria-hidden="true" />
              </button>
              <LocalizedLink className="renewable-button renewable-button-ghost" href={content.hero.secondaryCta.href}>
                <span>{content.hero.secondaryCta.label}</span>
                <ArrowRight size={18} aria-hidden="true" />
              </LocalizedLink>
            </motion.div>
          </motion.div>

          <motion.aside
            className="renewable-hero-energy-card"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 30, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.72, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            aria-label={content.solutions.eyebrow}
          >
            <div className="renewable-energy-card-head">
              <span className="renewable-energy-icon"><Zap size={19} aria-hidden="true" /></span>
              <span>{locale === 'fr' ? 'Écosystème énergétique' : 'Energy ecosystem'}</span>
            </div>
            <div className="renewable-energy-flow" aria-hidden="true">
              <span className="renewable-energy-line" />
              <div><SunMedium size={22} /><small>{locale === 'fr' ? 'Solaire' : 'Solar'}</small></div>
              <div><BatteryCharging size={22} /><small>{locale === 'fr' ? 'Stockage' : 'Storage'}</small></div>
              <div><Factory size={22} /><small>{locale === 'fr' ? 'Industrie' : 'Industry'}</small></div>
            </div>
            <div className="renewable-energy-card-foot">
              <span>{locale === 'fr' ? 'Conçu pour la continuité' : 'Engineered for continuity'}</span>
              <Leaf size={18} aria-hidden="true" />
            </div>
          </motion.aside>
        </div>

        <button
          type="button"
          className="renewable-hero-scroll"
          onClick={() => scrollToId('renewable-overview')}
          aria-label={content.overview.eyebrow}
        >
          <span>{locale === 'fr' ? 'Découvrir' : 'Discover'}</span>
          <ArrowDown size={17} aria-hidden="true" />
        </button>
      </section>

      <AnimatedSection id="renewable-overview" className="renewable-overview renewable-section">
        <span className="renewable-overview-orbit renewable-overview-orbit-one" aria-hidden="true" />
        <span className="renewable-overview-orbit renewable-overview-orbit-two" aria-hidden="true" />
        <span className="renewable-overview-orbit renewable-overview-orbit-three" aria-hidden="true" />
        <div className="container">
          <motion.div className="renewable-editorial-heading" variants={sectionVariants} {...motionState}>
            <motion.div className="renewable-section-index" variants={revealUp}>
              <span>01</span><i aria-hidden="true" />
            </motion.div>
            <motion.div className="renewable-heading-copy" variants={revealUp}>
              <span className="renewable-kicker">{content.overview.eyebrow}</span>
              <h2>{content.overview.heading}</h2>
            </motion.div>
          </motion.div>

          <div className="renewable-overview-grid">
            <motion.article className="renewable-overview-story" variants={sectionVariants} {...motionState}>
              <motion.div className="renewable-overview-story-head" variants={revealUp}>
                <span className="renewable-overview-badge"><Leaf size={16} aria-hidden="true" />{content.overview.featureLabel}</span>
                <span className="renewable-overview-partner"><Globe2 size={16} aria-hidden="true" />Lambert × Phoenix Energy</span>
              </motion.div>

              <motion.p className="renewable-overview-lead" variants={revealUp}>
                {content.overview.featured}
              </motion.p>

              <motion.div className="renewable-overview-supporting" variants={revealUp}>
                {content.overview.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </motion.div>

              <motion.div className="renewable-delivery-block" variants={revealUp}>
                <span className="renewable-delivery-label">{content.overview.modelsLabel}</span>
                <div className="renewable-delivery-models">
                  {content.overview.deliveryModels.map((model) => <span key={model}>{model}</span>)}
                </div>
              </motion.div>
            </motion.article>

            <motion.aside className="renewable-lifecycle-panel" variants={sectionVariants} {...motionState}>
              <motion.div className="renewable-lifecycle-head" variants={revealUp}>
                <div>
                  <span>{content.overview.lifecycleLabel}</span>
                  <strong>{String(content.overview.lifecycle.length).padStart(2, '0')} {locale === 'fr' ? 'étapes' : 'steps'}</strong>
                </div>
                <span className="renewable-lifecycle-mark"><Zap size={18} aria-hidden="true" /></span>
              </motion.div>

              <div className="renewable-lifecycle">
                <span className="renewable-lifecycle-line" aria-hidden="true" />
                {content.overview.lifecycle.map((item, index) => {
                  const Icon = lifecycleIcons[index % lifecycleIcons.length]
                  return (
                    <motion.div className="renewable-lifecycle-step" key={item} variants={revealUp}>
                      <span className="renewable-lifecycle-icon"><Icon size={20} aria-hidden="true" /></span>
                      <div>
                        <small>{String(index + 1).padStart(2, '0')}</small>
                        <strong>{item}</strong>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <motion.figure className="renewable-lifecycle-media" variants={revealUp}>
                <img
                  src={renewableLifecycleImage.src}
                  alt={content.overview.lifecycleLabel}
                  loading="lazy"
                  decoding="async"
                />
                <span className="renewable-lifecycle-media-sheen" aria-hidden="true" />
              </motion.figure>
            </motion.aside>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="renewable-solutions" className="renewable-solutions renewable-section">
        <div className="container">
          <motion.div className="renewable-editorial-heading renewable-editorial-heading-split" variants={sectionVariants} {...motionState}>
            <motion.div className="renewable-section-index" variants={revealUp}>
              <span>02</span><i aria-hidden="true" />
            </motion.div>
            <motion.div className="renewable-heading-copy" variants={revealUp}>
              <span className="renewable-kicker">{content.solutions.eyebrow}</span>
              <h2>{content.solutions.heading}</h2>
            </motion.div>
          </motion.div>

          <motion.div className="renewable-solutions-grid" variants={sectionVariants} {...motionState}>
            {content.solutions.items.map((solution, index) => {
              const Icon = solutionIcons[solution.key] || Zap
              return (
                <motion.article
                  className={`renewable-solution-card renewable-solution-card-${solution.key}`}
                  key={solution.title}
                  variants={revealUp}
                  whileHover={shouldReduceMotion ? undefined : { y: -7 }}
                  transition={{ duration: 0.24 }}
                >
                  <div className="renewable-solution-card-top">
                    <span className="renewable-solution-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="renewable-solution-icon"><Icon size={24} aria-hidden="true" /></span>
                  </div>
                  <h3>{solution.title}</h3>
                  <p>{solution.description}</p>
                  {solution.bullets?.length ? (
                    <ul>
                      {solution.bullets.map((bullet) => (
                        <li key={bullet}><Check size={15} aria-hidden="true" /><span>{bullet}</span></li>
                      ))}
                    </ul>
                  ) : null}
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="renewable-why" className="renewable-why renewable-section">
        <div className="renewable-why-glow" aria-hidden="true" />
        <div className="container">
          <motion.div className="renewable-why-heading" variants={sectionVariants} {...motionState}>
            <motion.div variants={revealUp}>
              <div className="renewable-section-index renewable-section-index-dark">
                <span>03</span><i aria-hidden="true" />
              </div>
              <span className="renewable-kicker">{content.whyLambert.eyebrow}</span>
              <h2>{content.whyLambert.heading}</h2>
            </motion.div>
            <motion.div className="renewable-partnership-card" variants={revealUp}>
              <Globe2 size={22} aria-hidden="true" />
              <p>{content.whyLambert.partnership}</p>
            </motion.div>
          </motion.div>

          <motion.div className="renewable-stats-grid" variants={sectionVariants} {...motionState}>
            {content.whyLambert.stats.map((stat) => (
              <motion.article className="renewable-stat-card" key={stat.value} variants={revealUp}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </motion.article>
            ))}
          </motion.div>

          <motion.div className="renewable-partners-panel" variants={sectionVariants} {...motionState}>
            <motion.p variants={revealUp}>{content.whyLambert.partnersIntro}</motion.p>
            <motion.div className="renewable-partner-list" variants={revealUp}>
              {content.whyLambert.partners.map((partner) => <span key={partner}>{partner}</span>)}
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="renewable-track-record" className="renewable-track renewable-section">
        <div className="container">
          <motion.div className="renewable-track-heading" variants={sectionVariants} {...motionState}>
            <motion.div className="renewable-section-index" variants={revealUp}>
              <span>04</span><i aria-hidden="true" />
            </motion.div>
            <motion.div className="renewable-heading-copy" variants={revealUp}>
              <span className="renewable-kicker">{content.trackRecord.eyebrow}</span>
              <h2>{content.trackRecord.heading}</h2>
              <p>{content.trackRecord.intro}</p>
            </motion.div>
          </motion.div>

          <motion.div className="renewable-project-grid" variants={sectionVariants} {...motionState}>
            {content.trackRecord.projects.map((project, index) => {
              const projectImage = trackRecordImages[index]

              return (
                <motion.article
                  className="renewable-project-card"
                  key={`${project.value}-${project.location}`}
                  variants={revealUp}
                  tabIndex={0}
                >
                  <div className="renewable-project-card-inner">
                    <div className="renewable-project-face renewable-project-front">
                      <span className="renewable-project-index">{String(index + 1).padStart(2, '0')}</span>
                      <div className="renewable-project-copy">
                        <strong>{project.value}</strong>
                        <h3>{project.label}</h3>
                        <p>{project.location}</p>
                      </div>
                    </div>

                    <div className="renewable-project-face renewable-project-back" aria-hidden="true">
                      {projectImage ? (
                        <img
                          className="renewable-project-image"
                          src={projectImage.src}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                      ) : null}
                      <span className="renewable-project-image-overlay" aria-hidden="true" />
                      <span className="renewable-project-index">{String(index + 1).padStart(2, '0')}</span>
                      <div className="renewable-project-copy">
                        <strong>{project.value}</strong>
                        <h3>{project.label}</h3>
                        <p>{project.location}</p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="renewable-contact" className="renewable-cta-section">
        <div className="container">
          <motion.div className="renewable-cta-card" variants={sectionVariants} {...motionState}>
            <span className="renewable-cta-orbit renewable-cta-orbit-one" aria-hidden="true" />
            <span className="renewable-cta-orbit renewable-cta-orbit-two" aria-hidden="true" />
            <motion.div className="renewable-cta-icon" variants={revealUp}><Leaf size={28} aria-hidden="true" /></motion.div>
            <motion.span className="renewable-kicker" variants={revealUp}>{content.cta.eyebrow}</motion.span>
            <motion.h2 variants={revealUp}>{content.cta.heading}</motion.h2>
            <motion.p variants={revealUp}>{content.cta.description}</motion.p>
            <motion.div variants={revealUp}>
              <LocalizedLink className="renewable-button renewable-button-light" href={content.cta.href}>
                <span>{content.cta.label}</span>
                <ArrowRight size={18} aria-hidden="true" />
              </LocalizedLink>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>
    </main>
  )
}

export default RenewableEnergyPage
