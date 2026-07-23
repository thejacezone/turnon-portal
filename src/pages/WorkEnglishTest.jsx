import { Link } from 'react-router-dom'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import SkillIcon from '../components/ui/SkillIcon.jsx'
import { englishPractice } from '../data/englishPractice.js'

const feathers = [1, 2, 3, 4]

export default function WorkEnglishTest() {
  const tests = englishPractice.filter((item) => item.group === 'test')
  const practice = englishPractice.filter((item) => item.group === 'practice')
  const testCards = [
    {
      id: 'general',
      label: 'General English',
      title: 'General English Level Test',
      description: 'Medí grammar, vocabulary y reading con un banco balanceado.',
      action: 'Comenzar General English Test',
      path: tests.find((item) => item.id === 'general')?.path || '/work-english-test/general-test',
    },
    {
      id: 'work',
      label: 'Work English',
      title: 'Work English Test',
      description: 'Ponete a prueba con entrevistas, customer service y contextos laborales bilingües.',
      action: 'Comenzar Work English Test',
      path: tests.find((item) => item.id === 'work')?.path || '/work-english-test/work-test',
    },
  ]

  return (
    <>
      <section className="work-test-page-hero" aria-labelledby="work-test-page-title">
        {feathers.map((number) => (
          <img
            className={`work-test-page-feather work-test-page-feather--${number}`}
            src={`/assets/feathers/feather${number}.png`}
            alt=""
            aria-hidden="true"
            key={number}
          />
        ))}
        <div className="work-test-page-hero-inner">
          <span className="work-test-page-eyebrow">TurnOn / Work English Test</span>
          <h1 className="work-test-page-title" id="work-test-page-title">
            Medí tu nivel y prueba si tienes lo necesario para aplicar a un trabajo en ingles
          </h1>
          <p className="work-test-page-subtitle">
            Primero podés medir tu inglés general. Después entrená cada habilidad con ejercicios específicos. Todos los resultados son orientativos, no certificaciones oficiales. Divierte y aprende desafiándote a ti mismo
          </p>
        </div>
      </section>

      <section className="work-test-cards-section" aria-label="Tests de inglés disponibles">
        <div className="work-test-cards-grid">
          {testCards.map((test) => (
            <Link className={`work-test-card work-test-card--${test.id === 'general' ? 'blue' : 'light'}`} to={test.path} key={test.id}>
              <span className="work-test-card-label">{test.label}</span>
              <strong className="work-test-card-title">{test.title}</strong>
              <span className="work-test-card-description">{test.description}</span>
              <span className="work-test-card-link">
                {test.action}
                <span aria-hidden="true">→</span>
              </span>
              <span className="work-test-card-decor" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="skills-practice-section" aria-labelledby="skills-practice-title">
        <div className="skills-practice-inner">
          <header className="skills-practice-header">
            <span className="skills-practice-eyebrow">B. Practicar inglés para trabajo</span>
            <h2 className="skills-practice-title" id="skills-practice-title">Entrená por habilidad</h2>
            <p className="skills-practice-subtitle">
              Practicá grammar, vocabulary, reading, listening, writing y typing con ejercicios pensados para situaciones laborales.
            </p>
          </header>
          <div className="skills-practice-grid">
            {practice.map((item) => (
              <Card className="skill-practice-card skills-practice-card" key={item.id} eyebrow={item.category} title={item.title} badge={item.status === 'disponible' ? 'Disponible' : 'Próximamente'} accent={item.id} icon={<SkillIcon skill={item.id} />}>
                <p>{item.description}</p>
                {item.status === 'disponible' ? <Button className="skills-practice-card-button" to={item.path}>{item.action || 'Practicar ahora'}</Button> : <span className="button disabled card-button skills-practice-card-button" aria-disabled="true">Próximamente</span>}
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
