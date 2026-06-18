export default function TestQuestion({ question, selectedAnswer, onSelect }) {
  return (
    <section className="test-question" aria-labelledby={`question-${question.id}`}>
      <h2 id={`question-${question.id}`}>{question.question}</h2>
      <div className="question-tags"><span>{question.skill}</span><span>{question.level}</span><span>{question.workContext}</span></div>
      <div className="answer-options">{question.options.map((option, index) => { const letter = String.fromCharCode(65 + index); return <button key={option} type="button" aria-label={`Opción ${letter}: ${option}`} aria-pressed={selectedAnswer === option} className={selectedAnswer === option ? 'selected' : ''} onClick={() => onSelect(option)}><span className="option-letter">{letter}</span><span>{option}</span></button> })}</div>
    </section>
  )
}
