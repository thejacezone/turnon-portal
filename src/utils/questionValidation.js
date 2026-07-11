export function validateQuestionBank(questions, expected = {}) {
  const summary = {
    total: questions.length,
    bySkill: {},
    byLevel: {},
    byTopic: {},
    duplicateIds: [],
    missingIds: [],
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

    if (!question.id) summary.missingIds.push(question.question || 'unknown-question')
    else if (seenIds.has(question.id)) summary.duplicateIds.push(question.id)
    if (question.id) seenIds.add(question.id)

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
  if (summary.missingIds.length) summary.errors.push(`Questions without IDs: ${summary.missingIds.join(', ')}.`)
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

export function validateReadingPracticeScenarios(scenarios) {
  const summary = {
    total: scenarios.length,
    questionTotal: scenarios.reduce((total, scenario) => total + (scenario.questions?.length || 0), 0),
    duplicateIds: [],
    duplicateSlugs: [],
    missingSlug: [],
    emptyPassage: [],
    missingQuestions: [],
    missingLevel: [],
    missingCategory: [],
    questionsWithoutOptions: [],
    questionsWithoutCorrectAnswer: [],
    questionsWithoutExplanation: [],
    correctAnswerOutsideOptions: [],
    errors: [],
  }

  const ids = new Set()
  const slugs = new Set()

  scenarios.forEach((scenario) => {
    if (ids.has(scenario.id)) summary.duplicateIds.push(scenario.id)
    ids.add(scenario.id)
    if (!scenario.slug) summary.missingSlug.push(scenario.id)
    else if (slugs.has(scenario.slug)) summary.duplicateSlugs.push(scenario.slug)
    slugs.add(scenario.slug)
    if (!scenario.passage) summary.emptyPassage.push(scenario.id)
    if (!scenario.questions?.length) summary.missingQuestions.push(scenario.id)
    if (!scenario.level) summary.missingLevel.push(scenario.id)
    if (!scenario.category) summary.missingCategory.push(scenario.id)

    scenario.questions?.forEach((question) => {
      if (!Array.isArray(question.options) || question.options.length < 2) summary.questionsWithoutOptions.push(question.id)
      if (!question.correctAnswer) summary.questionsWithoutCorrectAnswer.push(question.id)
      if (!question.explanation) summary.questionsWithoutExplanation.push(question.id)
      if (Array.isArray(question.options) && question.correctAnswer && !question.options.includes(question.correctAnswer)) summary.correctAnswerOutsideOptions.push(question.id)
    })
  })

  Object.entries(summary).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length) summary.errors.push(`${key}: ${value.join(', ')}`)
  })

  summary.valid = summary.errors.length === 0
  return summary
}

export function validateListeningPracticeItems(items) {
  const summary = {
    total: items.length,
    questionTotal: items.reduce((total, item) => total + (item.questions?.length || 0), 0),
    duplicateIds: [],
    duplicateSlugs: [],
    missingSlug: [],
    missingAudioUrl: [],
    invalidAudioUrl: [],
    missingTranscript: [],
    duplicateQuestionIds: [],
    missingQuestions: [],
    missingLevel: [],
    missingCategory: [],
    questionsWithoutOptions: [],
    questionsWithoutCorrectAnswer: [],
    questionsWithoutExplanation: [],
    correctAnswerOutsideOptions: [],
    errors: [],
  }

  const ids = new Set()
  const slugs = new Set()
  const questionIds = new Set()

  items.forEach((item) => {
    if (ids.has(item.id)) summary.duplicateIds.push(item.id)
    ids.add(item.id)
    if (!item.slug) summary.missingSlug.push(item.id)
    else if (slugs.has(item.slug)) summary.duplicateSlugs.push(item.slug)
    slugs.add(item.slug)
    if (!item.audioUrl) summary.missingAudioUrl.push(item.id)
    if (item.audioUrl && !item.audioUrl.startsWith('/audio/listening/')) summary.invalidAudioUrl.push(item.id)
    if (!item.transcript) summary.missingTranscript.push(item.id)
    if (!item.questions?.length) summary.missingQuestions.push(item.id)
    if (!item.level) summary.missingLevel.push(item.id)
    if (!item.category) summary.missingCategory.push(item.id)

    item.questions?.forEach((question) => {
      if (questionIds.has(question.id)) summary.duplicateQuestionIds.push(question.id)
      questionIds.add(question.id)
      if (!Array.isArray(question.options) || question.options.length < 2) summary.questionsWithoutOptions.push(question.id)
      if (!question.correctAnswer) summary.questionsWithoutCorrectAnswer.push(question.id)
      if (!question.explanation) summary.questionsWithoutExplanation.push(question.id)
      if (Array.isArray(question.options) && question.correctAnswer && !question.options.includes(question.correctAnswer)) summary.correctAnswerOutsideOptions.push(question.id)
    })
  })

  Object.entries(summary).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length) summary.errors.push(`${key}: ${value.join(', ')}`)
  })

  summary.valid = summary.errors.length === 0
  return summary
}

