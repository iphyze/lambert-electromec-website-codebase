import ProjectDetailPage from '@/components/pages/ProjectDetailPage.jsx'
import { projectsContent } from '@/content/en/projects.content.js'
import { buildPageMetadata } from '@/lib/metadata.js'
import { buildProjectStaticFallback } from '@/lib/project-static-fallback.js'
import { getPublicProjectBySlug, listAllPublicProjects } from '@/lib/api/projects.js'

export const dynamicParams = false

const RUNTIME_DETAIL_SLUG = '__runtime-detail__'

export async function generateStaticParams() {
  const fallbackParams = [
    { slug: RUNTIME_DETAIL_SLUG },
    ...projectsContent.items.map((project) => ({ slug: project.key })),
  ]

  try {
    const projects = await listAllPublicProjects({ locale: 'en' }, { cache: 'force-cache' })
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

const resolveBuildProject = async (slug, fallbackProjects) => {
  if (!slug || slug === RUNTIME_DETAIL_SLUG) return null

  try {
    return await getPublicProjectBySlug(slug, 'en', { cache: 'force-cache' })
  } catch {
    return fallbackProjects.find((project) => (project.slug || project.key) === slug) || null
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const fallbackProjects = buildProjectStaticFallback(projectsContent.items)
  const project = await resolveBuildProject(slug, fallbackProjects)

  if (!project) {
    return buildPageMetadata({
      title: projectsContent.pageHeader.title,
      description: projectsContent.seo.description,
      pathname: '/projects',
      locale: 'en',
    })
  }

  return buildPageMetadata({
    title: project.seo?.title || project.title,
    description: project.seo?.description || project.summary || project.details?.description || projectsContent.seo.description,
    pathname: `/projects/${project.slug || project.key}`,
    locale: 'en',
    image: project.featuredImageSrc || undefined,
    imageAlt: project.imageAlt || project.title,
  })
}

export default async function ProjectDetailRoutePage({ params }) {
  const { slug } = await params
  const fallbackProjects = buildProjectStaticFallback(projectsContent.items)
  const initialProject = await resolveBuildProject(slug, fallbackProjects)

  return (
    <ProjectDetailPage
      content={projectsContent}
      locale="en"
      fallbackProjects={fallbackProjects}
      initialProject={initialProject}
    />
  )
}
