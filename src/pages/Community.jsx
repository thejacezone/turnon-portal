import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import SkillIcon from '../components/ui/SkillIcon.jsx'
import { communityLinks, communityRules } from '../data/communityLinks.js'

export default function Community() {
  const groups = [...new Set(communityLinks.map((link) => link.group))]
  return (
    <div className="portal-page community-page">
      <PageHeader
        eyebrow="TurnOn / Comunidad"
        title="Avanzá acompañado"
        description="Encontrá espacios, canales y recursos para seguir practicando, resolver dudas y conectar con personas que también están mejorando."
      />
      {groups.map((group) => (
        <section className="community-section page-section" key={group}>
          <SectionTitle eyebrow="Comunidad" title={group} />
          <div className="card-grid page-grid community-grid">
            {communityLinks.filter((link) => link.group === group).map((link) => (
              <Card className="community-card" key={link.id} eyebrow={link.type} title={link.name} action="Abrir enlace" href={link.url} icon={<SkillIcon skill="community" />}>
                <p>{link.description}</p>
              </Card>
            ))}
          </div>
        </section>
      ))}
      <section className="community-rules">
        <div><span className="eyebrow">Reglas básicas</span><h2>Cuidemos el espacio entre todos</h2></div>
        <ul>{communityRules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
      </section>
    </div>
  )
}
