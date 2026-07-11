export default function ResultsScreen({
  difficulty,
  duration,
  result,
  onTryAgain,
  onChangeDifficulty,
  onChangeDuration,
  onBackHome,
}) {
  const finalMetrics = result.metrics;

  return (
    <section className="results-screen" aria-labelledby="results-title">
      <p className="eyebrow">Final results</p>
      <h1 id="results-title">English Typing Test Results</h1>
      <p className="notice">
        These results measure typing speed and accuracy in English. They do not measure your
        general English level.
      </p>

      <div className="results-grid">
        <div className="result-card featured">
          <span className="metric-label">Words Per Minute</span>
          <strong>{finalMetrics.wpm}</strong>
        </div>
        <div className="result-card">
          <span className="metric-label">Accuracy</span>
          <strong>{finalMetrics.accuracy}%</strong>
        </div>
        <div className="result-card">
          <span className="metric-label">Errors</span>
          <strong>{finalMetrics.errors}</strong>
        </div>
        <div className="result-card">
          <span className="metric-label">Incorrect Words</span>
          <strong>{finalMetrics.incorrectWords}</strong>
        </div>
        <div className="result-card">
          <span className="metric-label">Difficulty</span>
          <strong>{difficulty.label}</strong>
        </div>
        <div className="result-card">
          <span className="metric-label">Duration</span>
          <strong>{duration.label}</strong>
        </div>
      </div>

      <div className="result-actions">
        <button type="button" className="primary-action" onClick={onTryAgain}>
          Try Again
        </button>
        <button type="button" className="secondary-action" onClick={onChangeDifficulty}>
          Change Difficulty
        </button>
        <button type="button" className="secondary-action" onClick={onChangeDuration}>
          Change Duration
        </button>
        <button type="button" className="ghost-action" onClick={onBackHome}>
          Back to Test Setup
        </button>
      </div>
    </section>
  );
}
