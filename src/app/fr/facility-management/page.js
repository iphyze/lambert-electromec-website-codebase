import FacilityManagementPage from '@/components/pages/FacilityManagementPage.jsx'
import { facilityManagementContent } from '@/content/fr/facilityManagement.content.js'
import { buildPageMetadata } from '@/lib/metadata.js'

export const metadata = buildPageMetadata({
  title: facilityManagementContent.seo.title,
  description: facilityManagementContent.seo.description,
  keywords: facilityManagementContent.seo.keywords,
  pathname: '/facility-management',
  locale: 'fr',
})

export default function FrenchFacilityManagementRoutePage() {
  return <FacilityManagementPage content={facilityManagementContent} locale="fr" />
}
