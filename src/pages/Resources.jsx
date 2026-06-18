import Card from '../components/Card.jsx'
import PageIntro from '../components/PageIntro.jsx'
import { resources } from '../data/resources.js'

export default function Resources() {
  return (
    <>
      <PageIntro eyebrow="Biblioteca práctica" title="Recursos para pasar de la idea a la acción" description="Guías seleccionadas para fortalecer tu perfil, prepararte mejor y tomar decisiones profesionales con más claridad." />
      <section className="card-grid section-block">{resources.map((item) => <Card key={item.id} eyebrow={item.category} title={item.title} action={item.action} href={item.url}><p>{item.description}</p><span className="meta">{item.format} · {item.duration}</span></Card>)}</section>
    </>
  )
}
