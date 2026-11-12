import DivisionsPage from '@/components/pages/DivisionsPage.jsx'
import { divisionsContent } from '@/content/fr/divisions.content.js'
import { buildPageMetadata } from '@/lib/metadata.js'

export const metadata = buildPageMetadata({
  title: divisionsContent.seo.title,
  description: divisionsContent.seo.description,
  pathname: '/divisions',
  locale: 'fr',
})

export default function FrenchDivisionsRoutePage() {
  return <DivisionsPage content={divisionsContent} locale="fr" />
}
