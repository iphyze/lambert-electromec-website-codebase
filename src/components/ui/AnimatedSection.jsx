'use client'

import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'

const AnimatedSection = ({
  children,
  className = '',
  delay = 0,
  amount = 0.16,
  margin = '0px 0px -7% 0px',
  ...sectionProps
}) => {
  const shouldReduceMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, {
    once: false,
    amount,
    margin,
  })
  const shouldShow = shouldReduceMotion || isInView
  const sectionClassName = [
    className,
    'animated-section',
    shouldShow ? 'is-section-visible' : 'is-section-resting',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <motion.section
      {...sectionProps}
      ref={sectionRef}
      className={sectionClassName}
      data-section-visible={shouldShow ? 'true' : 'false'}
      initial={false}
      animate={shouldShow
        ? { opacity: 1, y: 0, scale: 1 }
        : { opacity: 0, y: 26, scale: 0.992 }}
      transition={{
        duration: 0.64,
        ease: [0.16, 1, 0.3, 1],
        delay,
        opacity: { duration: 0.5, ease: 'easeOut', delay },
      }}
    >
      {children}
    </motion.section>
  )
}

export default AnimatedSection
