import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { calculateMetrics } from '../utils/calculateMetrics.js';

const TICK_MS = 200;

export function useTypingTest({ referenceText, durationSeconds, onFinish }) {
  const [typedText, setTypedText] = useState('');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [pasteMessage, setPasteMessage] = useState('');
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const finalElapsedRef = useRef(0);
  const textareaRef = useRef(null);

  const elapsedSeconds = useMemo(() => {
    if (!started) return 0;
    if (finished) return finalElapsedRef.current;
    return Math.max(0, (now - startTimeRef.current) / 1000);
  }, [finished, now, started]);

  const timeRemaining = Math.max(0, durationSeconds - elapsedSeconds);
  const metrics = useMemo(
    () => calculateMetrics(referenceText, typedText, elapsedSeconds),
    [elapsedSeconds, referenceText, typedText],
  );

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const finishTest = useCallback(
    (reason) => {
      if (finished) return;

      clearTimer();
      const elapsed =
        reason === 'time'
          ? durationSeconds
          : Math.max(0.1, (Date.now() - startTimeRef.current) / 1000);

      finalElapsedRef.current = elapsed;
      setNow(Date.now());
      setFinished(true);

      const finalMetrics = calculateMetrics(referenceText, typedText, elapsed);
      onFinish({
        reason,
        typedText,
        elapsedSeconds: elapsed,
        metrics: finalMetrics,
      });
    },
    [clearTimer, durationSeconds, finished, onFinish, referenceText, typedText],
  );

  const startTimer = useCallback(() => {
    if (started || finished || startTimeRef.current) return;

    startTimeRef.current = Date.now();
    finalElapsedRef.current = 0;
    setStarted(true);
    setNow(Date.now());
    clearTimer();
    intervalRef.current = window.setInterval(() => {
      setNow(Date.now());
    }, TICK_MS);
  }, [clearTimer, finished, started]);

  const handleTextChange = useCallback(
    (event) => {
      if (finished) return;

      const nextValue = event.target.value;

      if (!started && nextValue.length > 0) {
        startTimer();
      }

      setTypedText(nextValue);
      setPasteMessage('');
    },
    [finished, startTimer, started],
  );

  const handlePaste = useCallback((event) => {
    event.preventDefault();
    setPasteMessage('Pasting is disabled during the test.');
  }, []);

  const resetTest = useCallback(() => {
    clearTimer();
    setTypedText('');
    setStarted(false);
    setFinished(false);
    setNow(Date.now());
    setPasteMessage('');
    startTimeRef.current = null;
    finalElapsedRef.current = 0;

    window.requestAnimationFrame(() => {
      textareaRef.current?.focus();
    });
  }, [clearTimer]);

  useEffect(() => {
    if (!started || finished) return;

    if (timeRemaining <= 0) {
      finishTest('time');
    }
  }, [finishTest, finished, started, timeRemaining]);

  useEffect(() => {
    if (!started || finished) return;

    if (typedText.length >= referenceText.length) {
      finishTest('complete');
    }
  }, [finishTest, finished, referenceText.length, started, typedText.length]);

  useEffect(() => clearTimer, [clearTimer]);

  return {
    typedText,
    started,
    finished,
    timeRemaining,
    elapsedSeconds,
    metrics,
    pasteMessage,
    textareaRef,
    handleTextChange,
    handlePaste,
    resetTest,
  };
}
