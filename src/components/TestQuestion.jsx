function getReadingContent(question) {
  if (question.skill?.toLowerCase() !== 'reading') return null

  const parts = question.question
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean)

  if (question.passage) {
    return {
      title: question.passageTitle || parts[0] || 'Reading passage',
      passage: question.passage,
      prompt: parts.at(-1) || question.question,
    }
  }

  if (parts.length < 3) return null

  return {
    title: parts[0],
    passage: parts.slice(1, -1).join('\n\n'),
    prompt: parts.at(-1),
  }
}

export default function TestQuestion({ question, selectedAnswer, onSelect }) {
  const tags = [question.skill, question.level, question.workContext].filter(Boolean)
  const readingContent = getReadingContent(question)

  const options = (
    <div className="answer-options">
      {question.options.map((option, index) => {
        const letter = String.fromCharCode(65 + index)
        return (
          <button
            key={option}
            type="button"
            aria-label={`Opción ${letter}: ${option}`}
            aria-pressed={selectedAnswer === option}
            className={selectedAnswer === option ? 'selected' : ''}
            onClick={() => onSelect(option)}
          >
            <span className="option-letter">{letter}</span>
            <span>{option}</span>
          </button>
        )
      })}
    </div>
  )

  const questionContent = (
    <div className="test-question-content">
      <h2 id={`question-${question.id}`}>{readingContent?.prompt || question.question}</h2>
      {tags.length > 0 && <div className="question-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
      {options}
    </div>
  )

  return (
    <section className={`test-question ${readingContent ? 'test-question--reading' : ''}`} aria-labelledby={`question-${question.id}`}>
      {readingContent ? (
        <div className="reading-question-layout">
          <article className="test-reading-passage" aria-label={readingContent.title}>
            <span className="eyebrow">Reading passage</span>
            <h3>{readingContent.title}</h3>
            <p>{readingContent.passage}</p>
          </article>
          {questionContent}
        </div>
      ) : questionContent}
    </section>
  )
}
