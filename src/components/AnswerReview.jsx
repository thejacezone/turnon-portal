import { useState } from 'react'

export default function AnswerReview({ questions, answers, exposeExpandedState = false }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <details className="answer-review" onToggle={exposeExpandedState ? (event) => setIsOpen(event.currentTarget.open) : undefined}>
      <summary aria-expanded={exposeExpandedState ? isOpen : undefined}>Revisar respuestas</summary>
      <div className="review-list">{questions.map((question, index) => { const correct = answers[question.id] === question.correctAnswer; return <article key={question.id} className={correct ? 'correct' : 'incorrect'}><div className="review-heading"><strong>{index + 1}. {question.question}</strong><span>{correct ? 'Correcta' : 'Incorrecta'}</span></div><p>Tu respuesta: <b>{answers[question.id]}</b></p><p>Respuesta correcta: <b>{question.correctAnswer}</b></p><small>{question.explanation}</small></article> })}</div>
    </details>
  )
}
