const skillNames = { grammar: 'Grammar', vocabulary: 'Vocabulary', reading: 'Reading' }

export default function TestResults({ result, onRestart }) {
  return (
    <section className="test-results">
      <span className="eyebrow">Resultado orientativo</span>
      <div className="result-hero"><div><h1>{result.estimatedLabel}</h1><p>{result.description} {result.recommendation}</p></div><div className="score-ring"><strong>{result.percentage}%</strong><span>{result.correct}/{result.total}</span></div></div>
      <div className="score-sections">
        <section><h2>Puntaje por skill</h2>{Object.entries(result.bySkill).map(([skill, value]) => <div className="score-line" key={skill}><span>{skillNames[skill]}</span><strong>{value.correct}/{value.total}</strong></div>)}</section>
        <section><h2>Puntaje por nivel</h2>{Object.entries(result.byLevel).map(([level, value]) => <div className="score-line" key={level}><span>{level}</span><strong>{value.correct}/{value.total}</strong></div>)}</section>
      </div>
      <div className="topic-grid"><section><h2>Temas fuertes</h2>{result.strongTopics.length ? <ul>{result.strongTopics.map((item) => <li key={item.topic}>{item.topic}</li>)}</ul> : <p>Seguí practicando para consolidar tus primeras fortalezas.</p>}</section><section><h2>Temas a mejorar</h2>{result.improvementTopics.length ? <ul>{result.improvementTopics.map((item) => <li key={item.topic}>{item.topic}</li>)}</ul> : <p>Buen equilibrio general. Mantené la práctica constante.</p>}</section></div>
      <section className="work-recommendation"><span className="eyebrow">Recomendación</span><p>{result.recommendation}</p></section>
      <button className="button ghost dark-ghost" type="button" onClick={onRestart}>Realizar el test de nuevo</button>
    </section>
  )
}
