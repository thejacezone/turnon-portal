import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SectionGeneralTest from '../components/SectionGeneralTest.jsx'
import { practicePageHeroes } from '../data/practicePageHeroes.js'
import { readingPracticeCategories, readingPracticeContexts, readingPracticeScenarios, readingPracticeTypes } from '../data/readingPracticeScenarios.js'
import { calculateReadingResult, filterReadingScenarios } from '../utils/readingPractice.js'
import { generateReadingGeneralTest, scoreReadingGeneralTest } from '../utils/sectionGeneralTests.js'
import { validateReadingPracticeScenarios } from '../utils/questionValidation.js'

const initialFilters = { query: '', level: 'Todos', category: 'Todos', context: 'Todos', type: 'Todos' }

function formatType(type) {
  return type.replaceAll('_', ' ')
}

function ReadingScenarioCard({ scenario }) {
  return (
    <article className="reading-scenario-card">
      <div className="card-top"><span className="eyebrow">{scenario.category}</span><span className="status available">{scenario.level}</span></div>
      <h2>{scenario.title}</h2>
      <p>{scenario.summary}</p>
      <div className="reading-card-meta">
        <span>{scenario.context}</span>
        <span>{formatType(scenario.type)}</span>
        <span>{scenario.estimatedTime}</span>
        <span>{scenario.questions.length} preguntas</span>
      </div>
      <Link className="button" to={`/work-english-test/reading-practice/${scenario.slug}`}>Practicar escenario</Link>
    </article>
  )
}

function ReadingVocabularyBox({ vocabulary }) {
  if (!vocabulary?.length) return null

  return (
    <section className="reading-vocabulary-box">
      <span className="eyebrow">Vocabulario clave</span>
      <div className="reading-vocab-grid">
        {vocabulary.map((item) => (
          <article key={item.term}>
            <strong>{item.term}</strong>
            <p>{item.meaning}</p>
            {item.example && <small>{item.example}</small>}
          </article>
        ))}
      </div>
    </section>
  )
}

function ReadingQuestion({ question, selectedAnswer, submitted, onSelect }) {
  return (
    <article className="reading-question">
      <div className="question-tags"><span>{question.type.replaceAll('_', ' ')}</span></div>
      <h3>{question.question}</h3>
      <div className="answer-options">
        {question.options.map((option, index) => {
          const letter = String.fromCharCode(65 + index)
          const isSelected = selectedAnswer === option
          const isCorrect = submitted && option === question.correctAnswer
          const isWrong = submitted && isSelected && option !== question.correctAnswer
          const className = [isSelected ? 'selected' : '', isCorrect ? 'correct' : '', isWrong ? 'incorrect' : ''].filter(Boolean).join(' ')

          return <button key={option} type="button" className={className} disabled={submitted} onClick={() => onSelect(question.id, option)}><span className="option-letter">{letter}</span><span>{option}</span></button>
        })}
      </div>
      {submitted && <div className={selectedAnswer === question.correctAnswer ? 'feedback-correct' : 'feedback-incorrect'}><strong>{selectedAnswer === question.correctAnswer ? 'Correcta.' : `Correcta: ${question.correctAnswer}`}</strong><p>{question.explanation}</p></div>}
    </article>
  )
}

function ReadingResults({ result, scenario, onRetry }) {
  return (
    <section className="reading-results">
      <span className="eyebrow">Resultado de reading</span>
      <h2>Resultado: {result.correct}/{result.total}</h2>
      <p>{result.percentage}% · Nivel {result.level}</p>
      <div className="practice-result-grid">
        <div><span>Tipos a reforzar</span><strong>{result.missedQuestionTypes.length ? result.missedQuestionTypes.map(formatType).join(', ') : 'Sin tipos críticos'}</strong></div>
        <div><span>Palabras a repasar</span><strong>{result.missedVocabularyTerms.length ? result.missedVocabularyTerms.join(', ') : 'Sin vocabulario crítico'}</strong></div>
      </div>
      <aside className="work-recommendation"><strong>Recomendación</strong><p>{result.recommendation}</p></aside>
      <div className="vocab-actions"><button className="button" type="button" onClick={onRetry}>Repetir escenario</button><Link className="button ghost dark-ghost" to="/work-english-test/reading-practice">Volver al listado</Link><Link className="button ghost dark-ghost" to={`/work-english-test/reading-practice/${scenario.slug}`}>Revisar respuestas</Link></div>
    </section>
  )
}

