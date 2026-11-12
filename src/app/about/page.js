import AboutPage from '@/components/pages/AboutPage.jsx'
import { aboutContent } from '@/content/en/about.content.js'
import { buildPageMetadata } from '@/lib/metadata.js'

export const metadata = buildPageMetadata({
  title: aboutContent.seo.title,
  description: aboutContent.seo.description,
  pathname: '/about',
  locale: 'en',
})

export default function AboutRoutePage() {
  return <AboutPage content={aboutContent} locale="en" />
}
