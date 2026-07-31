import { useEffect, useMemo, useState } from 'react'
import AnswerReview from '../components/AnswerReview.jsx'
import GrammarPracticeCard from '../components/GrammarPracticeCard.jsx'
import SectionGeneralTest from '../components/SectionGeneralTest.jsx'
import { grammarPracticeQuestions } from '../data/grammarPracticeQuestions.js'
import { practicePageHeroes } from '../data/practicePageHeroes.js'
import { generateGrammarGeneralTest, scoreGrammarGeneralTest } from '../utils/sectionGeneralTests.js'
import { validateQuestionBank } from '../utils/questionValidation.js'

function normalizeTopic(value = '') {
  return value.trim().replace(/\s+/g, ' ').toLocaleLowerCase()
}

function shuffleQuestions(questions) {
  const shuffled = [...questions]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]]
  }

  return shuffled
}

function buildResult(questions, answers, topic) {
  const correct = questions.filter((question) => answers[question.id] === question.correctAnswer).length

  return {
    topic,
    correct,
    incorrect: questions.length - correct,
    total: questions.length,
    percentage: questions.length ? Math.round((correct / questions.length) * 100) : 0,
  }
}

export default function GrammarPractice() {
  const [selectedTopic, setSelectedTopic] = useState('')
  const [attemptQuestions, setAttemptQuestions] = useState([])
  const [practiceError, setPracticeError] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [checked, setChecked] = useState(false)
  const [answers, setAnswers] = useState({})
  const [finished, setFinished] = useState(false)

  const topics = useMemo(() => {
    const topicsByKey = new Map()
    grammarPracticeQuestions.forEach((question) => {
      const key = normalizeTopic(question.topic)
      if (key && !topicsByKey.has(key)) topicsByKey.set(key, question.topic.trim().replace(/\s+/g, ' '))
    })
    return [...topicsByKey].map(([value, label]) => ({ value, label }))
  }, [])

  const selectedTopicLabel = topics.find((topic) => topic.value === selectedTopic)?.label || ''
  const result = useMemo(() => buildResult(attemptQuestions, answers, selectedTopicLabel), [answers, attemptQuestions, selectedTopicLabel])
  const question = attemptQuestions[currentIndex]

  const resetAttemptState = () => {
    setCurrentIndex(0)
    setSelectedAnswer('')
    setChecked(false)
    setAnswers({})
    setFinished(false)
  }

  useEffect(() => {
    if (!import.meta.env.DEV) return
    const validation = validateQuestionBank(grammarPracticeQuestions)
    if (!validation.valid) console.warn('Grammar Practice validation warnings:', validation.errors)
  }, [])

  const prepareTopicAttempt = (topicKey) => {
    resetAttemptState()
    setPracticeError('')

    if (!topicKey) {
      setAttemptQuestions([])
      return
    }

    const topicQuestions = grammarPracticeQuestions.filter((question) => normalizeTopic(question.topic) === topicKey)
    if (!topicQuestions.length) {
      setAttemptQuestions([])
      setPracticeError('No hay preguntas disponibles para este tema.')
      return
    }

    const validation = validateQuestionBank(topicQuestions)
    if (!validation.valid) {
      setAttemptQuestions([])
      setPracticeError('No pudimos iniciar esta práctica porque sus preguntas necesitan revisión.')
      if (import.meta.env.DEV) console.warn(`Topic practice validation warnings for ${topicKey}:`, validation.errors)
      return
    }

    setAttemptQuestions(shuffleQuestions(topicQuestions))
  }

  const changeTopic = (topicKey) => {
    setSelectedTopic(topicKey)
    prepareTopicAttempt(topicKey)
  }

  const checkAnswer = () => {
    if (!selectedAnswer || !question) return
    setAnswers((current) => ({ ...current, [question.id]: selectedAnswer }))
    setChecked(true)
  }

  const nextQuestion = () => {
    if (currentIndex === attemptQuestions.length - 1) {
      setFinished(true)
      return
    }
    const nextIndex = currentIndex + 1
    const savedAnswer = answers[attemptQuestions[nextIndex]?.id] || ''
    setCurrentIndex(nextIndex)
    setSelectedAnswer(savedAnswer)
    setChecked(Boolean(savedAnswer))
  }

  const previousQuestion = () => {
    const previousIndex = Math.max(0, currentIndex - 1)
    const savedAnswer = answers[attemptQuestions[previousIndex]?.id] || ''
    setCurrentIndex(previousIndex)
    setSelectedAnswer(savedAnswer)
    setChecked(Boolean(savedAnswer))
  }

  const restart = () => {
    prepareTopicAttempt(selectedTopic)
  }

  const clearTopic = () => {
    setSelectedTopic('')
    prepareTopicAttempt('')
  }

  return (
    <div className="grammar-practice-page internal-test-page test-practice-page">
      <SectionGeneralTest hero={practicePageHeroes.grammar} title="Grammar Level Check" description="Poné a prueba tu gramática con preguntas aleatorias tomadas de los temas disponibles. El resultado es una estimación para ayudarte a saber qué estructuras dominás y cuáles necesitás reforzar." helperCopy="Primero podés hacer un test general para medir tu gramática. Después practicá por tema con filtros específicos." buttonText="Iniciar test de grammar" duration="20 preguntas · 8 min aprox." generateTest={() => generateGrammarGeneralTest(grammarPracticeQuestions)} scoreTest={scoreGrammarGeneralTest} />
      <section className="practice-section-heading">
        <span className="eyebrow">Práctica por tema</span>
        <h2>Prueba los temas</h2>
        <p>Elegí un tema y completá una práctica enfocada únicamente en ese contenido.</p>
      </section>
      <section className="practice-filters topic-only-filter" aria-label="Elegir tema de práctica">
        <label>
          Tema
          <select value={selectedTopic} onChange={(event) => changeTopic(event.target.value)}>
            <option value="">Seleccioná un tema</option>
            {topics.map((topic) => <option key={topic.value} value={topic.value}>{topic.label}</option>)}
          </select>
        </label>
      </section>
      {!selectedTopic && !practiceError && <section className="empty-state topic-practice-empty"><h2>Elegí un tema para comenzar la práctica.</h2></section>}
      {practiceError && <section className="empty-state topic-practice-empty" role="alert"><h2>{practiceError}</h2></section>}
      {attemptQuestions.length > 0 && !finished && question && (
        <section className="practice-runner">
          <div className="topic-practice-summary"><span className="eyebrow">Tema seleccionado</span><h2>{selectedTopicLabel}</h2><p>{attemptQuestions.length} preguntas</p></div>
          <div className="test-progress"><div><strong>Pregunta {currentIndex + 1} de {attemptQuestions.length}</strong><span>{Math.round(((currentIndex + 1) / attemptQuestions.length) * 100)}%</span></div><div className="progress-track"><span style={{ width: `${((currentIndex + 1) / attemptQuestions.length) * 100}%` }} /></div></div>
          <GrammarPracticeCard question={question} selectedAnswer={selectedAnswer} checked={checked} onSelect={setSelectedAnswer} onCheck={checkAnswer} />
          <div className="test-navigation"><button className="button ghost dark-ghost" type="button" disabled={currentIndex === 0} onClick={previousQuestion}>Anterior</button><button className="button" type="button" disabled={!checked} onClick={nextQuestion}>{currentIndex === attemptQuestions.length - 1 ? 'Finalizar práctica' : 'Siguiente'}</button></div>
        </section>
      )}
      {finished && (
        <section className="practice-results">
          <span className="eyebrow">Resultado de práctica</span>
          <h2>{result.topic}</h2>
          <p>{result.percentage}% de respuestas correctas.</p>
          <div className="practice-result-grid topic-result-grid">
            <div><span>Correctas</span><strong>{result.correct}</strong></div>
            <div><span>Incorrectas</span><strong>{result.incorrect}</strong></div>
            <div><span>Total</span><strong>{result.total}</strong></div>
          </div>
          <p>Este resultado corresponde únicamente a la práctica del tema seleccionado.</p>
          <AnswerReview questions={attemptQuestions} answers={answers} />
          <div className="topic-practice-actions"><button className="button" type="button" onClick={restart}>Repetir tema</button><button className="button ghost dark-ghost" type="button" onClick={clearTopic}>Elegir otro tema</button></div>
        </section>
      )}
    </div>
  )
}
