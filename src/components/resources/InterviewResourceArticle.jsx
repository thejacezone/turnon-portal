import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/cv-guide.css'
import '../../styles/interview-resource-article.css'

const feathers = [1, 2, 3, 4]

function InlineText({ text }) {
  return text.split(/(\*\*.+?\*\*)/g).filter(Boolean).map((part, index) => (
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>
      : <span key={`${part}-${index}`}>{part}</span>
  ))
}

function ArticleMenu({ article, activeSection, mobileDetailsRef, onNavigate }) {
  const renderButtons = () => article.sections.map((section) => (
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
      <aside className="cv-guide-sidebar" aria-label="Contenido del artículo">
        <span>TURNON / ENTREVISTAS</span>
        <strong>En esta guía</strong>
        <nav className="cv-guide-menu" aria-label="Secciones del artículo">{renderButtons()}</nav>
      </aside>
      <details className="cv-guide-mobile-menu" ref={mobileDetailsRef}>
        <summary>
          <span>En esta guía</span>
          <strong>{activeLabel}</strong>
        </summary>
        <nav className="cv-guide-menu" aria-label="Secciones del artículo en móvil">{renderButtons()}</nav>
      </details>
    </>
  )
}

function ArticleBlock({ block }) {
  if (block.type === 'heading') return <h3><InlineText text={block.text} /></h3>

  if (block.type === 'quote') {
    return (
      <blockquote className="cv-guide-callout cv-guide-quote interview-guide-quote">
        <p><InlineText text={block.text} /></p>
      </blockquote>
    )
  }

  if (block.type === 'list' || block.type === 'ordered-list') {
    const List = block.type === 'ordered-list' ? 'ol' : 'ul'
    return (
      <List className={block.type === 'ordered-list' ? 'interview-guide-ordered-list' : 'cv-guide-list'}>
        {block.items.map((item) => <li key={item}><InlineText text={item} /></li>)}
      </List>
    )
  }

  return <p className="cv-guide-paragraph"><InlineText text={block.text} /></p>
}

export default function InterviewResourceArticle({ article, resource }) {
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
  }, [article])

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
    <div className="portal-page cv-guide-page interview-resource-page">
      <header className="page-hero cv-guide-hero" aria-labelledby={`${resource.id}-article-title`}>
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
          <span className="page-hero-eyebrow">ENTREVISTAS</span>
          <h1 className="page-hero-title" id={`${resource.id}-article-title`}>{article.title}</h1>
          <p className="page-hero-subtitle">{resource.description}</p>
        </div>
      </header>

      <div className="cv-guide-layout">
        <ArticleMenu
          activeSection={activeSection}
          article={article}
          mobileDetailsRef={mobileDetailsRef}
          onNavigate={navigateToSection}
        />

        <article className="cv-guide-article">
          {article.sections.map((section, index) => (
            <section
              aria-labelledby={`${section.id}-title`}
              className="cv-guide-section"
              id={section.id}
              key={section.id}
            >
              <span className="cv-guide-section-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <h2 id={`${section.id}-title`}>{section.title}</h2>
              <div className="cv-guide-copy">
                {section.blocks.map((block, blockIndex) => <ArticleBlock block={block} key={`${section.id}-${blockIndex}`} />)}
              </div>
            </section>
          ))}

          <aside className="cv-guide-cta interview-related" aria-labelledby={`${resource.id}-related-title`}>
            <span>ARTÍCULO RELACIONADO</span>
            <h2 id={`${resource.id}-related-title`}>{article.related.heading}</h2>
            <p>
              {article.related.before}
              <Link to={article.related.to}>{article.related.label}</Link>
              {article.related.after}
            </p>
            <Link className="button ghost" to={article.related.to}>Leer artículo relacionado</Link>
            <Link className="button" to="/recursos">Volver a Recursos</Link>
          </aside>
        </article>
      </div>
    </div>
  )
}
