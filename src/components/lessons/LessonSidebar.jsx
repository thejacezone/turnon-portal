function LessonIndexButtons({ activeSection, items, onNavigate }) {
  return (
    <div className="lesson-index-links">
      {items.map((item) => (
        <button
          aria-current={activeSection === item.id ? 'location' : undefined}
          className={activeSection === item.id ? 'is-active' : ''}
          key={item.id}
          onClick={() => onNavigate(item.id)}
          type="button"
        >
          {item.title}
        </button>
      ))}
    </div>
  )
}

export default function LessonSidebar({ activeSection, items, onNavigate }) {
  return (
    <>
      <aside className="lesson-detail-sidebar" aria-label="Lesson index">
        <strong>Lesson index</strong>
        <LessonIndexButtons activeSection={activeSection} items={items} onNavigate={onNavigate} />
      </aside>

      <details className="lesson-mobile-index">
        <summary>Contenido de la lección</summary>
        <LessonIndexButtons activeSection={activeSection} items={items} onNavigate={onNavigate} />
      </details>
    </>
  )
}
