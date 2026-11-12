import ContactPage from '@/components/pages/ContactPage.jsx'
import { contactContent } from '@/content/en/contact.content.js'
import { termsContent } from '@/content/en/terms.content.js'
import { buildPageMetadata } from '@/lib/metadata.js'

export const metadata = buildPageMetadata({
  title: contactContent.seo.title,
  description: contactContent.seo.description,
  keywords: contactContent.seo.keywords,
  pathname: '/contact',
  locale: 'en',
})

export default function ContactRoutePage() {
  return <ContactPage content={contactContent} termsContent={termsContent} locale="en" />
}
