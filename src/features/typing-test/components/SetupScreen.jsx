export default function SetupScreen({
  difficulties,
  durations,
  selectedDifficultyId,
  selectedDuration,
  onDifficultyChange,
  onDurationChange,
  onStart,
}) {
  const canStart = Boolean(selectedDifficultyId && selectedDuration);

  return (
    <section className="setup-screen" aria-labelledby="page-title">
      <div className="intro-panel">
        <p className="eyebrow">English typing practice</p>
        <h1 id="page-title">Typing test laboral</h1>
        <p className="lead">
          Practice typing professional English with official TurnOn reference texts. Choose a
          difficulty, choose a duration, and begin when you type the first character.
        </p>
        <p className="notice">
          This test measures typing speed and accuracy in English. It does not measure your
          general English level.
        </p>
        <p className="typing-wpm-copy">
          <strong>WPM means Words Per Minute.</strong> It shows how quickly you type while accuracy
          shows how precisely you copy the reference text.
        </p>
      </div>

      <form
        className="setup-form"
        onSubmit={(event) => {
          event.preventDefault();
          onStart();
        }}
      >
        <fieldset>
          <legend>Choose your difficulty</legend>
          <div className="choice-grid difficulty-grid">
            {difficulties.map((difficulty) => (
              <label
                className={`choice-card ${
                  selectedDifficultyId === difficulty.id ? 'is-selected' : ''
                }`}
                key={difficulty.id}
              >
                <input
                  type="radio"
                  name="difficulty"
                  value={difficulty.id}
                  checked={selectedDifficultyId === difficulty.id}
                  onChange={() => onDifficultyChange(difficulty.id)}
                />
                <span className="choice-title">{difficulty.label}</span>
                <span className="choice-description">{difficulty.description}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Choose your duration</legend>
          <div className="choice-grid duration-grid">
            {durations.map((duration) => (
              <label
                className={`choice-card duration-choice ${
                  selectedDuration?.seconds === duration.seconds ? 'is-selected' : ''
                }`}
                key={duration.seconds}
              >
                <input
                  type="radio"
                  name="duration"
                  value={duration.seconds}
                  checked={selectedDuration?.seconds === duration.seconds}
                  onChange={() => onDurationChange(duration)}
                />
                <span className="choice-title">{duration.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <button className="primary-action" type="submit" disabled={!canStart}>
          Start Test
        </button>
      </form>
    </section>
  );
}
