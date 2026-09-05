import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/cv-guide.css'
import '../../styles/speaking-toolkit-article.css'

const feathers = [1, 2, 3, 4]

function InlineText({ text }) {
  return text.split(/(\*\*.+?\*\*)/g).filter(Boolean).map((part, index) => (
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>
      : <span key={`${part}-${index}`}>{part}</span>
  ))
}

function ArticleBlock({ block }) {
  if (block.type === 'heading') return <h3><InlineText text={block.text} /></h3>

  if (block.type === 'quote') {
    return (
      <blockquote className="cv-guide-callout cv-guide-quote speaking-toolkit-example">
        <p><InlineText text={block.text} /></p>
      </blockquote>
    )
  }

  if (block.type === 'callout') {
    return (
      <aside className="speaking-toolkit-callout" role="note">
        <span aria-hidden="true">→</span>
        <p><InlineText text={block.text} /></p>
      </aside>
    )
  }

  if (block.type === 'formula') {
    return <div className="speaking-toolkit-formula"><InlineText text={block.text} /></div>
  }

  if (block.type === 'list' || block.type === 'ordered-list') {
    const List = block.type === 'ordered-list' ? 'ol' : 'ul'
    return (
      <List className={block.type === 'ordered-list' ? 'speaking-toolkit-ordered-list' : 'cv-guide-list'}>
        {block.items.map((item, index) => <li key={`${item}-${index}`}><InlineText text={item} /></li>)}
      </List>
    )
  }

  return <p className="cv-guide-paragraph"><InlineText text={block.text} /></p>
}

function ArticleMenu({ sections, activeSection, mobileDetailsRef, onNavigate }) {
  const activeLabel = sections.find((section) => section.id === activeSection)?.navLabel
  const buttons = sections.map((section) => (
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
      <aside className="cv-guide-sidebar" aria-label="Contenido del artículo">
        <span>TURNON / INGLÉS LABORAL</span>
        <strong>En este recurso</strong>
        <nav className="cv-guide-menu" aria-label="Secciones del artículo">{buttons}</nav>
      </aside>
      <details className="cv-guide-mobile-menu" ref={mobileDetailsRef}>
        <summary>
          <span>En este recurso</span>
          <strong>{activeLabel}</strong>
        </summary>
        <nav className="cv-guide-menu" aria-label="Secciones del artículo en móvil">{buttons}</nav>
      </details>
    </>
  )
}

export default function SpeakingToolkitArticle({ article, resource }) {
  const menuSections = useMemo(() => [
    { id: 'introduccion', navLabel: 'Introducción' },
    ...article.sections,
  ], [article.sections])
  const [activeSection, setActiveSection] = useState(menuSections[0].id)
  const mobileDetailsRef = useRef(null)

  useEffect(() => {
    const previousTitle = document.title
    const descriptionTag = document.querySelector('meta[name="description"]')
    const previousDescription = descriptionTag?.getAttribute('content')

    document.title = article.metaTitle
    descriptionTag?.setAttribute('content', article.metaDescription)

    return () => {
      document.title = previousTitle
      if (descriptionTag && previousDescription) descriptionTag.setAttribute('content', previousDescription)
    }
  }, [article.metaDescription, article.metaTitle])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })

    const updateActiveSection = () => {
      const currentSection = menuSections.reduce((current, section) => {
        const element = document.getElementById(section.id)
        return element && element.getBoundingClientRect().top <= 240 ? section.id : current
      }, menuSections[0].id)
      setActiveSection(currentSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    return () => window.removeEventListener('scroll', updateActiveSection)
  }, [menuSections])

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
    <div className="portal-page cv-guide-page speaking-toolkit-page">
      <header className="page-hero cv-guide-hero speaking-toolkit-hero" aria-labelledby={`${resource.id}-article-title`}>
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
          <span className="page-hero-eyebrow">INGLÉS LABORAL</span>
          <h1 className="page-hero-title" id={`${resource.id}-article-title`}>{article.title}</h1>
          <p className="page-hero-subtitle">{article.subtitle}</p>
        </div>
      </header>

      <div className="cv-guide-layout">
        <ArticleMenu
          activeSection={activeSection}
          mobileDetailsRef={mobileDetailsRef}
          onNavigate={navigateToSection}
          sections={menuSections}
        />

        <article className="cv-guide-article">
          <section className="cv-guide-section speaking-toolkit-introduction" id="introduccion" aria-labelledby="introduccion-title">
            <span className="cv-guide-section-number" aria-hidden="true">00</span>
            <h2 id="introduccion-title">Introducción</h2>
            <div className="cv-guide-copy">
              {article.introduction.map((paragraph) => <p className="cv-guide-paragraph" key={paragraph}>{paragraph}</p>)}
              <aside className="speaking-toolkit-objectives" aria-labelledby="speaking-toolkit-objectives-title">
                <h3 id="speaking-toolkit-objectives-title">Después de leer este recurso vas a poder:</h3>
                <ul className="cv-guide-list">
                  {article.objectives.map((objective) => <li key={objective}>{objective}</li>)}
                </ul>
              </aside>
            </div>
          </section>

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

          <aside className="cv-guide-cta speaking-toolkit-cta" aria-labelledby="speaking-toolkit-cta-title">
            <span>SEGUÍ PRACTICANDO</span>
            <h2 id="speaking-toolkit-cta-title">{article.cta.title}</h2>
            <p>{article.cta.text}</p>
            <div>
              {article.cta.links.map((link, index) => (
                <Link className={`button${index ? ' ghost' : ''}`} key={link.to} to={link.to}>{link.label}</Link>
              ))}
            </div>
          </aside>
        </article>
      </div>
    </div>
  )
}
