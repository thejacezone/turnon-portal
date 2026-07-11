import { useEffect, useMemo, useState } from 'react'
import AnswerReview from '../components/AnswerReview.jsx'
import TestIntro from '../components/TestIntro.jsx'
import TestProgress from '../components/TestProgress.jsx'
import TestQuestion from '../components/TestQuestion.jsx'
import TestResults from '../components/TestResults.jsx'
import { scoreEnglishTest } from '../utils/englishScoring.js'
import { validateQuestionBank } from '../utils/questionValidation.js'

export default function EnglishTest({ questions, intro }) {
  const [phase, setPhase] = useState('intro')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const result = useMemo(() => phase === 'results' ? scoreEnglishTest(questions, answers) : null, [phase, answers, questions])
  const question = questions[currentIndex]
  useEffect(() => {
    if (!import.meta.env.DEV) return
    const validation = validateQuestionBank(questions)
    if (!validation.valid) console.warn(`${intro.title} validation warnings:`, validation.errors)
  }, [intro.title, questions])
  const start = () => { setAnswers({}); setCurrentIndex(0); setPhase('questions') }
  const selectAnswer = (answer) => setAnswers((current) => ({ ...current, [question.id]: answer }))
  const next = () => { if (currentIndex === questions.length - 1) setPhase('results'); else setCurrentIndex((index) => index + 1) }

  return (
    <div className="test-page">
      {phase === 'intro' && <TestIntro {...intro} onStart={start} />}
      {phase === 'questions' && <section className="test-runner"><TestProgress current={currentIndex + 1} total={questions.length} /><TestQuestion question={question} selectedAnswer={answers[question.id]} onSelect={selectAnswer} /><div className="test-navigation"><button className="button ghost dark-ghost" type="button" disabled={currentIndex === 0} onClick={() => setCurrentIndex((index) => index - 1)}>Anterior</button><button className="button" type="button" disabled={!answers[question.id]} onClick={next}>{currentIndex === questions.length - 1 ? 'Ver resultado' : 'Siguiente'}</button></div></section>}
      {phase === 'results' && <><TestResults result={result} onRestart={start} /><AnswerReview questions={questions} answers={answers} /></>}
    </div>
  )
}
