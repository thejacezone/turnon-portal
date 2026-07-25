import Card from './Card.jsx'
import { Link } from 'react-router-dom'

export default function ResourceCard({ resource }) {
  const available = resource.status === 'disponible'
  return (
    <Card className={`resource-card resource-card--${available ? 'available' : 'coming-soon'}`} eyebrow={resource.category} title={resource.title}>
      <p>{resource.description}</p>
      <div className="card-meta"><span>{resource.type}</span><span className={`status ${available ? 'available' : ''}`}>{available ? 'Disponible' : 'Próximamente'}</span></div>
      {available ? <Link className="button card-button" to={`/recursos/${resource.id}`}>Ver recurso</Link> : <span className="button card-button disabled" aria-disabled="true">Disponible pronto</span>}
    </Card>
  )
}
