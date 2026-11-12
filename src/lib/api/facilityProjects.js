import { publicApiFetch } from './client.js'

const normalizeFacilityProject = (project = {}) => ({
  id: Number(project.id || 0),
  slug: String(project.slug || ''),
  title: String(project.title || ''),
  description: String(project.description || ''),
  workDone: String(project.work_done || ''),
  image: String(project.image_url || ''),
  displayOrder: Number(project.display_order || 0),
  publishedAt: project.published_at || null,
})

export const listPublicFacilityProjects = async (locale = 'en', options = {}) => {
  const payload = await publicApiFetch('/facility-management/projects', {
    params: { lang: locale },
    signal: options.signal,
  })

  return (payload?.data || []).map(normalizeFacilityProject)
}
