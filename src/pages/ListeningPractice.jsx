import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PracticeTestHero from '../components/PracticeTestHero.jsx'
import { listeningPracticeCategories, listeningPracticeContexts, listeningPracticeItems } from '../data/listeningPracticeItems.js'
import { practicePageHeroes } from '../data/practicePageHeroes.js'
import { calculateListeningResult, filterListeningItems, generateListeningGeneralTest, scoreListeningGeneralTest } from '../utils/listeningPractice.js'
import { validateListeningPracticeItems } from '../utils/questionValidation.js'

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

function ListeningGeneralResults({ result, onRetry }) {
  return (
    <section className="general-test-results">
      <div className="result-hero">
        <div>
          <span className="eyebrow">Resultado final</span>
          <h1>{result.estimatedLevel}</h1>
          <p>{result.recommendation}</p>
        </div>
        <div className="score-ring"><strong>{result.percentage}%</strong><span>{result.correct}/{result.total}</span></div>
      </div>
      <div className="score-sections general-score-sections">
        {result.scoreBlocks.map((block) => (
          <section key={block.title}>
            <h2>{block.title}</h2>
            {block.rows.map((row) => <div className="score-line" key={row.label}><span>{row.label}</span><strong>{row.value}</strong></div>)}
          </section>
        ))}
      </div>
      <div className="score-sections">
        <section>
          <h2>{result.strongItemsTitle}</h2>
          {result.strongItems.length ? <ul>{result.strongItems.map((item) => <li key={item}>{item}</li>)}</ul> : <p>Sin audios fuertes todavía.</p>}
        </section>
        <section>
          <h2>{result.reinforceItemsTitle}</h2>
          {result.reinforceItems.length ? <ul>{result.reinforceItems.map((item) => <li key={item}>{item}</li>)}</ul> : <p>Sin audios críticos.</p>}
        </section>
      </div>
      <section className="answer-review">
        <h2>Revisión agrupada por audio</h2>
        <div className="listening-review-groups">
          {result.groupedReview.map((group) => (
            <article className="listening-review-group" key={group.item.id}>
              <span className="eyebrow">{group.item.category} · {group.item.level}</span>
              <h3>{group.item.title}</h3>
              <p>{group.correct}/{group.total} correctas · {group.percentage}%</p>
              <div className="review-list">
                {group.questions.map((question, index) => (
                  <article key={question.id} className={question.isCorrect ? '' : 'incorrect'}>
                    <div className="review-heading"><span>Pregunta {index + 1}</span><strong>{question.isCorrect ? 'Correcta' : 'A reforzar'}</strong></div>
                    <p>{question.question}</p>
                    <p><strong>Tu respuesta:</strong> {question.selectedAnswer || 'Sin responder'}</p>
                    <p><strong>Respuesta correcta:</strong> {question.correctAnswer}</p>
                    <p>{question.explanation}</p>
                  </article>
                ))}
              </div>
              <ListeningTranscriptBox transcript={group.item.transcript} />
            </article>
          ))}
        </div>
      </section>
      <div className="vocab-actions"><button className="button" type="button" onClick={onRetry}>Repetir Listening Level Check</button></div>
    </section>
  )
}

