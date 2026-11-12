import CorporatePage from '@/components/pages/CorporatePage.jsx'
import { corporateContent } from '@/content/fr/corporate.content.js'
import { buildPageMetadata } from '@/lib/metadata.js'

export const metadata = buildPageMetadata({
  title: corporateContent.seo.title,
  description: corporateContent.seo.description,
  pathname: '/corporate',
  locale: 'fr',
})

export default function FrenchCorporateRoutePage() {
  return <CorporatePage content={corporateContent} locale="fr" />
}
