'use client'

import { useRef } from 'react'
import LocalizedLink from '@/components/navigation/LocalizedLink.jsx'
import { motion, useInView, useReducedMotion } from 'motion/react'
import AnimatedSection from '@/components/ui/AnimatedSection.jsx'
import {
  BatteryCharging,
  Cable,
  Factory,
  Flame,
  Gauge,
  Leaf,
  Server,
  Sun,
  Wrench,
  Zap,
} from 'lucide-react'
import './HomeDivisionsSection.css'


const revealContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
}

const revealUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
  },
}

const revealCard = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.56, ease: [0.22, 1, 0.36, 1] },
  },
}

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M5 12h12.2m-5.1-5.2L17.3 12l-5.2 5.2" />
  </svg>
)

const DivisionIcon = ({ type }) => {
  if (type === 'data') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5.2 5.2h13.6v13.6H5.2z" />
        <path d="M9 9h6v6H9z" />
        <path d="M8 2.8v2.4M12 2.8v2.4M16 2.8v2.4M8 18.8v2.4M12 18.8v2.4M16 18.8v2.4M2.8 8h2.4M2.8 12h2.4M2.8 16h2.4M18.8 8h2.4M18.8 12h2.4M18.8 16h2.4" />
      </svg>
    )
  }

  if (type === 'power') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M13.2 2.8 5.6 13.1h5.8l-.8 8.1 7.8-10.9h-5.7l.5-7.5Z" />
      </svg>
    )
  }

  if (type === 'renewable') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 3.2v2.2M12 18.6v2.2M3.2 12h2.2M18.6 12h2.2M5.8 5.8l1.55 1.55M16.65 16.65l1.55 1.55M18.2 5.8l-1.55 1.55M7.35 16.65 5.8 18.2" />
        <circle cx="12" cy="12" r="4.2" />
        <path d="M8.6 15.6 6.9 20.8h10.2l-1.7-5.2M8 18.2h8M10.2 15.9l-.7 4.9M13.8 15.9l.7 4.9" />
      </svg>
    )
  }

  if (type === 'oil') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 21.2c3.6 0 6.4-2.5 6.4-6.1 0-3.8-3.7-7.7-6.4-12.3C9.3 7.4 5.6 11.3 5.6 15.1c0 3.6 2.8 6.1 6.4 6.1Z" />
        <path d="M9.5 15.8c.3 1.4 1.4 2.3 2.8 2.3" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4.2 20.4h15.6" />
      <path d="M6.1 20.4V7.9l5.9-3.2 5.9 3.2v12.5" />
      <path d="M9 20.4v-5.3h6v5.3" />
      <path d="M9 9.7h.1M12 9.7h.1M15 9.7h.1M9 12.4h.1M12 12.4h.1M15 12.4h.1" />
    </svg>
  )
}

const capabilityIconMap = {
  electrical: Zap,
  mechanical: Wrench,
  'data-infrastructure': Server,
  'telecom-cabling': Cable,
  thermal: Flame,
  green: Leaf,
  solar: Sun,
  battery: BatteryCharging,
  'oil-process': Gauge,
  'modular-refinery': Factory,
}

const CapabilityIcon = ({ type }) => {
  const Icon = capabilityIconMap[type] || Wrench
  return <Icon aria-hidden="true" focusable="false" />
}


const divisionThemeMap = {
  buildings: {
    accent: '#48A750',
    accentDark: '#1E6B34',
    accentRgb: '72, 167, 80',
    cardTint: '#EAF7ED',
    bgStart: '#55B95F',
    bgMid: '#329247',
    bgEnd: '#174B2A',
    bgRgb: '50, 146, 71',
    foreground: '#FFFFFF',
    muted: 'rgba(255, 255, 255, 0.82)',
    pillBg: 'rgba(255, 255, 255, 0.92)',
    pillText: '#1F4E2B',
  },
  data: {
    accent: '#7B947F',
    accentDark: '#405548',
    accentRgb: '123, 148, 127',
    cardTint: '#EEF3EF',
    bgStart: '#879A88',
    bgMid: '#667A69',
    bgEnd: '#35453B',
    bgRgb: '102, 122, 105',
    foreground: '#FFFFFF',
    muted: 'rgba(255, 255, 255, 0.8)',
    pillBg: 'rgba(255, 255, 255, 0.9)',
    pillText: '#33443A',
  },
  power: {
    accent: '#4F9B65',
    accentDark: '#2C673F',
    accentRgb: '79, 155, 101',
    cardTint: '#E7F4EA',
    bgStart: '#76B985',
    bgMid: '#4F8B61',
    bgEnd: '#244F35',
    bgRgb: '79, 139, 97',
    foreground: '#FFFFFF',
    muted: 'rgba(255, 255, 255, 0.84)',
    pillBg: 'rgba(255, 255, 255, 0.92)',
    pillText: '#254A32',
  },
  renewable: {
    accent: '#79D985',
    accentDark: '#1E7B3B',
    accentRgb: '121, 217, 133',
    cardTint: '#E9F9EC',
    bgStart: '#2C8E48',
    bgMid: '#176735',
    bgEnd: '#0C3A24',
    bgRgb: '44, 142, 72',
    foreground: '#FFFFFF',
    muted: 'rgba(255, 255, 255, 0.84)',
    pillBg: 'rgba(245, 255, 247, 0.94)',
    pillText: '#174B2A',
  },
  oil: {
    accent: '#777B80',
    accentDark: '#383A3D',
    accentRgb: '119, 123, 128',
    cardTint: '#F1F2F2',
    bgStart: '#85888C',
    bgMid: '#5B5F64',
    bgEnd: '#2D3034',
    bgRgb: '91, 95, 100',
    foreground: '#FFFFFF',
    muted: 'rgba(255, 255, 255, 0.8)',
    pillBg: 'rgba(255, 255, 255, 0.91)',
    pillText: '#373A3E',
  },
}

