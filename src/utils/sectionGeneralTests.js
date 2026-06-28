const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1']

export function shuffleArray(items) {
  return [...items].sort(() => Math.random() - 0.5)
}

function uniqueById(items) {
  const seen = new Set()
  return items.filter((item) => {
    if (seen.has(item.id)) return false
    seen.add(item.id)
    return true
  })
}

function percent(correct, total) {
  return total ? Math.round((correct / total) * 100) : 0
}

function emptyScore(label) {
  return { label, correct: 0, total: 0 }
}

function addScore(map, label, isCorrect) {
  map[label] ||= emptyScore(label)
  map[label].total += 1
  if (isCorrect) map[label].correct += 1
}

function scoreMapToRows(map) {
  return Object.values(map).map((item) => ({ label: item.label, value: `${item.correct}/${item.total}` }))
}

function band(correct, total) {
  const rate = total ? correct / total : 0
  if (rate >= 0.9) return 'alto'
  if (rate >= 0.75) return 'sólido'
  return 'bajo'
}

export function getEstimatedLevelFromLevelScores(byLevel) {
  let estimated = 'Pre-A1 / En desarrollo'

  for (const level of levelOrder) {
    const current = byLevel[level]
    if (!current?.total) continue
    const sustained = current.correct / current.total >= 0.6
    const previousNotExtremelyLow = levelOrder.slice(0, levelOrder.indexOf(level)).every((previous) => !byLevel[previous]?.total || byLevel[previous].correct / byLevel[previous].total >= 0.4)
    if (sustained && previousNotExtremelyLow) estimated = `${level} ${band(current.correct, current.total)}`
  }

  return estimated
}

function buildReview(items, answers) {
  return items.map((item) => ({
    ...item,
    selectedAnswer: answers[item.id],
    isCorrect: answers[item.id] === item.correctAnswer,
  }))
}

function rankGroupedScores(map, threshold, direction = 'strong') {
  return Object.values(map)
    .map((item) => ({ ...item, rate: item.total ? item.correct / item.total : 0 }))
    .filter((item) => direction === 'strong' ? item.rate >= threshold : item.rate < threshold)
    .sort((a, b) => direction === 'strong' ? b.rate - a.rate || b.total - a.total : a.rate - b.rate || b.total - a.total)
    .slice(0, 5)
    .map((item) => item.label)
}

export function generateGrammarGeneralTest(questions) {
  const cleanQuestions = uniqueById(questions).filter((question) => question.options?.length && question.correctAnswer)
  if (!cleanQuestions.length) return []

  const selected = []
  const perLevelTarget = Math.max(1, Math.floor(Math.min(20, cleanQuestions.length) / levelOrder.length))
  levelOrder.forEach((level) => {
    selected.push(...shuffleArray(cleanQuestions.filter((question) => question.level === level)).slice(0, perLevelTarget))
  })

  const remaining = shuffleArray(cleanQuestions.filter((question) => !selected.some((item) => item.id === question.id)))
  return uniqueById([...selected, ...remaining]).slice(0, Math.min(20, cleanQuestions.length)).map((question) => ({
    id: `grammar-general-${question.id}`,
    sourceId: question.id,
    question: question.question,
    options: question.options,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    level: question.level,
    topic: question.topic,
    tags: [question.level, question.topic],
  }))
}

export function scoreGrammarGeneralTest(items, answers) {
  const review = buildReview(items, answers)
  const correct = review.filter((item) => item.isCorrect).length
  const byLevel = {}
  const byTopic = {}

  review.forEach((item) => {
    addScore(byLevel, item.level, item.isCorrect)
    addScore(byTopic, item.topic, item.isCorrect)
  })

  const reinforceTopics = rankGroupedScores(byTopic, 0.75, 'weak')
  const estimatedLevel = getEstimatedLevelFromLevelScores(byLevel)

  return {
    estimatedLevel,
    correct,
    total: items.length,
    percentage: percent(correct, items.length),
    scoreBlocks: [
      { title: 'Puntaje por nivel', rows: scoreMapToRows(byLevel) },
      { title: 'Puntaje por tema', rows: scoreMapToRows(byTopic).slice(0, 8) },
    ],
    strongItemsTitle: 'Temas fuertes',
    strongItems: rankGroupedScores(byTopic, 0.75, 'strong'),
    reinforceItemsTitle: 'Temas a reforzar',
    reinforceItems: reinforceTopics,
    recommendation: `Tu resultado estimado es ${estimatedLevel}. ${reinforceTopics.length ? `Reforzá ${reinforceTopics.slice(0, 3).join(', ')} antes de subir dificultad.` : 'Mantené la práctica con temas mixtos para consolidar precisión.'}`,
    review,
  }
}

