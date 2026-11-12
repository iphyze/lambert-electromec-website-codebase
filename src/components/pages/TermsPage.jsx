import { Check } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection.jsx'
import PageHeader from '@/components/layout/PageHeader.jsx'
import './TermsPage.css'

const pageCopy = {
  en: {
    home: 'Home',
    sectionLabel: 'Terms & Conditions',
    contentsLabel: 'Contents',
  },
  fr: {
    home: 'Accueil',
    sectionLabel: 'Conditions générales',
    contentsLabel: 'Sommaire',
  },
}

const toSectionId = (heading = '', index = 0) => (
  `${heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'section'}-${index + 1}`
)

const TermsPage = ({ content, locale = 'en' }) => {
  const copy = pageCopy[locale] || pageCopy.en
  const menuItems = content.sections.map((section, index) => ({
    label: section.heading,
    href: `/terms#${toSectionId(section.heading, index)}`,
    targetId: toSectionId(section.heading, index),
    activePaths: index === 0 ? ['/terms'] : undefined,
  }))

  return (
    <div className="terms-page" lang={locale}>
      <PageHeader
        eyebrow={copy.sectionLabel}
        title={content.title}
        imageKey="slider7"
        breadcrumbs={[
          { label: copy.home, href: '/' },
          { label: content.title },
        ]}
        menuLabel={copy.contentsLabel}
        menuItems={menuItems}
      />

      <AnimatedSection className="terms-main section-padding">
        <div className="container terms-layout">
          <aside className="terms-index" aria-label={copy.contentsLabel}>
            <div className="terms-index-card">
              <span className="terms-index-label">{copy.contentsLabel}</span>
              <nav>
                {content.sections.map((section, index) => {
                  const sectionId = toSectionId(section.heading, index)
                  return (
                    <a key={sectionId} href={`#${sectionId}`}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{section.heading}</strong>
                    </a>
                  )
                })}
              </nav>
            </div>
          </aside>

          <div className="terms-content">
            {content.sections.map((section, index) => {
              const sectionId = toSectionId(section.heading, index)

              return (
                <article className="terms-section-card" id={sectionId} key={sectionId}>
                  <div className="terms-section-heading">
                    <span className="terms-section-number">{String(index + 1).padStart(2, '0')}</span>
                    <h2>{section.heading}</h2>
                  </div>

                  <div className="terms-section-body">
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}

                    {section.items?.length ? (
                      <ul>
                        {section.items.map((item) => (
                          <li key={item}>
                            <span className="terms-list-icon"><Check size={14} aria-hidden="true" /></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {section.afterItems?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}

export default TermsPage
