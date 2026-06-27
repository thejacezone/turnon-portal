import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import GrammarPracticeCard from '../components/GrammarPracticeCard.jsx'
import PageHeader from '../components/PageHeader.jsx'
import PracticeFilters from '../components/PracticeFilters.jsx'
import PracticeResults from '../components/PracticeResults.jsx'
import { grammarPracticeQuestions, grammarPracticeTopics } from '../data/grammarPracticeQuestions.js'

const initialFilters = { level: 'Todos', topic: 'Todos', context: 'Todos' }

function unique(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b))
}

function buildResult(questions, answers, filters) {
  const answered = questions.map((question) => ({ ...question, selectedAnswer: answers[question.id] })).filter((question) => question.selectedAnswer)
  const correct = answered.filter((question) => question.selectedAnswer === question.correctAnswer).length
  const missedTopics = answered.reduce((topics, question) => {
    if (question.selectedAnswer !== question.correctAnswer) topics[question.topic] = (topics[question.topic] || 0) + 1
    return topics
  }, {})

  return {
    correct,
    total: answered.length,
    percentage: answered.length ? Math.round((correct / answered.length) * 100) : 0,
    level: filters.level === 'Todos' ? 'Todos los niveles filtrados' : filters.level,
    topics: unique(answered.map((question) => question.topic)),
    reinforcementTopics: Object.entries(missedTopics).sort((a, b) => b[1] - a[1]).map(([topic]) => topic).slice(0, 4),
  }
}

export default function GrammarPractice() {
  const [filters, setFilters] = useState(initialFilters)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [checked, setChecked] = useState(false)
  const [answers, setAnswers] = useState({})
  const [finished, setFinished] = useState(false)

  const topicsForFilter = useMemo(() => {
    const matchingQuestions = grammarPracticeQuestions.filter((question) => filters.level === 'Todos' || question.level === filters.level)
    return unique(matchingQuestions.map((question) => question.topic))
  }, [filters.level])

  const filteredQuestions = useMemo(() => grammarPracticeQuestions.filter((question) => {
    const matchesLevel = filters.level === 'Todos' || question.level === filters.level
    const matchesTopic = filters.topic === 'Todos' || question.topic === filters.topic
    const matchesContext = filters.context === 'Todos' || question.workContext === filters.context
    return matchesLevel && matchesTopic && matchesContext
  }), [filters])

  const availableTopicGroups = useMemo(() => grammarPracticeTopics.reduce((groups, item) => {
    groups[item.levelRange] ||= []
    groups[item.levelRange].push(item.topic)
    return groups
  }, {}), [])

  const result = useMemo(() => buildResult(filteredQuestions, answers, filters), [answers, filteredQuestions, filters])
  const question = filteredQuestions[currentIndex]

  useEffect(() => {
    setCurrentIndex(0)
    setSelectedAnswer('')
    setChecked(false)
    setAnswers({})
    setFinished(false)
  }, [filters])

  const updateFilter = (name, value) => {
    setFilters((current) => {
      const next = { ...current, [name]: value }
      if (name === 'level' && value !== 'Todos') {
        const levelTopics = unique(grammarPracticeQuestions.filter((question) => question.level === value).map((question) => question.topic))
        if (!levelTopics.includes(next.topic)) next.topic = 'Todos'
      }
      return next
    })
  }

  const checkAnswer = () => {
    if (!selectedAnswer || !question) return
    setAnswers((current) => ({ ...current, [question.id]: selectedAnswer }))
    setChecked(true)
  }

  const nextQuestion = () => {
    if (currentIndex === filteredQuestions.length - 1) {
      setFinished(true)
      return
    }
    setCurrentIndex((index) => index + 1)
    setSelectedAnswer('')
    setChecked(false)
  }

  const restart = () => {
    setCurrentIndex(0)
    setSelectedAnswer('')
    setChecked(false)
    setAnswers({})
    setFinished(false)
  }

  return (
    <div className="grammar-practice-page">
      <Link className="back-link" to="/work-english-test">← Volver a Work English Test</Link>
      <PageHeader eyebrow="Work English Test" title="Grammar Practice" description="Practicá estructuras gramaticales útiles para entrevistas, training, customer service y ambientes de trabajo bilingües." />
      <PracticeFilters filters={filters} topics={topicsForFilter} onChange={updateFilter} />
      <section className="topic-list section-block">
        <span className="eyebrow">Temas disponibles</span>
        <div className="topic-pills">
          {Object.entries(availableTopicGroups).map(([level, topics]) => <div key={level}><strong>{level}</strong>{topics.map((topic) => <span key={topic}>{topic}</span>)}</div>)}
        </div>
      </section>
      {!filteredQuestions.length && <section className="test-runner"><h2>No hay preguntas para esos filtros.</h2><p>Probá con otro nivel, tema o contexto.</p></section>}
      {filteredQuestions.length > 0 && !finished && question && (
        <section className="practice-runner">
          <div className="test-progress"><div><strong>Pregunta {currentIndex + 1} de {filteredQuestions.length}</strong><span>{Math.round(((currentIndex + 1) / filteredQuestions.length) * 100)}%</span></div><div className="progress-track"><span style={{ width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%` }} /></div></div>
          <GrammarPracticeCard question={question} selectedAnswer={selectedAnswer} checked={checked} onSelect={setSelectedAnswer} onCheck={checkAnswer} />
          <div className="test-navigation"><button className="button ghost dark-ghost" type="button" disabled={currentIndex === 0} onClick={() => { setCurrentIndex((index) => index - 1); setSelectedAnswer(answers[filteredQuestions[currentIndex - 1]?.id] || ''); setChecked(Boolean(answers[filteredQuestions[currentIndex - 1]?.id])) }}>Anterior</button><button className="button" type="button" disabled={!checked} onClick={nextQuestion}>{currentIndex === filteredQuestions.length - 1 ? 'Ver resultado' : 'Siguiente'}</button></div>
        </section>
      )}
      {finished && <PracticeResults result={result} onRestart={restart} />}
    </div>
  )
}
