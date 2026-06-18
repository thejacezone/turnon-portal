import Card from '../components/Card.jsx'
import { homeHighlights, siteStats } from '../data/siteContent.js'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow">Tu siguiente paso empieza aquí</span>
          <h1>Enciende lo que sabes. <em>Activa lo que sigue.</em></h1>
          <p>Un portal claro para encontrar recursos, oportunidades y una comunidad que te acompaña a crecer.</p>
          <div className="button-row"><a className="button" href="#/recursos">Explorar recursos</a><a className="button ghost" href="#/ofertas">Ver oportunidades</a></div>
        </div>
        <div className="hero-orbit" aria-hidden="true"><span>ON</span></div>
      </section>
      <section className="stats" aria-label="Resumen del portal">
        {siteStats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
      </section>
      <section className="section-block">
        <div className="section-heading"><span className="eyebrow">Todo en un lugar</span><h2>Muévete con intención</h2></div>
        <div className="card-grid">{homeHighlights.map((item) => <Card key={item.id} {...item}><p>{item.description}</p></Card>)}</div>
      </section>
    </>
  )
}
