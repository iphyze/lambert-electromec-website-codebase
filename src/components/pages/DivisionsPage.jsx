import PageHeader from '@/components/layout/PageHeader.jsx'
import DivisionsBuildingsSection from '@/components/sections/divisions/DivisionsBuildingsSection.jsx'
import DivisionsPowerSection from '@/components/sections/divisions/DivisionsPowerSection.jsx'
import DivisionsDataSection from '@/components/sections/divisions/DivisionsDataSection.jsx'
import DivisionsOilGasSection from '@/components/sections/divisions/DivisionsOilGasSection.jsx'
import { divisionRegistry } from '@/config/divisions.config.js'
import './Divisions.css'

const divisionSectionComponents = {
  buildingsFactories: DivisionsBuildingsSection,
  powerSolutions: DivisionsPowerSection,
  dataCenter: DivisionsDataSection,
  oilGas: DivisionsOilGasSection,
}

const DivisionsPage = ({ content, locale = 'en' }) => (
  <div className="divisions-page" lang={locale}>
    <PageHeader {...content.pageHeader} />
    {divisionRegistry.map(({ key }) => {
      const Section = divisionSectionComponents[key]
      const sectionContent = content[key]

      if (!Section || !sectionContent) return null

      return <Section key={key} content={sectionContent} />
    })}
  </div>
)

export default DivisionsPage
