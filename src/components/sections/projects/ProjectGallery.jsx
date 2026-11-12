'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProjectImage from './ProjectImage.jsx'

const ProjectGallery = ({ images = [], title, labels }) => {
  const shouldReduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)

  const usableImages = useMemo(() => images.filter((image) => image?.src), [images])
  const hasMultipleImages = usableImages.length > 1

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, Math.max(usableImages.length - 1, 0)))
  }, [usableImages.length])

  const changeImage = (nextIndex) => {
    if (!usableImages.length) return
    const wrappedIndex = (nextIndex + usableImages.length) % usableImages.length
    setActiveIndex(wrappedIndex)
  }

  const activeImage = usableImages[activeIndex]

  return (
    <div className="project-gallery" aria-label={labels.galleryLabel}>
      <div className="project-gallery-stage">
        <AnimatePresence mode="wait" initial={false}>
          {activeImage ? (
            <motion.div
              className="project-gallery-slide"
              key={activeImage.src}
              initial={shouldReduceMotion ? false : { opacity: 0, x: 24, scale: 0.985 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, x: -18, scale: 0.99 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectImage
                src={activeImage.src}
                alt={activeImage.alt || title}
                className="project-gallery-image"
                loading="eager"
                fetchPriority="auto"
              />
            </motion.div>
          ) : (
            <ProjectImage className="project-gallery-image" alt="" />
          )}
        </AnimatePresence>

        <span className="project-gallery-overlay" aria-hidden="true" />

        {usableImages.length ? (
          <span className="project-gallery-counter">
            {String(activeIndex + 1).padStart(2, '0')} / {String(usableImages.length).padStart(2, '0')}
          </span>
        ) : null}

        {hasMultipleImages ? (
          <div className="project-gallery-controls">
            <button
              type="button"
              onClick={() => changeImage(activeIndex - 1)}
              aria-label={labels.previousImageLabel}
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => changeImage(activeIndex + 1)}
              aria-label={labels.nextImageLabel}
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>

      {hasMultipleImages ? (
        <div className="project-gallery-thumbnails" aria-label={labels.galleryLabel}>
          {usableImages.map((image, index) => (
            <button
              type="button"
              className={index === activeIndex ? 'is-active' : ''}
              key={`${image.src}-${index}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`${labels.imageLabel} ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            >
              <ProjectImage
                src={image.src}
                alt=""
                className="project-gallery-thumbnail-image"
                loading="lazy"
              />
              <span>{String(index + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default ProjectGallery
