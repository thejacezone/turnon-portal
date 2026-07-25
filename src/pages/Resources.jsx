import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import ResourceCard from '../components/ResourceCard.jsx'
import ResourceFilters from '../components/ResourceFilters.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { resourceCategories, resources } from '../data/resources.js'

export default function Resources() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Todos')
  const [type, setType] = useState('Todos')
  const [status, setStatus] = useState('Todos')
  const types = [...new Set(resources.map((resource) => resource.type))]
  const filtered = useMemo(() => resources.filter((resource) => (category === 'Todos' || resource.category === category) && (type === 'Todos' || resource.type === type) && (status === 'Todos' || resource.status === status) && `${resource.title} ${resource.description} ${resource.content}`.toLowerCase().includes(query.toLowerCase())), [query, category, type, status])
  return (
    <div className="portal-page resources-page">
      <PageHeader
        eyebrow="TurnOn / Recursos"
        title="Recursos para aplicar mejor"
        description="Guías, plantillas y herramientas prácticas para preparar tu CV, entrevistas y camino laboral sin tanta vuelta."
      />
      <section className="page-section resources-content" aria-label="Buscar recursos">
        <ResourceFilters query={query} onQuery={setQuery} category={category} onCategory={setCategory} type={type} onType={setType} status={status} onStatus={setStatus} categories={resourceCategories} types={types} />
        <p className="results-count">{filtered.length} recursos encontrados</p>
        {filtered.length ? <div className="card-grid page-grid resource-grid">{filtered.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}</div> : <EmptyState title="No encontramos recursos con estos filtros" description="Probá con otra categoría, tipo, estado o palabra de búsqueda." />}
      </section>
    </div>
  )
}
