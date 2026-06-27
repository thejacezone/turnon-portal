function recommendation(percentage) {
  if (percentage >= 85) return 'Muy buen control. Repetí con otro nivel o mezclá más temas para mantener precisión.'
  if (percentage >= 70) return 'Buen avance. Revisá los temas fallados y repetí una ronda corta antes de subir dificultad.'
  if (percentage >= 50) return 'Vas en camino. Reforzá los temas marcados y practicá con ejemplos de trabajo.'
  return 'Conviene volver a las bases del nivel elegido antes de mezclar demasiados temas.'
}

export default function PracticeResults({ result, onRestart }) {
  return (
    <section className="practice-results">
      <span className="eyebrow">Resultado de práctica</span>
      <h2>Resultado: {result.correct}/{result.total} correctas</h2>
      <p>{result.percentage}% de respuestas correctas.</p>
      <div className="practice-result-grid">
        <div><span>Nivel practicado</span><strong>{result.level}</strong></div>
        <div><span>Temas practicados</span><strong>{result.topics.join(', ')}</strong></div>
      </div>
      <section className="work-recommendation">
        <span className="eyebrow">Temas a reforzar</span>
        {result.reinforcementTopics.length ? <p>Reforzá {result.reinforcementTopics.join(', ')} antes de repetir la práctica.</p> : <p>No hubo temas críticos en esta ronda. Podés probar con más preguntas o subir de nivel.</p>}
        <p>{recommendation(result.percentage)}</p>
      </section>
      <button className="button ghost dark-ghost" type="button" onClick={onRestart}>Practicar de nuevo</button>
    </section>
  )
}
