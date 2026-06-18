import Card from '../components/Card.jsx'
import PageHeader from '../components/PageHeader.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import { englishPractice } from '../data/englishPractice.js'

export default function WorkEnglishTest() {
  const levelTest = englishPractice.find((item) => item.group === 'level')
  const practice = englishPractice.filter((item) => item.group === 'practice')
  return (
    <>
      <PageHeader eyebrow="Inglés para trabajo" title="Work English Test" description="El test te ayuda a identificar tu nivel aproximado de inglés y prepararte para tu nuevo empleo, entrevistas laborales y ambientes de trabajo bilingües." />
      <section className="section-block"><SectionTitle eyebrow="Medir mi nivel" title="Empezá por entender dónde estás" /><div className="featured-card"><Card eyebrow="Evaluación inicial" title={levelTest.title} badge="Disponible en una próxima fase"><p>{levelTest.description}</p><button className="button disabled" disabled>Iniciar test próximamente</button></Card></div></section>
      <section className="section-block"><SectionTitle eyebrow="Practicar inglés para trabajo" title="Entrená situaciones que sí vas a encontrar" /><div className="card-grid">{practice.map((item) => <Card key={item.id} eyebrow={item.category} title={item.title} badge={item.status === 'proximamente' ? 'Próximamente' : 'Estructura lista'}><p>{item.description}</p></Card>)}</div></section>
    </>
  )
}
