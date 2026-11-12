import { siteConfig } from '@/config/site.config'
import { projectsContent } from '@/content/en/projects.content'
import { withLocalePath } from '@/i18n/config'

export const dynamic = 'force-static'

const staticPaths = [
  '/',
  '/about',
  '/about/history',
  '/about/mission-vision',
  '/about/profile',
  '/careers',
  '/contact',
  '/corporate',
  '/corporate/csr',
  '/corporate/hse',
  '/corporate/qms-iso',
  '/corporate/solution-provider',
  '/divisions',
  '/facility-management',
  '/media-center',
  '/projects',
  '/renewable-energy',
  '/services',
  '/terms',
]

const withTrailingSlash = (pathname) =>
  pathname === '/' || pathname.endsWith('/') ? pathname : `${pathname}/`

const absoluteUrl = (pathname) =>
  new URL(withTrailingSlash(pathname), siteConfig.url).toString()

const buildEntry = (pathname, locale) => {
  const englishPath = withLocalePath(pathname, 'en')
  const frenchPath = withLocalePath(pathname, 'fr')
  const localizedPath = locale === 'fr' ? frenchPath : englishPath

  return {
    url: absoluteUrl(localizedPath),
    alternates: {
      languages: {
        en: absoluteUrl(englishPath),
        fr: absoluteUrl(frenchPath),
        'x-default': absoluteUrl(englishPath),
      },
    },
  }
}

export default function sitemap() {
  const projectPaths = projectsContent.items.map(
    (project) => `/projects/${project.key}`,
  )
  const paths = [...staticPaths, ...projectPaths]

  return paths.flatMap((pathname) => [
    buildEntry(pathname, 'en'),
    buildEntry(pathname, 'fr'),
  ])
}
