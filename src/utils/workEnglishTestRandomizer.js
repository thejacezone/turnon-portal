const ATTEMPT_COUNTS = { grammar: 30, vocabulary: 10, reading: 10 }
const GRAMMAR_LEVEL_COUNTS = { B1: 10, B2: 12, C1: 8 }
const VOCABULARY_LEVEL_COUNTS = { B1: 3, B2: 4, C1: 3 }

export function normalizeWorkSkill(value) {
  return String(value ?? '').trim().toLowerCase()
}

function normalizeLevel(value) {
  return String(value ?? '').trim().toUpperCase()
}

function normalizeText(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

export function shuffleArray(items) {
  const shuffled = [...items]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]]
  }

  return shuffled
}

function selectByLevel(pool, distribution) {
  const selected = Object.entries(distribution).flatMap(([level, count]) => {
    const levelPool = pool.filter((question) => normalizeLevel(question.level) === level)
    if (levelPool.length < count) throw new Error(`Not enough ${level} questions: expected ${count}, found ${levelPool.length}.`)
    return shuffleArray(levelPool).slice(0, count)
  })

  return shuffleArray(selected)
}

function groupReadingQuestions(readingPool) {
  const groups = new Map()

  readingPool.forEach((question) => {
    const passageId = String(question.passageId ?? '').trim()
    if (!passageId) throw new Error(`Reading question ${question.id} does not have a passageId.`)
    if (!groups.has(passageId)) groups.set(passageId, [])
    groups.get(passageId).push(question)
  })

  return [...groups.entries()].map(([passageId, questions]) => ({
    passageId,
    level: normalizeLevel(questions[0].level),
    questions,
  }))
}

function findReadingCombinations(groups, targetCount) {
  const combinations = []

  function visit(startIndex, selected, total) {
    if (total === targetCount) {
      combinations.push([...selected])
      return
    }
    if (total > targetCount) return

    for (let index = startIndex; index < groups.length; index += 1) {
      selected.push(groups[index])
      visit(index + 1, selected, total + groups[index].questions.length)
      selected.pop()
    }
  }

  visit(0, [], 0)
  return combinations
}

function passageSetKey(groups) {
  return groups.map((group) => group.passageId).sort().join('|')
}

function selectReadingPassages(readingPool, previousAttempt) {
  const groups = groupReadingQuestions(readingPool)
  const combinations = findReadingCombinations(groups, ATTEMPT_COUNTS.reading)
  if (!combinations.length) throw new Error('Complete Reading passages cannot produce exactly 10 questions.')

  const balancedCombinations = combinations.filter((combination) => {
    const levels = combination.map((group) => group.level)
    return levels.includes('B1') && levels.some((level) => level === 'B2' || level === 'C1')
  })
  const candidates = balancedCombinations.length ? balancedCombinations : combinations
  const previousPassages = groupReadingQuestions(
    previousAttempt.filter((question) => normalizeWorkSkill(question.skill) === 'reading'),
  )
  const previousKey = passageSetKey(previousPassages)
  const alternativeCandidates = candidates.filter((combination) => passageSetKey(combination) !== previousKey)
  const availableCandidates = alternativeCandidates.length ? alternativeCandidates : candidates
  const selectedGroups = shuffleArray(availableCandidates)[0]

  return shuffleArray(selectedGroups).flatMap((group) => shuffleArray(group.questions))
}

function validateBank(questionBank) {
  const errors = []
  const ids = questionBank.map((question) => question.id)
  const texts = questionBank.map((question) => normalizeText(question.question))
  const counts = Object.fromEntries(Object.keys(ATTEMPT_COUNTS).map((skill) => [
    skill,
    questionBank.filter((question) => normalizeWorkSkill(question.skill) === skill).length,
  ]))

  Object.entries(ATTEMPT_COUNTS).forEach(([skill, minimum]) => {
    if (counts[skill] < minimum) errors.push(`${skill}: minimum ${minimum}; found ${counts[skill]}.`)
  })
  if (new Set(ids).size !== ids.length) errors.push('Question IDs must be unique.')
  if (new Set(texts).size !== texts.length) errors.push('Question texts must be unique.')

  questionBank.forEach((question) => {
    if (!question.id || !normalizeWorkSkill(question.skill) || !normalizeLevel(question.level)) errors.push(`Missing metadata in ${question.id || 'unknown question'}.`)
    if (!Array.isArray(question.options) || question.options.length !== 4) errors.push(`${question.id} must have four options.`)
    if (!question.options?.includes(question.correctAnswer)) errors.push(`${question.id} has an invalid correct answer.`)
    if (!String(question.explanation ?? '').trim()) errors.push(`${question.id} does not have an explanation.`)
  })

  const readingPool = questionBank.filter((question) => normalizeWorkSkill(question.skill) === 'reading')
  try {
    const readingGroups = groupReadingQuestions(readingPool)
    if (!findReadingCombinations(readingGroups, ATTEMPT_COUNTS.reading).length) errors.push('Reading passages cannot produce a complete 10-question section.')
  } catch (error) {
    errors.push(error.message)
  }

  return errors
}

