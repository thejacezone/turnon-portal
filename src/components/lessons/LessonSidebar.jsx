import { useRef } from 'react'

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
  const mobileIndexRef = useRef(null)
  const activeLabel = items.find((item) => item.id === activeSection)?.title || items[0]?.title
  const handleNavigate = (sectionId) => {
    mobileIndexRef.current?.removeAttribute('open')
    onNavigate(sectionId)
  }

  return (
    <>
      <aside className="lesson-detail-sidebar" aria-label="Lesson index">
        <span>EN ESTA LECCIÓN</span>
        <strong>Lesson index</strong>
        <LessonIndexButtons activeSection={activeSection} items={items} onNavigate={handleNavigate} />
      </aside>

      <details className="lesson-mobile-index" ref={mobileIndexRef}>
        <summary>
          <span>Contenido de la lección</span>
          <strong>{activeLabel}</strong>
        </summary>
        <LessonIndexButtons activeSection={activeSection} items={items} onNavigate={handleNavigate} />
      </details>
    </>
  )
}
