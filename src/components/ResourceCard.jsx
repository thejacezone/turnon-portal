import Card from './Card.jsx'

export default function ResourceCard({ resource }) {
  const available = resource.status === 'disponible'
  return (
    <Card eyebrow={resource.category} title={resource.title}>
      <p>{resource.description}</p>
      <div className="card-meta"><span>{resource.type}</span><span className={`status ${available ? 'available' : ''}`}>{available ? 'Disponible' : 'Próximamente'}</span></div>
      <a className={`button card-button ${available ? '' : 'disabled'}`} href={available ? resource.url : undefined} aria-disabled={!available}>Ver recurso</a>
    </Card>
  )
}
