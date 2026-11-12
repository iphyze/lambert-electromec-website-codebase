import DivisionsPage from '@/components/pages/DivisionsPage.jsx'
import { divisionsContent } from '@/content/en/divisions.content.js'
import { buildPageMetadata } from '@/lib/metadata.js'

export const metadata = buildPageMetadata({
  title: divisionsContent.seo.title,
  description: divisionsContent.seo.description,
  pathname: '/divisions',
  locale: 'en',
})

export default function DivisionsRoutePage() {
  return <DivisionsPage content={divisionsContent} locale="en" />
}
