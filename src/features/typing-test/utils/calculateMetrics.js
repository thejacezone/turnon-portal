const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export function getWordRanges(text) {
  const ranges = [];
  const matches = text.matchAll(/\S+/g);

  for (const match of matches) {
    ranges.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
    });
  }

  return ranges;
}

export function findWordRangeAt(ranges, index) {
  let low = 0;
  let high = ranges.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const range = ranges[mid];

    if (index < range.start) {
      high = mid - 1;
    } else if (index >= range.end) {
      low = mid + 1;
    } else {
      return range;
    }
  }

  return null;
}

function countCorrectCharacters(referenceText, typedText) {
  let correct = 0;

  for (let index = 0; index < typedText.length; index += 1) {
    if (typedText[index] === referenceText[index]) {
      correct += 1;
    }
  }

  return correct;
}

function countErrors(referenceText, typedText) {
  let errors = 0;

  for (let index = 0; index < typedText.length; index += 1) {
    if (typedText[index] !== referenceText[index]) {
      errors += 1;
    }
  }

  return errors;
}

export function getActiveWordRange(referenceText, typedLength) {
  const ranges = getWordRanges(referenceText);
  const cursorIndex = clamp(typedLength, 0, Math.max(referenceText.length - 1, 0));

  return (
    findWordRangeAt(ranges, cursorIndex) ||
    ranges.find((range) => range.start >= cursorIndex) ||
    ranges[ranges.length - 1] ||
    null
  );
}

// Counts unique typed/reference words that contain at least one positional mismatch.
// Spaces are evaluated too, because extra or missing separators change the word context.
export function countIncorrectWords(referenceText, typedText) {
  const referenceRanges = getWordRanges(referenceText);
  const typedRanges = getWordRanges(typedText);
  const incorrectReferenceWords = new Set();
  const incorrectTypedWords = new Set();

  for (let index = 0; index < typedText.length; index += 1) {
    if (typedText[index] === referenceText[index]) {
      continue;
    }

    const referenceRange = findWordRangeAt(referenceRanges, index);
    const typedRange = findWordRangeAt(typedRanges, index);

    if (referenceRange) {
      incorrectReferenceWords.add(`${referenceRange.start}-${referenceRange.end}`);
    } else if (typedRange) {
      incorrectTypedWords.add(`${typedRange.start}-${typedRange.end}`);
    } else {
      const nextTypedWord = typedRanges.find((range) => range.start > index);
      const previousTypedWord = [...typedRanges].reverse().find((range) => range.end <= index);
      const nearbyWord = nextTypedWord || previousTypedWord;

      if (nearbyWord) {
        incorrectTypedWords.add(`${nearbyWord.start}-${nearbyWord.end}`);
      }
    }
  }

  return incorrectReferenceWords.size + incorrectTypedWords.size;
}

export function calculateMetrics(referenceText, typedText, elapsedSeconds) {
  const correctCharacters = countCorrectCharacters(referenceText, typedText);
  const errors = countErrors(referenceText, typedText);
  const elapsedMinutes = Math.max(elapsedSeconds, 0) / 60;
  const wpm = elapsedMinutes > 0 ? Math.round(correctCharacters / 5 / elapsedMinutes) : 0;
  const accuracy =
    typedText.length === 0
      ? 100
      : clamp((correctCharacters / typedText.length) * 100, 0, 100);

  return {
    wpm: Math.max(wpm, 0),
    accuracy: Math.round(accuracy * 10) / 10,
    errors,
    incorrectWords: countIncorrectWords(referenceText, typedText),
    correctCharacters,
    typedCharacters: typedText.length,
  };
}

export function formatTime(seconds) {
  const safeSeconds = Math.max(0, Math.ceil(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;

  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}
