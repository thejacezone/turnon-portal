const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1']

export function filterListeningItems(items, filters) {
  return items.filter((item) => {
    const haystack = [item.title, item.summary, item.category, item.context, item.level, item.transcript, item.vocabulary?.map((word) => word.term).join(' ')].join(' ').toLowerCase()
    const matchesQuery = haystack.includes((filters.query || '').toLowerCase())
    const matchesLevel = filters.level === 'Todos' || item.level === filters.level
    const matchesCategory = filters.category === 'Todos' || item.category === filters.category
    const matchesContext = filters.context === 'Todos' || item.context === filters.context
    return matchesQuery && matchesLevel && matchesCategory && matchesContext
  })
}

export function getListeningRecommendation(percentage) {
  if (percentage < 50) return 'Repetí el audio y enfocáte en palabras clave como nombres, fechas, números, acciones y solicitudes.'
  if (percentage <= 75) return 'Buen avance. Reforzá detalles específicos y vocabulario en contexto.'
  return 'Buen resultado. Probá otro audio o subí a un nivel más alto.'
}

export function getListeningQuestionTypeStats(itemOrQuestions, answers) {
  const questions = Array.isArray(itemOrQuestions) ? itemOrQuestions : itemOrQuestions.questions
  return questions.reduce((stats, question) => {
    stats[question.type] ||= { correct: 0, total: 0 }
    stats[question.type].total += 1
    if (answers[question.id] === question.correctAnswer) stats[question.type].correct += 1
    return stats
  }, {})
}

export function calculateListeningResult(item, answers) {
  const review = item.questions.map((question) => ({
    ...question,
    selectedAnswer: answers[question.id],
    isCorrect: answers[question.id] === question.correctAnswer,
  }))
  const correct = review.filter((question) => question.isCorrect).length
  const percentage = item.questions.length ? Math.round((correct / item.questions.length) * 100) : 0
  const typeStats = getListeningQuestionTypeStats(item, answers)
  const missedQuestionTypes = Object.entries(typeStats).filter(([, value]) => value.correct < value.total).map(([type]) => type)
  const missedVocabularyTerms = review
    .filter((question) => !question.isCorrect && question.type === 'vocabulary_in_context')
    .map((question) => item.vocabulary?.find((word) => question.question.toLowerCase().includes(word.term.toLowerCase()))?.term)
    .filter(Boolean)

  return {
    correct,
    total: item.questions.length,
    percentage,
    level: item.level,
    missedQuestionTypes,
    missedVocabularyTerms: [...new Set(missedVocabularyTerms)],
    recommendation: getListeningRecommendation(percentage),
    review,
    typeStats,
  }
}

function shuffleArray(items) {
  return [...items].sort(() => Math.random() - 0.5)
}

function addScore(map, label, isCorrect) {
  map[label] ||= { label, correct: 0, total: 0 }
  map[label].total += 1
  if (isCorrect) map[label].correct += 1
}

function scoreRows(map) {
  return Object.values(map).map((item) => ({ label: item.label, value: `${item.correct}/${item.total}` }))
}

function estimatedLevel(byLevel) {
  let estimated = 'Pre-A1 / En desarrollo'
  for (const level of levelOrder) {
    const score = byLevel[level]
    if (score?.total && score.correct / score.total >= 0.6) estimated = `${level} aproximado`
  }
  return estimated
}

export function generateListeningGeneralTest(items) {
  const validItems = items.filter((item) => item.audioUrl && item.questions?.length)
  const selectedItems = shuffleArray(validItems).slice(0, Math.min(5, Math.max(3, validItems.length)))
  return selectedItems.flatMap((item) => item.questions.map((question) => ({
    ...question,
    id: `listening-general-${item.id}-${question.id}`,
    sourceQuestionId: question.id,
    audioTitle: item.title,
    audioUrl: item.audioUrl,
    audioType: item.audioType || 'audio/mpeg',
    level: item.level,
    context: item.context,
    category: item.category,
    tags: [item.level, item.context, question.type.replaceAll('_', ' ')],
  }))).slice(0, 20)
}

export function scoreListeningGeneralTest(items, answers) {
  const review = items.map((question) => ({
    ...question,
    selectedAnswer: answers[question.id],
    isCorrect: answers[question.id] === question.correctAnswer,
  }))
  const correct = review.filter((question) => question.isCorrect).length
  const percentage = items.length ? Math.round((correct / items.length) * 100) : 0
  const byLevel = {}
  const byType = {}
  const byContext = {}
  const byAudio = {}

  review.forEach((question) => {
    addScore(byLevel, question.level, question.isCorrect)
    addScore(byType, question.type.replaceAll('_', ' '), question.isCorrect)
    addScore(byContext, question.context, question.isCorrect)
    addScore(byAudio, question.audioTitle, question.isCorrect)
  })

  const weakTypes = Object.values(byType).filter((item) => item.correct < item.total).map((item) => item.label)
  const strongAudios = Object.values(byAudio).filter((item) => item.total && item.correct / item.total >= 0.75).map((item) => item.label)
  const weakAudios = Object.values(byAudio).filter((item) => item.total && item.correct / item.total < 0.75).map((item) => item.label)

  return {
    estimatedLevel: estimatedLevel(byLevel),
    correct,
    total: items.length,
    percentage,
    scoreBlocks: [
      { title: 'Puntaje por nivel', rows: scoreRows(byLevel) },
      { title: 'Puntaje por tipo de pregunta', rows: scoreRows(byType) },
      { title: 'Puntaje por contexto', rows: scoreRows(byContext) },
    ],
    strongItemsTitle: 'Audios fuertes',
    strongItems: strongAudios,
    reinforceItemsTitle: 'Audios a reforzar',
    reinforceItems: weakAudios,
    missedItemsTitle: 'Tipos de pregunta a reforzar',
    missedItems: weakTypes,
    recommendation: `Resultado estimado, no certificación oficial. ${getListeningRecommendation(percentage)}`,
    review,
  }
}
