import GrammarLessonContent from './GrammarLessonContent.jsx'

export default function GrammarLessons({
  availableTopicIds,
  lessons,
  onPractice,
  onSelect,
  selectedLessonId,
}) {
  if (!lessons.length) {
    return <section className="empty-state grammar-lessons-empty"><h2>No hay lecciones disponibles por el momento.</h2></section>
  }

  const selectedLesson = lessons.find((lesson) => lesson.id === selectedLessonId)
  if (!selectedLesson) {
    return <section className="empty-state grammar-lessons-empty" role="alert"><h2>No pudimos encontrar esta lección.</h2></section>
  }

  const canPractice = availableTopicIds.includes(selectedLesson.primaryPracticeTopicId)
  const selectedIndex = lessons.findIndex((lesson) => lesson.id === selectedLessonId)
  const previousLesson = selectedIndex > 0 ? lessons[selectedIndex - 1] : null
  const nextLesson = selectedIndex < lessons.length - 1 ? lessons[selectedIndex + 1] : null

  return (
    <section className="grammar-lessons-section" aria-labelledby="grammar-lessons-title" id="lessons-index">
      <div className="grammar-lessons-inner">
        <header className="grammar-lessons-intro">
          <span className="eyebrow">Grammar Lessons</span>
          <h2 id="grammar-lessons-title">Estudiá antes de practicar</h2>
          <p>Estudiá la explicación de cada tema antes de comenzar la práctica.</p>
        </header>

        <label className="grammar-lesson-mobile-select">
          Elegí una lección
          <select value={selectedLessonId} onChange={(event) => onSelect(event.target.value)}>
            {lessons.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
                {String(lesson.number).padStart(2, '0')}. {lesson.title} · {lesson.level}
              </option>
            ))}
          </select>
        </label>

        <div className="grammar-lessons-layout">
          <aside className="grammar-lesson-sidebar" aria-label="Lecciones disponibles">
            <div className="grammar-lesson-sidebar-heading">
              <strong>{lessons.length} lessons</strong>
              <span>A2 to C1</span>
            </div>
            <div className="grammar-lesson-list">
              {lessons.map((lesson) => (
                <button
                  aria-current={lesson.id === selectedLessonId ? 'true' : undefined}
                  className={`grammar-lesson-card ${lesson.id === selectedLessonId ? 'is-active' : ''}`}
                  key={lesson.id}
                  onClick={() => onSelect(lesson.id)}
                  type="button"
                >
                  <span className="grammar-lesson-card-meta">
                    Lesson {String(lesson.number).padStart(2, '0')} · {lesson.category}
                  </span>
                  <strong>{lesson.title}</strong>
                  <span className="grammar-lesson-card-description">{lesson.shortDescription}</span>
                  <span className="grammar-lesson-card-stats">
                    {lesson.level} · {lesson.sections.length} sections · {lesson.exampleCount} examples
                  </span>
                  <span className="grammar-lesson-card-action">Ver lección <span aria-hidden="true">→</span></span>
                </button>
              ))}
            </div>
          </aside>

          <GrammarLessonContent
            canPractice={canPractice}
            lesson={selectedLesson}
            nextLesson={nextLesson}
            onPractice={onPractice}
            onSelect={onSelect}
            previousLesson={previousLesson}
          />
        </div>
      </div>
    </section>
  )
}
