export default function AnswerReview({ questions, answers }) {
  return (
    <details className="answer-review">
      <summary>Revisar respuestas</summary>
      <div className="review-list">{questions.map((question, index) => { const correct = answers[question.id] === question.correctAnswer; return <article key={question.id} className={correct ? 'correct' : 'incorrect'}><div className="review-heading"><strong>{index + 1}. {question.question}</strong><span>{correct ? 'Correcta' : 'Incorrecta'}</span></div><p>Tu respuesta: <b>{answers[question.id]}</b></p><p>Respuesta correcta: <b>{question.correctAnswer}</b></p><small>{question.explanation}</small></article> })}</div>
    </details>
  )
}
