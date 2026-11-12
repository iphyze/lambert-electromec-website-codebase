'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { FileText, X } from 'lucide-react'
import { useScrollLock } from '@/hooks/useScrollLock.js'
import { useFocusTrap } from '@/hooks/useFocusTrap.js'

const TermsModal = ({ open, onClose, content }) => {
  const shouldReduceMotion = useReducedMotion()
  const modalRef = useRef(null)
  const closeButtonRef = useRef(null)

  useScrollLock(open)
  useFocusTrap({
    active: open,
    containerRef: modalRef,
    initialFocusRef: closeButtonRef,
  })

  useEffect(() => {
    if (!open) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="contact-terms-backdrop"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) onClose()
          }}
        >
          <motion.section
            ref={modalRef}
            className="contact-terms-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-terms-title"
            tabIndex={-1}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: 18, scale: 0.985 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="contact-terms-header">
              <div>
                <span className="contact-terms-icon"><FileText size={18} aria-hidden="true" /></span>
                <h2 id="contact-terms-title">{content.title}</h2>
              </div>
              <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close Terms & Conditions">
                <X size={20} aria-hidden="true" />
              </button>
            </header>

            <div className="contact-terms-body">
              {content.sections.map((section) => (
                <article key={section.heading}>
                  <h3>{section.heading}</h3>
                  {section.paragraphs?.map((paragraph, index) => (
                    <p key={`${section.heading}-paragraph-${index}`}>{paragraph}</p>
                  ))}
                  {section.items?.length ? (
                    <ul>
                      {section.items.map((item, index) => (
                        <li key={`${section.heading}-item-${index}`}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {section.afterItems?.map((paragraph, index) => (
                    <p key={`${section.heading}-after-item-${index}`}>{paragraph}</p>
                  ))}
                </article>
              ))}
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

export default TermsModal
