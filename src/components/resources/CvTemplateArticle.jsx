import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../PageHeader.jsx'
import '../../styles/cv-guide.css'
import '../../styles/cv-template-article.css'

export default function CvTemplateArticle({ resource }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [resource.id])

  return (
    <div className="portal-page cv-guide-page cv-template-page">
      <PageHeader
        before={(
          <nav className="cv-template-breadcrumb" aria-label="Breadcrumb">
            <Link className="cv-template-back" to="/recursos">← Volver a Recursos</Link>
          </nav>
        )}
        className="cv-guide-hero cv-template-hero"
        description={resource.introduction}
        eyebrow="CV Y APLICACIÓN"
        title={resource.title}
      />

      <article className="cv-template-article">
        <section className="cv-template-copy" aria-labelledby="cv-template-overview-title">
          <h2 className="sr-only" id="cv-template-overview-title">Cómo usar esta plantilla</h2>
          {resource.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p>
            {resource.guideParagraph.before}
            <Link to={resource.guidePath}>{resource.guideParagraph.linkLabel}</Link>
            {resource.guideParagraph.after}
          </p>
        </section>

        <aside className="cv-template-callout" aria-labelledby="cv-template-callout-title">
          <span>IMPORTANTE</span>
          <h2 id="cv-template-callout-title">{resource.callout.title}</h2>
          <p>{resource.callout.text}</p>
        </aside>

        <section className="cv-template-checklist" aria-labelledby="cv-template-checklist-title">
          <span className="cv-guide-section-number" aria-hidden="true">01</span>
          <h2 id="cv-template-checklist-title">Antes de enviarlo</h2>
          <ul className="cv-guide-checklist">
            {resource.beforeSending.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <aside className="cv-guide-cta cv-template-cta" aria-labelledby="cv-template-download-title">
          <span>DESCARGA PREPARADA</span>
          <h2 id="cv-template-download-title">Personalizá primero. Descargá cuando esté lista.</h2>
          <p>Abrí la carpeta de plantillas, elegí la versión que necesitás y guardá una copia para personalizarla con tu información.</p>
          <div>
            {resource.downloadEnabled ? (
              <a className="button" href={resource.downloadUrl} rel="noopener noreferrer" target="_blank">
                {resource.downloadLabel}
              </a>
            ) : (
              <button className="button" disabled type="button">{resource.downloadLabel}</button>
            )}
            <Link className="button ghost" to={resource.guidePath}>Guía para hacer tu CV</Link>
            <Link className="button ghost" to="/recursos">Volver a Recursos</Link>
          </div>
        </aside>
      </article>
    </div>
  )
}
