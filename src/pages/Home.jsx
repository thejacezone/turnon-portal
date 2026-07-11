import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import SkillIcon from '../components/ui/SkillIcon.jsx'
import { featuredTools, homeNeeds } from '../data/siteContent.js'

export default function Home() {
  return (
    <>
      <section className="hero portal-hero">
        <div>
          <span className="eyebrow">Prepararte cambia lo que sigue</span>
          <h1>Recursos reales para prepararte, aplicar y sobrevivir tu próximo empleo.</h1>
          <p>TurnOn reúne herramientas laborales, recursos de inglés, calculadoras, guías y comunidad para ayudarte a prepararte mejor.</p>
          <div className="button-row"><Button to="/work-english-test/general-test" className="accent">Medir mi inglés</Button><Button to="/recursos" variant="secondary">Explorar recursos</Button></div>
        </div>
        <div className="hero-dashboard" aria-hidden="true"><div className="dashboard-label">TURNON / PORTAL</div><strong>Todo lo útil.<br />Sin tanta vuelta.</strong><div className="dashboard-lines"><span></span><span></span><span></span></div></div>
      </section>
      <section className="section-block">
        <SectionTitle eyebrow="Empezá por tu objetivo" title="¿Qué necesitás hacer?" description="Elegí una necesidad concreta y entrá directo a la herramienta que puede ayudarte." />
        <div className="home-needs-grid">{homeNeeds.map((item) => <Link className="home-need-card" to={item.path} key={item.title}><SkillIcon skill={item.skill} /><span><strong>{item.title}</strong><span>{item.description}</span></span></Link>)}</div>
      </section>
      <section className="section-block"><SectionTitle eyebrow="Herramientas destacadas" title="Todo lo útil, sin tanta vuelta" description="Tests, práctica y recursos organizados para que sepás qué hacer después." /><div className="card-grid portal-grid">{featuredTools.map((item) => <Card key={item.title} eyebrow={item.eyebrow} title={item.title} badge={item.badge} action={item.action} to={item.path} accent={item.skill} icon={<SkillIcon skill={item.skill} />}><p>{item.description}</p></Card>)}</div></section>
      <section className="home-closing"><div><span className="eyebrow">No tenés que hacerlo solo</span><h2>Usá los recursos y conectate con la comunidad.</h2><p>Prepararte mejor también significa saber dónde preguntar, practicar y encontrar oportunidades.</p></div><Button to="/comunidad" className="accent">Ver comunidad</Button></section>
    </>
  )
}
