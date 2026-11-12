const divisionImages = {
  slider1: '/images/home-slides/Slider-1.webp',
  slider2: '/images/home-slides/Slider-2.webp',
  slider3: '/images/home-slides/Slider-3.webp',
  slider4: '/images/home-slides/Slider-4.webp',
  slider5: '/images/home-slides/Slider-5.webp',
  slider6: '/images/home-slides/Slider-6.webp',
  slider7: '/images/home-slides/Slider-7.webp',
  slider8: '/images/home-slides/Slider-8.webp',
  slider9: '/images/home-slides/Slider-9.webp',
}

const normalizeImageName = (value = '') =>
  value.toLowerCase().replace(/[^a-z0-9]/g, '')

export const getDivisionsImage = (imageKey, fallbackKey = '') => {
  const primaryImage = divisionImages[normalizeImageName(imageKey)]
  if (primaryImage) return primaryImage

  return divisionImages[normalizeImageName(fallbackKey)] || ''
}

export const divisionStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.035,
    },
  },
}

export const divisionFadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
  },
}

export const divisionFadeLeft = {
  hidden: { opacity: 0, x: -32, scale: 0.985 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
  },
}

export const divisionFadeRight = {
  hidden: { opacity: 0, x: 32, scale: 0.985 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
  },
}

export const getDivisionMotionProps = (shouldReduceMotion, isInView) => (
  shouldReduceMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }
)
