import { Mail, MapPin, Phone } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader.jsx'
import AnimatedSection from '@/components/ui/AnimatedSection.jsx'
import ContactForm from '@/components/contact/ContactForm.jsx'
import './ContactPage.css'

const ContactPage = ({ content, termsContent, locale = 'en' }) => (
  <div className="contact-page" lang={locale}>
    <PageHeader {...content.pageHeader} />

    <AnimatedSection className="contact-main section-padding">
      <div className="container contact-layout">
        <aside className="contact-aside">
          <div className="contact-aside-heading">
            <span>{content.aside.eyebrow}</span>
            <h2>{content.aside.title}</h2>
          </div>

          <div className="contact-office-list">
            {content.aside.locations.map((location, index) => (
              <article className="contact-office-card" key={location.country}>
                <div className="contact-office-index">{String(index + 1).padStart(2, '0')}</div>
                <div className="contact-office-content">
                  <h3>{location.country}</h3>
                  {location.addresses?.length ? (
                    <div className="contact-office-addresses">
                      {location.addresses.map((office) => (
                        <p key={`${location.country}-${office.city}`}>
                          <MapPin size={16} aria-hidden="true" />
                          <span><strong>{office.city}</strong>{office.address}</span>
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p><MapPin size={16} aria-hidden="true" /><span>{location.address}</span></p>
                  )}
                  <a href={`tel:${location.phone.replace(/[^+\d]/g, '')}`}>
                    <Phone size={16} aria-hidden="true" />
                    <span>{location.phone}</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <a className="contact-email-card" href={`mailto:${content.aside.email}`}>
            <span className="contact-email-icon"><Mail size={20} aria-hidden="true" /></span>
            <span>
              <small>Email</small>
              <strong>{content.aside.email}</strong>
            </span>
          </a>
        </aside>

        <div className="contact-form-shell">
          <ContactForm content={content.form} termsContent={termsContent} locale={locale} />
        </div>
      </div>
    </AnimatedSection>
  </div>
)

export default ContactPage
