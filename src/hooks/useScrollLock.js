'use client'

import { useEffect } from 'react'

export const useScrollLock = (locked) => {
  useEffect(() => {
    if (typeof document === 'undefined') return undefined

    const { body, documentElement } = document
    const previousBodyOverflow = body.style.overflow
    const previousBodyOverscroll = body.style.overscrollBehavior
    const previousHtmlOverflow = documentElement.style.overflow

    if (locked) {
      body.style.overflow = 'hidden'
      body.style.overscrollBehavior = 'contain'
      documentElement.style.overflow = 'hidden'
    }

    return () => {
      body.style.overflow = previousBodyOverflow
      body.style.overscrollBehavior = previousBodyOverscroll
      documentElement.style.overflow = previousHtmlOverflow
    }
  }, [locked])
}
