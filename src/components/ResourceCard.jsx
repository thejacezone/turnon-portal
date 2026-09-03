import Card from './Card.jsx'
import { Link } from 'react-router-dom'

export default function ResourceCard({ resource }) {
  const available = resource.status === 'disponible'
  return (
    <Card className={`resource-card resource-card--${available ? 'available' : 'coming-soon'}`} eyebrow={resource.category} title={resource.title}>
      <div className="resource-card__body">
        <p className="resource-card__description">{resource.description}</p>
      </div>
      <div className="resource-card__footer">
        <div className="card-meta resource-card__meta"><span>{resource.type}</span><span className={`status ${available ? 'available' : ''}`}>{available ? 'Disponible' : 'Próximamente'}</span></div>
        {available ? <Link className="button card-button resource-card__action" to={`/recursos/${resource.id}`}>Ver recurso</Link> : <span className="button card-button disabled resource-card__action" aria-disabled="true">Disponible pronto</span>}
      </div>
    </Card>
  )
}
