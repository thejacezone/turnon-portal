import Card from '../components/Card.jsx'
import PageIntro from '../components/PageIntro.jsx'
import { communityLinks, communityPrinciples } from '../data/community.js'

export default function Community() {
  return (
    <>
      <PageIntro eyebrow="Comunidad" title="Crecer se vuelve más posible cuando no lo haces a solas" description="Conecta con espacios para compartir oportunidades, preguntas y aprendizajes con respeto y generosidad." />
      <section className="card-grid section-block">{communityLinks.map((link) => <Card key={link.id} eyebrow={link.platform} title={link.name} action="Abrir comunidad" href={link.url}><p>{link.description}</p></Card>)}</section>
      <section className="principles"><div><span className="eyebrow">Cómo convivimos</span><h2>Una comunidad que suma</h2></div><ul>{communityPrinciples.map((principle) => <li key={principle}>{principle}</li>)}</ul></section>
    </>
  )
}
