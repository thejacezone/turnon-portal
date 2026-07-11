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
    <>
      <PageHeader eyebrow="Repositorio laboral" title="Recursos para aplicar con más claridad" description="Guías, plantillas y checklists para resolver momentos concretos de tu búsqueda y vida laboral." />
      <ResourceFilters query={query} onQuery={setQuery} category={category} onCategory={setCategory} type={type} onType={setType} status={status} onStatus={setStatus} categories={resourceCategories} types={types} />
      <p className="results-count">{filtered.length} recursos encontrados</p>
      {filtered.length ? <section className="card-grid resource-grid">{filtered.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}</section> : <EmptyState title="No encontramos recursos con estos filtros" description="Probá con otra categoría, tipo, estado o palabra de búsqueda." />}
    </>
  )
}
