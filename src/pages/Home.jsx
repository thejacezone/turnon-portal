import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import SkillIcon from '../components/ui/SkillIcon.jsx'
import TurnOnHero from '../components/TurnOnHero.jsx'
import { featuredTests, homeNeeds } from '../data/siteContent.js'

export default function Home() {
  return (
    <>
      <TurnOnHero />
      <section className="objectives-section" aria-labelledby="objectives-title">
        <header className="objectives-header">
          <span className="objectives-eyebrow">Empezá por tu objetivo</span>
          <h2 className="objectives-title" id="objectives-title">¿Qué necesitás hacer?</h2>
          <p className="objectives-subtitle">Elegí una ruta y entrá directo a la herramienta que puede ayudarte.</p>
        </header>
        <div className="objectives-grid">
          {homeNeeds.map((item) => {
            const isSpeakingCard = item.variant === 'speaking'

            return (
              <Link className={`objective-card${isSpeakingCard ? ' objective-card--speaking' : ''}`} to={item.path} key={item.title}>
                {isSpeakingCard && [1, 2, 3, 4].map((featherNumber) => (
                  <img
                    className={`objective-card-feather objective-card-feather--${featherNumber}`}
                    src={`/assets/feathers/feather${featherNumber}.png`}
                    alt=""
                    aria-hidden="true"
                    key={featherNumber}
                  />
                ))}
                <span className="objective-card-icon"><SkillIcon skill={item.skill} /></span>
                <span className="objective-card-copy">
                  <strong className="objective-card-title">{item.title}</strong>
                  <span className="objective-card-description">{item.description}</span>
                </span>
                <span className="objective-card-arrow" aria-hidden="true">↗</span>
              </Link>
            )
          })}
        </div>
      </section>
      <section className="skills-tests-section" aria-labelledby="skills-tests-title">
        <header className="skills-tests-header">
          <span className="skills-tests-eyebrow">Pruebas destacadas</span>
          <h2 className="skills-tests-title" id="skills-tests-title">Prueba tus habilidades</h2>
          <p className="skills-tests-subtitle">Medí tu inglés por habilidad y entrá directo a la práctica que necesitás reforzar.</p>
        </header>
        <div className="skills-tests-list">
          {featuredTests.map((item, index) => (
            <Link className={`skills-test-card${index === 0 ? ' skills-test-card-featured' : ''}`} to={item.path} key={item.title}>
              <span className="skills-test-number">{item.number}</span>
              <span className="skills-test-content">
                <strong className="skills-test-title">{item.title}</strong>
                <span className="skills-test-description">{item.description}</span>
              </span>
              <span className="skills-test-action" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="home-closing"><div><span className="eyebrow">No tenés que hacerlo solo</span><h2>Usá los recursos y conectate con la comunidad.</h2><p>Prepararte mejor también significa saber dónde preguntar, practicar y encontrar oportunidades.</p></div><Button to="/comunidad" className="accent">Ver comunidad</Button></section>
    </>
  )
}
