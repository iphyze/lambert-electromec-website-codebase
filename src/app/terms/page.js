import TermsPage from '@/components/pages/TermsPage.jsx'
import { termsContent } from '@/content/en/terms.content.js'
import { buildPageMetadata } from '@/lib/metadata.js'

const description = termsContent.sections[0].paragraphs[0].slice(0, 155)

export const metadata = buildPageMetadata({
  title: termsContent.title,
  description,
  pathname: '/terms',
  locale: 'en',
})

export default function TermsRoutePage() {
  return <TermsPage content={termsContent} locale="en" />
}