function allVocabularyTerms(modules) {
  return modules.flatMap((module) => module.terms.map((term) => ({ ...term, moduleId: module.id, moduleTitle: module.title, moduleCategory: module.category })))
}

function fallbackOptions(terms, currentTerm, field) {
  return shuffleArray(terms.filter((term) => term.id !== currentTerm.id).map((term) => term[field])).slice(0, 3)
}

function optionsWithCorrect(correct, distractors) {
  return shuffleArray([...new Set([correct, ...distractors])].slice(0, 4))
}

export function generateVocabularyGeneralTest(modules) {
  const terms = allVocabularyTerms(modules).filter((term) => term.term && term.translation && term.definition && term.example)
  if (!terms.length) return []

  const byDifficulty = ['basic', 'intermediate', 'advanced'].flatMap((difficulty) => shuffleArray(terms.filter((term) => term.difficulty === difficulty)).slice(0, 8))
  const selected = uniqueById([...byDifficulty, ...shuffleArray(terms)]).slice(0, Math.min(25, terms.length))

  return selected.map((term, index) => {
    const type = index % 3
    if (type === 1) {
      const question = term.example.replace(new RegExp(`\\b${term.term}\\b`, 'i'), '___')
      return {
        id: `vocabulary-general-${term.id}-sentence`,
        termId: term.id,
        term: term.term,
        question: `Complete the sentence: ${question}`,
        options: optionsWithCorrect(term.term, fallbackOptions(terms, term, 'term')),
        correctAnswer: term.term,
        explanation: `${term.term}: ${term.definition}`,
        difficulty: term.difficulty,
        moduleTitle: term.moduleTitle,
        tags: [term.moduleTitle, term.difficulty],
      }
    }
    if (type === 2) {
      return {
        id: `vocabulary-general-${term.id}-translation`,
        termId: term.id,
        term: term.term,
        question: `How do you say “${term.translation.split('/')[0].trim()}” in English?`,
        options: optionsWithCorrect(term.term, fallbackOptions(terms, term, 'term')),
        correctAnswer: term.term,
        explanation: `${term.term}: ${term.definition}`,
        difficulty: term.difficulty,
        moduleTitle: term.moduleTitle,
        tags: [term.moduleTitle, term.difficulty],
      }
    }
    return {
      id: `vocabulary-general-${term.id}-meaning`,
      termId: term.id,
      term: term.term,
      question: `What does “${term.term}” mean?`,
      options: optionsWithCorrect(term.translation, fallbackOptions(terms, term, 'translation')),
      correctAnswer: term.translation,
      explanation: `${term.term}: ${term.definition} Example: ${term.example}`,
      difficulty: term.difficulty,
      moduleTitle: term.moduleTitle,
      tags: [term.moduleTitle, term.difficulty],
    }
  })
}

function estimateVocabularyLevel(percentage, byDifficulty) {
  const advancedCorrect = byDifficulty.advanced?.correct || 0
  const intermediate = byDifficulty.intermediate
  const intermediateRate = intermediate?.total ? intermediate.correct / intermediate.total : 0
  const basic = byDifficulty.basic
  const basicRate = basic?.total ? basic.correct / basic.total : 0

  if (percentage < 50) return 'Vocabulario en desarrollo'
  if (percentage >= 86 && advancedCorrect >= 3) return 'C1 aproximado'
  if (percentage >= 76 && intermediateRate >= 0.65) return 'B2 aproximado'
  if (percentage >= 66 && (basicRate >= 0.65 || intermediateRate >= 0.55)) return 'B1 aproximado'
  return 'A2 aproximado'
}

