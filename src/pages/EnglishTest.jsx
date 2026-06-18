import { useMemo, useState } from 'react'
import AnswerReview from '../components/AnswerReview.jsx'
import TestIntro from '../components/TestIntro.jsx'
import TestProgress from '../components/TestProgress.jsx'
import TestQuestion from '../components/TestQuestion.jsx'
import TestResults from '../components/TestResults.jsx'
import { englishQuestions } from '../data/englishQuestions.js'
import { scoreEnglishTest } from '../utils/englishScoring.js'

export default function EnglishTest() {
  const [phase, setPhase] = useState('intro')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const result = useMemo(() => phase === 'results' ? scoreEnglishTest(englishQuestions, answers) : null, [phase, answers])
  const question = englishQuestions[currentIndex]
  const start = () => { setAnswers({}); setCurrentIndex(0); setPhase('questions') }
  const selectAnswer = (answer) => setAnswers((current) => ({ ...current, [question.id]: answer }))
  const next = () => { if (currentIndex === englishQuestions.length - 1) setPhase('results'); else setCurrentIndex((index) => index + 1) }

  return (
    <div className="test-page">
      {phase === 'intro' && <TestIntro onStart={start} />}
      {phase === 'questions' && <section className="test-runner"><TestProgress current={currentIndex + 1} total={englishQuestions.length} /><TestQuestion question={question} selectedAnswer={answers[question.id]} onSelect={selectAnswer} /><div className="test-navigation"><button className="button ghost dark-ghost" type="button" disabled={currentIndex === 0} onClick={() => setCurrentIndex((index) => index - 1)}>Anterior</button><button className="button" type="button" disabled={!answers[question.id]} onClick={next}>{currentIndex === englishQuestions.length - 1 ? 'Ver resultado' : 'Siguiente'}</button></div></section>}
      {phase === 'results' && <><TestResults result={result} onRestart={start} /><AnswerReview questions={englishQuestions} answers={answers} /></>}
    </div>
  )
}
