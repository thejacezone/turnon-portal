import { Link } from 'react-router-dom'

export default function LessonGroupAccordion({ group, isOpen, onToggle }) {
  const buttonId = `lesson-group-${group.id}-button`
  const panelId = `lesson-group-${group.id}-panel`
  const handleKeyDown = (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    onToggle()
  }

  return (
    <article className={`lesson-group ${isOpen ? 'is-open' : ''}`}>
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        className="lesson-group-trigger"
        id={buttonId}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        type="button"
      >
        <span className="lesson-group-number">{group.number}</span>
        <span className="lesson-group-copy">
          <strong>{group.category}</strong>
          <span>{group.level} · {group.lessons.length} lessons</span>
          <small>{group.description}</small>
        </span>
        <span className="lesson-group-toggle" aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button>

      <div
        aria-hidden={!isOpen}
        aria-labelledby={buttonId}
        className="lesson-group-panel"
        id={panelId}
        role="region"
      >
        <div className="lesson-group-panel-inner">
          <div className="lesson-link-list">
            {group.lessons.map((lesson) => (
              <Link
                className="lesson-link-card"
                key={lesson.id}
                tabIndex={isOpen ? undefined : -1}
                to={`/lessons/${lesson.slug}`}
              >
                <span className="lesson-link-number">{String(lesson.number).padStart(2, '0')}</span>
                <span className="lesson-link-copy">
                  <strong>{lesson.title}</strong>
                  <small>{lesson.level.replace('-', '–')}</small>
                </span>
                <span className="lesson-link-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
