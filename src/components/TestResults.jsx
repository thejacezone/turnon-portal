import { Link } from 'react-router-dom'

const skillNames = { grammar: 'Grammar', vocabulary: 'Vocabulary', reading: 'Reading' }

const toneLabels = {
  low: 'Área a reforzar',
  intermediate: 'Progreso en desarrollo',
  high: 'Buen desempeño',
}

function getVisualTone(level) {
  if (/^(B2|C1)/.test(level)) return 'high'
  if (/^B1/.test(level)) return 'intermediate'
  return 'low'
}

function ResultStat({ label, value, tone }) {
  return (
    <div className={`result-stat result-stat--${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function ScoreBreakdown({ entries, labels = {}, title }) {
  return (
    <section className="result-breakdown-card">
      <h2>{title}</h2>
      <div className="result-breakdown-list">
        {Object.entries(entries).map(([key, value]) => {
          const percentage = value.total ? Math.round((value.correct / value.total) * 100) : 0
          return (
            <div className="result-breakdown-item" key={key}>
              <div className="score-line">
                <span>{labels[key] || key}</span>
                <span className="score-line-value">
                  <strong>{value.correct}/{value.total}</strong>
                  <small>{percentage}%</small>
                </span>
              </div>
              <div
                aria-label={`${labels[key] || key}: ${percentage}%`}
                aria-valuemax="100"
                aria-valuemin="0"
                aria-valuenow={percentage}
                className="result-score-track"
                role="progressbar"
              >
                <span style={{ width: `${percentage}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default function TestResults({
  result,
  onRestart,
  restartLabel = 'Repetir test',
  actions = [],
  variant = 'general',
}) {
  const incorrect = result.total - result.correct
  const visualTone = getVisualTone(result.estimatedLevel)
  const eyebrow = variant === 'work' ? 'RESULTADO DE INGLÉS PARA TRABAJO' : 'RESULTADO ORIENTATIVO'
  const disclaimer = variant === 'work'
    ? 'Este resultado es una estimación orientativa de tu inglés aplicado al trabajo. No funciona como certificación oficial.'
    : 'Este resultado es una estimación orientativa de tu desempeño en Grammar, Vocabulary y Reading. No funciona como certificación oficial.'

  return (
    <section className={`test-results test-results--${variant} test-results--tone-${visualTone}`}>
      <header className="test-result-summary">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{result.estimatedLabel}</h1>
        <p className="result-percentage-line">
          <strong>{result.percentage}%</strong>
          <span>de respuestas correctas.</span>
        </p>
        <span className="result-tone-label">{toneLabels[visualTone]}</span>
        <p className="result-description">{result.description}</p>
      </header>

      <section className="result-statistics" aria-label="Estadísticas principales del resultado">
        <ResultStat label="Correctas" tone="correct" value={result.correct} />
        <ResultStat label="Incorrectas" tone="incorrect" value={incorrect} />
        <ResultStat label="Total" tone="total" value={result.total} />
      </section>

      <div className="score-sections">
        <ScoreBreakdown entries={result.bySkill} labels={skillNames} title="Puntaje por skill" />
        <ScoreBreakdown entries={result.byLevel} title="Puntaje por nivel" />
      </div>

      <div className="topic-grid"><section><h2>Temas fuertes</h2>{result.strongTopics.length ? <ul>{result.strongTopics.map((item) => <li key={item.topic}>{item.topic}</li>)}</ul> : <p>Seguí practicando para consolidar tus primeras fortalezas.</p>}</section><section><h2>Temas a mejorar</h2>{result.improvementTopics.length ? <ul>{result.improvementTopics.map((item) => <li key={item.topic}>{item.topic}</li>)}</ul> : <p>Buen equilibrio general. Mantené la práctica constante.</p>}</section></div>

      <section className="work-recommendation"><span className="eyebrow">Recomendación</span><p>{result.recommendation}</p></section>
      <p className="test-result-disclaimer">{disclaimer}</p>

      <div className="test-result-actions">
        <button className="button" type="button" onClick={onRestart}>{restartLabel}</button>
        {actions.map((action) => (
          <Link className="button ghost dark-ghost" key={`${action.to}-${action.label}`} to={action.to}>
            {action.label}
          </Link>
        ))}
      </div>
    </section>
  )
}
