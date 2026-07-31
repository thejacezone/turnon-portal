import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GrammarLessons from '../components/grammar/GrammarLessons.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { grammarLessons } from '../data/grammarLessons.js'
import { grammarPracticeQuestions } from '../data/grammarPracticeQuestions.js'
import { createGrammarTopicId } from '../utils/grammarTopics.js'
import '../styles/grammar-lessons.css'

export default function Lessons() {
  const navigate = useNavigate()
  const [selectedLessonId, setSelectedLessonId] = useState(grammarLessons[0]?.id || '')
  const availableTopicIds = useMemo(
    () => [...new Set(grammarPracticeQuestions.map((question) => createGrammarTopicId(question.topic)))],
    [],
  )

  useEffect(() => {
    if (!import.meta.env.DEV) return

    const ids = grammarLessons.map((lesson) => lesson.id)
    const slugs = grammarLessons.map((lesson) => lesson.slug)
    const validTopicIds = new Set(availableTopicIds)
    const errors = []

    if (new Set(ids).size !== ids.length) errors.push('Lesson IDs must be unique.')
    if (new Set(slugs).size !== slugs.length) errors.push('Lesson slugs must be unique.')

    grammarLessons.forEach((lesson) => {
      if (!lesson.title || !lesson.shortDescription || !lesson.sections.length) {
        errors.push(`Incomplete lesson: ${lesson.id}`)
      }
      if (lesson.primaryPracticeTopicId && !validTopicIds.has(lesson.primaryPracticeTopicId)) {
        errors.push(`Unknown practice topic: ${lesson.primaryPracticeTopicId}`)
      }
    })

    if (errors.length) console.error('Lessons data validation:', errors)
  }, [availableTopicIds])

  const selectLesson = (lessonId) => {
    setSelectedLessonId(lessonId)
    window.requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      document.querySelector('#grammar-lesson-content')?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    })
  }

  return (
    <div className="portal-page lessons-page">
      <div className="lessons-back-row">
        <Link className="back-link" to="/">← Volver al inicio</Link>
      </div>
      <PageHeader
        eyebrow="TURNON LESSONS"
        title="Lessons"
        description="Estudiá la teoría, revisá ejemplos y entendé cada tema antes de ponerlo en práctica."
      />
      <GrammarLessons
        availableTopicIds={availableTopicIds}
        lessons={grammarLessons}
        onPractice={() => navigate('/work-english-test/grammar-practice')}
        onSelect={selectLesson}
        selectedLessonId={selectedLessonId}
      />
    </div>
  )
}
