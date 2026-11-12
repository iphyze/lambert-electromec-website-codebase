import FacilityManagementPage from '@/components/pages/FacilityManagementPage.jsx'
import { facilityManagementContent } from '@/content/en/facilityManagement.content.js'
import { buildPageMetadata } from '@/lib/metadata.js'

export const metadata = buildPageMetadata({
  title: facilityManagementContent.seo.title,
  description: facilityManagementContent.seo.description,
  keywords: facilityManagementContent.seo.keywords,
  pathname: '/facility-management',
  locale: 'en',
})

export default function FacilityManagementRoutePage() {
  return <FacilityManagementPage content={facilityManagementContent} locale="en" />
}
