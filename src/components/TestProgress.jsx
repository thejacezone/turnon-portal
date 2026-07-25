export default function TestProgress({ current, total }) {
  const percentage = Math.round((current / total) * 100)
  return <div className="test-progress"><div><span>Pregunta {current} de {total}</span><strong>{percentage}%</strong></div><div className="progress-track" role="progressbar" aria-label="Progreso del test" aria-valuemin="0" aria-valuemax="100" aria-valuenow={percentage}><span style={{ width: `${percentage}%` }} /></div></div>
}
