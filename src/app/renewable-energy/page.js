import RenewableEnergyPage from '@/components/pages/RenewableEnergyPage.jsx'
import { renewableEnergyContent } from '@/content/en/renewableEnergy.content.js'
import { buildPageMetadata } from '@/lib/metadata.js'

export const metadata = buildPageMetadata({
  title: renewableEnergyContent.seo.title,
  description: renewableEnergyContent.seo.description,
  keywords: renewableEnergyContent.seo.keywords,
  pathname: '/renewable-energy',
  locale: 'en',
  image: renewableEnergyContent.hero.image,
  imageAlt: renewableEnergyContent.hero.title,
})

export default function RenewableEnergyRoutePage() {
  return <RenewableEnergyPage content={renewableEnergyContent} locale="en" />
}