function ScenarioDetail({ scenario }) {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const result = submitted ? calculateReadingResult(scenario, answers) : null
  const allAnswered = scenario.questions.every((question) => answers[question.id])

  const retry = () => {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <div className="reading-detail-page">
      <Link className="back-link" to="/work-english-test/reading-practice">← Volver a Reading Practice</Link>
      <article className="reading-scenario-detail">
        <header className="reading-hero">
          <span className="eyebrow">{scenario.category}</span>
          <h1>{scenario.title}</h1>
          <p>{scenario.summary}</p>
          <div className="reading-card-meta"><span>{scenario.level}</span><span>{scenario.context}</span><span>{formatType(scenario.type)}</span><span>{scenario.estimatedTime}</span></div>
        </header>
        <section className="reading-passage"><span className="eyebrow">Texto</span><p>{scenario.passage}</p></section>
        <ReadingVocabularyBox vocabulary={scenario.vocabulary} />
        <section className="reading-question-list">
          <span className="eyebrow">Preguntas</span>
          {scenario.questions.map((question) => <ReadingQuestion key={question.id} question={question} selectedAnswer={answers[question.id]} submitted={submitted} onSelect={(id, answer) => setAnswers((current) => ({ ...current, [id]: answer }))} />)}
        </section>
        {!submitted && <div className="test-navigation"><Link className="button ghost dark-ghost" to="/work-english-test/reading-practice">Volver al listado</Link><button className="button" type="button" disabled={!allAnswered} onClick={() => setSubmitted(true)}>Enviar respuestas</button></div>}
        {submitted && <ReadingResults result={result} scenario={scenario} onRetry={retry} />}
      </article>
    </div>
  )
}

export default function ReadingPractice() {
  const { scenarioSlug } = useParams()
  const [filters, setFilters] = useState(initialFilters)
  const levels = useMemo(() => [...new Set(readingPracticeScenarios.map((scenario) => scenario.level))], [])
  const scenario = readingPracticeScenarios.find((item) => item.slug === scenarioSlug)
  const filteredScenarios = useMemo(() => filterReadingScenarios(readingPracticeScenarios, filters), [filters])

  useEffect(() => {
    if (!import.meta.env.DEV) return
    const validation = validateReadingPracticeScenarios(readingPracticeScenarios)
    if (!validation.valid) console.warn('Reading Practice validation warnings:', validation.errors)
  }, [])

  const updateFilter = (name, value) => setFilters((current) => ({ ...current, [name]: value }))

  if (scenarioSlug && !scenario) return <section className="detail-page"><h1>Escenario no encontrado</h1><Link className="button" to="/work-english-test/reading-practice">Volver a Reading Practice</Link></section>
  if (scenario) return <ScenarioDetail scenario={scenario} />

  return (
    <div className="reading-practice-page internal-test-page">
      <SectionGeneralTest hero={practicePageHeroes.reading} title="Reading Level Check" description="Evaluá tu comprensión lectora con escenarios laborales aleatorios. Vas a leer correos, instrucciones, mensajes y textos cortos similares a los que podrías encontrar en training, entrevistas o ambientes bilingües." helperCopy="Primero podés hacer un test general de comprensión lectora. Después practicá escenarios específicos por nivel, contexto y tipo de texto." buttonText="Iniciar test de reading" duration="12–20 preguntas · 12 min aprox." generateTest={() => generateReadingGeneralTest(readingPracticeScenarios)} scoreTest={scoreReadingGeneralTest} />
      <section className="practice-section-heading"><span className="eyebrow">Práctica por escenarios</span><h2>Filtros y escenarios específicos</h2></section>
      <section className="reading-filters" aria-label="Filtros de Reading Practice">
        <label>Buscar<input type="search" value={filters.query} onChange={(event) => updateFilter('query', event.target.value)} placeholder="Ej. HR, benefits, schedule, policy..." /></label>
        <label>Nivel<select value={filters.level} onChange={(event) => updateFilter('level', event.target.value)}><option>Todos</option>{levels.map((level) => <option key={level}>{level}</option>)}</select></label>
        <label>Categoría<select value={filters.category} onChange={(event) => updateFilter('category', event.target.value)}><option>Todos</option>{readingPracticeCategories.map((category) => <option key={category}>{category}</option>)}</select></label>
        <label>Contexto<select value={filters.context} onChange={(event) => updateFilter('context', event.target.value)}><option>Todos</option>{readingPracticeContexts.map((context) => <option key={context}>{context}</option>)}</select></label>
        <label>Tipo<select value={filters.type} onChange={(event) => updateFilter('type', event.target.value)}><option>Todos</option>{readingPracticeTypes.map((type) => <option key={type} value={type}>{formatType(type)}</option>)}</select></label>
      </section>
      <p className="results-count">{filteredScenarios.length} escenarios encontrados</p>
      <section className="reading-scenario-grid">
        {filteredScenarios.map((item) => <ReadingScenarioCard key={item.id} scenario={item} />)}
      </section>
    </div>
  )
}
