'use client'

import { useEffect, useMemo, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { A11y, Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import AnimatedSection from '@/components/ui/AnimatedSection.jsx'
import ServiceImageOne from '@/assets/images/home-services/1.webp'
import ServiceImageTwo from '@/assets/images/home-services/2.webp'
import ServiceImageThree from '@/assets/images/home-services/3.webp'
import ServiceImageFour from '@/assets/images/home-services/4.webp'
import ServiceImageFive from '@/assets/images/home-services/5.webp'
import ServiceImageSix from '@/assets/images/home-services/6.webp'

const serviceImages = [
  ServiceImageOne,
  ServiceImageTwo,
  ServiceImageThree,
  ServiceImageFour,
  ServiceImageFive,
  ServiceImageSix,
]


const revealContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
}

const revealUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.54, ease: [0.22, 1, 0.36, 1] },
  },
}

const revealCard = {
  hidden: { opacity: 0, y: 20, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M5 12h12.2m-5.1-5.2L17.3 12l-5.2 5.2" />
  </svg>
)

const ServiceIcon = ({ type }) => {
  if (type === 'mechanical') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2Z" />
        <path d="M18.7 13.2c.1-.4.1-.8.1-1.2s0-.8-.1-1.2l2.1-1.6-2-3.4-2.5 1a8.2 8.2 0 0 0-2-1.2L14 3h-4l-.4 2.6a8.2 8.2 0 0 0-2 1.2l-2.5-1-2 3.4 2.1 1.6c-.1.4-.1.8-.1 1.2s0 .8.1 1.2l-2.1 1.6 2 3.4 2.5-1a8.2 8.2 0 0 0 2 1.2L10 21h4l.4-2.6a8.2 8.2 0 0 0 2-1.2l2.5 1 2-3.4-2.2-1.6Z" />
      </svg>
    )
  }

  if (type === 'electrical') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M13.2 2.8 4.8 13h6.3l-.7 8.2 8.8-11h-6.5l.5-7.4Z" />
      </svg>
    )
  }

  if (type === 'data') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5.2 5.8h13.6v4.6H5.2V5.8Z" />
        <path d="M5.2 13.6h13.6v4.6H5.2v-4.6Z" />
        <path d="M8.2 8.1h.1" />
        <path d="M8.2 15.9h.1" />
        <path d="M15.5 8.1h.3" />
        <path d="M15.5 15.9h.3" />
      </svg>
    )
  }

  if (type === 'power') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M9.2 20.4h5.6" />
        <path d="M10 17.2h4" />
        <path d="M8.4 14.8c-1.7-1.2-2.8-3.2-2.8-5.4a6.4 6.4 0 1 1 12.8 0c0 2.2-1.1 4.2-2.8 5.4-.8.6-1.2 1.2-1.2 2.4H9.6c0-1.2-.4-1.8-1.2-2.4Z" />
        <path d="M9.2 8.9a3 3 0 0 1 2.9-2.5" />
      </svg>
    )
  }

  if (type === 'security') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 3.5 18.5 6v4.9c0 4.3-2.6 7.8-6.5 9.6-3.9-1.8-6.5-5.3-6.5-9.6V6L12 3.5Z" />
        <path d="M12 7.8v8.3" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4.5 19.5h15" />
      <path d="M6.2 19.5V12a5.8 5.8 0 0 1 11.6 0v7.5" />
      <path d="M4.5 12h15" />
      <path d="M9.2 4.8v3.5" />
      <path d="M14.8 4.8v3.5" />
    </svg>
  )
}

const ServiceCard = ({ service, index, image }) => {
  const imageSrc = image?.src || image || ''

  return (
    <motion.article className="home-service-card" variants={revealCard}>
      <div className="home-service-image-layer" aria-hidden="true">
        {imageSrc ? <img src={imageSrc} alt="" loading="lazy" decoding="async" /> : <span className="home-service-image-fallback" />}
        <span className="home-service-image-shade" />
      </div>

      <span className="home-service-card-count">{String(index + 1).padStart(2, '0')}</span>
      <div className="home-service-icon">
        <ServiceIcon type={service.iconType} />
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <span className="home-service-hover-label" aria-hidden="true">{service.hoverLabel || service.kicker || service.title}</span>
    </motion.article>
  )
}

