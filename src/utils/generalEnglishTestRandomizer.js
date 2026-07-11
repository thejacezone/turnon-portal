const EXPECTED_SECTIONS = {
  grammar: 20,
  vocabulary: 15,
  reading: 15,
}

export function normalizeSkill(value) {
  return String(value ?? '').trim().toLowerCase()
}

function shuffleArray(items) {
  const shuffled = [...items]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]]
  }

  return shuffled
}

function hasSameOrder(items, previousItems) {
  return items.length === previousItems.length
    && items.every((item, index) => item.id === previousItems[index].id)
}

function ensureDifferentOrder(items, previousItems) {
  const shuffled = shuffleArray(items)

  if (hasSameOrder(shuffled, previousItems) && shuffled.length > 1) {
    ;[shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]]
  }

  return shuffled
}

export function getReadingPassageKey(question) {
  const explicitKey = question.passageId
    ?? question.readingId
    ?? question.scenarioId
    ?? question.groupId
    ?? question.textId

  if (explicitKey != null && String(explicitKey).trim()) return String(explicitKey).trim().toLowerCase()

  const firstLine = String(question.question ?? '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find(Boolean)

  return firstLine?.toLowerCase() || `question:${question.id}`
}

function shuffleReadingByPassage(readingQuestions, previousReadingQuestions) {
  const groups = new Map()

  readingQuestions.forEach((question) => {
    const key = getReadingPassageKey(question)
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(question)
  })

  const shuffledGroups = shuffleArray(
    [...groups.entries()].map(([key, questions]) => ({
      key,
      questions: shuffleArray(questions),
    })),
  )

  let shuffledReading = shuffledGroups.flatMap((group) => group.questions)

  if (hasSameOrder(shuffledReading, previousReadingQuestions) && shuffledReading.length > 1) {
    const groupWithMultipleQuestions = shuffledGroups.find((group) => group.questions.length > 1)

    if (groupWithMultipleQuestions) {
      ;[groupWithMultipleQuestions.questions[0], groupWithMultipleQuestions.questions[1]] = [
        groupWithMultipleQuestions.questions[1],
        groupWithMultipleQuestions.questions[0],
      ]
    } else if (shuffledGroups.length > 1) {
      ;[shuffledGroups[0], shuffledGroups[1]] = [shuffledGroups[1], shuffledGroups[0]]
    }

    shuffledReading = shuffledGroups.flatMap((group) => group.questions)
  }

  return shuffledReading
}

function collectValidationErrors(questionBank) {
  const errors = []
  const ids = questionBank.map((question) => question.id)

  if (questionBank.length !== 50) errors.push(`Total esperado: 50; recibido: ${questionBank.length}.`)
  if (new Set(ids).size !== 50) errors.push(`IDs únicos esperados: 50; recibidos: ${new Set(ids).size}.`)

  Object.entries(EXPECTED_SECTIONS).forEach(([skill, expected]) => {
    const actual = questionBank.filter((question) => normalizeSkill(question.skill) === skill).length
    if (actual !== expected) errors.push(`${skill}: se esperaban ${expected}; se recibieron ${actual}.`)
  })

  return errors
}

function readingGroupsAreContiguous(readingQuestions) {
  const completedGroups = new Set()
  let activeGroup = null

  for (const question of readingQuestions) {
    const group = getReadingPassageKey(question)
    if (group === activeGroup) continue
    if (completedGroups.has(group)) return false
    if (activeGroup) completedGroups.add(activeGroup)
    activeGroup = group
  }

  return true
}

function validateAttempt(attempt, questionBank) {
  const errors = collectValidationErrors(attempt)
  const bankIds = new Set(questionBank.map((question) => question.id))
  const attemptIds = new Set(attempt.map((question) => question.id))

  if (attemptIds.size !== bankIds.size || [...bankIds].some((id) => !attemptIds.has(id))) {
    errors.push('El intento no contiene exactamente las mismas preguntas del banco.')
  }

  if (!attempt.slice(0, 20).every((question) => normalizeSkill(question.skill) === 'grammar')) {
    errors.push('Las posiciones 1–20 deben contener únicamente Grammar.')
  }
  if (!attempt.slice(20, 35).every((question) => normalizeSkill(question.skill) === 'vocabulary')) {
    errors.push('Las posiciones 21–35 deben contener únicamente Vocabulary.')
  }
  if (!attempt.slice(35, 50).every((question) => normalizeSkill(question.skill) === 'reading')) {
    errors.push('Las posiciones 36–50 deben contener únicamente Reading.')
  }
  if (!readingGroupsAreContiguous(attempt.slice(35, 50))) {
    errors.push('Las preguntas de un mismo pasaje de Reading deben permanecer juntas.')
  }

  return errors
}

function throwValidationError(errors) {
  const error = new Error('No se pudo crear un intento válido del General English Level Test.')
  error.name = 'GeneralEnglishTestValidationError'
  error.validationErrors = errors
  throw error
}

export function createGeneralEnglishTestAttempt(questionBank, previousAttempt = []) {
  const bankErrors = collectValidationErrors(questionBank)
  if (bankErrors.length) throwValidationError(bankErrors)

  const grammar = questionBank.filter((question) => normalizeSkill(question.skill) === 'grammar')
  const vocabulary = questionBank.filter((question) => normalizeSkill(question.skill) === 'vocabulary')
  const reading = questionBank.filter((question) => normalizeSkill(question.skill) === 'reading')

  const previousGrammar = previousAttempt.slice(0, 20)
  const previousVocabulary = previousAttempt.slice(20, 35)
  const previousReading = previousAttempt.slice(35, 50)

  const attempt = [
    ...ensureDifferentOrder(grammar, previousGrammar),
    ...ensureDifferentOrder(vocabulary, previousVocabulary),
    ...shuffleReadingByPassage(reading, previousReading),
  ]

  const attemptErrors = validateAttempt(attempt, questionBank)
  if (attemptErrors.length) throwValidationError(attemptErrors)

  return attempt
}

export function getGeneralEnglishTestSection(index) {
  if (index < 20) return { number: 1, label: 'Grammar', range: 'Preguntas 1–20' }
  if (index < 35) return { number: 2, label: 'Vocabulary', range: 'Preguntas 21–35' }
  return { number: 3, label: 'Reading', range: 'Preguntas 36–50' }
}
