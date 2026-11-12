import PageHeader from '@/components/layout/PageHeader.jsx'
import AnimatedSection from '@/components/ui/AnimatedSection.jsx'
import ContactForm from '@/components/contact/ContactForm.jsx'
import './ContactPage.css'
import './CareersPage.css'

const CareersPage = ({ content, formContent, termsContent, locale = 'en' }) => {
  const careersFormContent = {
    ...formContent,
    heading: content.formHeading,
    subjectLabel: content.subjectLabel,
    submit: content.submitLabel || formContent.submit,
  }

  return (
    <div className="careers-page" lang={locale}>
      <PageHeader {...content.pageHeader} />

      <AnimatedSection className="careers-main section-padding">
        <div className="container careers-layout">
          <div className="careers-form-shell contact-form-shell">
            <ContactForm
              content={careersFormContent}
              termsContent={termsContent}
              locale={locale}
              initialSubjectValue="job-vacancy"
              lockSubject
            />
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}

export default CareersPage
