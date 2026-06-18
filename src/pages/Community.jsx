import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import { communityLinks, communityRules } from '../data/communityLinks.js'

export default function Community() {
  const groups = [...new Set(communityLinks.map((link) => link.group))]
  return <><PageHeader eyebrow="Comunidad TurnOn" title="Conectate con personas que también se están preparando" description="Espacios para recibir oportunidades, practicar inglés y compartir información útil con respeto." />{groups.map((group) => <section className="community-section" key={group}><SectionTitle eyebrow="Comunidad" title={group} /><div className="card-grid">{communityLinks.filter((link) => link.group === group).map((link) => <Card key={link.id} eyebrow={link.type} title={link.name} action="Abrir enlace" href={link.url}><p>{link.description}</p></Card>)}</div></section>)}<section className="community-rules"><div><span className="eyebrow">Reglas básicas</span><h2>Cuidemos el espacio entre todos</h2></div><ul>{communityRules.map((rule) => <li key={rule}>{rule}</li>)}</ul></section></>
}
