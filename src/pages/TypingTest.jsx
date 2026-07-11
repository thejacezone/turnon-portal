import { useEffect, useMemo, useState } from 'react'
import { typingTestCategories, typingTestPassages } from '../data/typingTestPassages.js'
import { calculateTypingMetrics, calculateTypingResult, formatTypingTime, getCharacterStates, pickTypingPassage } from '../utils/typingTest.js'
import { validateTypingTestPassages } from '../utils/questionValidation.js'

const durations = [
  { label: '1 minuto', value: 60 },
  { label: '3 minutos', value: 180 },
  { label: '5 minutos', value: 300 },
]

function TypingTextDisplay({ passage, typedText }) {
  const characterStates = getCharacterStates(passage.text, typedText)
  return (
    <section className="typing-target">
      <div className="card-top"><span className="eyebrow">{passage.category}</span><span className="status available">{passage.estimatedDifficulty}</span></div>
      <h2>{passage.title}</h2>
      <p className="typing-context">{passage.context} · {passage.level}</p>
      <div className="typing-copy-text" aria-label="Texto objetivo">
        {characterStates.map((item, index) => (
          <span key={`${item.character}-${index}`} className={item.state}>{item.character}</span>
        ))}
      </div>
    </section>
  )
}

function TypingLiveStats({ metrics, remainingSeconds }) {
  return (
    <section className="typing-live-stats">
      <div><span>Tiempo restante</span><strong>{formatTypingTime(remainingSeconds)}</strong></div>
      <div><span>Palabras</span><strong>{metrics.typedWords}</strong></div>
      <div><span>Caracteres</span><strong>{metrics.typedCharacters}</strong></div>
      <div><span>Errores</span><strong>{metrics.errors}</strong></div>
      <div><span>Precisión</span><strong>{metrics.accuracy}%</strong></div>
      <div><span>WPM</span><strong>{metrics.netWpm}</strong></div>
      <div className="typing-progress"><span>Progreso</span><strong>{metrics.progress}%</strong><div className="progress-track"><span style={{ width: `${metrics.progress}%` }} /></div></div>
    </section>
  )
}

function TypingResults({ result, onRepeat, onNewText }) {
  return (
    <section className="typing-results">
      <span className="eyebrow">Resultado final</span>
      <h2>{result.rating}</h2>
      <p>Este resultado mide velocidad y precisión de escritura. No mide por sí solo tu nivel de inglés.</p>
      <div className="typing-result-grid">
        <div><span>WPM</span><strong>{result.netWpm}</strong></div>
        <div><span>Precisión</span><strong>{result.accuracy}%</strong><small>{result.accuracyRating}</small></div>
        <div><span>Caracteres correctos</span><strong>{result.correctCharacters}</strong></div>
        <div><span>Caracteres incorrectos</span><strong>{result.incorrectCharacters}</strong></div>
        <div><span>Errores</span><strong>{result.errors}</strong></div>
        <div><span>Palabras incorrectas</span><strong>{result.incorrectWords}</strong></div>
        <div><span>Tiempo usado</span><strong>{result.formattedTimeUsed}</strong></div>
        <div><span>Texto</span><strong>{result.passage.title}</strong></div>
        <div><span>Dificultad</span><strong>{result.passage.estimatedDifficulty}</strong></div>
      </div>
      <aside className="work-recommendation">
        <strong>{result.passage.category}</strong>
        <p>{result.recommendation}</p>
        <p>30 WPM o más es una meta práctica para este ejercicio, pero cada empresa puede tener requisitos diferentes.</p>
      </aside>
      <div className="vocab-actions"><button className="button" type="button" onClick={onRepeat}>Repetir</button><button className="button ghost dark-ghost" type="button" onClick={onNewText}>Elegir otro texto</button></div>
    </section>
  )
}

