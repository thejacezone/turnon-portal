import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import { communityLinks } from '../data/communityLinks.js'

export default function Community() {
  return <><PageHeader eyebrow="Comunidad TurnOn" title="Conectate con personas que también se están preparando" description="Espacios para recibir oportunidades, practicar inglés y compartir información útil con respeto." /><section className="card-grid section-block">{communityLinks.map((link) => <Card key={link.id} eyebrow={link.type} title={link.name} action="Abrir enlace" href={link.url}><p>{link.description}</p></Card>)}</section></>
}
