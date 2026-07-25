import Button from '../components/Button.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { CheckCircle2 } from 'lucide-react'

export default function About() {
  const values = ['Útil para momentos concretos', 'Realista con los resultados', 'Directo y fácil de entender', 'Enfocado en trabajo']
  return (
    <div className="portal-page about-page">
      <PageHeader
        eyebrow="TurnOn / Sobre nosotros"
        title="Trabajo real. Inglés útil. Cero humo."
        description="TurnOn reúne pruebas, práctica y recursos para ayudarte a prepararte mejor antes de aplicar a oportunidades laborales."
      />
      <section className="about-grid page-section">
        <div>
          <h2>No prometemos atajos.</h2>
          <p>Buscar trabajo puede ser confuso. Reducimos parte de esa confusión con materiales concretos, lenguaje claro y herramientas para tomar mejores decisiones.</p>
          <ul className="values-list">{values.map((value) => <li key={value}><CheckCircle2 aria-hidden="true" />{value}</li>)}</ul>
        </div>
        <div className="about-panel">
          <span className="eyebrow">La idea es simple</span>
          <h2>Trabajo real. Inglés útil. Cero humo.</h2>
          <p>Prepararte no garantiza cada resultado, pero sí puede ayudarte a reconocer oportunidades, comunicar mejor lo que sabés y evitar errores costosos.</p>
          <Button to="/recursos" className="accent">Empezar con recursos</Button>
        </div>
      </section>
    </div>
  )
}
