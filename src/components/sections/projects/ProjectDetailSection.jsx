import { Building2, CalendarDays, ChevronRight, Home, MapPin, Wrench } from 'lucide-react'
import { withLocalePath } from '@/i18n/config.js'
import ProjectGallery from './ProjectGallery.jsx'
import './ProjectDetailSection.css'

const ProjectDetailSection = ({ project, content, locale = 'en' }) => {
  const divisionLabel = project.divisionName || content.listing.divisions[project.divisionKey] || project.divisionKey
  const details = project.details || {}
  const galleryImages = project.galleryImages?.length
    ? project.galleryImages
    : [
      project.featuredImageSrc ? {
        src: project.featuredImageSrc,
        alt: project.imageAlt || project.title,
      } : null,
      ...(project.galleryImageSrcs || []).map((src, index) => ({
        src,
        alt: `${project.title} - ${content.detail.imageLabel} ${index + 2}`,
      })),
    ].filter(Boolean)

  const facts = [
    {
      key: 'location',
      label: content.detail.locationLabel,
      value: project.location,
      Icon: MapPin,
    },
    details.workDone ? {
      key: 'work',
      label: content.detail.workDoneLabel,
      value: details.workDone,
      Icon: Wrench,
    } : null,
    details.projectYear ? {
      key: 'year',
      label: content.detail.projectYearLabel,
      value: details.projectYear,
      Icon: CalendarDays,
    } : null,
    {
      key: 'division',
      label: content.detail.divisionLabel,
      value: divisionLabel,
      Icon: Building2,
    },
  ].filter(Boolean)

  return (
    <main className="project-detail-page">
      <section className="project-detail-hero">
        <span className="project-detail-hero-grid" aria-hidden="true" />
        <span className="project-detail-hero-glow project-detail-hero-glow-one" aria-hidden="true" />
        <span className="project-detail-hero-glow project-detail-hero-glow-two" aria-hidden="true" />

        <div className="container project-detail-hero-inner">
          <nav className="project-detail-breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Home size={14} aria-hidden="true" />
                <a href={withLocalePath('/', locale)}>{content.pageHeader.breadcrumbs[0]?.label}</a>
                <ChevronRight size={14} aria-hidden="true" />
              </li>
              <li>
                <a href={withLocalePath('/projects/', locale)}>{content.pageHeader.breadcrumbs[1]?.label}</a>
                <ChevronRight size={14} aria-hidden="true" />
              </li>
              <li>
                <span aria-current="page">{project.title}</span>
              </li>
            </ol>
          </nav>

          <div className="project-detail-hero-copy">
            <span className="section-kicker">{content.detail.eyebrow}</span>
            <h1>{project.title}</h1>
            <p>{details.description || project.summary}</p>
          </div>
        </div>
      </section>

      <section className="project-detail-content section-padding">
        <div className="container project-detail-layout">
          <div className="project-detail-gallery-wrap">
            <ProjectGallery images={galleryImages} title={project.title} labels={content.detail} />
          </div>

          <aside className="project-detail-info">
            <span className="project-detail-info-kicker">{content.detail.informationLabel}</span>
            <dl className="project-detail-facts">
              {facts.map(({ key, label, value, Icon }) => (
                <div className="project-detail-fact" key={key}>
                  <span className="project-detail-fact-icon">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default ProjectDetailSection
