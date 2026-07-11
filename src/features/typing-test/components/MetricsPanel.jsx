import { formatTime } from '../utils/calculateMetrics.js';

export default function MetricsPanel({ metrics, timeRemaining }) {
  const items = [
    { label: 'Time Remaining', value: formatTime(timeRemaining) },
    { label: 'Words Per Minute', value: metrics.wpm },
    { label: 'Accuracy', value: `${metrics.accuracy}%` },
    { label: 'Errors', value: metrics.errors },
    { label: 'Incorrect Words', value: metrics.incorrectWords },
  ];

  return (
    <section className="metrics-panel" aria-label="Typing metrics">
      {items.map((item) => (
        <div className="metric-card" key={item.label}>
          <span className="metric-label">{item.label}</span>
          <span className="metric-value">{item.value}</span>
        </div>
      ))}
    </section>
  );
}
