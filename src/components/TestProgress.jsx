export default function TestProgress({ current, total }) {
  const percentage = Math.round((current / total) * 100)
  return <div className="test-progress"><div><span>Pregunta {current} de {total}</span><strong>{percentage}%</strong></div><div className="progress-track" aria-label={`Progreso ${percentage}%`}><span style={{ width: `${percentage}%` }} /></div></div>
}
