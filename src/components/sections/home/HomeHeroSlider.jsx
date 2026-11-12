'use client'

import { useMemo } from 'react'
import LocalizedLink from '@/components/navigation/LocalizedLink.jsx'
import { A11y, Autoplay, EffectFade, Keyboard, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useReducedMotion } from 'motion/react'

import { getHomeSlideImage } from '@/lib/home-images.js'



const renderTitle = (title = '') => (
  <span className="home-slide-title-text">
    {title.split(' ').map((word, index) => (
      <span
        className="home-slide-title-word"
        data-word={word}
        key={`${word}-${index}`}
        style={{ '--word-index': index }}
      >
        {word}
      </span>
    ))}
  </span>
)


const HomeHeroSlider = ({ slides = [] }) => {
  const shouldReduceMotion = useReducedMotion()

  const preparedSlides = useMemo(
    () => slides.map((slide, index) => ({
      ...slide,
      image: getHomeSlideImage(slide.imageKey),
      index,
    })),
    [slides],
  )

  if (!preparedSlides.length) return null

  return (
    <section className="home-landing-slider" aria-label="Lambert Electromec highlights">
      <Swiper
        className="home-slider-swiper"
        modules={[Autoplay, Pagination, EffectFade, Keyboard, A11y]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={950}
        loop={preparedSlides.length > 1}
        grabCursor
        keyboard={{ enabled: true }}
        watchSlidesProgress
        pagination={{ clickable: true }}
        autoplay={shouldReduceMotion || preparedSlides.length < 2 ? false : {
          delay: 6500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        a11y={{
          prevSlideMessage: 'Previous Lambert Electromec highlight',
          nextSlideMessage: 'Next Lambert Electromec highlight',
          paginationBulletMessage: 'Go to Lambert Electromec highlight {{index}}',
        }}
      >
        {preparedSlides.map((slide) => {
          const alignment = slide.alignment || 'left'
          const titleLength = (slide.title || '').trim().length
          const titleWordCount = (slide.title || '').trim().split(/\s+/).filter(Boolean).length
          const hasLongTitle = titleLength >= 48 || titleWordCount >= 9

          return (
            <SwiperSlide
              key={slide.id}
              className={`home-slide home-slide-${alignment}${hasLongTitle ? ' home-slide-long-title' : ''}`}
            >
              {slide.image ? (
                <img
                  className="home-slide-image"
                  src={slide.image}
                  alt=""
                  aria-hidden="true"
                  width="1408"
                  height="768"
                  loading={slide.index === 0 ? 'eager' : 'lazy'}
                  decoding={slide.index === 0 ? 'sync' : 'async'}
                  fetchPriority={slide.index === 0 ? 'high' : 'auto'}
                />
              ) : (
                <span className="home-slide-image home-slide-image-fallback" aria-hidden="true" />
              )}

              <span className="home-slide-overlay" aria-hidden="true" />
              <span className="home-slide-pattern" aria-hidden="true" />

              <div className="home-slide-inner container">
                <div className="home-slide-copy">
                  {slide.eyebrow ? <span className="home-slide-eyebrow">{slide.eyebrow}</span> : null}

                  <h1>{renderTitle(slide.title)}</h1>

                  {slide.description ? <p>{slide.description}</p> : null}

                  {slide.cta ? (
                    <div className="home-slide-actions">
                      <LocalizedLink className="home-slide-button" href={slide.cta.href || '/projects'}>
                        <span>{slide.cta.label}</span>
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                          <path d="M5 12h12.2m-5.1-5.2L17.3 12l-5.2 5.2" />
                        </svg>
                      </LocalizedLink>
                    </div>
                  ) : null}
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </section>
  )
}

export default HomeHeroSlider
