'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const RouteScrollManager = () => {
  const pathname = usePathname()

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const hash = window.location.hash

      if (hash) {
        const targetId = decodeURIComponent(hash.replace(/^#/, ''))
        const target = document.getElementById(targetId)

        if (target) {
          // Cross-page section positioning happens instantly while the route
          // loader is still covering the new page. Same-page menu navigation
          // keeps its smooth-scroll behaviour in PageHeader.
          target.scrollIntoView({ behavior: 'auto', block: 'start' })
        }
        return
      }

      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [pathname])

  return null
}

export default RouteScrollManager
