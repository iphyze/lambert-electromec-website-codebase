import AnimatedSection from '@/components/ui/AnimatedSection.jsx'

const PageIntro = ({ eyebrow, title, body }) => (
  <AnimatedSection className="page-intro container section-padding">
    {eyebrow && <span className="eyebrow">{eyebrow}</span>}
    <h1>{title}</h1>
    {body && <p>{body}</p>}
  </AnimatedSection>
)

export default PageIntro
