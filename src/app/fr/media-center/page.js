import MediaCenterPage from '@/components/pages/MediaCenterPage.jsx'
import { mediaCenterContent } from '@/content/fr/mediaCenter.content.js'
import { buildPageMetadata } from '@/lib/metadata.js'

export const metadata = buildPageMetadata({
  title: mediaCenterContent.seo.title,
  description: mediaCenterContent.seo.description,
  pathname: '/media-center',
  locale: 'fr',
  keywords: mediaCenterContent.seo.keywords,
})

export default function FrenchMediaCenterRoutePage() {
  return <MediaCenterPage content={mediaCenterContent} locale="fr" />
}
