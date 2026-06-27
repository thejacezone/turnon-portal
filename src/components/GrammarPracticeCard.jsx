export default function GrammarPracticeCard({ question, selectedAnswer, checked, onSelect, onCheck }) {
  const isCorrect = checked && selectedAnswer === question.correctAnswer

  return (
    <article className="practice-card">
      <div className="question-tags"><span>{question.level}</span><span>{question.topic}</span><span>{question.workContext}</span></div>
      <h2>{question.question}</h2>
      <div className="answer-options">
        {question.options.map((option, index) => {
          const letter = String.fromCharCode(65 + index)
          const isSelected = selectedAnswer === option
          const shouldMarkCorrect = checked && option === question.correctAnswer
          const shouldMarkWrong = checked && isSelected && option !== question.correctAnswer
          const className = [isSelected ? 'selected' : '', shouldMarkCorrect ? 'correct' : '', shouldMarkWrong ? 'incorrect' : ''].filter(Boolean).join(' ')

          return (
            <button key={option} type="button" className={className} onClick={() => !checked && onSelect(option)} disabled={checked} aria-pressed={isSelected}>
              <span className="option-letter">{letter}</span>
              <span>{option}</span>
            </button>
          )
        })}
      </div>
      <div className="practice-feedback" aria-live="polite">
        {!checked && <button className="button" type="button" onClick={onCheck} disabled={!selectedAnswer}>Revisar respuesta</button>}
        {checked && (
          <div className={isCorrect ? 'feedback-correct' : 'feedback-incorrect'}>
            <strong>{isCorrect ? 'Correcta.' : `Incorrecta. Respuesta correcta: ${question.correctAnswer}.`}</strong>
            <p>{question.explanation}</p>
          </div>
        )}
      </div>
    </article>
  )
}
