import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SectionGeneralTest from '../components/SectionGeneralTest.jsx'
import { practicePageHeroes } from '../data/practicePageHeroes.js'
import { workVocabularyCategories, workVocabularyLevels, workVocabularyModules } from '../data/workVocabularyModules.js'
import { calculateVocabularyResult, generateVocabularyQuiz } from '../utils/vocabularyQuiz.js'
import { generateVocabularyGeneralTest, scoreVocabularyGeneralTest } from '../utils/sectionGeneralTests.js'
import { validateWorkVocabularyModules } from '../utils/questionValidation.js'

const quizSizes = [10, 15, 20]

function VocabularyModuleCard({ module }) {
  return (
    <article className="vocab-module-card">
      <div className="card-top"><span className="eyebrow">{module.category}</span><span className="status available">{module.level}</span></div>
      <h2>{module.title}</h2>
      <p>{module.description}</p>
      <div className="vocab-card-meta"><span>{module.terms.length} términos</span><span>{module.tags.join(' · ')}</span></div>
      <Link className="button" to={`/work-english-test/vocabulary-practice/${module.slug}`}>Abrir módulo</Link>
    </article>
  )
}

function StudyList({ module }) {
  const [query, setQuery] = useState('')
  const [showTranslations, setShowTranslations] = useState(true)
  const filteredTerms = module.terms.filter((term) => {
    const haystack = [term.term, term.translation, term.definition, term.example, term.context].join(' ').toLowerCase()
    return haystack.includes(query.toLowerCase())
  })

  return (
    <section className="vocab-study-list">
      <div className="vocab-tools">
        <label className="search-label"><span>Buscar dentro del módulo</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ej. refund, deducible, queue..." /></label>
        <button className="button ghost dark-ghost" type="button" onClick={() => setShowTranslations((value) => !value)}>{showTranslations ? 'Ocultar traducciones' : 'Mostrar traducciones'}</button>
      </div>
      <div className="term-list">
        {filteredTerms.map((term) => (
          <article className="term-card" key={term.id}>
            <div className="term-heading"><h3>{term.term}</h3><span className="status">{term.difficulty}</span></div>
            {showTranslations && <p className="term-translation">{term.translation}</p>}
            <p>{term.definition}</p>
            <blockquote>{term.example}</blockquote>
            {showTranslations && <p className="example-translation">{term.exampleTranslation}</p>}
            <small>{term.context}</small>
          </article>
        ))}
      </div>
    </section>
  )
}

function Flashcards({ module }) {
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const term = module.terms[index]

  const goTo = (nextIndex) => {
    setIndex(nextIndex)
    setRevealed(false)
  }

  return (
    <section className="flashcard-section">
      <div className="flashcard-counter"><strong>{index + 1} / {module.terms.length}</strong><span>{module.title}</span></div>
      <button className={`flashcard ${revealed ? 'revealed' : ''}`} type="button" onClick={() => setRevealed((value) => !value)}>
        <span className="eyebrow">{revealed ? 'Respuesta' : 'Flashcard'}</span>
        <strong>{term.term}</strong>
        {revealed ? <div><p>{term.translation}</p><p>{term.definition}</p><blockquote>{term.example}</blockquote><small>{term.exampleTranslation}</small></div> : <p>Hacé clic para ver traducción, definición y ejemplo.</p>}
      </button>
      <div className="vocab-actions">
        <button className="button ghost dark-ghost" type="button" disabled={index === 0} onClick={() => goTo(index - 1)}>Anterior</button>
        <button className="button ghost dark-ghost" type="button" onClick={() => { setIndex(0); setRevealed(false) }}>Reiniciar</button>
        <button className="button" type="button" disabled={index === module.terms.length - 1} onClick={() => goTo(index + 1)}>Siguiente</button>
      </div>
    </section>
  )
}

