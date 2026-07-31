import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { cvGuideArticle } from '../data/cvGuideArticle.js'
import '../styles/cv-guide.css'

const feathers = [1, 2, 3, 4]

function ArticleMenu({ activeSection, onNavigate, mobileDetailsRef }) {
  const buttons = cvGuideArticle.sections.map((section) => (
    <button
      aria-current={activeSection === section.id ? 'location' : undefined}
      className={activeSection === section.id ? 'is-active' : ''}
      key={section.id}
      onClick={() => onNavigate(section.id)}
      type="button"
    >
      {section.navLabel}
    </button>
  ))

  return (
    <>
      <aside className="cv-guide-sidebar" aria-label="Contenido de la guía">
        <span>EN ESTA GUÍA</span>
        <strong>Contenido</strong>
        <nav className="cv-guide-menu" aria-label="Secciones del artículo">{buttons}</nav>
      </aside>

      <details className="cv-guide-mobile-menu" ref={mobileDetailsRef}>
        <summary>
          <span>Contenido de la guía</span>
          <strong>{cvGuideArticle.sections.find((section) => section.id === activeSection)?.navLabel}</strong>
        </summary>
        <nav className="cv-guide-menu" aria-label="Secciones del artículo en móvil">{buttons}</nav>
      </details>
    </>
  )
}

function ArticleBlock({ block }) {
  if (block.type === 'heading') return <h3>{block.text}</h3>

  if (block.type === 'callout' || block.type === 'quote') {
    return (
      <blockquote className={`cv-guide-callout${block.type === 'quote' ? ' cv-guide-quote' : ''}`}>
        <p>{block.text}</p>
      </blockquote>
    )
  }

  if (block.type === 'list' || block.type === 'checklist') {
    return (
      <ul className={[
        block.type === 'checklist' ? 'cv-guide-checklist' : 'cv-guide-list',
        block.variant === 'avoid' ? 'cv-guide-list--avoid' : '',
      ].filter(Boolean).join(' ')}>
        {block.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    )
  }

  if (block.type === 'example') {
    return (
      <aside className="cv-example-card" aria-label={block.label}>
        <strong>{block.label}</strong>
        <p>{block.text}</p>
        {block.items && <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>}
      </aside>
    )
  }

  if (block.type === 'comparison') {
    return (
      <div className="cv-filename-comparison" aria-label="Ejemplos de nombres de archivo">
        <div className="is-good"><strong>{block.goodLabel}</strong><code>{block.goodText}</code></div>
        <div className="is-bad"><strong>{block.badLabel}</strong><code>{block.badText}</code></div>
      </div>
    )
  }

  return <p className="cv-guide-paragraph">{block.text}</p>
}

export default function CvGuideArticle() {
  const [activeSection, setActiveSection] = useState(cvGuideArticle.sections[0].id)
  const mobileDetailsRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })

    const updateActiveSection = () => {
      const currentSection = cvGuideArticle.sections.reduce((current, section) => {
        const element = document.getElementById(section.id)
        return element && element.getBoundingClientRect().top <= 240 ? section.id : current
      }, cvGuideArticle.sections[0].id)

      setActiveSection(currentSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    return () => window.removeEventListener('scroll', updateActiveSection)
  }, [])

  const navigateToSection = (sectionId) => {
    setActiveSection(sectionId)
    mobileDetailsRef.current?.removeAttribute('open')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <div className="portal-page cv-guide-page">
      <header className="page-hero cv-guide-hero" aria-labelledby="cv-guide-title">
        {feathers.map((number) => (
          <img
            alt=""
            aria-hidden="true"
            className={`page-hero-feather page-hero-feather--${number}`}
            key={number}
            src={`/assets/feathers/feather${number}.png`}
          />
        ))}
        <div className="page-hero-inner">
          <Link className="cv-guide-back" to="/recursos">← Volver a Recursos</Link>
          <span className="page-hero-eyebrow">TURNON / RECURSOS</span>
          <h1 className="page-hero-title" id="cv-guide-title">{cvGuideArticle.title}</h1>
          <p className="page-hero-subtitle">{cvGuideArticle.subtitle}</p>
          <div className="cv-guide-hero-actions" aria-label="Plantillas de CV">
            <Link className="button" to="/recursos/cv-es">Plantilla de CV en español</Link>
            <Link className="button ghost" to="/recursos/cv-en">Plantilla de CV en inglés</Link>
          </div>
        </div>
      </header>

      <div className="cv-guide-layout">
        <ArticleMenu
          activeSection={activeSection}
          mobileDetailsRef={mobileDetailsRef}
          onNavigate={navigateToSection}
        />

        <article className="cv-guide-article">
          {cvGuideArticle.sections.map((section) => (
            <section
              className="cv-guide-section"
              id={section.id}
              key={section.id}
              aria-labelledby={`${section.id}-title`}
            >
              <span className="cv-guide-section-number" aria-hidden="true">
                {String(cvGuideArticle.sections.indexOf(section) + 1).padStart(2, '0')}
              </span>
              <h2 id={`${section.id}-title`}>{section.title}</h2>
              <div className="cv-guide-copy">
                {section.blocks.map((block, index) => (
                  <ArticleBlock block={block} key={`${section.id}-${index}`} />
                ))}
              </div>
            </section>
          ))}

          <aside className="cv-guide-cta" aria-labelledby="cv-guide-cta-title">
            <span>LISTAS PARA EDITAR</span>
            <h2 id="cv-guide-cta-title">¿Ya leíste la guía? Ahora podés usar una plantilla lista.</h2>
            <div>
              <Link className="button" to="/recursos/cv-es">Plantilla de CV en español</Link>
              <Link className="button ghost" to="/recursos/cv-en">Plantilla de CV en inglés</Link>
            </div>
          </aside>
        </article>
      </div>
    </div>
  )
}
