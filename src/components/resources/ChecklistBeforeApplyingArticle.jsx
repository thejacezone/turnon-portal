import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { checklistBeforeApplyingArticle as article } from '../../data/checklistBeforeApplyingArticle.js'
import '../../styles/cv-guide.css'
import '../../styles/checklist-before-applying.css'

const feathers = [1, 2, 3, 4]

function ArticleMenu({ activeSection, onNavigate, mobileDetailsRef }) {
  const menuButtons = () => article.sections.map((section) => (
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

  const activeLabel = article.sections.find((section) => section.id === activeSection)?.navLabel

  return (
    <>
      <aside className="cv-guide-sidebar" aria-label="Contenido del checklist">
        <span>TURNON CHECKLIST</span>
        <strong>En esta guía</strong>
        <nav className="cv-guide-menu" aria-label="Secciones del artículo">{menuButtons()}</nav>
      </aside>

      <details className="cv-guide-mobile-menu" ref={mobileDetailsRef}>
        <summary>
          <span>En esta guía</span>
          <strong>{activeLabel}</strong>
        </summary>
        <nav className="cv-guide-menu" aria-label="Secciones del artículo en móvil">{menuButtons()}</nav>
      </details>
    </>
  )
}

function StandardList({ items, variant }) {
  return (
    <ul className={`cv-guide-list${variant === 'avoid' ? ' cv-guide-list--avoid' : ''}`}>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  )
}

function ArticleBlock({ block }) {
  if (block.type === 'heading') return <h3>{block.text}</h3>

  if (block.type === 'list') return <StandardList items={block.items} variant={block.variant} />

  if (block.type === 'highlight') {
    return (
      <aside className="cv-guide-callout checklist-highlight" aria-label={block.title}>
        <strong>{block.title}</strong>
        <p>{block.text}</p>
        {block.secondary && <small>{block.secondary}</small>}
      </aside>
    )
  }

  if (block.type === 'example') {
    return (
      <aside className="cv-example-card" aria-label={block.label}>
        <strong>{block.label}</strong>
        <p>{block.text}</p>
        {block.items && <StandardList items={block.items} />}
      </aside>
    )
  }

  if (block.type === 'comparison') {
    return (
      <div className="cv-filename-comparison" aria-label="Comparación de nombres de archivo">
        <div className="is-good"><strong>{block.goodLabel}</strong><code>{block.goodText}</code></div>
        <div className="is-bad"><strong>{block.badLabel}</strong><code>{block.badText}</code></div>
      </div>
    )
  }

  if (block.type === 'splitLists') {
    return (
      <div className="checklist-split-grid">
        {block.groups.map((group) => (
          <section key={group.title}>
            <h3>{group.title}</h3>
            <StandardList items={group.items} />
          </section>
        ))}
      </div>
    )
  }

  if (block.type === 'table') {
    return (
      <div className="checklist-table-wrap">
        <table className="checklist-application-table">
          <caption>{block.caption}</caption>
          <thead><tr>{block.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row.join('-')}>
                {row.map((cell, index) => <td data-label={block.columns[index]} key={`${cell}-${index}`}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (block.type === 'checklistGroups') {
    return (
      <div className="checklist-final-grid">
        {block.groups.map((group) => (
          <section key={group.title}>
            <h3>{group.title}</h3>
            <ul className="cv-guide-checklist">
              {group.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        ))}
      </div>
    )
  }

  return <p className="cv-guide-paragraph">{block.text}</p>
}

export default function ChecklistBeforeApplyingArticle() {
  const [activeSection, setActiveSection] = useState(article.sections[0].id)
  const mobileDetailsRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })

    const updateActiveSection = () => {
      const currentSection = article.sections.reduce((current, section) => {
        const element = document.getElementById(section.id)
        return element && element.getBoundingClientRect().top <= 240 ? section.id : current
      }, article.sections[0].id)

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
    <div className="portal-page cv-guide-page checklist-article-page">
      <header className="page-hero cv-guide-hero" aria-labelledby="application-checklist-title">
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
          <span className="page-hero-eyebrow">CV Y APLICACIÓN</span>
          <h1 className="page-hero-title" id="application-checklist-title">{article.title}</h1>
          <p className="page-hero-subtitle">{article.subtitle}</p>
        </div>
      </header>

      <div className="cv-guide-layout">
        <ArticleMenu
          activeSection={activeSection}
          mobileDetailsRef={mobileDetailsRef}
          onNavigate={navigateToSection}
        />

        <article className="cv-guide-article">
          <section className="cv-guide-section checklist-article-introduction" aria-labelledby="checklist-introduction-title">
            <span className="cv-guide-section-number" aria-hidden="true">00</span>
            <h2 id="checklist-introduction-title">Antes de aplicar</h2>
            <div className="cv-guide-copy">
              {article.introduction.map((paragraph) => <p className="cv-guide-paragraph" key={paragraph}>{paragraph}</p>)}
            </div>
          </section>

          {article.sections.map((section, index) => (
            <section
              className="cv-guide-section"
              id={section.id}
              key={section.id}
              aria-labelledby={`${section.id}-title`}
            >
              <span className="cv-guide-section-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <h2 id={`${section.id}-title`}>{section.title}</h2>
              <div className="cv-guide-copy">
                {section.blocks.map((block, blockIndex) => <ArticleBlock block={block} key={`${section.id}-${blockIndex}`} />)}
              </div>
            </section>
          ))}

          <aside className="cv-guide-cta checklist-related-section" aria-labelledby="checklist-related-title">
            <span>SIGUIENTE PASO</span>
            <h2 id="checklist-related-title">Seguí preparando tu aplicación</h2>
            <div className="checklist-related-grid">
              {article.relatedResources.map((resource) => (
                <Link className="checklist-related-link" key={resource.to} to={resource.to}>
                  <strong>{resource.label}</strong>
                  <span>{resource.description}</span>
                  <b aria-hidden="true">→</b>
                </Link>
              ))}
            </div>
            <Link className="button checklist-back-button" to="/recursos">Volver a Recursos</Link>
          </aside>
        </article>
      </div>
    </div>
  )
}
