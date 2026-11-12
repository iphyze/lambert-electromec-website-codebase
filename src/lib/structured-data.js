import { siteConfig } from '@/config/site.config'

const absoluteUrl = (pathname = '/') => new URL(pathname, siteConfig.url).toString()

export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  logo: absoluteUrl('/images/brand/lambert-logo.png'),
  email: siteConfig.email,
  telephone: siteConfig.phone,
  sameAs: Object.values(siteConfig.socials).filter(Boolean),
}

export const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  publisher: {
    '@id': `${siteConfig.url}/#organization`,
  },
  inLanguage: ['en', 'fr'],
}

export const buildBreadcrumbStructuredData = ({ items = [] }) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
})
