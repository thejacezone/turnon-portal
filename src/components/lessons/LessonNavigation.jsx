import { Link } from 'react-router-dom'

export default function LessonNavigation({ nextLesson, previousLesson }) {
  return (
    <section className="lesson-page-navigation" aria-labelledby="lesson-navigation-title">
      <span className="lessons-eyebrow">CONTINUÁ APRENDIENDO</span>
      <h2 id="lesson-navigation-title">¿Cuál es tu siguiente paso?</h2>

      <div className="lesson-sequence-links">
        {previousLesson && (
          <Link className="lesson-sequence-card" rel="prev" to={`/lessons/${previousLesson.slug}`}>
            <small>← Lección anterior</small>
            <strong>{previousLesson.title}</strong>
          </Link>
        )}
        {nextLesson && (
          <Link className="lesson-sequence-card lesson-sequence-card--next" rel="next" to={`/lessons/${nextLesson.slug}`}>
            <small>Siguiente lección →</small>
            <strong>{nextLesson.title}</strong>
          </Link>
        )}
      </div>

      <div className="lesson-destination-links">
        <Link className="button ghost dark-ghost" to="/lessons">Regresar al Lesson map</Link>
        <Link className="button" to="/work-english-test">Ir a los tests</Link>
      </div>
    </section>
  )
}
