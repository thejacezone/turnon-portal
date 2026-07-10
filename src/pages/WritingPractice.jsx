import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import { writingPracticeCategories, writingPracticePrompts } from '../data/writingPracticePrompts.js'
import { calculateWritingGeneralResult, evaluateWritingResponse, filterWritingPrompts, formatWritingTime, generateWritingGeneralTest, countWords, calculateWpm } from '../utils/writingPractice.js'
import { validateWritingPracticePrompts } from '../utils/questionValidation.js'

const initialFilters = { query: '', level: 'Todos', category: 'Todos' }

function useWritingTimer(active, startedAt, pausedSeconds = 0) {
  const [elapsedSeconds, setElapsedSeconds] = useState(pausedSeconds)

  useEffect(() => {
    if (!active || !startedAt) return undefined
    const interval = window.setInterval(() => {
      setElapsedSeconds((Date.now() - startedAt) / 1000)
    }, 500)
    return () => window.clearInterval(interval)
  }, [active, startedAt])

  useEffect(() => {
    if (!active && pausedSeconds === 0) setElapsedSeconds(0)
  }, [active, pausedSeconds])

  return elapsedSeconds
}

function WritingPromptCard({ prompt }) {
  return (
    <article className="writing-card">
      <div className="card-top"><span className="eyebrow">{prompt.category}</span><span className="status available">{prompt.level}</span></div>
      <h2>{prompt.title}</h2>
      <p>{prompt.prompt}</p>
      <div className="reading-card-meta"><span>{prompt.context}</span><span>{prompt.timeLimitMinutes} min</span><span>Mín. {prompt.minimumWords}</span><span>Meta {prompt.targetWords}</span></div>
      <Link className="button" to={`/work-english-test/writing-practice/${prompt.slug}`}>Practicar</Link>
    </article>
  )
}

function WritingStats({ text, elapsedSeconds, prompt }) {
  const words = countWords(text)
  const wpm = calculateWpm(words, elapsedSeconds)
  const progress = Math.min(100, Math.round((words / prompt.minimumWords) * 100))
  const remainingSeconds = Math.max(0, prompt.timeLimitMinutes * 60 - elapsedSeconds)

  return (
    <section className="writing-stats">
      <div><span>Tiempo usado</span><strong>{formatWritingTime(elapsedSeconds)}</strong></div>
      <div><span>Tiempo restante</span><strong>{formatWritingTime(remainingSeconds)}</strong></div>
      <div><span>Palabras</span><strong>{words}</strong></div>
      <div><span>Caracteres</span><strong>{text.length}</strong></div>
      <div><span>WPM</span><strong>{wpm}</strong></div>
      <div><span>Meta sugerida</span><strong>{prompt.targetWpm}+ WPM</strong></div>
      <div className="writing-progress"><span>Progreso mínimo</span><strong>{progress}%</strong><div className="progress-track"><span style={{ width: `${progress}%` }} /></div></div>
    </section>
  )
}

function WritingEditor({ prompt, text, elapsedSeconds, finished, onTextChange, onFinish, onReset }) {
  return (
    <>
      <section className="writing-workspace">
        <span className="eyebrow">Prompt</span>
        <h2>{prompt.prompt}</h2>
        <p>{prompt.instructions}</p>
        <div className="writing-focus-list">
          {prompt.evaluationFocus.map((focus) => <span key={focus}>{focus}</span>)}
        </div>
        <textarea value={text} disabled={finished} onChange={(event) => onTextChange(event.target.value)} placeholder="Escribí tu respuesta aquí. El temporizador empieza cuando comenzás a escribir." />
      </section>
      <WritingStats text={text} elapsedSeconds={elapsedSeconds} prompt={prompt} />
      <p className="writing-note">30 WPM o más se considera una velocidad aceptable para este ejercicio, pero no mide por sí sola tu nivel de inglés.</p>
      <div className="test-navigation">
        <button className="button ghost dark-ghost" type="button" onClick={onReset}>Reiniciar</button>
        <button className="button" type="button" onClick={onFinish} disabled={finished}>Terminar práctica</button>
      </div>
    </>
  )
}

