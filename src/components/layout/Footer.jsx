'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Mail, PhoneCall } from 'lucide-react'
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XSocialIcon,
} from '@/components/icons/SocialIcons.jsx'
import { siteConfig } from '@/config/site.config.js'
import { getLocaleFromPathname, stripLocaleFromPathname, withLocalePath } from '@/i18n/config.js'

const socialLinks = [
  { key: 'linkedin', label: 'LinkedIn', icon: LinkedinIcon },
  { key: 'facebook', label: 'Facebook', icon: FacebookIcon },
  { key: 'x', label: 'X', icon: XSocialIcon },
  { key: 'instagram', label: 'Instagram', icon: InstagramIcon },
]

const footerCopy = {
  en: {
    tagline: 'Bringing Life to Great Structures',
    description: 'Integrated engineering, EPC, MEP, power, data center and facility solutions across West Africa.',
    locationsTitle: 'Locations',
    contactsTitle: 'Contacts',
    quickLinksTitle: 'Quick Links',
    bottomLinks: {
      media: 'Media Center',
      terms: 'Terms & Conditions',
      careers: 'Careers',
    },
    rights: 'All Rights Reserved',
    offices: [
      {
        country: 'Nigeria',
        flagCode: 'ng',
        addresses: [
          { city: 'Lagos', address: '21, Ahmed Onibudo Street, Ground floor, Left Wing, Victoria Island, Lagos.' },
          { city: 'Port Harcourt', address: '48 Ordinance Road, Trans Amadi layout, River State, Nigeria' },
          { city: 'Abuja', address: '38 TOS Benson Crescent, Utako, Abuja, FCT.' },
        ],
      },
      {
        country: 'Ghana',
        flagCode: 'gh',
        addresses: [
          { city: 'Accra', address: 'Plot No. 8, 4th Circular Street, 6th Link Close, Cantonments, Accra East District, Ghana' },
        ],
      },
      {
        country: "Côte d'Ivoire",
        flagCode: 'ci',
        addresses: [
          { city: 'Abidjan', address: "Cocody Danga Villa, No. 6 – Rue des Cannas 26 BP 13777 Abidjan 26 – Côte d’Ivoire." },
        ],
      },
    ],
    phones: [
      { label: '+234 91 393 827 69', suffix: 'NG', href: '+2349139382769' },
      { label: '+233 59 380 4401', suffix: 'GH', href: '+233593804401' },
      { label: '+225 05 64 02 37 23', suffix: 'CI', href: '+2250564023723' },
    ],
  },
  fr: {
    tagline: 'Donner vie à de grandes structures',
    description: 'Solutions intégrées d’ingénierie, EPC, MEP, énergie, centres de données et gestion des installations en Afrique de l’Ouest.',
    locationsTitle: 'Nos Bureaux',
    contactsTitle: 'Coordonnées',
    quickLinksTitle: 'Liens Utiles',
    bottomLinks: {
      media: 'Centre média',
      terms: 'Conditions générales',
      careers: 'Carrières',
    },
    rights: 'Tous droits réservés',
    offices: [
      {
        country: 'Nigeria',
        flagCode: 'ng',
        addresses: [
          { city: 'Lagos', address: '21, Ahmed Onibudo Street, Ground floor, Left Wing, Victoria Island, Lagos.' },
          { city: 'Port Harcourt', address: '48 Ordinance Road, Trans Amadi layout, River State, Nigeria' },
          { city: 'Abuja', address: '38 TOS Benson Crescent, Utako, Abuja, FCT.' },
        ],
      },
      {
        country: 'Ghana',
        flagCode: 'gh',
        addresses: [
          { city: 'Accra', address: 'Plot No. 8, 4th Circular Street, 6th Link Close, Cantonments, Accra East District, Ghana' },
        ],
      },
      {
        country: "Côte d'Ivoire",
        flagCode: 'ci',
        addresses: [
          { city: 'Abidjan', address: "Cocody Danga Villa, No. 6 – Rue des Cannas 26 BP 13777 Abidjan 26 – Côte d’Ivoire." },
        ],
      },
    ],
    phones: [
      { label: '+234 91 393 827 69', suffix: 'NG', href: '+2349139382769' },
      { label: '+233 59 380 4401', suffix: 'GH', href: '+233593804401' },
      { label: '+225 05 64 02 37 23', suffix: 'CI', href: '+2250564023723' },
    ],
  },
}

