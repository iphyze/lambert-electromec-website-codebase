import CorporatePage from '@/components/pages/CorporatePage.jsx'
import { corporateContent } from '@/content/en/corporate.content.js'
import { buildPageMetadata } from '@/lib/metadata.js'

export const metadata = {
  ...buildPageMetadata({
    title: corporateContent.seo.title,
    description: corporateContent.seo.description,
    pathname: '/corporate',
    locale: 'en',
  }),
  robots: { index: false, follow: true },
}

export default function CorporateAliasPage() {
  return <CorporatePage content={corporateContent} locale="en" />
}
