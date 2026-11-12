'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import ThemeProvider from '@/contexts/ThemeContext'
import I18nProvider from '@/i18n/I18nProvider'
import { getLocaleFromPathname } from '@/i18n/config'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import RouteScrollManager from '@/components/navigation/RouteScrollManager'
import PageTransitionLoader from '@/components/navigation/PageTransitionLoader'
import ScrollToTopButton from '@/components/ui/ScrollToTopButton'
import WebsiteAssistant from '@/components/ai/WebsiteAssistant'
import AnalyticsTracker from '@/components/analytics/AnalyticsTracker'

const AppShell = ({ children }) => {
  const pathname = usePathname() || '/'
  const locale = getLocaleFromPathname(pathname)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <I18nProvider locale={locale}>
      <ThemeProvider>
        <div className="app-shell">
          <RouteScrollManager />
          <AnalyticsTracker />
          <PageTransitionLoader />
          <Header />
          <main id="main-content" className="site-main">
            {children}
          </main>
          <ScrollToTopButton />
          <WebsiteAssistant locale={locale} />
          <Footer />
        </div>
      </ThemeProvider>
    </I18nProvider>
  )
}

export default AppShell
