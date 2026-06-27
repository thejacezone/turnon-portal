import Card from '../components/Card.jsx'
import PageHeader from '../components/PageHeader.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import Button from '../components/Button.jsx'
import { englishPractice } from '../data/englishPractice.js'

export default function WorkEnglishTest() {
  const levelTest = englishPractice.find((item) => item.group === 'level')
  const practice = englishPractice.filter((item) => item.group === 'practice')

  return (
    <>
      <PageHeader eyebrow="Inglés para trabajo" title="Work English Test" description="Medí tu punto de partida y practicá inglés útil para entrevistas, training, customer service y ambientes laborales bilingües." />
      <section className="section-block">
        <SectionTitle eyebrow="A. Medir mi nivel" title="Work English Level Test" />
        <div className="featured-card">
          <Card eyebrow="Evaluación inicial" title={levelTest.title} badge="50 preguntas · orientativo">
            <p>{levelTest.description}</p>
            <Button to="/work-english-test/test">Comenzar test</Button>
          </Card>
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
