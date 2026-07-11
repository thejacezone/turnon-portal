import { getActiveWordRange } from '../utils/calculateMetrics.js';

function getCharacterClass(referenceCharacter, typedCharacter, index, typedLength, activeWordRange) {
  const classes = ['reference-char'];

  if (index < typedLength) {
    classes.push(referenceCharacter === typedCharacter ? 'is-correct' : 'is-incorrect');
  } else if (index === typedLength) {
    classes.push('is-current');
  } else {
    classes.push('is-pending');
  }

  if (activeWordRange && index >= activeWordRange.start && index < activeWordRange.end) {
    classes.push('is-active-word');
  }

  return classes.join(' ');
}

export default function ReferenceText({ referenceText, typedText, activeCharRef }) {
  const activeWordRange = getActiveWordRange(referenceText, typedText.length);
  const anchorIndex = Math.min(typedText.length, Math.max(referenceText.length - 1, 0));

  return (
    <div className="reference-text" aria-label="Reference text">
      {Array.from(referenceText).map((character, index) => (
        <span
          className={getCharacterClass(
            character,
            typedText[index],
            index,
            typedText.length,
            activeWordRange,
          )}
          key={`${character}-${index}`}
          ref={index === anchorIndex ? activeCharRef : null}
        >
          {character}
        </span>
      ))}
    </div>
  );
}
