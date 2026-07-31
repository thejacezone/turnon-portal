import { useMemo, useState } from 'react'
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
    <div className="lessons-page lessons-map-page">
      <section className="lessons-map-hero" aria-labelledby="lessons-map-title">
        <div className="lessons-map-hero-inner">
          <span className="lessons-eyebrow">TURNON LESSONS</span>
          <h1 id="lessons-map-title">Lesson map</h1>
          <p>Elegí tu nivel, revisá las lecciones disponibles y estudiá cada tema antes de ponerlo en práctica.</p>
          <div className="lessons-map-facts" aria-label="Información del Lesson map">
            <span>38 lessons</span>
            <span>A2 to C1</span>
          </div>
        </div>
      </section>

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
    </div>
  )
}
