import ServicesPage from '@/components/pages/ServicesPage.jsx'
import en from '@/i18n/locales/en.json'
import { buildPageMetadata } from '@/lib/metadata.js'
import { defaultMetaDescription } from '@/utils/seo.js'

export const metadata = buildPageMetadata({
  title: 'Services',
  description: defaultMetaDescription,
  pathname: '/services',
  locale: 'en',
})

export default function ServicesRoutePage() {
  return <ServicesPage body={en.placeholder.body} locale="en" />
}
