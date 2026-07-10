const connectors = ['because', 'also', 'but', 'however', 'first', 'then', 'finally', 'so', 'therefore', 'for example', 'in addition']

const workVocabularyByCategory = {
  Interview: ['experience', 'position', 'skills', 'strength', 'team', 'customer', 'professional', 'learn', 'grow', 'responsible', 'hire'],
  'Customer Service': ['customer', 'help', 'support', 'issue', 'problem', 'solution', 'apologize', 'delay', 'update', 'case', 'resolve'],
  'Professional Email': ['schedule', 'request', 'confirm', 'information', 'interview', 'available', 'thank', 'regards', 'help', 'task', 'email'],
  'Work Experience': ['job', 'responsibilities', 'training', 'learned', 'organized', 'tasks', 'team', 'manager', 'work', 'experience'],
  'Training and Workplace': ['training', 'feedback', 'supervisor', 'task', 'mistake', 'improve', 'learn', 'questions', 'notes', 'team'],
}

function normalize(text) {
  return text.toLowerCase()
}

export function countWords(text) {
  return (text.trim().match(/[A-Za-zÀ-ÿ0-9]+(?:['-][A-Za-zÀ-ÿ0-9]+)?/g) || []).length
}

export function countSentences(text) {
  const matches = text.trim().match(/[^.!?]+[.!?]+/g)
  if (matches) return matches.length
  return text.trim() ? 1 : 0
}

export function calculateWpm(totalWords, secondsUsed) {
  if (!totalWords || !secondsUsed || secondsUsed <= 0) return 0
  return Number((totalWords / (secondsUsed / 60)).toFixed(1))
}

export function formatWritingTime(seconds) {
  const safeSeconds = Math.max(0, Math.round(seconds || 0))
  const minutes = Math.floor(safeSeconds / 60)
  const remainingSeconds = safeSeconds % 60
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`
}

export function evaluateWordCount(prompt, wordCount) {
  if (wordCount < prompt.minimumWords) {
    return { status: 'Necesita más desarrollo', reachedMinimum: false, reachedTarget: false, message: `Te faltan ${prompt.minimumWords - wordCount} palabras para llegar al mínimo.` }
  }
  if (wordCount < prompt.targetWords) {
    return { status: 'Mínimo alcanzado', reachedMinimum: true, reachedTarget: false, message: 'Alcanzaste el mínimo. Podés agregar un ejemplo para desarrollar más la respuesta.' }
  }
  return { status: 'Buen desarrollo', reachedMinimum: true, reachedTarget: true, message: 'Alcanzaste el objetivo de palabras para este ejercicio.' }
}

export function evaluateWritingSpeed(wpm) {
  if (wpm < 20) return { status: 'Velocidad baja', metTarget: false, message: 'Antes de escribir, hacé un mini esquema mental: idea principal, ejemplo y cierre.' }
  if (wpm < 30) return { status: 'En desarrollo', metTarget: false, message: 'Vas en camino. Intentá escribir frases completas sin detenerte demasiado.' }
  if (wpm < 40) return { status: 'Aceptable', metTarget: true, message: 'Alcanzaste la meta sugerida de 30 WPM para este ejercicio.' }
  return { status: 'Fuerte', metTarget: true, message: 'Buena velocidad. Ahora enfocáte en sonar más natural y específico.' }
}

export function detectBasicConnectors(text) {
  const normalized = normalize(text)
  return connectors.filter((connector) => normalized.includes(connector))
}

export function detectWorkVocabulary(text, category) {
  const normalized = normalize(text)
  const categoryWords = workVocabularyByCategory[category] || Object.values(workVocabularyByCategory).flat()
  return [...new Set(categoryWords.filter((word) => normalized.includes(word)))]
}

export function estimateWritingLevel({ wordCount, sentenceCount, connectorCount, workVocabularyCount, reachedMinimum, reachedTarget }) {
  if (!reachedMinimum && wordCount < 40) return 'Pre-A1 / En desarrollo'
  if (wordCount < 70) return 'A1 aproximado'
  if (wordCount < 100) return sentenceCount >= 2 ? 'A2 aproximado' : 'A1 aproximado'
  if (wordCount < 140) return connectorCount >= 1 && reachedMinimum ? 'B1 aproximado' : 'A2 aproximado'
  if (wordCount < 180) return connectorCount >= 1 && workVocabularyCount >= 2 && reachedTarget ? 'B2 aproximado' : 'B1 aproximado'
  return connectorCount >= 2 && workVocabularyCount >= 3 ? 'C1 aproximado' : 'B2 aproximado'
}

export function getWritingRecommendation({ wordCountResult, speedResult, sentenceCount, connectorsFound, workVocabularyFound, level }) {
  if (!wordCountResult.reachedMinimum) return 'Intentá agregar ejemplos concretos de experiencia, training o customer service para alcanzar el mínimo de palabras.'
  if (!speedResult.metTarget) return speedResult.message
  if (sentenceCount < 3 || connectorsFound.length === 0) return 'Usá una estructura simple: introducción, explicación y cierre. Agregá conectores como because, also, first o finally.'
  if (workVocabularyFound.length < 2) return 'Sumá vocabulario laboral específico para que la respuesta suene más conectada con entrevistas, training o customer service.'
  if (level.includes('B2') || level.includes('C1')) return 'Buen avance. Probá prompts B1/B2 y enfocáte en sonar más natural, específico y profesional.'
  return 'Vas bien. Repetí este ejercicio intentando organizar tus ideas antes de escribir y agregar un ejemplo concreto.'
}

export function evaluateWritingResponse(prompt, text, secondsUsed) {
  const wordCount = countWords(text)
  const characterCount = text.length
  const sentenceCount = countSentences(text)
  const wpm = calculateWpm(wordCount, secondsUsed)
  const wordCountResult = evaluateWordCount(prompt, wordCount)
  const speedResult = evaluateWritingSpeed(wpm)
  const connectorsFound = detectBasicConnectors(text)
  const workVocabularyFound = detectWorkVocabulary(text, prompt.category)
  const level = estimateWritingLevel({
    wordCount,
    sentenceCount,
    connectorCount: connectorsFound.length,
    workVocabularyCount: workVocabularyFound.length,
    reachedMinimum: wordCountResult.reachedMinimum,
    reachedTarget: wordCountResult.reachedTarget,
  })
  const taskCompletion = Boolean(text.trim()) && wordCountResult.reachedMinimum

  return {
    prompt,
    text,
    wordCount,
    characterCount,
    sentenceCount,
    secondsUsed,
    minutesUsed: secondsUsed / 60,
    formattedTime: formatWritingTime(secondsUsed),
    wpm,
    wordCountResult,
    speedResult,
    connectorsFound,
    workVocabularyFound,
    taskCompletion,
    reachedMinimum: wordCountResult.reachedMinimum,
    reachedTarget: wordCountResult.reachedTarget,
    level,
    recommendation: getWritingRecommendation({ wordCountResult, speedResult, sentenceCount, connectorsFound, workVocabularyFound, level }),
  }
}

function shuffleArray(items) {
  return [...items].sort(() => Math.random() - 0.5)
}

export function generateWritingGeneralTest(prompts) {
  const selected = []
  const categories = shuffleArray([...new Set(prompts.map((prompt) => prompt.category))])

  categories.forEach((category) => {
    if (selected.length >= 3) return
    const categoryPrompt = shuffleArray(prompts.filter((prompt) => prompt.category === category))[0]
    if (categoryPrompt) selected.push(categoryPrompt)
  })

  if (selected.length < 3) {
    shuffleArray(prompts).forEach((prompt) => {
      if (selected.length < 3 && !selected.some((item) => item.id === prompt.id)) selected.push(prompt)
    })
  }

  return selected
}

export function calculateWritingGeneralResult(prompts, responses) {
  const results = prompts.map((prompt) => evaluateWritingResponse(prompt, responses[prompt.id]?.text || '', responses[prompt.id]?.secondsUsed || 0))
  const totalWords = results.reduce((total, result) => total + result.wordCount, 0)
  const totalSeconds = results.reduce((total, result) => total + result.secondsUsed, 0)
  const averageWpm = calculateWpm(totalWords, totalSeconds)
  const completedPrompts = results.filter((result) => result.taskCompletion).length
  const categoryScores = results.reduce((scores, result) => {
    scores[result.prompt.category] ||= { category: result.prompt.category, total: 0, strong: 0 }
    scores[result.prompt.category].total += 1
    if (result.reachedMinimum && result.speedResult.metTarget && result.sentenceCount >= 3) scores[result.prompt.category].strong += 1
    return scores
  }, {})
  const strongCategories = Object.values(categoryScores).filter((item) => item.strong === item.total).map((item) => item.category)
  const reinforceCategories = Object.values(categoryScores).filter((item) => item.strong < item.total).map((item) => item.category)
  const connectorCount = new Set(results.flatMap((result) => result.connectorsFound)).size
  const workVocabularyCount = new Set(results.flatMap((result) => result.workVocabularyFound)).size
  const averageWordsPerPrompt = prompts.length ? Math.round(totalWords / prompts.length) : 0
  const overallLevel = estimateWritingLevel({
    wordCount: averageWordsPerPrompt,
    sentenceCount: results.reduce((total, result) => total + result.sentenceCount, 0),
    connectorCount,
    workVocabularyCount,
    reachedMinimum: completedPrompts >= 2,
    reachedTarget: results.filter((result) => result.reachedTarget).length >= 2,
  })
  const lowWpm = averageWpm < 30
  const missingWords = completedPrompts < prompts.length
  const weakStructure = results.some((result) => result.sentenceCount < 3 || result.connectorsFound.length === 0)

  let recommendation = 'Buen avance. Probá prompts B1/B2 y enfocáte en sonar más natural.'
  if (missingWords) recommendation = 'Intentá agregar ejemplos concretos de experiencia, training o customer service para completar cada prompt.'
  else if (lowWpm) recommendation = 'Antes de escribir, hacé un mini esquema mental: idea principal, ejemplo y cierre.'
  else if (weakStructure) recommendation = 'Usá una estructura simple: introducción, explicación y cierre. Agregá conectores claros.'

  return {
    results,
    totalWords,
    totalSeconds,
    formattedTotalTime: formatWritingTime(totalSeconds),
    averageWpm,
    completedPrompts,
    totalPrompts: prompts.length,
    overallLevel,
    strongCategories,
    reinforceCategories,
    recommendation: `${recommendation} Esta estimación no evalúa pronunciación ni gramática avanzada porque no usa IA ni revisión humana.`,
  }
}

export function filterWritingPrompts(prompts, filters) {
  return prompts.filter((prompt) => {
    const haystack = [prompt.title, prompt.level, prompt.category, prompt.context, prompt.prompt, prompt.instructions, prompt.evaluationFocus.join(' ')].join(' ').toLowerCase()
    const matchesQuery = haystack.includes((filters.query || '').toLowerCase())
    const matchesLevel = filters.level === 'Todos' || prompt.level === filters.level
    const matchesCategory = filters.category === 'Todos' || prompt.category === filters.category
    return matchesQuery && matchesLevel && matchesCategory
  })
}
