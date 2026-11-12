'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import AnimatedSection from '@/components/ui/AnimatedSection.jsx'


const revealContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
}

const revealUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const revealCard = {
  hidden: { opacity: 0, y: 20, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.54, ease: [0.22, 1, 0.36, 1] },
  },
}

const formatNumber = (value) => new Intl.NumberFormat('en-US').format(value || 0)

const CountNumber = ({ value = 0, suffix = '', isActive = false, duration = 1750 }) => {
  const shouldReduceMotion = useReducedMotion()
  const [count, setCount] = useState(value)
  const [isComplete, setIsComplete] = useState(true)
  const lastEmittedRef = useRef({ value: -1, time: 0 })
  const formattedValue = `${formatNumber(count)}${suffix}`

  useEffect(() => {
    let frameId = 0

    if (shouldReduceMotion) {
      setCount(value)
      setIsComplete(true)
      return undefined
    }

    if (!isActive) {
      return undefined
    }

    setCount(0)
    setIsComplete(false)
    const startedAt = performance.now()

    const tick = (time) => {
      const progress = Math.min((time - startedAt) / duration, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      const nextCount = Math.round(value * easedProgress)
      const lastEmitted = lastEmittedRef.current
      const shouldEmit = progress >= 1 || nextCount !== lastEmitted.value || time - lastEmitted.time > 52

      if (shouldEmit) {
        lastEmittedRef.current = { value: nextCount, time }
        setCount(nextCount)
      }

      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      } else {
        lastEmittedRef.current = { value, time }
        setCount(value)
        setIsComplete(true)
      }
    }

    frameId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frameId)
  }, [duration, isActive, shouldReduceMotion, value])

  return (
    <span className={`home-number-value${isComplete ? ' is-complete' : ''}`}>
      <span className="home-number-base">{formattedValue}</span>
      {isComplete ? (
        <span className="home-number-shine" aria-hidden="true">
          {formattedValue}
        </span>
      ) : null}
    </span>
  )
}

const StatIcon = ({ type }) => {
  if (type === 'staff') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M8.2 11.2a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6Z" />
        <path d="M2.8 20.1c.6-3.8 2.5-6.1 5.4-6.1s4.8 2.3 5.4 6.1" />
        <path d="M16.4 10.3a2.8 2.8 0 1 0 0-5.6" />
        <path d="M14.8 14.2c2.9.3 4.9 2.3 5.5 5.9" />
      </svg>
    )
  }

  if (type === 'partners') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M7.8 12.7 5.5 15a3 3 0 0 0 4.2 4.2l2.2-2.2" />
        <path d="m12.1 7 2.2-2.2A3 3 0 0 1 18.5 9l-2.3 2.3" />
        <path d="m8.9 15.1 6.2-6.2" />
        <path d="M3.5 6.3h3.2" />
        <path d="M17.3 17.7h3.2" />
      </svg>
    )
  }

  if (type === 'cities') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 21s6.2-5.1 6.2-11.1A6.2 6.2 0 0 0 5.8 9.9C5.8 15.9 12 21 12 21Z" />
        <path d="M12 12.2a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4.2 20.2h15.6" />
      <path d="M6.2 20.2V8.4l5.8-3.2 5.8 3.2v11.8" />
      <path d="M9.3 20.2v-5.4h5.4v5.4" />
      <path d="M9.1 10.2h.1" />
      <path d="M12 10.2h.1" />
      <path d="M14.9 10.2h.1" />
    </svg>
  )
}

const HomeCompanyNumbersSection = ({ content }) => {
  const shouldReduceMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.18, margin: '0px 0px -8% 0px' })
  const stats = useMemo(() => content?.stats || [], [content])
  const shouldAnimateSection = shouldReduceMotion || isInView

  if (!content) return null

  const animationState = shouldAnimateSection ? 'visible' : 'hidden'

  return (
    <AnimatedSection className="home-numbers-section section-padding">
      <div className="home-numbers-bg" aria-hidden="true">
        <span className="home-numbers-glow home-numbers-glow-one" />
        <span className="home-numbers-glow home-numbers-glow-two" />
        <span className="home-numbers-grid-pattern" />
      </div>

      <div className="container home-numbers-container" ref={sectionRef}>
        <motion.div
          className="home-numbers-heading"
          variants={revealContainer}
          initial="hidden"
          animate={animationState}
        >
          {content.eyebrow ? <motion.span className="section-kicker" variants={revealUp}>{content.eyebrow}</motion.span> : null}
          <motion.h2 variants={revealUp}>{content.title}</motion.h2>
          {content.description ? <motion.p variants={revealUp}>{content.description}</motion.p> : null}
        </motion.div>

        <motion.div
          className="home-numbers-panel"
          variants={revealContainer}
          initial="hidden"
          animate={animationState}
        >
          {stats.map((stat, index) => (
            <motion.article
              className="home-number-card"
              variants={revealCard}
              key={stat.key || index}
              style={{ '--number-shine-delay': `${index * 0.18}s` }}
            >
              <div className="home-number-card-topline">
                <span className="home-number-icon">
                  <StatIcon type={stat.key} />
                </span>
                <span className="home-number-index">0{index + 1}</span>
              </div>

              <div className="home-number-countline">
                <CountNumber
                  value={stat.value}
                  suffix={stat.suffix || ''}
                  isActive={shouldAnimateSection}
                />
              </div>

              <h3>{stat.label}</h3>
              {stat.description ? <p>{stat.description}</p> : null}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

export default HomeCompanyNumbersSection
