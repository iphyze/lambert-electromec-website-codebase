import PageHeader from '@/components/layout/PageHeader.jsx'
import CorporateSolutionsSection from '@/components/sections/corporate/CorporateSolutionsSection.jsx'
import CorporateHseSection from '@/components/sections/corporate/CorporateHseSection.jsx'
import CorporateIsoQmsSection from '@/components/sections/corporate/CorporateIsoQmsSection.jsx'
import CorporateCsrSection from '@/components/sections/corporate/CorporateCsrSection.jsx'

const CorporatePage = ({ content, locale = 'en' }) => (
  <div lang={locale}>
    <PageHeader {...content.pageHeader} />
    <CorporateSolutionsSection content={content.solutionsProvider} />
    <CorporateHseSection content={content.hse} />
    <CorporateIsoQmsSection content={content.isoQms} />
    <CorporateCsrSection content={content.csr} />
  </div>
)

export default CorporatePage