function VocabularyQuiz({ module, allModules, onBack }) {
  const [size, setSize] = useState(10)
  const [quiz, setQuiz] = useState(() => generateVocabularyQuiz(module, allModules, size))
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [finished, setFinished] = useState(false)
  const question = quiz[index]
  const result = finished ? calculateVocabularyResult(quiz, answers, module) : null

  const restart = () => {
    setQuiz(generateVocabularyQuiz(module, allModules, size))
    setIndex(0)
    setAnswers({})
    setFinished(false)
  }

  const select = (answer) => setAnswers((current) => ({ ...current, [question.id]: answer }))
  const next = () => {
    if (index === quiz.length - 1) setFinished(true)
    else setIndex((current) => current + 1)
  }

  if (finished) {
    return (
      <section className="vocab-quiz-results">
        <span className="eyebrow">Resultado del mini examen</span>
        <h2>Resultado: {result.correct}/{result.total}</h2>
        <p>{result.percentage}% · {result.moduleTitle}</p>
        <div className="quiz-result-grid">
          <section><h3>Términos correctos</h3>{result.correctTerms.length ? <ul>{result.correctTerms.map((term) => <li key={term}>{term}</li>)}</ul> : <p>Sin términos correctos todavía.</p>}</section>
          <section><h3>Términos a repasar</h3>{result.missedTerms.length ? <ul>{result.missedTerms.map((term) => <li key={term}>{term}</li>)}</ul> : <p>No hubo términos fallados en esta ronda.</p>}</section>
        </div>
        <section className="answer-review">
          <h2>Revisión de respuestas</h2>
          <div className="review-list">{result.review.map((item) => <article key={item.id} className={item.isCorrect ? '' : 'incorrect'}><div className="review-heading"><span>{item.term}</span><strong>{item.isCorrect ? 'Correcta' : 'A repasar'}</strong></div><p>{item.question}</p><p><strong>Tu respuesta:</strong> {item.selectedAnswer || 'Sin respuesta'}</p>{!item.isCorrect && <p><strong>Respuesta correcta:</strong> {item.correctAnswer}</p>}</article>)}</div>
        </section>
        <aside className="work-recommendation"><strong>Recomendación</strong><p>{result.recommendation}</p></aside>
        <div className="vocab-actions"><button className="button" type="button" onClick={restart}>Repetir examen</button><button className="button ghost dark-ghost" type="button" onClick={onBack}>Volver al módulo</button><Link className="button ghost dark-ghost" to="/work-english-test/vocabulary-practice">Volver a Vocabulary Practice</Link></div>
      </section>
    )
  }

  return (
    <section className="vocab-quiz">
      <div className="quiz-settings">
        <label>Cantidad de preguntas<select value={size} onChange={(event) => { const nextSize = Number(event.target.value); setSize(nextSize); setQuiz(generateVocabularyQuiz(module, allModules, nextSize)); setIndex(0); setAnswers({}); setFinished(false) }}>{quizSizes.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
        <button className="button ghost dark-ghost" type="button" onClick={restart}>Mezclar otra vez</button>
      </div>
      <div className="test-progress"><div><strong>Pregunta {index + 1} de {quiz.length}</strong><span>{Math.round(((index + 1) / quiz.length) * 100)}%</span></div><div className="progress-track"><span style={{ width: `${((index + 1) / quiz.length) * 100}%` }} /></div></div>
      <article className="practice-card">
        <div className="question-tags"><span>{module.category}</span><span>{question.type}</span></div>
        <h2>{question.question}</h2>
        <div className="answer-options">
          {question.options.map((option, optionIndex) => {
            const letter = String.fromCharCode(65 + optionIndex)
            return <button key={option} type="button" className={answers[question.id] === option ? 'selected' : ''} onClick={() => select(option)}><span className="option-letter">{letter}</span><span>{option}</span></button>
          })}
        </div>
      </article>
      <div className="test-navigation"><button className="button ghost dark-ghost" type="button" disabled={index === 0} onClick={() => setIndex((current) => current - 1)}>Anterior</button><button className="button" type="button" disabled={!answers[question.id]} onClick={next}>{index === quiz.length - 1 ? 'Ver resultado' : 'Siguiente'}</button></div>
    </section>
  )
}

function ModuleDetail({ module }) {
  const [mode, setMode] = useState('study')

  return (
    <div className="vocab-detail-page">
      <Link className="back-link" to="/work-english-test/vocabulary-practice">← Volver a Vocabulary Practice</Link>
      <header className="vocab-module-hero">
        <span className="eyebrow">{module.category}</span>
        <h1>{module.title}</h1>
        <p>{module.description}</p>
        <div className="vocab-facts"><span>{module.level}</span><span>{module.terms.length} términos</span><span>{module.tags.join(' · ')}</span></div>
        <div className="vocab-actions">
          <button className={`button ${mode === 'study' ? '' : 'ghost dark-ghost'}`} type="button" onClick={() => setMode('study')}>Estudiar lista</button>
          <button className={`button ${mode === 'flashcards' ? '' : 'ghost dark-ghost'}`} type="button" onClick={() => setMode('flashcards')}>Practicar con flashcards</button>
          <button className={`button ${mode === 'quiz' ? '' : 'ghost dark-ghost'}`} type="button" onClick={() => setMode('quiz')}>Mini examen</button>
        </div>
      </header>
      {mode === 'study' && <StudyList module={module} />}
      {mode === 'flashcards' && <Flashcards module={module} />}
      {mode === 'quiz' && <VocabularyQuiz module={module} allModules={workVocabularyModules} onBack={() => setMode('study')} />}
    </div>
  )
}

export default function VocabularyPractice() {
  const { moduleSlug } = useParams()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Todos')
  const [level, setLevel] = useState('Todos')
  const module = workVocabularyModules.find((item) => item.slug === moduleSlug)

  const filteredModules = useMemo(() => workVocabularyModules.filter((item) => {
    const haystack = [item.title, item.description, item.category, item.level, item.tags.join(' '), item.terms.map((term) => term.term).join(' ')].join(' ').toLowerCase()
    const matchesQuery = haystack.includes(query.toLowerCase())
    const matchesCategory = category === 'Todos' || item.category === category
    const matchesLevel = level === 'Todos' || item.level === level
    return matchesQuery && matchesCategory && matchesLevel
  }), [query, category, level])

  useEffect(() => {
    if (!import.meta.env.DEV) return
    const validation = validateWorkVocabularyModules(workVocabularyModules)
    if (!validation.valid) console.warn('Vocabulary Practice validation warnings:', validation.errors)
  }, [])

  if (moduleSlug && !module) {
    return <section className="detail-page"><h1>Módulo no encontrado</h1><Link className="button" to="/work-english-test/vocabulary-practice">Volver a Vocabulary Practice</Link></section>
  }

  if (module) return <ModuleDetail module={module} />

  return (
    <div className="vocabulary-practice-page internal-test-page">
      <SectionGeneralTest hero={practicePageHeroes.vocabulary} title="Work Vocabulary Check" description="Medí qué tan preparado estás con vocabulario laboral. Este test toma palabras aleatorias de customer service, call center, tech support, insurance, sales, training y entrevistas." helperCopy="Primero podés hacer un test general de vocabulario laboral. Después estudiá módulos, usá flashcards y hacé mini exámenes por área." buttonText="Iniciar test de vocabulary" duration="25 preguntas · 10 min aprox." generateTest={() => generateVocabularyGeneralTest(workVocabularyModules)} scoreTest={scoreVocabularyGeneralTest} />
      <section className="practice-section-heading"><span className="eyebrow">Práctica por módulos</span><h2>Estudiá, usá flashcards y hacé mini exámenes</h2></section>
      <section className="practice-filters" aria-label="Filtros de Vocabulary Practice">
        <label>Buscar módulos o términos<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ej. claim, tech support, sales..." /></label>
        <label>Categoría<select value={category} onChange={(event) => setCategory(event.target.value)}><option>Todos</option>{workVocabularyCategories.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Nivel<select value={level} onChange={(event) => setLevel(event.target.value)}><option>Todos</option>{workVocabularyLevels.map((item) => <option key={item}>{item}</option>)}</select></label>
      </section>
      <p className="results-count">{filteredModules.length} módulos encontrados</p>
      <section className="vocab-module-grid">
        {filteredModules.map((item) => <VocabularyModuleCard key={item.id} module={item} />)}
      </section>
    </div>
  )
}
