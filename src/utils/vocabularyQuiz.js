export function shuffleArray(items) {
  return [...items].sort(() => Math.random() - 0.5)
}

export function getRandomTerms(terms, count) {
  return shuffleArray(terms).slice(0, Math.min(count, terms.length))
}

function uniqueOptions(options) {
  return [...new Set(options)].filter(Boolean).slice(0, 4)
}

function fallbackDistractors(allTerms, currentTerm, field) {
  return shuffleArray(allTerms.filter((term) => term.id !== currentTerm.id).map((term) => term[field])).slice(0, 3)
}

export function generateVocabularyQuiz(module, allModules, count = 10) {
  const allTerms = allModules.flatMap((item) => item.terms)
  const selectedTerms = getRandomTerms(module.terms, count)

  return selectedTerms.map((term, index) => {
    const questionType = index % 3

    if (questionType === 1) {
      return {
        id: `vq-${term.id}-sentence`,
        termId: term.id,
        term: term.term,
        prompt: term.example.replace(new RegExp(`\\b${term.term}\\b`, 'i'), '___'),
        question: `Complete the sentence: ${term.example.replace(new RegExp(`\\b${term.term}\\b`, 'i'), '___')}`,
        options: shuffleArray(uniqueOptions([term.term, ...fallbackDistractors(allTerms, term, 'term')])),
        correctAnswer: term.term,
        type: 'sentence',
      }
    }

    if (questionType === 2) {
      return {
        id: `vq-${term.id}-translation`,
        termId: term.id,
        term: term.term,
        question: `How do you say “${term.translation.split('/')[0].trim()}” in English?`,
        options: shuffleArray(uniqueOptions([term.term, ...fallbackDistractors(allTerms, term, 'term')])),
        correctAnswer: term.term,
        type: 'translation',
      }
    }

    return {
      id: `vq-${term.id}-meaning`,
      termId: term.id,
      term: term.term,
      question: `What does “${term.term}” mean?`,
      options: shuffleArray(uniqueOptions([term.translation, ...fallbackDistractors(allTerms, term, 'translation')])),
      correctAnswer: term.translation,
      type: 'meaning',
    }
  })
}

export function calculateVocabularyResult(quiz, answers, module) {
  const correctQuestions = quiz.filter((question) => answers[question.id] === question.correctAnswer)
  const missedQuestions = quiz.filter((question) => answers[question.id] !== question.correctAnswer)
  const correctTerms = correctQuestions.map((question) => question.term)
  const missedTerms = missedQuestions.map((question) => question.term)
  const percentage = quiz.length ? Math.round((correctQuestions.length / quiz.length) * 100) : 0

  let recommendation = 'Buen inicio. Repasá los términos fallados y repetí el mini examen.'
  if (percentage >= 85) recommendation = 'Muy buen avance. Probá repetir con más preguntas o pasar a otro módulo.'
  else if (percentage >= 70) recommendation = 'Buen avance. Repasá los términos fallados antes de seguir.'
  else if (percentage < 50) recommendation = 'Conviene estudiar la lista y practicar flashcards antes de repetir el examen.'

  return {
    correct: correctQuestions.length,
    total: quiz.length,
    percentage,
    moduleTitle: module.title,
    correctTerms,
    missedTerms,
    recommendation,
  }
}
