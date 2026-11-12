'use client'

import { useCallback, useEffect, useState } from 'react'
import PageHeader from '@/components/layout/PageHeader.jsx'
import ProjectsListingSection from '@/components/sections/projects/ProjectsListingSection.jsx'
import { listAllPublicProjects } from '@/lib/api/projects.js'
import { listPublicProjectDivisions } from '@/lib/api/divisions.js'

const ProjectsPage = ({ content, locale = 'en', fallbackProjects = [] }) => {
  const [projects, setProjects] = useState([])
  const [divisions, setDivisions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const retry = useCallback(() => {
    setReloadKey((current) => current + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    const loadProjects = async () => {
      setLoading(true)
      setError(null)

      try {
        const [items, divisionItems] = await Promise.all([
          listAllPublicProjects({ locale }, { signal: controller.signal }),
          listPublicProjectDivisions(locale, { signal: controller.signal }),
        ])

        if (!controller.signal.aborted) {
          // The public API intentionally exposes published records only. During
          // local migration work the seeded CMS records are still drafts, so a
          // healthy-but-empty API may temporarily use the bundled portfolio.
          // Production remains API-only unless explicitly enabled at build time.
          setProjects(items.length ? items : fallbackProjects)
          setDivisions(divisionItems)
        }
      } catch (requestError) {
        if (requestError?.name === 'AbortError' || controller.signal.aborted) return
        setProjects([])
        setDivisions([])
        setError(requestError)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadProjects()

    return () => controller.abort()
  }, [fallbackProjects, locale, reloadKey])

  return (
    <div className="projects-page" lang={locale}>
      <PageHeader {...content.pageHeader} />
      <ProjectsListingSection
        content={content.listing}
        projects={projects}
        divisions={divisions}
        locale={locale}
        loading={loading}
        error={error}
        onRetry={retry}
      />
    </div>
  )
}

export default ProjectsPage