const quickLinks = [
  { labelKey: 'nav.about', href: '/about' },
  { labelKey: 'nav.corporate', href: '/corporate' },
  { labelKey: 'nav.divisions', href: '/divisions' },
  { labelKey: 'nav.projects', href: '/projects' },
  { labelKey: 'nav.facility', href: '/facility-management' },
  { labelKey: 'nav.renewableEnergy', href: '/renewable-energy' },
  { copyKey: 'media', href: '/media-center' },
  { labelKey: 'nav.contact', href: '/contact' },
]

const Footer = () => {
  const { t } = useTranslation()
  const pathname = usePathname() || '/'
  const languageKey = getLocaleFromPathname(pathname)
  const basePathname = stripLocaleFromPathname(pathname)
  const isFacilityPage = basePathname === '/facility-management' || basePathname.startsWith('/facility-management/')
  const copy = footerCopy[languageKey]
  const year = new Date().getFullYear()
  const hrefFor = (href) => withLocalePath(href, languageKey)
  const quickLinkLabel = (link) => link.labelKey ? t(link.labelKey) : copy.bottomLinks[link.copyKey]
  const lemDescription = languageKey === 'fr'
    ? "LEM Maintenance est une filiale de Lambert Electromec spécialisée dans la gestion des installations (FM). LEM Maintenance fournit une gamme étendue et diversifiée de services visant à améliorer la qualité des bâtiments et des installations en Afrique de l'Ouest."
    : 'LEM Maintenance is a Facility Management (FM) subsidiary of Lambert Electromec. LEM Maintenance provides a wide and coordinated range of services aimed at improving the quality of buildings and facilities in West Africa.'

  if (isFacilityPage) {
    return (
      <footer className="lem-site-footer" aria-labelledby="lem-footer-title">
        <div className="lem-footer-grid-pattern" aria-hidden="true" />
        <div className="container lem-footer-inner">
          <div className="lem-footer-intro">
            <Link href={hrefFor('/facility-management')} className="lem-footer-logo-link" aria-label="LEM Maintenance home">
              <img src="/images/logo/lem-maintenance-logo.png" alt="LEM Maintenance" className="lem-footer-logo" />
            </Link>
            <p id="lem-footer-title" className="lem-footer-description">{lemDescription}</p>
            <div className="lem-footer-socials" aria-label="Social media links">
              {socialLinks.map(({ key, label, icon: Icon }) => (
                <a key={key} href={siteConfig.socials[key]} className="lem-footer-social-link" aria-label={label} target="_blank" rel="noreferrer">
                  <Icon size={17} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="lem-footer-details">
            <section className="lem-footer-column" aria-labelledby="lem-footer-locations">
              <h3 id="lem-footer-locations">{copy.locationsTitle}</h3>
              <div className="lem-footer-office-list">
                {copy.offices.map((office, index) => (
                  <article key={office.country} className="lem-footer-office">
                    <span className="lem-footer-number">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <strong>{office.country}</strong>
                      <div className="lem-footer-office-addresses">
                        {office.addresses.map((location) => (
                          <p key={`${office.country}-${location.city}`}>
                            <span>{location.city}</span>
                            {location.address}
                          </p>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="lem-footer-column" aria-labelledby="lem-footer-contacts">
              <h3 id="lem-footer-contacts">{copy.contactsTitle}</h3>
              <div className="lem-footer-contact-list">
                {copy.phones.map((phone) => (
                  <a key={`${phone.label}-${phone.suffix}`} href={`tel:${phone.href}`} className="lem-footer-contact">
                    <PhoneCall size={17} aria-hidden="true" />
                    <span>{phone.label} <em>({phone.suffix})</em></span>
                  </a>
                ))}
                <a href={`mailto:${siteConfig.email}`} className="lem-footer-contact">
                  <Mail size={17} aria-hidden="true" />
                  <span>{siteConfig.email}</span>
                </a>
              </div>
            </section>

            <section className="lem-footer-column" aria-labelledby="lem-footer-links">
              <h3 id="lem-footer-links">{copy.quickLinksTitle}</h3>
              <nav className="lem-footer-links" aria-label={copy.quickLinksTitle}>
                {quickLinks.map((link) => (
                  <Link key={link.href} href={hrefFor(link.href)}>{quickLinkLabel(link)}</Link>
                ))}
              </nav>
            </section>
          </div>
        </div>

        <div className="lem-footer-bottom">
          <div className="container lem-footer-bottom-inner">
            <p>Copyright © {year} <Link href={hrefFor('/facility-management')}>LEM Maintenance</Link>, {copy.rights}</p>
            <div className="lem-footer-bottom-links">
              <Link href={hrefFor('/media-center')}>{copy.bottomLinks.media}</Link>
              <Link href={hrefFor('/terms')}>{copy.bottomLinks.terms}</Link>
              <Link href={hrefFor('/careers')}>{copy.bottomLinks.careers}</Link>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="site-footer" aria-labelledby="site-footer-title">
      <div className="site-footer-pattern" aria-hidden="true" />
      <div className="site-footer-ambient site-footer-ambient-one" aria-hidden="true" />
      <div className="site-footer-ambient site-footer-ambient-two" aria-hidden="true" />

      <div className="container site-footer-inner">
        <div className="footer-brand-panel">
          <Link href={hrefFor('/')} className="footer-logo-link" aria-label="Lambert Electromec home">
            <img src="/images/brand/lambert-logo.png" alt="Lambert Electromec" className="footer-logo" />
          </Link>
          <h2 id="site-footer-title">{copy.tagline}</h2>
          <p className="footer-brand-text">{copy.description}</p>

          <div className="footer-socials" aria-label="Social media links">
            {socialLinks.map(({ key, label, icon: Icon }) => (
              <a
                key={key}
                href={siteConfig.socials[key]}
                className="footer-social-link"
                aria-label={label}
                target="_blank"
                rel="noreferrer"
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-main-grid">
          <section className="footer-column footer-locations" aria-labelledby="footer-locations-title">
            <h3 id="footer-locations-title">{copy.locationsTitle}</h3>
            <div className="footer-office-list">
              {copy.offices.map((office, index) => (
                <article key={office.country} className="footer-office-card">
                  <span className="footer-office-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <div className="footer-office-content">
                    <div className="footer-office-head">
                      <span
                        className={`footer-flag footer-flag-${office.flagCode}`}
                        aria-label={`${office.country} flag`}
                        role="img"
                      />
                      <strong>{office.country}</strong>
                    </div>
                    <div className="footer-office-addresses">
                      {office.addresses.map((location) => (
                        <p key={`${office.country}-${location.city}`} className="footer-office-address">
                          <span className="footer-office-city">{location.city}</span>
                          {location.address}
                        </p>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="footer-column footer-contact-column" aria-labelledby="footer-contacts-title">
            <h3 id="footer-contacts-title">{copy.contactsTitle}</h3>
            <div className="footer-contact-list">
              {copy.phones.map((phone) => (
                <a key={`${phone.label}-${phone.suffix}`} href={`tel:${phone.href}`} className="footer-contact-link">
                  <PhoneCall size={18} aria-hidden="true" />
                  <span>{phone.label} <em>({phone.suffix})</em></span>
                </a>
              ))}
              <a href={`mailto:${siteConfig.email}`} className="footer-contact-link footer-contact-email">
                <Mail size={18} aria-hidden="true" />
                <span>{siteConfig.email}</span>
              </a>
            </div>

          </section>

          <section className="footer-column footer-quick-column" aria-labelledby="footer-quick-title">
            <h3 id="footer-quick-title">{copy.quickLinksTitle}</h3>
            <nav className="footer-quick-links" aria-label={copy.quickLinksTitle}>
              {quickLinks.map((link) => (
                <Link key={link.href} href={hrefFor(link.href)} className="footer-quick-link">
                  <span>{quickLinkLabel(link)}</span>
                </Link>
              ))}
            </nav>
          </section>
        </div>
      </div>

      <div className="site-footer-bottom">
        <div className="container footer-bottom-inner">
          <p>
            Copyright © {year}{' '}
            <Link href={hrefFor('/')} className="footer-company-link">{siteConfig.legalName}</Link>, {copy.rights}
          </p>
          <div className="footer-legal-links">
            <Link href={hrefFor('/media-center')}>{copy.bottomLinks.media}</Link>
            <Link href={hrefFor('/terms')}>{copy.bottomLinks.terms}</Link>
            <Link href={hrefFor('/careers')}>{copy.bottomLinks.careers}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
