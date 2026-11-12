import PageIntro from '@/components/common/PageIntro.jsx'

const ServicesPage = ({ body, locale = 'en' }) => (
  <div lang={locale}>
    <PageIntro eyebrow="Lambert Electromec" title="Services" body={body} />
  </div>
)

export default ServicesPage
