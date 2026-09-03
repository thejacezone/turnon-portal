import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/offer-preparation.css'

const sections = [
  { id: 'conoce-la-plaza', label: 'Conocé la plaza' },
  { id: 'habilidades-importantes', label: 'Habilidades importantes' },
  { id: 'vocabulario', label: 'Vocabulario' },
  { id: 'frases-utiles', label: 'Frases útiles' },
  { id: 'preguntas-de-entrevista', label: 'Preguntas de entrevista' },
  { id: 'role-plays', label: 'Role plays' },
  { id: 'autoevaluacion', label: 'Autoevaluación' },
]

function PreparationMenu({ activeSection, detailsRef, onNavigate }) {
  const renderButtons = () => sections.map((section) => (
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

  return (
    <>
      <aside className="offer-preparation-sidebar" aria-label="Contenido de preparación">
        <span>PREPARACIÓN POR PLAZA</span>
        <strong>En esta guía</strong>
        <nav aria-label="Secciones de preparación">{renderButtons()}</nav>
      </aside>
      <details className="offer-preparation-mobile-menu" ref={detailsRef}>
        <summary>
          <span>En esta guía</span>
          <strong>{sections.find((section) => section.id === activeSection)?.label}</strong>
        </summary>
        <nav aria-label="Secciones de preparación en móvil">{renderButtons()}</nav>
      </details>
    </>
  )
}

function OfferFacts({ offer }) {
  return (
    <div className="offer-detail-facts offer-preparation-facts">
      <div><span>Base salary</span><strong>{offer.baseSalary}</strong></div>
      <div><span>{offer.incentiveLabel}</span><strong>{offer.incentive}</strong></div>
      <div><span>Training</span><strong>{offer.training}</strong></div>
      <div><span>Modality</span><strong>{offer.modality}</strong></div>
      <div><span>Channel</span><strong>{offer.channel}</strong></div>
      <div><span>Highlight</span><strong>{offer.highlight}</strong></div>
      <div><span>Status</span><strong>{offer.status}</strong></div>
      <div><span>Availability</span><strong>{offer.availability}</strong></div>
    </div>
  )
}

function DialogueLine({ line }) {
  const separator = line.indexOf(':')
  if (separator === -1) return <li>{line}</li>
  return <li><strong>{line.slice(0, separator)}:</strong><span>{line.slice(separator + 1).trim()}</span></li>
}

function SectionHeading({ id, number, title }) {
  return (
    <header className="offer-preparation-section-heading">
      <span aria-hidden="true">{String(number).padStart(2, '0')}</span>
      <h2 id={id}>{title}</h2>
    </header>
  )
}

export default function OfferPreparationDetail({ offer, previousOffer, nextOffer }) {
  const preparation = offer.preparation
  const [activeSection, setActiveSection] = useState(sections[0].id)
  const detailsRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })

    const updateActiveSection = () => {
      const current = sections.reduce((active, section) => {
        const element = document.getElementById(section.id)
        return element && element.getBoundingClientRect().top <= 230 ? section.id : active
      }, sections[0].id)
      setActiveSection(current)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    return () => window.removeEventListener('scroll', updateActiveSection)
  }, [offer.slug])

  const navigateToSection = (sectionId) => {
    setActiveSection(sectionId)
    detailsRef.current?.removeAttribute('open')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(sectionId)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }

  const selfAssessment = preparation.selfAssessment.match(/[^?]+\?/g)?.map((item) => item.trim()) || [preparation.selfAssessment]

  return (
    <article className="offer-preparation-page">
      <Link className="back-link" to="/ofertas">← Back to offers</Link>
      <header className="offer-preparation-hero">
        <span className="eyebrow">{offer.eyebrow} · ENGLISH {offer.englishLevel}</span>
        <h1>{offer.title}</h1>
        <p>{offer.description}</p>
        <div className="offer-preparation-hero-actions">
          <button className="button disabled" type="button" disabled>Application unavailable</button>
          <button className="button ghost dark-ghost" type="button" onClick={() => navigateToSection('conoce-la-plaza')}>Start preparation</button>
        </div>
      </header>

      <p className="detail-disclaimer offer-preparation-disclaimer">
        Job availability, salary, schedules, bonuses and work-from-home conditions must be confirmed before applying. Los ejemplos sirven para practicar y adaptar respuestas; no representan políticas reales de una empresa.
      </p>

      <div className="offer-preparation-layout">
        <PreparationMenu activeSection={activeSection} detailsRef={detailsRef} onNavigate={navigateToSection} />

        <div className="offer-preparation-content">
          <section className="offer-preparation-section" id="conoce-la-plaza" aria-labelledby="conoce-la-plaza-title">
            <SectionHeading id="conoce-la-plaza-title" number={1} title="Conocé la plaza" />
            <p className="offer-preparation-lead">{preparation.introduction}</p>
            <OfferFacts offer={offer} />
          </section>

          <section className="offer-preparation-section" id="habilidades-importantes" aria-labelledby="habilidades-importantes-title">
            <SectionHeading id="habilidades-importantes-title" number={2} title="Habilidades importantes" />
            <div className="offer-preparation-callout">
              <strong>Habilidades que debe demostrar</strong>
              <p>{preparation.skills}</p>
            </div>
          </section>

          <section className="offer-preparation-section" id="vocabulario" aria-labelledby="vocabulario-title">
            <SectionHeading id="vocabulario-title" number={3} title="Vocabulario" />
            <p>25 palabras y expresiones para comprender mejor esta plaza.</p>
            <div className="offer-vocabulary-grid">
              {preparation.vocabulary.map((item, index) => (
                <article className="offer-vocabulary-card" key={item.term}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.term}</h3>
                  <strong>{item.meaning}</strong>
                  <p>{item.example}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="offer-preparation-section" id="frases-utiles" aria-labelledby="frases-utiles-title">
            <SectionHeading id="frases-utiles-title" number={4} title="Frases útiles" />
            <ol className="offer-phrase-list">
              {preparation.usefulPhrases.map((phrase) => <li key={phrase}>{phrase}</li>)}
            </ol>
          </section>

          <section className="offer-preparation-section" id="preguntas-de-entrevista" aria-labelledby="preguntas-de-entrevista-title">
            <SectionHeading id="preguntas-de-entrevista-title" number={5} title="Preguntas de entrevista" />
            <div className="offer-interview-list">
              {preparation.interviewQuestions.map((item, index) => (
                <article key={item.question}>
                  <span>QUESTION {String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.question}</h3>
                  <p><strong>Qué debe demostrar:</strong> {item.demonstrates}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="offer-preparation-section" id="role-plays" aria-labelledby="role-plays-title">
            <SectionHeading id="role-plays-title" number={6} title="Role plays" />
            <p>Practicá cada escenario sin memorizar el diálogo palabra por palabra.</p>
            <div className="offer-role-play-list">
              {preparation.rolePlays.map((rolePlay) => (
                <details key={rolePlay.level}>
                  <summary>
                    <span>{rolePlay.label}</span>
                    <strong>{rolePlay.title}</strong>
                  </summary>
                  <div className="offer-role-play-content">
                    <p><strong>Situación:</strong> {rolePlay.situation}</p>
                    <p><strong>Objetivo del agente:</strong> {rolePlay.agentObjective}</p>
                    <ol>{rolePlay.dialogue.map((line, lineIndex) => <DialogueLine key={`${line}-${lineIndex}`} line={line} />)}</ol>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section className="offer-preparation-section" id="autoevaluacion" aria-labelledby="autoevaluacion-title">
            <SectionHeading id="autoevaluacion-title" number={7} title="Autoevaluación" />
            <ul className="offer-self-assessment">
              {selfAssessment.map((question) => <li key={question}>{question}</li>)}
            </ul>
          </section>

          <nav className="offer-detail-navigation" aria-label="Navegación entre ofertas">
            {previousOffer
              ? <Link to={`/ofertas/${previousOffer.slug}`}><span>← Anterior</span><strong>{previousOffer.title}</strong></Link>
              : <span aria-hidden="true" />}
            {nextOffer
              ? <Link className="is-next" to={`/ofertas/${nextOffer.slug}`}><span>Siguiente →</span><strong>{nextOffer.title}</strong></Link>
              : <Link className="is-next" to="/ofertas"><span>Volver</span><strong>Todas las ofertas</strong></Link>}
          </nav>
        </div>
      </div>
    </article>
  )
}
