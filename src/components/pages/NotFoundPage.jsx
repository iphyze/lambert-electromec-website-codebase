'use client'

import { ArrowLeft, Compass, Home } from 'lucide-react'
import LocalizedLink from '@/components/navigation/LocalizedLink'

const NotFoundPage = () => (
  <section className="not-found-page" aria-labelledby="not-found-title">
    <div className="not-found-grid" aria-hidden="true" />
    <span className="not-found-glow not-found-glow-one" aria-hidden="true" />
    <span className="not-found-glow not-found-glow-two" aria-hidden="true" />

    <div className="container not-found-container">
      <div className="not-found-visual" aria-hidden="true">
        <div className="not-found-orbit not-found-orbit-one" />
        <div className="not-found-orbit not-found-orbit-two" />
        <div className="not-found-code">404</div>
        <div className="not-found-compass">
          <Compass size={30} />
        </div>
      </div>

      <div className="not-found-content">
        <span className="eyebrow">404</span>
        <h1 id="not-found-title">Page not found</h1>
        <p>The page you requested does not exist or has moved.</p>
        <LocalizedLink className="button-primary not-found-home" href="/">
          <Home size={17} aria-hidden="true" />
          <span>Back home</span>
          <ArrowLeft className="not-found-arrow" size={16} aria-hidden="true" />
        </LocalizedLink>
      </div>
    </div>
  </section>
)

export default NotFoundPage