function WritingResult({ result, prompt, onReset }) {
  return (
    <section className="writing-results">
      <span className="eyebrow">Resultado orientativo</span>
      <h2>{result.level}</h2>
      <p>Escribiste {result.wordCount} palabras en {result.formattedTime}. Tu velocidad fue de {result.wpm} WPM.</p>
      <div className="practice-result-grid">
        <div><span>Palabras</span><strong>{result.wordCountResult.status}</strong><small>{result.wordCountResult.message}</small></div>
        <div><span>Velocidad</span><strong>{result.speedResult.status}</strong><small>{result.speedResult.message}</small></div>
        <div><span>Estructura básica</span><strong>{result.sentenceCount >= 3 ? '3+ oraciones' : `${result.sentenceCount} oración(es)`}</strong><small>Conectores: {result.connectorsFound.length ? result.connectorsFound.join(', ') : 'sin conectores detectados'}</small></div>
        <div><span>Vocabulario laboral</span><strong>{result.workVocabularyFound.length ? result.workVocabularyFound.join(', ') : 'A reforzar'}</strong><small>{prompt.category}</small></div>
      </div>
      <aside className="work-recommendation"><strong>Recomendación</strong><p>{result.recommendation}</p><p>Esta estimación no evalúa pronunciación ni gramática avanzada porque no usa IA ni revisión humana.</p></aside>
      {prompt.sampleAnswer && <details className="writing-sample"><summary>Ver respuesta de ejemplo</summary><p>{prompt.sampleAnswer}</p></details>}
      <div className="vocab-actions"><button className="button" type="button" onClick={onReset}>Repetir práctica</button><Link className="button ghost dark-ghost" to="/work-english-test/writing-practice">Volver a Writing Practice</Link></div>
    </section>
  )
}

