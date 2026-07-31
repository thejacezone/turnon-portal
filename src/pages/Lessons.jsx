import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import LessonGroupAccordion from '../components/lessons/LessonGroupAccordion.jsx'
import { grammarLessons } from '../data/grammarLessons.js'
import '../styles/grammar-lessons.css'

const groupDefinitions = [
  {
    id: 'foundation',
    number: '/001',
    category: 'Foundation',
    level: 'A2–B1',
    description: 'Construí las bases para formar oraciones y usar los tiempos esenciales.',
  },
  {
    id: 'intermediate',
    number: '/002',
    category: 'Intermediate',
    level: 'B1–B2',
    description: 'Conectá ideas y dominá estructuras para comunicarte con más precisión.',
  },
  {
    id: 'advanced',
    number: '/003',
    category: 'Advanced',
    level: 'B2–C1',
    description: 'Refiná estructuras complejas para escribir y expresarte con mayor control.',
  },
]

export default function Lessons() {
  const [openGroups, setOpenGroups] = useState(['foundation'])
  const lessonGroups = useMemo(
    () => groupDefinitions.map((group) => ({
      ...group,
      lessons: grammarLessons.filter((lesson) => lesson.category.toLowerCase() === group.id),
    })),
    [],
  )

  const toggleGroup = (groupId) => {
    setOpenGroups((current) => (
      current.includes(groupId)
        ? current.filter((id) => id !== groupId)
        : [...current, groupId]
    ))
  }

  return (
    <div className="portal-page lessons-page lessons-map-page">
      <PageHeader
        className="lessons-page-hero"
        eyebrow="TURNON LESSONS"
        title="Lesson map"
        description="Elegí tu nivel, revisá las lecciones disponibles y estudiá cada tema antes de ponerlo en práctica."
      >
        <div className="lessons-map-facts" aria-label="Información del Lesson map">
          <span>38 lessons</span>
          <span>A2 to C1</span>
        </div>
      </PageHeader>

      <section className="lessons-map-section" aria-labelledby="lessons-levels-title">
        <h2 className="sr-only" id="lessons-levels-title">Niveles del Lesson map</h2>
        <div className="lesson-group-stack">
          {lessonGroups.map((group) => (
            <LessonGroupAccordion
              group={group}
              isOpen={openGroups.includes(group.id)}
              key={group.id}
              onToggle={() => toggleGroup(group.id)}
            />
          ))}
        </div>
      </section>

      <section className="lessons-map-cta" aria-labelledby="lessons-map-cta-title">
        <span className="lessons-eyebrow">PONÉLO EN PRÁCTICA</span>
        <h2 id="lessons-map-cta-title">¿Ya repasaste la teoría? Ahora probá tu inglés.</h2>
        <p>Usá los tests para identificar qué dominás y qué temas necesitás seguir reforzando.</p>
        <div>
          <Link className="button" to="/work-english-test">Ir a los tests</Link>
          <Link className="button ghost" to="/work-english-test/general-test">General English Level Test</Link>
        </div>
      </section>
    </div>
  )
}
