import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import { portalSections } from '../data/siteContent.js'

export default function Home() {
  return (
    <>
      <section className="hero portal-hero">
        <div>
          <span className="eyebrow">Prepararte cambia lo que sigue</span>
          <h1>Recursos reales para prepararte, aplicar y sobrevivir tu próximo empleo.</h1>
          <p>TurnOn reúne herramientas laborales, recursos de inglés, calculadoras, guías y comunidad para ayudarte a prepararte mejor.</p>
          <div className="button-row"><Button to="/work-english-test">Hacer Work English Test</Button><Button to="/recursos" variant="secondary">Ver recursos</Button><Button to="/calculadoras" variant="secondary">Calcular horas</Button><Button to="/comunidad" variant="secondary">Unirme a la comunidad</Button></div>
        </div>
        <div className="hero-dashboard" aria-hidden="true"><div className="dashboard-label">TURNON / PORTAL</div><strong>Todo lo útil.<br />Sin tanta vuelta.</strong><div className="dashboard-lines"><span></span><span></span><span></span></div></div>
      </section>
      <section className="section-block">
        <SectionTitle eyebrow="Explorá el portal" title="Cinco formas de llegar mejor preparado" description="Cada sección resuelve una necesidad concreta. Entrá por donde más te sirva hoy." />
        <div className="card-grid portal-grid">{portalSections.map((item) => <Card key={item.title} eyebrow={item.eyebrow} title={item.title} action={item.action} href={`#${item.path}`}><p>{item.description}</p></Card>)}</div>
      </section>
      <section className="home-actions"><div><span className="eyebrow">Qué podés hacer aquí</span><h2>Herramientas para momentos concretos</h2></div><ul><li>Medir tu inglés laboral.</li><li>Practicar para entrevistas.</li><li>Usar recursos para CV y renuncia.</li><li>Calcular horas laborales.</li><li>Revisar ofertas y referidos.</li><li>Unirte a la comunidad.</li></ul></section>
    </>
  )
}
