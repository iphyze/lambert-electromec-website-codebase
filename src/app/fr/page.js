import HomeHeroSlider from '@/components/sections/home/HomeHeroSlider.jsx'
import HomeAboutSection from '@/components/sections/home/HomeAboutSection.jsx'
import HomeVisionMissionHistorySection from '@/components/sections/home/HomeVisionMissionHistorySection.jsx'
import HomeCompanyNumbersSection from '@/components/sections/home/HomeCompanyNumbersSection.jsx'
import HomeDivisionsSection from '@/components/sections/home/HomeDivisionsSection.jsx'
import HomeProjectsSection from '@/components/sections/home/HomeProjectsSection.jsx'
import HomeServicesSection from '@/components/sections/home/HomeServicesSection.jsx'
import { homeContent } from '@/content/fr/home.content'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata({
  title: homeContent.seo.title,
  description: homeContent.seo.description,
  keywords: homeContent.seo.keywords,
  pathname: '/',
  locale: 'fr',
})

export default function FrenchHomePage() {
  return (
    <div lang="fr">
      <HomeHeroSlider slides={homeContent.hero.slides} />
      <HomeAboutSection content={homeContent.about} />
      <HomeVisionMissionHistorySection content={homeContent.visionMissionHistory} />
      <HomeCompanyNumbersSection content={homeContent.companyNumbers} />
      <HomeDivisionsSection content={homeContent.divisions} />
      <HomeProjectsSection content={homeContent.projectsPreview} locale="fr" />
      <HomeServicesSection content={homeContent.servicesPreview} />
    </div>
  )
}
