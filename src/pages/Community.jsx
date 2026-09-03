import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AboutTurnOnSection from '../components/AboutTurnOnSection.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import SkillIcon from '../components/ui/SkillIcon.jsx'
import { communityLinks, communityRules } from '../data/communityLinks.js'

export default function Community() {
  const { hash } = useLocation()
  const groups = [...new Set(communityLinks.map((link) => link.group))]

  useEffect(() => {
    if (hash !== '#sobre-turnon') return undefined

    const frame = window.requestAnimationFrame(() => {
      document.getElementById('sobre-turnon')?.scrollIntoView({ behavior: 'instant', block: 'start' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [hash])

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
              <Card
                className="community-card"
                key={link.id}
                eyebrow={link.type}
                title={link.name}
                action={link.url ? 'Abrir enlace' : undefined}
                href={link.url}
                badge={link.url ? 'Disponible' : 'Próximamente'}
                icon={<SkillIcon skill="community" />}
              >
                <p>{link.description}</p>
                {!link.url && <span className="card-availability" aria-disabled="true">Enlace disponible pronto</span>}
              </Card>
            ))}
          </div>
        </section>
      ))}
      <section className="community-rules">
        <div><span className="eyebrow">Reglas básicas</span><h2>Cuidemos el espacio entre todos</h2></div>
        <ul>{communityRules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
      </section>
      <AboutTurnOnSection />
    </div>
  )
}