export function scoreVocabularyGeneralTest(items, answers) {
  const review = buildReview(items, answers)
  const correct = review.filter((item) => item.isCorrect).length
  const percentage = percent(correct, items.length)
  const byDifficulty = {}
  const byModule = {}
  review.forEach((item) => {
    addScore(byDifficulty, item.difficulty, item.isCorrect)
    addScore(byModule, item.moduleTitle, item.isCorrect)
  })
  const missedTerms = review.filter((item) => !item.isCorrect).map((item) => item.term).slice(0, 8)
  const estimatedLevel = estimateVocabularyLevel(percentage, byDifficulty)

  return {
    estimatedLevel,
    correct,
    total: items.length,
    percentage,
    scoreBlocks: [
      { title: 'Puntaje por dificultad', rows: scoreMapToRows(byDifficulty) },
      { title: 'Puntaje por módulo', rows: scoreMapToRows(byModule).slice(0, 8) },
    ],
    strongItemsTitle: 'Módulos fuertes',
    strongItems: rankGroupedScores(byModule, 0.75, 'strong'),
    reinforceItemsTitle: 'Módulos a reforzar',
    reinforceItems: rankGroupedScores(byModule, 0.75, 'weak'),
    missedItemsTitle: 'Términos fallados',
    missedItems: missedTerms,
    recommendation: `${estimatedLevel}. ${missedTerms.length ? `Repasá ${missedTerms.slice(0, 4).join(', ')} y repetí el check con una nueva mezcla.` : 'Buen rango de vocabulario laboral. Probá módulos específicos para ampliar precisión.'}`,
    review,
  }
}

export function generateReadingGeneralTest(scenarios) {
  const cleanScenarios = uniqueById(scenarios).filter((scenario) => scenario.passage && scenario.questions?.length)
  if (!cleanScenarios.length) return []

  const selected = []
  const levels = shuffleArray(levelOrder)
  levels.forEach((level) => {
    const candidate = shuffleArray(cleanScenarios.filter((scenario) => scenario.level === level && !selected.some((item) => item.id === scenario.id)))[0]
    if (candidate && selected.length < 4) selected.push(candidate)
  })
  shuffleArray(cleanScenarios).forEach((scenario) => {
    if (selected.length < 4 && !selected.some((item) => item.id === scenario.id)) selected.push(scenario)
  })

  return selected.slice(0, 4).flatMap((scenario) => scenario.questions.map((question) => ({
    id: `reading-general-${scenario.id}-${question.id}`,
    sourceId: question.id,
    scenarioId: scenario.id,
    scenarioTitle: scenario.title,
    passage: scenario.passage,
    question: question.question,
    options: question.options,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    questionType: question.type,
    level: scenario.level,
    textType: scenario.type,
    tags: [scenario.level, scenario.type.replaceAll('_', ' '), question.type.replaceAll('_', ' ')],
  }))).slice(0, 20)
}

export function scoreReadingGeneralTest(items, answers) {
  const review = buildReview(items, answers)
  const correct = review.filter((item) => item.isCorrect).length
  const byLevel = {}
  const byQuestionType = {}
  const byTextType = {}
  const byScenario = {}

  review.forEach((item) => {
    addScore(byLevel, item.level, item.isCorrect)
    addScore(byQuestionType, item.questionType.replaceAll('_', ' '), item.isCorrect)
    addScore(byTextType, item.textType.replaceAll('_', ' '), item.isCorrect)
    addScore(byScenario, item.scenarioTitle, item.isCorrect)
  })

  const estimatedLevel = getEstimatedLevelFromLevelScores(byLevel)
  const weakTypes = rankGroupedScores(byQuestionType, 0.75, 'weak')

  return {
    estimatedLevel,
    correct,
    total: items.length,
    percentage: percent(correct, items.length),
    scoreBlocks: [
      { title: 'Puntaje por nivel', rows: scoreMapToRows(byLevel) },
      { title: 'Puntaje por tipo de pregunta', rows: scoreMapToRows(byQuestionType) },
      { title: 'Puntaje por tipo de texto', rows: scoreMapToRows(byTextType) },
    ],
    strongItemsTitle: 'Escenarios fuertes',
    strongItems: rankGroupedScores(byScenario, 0.75, 'strong'),
    reinforceItemsTitle: 'Escenarios a reforzar',
    reinforceItems: rankGroupedScores(byScenario, 0.75, 'weak'),
    missedItemsTitle: 'Tipos de pregunta a reforzar',
    missedItems: weakTypes,
    recommendation: `Tu reading está cerca de ${estimatedLevel}. ${weakTypes.length ? `Reforzá ${weakTypes.slice(0, 3).join(', ')} antes de subir dificultad.` : 'Buen resultado: probá escenarios más altos o textos de otro tipo.'}`,
    review,
  }
}
