import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import LessonContent from '../components/lessons/LessonContent.jsx'
import LessonNavigation from '../components/lessons/LessonNavigation.jsx'
import LessonSidebar from '../components/lessons/LessonSidebar.jsx'
import { grammarLessons } from '../data/grammarLessons.js'
import '../styles/grammar-lessons.css'

function buildSectionItems(lesson) {
  return [
    { id: 'introduction', title: 'Introduction' },
    ...lesson.sections.map((section) => ({ id: section.id, title: section.title })),
    { id: 'quick-recap', title: 'Quick recap' },
  ]
}

export default function LessonDetail() {
  const { lessonSlug } = useParams()
  const lessonIndex = grammarLessons.findIndex((item) => item.slug === lessonSlug)
  const lesson = grammarLessons[lessonIndex]
  const previousLesson = lessonIndex > 0 ? grammarLessons[lessonIndex - 1] : null
  const nextLesson = lessonIndex >= 0 && lessonIndex < grammarLessons.length - 1
    ? grammarLessons[lessonIndex + 1]
    : null
  const sectionItems = useMemo(() => lesson ? buildSectionItems(lesson) : [], [lesson])
  const [activeSection, setActiveSection] = useState('introduction')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    setActiveSection('introduction')
  }, [lessonSlug])

  useEffect(() => {
    if (!lesson) return undefined

    const updateActiveSection = () => {
      const currentSection = sectionItems.reduce((current, item) => {
        const element = document.getElementById(item.id)
        return element && element.getBoundingClientRect().top <= 220 ? item.id : current
      }, sectionItems[0]?.id || 'introduction')
      setActiveSection(currentSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    return () => window.removeEventListener('scroll', updateActiveSection)
  }, [lesson, sectionItems])

  if (!lesson) {
    return (
      <div className="lesson-not-found">
        <span className="lessons-eyebrow">TURNON LESSONS</span>
        <h1>No encontramos esta lección.</h1>
        <p>El enlace puede estar incompleto o la lección no forma parte del Lesson map actual.</p>
        <Link className="button" to="/lessons">Regresar al Lesson map</Link>
      </div>
    )
  }

  const navigateToSection = (sectionId) => {
    setActiveSection(sectionId)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <div className="lessons-page lesson-detail-page">
      <header className="lesson-detail-header">
        <div className="lesson-detail-header-inner">
          <div className="lesson-breadcrumb" aria-label="Breadcrumb" role="navigation">
            <Link to="/lessons">Lessons</Link>
            <span aria-hidden="true">›</span>
            <span>{lesson.category}</span>
            <span aria-hidden="true">›</span>
            <span>Lesson {String(lesson.number).padStart(2, '0')}</span>
          </div>
          <span className="lessons-eyebrow">LESSON {String(lesson.number).padStart(2, '0')} · {lesson.category.toUpperCase()}</span>
          <h1>{lesson.title}</h1>
          <p>{lesson.shortDescription}</p>
          <div className="lesson-detail-meta">
            <span>{lesson.level.replace('-', '–')}</span>
            <span>{lesson.sections.length + 2} sections</span>
            <span>{lesson.exampleCount} examples</span>
          </div>
        </div>
      </header>

      <div className="lesson-detail-layout">
        <LessonSidebar
          activeSection={activeSection}
          items={sectionItems}
          onNavigate={navigateToSection}
        />
        <article className="lesson-detail-article">
          <LessonContent lesson={lesson} />
          <LessonNavigation
            nextLesson={nextLesson}
            previousLesson={previousLesson}
          />
        </article>
      </div>
    </div>
  )
}
