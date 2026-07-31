function LessonTable({ block, label }) {
  return (
    <div className="lesson-table-wrap">
      <table className="lesson-table">
        <caption className="sr-only">{label}</caption>
        {block.headers.length > 0 && (
          <thead>
            <tr>{block.headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr>
          </thead>
        )}
        <tbody>
          {block.rows.map((row, rowIndex) => (
            <tr key={`${row.join('-')}-${rowIndex}`}>
              {row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function LessonExampleList({ rows }) {
  return (
    <div className="lesson-example-list">
      {rows.map(([example, explanation], index) => (
        <article className="lesson-example-card" key={`${example}-${index}`}>
          <span className="lesson-block-label">Example</span>
          <p className="lesson-example-sentence">{example}</p>
          {explanation && <p><strong>Why it works:</strong> {explanation}</p>}
        </article>
      ))}
    </div>
  )
}

function LessonMistakeList({ rows }) {
  return (
    <div className="lesson-mistake-list">
      {rows.map(([incorrect, correct], index) => (
        <article className="lesson-mistake-card" key={`${incorrect}-${index}`}>
          <div>
            <span className="lesson-block-label lesson-block-label--incorrect">Incorrect</span>
            <p>{incorrect}</p>
          </div>
          <div>
            <span className="lesson-block-label lesson-block-label--correct">Correct</span>
            <p>{correct}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

function LessonContentBlock({ block, sectionTitle }) {
  if (block.type === 'paragraph') return <p>{block.text}</p>
  if (block.type === 'list') return <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>
  if (block.type === 'callout') {
    return (
      <aside className="lesson-callout">
        <strong>{block.label}</strong>
        {block.lines.map((line) => <p key={line}>{line}</p>)}
      </aside>
    )
  }
  if (block.type === 'table' && sectionTitle === 'Examples') return <LessonExampleList rows={block.rows} />
  if (block.type === 'table' && sectionTitle === 'Common mistakes') return <LessonMistakeList rows={block.rows} />
  if (block.type === 'table') return <LessonTable block={block} label={sectionTitle} />
  return null
}

export default function LessonContent({ lesson }) {
  return (
    <div className="lesson-detail-copy">
      <section className="lesson-copy-section" id="introduction">
        <span className="lessons-eyebrow">LESSON OVERVIEW</span>
        <h2>Introduction</h2>
        {lesson.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>

      {lesson.sections.map((section) => (
        <section className="lesson-copy-section" id={section.id} key={section.id}>
          <h2>{section.title}</h2>
          {section.blocks.map((block, index) => (
            <LessonContentBlock
              block={block}
              key={`${section.id}-${block.type}-${index}`}
              sectionTitle={section.title}
            />
          ))}
        </section>
      ))}

      <section className="lesson-copy-section lesson-quick-recap" id="quick-recap">
        <span className="lessons-eyebrow">QUICK RECAP</span>
        <h2>Quick recap</h2>
        <ul>{lesson.quickRecap.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
    </div>
  )
}
