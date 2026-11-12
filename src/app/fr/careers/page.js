import CareersPage from '@/components/pages/CareersPage.jsx'
import { careersContent } from '@/content/fr/careers.content.js'
import { contactContent } from '@/content/fr/contact.content.js'
import { termsContent } from '@/content/fr/terms.content.js'
import { buildPageMetadata } from '@/lib/metadata.js'

export const metadata = buildPageMetadata({
  title: 'Careers',
  pathname: '/careers',
  locale: 'fr',
})

export default function CareersRoutePage() {
  return (
    <CareersPage
      content={careersContent}
      formContent={contactContent.form}
      termsContent={termsContent}
      locale="fr"
    />
  )
}