const HomeServicesSection = ({ content }) => {
  const shouldReduceMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const prevButtonRef = useRef(null)
  const nextButtonRef = useRef(null)
  const paginationRef = useRef(null)
  const swiperRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.18, margin: '0px 0px -10% 0px' })

  const services = useMemo(() => content?.items || [], [content?.items])

  useEffect(() => {
    const swiper = swiperRef.current

    if (!swiper?.autoplay || shouldReduceMotion) return

    if (isInView) {
      swiper.autoplay.start()
    } else {
      swiper.autoplay.stop()
    }
  }, [isInView, shouldReduceMotion])

  if (!content || !services.length) return null

  const motionProps = shouldReduceMotion
    ? { initial: false, animate: 'visible' }
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  return (
    <AnimatedSection className="home-services-section section-padding">
      <div className="home-services-bg" aria-hidden="true">
        <span className="home-services-grid" />
        <span className="home-services-ring home-services-ring-one" />
        <span className="home-services-ring home-services-ring-two" />
        <span className="home-services-dots home-services-dots-one" />
        <span className="home-services-dots home-services-dots-two" />
        <span className="home-services-glow" />
      </div>

      <div className="container home-services-container" ref={sectionRef}>
        <motion.div className="home-services-heading" variants={revealContainer} {...motionProps}>
          {content.eyebrow ? <motion.span className="section-kicker" variants={revealUp}>{content.eyebrow}</motion.span> : null}
          <motion.h2 variants={revealUp}>{content.title}</motion.h2>
          {content.description ? <motion.p variants={revealUp}>{content.description}</motion.p> : null}
        </motion.div>

        <motion.div className="home-services-slider-shell" variants={revealUp} {...motionProps}>
          <button ref={prevButtonRef} className="home-services-nav home-services-nav-prev" type="button" aria-label={content.previousLabel || 'Previous service'}>
            <ArrowIcon />
          </button>
          <button ref={nextButtonRef} className="home-services-nav home-services-nav-next" type="button" aria-label={content.nextLabel || 'Next service'}>
            <ArrowIcon />
          </button>

          <Swiper
            className="home-services-swiper"
            modules={[Autoplay, Navigation, Pagination, Keyboard, A11y]}
            slidesPerView="auto"
            loop={services.length > 1}
            speed={760}
            autoplay={shouldReduceMotion ? false : { delay: 4200, disableOnInteraction: false, pauseOnMouseEnter: true }}
            spaceBetween={22}
            grabCursor
            keyboard={{ enabled: true }}
            navigation={{
              prevEl: prevButtonRef.current,
              nextEl: nextButtonRef.current,
            }}
            pagination={{
              el: paginationRef.current,
              clickable: true,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
              if (!isInView && swiper.autoplay) {
                swiper.autoplay.stop()
              }
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevButtonRef.current
              swiper.params.navigation.nextEl = nextButtonRef.current
              swiper.params.pagination.el = paginationRef.current
            }}
            a11y={{
              prevSlideMessage: content.previousLabel || 'Previous service',
              nextSlideMessage: content.nextLabel || 'Next service',
              paginationBulletMessage: content.paginationLabel || 'Go to service {{index}}',
            }}
            breakpoints={{
              0: { spaceBetween: 14 },
              640: { spaceBetween: 18 },
              1024: { spaceBetween: 22 },
            }}
          >
            {services.map((service, index) => (
              <SwiperSlide className="home-service-slide" key={service.key || service.title}>
                <ServiceCard service={service} index={index} image={serviceImages[index]} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div ref={paginationRef} className="home-services-pagination" />
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

export default HomeServicesSection
