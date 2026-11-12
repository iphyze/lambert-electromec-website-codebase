import ProjectDetailPage from '@/components/pages/ProjectDetailPage.jsx'
import { projectsContent } from '@/content/fr/projects.content.js'
import { buildPageMetadata } from '@/lib/metadata.js'
import { buildProjectStaticFallback } from '@/lib/project-static-fallback.js'
import { listAllPublicProjects } from '@/lib/api/projects.js'

export const dynamicParams = false

const RUNTIME_DETAIL_SLUG = '__runtime-detail__'

export async function generateStaticParams() {
  const fallbackParams = [
    { slug: RUNTIME_DETAIL_SLUG },
    ...projectsContent.items.map((project) => ({ slug: project.key })),
  ]

  // Static export cannot generate unknown CMS slugs at request time. In local
  // development, register the currently published API slugs so direct URLs
  // behave like production, where Apache rewrites them to the runtime shell.
  if (process.env.NODE_ENV !== 'development') return fallbackParams

  try {
    const projects = await listAllPublicProjects({ locale: 'fr' })
    const seen = new Set(fallbackParams.map((item) => item.slug))
    const params = [...fallbackParams]

    projects.forEach((project) => {
      const slug = project.slug || project.key
      if (!slug || seen.has(slug)) return
      seen.add(slug)
      params.push({ slug })
    })

    return params
  } catch {
    return fallbackParams
  }
}

export const metadata = buildPageMetadata({
  title: projectsContent.detail.eyebrow,
  description: projectsContent.seo.description,
  pathname: '/projects',
  locale: 'fr',
})

export default function FrenchProjectDetailRoutePage() {
  const fallbackProjects = buildProjectStaticFallback(projectsContent.items)
  return <ProjectDetailPage content={projectsContent} locale="fr" fallbackProjects={fallbackProjects} />
}
