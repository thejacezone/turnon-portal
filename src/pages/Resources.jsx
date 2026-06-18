import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import ResourceCard from '../components/ResourceCard.jsx'
import { resourceCategories, resources } from '../data/resources.js'

export default function Resources() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Todos')
  const filtered = useMemo(() => resources.filter((resource) => (category === 'Todos' || resource.category === category) && `${resource.title} ${resource.description}`.toLowerCase().includes(query.toLowerCase())), [query, category])
  return (
    <>
      <PageHeader eyebrow="Repositorio laboral" title="Recursos para aplicar con más claridad" description="Guías, plantillas y checklists para resolver momentos concretos de tu búsqueda y vida laboral." />
      <section className="resource-tools" aria-label="Buscar y filtrar recursos"><label className="search-label"><span>Buscar</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ej. entrevista, CV, inglés…" /></label><div className="filter-row">{['Todos', ...resourceCategories].map((item) => <button key={item} type="button" className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div></section>
      <p className="results-count">{filtered.length} recursos encontrados</p>
      <section className="card-grid resource-grid">{filtered.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}</section>
    </>
  )
}
