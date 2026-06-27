export function validateQuestionBank(questions, expected = {}) {
  const summary = {
    total: questions.length,
    bySkill: {},
    byLevel: {},
    byTopic: {},
    duplicateIds: [],
    missingCorrectAnswer: [],
    missingExplanation: [],
    missingOptions: [],
    correctAnswerOutsideOptions: [],
    errors: [],
  }

  const seenIds = new Set()

  questions.forEach((question) => {
    if (question.skill) summary.bySkill[question.skill] = (summary.bySkill[question.skill] || 0) + 1
    if (question.level) summary.byLevel[question.level] = (summary.byLevel[question.level] || 0) + 1
    if (question.topic) summary.byTopic[question.topic] = (summary.byTopic[question.topic] || 0) + 1

    if (seenIds.has(question.id)) summary.duplicateIds.push(question.id)
    seenIds.add(question.id)

    if (!question.correctAnswer) summary.missingCorrectAnswer.push(question.id)
    if (!question.explanation) summary.missingExplanation.push(question.id)
    if (!Array.isArray(question.options) || question.options.length < 2) summary.missingOptions.push(question.id)
    if (Array.isArray(question.options) && question.correctAnswer && !question.options.includes(question.correctAnswer)) summary.correctAnswerOutsideOptions.push(question.id)
  })

  if (expected.total && summary.total !== expected.total) summary.errors.push(`Expected ${expected.total} questions, found ${summary.total}.`)

  Object.entries(expected.bySkill || {}).forEach(([skill, count]) => {
    if ((summary.bySkill[skill] || 0) !== count) summary.errors.push(`Expected ${count} ${skill} questions, found ${summary.bySkill[skill] || 0}.`)
  })

  Object.entries(expected.byLevel || {}).forEach(([level, count]) => {
    if ((summary.byLevel[level] || 0) !== count) summary.errors.push(`Expected ${count} ${level} questions, found ${summary.byLevel[level] || 0}.`)
  })

  if (summary.duplicateIds.length) summary.errors.push(`Duplicate question IDs: ${summary.duplicateIds.join(', ')}.`)
  if (summary.missingCorrectAnswer.length) summary.errors.push(`Missing correct answers: ${summary.missingCorrectAnswer.join(', ')}.`)
  if (summary.missingExplanation.length) summary.errors.push(`Missing explanations: ${summary.missingExplanation.join(', ')}.`)
  if (summary.missingOptions.length) summary.errors.push(`Missing or invalid options: ${summary.missingOptions.join(', ')}.`)
  if (summary.correctAnswerOutsideOptions.length) summary.errors.push(`Correct answer outside options: ${summary.correctAnswerOutsideOptions.join(', ')}.`)

  summary.valid = summary.errors.length === 0
  return summary
}

export const workEnglishTest3ExpectedShape = {
  total: 50,
  bySkill: { grammar: 20, vocabulary: 15, reading: 15 },
  byLevel: { A1: 10, A2: 10, B1: 10, B2: 10, C1: 10 },
}

export const generalEnglishTestExpectedShape = {
  total: 50,
  bySkill: { grammar: 20, vocabulary: 15, reading: 15 },
}
