import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import SectionGeneralTest from '../components/SectionGeneralTest.jsx'
import { listeningPracticeCategories, listeningPracticeContexts, listeningPracticeItems } from '../data/listeningPracticeItems.js'
import { calculateListeningResult, filterListeningItems, generateListeningGeneralTest, scoreListeningGeneralTest } from '../utils/listeningPractice.js'

const initialFilters = { query: '', level: 'Todos', category: 'Todos', context: 'Todos' }

function formatType(type) {
  return type.replaceAll('_', ' ')
}

function ListeningItemCard({ item }) {
  return (
    <article className="listening-card">
      <div className="card-top"><span className="eyebrow">{item.category}</span><span className="status available">{item.level}</span></div>
      <h2>{item.title}</h2>
      <p>{item.summary}</p>
      <div className="reading-card-meta"><span>{item.context}</span><span>{item.estimatedTime}</span><span>{item.questions.length} preguntas</span></div>
      <Link className="button" to={`/work-english-test/listening-practice/${item.slug}`}>Practicar audio</Link>
    </article>
  )
}

function ListeningQuestion({ question, selectedAnswer, submitted, onSelect }) {
  return (
    <article className="reading-question">
      <div className="question-tags"><span>{formatType(question.type)}</span></div>
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

function ListeningTranscriptBox({ transcript }) {
  return (
    <details className="listening-transcript">
      <summary>Ver transcripción</summary>
      {transcript ? <p>{transcript}</p> : <p>Transcripción pendiente.</p>}
    </details>
  )
}

function ListeningResults({ result, item, onRetry }) {
  return (
    <section className="reading-results">
      <span className="eyebrow">Resultado de listening</span>
      <h2>Resultado: {result.correct}/{result.total}</h2>
      <p>{result.percentage}% · Nivel {result.level}</p>
      <div className="practice-result-grid">
        <div><span>Tipos a reforzar</span><strong>{result.missedQuestionTypes.length ? result.missedQuestionTypes.map(formatType).join(', ') : 'Sin tipos críticos'}</strong></div>
        <div><span>Vocabulario a repasar</span><strong>{result.missedVocabularyTerms.length ? result.missedVocabularyTerms.join(', ') : 'Sin vocabulario crítico'}</strong></div>
      </div>
      <aside className="work-recommendation"><strong>Recomendación</strong><p>{result.recommendation}</p></aside>
      <div className="vocab-actions"><button className="button" type="button" onClick={onRetry}>Repetir audio</button><Link className="button ghost dark-ghost" to="/work-english-test/listening-practice">Volver al listado</Link></div>
      <ListeningTranscriptBox transcript={item.transcript} />
    </section>
  )
}

function ListeningVocabularyBox({ vocabulary }) {
  if (!vocabulary?.length) return null
  return (
    <section className="reading-vocabulary-box">
      <span className="eyebrow">Vocabulario clave</span>
      <div className="reading-vocab-grid">
        {vocabulary.map((item) => <article key={item.term}><strong>{item.term}</strong><p>{item.meaning}</p><small>{item.example}</small></article>)}
      </div>
    </section>
  )
}

function ListeningDetail({ item }) {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const result = submitted ? calculateListeningResult(item, answers) : null
  const allAnswered = item.questions.every((question) => answers[question.id])

  const retry = () => {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <div className="listening-detail-page">
      <Link className="back-link" to="/work-english-test/listening-practice">← Volver a Listening Practice</Link>
      <article className="reading-scenario-detail">
        <header className="reading-hero">
          <span className="eyebrow">{item.category}</span>
          <h1>{item.title}</h1>
          <p>{item.summary}</p>
          <div className="reading-card-meta"><span>{item.level}</span><span>{item.context}</span><span>{item.estimatedTime}</span></div>
        </header>
        <section className="listening-player">
          <span className="eyebrow">Audio</span>
          <p>Escuchá el audio y respondé las preguntas. La transcripción se muestra después de enviar respuestas.</p>
          <audio controls><source src={item.audioUrl} type={item.audioType || 'audio/mpeg'} />Tu navegador no puede reproducir este audio.</audio>
        </section>
        <ListeningVocabularyBox vocabulary={item.vocabulary} />
        <section className="reading-question-list">
          <span className="eyebrow">Preguntas</span>
          {item.questions.map((question) => <ListeningQuestion key={question.id} question={question} selectedAnswer={answers[question.id]} submitted={submitted} onSelect={(id, answer) => setAnswers((current) => ({ ...current, [id]: answer }))} />)}
        </section>
        {!submitted && <div className="test-navigation"><Link className="button ghost dark-ghost" to="/work-english-test/listening-practice">Volver al listado</Link><button className="button" type="button" disabled={!allAnswered} onClick={() => setSubmitted(true)}>Enviar respuestas</button></div>}
        {submitted && <ListeningResults result={result} item={item} onRetry={retry} />}
      </article>
    </div>
  )
}

export default function ListeningPractice() {
  const { listeningSlug } = useParams()
  const [filters, setFilters] = useState(initialFilters)
  const levels = useMemo(() => [...new Set(listeningPracticeItems.map((item) => item.level))], [])
  const item = listeningPracticeItems.find((entry) => entry.slug === listeningSlug)
  const filteredItems = useMemo(() => filterListeningItems(listeningPracticeItems, filters), [filters])

  const updateFilter = (name, value) => setFilters((current) => ({ ...current, [name]: value }))

  if (listeningSlug && !item) return <section className="detail-page"><h1>Audio no encontrado</h1><Link className="button" to="/work-english-test/listening-practice">Volver a Listening Practice</Link></section>
  if (item) return <ListeningDetail item={item} />

  return (
    <div className="listening-practice-page">
      <Link className="back-link" to="/work-english-test">← Volver a Work English Test</Link>
      <PageHeader eyebrow="Work English Test" title="Listening Practice" description="Escuchá conversaciones laborales en inglés y practicá comprensión con preguntas similares a situaciones de training, entrevistas, customer service y ambientes bilingües." />
      <SectionGeneralTest title="Listening Level Check" description="Evaluá tu comprensión auditiva con audios aleatorios de situaciones laborales. El resultado es orientativo y te ayuda a saber qué tan bien entendés conversaciones, instrucciones y solicitudes en inglés." helperCopy="Primero podés hacer un test general de listening. Después practicá audios específicos por contexto." buttonText="Iniciar test de listening" duration="10–20 preguntas · 12 min aprox." generateTest={() => generateListeningGeneralTest(listeningPracticeItems)} scoreTest={scoreListeningGeneralTest} />
      <section className="practice-section-heading"><span className="eyebrow">Práctica por audio</span><h2>Filtros y audios específicos</h2></section>
      <section className="reading-filters" aria-label="Filtros de Listening Practice">
        <label>Buscar<input type="search" value={filters.query} onChange={(event) => updateFilter('query', event.target.value)} placeholder="Ej. order, sales, billing..." /></label>
        <label>Nivel<select value={filters.level} onChange={(event) => updateFilter('level', event.target.value)}><option>Todos</option>{levels.map((level) => <option key={level}>{level}</option>)}</select></label>
        <label>Categoría<select value={filters.category} onChange={(event) => updateFilter('category', event.target.value)}><option>Todos</option>{listeningPracticeCategories.map((category) => <option key={category}>{category}</option>)}</select></label>
        <label>Contexto<select value={filters.context} onChange={(event) => updateFilter('context', event.target.value)}><option>Todos</option>{listeningPracticeContexts.map((context) => <option key={context}>{context}</option>)}</select></label>
      </section>
      <p className="results-count">{filteredItems.length} audios encontrados</p>
      <section className="listening-grid">
        {filteredItems.map((entry) => <ListeningItemCard key={entry.id} item={entry} />)}
      </section>
    </div>
  )
}
