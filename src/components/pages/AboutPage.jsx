import PageHeader from '@/components/layout/PageHeader.jsx'
import AboutProfileSection from '@/components/sections/about/AboutProfileSection.jsx'
import AboutHistorySection from '@/components/sections/about/AboutHistorySection.jsx'
import AboutMissionVisionSection from '@/components/sections/about/AboutMissionVisionSection.jsx'

const AboutPage = ({ content, locale = 'en' }) => (
  <div lang={locale}>
    <PageHeader {...content.pageHeader} />
    <AboutProfileSection content={content.profile} />
    <AboutHistorySection content={content.history} />
    <AboutMissionVisionSection content={content.missionVision} />
  </div>
)

export default AboutPage
