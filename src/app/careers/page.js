import CareersPage from '@/components/pages/CareersPage.jsx'
import { careersContent } from '@/content/en/careers.content.js'
import { contactContent } from '@/content/en/contact.content.js'
import { termsContent } from '@/content/en/terms.content.js'
import { buildPageMetadata } from '@/lib/metadata.js'

export const metadata = buildPageMetadata({
  title: 'Careers',
  pathname: '/careers',
  locale: 'en',
})

export default function CareersRoutePage() {
  return (
    <CareersPage
      content={careersContent}
      formContent={contactContent.form}
      termsContent={termsContent}
      locale="en"
    />
  )
}