export default function TypingTest() {
  const [selectedDuration, setSelectedDuration] = useState(60)
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [currentPassage, setCurrentPassage] = useState(null)
  const [typedText, setTypedText] = useState('')
  const [status, setStatus] = useState('idle')
  const [startedAt, setStartedAt] = useState(null)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [result, setResult] = useState(null)

  useEffect(() => {
    if (import.meta.env.DEV) {
      const validation = validateTypingTestPassages(typingTestPassages)
      if (!validation.valid) console.warn('Typing Test validation warnings:', validation.errors)
    }
  }, [])

  useEffect(() => {
    if (status !== 'running' || !startedAt) return undefined
    const interval = window.setInterval(() => {
      const nextElapsed = (Date.now() - startedAt) / 1000
      setElapsedSeconds(nextElapsed)
      if (nextElapsed >= selectedDuration) {
        window.clearInterval(interval)
        finishTest(selectedDuration)
      }
    }, 250)
    return () => window.clearInterval(interval)
  }, [status, startedAt, selectedDuration, typedText])

  const metrics = useMemo(() => calculateTypingMetrics(currentPassage?.text || '', typedText, Math.max(elapsedSeconds, 0.1)), [currentPassage, typedText, elapsedSeconds])
  const remainingSeconds = Math.max(0, selectedDuration - elapsedSeconds)
  const canConfigure = status === 'idle' || status === 'finished'

  const startTest = () => {
    const nextPassage = pickTypingPassage(typingTestPassages, selectedCategory)
    setCurrentPassage(nextPassage)
    setTypedText('')
    setResult(null)
    setElapsedSeconds(0)
    setStartedAt(Date.now())
    setStatus('running')
  }

  const finishTest = (forcedSeconds, typedOverride = typedText) => {
    if (!currentPassage) return
    const secondsUsed = forcedSeconds ?? (startedAt ? (Date.now() - startedAt) / 1000 : elapsedSeconds)
    setElapsedSeconds(secondsUsed)
    setResult(calculateTypingResult(currentPassage, typedOverride, secondsUsed, selectedDuration))
    setStatus('finished')
  }

  const repeatTest = () => {
    if (!currentPassage) return startTest()
    setTypedText('')
    setResult(null)
    setElapsedSeconds(0)
    setStartedAt(Date.now())
    setStatus('running')
  }

  const chooseAnotherText = () => {
    setCurrentPassage(null)
    setTypedText('')
    setResult(null)
    setElapsedSeconds(0)
    setStartedAt(null)
    setStatus('idle')
  }

  const handleTyping = (value) => {
    if (status !== 'running') return
    setTypedText(value)
    if (currentPassage && value.length >= currentPassage.text.length) finishTest(undefined, value)
  }

  return (
    <div className="typing-test-page">
      <section className="section-general-test">
        <div className="general-test-intro">
          <span className="eyebrow">Typing Speed Check</span>
          <h2>Typing test laboral</h2>
          <p>Poné a prueba tu velocidad escribiendo en inglés con textos laborales. Este resultado es orientativo y te ayuda a practicar para trabajos donde se usa chat, email, notas de caso, soporte o documentación.</p>
          <section className="typing-wpm-explainer">
            <h3>¿Qué significa WPM?</h3>
            <p>WPM significa Words Per Minute, es decir, palabras por minuto. Sirve para medir qué tan rápido escribís. Es una métrica útil en trabajos donde se usa chat, email, notas de caso, soporte técnico o documentación. Como meta práctica inicial, 30 WPM o más puede considerarse aceptable para practicar, aunque cada empresa puede pedir requisitos diferentes.</p>
          </section>
          <p className="general-test-helper">No guarda progreso, no usa IA y no funciona como certificación oficial.</p>
          <button className="button" type="button" onClick={startTest} disabled={status === 'running'}>{status === 'running' ? 'Test en curso' : 'Iniciar test'}</button>
        </div>
      </section>
      <section className="typing-setup">
        <label>Duración<select value={selectedDuration} disabled={!canConfigure} onChange={(event) => setSelectedDuration(Number(event.target.value))}>{durations.map((duration) => <option key={duration.value} value={duration.value}>{duration.label}</option>)}</select></label>
        <label>Categoría<select value={selectedCategory} disabled={!canConfigure} onChange={(event) => setSelectedCategory(event.target.value)}>{typingTestCategories.map((category) => <option key={category}>{category}</option>)}</select></label>
        <button className="button" type="button" onClick={startTest} disabled={status === 'running'}>{status === 'running' ? 'Test en curso' : 'Elegir texto e iniciar'}</button>
      </section>
      {currentPassage && (
        <>
          <TypingTextDisplay passage={currentPassage} typedText={typedText} />
          <section className="typing-input-area">
            <span className="eyebrow">Escribí el texto aquí</span>
            <textarea value={typedText} disabled={status !== 'running'} onChange={(event) => handleTyping(event.target.value)} placeholder="El test empieza al presionar Iniciar. Copiá el texto objetivo con la mayor precisión posible." />
            <div className="vocab-actions"><button className="button ghost dark-ghost" type="button" disabled={status !== 'running'} onClick={() => finishTest()}>Terminar test</button><button className="button ghost dark-ghost" type="button" onClick={chooseAnotherText}>Elegir otro texto</button></div>
          </section>
          <TypingLiveStats metrics={metrics} remainingSeconds={remainingSeconds} />
        </>
      )}
      {result && <TypingResults result={result} onRepeat={repeatTest} onNewText={chooseAnotherText} />}
      <section className="typing-tips">
        <span className="eyebrow">Consejos para mejorar</span>
        <ul>
          <li>Practicá primero con textos cortos y mantené un ritmo constante.</li>
          <li>Si tu precisión baja, reducí un poco la velocidad antes de intentar subir WPM.</li>
          <li>Usá textos de chat, email y notas de caso para acostumbrarte a vocabulario laboral real.</li>
        </ul>
      </section>
    </div>
  )
}
