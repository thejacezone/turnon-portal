import { useEffect, useMemo, useState } from 'react'
import AnswerReview from '../components/AnswerReview.jsx'
import TestIntro from '../components/TestIntro.jsx'
import TestProgress from '../components/TestProgress.jsx'
import TestQuestion from '../components/TestQuestion.jsx'
import TestResults from '../components/TestResults.jsx'
import { generalEnglishTestQuestions } from '../data/generalEnglishTestQuestions.js'
import { scoreEnglishTest } from '../utils/englishScoring.js'
import { validateQuestionBank } from '../utils/questionValidation.js'

function shuffleQuestions(questions, previousQuestions = []) {
  const shuffled = [...questions]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]]
  }

  const repeatsPreviousOrder = shuffled.length === previousQuestions.length
    && shuffled.every((question, index) => question.id === previousQuestions[index].id)

  if (repeatsPreviousOrder && shuffled.length > 1) {
    ;[shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]]
  }

  return shuffled
}

export default function GeneralEnglishTest({ intro }) {
  const [phase, setPhase] = useState('intro')
  const [attemptQuestions, setAttemptQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const result = useMemo(
    () => phase === 'results' ? scoreEnglishTest(attemptQuestions, answers) : null,
    [phase, answers, attemptQuestions],
  )
  const question = attemptQuestions[currentIndex]

  useEffect(() => {
    if (!import.meta.env.DEV) return
    const validation = validateQuestionBank(generalEnglishTestQuestions)
    if (!validation.valid) console.warn(`${intro.title} validation warnings:`, validation.errors)
  }, [intro.title])

  const start = () => {
    setAttemptQuestions(shuffleQuestions(generalEnglishTestQuestions, attemptQuestions))
    setAnswers({})
    setCurrentIndex(0)
    setPhase('questions')
  }

  const selectAnswer = (answer) => {
    setAnswers((current) => ({ ...current, [question.id]: answer }))
  }

  const next = () => {
    if (currentIndex === attemptQuestions.length - 1) setPhase('results')
    else setCurrentIndex((index) => index + 1)
  }

  return (
    <div className="test-page">
      {phase === 'intro' && <TestIntro {...intro} onStart={start} />}
      {phase === 'questions' && question && (
        <section className="test-runner">
          <TestProgress current={currentIndex + 1} total={attemptQuestions.length} />
          <TestQuestion question={question} selectedAnswer={answers[question.id]} onSelect={selectAnswer} />
          <div className="test-navigation">
            <button className="button ghost dark-ghost" type="button" disabled={currentIndex === 0} onClick={() => setCurrentIndex((index) => index - 1)}>Anterior</button>
            <button className="button" type="button" disabled={!answers[question.id]} onClick={next}>{currentIndex === attemptQuestions.length - 1 ? 'Ver resultado' : 'Siguiente'}</button>
          </div>
        </section>
      )}
      {phase === 'results' && (
        <>
          <TestResults result={result} onRestart={start} />
          <AnswerReview questions={attemptQuestions} answers={answers} />
        </>
      )}
    </div>
  )
}
