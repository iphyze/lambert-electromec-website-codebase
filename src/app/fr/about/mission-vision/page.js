import AboutPage from '@/components/pages/AboutPage.jsx'
import { aboutContent } from '@/content/fr/about.content.js'
import { buildPageMetadata } from '@/lib/metadata.js'

export const metadata = {
  ...buildPageMetadata({
    title: aboutContent.seo.title,
    description: aboutContent.seo.description,
    pathname: '/about',
    locale: 'fr',
  }),
  robots: { index: false, follow: true },
}

export default function FrenchAboutAliasPage() {
  return <AboutPage content={aboutContent} locale="fr" />
}