export function validateWorkVocabularyModules(modules) {
  const summary = {
    total: modules.length,
    duplicateIds: [],
    duplicateSlugs: [],
    missingSlug: [],
    missingTerms: [],
    duplicateTermIds: [],
    incompleteTerms: [],
    errors: [],
  }
  const ids = new Set()
  const slugs = new Set()
  const termIds = new Set()

  modules.forEach((module) => {
    if (ids.has(module.id)) summary.duplicateIds.push(module.id)
    ids.add(module.id)
    if (!module.slug) summary.missingSlug.push(module.id)
    else if (slugs.has(module.slug)) summary.duplicateSlugs.push(module.slug)
    if (module.slug) slugs.add(module.slug)
    if (!module.terms?.length) summary.missingTerms.push(module.id)
    module.terms?.forEach((term) => {
      if (termIds.has(term.id)) summary.duplicateTermIds.push(term.id)
      termIds.add(term.id)
      if (!term.id || !term.term || !term.translation || !term.definition || !term.example) summary.incompleteTerms.push(term.id || `${module.id}-unknown-term`)
    })
  })

  Object.entries(summary).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length) summary.errors.push(`${key}: ${value.join(', ')}`)
  })
  summary.valid = summary.errors.length === 0
  return summary
}

export function validateWritingPracticePrompts(prompts) {
  const summary = {
    total: prompts.length,
    duplicateIds: [],
    duplicateSlugs: [],
    missingSlug: [],
    emptyPrompt: [],
    missingLevel: [],
    missingCategory: [],
    missingTimeLimitMinutes: [],
    missingMinimumWords: [],
    missingTargetWords: [],
    errors: [],
  }

  const ids = new Set()
  const slugs = new Set()

  prompts.forEach((prompt) => {
    if (ids.has(prompt.id)) summary.duplicateIds.push(prompt.id)
    ids.add(prompt.id)
    if (!prompt.slug) summary.missingSlug.push(prompt.id)
    else if (slugs.has(prompt.slug)) summary.duplicateSlugs.push(prompt.slug)
    slugs.add(prompt.slug)
    if (!prompt.prompt) summary.emptyPrompt.push(prompt.id)
    if (!prompt.level) summary.missingLevel.push(prompt.id)
    if (!prompt.category) summary.missingCategory.push(prompt.id)
    if (!prompt.timeLimitMinutes) summary.missingTimeLimitMinutes.push(prompt.id)
    if (!prompt.minimumWords) summary.missingMinimumWords.push(prompt.id)
    if (!prompt.targetWords) summary.missingTargetWords.push(prompt.id)
  })

  Object.entries(summary).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length) summary.errors.push(`${key}: ${value.join(', ')}`)
  })

  summary.valid = summary.errors.length === 0
  return summary
}

export function validateTypingTestPassages(passages) {
  const summary = {
    total: passages.length,
    missingId: [],
    duplicateIds: [],
    duplicateSlugs: [],
    missingSlug: [],
    emptyText: [],
    missingCategory: [],
    missingLevel: [],
    missingDifficulty: [],
    errors: [],
  }

  const ids = new Set()
  const slugs = new Set()

  passages.forEach((passage) => {
    if (!passage.id) summary.missingId.push(passage.slug || 'unknown-passage')
    else if (ids.has(passage.id)) summary.duplicateIds.push(passage.id)
    if (passage.id) ids.add(passage.id)
    if (!passage.slug) summary.missingSlug.push(passage.id)
    else if (slugs.has(passage.slug)) summary.duplicateSlugs.push(passage.slug)
    slugs.add(passage.slug)
    if (!passage.text) summary.emptyText.push(passage.id)
    if (!passage.category) summary.missingCategory.push(passage.id)
    if (!passage.level) summary.missingLevel.push(passage.id)
    if (!passage.difficulty && !passage.estimatedDifficulty) summary.missingDifficulty.push(passage.id)
  })

  Object.entries(summary).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length) summary.errors.push(`${key}: ${value.join(', ')}`)
  })

  summary.valid = summary.errors.length === 0
  return summary
}
