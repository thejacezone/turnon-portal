import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import SkillIcon from '../components/ui/SkillIcon.jsx'
import TurnOnHero from '../components/TurnOnHero.jsx'
import { featuredTools, homeNeeds } from '../data/siteContent.js'

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
          {homeNeeds.map((item) => (
            <Link className="objective-card" to={item.path} key={item.title}>
              <span className="objective-card-icon"><SkillIcon skill={item.skill} /></span>
              <span className="objective-card-copy">
                <strong className="objective-card-title">{item.title}</strong>
                <span className="objective-card-description">{item.description}</span>
              </span>
              <span className="objective-card-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section-block"><SectionTitle eyebrow="Herramientas destacadas" title="Todo lo útil, sin tanta vuelta" description="Tests, práctica y recursos organizados para que sepás qué hacer después." /><div className="card-grid portal-grid">{featuredTools.map((item) => <Card className="home-tool-card" key={item.title} eyebrow={item.eyebrow} title={item.title} badge={item.badge} action={item.action} to={item.path} accent={item.skill} icon={<SkillIcon skill={item.skill} />}><p>{item.description}</p></Card>)}</div></section>
      <section className="home-closing"><div><span className="eyebrow">No tenés que hacerlo solo</span><h2>Usá los recursos y conectate con la comunidad.</h2><p>Prepararte mejor también significa saber dónde preguntar, practicar y encontrar oportunidades.</p></div><Button to="/comunidad" className="accent">Ver comunidad</Button></section>
    </>
  )
}
