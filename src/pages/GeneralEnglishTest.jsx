import { useEffect, useMemo, useState } from 'react'
import AnswerReview from '../components/AnswerReview.jsx'
import TestIntro from '../components/TestIntro.jsx'
import TestProgress from '../components/TestProgress.jsx'
import TestQuestion from '../components/TestQuestion.jsx'
import TestResults from '../components/TestResults.jsx'
import { generalEnglishTestQuestions } from '../data/generalEnglishTestQuestions.js'
import { scoreEnglishTest } from '../utils/englishScoring.js'
import { createGeneralEnglishTestAttempt, getGeneralEnglishTestSection } from '../utils/generalEnglishTestRandomizer.js'
import { validateQuestionBank } from '../utils/questionValidation.js'

export default function GeneralEnglishTest({ intro }) {
  const [phase, setPhase] = useState('intro')
  const [attemptQuestions, setAttemptQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [attemptError, setAttemptError] = useState('')
  const result = useMemo(
    () => phase === 'results' ? scoreEnglishTest(attemptQuestions, answers) : null,
    [phase, answers, attemptQuestions],
  )
  const question = attemptQuestions[currentIndex]
  const currentSection = getGeneralEnglishTestSection(currentIndex)

  useEffect(() => {
    if (!import.meta.env.DEV) return
    const validation = validateQuestionBank(generalEnglishTestQuestions)
    if (!validation.valid) console.warn(`${intro.title} validation warnings:`, validation.errors)
  }, [intro.title])

  const start = () => {
    try {
      const nextAttempt = createGeneralEnglishTestAttempt(generalEnglishTestQuestions, attemptQuestions)
      setAttemptQuestions(nextAttempt)
      setAnswers({})
      setCurrentIndex(0)
      setAttemptError('')
      setPhase('questions')
    } catch (error) {
      if (import.meta.env.DEV) console.error('General English Level Test attempt validation failed:', error.validationErrors ?? error)
      setAttemptError('No pudimos preparar el test. Revisá el banco de preguntas antes de intentar nuevamente.')
      setPhase('intro')
    }
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
      {phase === 'intro' && <><TestIntro {...intro} onStart={start} />{attemptError && <p className="field-error" role="alert">{attemptError}</p>}</>}
      {phase === 'questions' && question && (
        <section className="test-runner">
          <div className="question-tags" aria-label={`Sección ${currentSection.number} de 3: ${currentSection.label}, ${currentSection.range}`}>
            <span>Sección {currentSection.number} de 3</span>
            <span>{currentSection.label}</span>
            <span>{currentSection.range}</span>
          </div>
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
