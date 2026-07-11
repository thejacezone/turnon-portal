import { useMemo, useState } from 'react';
import SetupScreen from './components/SetupScreen.jsx';
import TestScreen from './components/TestScreen.jsx';
import ResultsScreen from './components/ResultsScreen.jsx';
import { durations, typingTexts } from './data/typingTexts.js';

const screens = {
  setup: 'setup',
  test: 'test',
  results: 'results',
};

export default function App() {
  const [screen, setScreen] = useState(screens.setup);
  const [selectedDifficultyId, setSelectedDifficultyId] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [result, setResult] = useState(null);

  const selectedDifficulty = useMemo(
    () => typingTexts.find((item) => item.id === selectedDifficultyId) || null,
    [selectedDifficultyId],
  );

  const startTest = () => {
    if (!selectedDifficulty || !selectedDuration) return;
    setResult(null);
    setScreen(screens.test);
  };

  const showResults = (testResult) => {
    setResult(testResult);
    setScreen(screens.results);
  };

  const backHome = () => {
    setResult(null);
    setSelectedDifficultyId('');
    setSelectedDuration(null);
    setScreen(screens.setup);
  };

  const changeDifficulty = () => {
    setResult(null);
    setSelectedDifficultyId('');
    setScreen(screens.setup);
  };

  const changeDuration = () => {
    setResult(null);
    setSelectedDuration(null);
    setScreen(screens.setup);
  };

  const tryAgain = () => {
    setResult(null);
    setScreen(screens.test);
  };

  return (
    <div className="turnon-typing-test">
      <div className="typing-test-content">
        {screen === screens.setup && (
          <SetupScreen
            difficulties={typingTexts}
            durations={durations}
            selectedDifficultyId={selectedDifficultyId}
            selectedDuration={selectedDuration}
            onDifficultyChange={setSelectedDifficultyId}
            onDurationChange={setSelectedDuration}
            onStart={startTest}
          />
        )}

        {screen === screens.test && selectedDifficulty && selectedDuration && (
          <TestScreen
            difficulty={selectedDifficulty}
            duration={selectedDuration}
            onFinish={showResults}
            onBackHome={backHome}
          />
        )}

        {screen === screens.results && selectedDifficulty && selectedDuration && result && (
          <ResultsScreen
            difficulty={selectedDifficulty}
            duration={selectedDuration}
            result={result}
            onTryAgain={tryAgain}
            onChangeDifficulty={changeDifficulty}
            onChangeDuration={changeDuration}
            onBackHome={backHome}
          />
        )}
      </div>
    </div>
  );
}
