import { publicApiFetch } from './client.js'

export const listPublicProjectDivisions = async (locale = 'en', options = {}) => {
  const payload = await publicApiFetch('/projects/divisions', {
    params: { lang: locale },
    signal: options.signal,
  })

  return (payload?.data || []).map((division) => ({
    id: Number(division.id || 0),
    key: String(division.key || ''),
    slug: String(division.slug || ''),
    name: String(division.name || ''),
    displayOrder: Number(division.display_order || 0),
  }))
}
