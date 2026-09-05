import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/cv-guide.css'
import '../../styles/interview-without-experience.css'

const feathers = [1, 2, 3, 4]

const articleSections = [
  { id: 'introduccion', label: 'Introducción' },
  { id: 'como-usar', label: 'Cómo usar las respuestas' },
  { id: 'preguntas-respuestas', label: 'Preguntas y respuestas' },
  { id: 'errores-comunes', label: 'Errores comunes' },
  { id: 'tecnicas', label: 'Técnicas por pregunta' },
  { id: 'frases-utiles', label: 'Frases para ganar tiempo' },
  { id: 'cierre', label: 'Cierre' },
]

function ArticleMenu({ activeSection, mobileDetailsRef, onNavigate }) {
  const renderButtons = () => articleSections.map((section) => (
    <button
      aria-current={activeSection === section.id ? 'location' : undefined}
      className={activeSection === section.id ? 'is-active' : ''}
      key={section.id}
      onClick={() => onNavigate(section.id)}
      type="button"
    >
      {section.label}
    </button>
  ))

  const activeLabel = articleSections.find((section) => section.id === activeSection)?.label

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

function QuestionAccordion({ item, number }) {
  return (
    <details className="no-experience-question" id={item.id}>
      <summary>
        <span aria-hidden="true">{String(number).padStart(2, '0')}</span>
        <strong>{item.question}</strong>
      </summary>
      <div className="no-experience-question__content">
        <aside className="no-experience-tip" role="note">
          <strong>Consejo rápido</strong>
          <p>{item.tip}</p>
        </aside>
        <div className="no-experience-answers">
          <section aria-labelledby={`${item.id}-b1`} className="no-experience-answer">
            <span id={`${item.id}-b1`}>Respuesta B1</span>
            <p>{item.b1}</p>
          </section>
          <section aria-labelledby={`${item.id}-b2`} className="no-experience-answer no-experience-answer--advanced">
            <span id={`${item.id}-b2`}>Respuesta B2–C1</span>
            <p>{item.b2}</p>
          </section>
        </div>
        <p className="no-experience-adapt"><strong>Nota para adaptar:</strong> {item.note}</p>
      </div>
    </details>
  )
}

function SectionHeading({ id, number, children }) {
  return (
    <>
      <span className="cv-guide-section-number" aria-hidden="true">{number}</span>
      <h2 id={`${id}-title`}>{children}</h2>
    </>
  )
}

export default function InterviewWithoutExperienceArticle({ article, resource }) {
  const [activeSection, setActiveSection] = useState(articleSections[0].id)
  const mobileDetailsRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })

    const updateActiveSection = () => {
      const currentSection = articleSections.reduce((current, section) => {
        const element = document.getElementById(section.id)
        return element && element.getBoundingClientRect().top <= 240 ? section.id : current
      }, articleSections[0].id)
      setActiveSection(currentSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    return () => window.removeEventListener('scroll', updateActiveSection)
  }, [])

  useEffect(() => {
    const previousTitle = document.title
    let description = document.querySelector('meta[name="description"]')
    const createdDescription = !description
    const previousDescription = description?.getAttribute('content') ?? ''

    if (!description) {
      description = document.createElement('meta')
      description.setAttribute('name', 'description')
      document.head.appendChild(description)
    }

    document.title = article.metaTitle
    description.setAttribute('content', article.metaDescription)

    return () => {
      document.title = previousTitle
      if (createdDescription) description.remove()
      else description.setAttribute('content', previousDescription)
    }
  }, [article.metaDescription, article.metaTitle])

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
    <div className="portal-page cv-guide-page no-experience-page">
      <header className="page-hero cv-guide-hero no-experience-hero" aria-labelledby={`${resource.id}-article-title`}>
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
          <span className="page-hero-eyebrow">ENTREVISTAS / SIN EXPERIENCIA</span>
          <h1 className="page-hero-title" id={`${resource.id}-article-title`}>{article.title}</h1>
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
          <section aria-labelledby="introduccion-title" className="cv-guide-section no-experience-intro" id="introduccion">
            <SectionHeading id="introduccion" number="00">Introducción</SectionHeading>
            <div className="cv-guide-copy">
              {article.introduction.map((paragraph) => <p className="cv-guide-paragraph" key={paragraph}>{paragraph}</p>)}
              <blockquote className="cv-guide-callout no-experience-highlight"><p>{article.highlight}</p></blockquote>
            </div>
          </section>

          <section aria-labelledby="como-usar-title" className="cv-guide-section" id="como-usar">
            <SectionHeading id="como-usar" number="01">{article.howToUse.title}</SectionHeading>
            <div className="cv-guide-copy">
              <p className="cv-guide-paragraph">{article.howToUse.paragraphs[0]}</p>
              <div className="no-experience-levels">
                {article.howToUse.levels.map((level) => (
                  <div key={level.label}>
                    <strong>{level.label}</strong>
                    <p>{level.text}</p>
                  </div>
                ))}
              </div>
              <p className="cv-guide-paragraph">{article.howToUse.paragraphs[1]}</p>
              <aside className="no-experience-strategy" aria-labelledby="no-experience-strategy-title">
                <h3 id="no-experience-strategy-title">{article.strategy.title}</h3>
                <ol>
                  {article.strategy.steps.map((step) => <li key={step}>{step}</li>)}
                </ol>
                <blockquote><p>{article.strategy.example}</p></blockquote>
              </aside>
            </div>
          </section>

          <section aria-labelledby="preguntas-respuestas-title" className="cv-guide-section" id="preguntas-respuestas">
            <SectionHeading id="preguntas-respuestas" number="02">Preguntas y respuestas modelo</SectionHeading>
            <p className="no-experience-section-lead">Abrí cada pregunta para ver el consejo, una respuesta B1, una respuesta B2–C1 y una nota para personalizarla.</p>
            <div className="no-experience-question-list">
              {article.questions.map((item, index) => <QuestionAccordion item={item} key={item.id} number={index + 1} />)}
            </div>
          </section>

          <section aria-labelledby="errores-comunes-title" className="cv-guide-section" id="errores-comunes">
            <SectionHeading id="errores-comunes" number="03">Errores comunes al responder sin experiencia</SectionHeading>
            <ol className="no-experience-errors">
              {article.commonErrors.map((error) => (
                <li key={error.title}>
                  <strong>{error.title}</strong>
                  <p>{error.explanation}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="tecnicas-title" className="cv-guide-section" id="tecnicas">
            <SectionHeading id="tecnicas" number="04">Qué técnicas usar para cada tipo de pregunta</SectionHeading>
            <div className="no-experience-table-wrap">
              <table>
                <thead><tr><th>Tipo de pregunta</th><th>Técnica recomendada</th></tr></thead>
                <tbody>
                  {article.techniques.map(([question, technique]) => <tr key={question}><td>{question}</td><td>{technique}</td></tr>)}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="frases-utiles-title" className="cv-guide-section" id="frases-utiles">
            <SectionHeading id="frases-utiles" number="05">Frases útiles para ganar tiempo</SectionHeading>
            <ul className="no-experience-phrases">
              {article.thinkingPhrases.map((phrase) => <li key={phrase}>{phrase}</li>)}
            </ul>
          </section>

          <section aria-labelledby="cierre-title" className="cv-guide-section" id="cierre">
            <SectionHeading id="cierre" number="06">{article.conclusion.title}</SectionHeading>
            <div className="cv-guide-copy">
              {article.conclusion.paragraphs.map((paragraph) => <p className="cv-guide-paragraph" key={paragraph}>{paragraph}</p>)}
            </div>
          </section>

          <aside className="cv-guide-cta no-experience-cta" aria-labelledby="no-experience-cta-title">
            <span>SEGUÍ PRACTICANDO</span>
            <h2 id="no-experience-cta-title">{article.cta.title}</h2>
            <p>{article.cta.text}</p>
            <div>
              {article.cta.links.map((link, index) => (
                <Link className={`button${index === 1 ? ' ghost' : ''}`} key={link.to} to={link.to}>{link.label}</Link>
              ))}
            </div>
          </aside>
        </article>
      </div>
    </div>
  )
}