const getDivisionThemeStyle = (key) => {
  const theme = divisionThemeMap[key] || divisionThemeMap.buildings

  return {
    '--division-accent': theme.accent,
    '--division-accent-dark': theme.accentDark,
    '--division-accent-rgb': theme.accentRgb,
    '--division-card-tint': theme.cardTint,
    '--division-bg-start': theme.bgStart,
    '--division-bg-mid': theme.bgMid,
    '--division-bg-end': theme.bgEnd,
    '--division-bg-rgb': theme.bgRgb,
    '--division-foreground': theme.foreground,
    '--division-muted': theme.muted,
    '--division-pill-bg': theme.pillBg,
    '--division-pill-text': theme.pillText,
  }
}

const HomeDivisionsSection = ({ content }) => {
  const shouldReduceMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.02, margin: '0px 0px 4% 0px' })

  if (!content) return null

  const divisions = content.items || []
  const motionProps = shouldReduceMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  return (
    <AnimatedSection
      className="home-divisions-section section-padding"
      amount={0.02}
      margin="0px 0px 4% 0px"
    >
      <div className="home-divisions-bg" aria-hidden="true">
        <span className="home-divisions-grid" />
        <span className="home-divisions-glow home-divisions-glow-one" />
        <span className="home-divisions-glow home-divisions-glow-two" />
        <span className="home-divisions-dots home-divisions-dots-one" />
        <span className="home-divisions-dots home-divisions-dots-two" />
      </div>

      <div className="container home-divisions-container" ref={sectionRef}>
        <motion.div className="home-divisions-heading" variants={revealContainer} {...motionProps}>
          {content.eyebrow ? <motion.span className="section-kicker" variants={revealUp}>{content.eyebrow}</motion.span> : null}
          <motion.h2 variants={revealUp}>{content.title}</motion.h2>
          {content.description ? <motion.p variants={revealUp}>{content.description}</motion.p> : null}
        </motion.div>

        <motion.div className="home-divisions-grid-layout" variants={revealContainer} {...motionProps}>
          {divisions.map((division, index) => (
            <motion.article
              className={`home-division-card home-division-card-${division.key || index}`}
              variants={revealCard}
              key={division.key || division.title}
              style={{ '--division-index': index + 1, ...getDivisionThemeStyle(division.key) }}
            >
              <span className="home-division-energy-orb" aria-hidden="true" />
              <div className="home-division-content">
                <div className="home-division-card-top">
                  <span className="home-division-icon">
                    <DivisionIcon type={division.key} />
                  </span>
                  <span className="home-division-index">0{index + 1}</span>
                </div>

                <div className="home-division-main">
                  {division.kicker ? <span className="home-division-kicker">{division.kicker}</span> : null}
                  <h3>{division.title}</h3>
                  <p>{division.description}</p>
                </div>

                {division.capabilities?.length ? (
                  <div className="home-division-capabilities" aria-label={content.capabilitiesLabel || 'Capabilities'}>
                    {division.capabilities.map((capability, capabilityIndex) => (
                      <span
                        className={`home-division-pill home-division-feature home-division-feature-${capability.type || division.key}`}
                        key={capability.label}
                        style={{ '--feature-index': capabilityIndex }}
                      >
                        <span className="home-division-feature-icon">
                          <CapabilityIcon type={capability.type || division.key} />
                        </span>
                        <span className="home-division-feature-label">{capability.label}</span>
                      </span>
                    ))}
                  </div>
                ) : null}

                {division.note ? <p className="home-division-note">{division.note}</p> : null}

                <LocalizedLink className="home-division-link" href={division.href || '/divisions'}>
                  <span>{division.ctaLabel || content.ctaLabel || 'Explore'}</span>
                  <ArrowIcon />
                </LocalizedLink>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {content.footerNote ? (
          <motion.div className="home-divisions-footer-note" variants={revealUp} initial="hidden" animate={shouldReduceMotion || isInView ? 'visible' : 'hidden'}>
            <span>{content.footerNote}</span>
          </motion.div>
        ) : null}
      </div>
    </AnimatedSection>
  )
}

export default HomeDivisionsSection