function ListeningGeneralTest({ items }) {
  const [mode, setMode] = useState('intro')
  const [testItems, setTestItems] = useState([])
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submittedAudioIds, setSubmittedAudioIds] = useState([])
  const [result, setResult] = useState(null)

  const currentItem = testItems[currentAudioIndex]
  const currentAnswered = currentItem ? currentItem.questions.every((question) => answers[question.id]) : false
  const currentSubmitted = currentItem ? submittedAudioIds.includes(currentItem.id) : false
  const progress = testItems.length ? Math.round(((currentAudioIndex + 1) / testItems.length) * 100) : 0

  const startTest = () => {
    const generatedItems = generateListeningGeneralTest(items)
    setTestItems(generatedItems)
    setCurrentAudioIndex(0)
    setAnswers({})
    setSubmittedAudioIds([])
    setResult(null)
    setMode('running')
  }

  const selectAnswer = (questionId, answer) => {
    setAnswers((current) => ({ ...current, [questionId]: answer }))
  }

  const finishTest = () => {
    setResult(scoreListeningGeneralTest(testItems, answers))
    setMode('results')
  }

  const submitCurrentAudio = () => {
    if (!currentItem || !currentAnswered) return
    setSubmittedAudioIds((current) => current.includes(currentItem.id) ? current : [...current, currentItem.id])
  }

  const goToNextAudio = () => {
    if (!currentSubmitted) return
    if (currentAudioIndex === testItems.length - 1) finishTest()
    else setCurrentAudioIndex((index) => index + 1)
  }

  if (mode === 'intro') {
    return (
      <section className="section-general-test internal-test-entry">
        <PracticeTestHero {...practicePageHeroes.listening} onStart={startTest} />
      </section>
    )
  }

  if (mode === 'results' && result) {
    return (
      <section className="section-general-test">
        <ListeningGeneralResults result={result} onRetry={startTest} />
      </section>
    )
  }

  if (!currentItem) return null

  return (
    <section className="section-general-test">
      <div className="general-test-runner listening-block-runner">
        <div className="test-progress">
          <div><span>Audio {currentAudioIndex + 1} de {testItems.length}</span><strong>{progress}%</strong></div>
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
        </div>
        <header className="listening-block-header">
          <span className="eyebrow">{currentItem.category}</span>
          <h2>{currentItem.title}</h2>
          <p>{currentItem.summary}</p>
          <div className="reading-card-meta"><span>{currentItem.level}</span><span>{currentItem.context}</span><span>{currentItem.questions.length} preguntas</span></div>
        </header>
        <section className="listening-player">
          <span className="eyebrow">Audio actual</span>
          <p>Respondé sólo las preguntas de este audio. Al avanzar, el reproductor cambia al siguiente audio.</p>
          <audio key={currentItem.audioUrl} controls><source src={currentItem.audioUrl} type={currentItem.audioType || 'audio/mpeg'} />Tu navegador no puede reproducir este audio.</audio>
        </section>
        <section className="reading-question-list">
          <span className="eyebrow">Preguntas de este audio</span>
          {currentItem.questions.map((question) => <ListeningQuestion key={question.id} question={question} selectedAnswer={answers[question.id]} submitted={currentSubmitted} onSelect={selectAnswer} />)}
        </section>
        {currentSubmitted && <ListeningTranscriptBox transcript={currentItem.transcript} />}
        <div className="test-navigation">
          <button className="button ghost dark-ghost" type="button" disabled={currentAudioIndex === 0} onClick={() => setCurrentAudioIndex((index) => Math.max(0, index - 1))}>Anterior audio</button>
          {!currentSubmitted
            ? <button className="button" type="button" disabled={!currentAnswered} onClick={submitCurrentAudio}>Enviar respuestas</button>
            : <button className="button" type="button" onClick={goToNextAudio}>{currentAudioIndex === testItems.length - 1 ? 'Ver resultado' : 'Siguiente audio'}</button>}
        </div>
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
    <div className="listening-detail-page test-practice-detail">
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
          <audio key={item.audioUrl} controls><source src={item.audioUrl} type={item.audioType || 'audio/mpeg'} />Tu navegador no puede reproducir este audio.</audio>
        </section>
        <ListeningVocabularyBox vocabulary={item.vocabulary} />
        <section className="reading-question-list">
          <span className="eyebrow">Preguntas de este audio</span>
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

  useEffect(() => {
    if (!import.meta.env.DEV) return
    const validation = validateListeningPracticeItems(listeningPracticeItems)
    if (!validation.valid) console.warn('Listening Practice validation warnings:', validation.errors)
  }, [])

  const updateFilter = (name, value) => setFilters((current) => ({ ...current, [name]: value }))

  if (listeningSlug && !item) return <section className="detail-page"><h1>Audio no encontrado</h1><Link className="button" to="/work-english-test/listening-practice">Volver a Listening Practice</Link></section>
  if (item) return <ListeningDetail item={item} />

  return (
    <div className="listening-practice-page internal-test-page test-practice-page">
      <ListeningGeneralTest items={listeningPracticeItems} />
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
