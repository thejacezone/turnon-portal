import { useMemo, useState } from 'react'

export default function SectionGeneralTest({ title, description, helperCopy, buttonText, duration, generateTest, scoreTest, backLabel = 'Volver a la práctica' }) {
  const [phase, setPhase] = useState('intro')
  const [items, setItems] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const result = useMemo(() => phase === 'results' ? scoreTest(items, answers) : null, [phase, items, answers, scoreTest])
  const current = items[currentIndex]

  const start = () => {
    const nextItems = generateTest()
    setItems(nextItems)
    setCurrentIndex(0)
    setAnswers({})
    setPhase(nextItems.length ? 'questions' : 'empty')
  }

  const restart = () => start()
  const selectAnswer = (answer) => setAnswers((currentAnswers) => ({ ...currentAnswers, [current.id]: answer }))
  const next = () => {
    if (currentIndex === items.length - 1) setPhase('results')
    else setCurrentIndex((index) => index + 1)
  }

  return (
    <section className="section-general-test">
      <div className="general-test-intro">
        <span className="eyebrow">Test general</span>
        <h2>{title}</h2>
        <p>{description}</p>
        {helperCopy && <p className="general-test-helper">{helperCopy}</p>}
        <div className="test-facts"><span>{duration}</span><span>Resultado orientativo</span><span>No es certificación oficial</span></div>
        {phase === 'intro' && <button className="button" type="button" onClick={start}>{buttonText}</button>}
        {phase === 'empty' && <div className="test-note">No hay suficientes preguntas disponibles para generar este test.</div>}
      </div>

      {phase === 'questions' && current && (
        <div className="general-test-runner">
          <div className="test-progress"><div><strong>Pregunta {currentIndex + 1} de {items.length}</strong><span>{Math.round(((currentIndex + 1) / items.length) * 100)}%</span></div><div className="progress-track"><span style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }} /></div></div>
          {current.passage && <section className="general-test-passage"><span className="eyebrow">Texto</span><p>{current.passage}</p></section>}
          <article className="practice-card">
            {current.tags?.length > 0 && <div className="question-tags">{current.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
            <h2>{current.question}</h2>
            <div className="answer-options">
              {current.options.map((option, index) => {
                const letter = String.fromCharCode(65 + index)
                return <button key={option} type="button" className={answers[current.id] === option ? 'selected' : ''} onClick={() => selectAnswer(option)}><span className="option-letter">{letter}</span><span>{option}</span></button>
              })}
            </div>
          </article>
          <div className="test-navigation"><button className="button ghost dark-ghost" type="button" disabled={currentIndex === 0} onClick={() => setCurrentIndex((index) => index - 1)}>Anterior</button><button className="button" type="button" disabled={!answers[current.id]} onClick={next}>{currentIndex === items.length - 1 ? 'Ver resultado' : 'Siguiente'}</button></div>
        </div>
      )}

      {phase === 'results' && result && (
        <div className="general-test-results">
          <span className="eyebrow">Resultado estimado</span>
          <div className="result-hero"><div><h1>{result.estimatedLevel}</h1><p>{result.recommendation}</p></div><div className="score-ring"><strong>{result.percentage}%</strong><span>{result.correct}/{result.total}</span></div></div>
          <div className="score-sections general-score-sections">
            {result.scoreBlocks?.map((block) => <section key={block.title}><h2>{block.title}</h2>{block.rows.map((row) => <div className="score-line" key={`${block.title}-${row.label}`}><span>{row.label}</span><strong>{row.value}</strong></div>)}</section>)}
          </div>
          <div className="topic-grid">
            <section><h2>{result.strongItemsTitle || 'Fortalezas'}</h2>{result.strongItems?.length ? <ul>{result.strongItems.map((item) => <li key={item}>{item}</li>)}</ul> : <p>Todavía no hay fortalezas claras en esta ronda.</p>}</section>
            <section><h2>{result.reinforceItemsTitle || 'A reforzar'}</h2>{result.reinforceItems?.length ? <ul>{result.reinforceItems.map((item) => <li key={item}>{item}</li>)}</ul> : <p>No hubo áreas críticas en esta ronda.</p>}</section>
          </div>
          {result.missedItems?.length > 0 && <section className="work-recommendation"><span className="eyebrow">{result.missedItemsTitle || 'Repasar'}</span><p>{result.missedItems.join(', ')}</p></section>}
          <details className="answer-review" open>
            <summary>Revisar respuestas</summary>
            <div className="review-list">
              {result.review.map((item, index) => <article key={item.id} className={item.isCorrect ? '' : 'incorrect'}><div className="review-heading"><span>{index + 1}. {item.isCorrect ? 'Correcta' : 'Incorrecta'}</span><small>{item.tags?.join(' · ')}</small></div><p>{item.question}</p>{item.selectedAnswer && <p><strong>Tu respuesta:</strong> {item.selectedAnswer}</p>}<p><strong>Correcta:</strong> {item.correctAnswer}</p><p>{item.explanation}</p></article>)}
            </div>
          </details>
          <div className="vocab-actions"><button className="button" type="button" onClick={restart}>Repetir test</button><button className="button ghost dark-ghost" type="button" onClick={() => setPhase('intro')}>{backLabel}</button></div>
        </div>
      )}
    </section>
  )
}
