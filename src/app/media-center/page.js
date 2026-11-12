import MediaCenterPage from '@/components/pages/MediaCenterPage.jsx'
import { mediaCenterContent } from '@/content/en/mediaCenter.content.js'
import { buildPageMetadata } from '@/lib/metadata.js'

export const metadata = buildPageMetadata({
  title: mediaCenterContent.seo.title,
  description: mediaCenterContent.seo.description,
  pathname: '/media-center',
  locale: 'en',
  keywords: mediaCenterContent.seo.keywords,
})

export default function MediaCenterRoutePage() {
  return <MediaCenterPage content={mediaCenterContent} locale="en" />
}
