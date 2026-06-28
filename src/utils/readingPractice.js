export function filterReadingScenarios(scenarios, filters) {
  return scenarios.filter((scenario) => {
    const haystack = [
      scenario.title,
      scenario.summary,
      scenario.category,
      scenario.context,
      scenario.type,
      scenario.level,
      scenario.passage,
      scenario.vocabulary?.map((item) => item.term).join(' '),
    ].join(' ').toLowerCase()

    const matchesQuery = haystack.includes((filters.query || '').toLowerCase())
    const matchesLevel = filters.level === 'Todos' || scenario.level === filters.level
    const matchesCategory = filters.category === 'Todos' || scenario.category === filters.category
    const matchesContext = filters.context === 'Todos' || scenario.context === filters.context
    const matchesType = filters.type === 'Todos' || scenario.type === filters.type

    return matchesQuery && matchesLevel && matchesCategory && matchesContext && matchesType
  })
}

export function getQuestionTypeStats(scenario, answers) {
  return scenario.questions.reduce((stats, question) => {
    stats[question.type] ||= { correct: 0, total: 0 }
    stats[question.type].total += 1
    if (answers[question.id] === question.correctAnswer) stats[question.type].correct += 1
    return stats
  }, {})
}

export function getReadingRecommendation(percentage) {
  if (percentage < 50) return 'Releé el texto con calma y buscá palabras clave antes de responder.'
  if (percentage <= 75) return 'Vas bien. Reforzá detalles específicos y vocabulario en contexto.'
  return 'Buen resultado. Probá un escenario de nivel más alto.'
}

export function calculateReadingResult(scenario, answers) {
  const review = scenario.questions.map((question) => ({
    ...question,
    selectedAnswer: answers[question.id],
    isCorrect: answers[question.id] === question.correctAnswer,
  }))
  const correct = review.filter((question) => question.isCorrect).length
  const percentage = scenario.questions.length ? Math.round((correct / scenario.questions.length) * 100) : 0
  const typeStats = getQuestionTypeStats(scenario, answers)
  const missedQuestionTypes = Object.entries(typeStats)
    .filter(([, value]) => value.correct < value.total)
    .map(([type]) => type)
  const missedVocabularyTerms = review
    .filter((question) => !question.isCorrect && question.type === 'vocabulary_in_context')
    .map((question) => scenario.vocabulary?.find((item) => question.question.toLowerCase().includes(item.term.toLowerCase()))?.term)
    .filter(Boolean)

  return {
    correct,
    total: scenario.questions.length,
    percentage,
    level: scenario.level,
    missedQuestionTypes,
    missedVocabularyTerms: [...new Set(missedVocabularyTerms)],
    recommendation: getReadingRecommendation(percentage),
    review,
    typeStats,
  }
}
