export default function TestQuestion({ question, selectedAnswer, onSelect }) {
  const tags = [question.skill, question.level, question.workContext].filter(Boolean)

  return (
    <section className="test-question" aria-labelledby={`question-${question.id}`}>
      <h2 id={`question-${question.id}`}>{question.question}</h2>
      {tags.length > 0 && <div className="question-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
      <div className="answer-options">{question.options.map((option, index) => { const letter = String.fromCharCode(65 + index); return <button key={option} type="button" aria-label={`Opción ${letter}: ${option}`} aria-pressed={selectedAnswer === option} className={selectedAnswer === option ? 'selected' : ''} onClick={() => onSelect(option)}><span className="option-letter">{letter}</span><span>{option}</span></button> })}</div>
    </section>
  )
}
