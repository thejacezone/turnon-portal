import Button from '../components/Button.jsx'
import PageHeader from '../components/PageHeader.jsx'

export default function About() {
  return <><PageHeader eyebrow="Sobre TurnOn" title="Una herramienta práctica para llegar mejor preparado" description="TurnOn ayuda a personas que buscan empleo, especialmente empleos bilingües. Reunimos recursos laborales, inglés útil, calculadoras, guías y comunidad en un portal directo y fácil de usar." /><section className="about-grid section-block"><div><h2>No prometemos atajos.</h2><p>Buscar trabajo puede ser confuso. Queremos reducir parte de esa confusión con materiales concretos, lenguaje claro y herramientas que te ayuden a hacer mejores preguntas.</p></div><div className="about-panel"><span className="eyebrow">La idea es simple</span><p>Prepararte no garantiza cada resultado, pero sí puede ayudarte a reconocer oportunidades, comunicar mejor lo que sabés y evitar errores costosos.</p><Button to="/recursos">Empezar con recursos</Button></div></section></>
}
