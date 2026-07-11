import { useEffect, useRef } from 'react';
import MetricsPanel from './MetricsPanel.jsx';
import ReferenceText from './ReferenceText.jsx';
import TypingInput from './TypingInput.jsx';
import { useTypingTest } from '../hooks/useTypingTest.js';

export default function TestScreen({ difficulty, duration, onFinish, onBackHome }) {
  const referencePanelRef = useRef(null);
  const activeCharRef = useRef(null);
  const previousTypedLengthRef = useRef(0);
  const {
    typedText,
    started,
    finished,
    timeRemaining,
    metrics,
    pasteMessage,
    textareaRef,
    handleTextChange,
    handlePaste,
    resetTest,
  } = useTypingTest({
    referenceText: difficulty.text,
    durationSeconds: duration.seconds,
    onFinish,
  });

  useEffect(() => {
    textareaRef.current?.focus();
  }, [textareaRef]);

  useEffect(() => {
    const container = referencePanelRef.current;
    const activeChar = activeCharRef.current;
    if (!container || !activeChar) return;

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeChar.getBoundingClientRect();
    const lowerLimit = containerRect.top + container.clientHeight * 0.68;
    const upperLimit = containerRect.top + container.clientHeight * 0.24;
    const typedMoved = typedText.length !== previousTypedLengthRef.current;
    previousTypedLengthRef.current = typedText.length;

    if (!typedMoved) return;

    if (activeRect.bottom > lowerLimit || activeRect.top < upperLimit) {
      const targetTop =
        container.scrollTop + activeRect.top - containerRect.top - container.clientHeight * 0.42;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      container.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  }, [typedText.length]);

  const handleReset = () => {
    resetTest();
    if (referencePanelRef.current) {
      referencePanelRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  return (
    <section className="test-screen" aria-labelledby="test-title">
      <div className="test-topbar">
        <div>
          <p className="eyebrow">
            {difficulty.label} / {duration.label}
          </p>
          <h1 id="test-title">English Typing Test</h1>
        </div>
        <div className="test-actions">
          <button type="button" className="secondary-action" onClick={handleReset}>
            Restart Test
          </button>
          <button type="button" className="ghost-action" onClick={onBackHome}>
            Back to Test Setup
          </button>
        </div>
      </div>

      <MetricsPanel metrics={metrics} timeRemaining={timeRemaining} />

      <div className="typing-layout">
        <section className="reference-panel" aria-labelledby="reference-title">
          <div className="panel-heading">
            <h2 id="reference-title">Reference Text</h2>
            <p>
              {started
                ? 'Keep typing. The active word stays in view.'
                : 'Timer starts on your first character.'}
            </p>
          </div>
          <div className="reference-scroll" ref={referencePanelRef}>
            <ReferenceText
              referenceText={difficulty.text}
              typedText={typedText}
              activeCharRef={activeCharRef}
            />
          </div>
        </section>

        <TypingInput
          value={typedText}
          onChange={handleTextChange}
          onPaste={handlePaste}
          disabled={finished}
          textareaRef={textareaRef}
          pasteMessage={pasteMessage}
        />
      </div>
    </section>
  );
}
