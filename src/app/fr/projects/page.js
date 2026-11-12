import ProjectsPage from '@/components/pages/ProjectsPage.jsx'
import { projectsContent } from '@/content/fr/projects.content.js'
import { buildPageMetadata } from '@/lib/metadata.js'
import { buildProjectStaticFallback } from '@/lib/project-static-fallback.js'

export const metadata = buildPageMetadata({
  title: projectsContent.seo.title,
  description: projectsContent.seo.description,
  keywords: projectsContent.seo.keywords,
  pathname: '/projects',
  locale: 'fr',
})

export default function FrenchProjectsRoutePage() {
  const fallbackProjects = buildProjectStaticFallback(projectsContent.items)
  return <ProjectsPage content={projectsContent} locale="fr" fallbackProjects={fallbackProjects} />
}
