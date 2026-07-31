function GrammarTheoryTable({ block }) {
  return (
    <div className="grammar-theory-table-wrap">
      <table className="grammar-theory-table">
        {block.headers.length > 0 && (
          <thead>
            <tr>{block.headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr>
          </thead>
        )}
        <tbody>
          {block.rows.map((row, rowIndex) => (
            <tr key={`${row.join('-')}-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`${cell}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function GrammarExampleList({ rows }) {
  return (
    <div className="grammar-example-list">
      {rows.map(([example, explanation], index) => (
        <article className="grammar-example" key={`${example}-${index}`}>
          <span className="grammar-block-label">Example</span>
          <p className="grammar-example-sentence">{example}</p>
          {explanation && <p><strong>Why it works:</strong> {explanation}</p>}
        </article>
      ))}
    </div>
  )
}

function GrammarMistakeList({ rows }) {
  return (
    <div className="grammar-mistake-list">
      {rows.map(([incorrect, correct], index) => (
        <article className="grammar-mistake" key={`${incorrect}-${index}`}>
          <div>
            <span className="grammar-block-label grammar-block-label--incorrect">Incorrect</span>
            <p>{incorrect}</p>
          </div>
          <div>
            <span className="grammar-block-label grammar-block-label--correct">Correct</span>
            <p>{correct}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

function GrammarContentBlock({ block, sectionTitle }) {
  if (block.type === 'paragraph') return <p>{block.text}</p>
  if (block.type === 'list') return <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>
  if (block.type === 'callout') {
    return (
      <aside className="grammar-theory-callout">
        <strong>{block.label}</strong>
        {block.lines.map((line) => <p key={line}>{line}</p>)}
      </aside>
    )
  }
  if (block.type === 'table' && sectionTitle === 'Examples') return <GrammarExampleList rows={block.rows} />
  if (block.type === 'table' && sectionTitle === 'Common mistakes') return <GrammarMistakeList rows={block.rows} />
  if (block.type === 'table') return <GrammarTheoryTable block={block} />
  return null
}

function LessonIndex({ lesson, mobile = false }) {
  const links = (
    <ul>
      <li><a href={`#${lesson.slug}-introduction`}>Introduction</a></li>
      {lesson.sections.map((section) => (
        <li key={section.id}><a href={`#${lesson.slug}-${section.id}`}>{section.title}</a></li>
      ))}
      <li><a href={`#${lesson.slug}-recap`}>Quick recap</a></li>
    </ul>
  )

  if (mobile) {
    return (
      <details className="grammar-lesson-index grammar-lesson-index--mobile">
        <summary>Lesson index</summary>
        {links}
      </details>
    )
  }

  return (
    <nav className="grammar-lesson-index grammar-lesson-index--desktop" aria-label={`${lesson.title} lesson index`}>
      <strong>Lesson index</strong>
      {links}
    </nav>
  )
}

export default function GrammarLessonContent({ lesson, canPractice, onPractice }) {
  return (
    <article className="grammar-lesson-article" id="grammar-lesson-content">
      <header className="grammar-lesson-header">
        <div className="grammar-lesson-meta">
          <span>{lesson.category}</span>
          <span>{lesson.level}</span>
          <span>Lesson {String(lesson.number).padStart(2, '0')}</span>
        </div>
        <h2>{lesson.title}</h2>
        <p>{lesson.shortDescription}</p>
        <div className="grammar-related-topics" aria-label="Related practice topics">
          {lesson.relatedTopics.map((topic) => <span key={topic.id}>{topic.label}</span>)}
        </div>
      </header>

      <LessonIndex lesson={lesson} mobile />

      <div className="grammar-lesson-reading-layout">
        <LessonIndex lesson={lesson} />
        <div className="grammar-lesson-copy">
          <section id={`${lesson.slug}-introduction`}>
            <span className="eyebrow">Introduction</span>
            {lesson.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>

          {lesson.sections.map((section) => (
            <section id={`${lesson.slug}-${section.id}`} key={section.id}>
              <h3>{section.title}</h3>
              {section.blocks.map((block, index) => (
                <GrammarContentBlock block={block} key={`${section.id}-${block.type}-${index}`} sectionTitle={section.title} />
              ))}
            </section>
          ))}

          <section className="grammar-quick-recap" id={`${lesson.slug}-recap`}>
            <span className="eyebrow">Quick recap</span>
            <ul>{lesson.quickRecap.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <footer className="grammar-lesson-action">
            <div>
              <span className="eyebrow">Next step</span>
              <h3>Ready to practice?</h3>
              {canPractice
                ? <p>Continue with {lesson.relatedTopics[0]?.label} and reinforce what you just studied.</p>
                : <p>Esta lección todavía no tiene una práctica vinculada.</p>}
            </div>
            <button className="button" disabled={!canPractice} onClick={() => onPractice(lesson)} type="button">
              Practicar este tema
            </button>
          </footer>
        </div>
      </div>
    </article>
  )
}