function validateAttempt(attempt, questionBank) {
  const errors = []
  const grammar = attempt.slice(0, 30)
  const vocabulary = attempt.slice(30, 40)
  const reading = attempt.slice(40, 50)

  if (attempt.length !== 50) errors.push(`Attempt total must be 50; found ${attempt.length}.`)
  if (!grammar.every((question) => normalizeWorkSkill(question.skill) === 'grammar')) errors.push('Positions 1–30 must be Grammar.')
  if (!vocabulary.every((question) => normalizeWorkSkill(question.skill) === 'vocabulary')) errors.push('Positions 31–40 must be Vocabulary.')
  if (!reading.every((question) => normalizeWorkSkill(question.skill) === 'reading')) errors.push('Positions 41–50 must be Reading.')
  if (new Set(attempt.map((question) => question.id)).size !== 50) errors.push('Attempt IDs must be unique.')

  Object.entries(GRAMMAR_LEVEL_COUNTS).forEach(([level, expected]) => {
    const actual = grammar.filter((question) => normalizeLevel(question.level) === level).length
    if (actual !== expected) errors.push(`Grammar ${level}: expected ${expected}; found ${actual}.`)
  })
  Object.entries(VOCABULARY_LEVEL_COUNTS).forEach(([level, expected]) => {
    const actual = vocabulary.filter((question) => normalizeLevel(question.level) === level).length
    if (actual !== expected) errors.push(`Vocabulary ${level}: expected ${expected}; found ${actual}.`)
  })

  try {
    const selectedGroups = groupReadingQuestions(reading)
    const bankGroups = new Map(groupReadingQuestions(
      questionBank.filter((question) => normalizeWorkSkill(question.skill) === 'reading'),
    ).map((group) => [group.passageId, group.questions.length]))
    selectedGroups.forEach((group) => {
      if (group.questions.length !== bankGroups.get(group.passageId)) errors.push(`Reading passage ${group.passageId} is incomplete.`)
    })

    const completedPassages = new Set()
    let activePassage = null
    reading.forEach((question) => {
      if (question.passageId === activePassage) return
      if (completedPassages.has(question.passageId)) errors.push(`Reading passage ${question.passageId} is not contiguous.`)
      if (activePassage) completedPassages.add(activePassage)
      activePassage = question.passageId
    })
  } catch (error) {
    errors.push(error.message)
  }

  return errors
}

function throwValidationError(errors) {
  const error = new Error('The Work English Test attempt could not be created.')
  error.name = 'WorkEnglishTestValidationError'
  error.validationErrors = errors
  throw error
}

export function validateWorkEnglishTestBank(questionBank) {
  const errors = validateBank(questionBank)
  return { valid: errors.length === 0, errors }
}

export function createWorkEnglishTestAttempt(questionBank, previousAttempt = []) {
  const bankErrors = validateBank(questionBank)
  if (bankErrors.length) throwValidationError(bankErrors)

  const grammarPool = questionBank.filter((question) => normalizeWorkSkill(question.skill) === 'grammar')
  const vocabularyPool = questionBank.filter((question) => normalizeWorkSkill(question.skill) === 'vocabulary')
  const readingPool = questionBank.filter((question) => normalizeWorkSkill(question.skill) === 'reading')
  const attempt = [
    ...selectByLevel(grammarPool, GRAMMAR_LEVEL_COUNTS),
    ...selectByLevel(vocabularyPool, VOCABULARY_LEVEL_COUNTS),
    ...selectReadingPassages(readingPool, previousAttempt),
  ]

  const repeatsPreviousOrder = attempt.length === previousAttempt.length
    && attempt.every((question, index) => question.id === previousAttempt[index].id)
  if (repeatsPreviousOrder && attempt.length > 1) {
    ;[attempt[0], attempt[1]] = [attempt[1], attempt[0]]
  }

  const attemptErrors = validateAttempt(attempt, questionBank)
  if (attemptErrors.length) throwValidationError(attemptErrors)
  return attempt
}

export function getWorkEnglishTestSection(index) {
  if (index < 30) return { number: 1, label: 'Grammar', range: 'Preguntas 1–30' }
  if (index < 40) return { number: 2, label: 'Vocabulary', range: 'Preguntas 31–40' }
  return { number: 3, label: 'Reading', range: 'Preguntas 41–50' }
}
