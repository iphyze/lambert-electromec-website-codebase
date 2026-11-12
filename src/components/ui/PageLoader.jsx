'use client'

import { useTranslation } from 'react-i18next'

const PageLoader = ({ routeTransition = false, exiting = false }) => {
  const { t } = useTranslation()

  return (
    <div
      className={`page-loader ${routeTransition ? 'page-loader-route' : ''} ${exiting ? 'page-loader-route-exiting' : ''}`.trim()}
      role="status"
      aria-live="polite"
      aria-label={t('loader.ariaLabel')}
    >
      <div className="page-loader-shell">
        <div className="page-loader-brand">
          <img src="/images/brand/lambert-logo.png" alt="Lambert Electromec" />
        </div>

        <div className="page-loader-orbit" aria-hidden="true">
          <span className="page-loader-orbit-ring page-loader-orbit-ring-one" />
          <span className="page-loader-orbit-ring page-loader-orbit-ring-two" />
          <span className="page-loader-core">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M4.3 19.7h15.4" />
              <path d="M6.2 19.7V8.1l5.8-3.3 5.8 3.3v11.6" />
              <path d="M9.1 19.7v-5.2h5.8v5.2" />
              <path d="M9.2 10.2h.1M12 10.2h.1M14.8 10.2h.1" />
            </svg>
          </span>
        </div>

        <div className="page-loader-copy">
          <h2>{t('loader.title')}</h2>
          <p>{t('loader.body')}</p>
        </div>

        <div className="page-loader-progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  )
}

export default PageLoader
