import ServicesPage from '@/components/pages/ServicesPage.jsx'
import fr from '@/i18n/locales/fr.json'
import { buildPageMetadata } from '@/lib/metadata.js'
import { defaultMetaDescription } from '@/utils/seo.js'

export const metadata = buildPageMetadata({
  title: 'Services',
  description: defaultMetaDescription,
  pathname: '/services',
  locale: 'fr',
})

export default function FrenchServicesRoutePage() {
  return <ServicesPage body={fr.placeholder.body} locale="fr" />
}