function WritingDetail({ prompt }) {
  const [text, setText] = useState('')
  const [startedAt, setStartedAt] = useState(null)
  const [finished, setFinished] = useState(false)
  const [finalSeconds, setFinalSeconds] = useState(0)
  const elapsedSeconds = useWritingTimer(Boolean(startedAt && !finished), startedAt, finalSeconds)
  const result = finished ? evaluateWritingResponse(prompt, text, finalSeconds) : null

  const updateText = (value) => {
    if (!startedAt && value.trim()) setStartedAt(Date.now())
    setText(value)
  }

  const finish = () => {
    const seconds = startedAt ? (Date.now() - startedAt) / 1000 : 0
    setFinalSeconds(seconds)
    setFinished(true)
  }

  const reset = () => {
    setText('')
    setStartedAt(null)
    setFinalSeconds(0)
    setFinished(false)
  }

  return (
    <div className="writing-detail-page">
      <Link className="back-link" to="/work-english-test/writing-practice">← Volver a Writing Practice</Link>
      <header className="writing-hero">
        <span className="eyebrow">{prompt.category}</span>
        <h1>{prompt.title}</h1>
        <p>{prompt.context}</p>
        <div className="reading-card-meta"><span>{prompt.level}</span><span>{prompt.timeLimitMinutes} min</span><span>Mínimo {prompt.minimumWords}</span><span>Meta {prompt.targetWords}</span></div>
      </header>
      <section className="writing-tips">
        <span className="eyebrow">Tips rápidos</span>
        <ul>{prompt.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
      </section>
      <WritingEditor prompt={prompt} text={text} elapsedSeconds={finished ? finalSeconds : elapsedSeconds} finished={finished} onTextChange={updateText} onFinish={finish} onReset={reset} />
      {result && <WritingResult result={result} prompt={prompt} onReset={reset} />}
    </div>
  )
}

function WritingGeneralTest({ prompts }) {
  const [mode, setMode] = useState('intro')
  const [testPrompts, setTestPrompts] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [responses, setResponses] = useState({})
  const [text, setText] = useState('')
  const [startedAt, setStartedAt] = useState(null)
  const [result, setResult] = useState(null)
  const currentPrompt = testPrompts[currentIndex]
  const elapsedSeconds = useWritingTimer(Boolean(startedAt && mode === 'running'), startedAt, 0)

  const start = () => {
    setTestPrompts(generateWritingGeneralTest(prompts))
    setCurrentIndex(0)
    setResponses({})
    setText('')
    setStartedAt(null)
    setResult(null)
    setMode('running')
  }

  const updateText = (value) => {
    if (!startedAt && value.trim()) setStartedAt(Date.now())
    setText(value)
  }

  const finishCurrent = () => {
    const secondsUsed = startedAt ? (Date.now() - startedAt) / 1000 : 0
    const nextResponses = { ...responses, [currentPrompt.id]: { text, secondsUsed } }
    if (currentIndex === testPrompts.length - 1) {
      setResponses(nextResponses)
      setResult(calculateWritingGeneralResult(testPrompts, nextResponses))
      setMode('results')
      return
    }
    setResponses(nextResponses)
    setCurrentIndex((index) => index + 1)
    setText('')
    setStartedAt(null)
  }

  if (mode === 'intro') {
    return (
      <section className="section-general-test">
        <div className="general-test-intro">
          <span className="eyebrow">Writing Level Check</span>
          <h2>Test general de writing</h2>
          <p>Poné a prueba tu escritura con prompts aleatorios de entrevistas, correos y situaciones laborales. El resultado mide velocidad, extensión, estructura básica y claridad general de forma orientativa.</p>
          <p className="general-test-helper">No guarda progreso, no usa IA y no reemplaza una evaluación profesional.</p>
          <div className="test-facts"><span>3 prompts</span><span>categorías aleatorias</span><span>30+ WPM sugerido</span></div>
          <button className="button" type="button" onClick={start}>Iniciar test de writing</button>
        </div>
      </section>
    )
  }

  if (mode === 'results' && result) {
    return (
      <section className="section-general-test">
        <div className="general-test-results">
          <div className="result-hero">
            <div><span className="eyebrow">Resultado general</span><h1>{result.overallLevel}</h1><p>{result.recommendation}</p></div>
            <div className="score-ring"><strong>{result.averageWpm}</strong><span>WPM promedio</span></div>
          </div>
          <div className="writing-summary-grid">
            <div><span>Palabras totales</span><strong>{result.totalWords}</strong></div>
            <div><span>Tiempo total</span><strong>{result.formattedTotalTime}</strong></div>
            <div><span>Prompts completos</span><strong>{result.completedPrompts}/{result.totalPrompts}</strong></div>
          </div>
          <div className="score-sections">
            <section><h2>Categorías fuertes</h2>{result.strongCategories.length ? <ul>{result.strongCategories.map((item) => <li key={item}>{item}</li>)}</ul> : <p>Sin categorías fuertes todavía.</p>}</section>
            <section><h2>Categorías a reforzar</h2>{result.reinforceCategories.length ? <ul>{result.reinforceCategories.map((item) => <li key={item}>{item}</li>)}</ul> : <p>Sin categorías críticas.</p>}</section>
          </div>
          <section className="answer-review">
            <h2>Resultados por prompt</h2>
            <div className="review-list">
              {result.results.map((item) => (
                <article key={item.prompt.id} className={item.taskCompletion ? '' : 'incorrect'}>
                  <div className="review-heading"><span>{item.prompt.title}</span><strong>{item.level}</strong></div>
                  <p>{item.wordCount} palabras · {item.formattedTime} · {item.wpm} WPM</p>
                  <p><strong>Velocidad:</strong> {item.speedResult.status}</p>
                  <p><strong>Recomendación:</strong> {item.recommendation}</p>
                </article>
              ))}
            </div>
          </section>
          <button className="button" type="button" onClick={start}>Repetir Writing Level Check</button>
        </div>
      </section>
    )
  }

  if (!currentPrompt) return null

  return (
    <section className="section-general-test">
      <div className="general-test-runner writing-general-runner">
        <div className="test-progress">
          <div><span>Prompt {currentIndex + 1} de {testPrompts.length}</span><strong>{Math.round(((currentIndex + 1) / testPrompts.length) * 100)}%</strong></div>
          <div className="progress-track"><span style={{ width: `${Math.round(((currentIndex + 1) / testPrompts.length) * 100)}%` }} /></div>
        </div>
        <header className="writing-block-header">
          <span className="eyebrow">{currentPrompt.category}</span>
          <h2>{currentPrompt.title}</h2>
          <p>{currentPrompt.prompt}</p>
        </header>
        <WritingEditor prompt={currentPrompt} text={text} elapsedSeconds={elapsedSeconds} finished={false} onTextChange={updateText} onFinish={finishCurrent} onReset={() => { setText(''); setStartedAt(null) }} />
      </div>
    </section>
  )
}

export default function WritingPractice() {
  const { promptSlug } = useParams()
  const [filters, setFilters] = useState(initialFilters)
  const levels = useMemo(() => [...new Set(writingPracticePrompts.map((prompt) => prompt.level))], [])
  const prompt = writingPracticePrompts.find((item) => item.slug === promptSlug)
  const filteredPrompts = useMemo(() => filterWritingPrompts(writingPracticePrompts, filters), [filters])

  useEffect(() => {
    if (import.meta.env.DEV) {
      const validation = validateWritingPracticePrompts(writingPracticePrompts)
      if (!validation.valid) console.warn('Writing Practice validation warnings:', validation.errors)
    }
  }, [])

  const updateFilter = (name, value) => setFilters((current) => ({ ...current, [name]: value }))

  if (promptSlug && !prompt) return <section className="detail-page"><h1>Prompt no encontrado</h1><Link className="button" to="/work-english-test/writing-practice">Volver a Writing Practice</Link></section>
  if (prompt) return <WritingDetail prompt={prompt} />

  return (
    <div className="writing-practice-page">
      <Link className="back-link" to="/work-english-test">← Volver a Work English Test</Link>
      <PageHeader eyebrow="Work English Test" title="Writing Practice" description="Practicá escritura laboral en inglés con preguntas de entrevista, correos profesionales y situaciones de trabajo. El resultado es orientativo y te ayuda a ver velocidad, estructura y claridad básica." />
      <WritingGeneralTest prompts={writingPracticePrompts} />
      <section className="practice-section-heading"><span className="eyebrow">Práctica por escenarios</span><h2>Prompts para entrevistas, correos y trabajo</h2></section>
      <section className="reading-filters" aria-label="Filtros de Writing Practice">
        <label>Buscar<input type="search" value={filters.query} onChange={(event) => updateFilter('query', event.target.value)} placeholder="Ej. interview, email, customer..." /></label>
        <label>Nivel<select value={filters.level} onChange={(event) => updateFilter('level', event.target.value)}><option>Todos</option>{levels.map((level) => <option key={level}>{level}</option>)}</select></label>
        <label>Categoría<select value={filters.category} onChange={(event) => updateFilter('category', event.target.value)}><option>Todos</option>{writingPracticeCategories.map((category) => <option key={category}>{category}</option>)}</select></label>
      </section>
      <p className="results-count">{filteredPrompts.length} prompts encontrados</p>
      <section className="writing-grid">
        {filteredPrompts.map((item) => <WritingPromptCard key={item.id} prompt={item} />)}
      </section>
    </div>
  )
}
