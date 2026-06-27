import Card from '../components/Card.jsx'
import PageHeader from '../components/PageHeader.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import Button from '../components/Button.jsx'
import { englishPractice } from '../data/englishPractice.js'

export default function WorkEnglishTest() {
  const tests = englishPractice.filter((item) => item.group === 'test')
  const practice = englishPractice.filter((item) => item.group === 'practice')

  return (
    <>
      <PageHeader eyebrow="Inglés para trabajo" title="Work English Test" description="El test te ayuda a identificar tu nivel aproximado de inglés y prepararte para tu nuevo empleo, entrevistas laborales y ambientes de trabajo bilingües." />
      <section className="section-block">
        <SectionTitle eyebrow="A. Medir mi nivel" title="Elegí el test que querés hacer" />
        <div className="test-choice-grid">
          {tests.map((item) => (
            <Card key={item.id} eyebrow={item.category} title={item.title} badge={item.badge}>
              {item.highlight && <p className="highlight-copy">{item.highlight}</p>}
              <p>{item.description}</p>
              <Button to={item.path}>{item.action}</Button>
            </Card>
          ))}
        </div>
      </section>
      <section className="section-block">
        <SectionTitle eyebrow="B. Practicar inglés para trabajo" title="Entrená por habilidad" />
        <div className="card-grid">
          {practice.map((item) => (
            <Card key={item.id} eyebrow={item.category} title={item.title} badge={item.status === 'disponible' ? 'Disponible' : 'Próximamente'}>
              <p>{item.description}</p>
              {item.status === 'disponible' ? <Button to={item.path}>Practicar ahora</Button> : <span className="button disabled card-button" aria-disabled="true">Próximamente</span>}
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}
