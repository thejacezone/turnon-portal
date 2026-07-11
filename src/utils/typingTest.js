export function countTypedWords(text) {
  return (text.trim().match(/[A-Za-zÀ-ÿ0-9]+(?:['-][A-Za-zÀ-ÿ0-9]+)?/g) || []).length
}

export function countTypingErrors(targetText, typedText) {
  return [...typedText].reduce((errors, character, index) => errors + (character === targetText[index] ? 0 : 1), 0)
}

export function countIncorrectWords(targetText, typedText) {
  const targetWords = targetText.trim().split(/\s+/)
  const typedWords = typedText.trim().split(/\s+/).filter(Boolean)
  return typedWords.reduce((incorrect, word, index) => incorrect + (word === targetWords[index] ? 0 : 1), 0)
}

export function countCorrectCharacters(targetText, typedText) {
  return [...typedText].reduce((correct, character, index) => correct + (character === targetText[index] ? 1 : 0), 0)
}

export function calculateGrossWpm(typedCharacters, minutesUsed) {
  if (!typedCharacters || !minutesUsed || minutesUsed <= 0) return 0
  return Number(((typedCharacters / 5) / minutesUsed).toFixed(1))
}

export function calculateNetWpm(typedCharacters, errors, minutesUsed) {
  if (!typedCharacters || !minutesUsed || minutesUsed <= 0) return 0
  const grossWpm = calculateGrossWpm(typedCharacters, minutesUsed)
  return Number(Math.max(0, grossWpm - (errors / minutesUsed)).toFixed(1))
}

export function calculateAccuracy(correctCharacters, typedCharacters) {
  if (!typedCharacters) return 100
  return Number(((correctCharacters / typedCharacters) * 100).toFixed(1))
}

export function calculateCharactersPerMinute(typedCharacters, minutesUsed) {
  if (!typedCharacters || !minutesUsed || minutesUsed <= 0) return 0
  return Number((typedCharacters / minutesUsed).toFixed(1))
}

export function formatTypingTime(seconds) {
  const safeSeconds = Math.max(0, Math.ceil(seconds || 0))
  const minutes = Math.floor(safeSeconds / 60)
  const remainingSeconds = safeSeconds % 60
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`
}

export function getTypingRating(netWpm) {
  if (netWpm < 20) return 'En desarrollo'
  if (netWpm < 30) return 'Básico'
  if (netWpm < 40) return 'Aceptable para práctica laboral'
  if (netWpm < 55) return 'Bueno'
  return 'Fuerte'
}

export function getAccuracyRating(accuracy) {
  if (accuracy < 85) return 'Necesita precisión'
  if (accuracy < 95) return 'Aceptable'
  return 'Buena precisión'
}

export function getTypingRecommendation({ netWpm, accuracy }) {
  if (accuracy < 85) return 'Bajá un poco la velocidad y priorizá precisión antes de aumentar WPM.'
  if (netWpm < 20) return 'Practicá con textos cortos y enfocáte en mantener ritmo constante.'
  if (netWpm >= 30 && accuracy < 95) return 'Vas bien en velocidad. Ahora trabajá en reducir errores.'
  if (netWpm >= 40 && accuracy >= 95) return 'Buen resultado. Probá textos más largos o de categoría advanced.'
  return '30 WPM o más es una meta práctica para este ejercicio, pero cada empresa puede tener requisitos diferentes.'
}

export function calculateTypingProgress(targetText, typedText) {
  if (!targetText.length) return 0
  return Math.min(100, Number(((typedText.length / targetText.length) * 100).toFixed(1)))
}

export function calculateTypingMetrics(targetText, typedText, secondsUsed) {
  const typedCharacters = typedText.length
  const correctCharacters = countCorrectCharacters(targetText, typedText)
  const errors = countTypingErrors(targetText, typedText)
  const incorrectWords = countIncorrectWords(targetText, typedText)
  const minutesUsed = secondsUsed / 60
  const grossWpm = calculateGrossWpm(typedCharacters, minutesUsed)
  const netWpm = calculateNetWpm(typedCharacters, errors, minutesUsed)
  const accuracy = calculateAccuracy(correctCharacters, typedCharacters)
  const cpm = calculateCharactersPerMinute(typedCharacters, minutesUsed)

  return {
    typedWords: countTypedWords(typedText),
    typedCharacters,
    correctCharacters,
    incorrectCharacters: errors,
    errors,
    incorrectWords,
    grossWpm,
    netWpm,
    accuracy,
    cpm,
    progress: calculateTypingProgress(targetText, typedText),
  }
}

export function calculateTypingResult(passage, typedText, secondsUsed, selectedDurationSeconds) {
  const metrics = calculateTypingMetrics(passage.text, typedText, secondsUsed)
  const timeUsed = selectedDurationSeconds ? Math.min(secondsUsed, selectedDurationSeconds) : secondsUsed
  const rating = getTypingRating(metrics.netWpm)
  const accuracyRating = getAccuracyRating(metrics.accuracy)
  const recommendation = getTypingRecommendation({ netWpm: metrics.netWpm, accuracy: metrics.accuracy })

  return {
    passage,
    typedText,
    timeUsed,
    formattedTimeUsed: formatTypingTime(timeUsed),
    selectedDurationSeconds,
    rating,
    accuracyRating,
    recommendation,
    ...metrics,
  }
}

export function pickTypingPassage(passages, difficulty = 'Easy') {
  const pool = passages.filter((passage) => (passage.difficulty || passage.estimatedDifficulty) === difficulty)
  const safePool = pool.length ? pool : passages
  return safePool[Math.floor(Math.random() * safePool.length)]
}

export function getCharacterStates(targetText, typedText) {
  return [...targetText].map((character, index) => {
    if (typedText[index] == null) return { character, state: 'pending' }
    return { character, state: typedText[index] === character ? 'correct' : 'incorrect' }
  })
}
