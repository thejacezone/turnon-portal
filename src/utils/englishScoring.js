const levels = ['A1', 'A2', 'B1', 'B2', 'C1']
const skills = ['grammar', 'vocabulary', 'reading']

function band(score) {
  if (score >= 9) return 'alto'
  if (score >= 7) return 'sólido'
  return 'bajo'
}

function recommendation(level) {
  if (level === 'Pre-A1') return 'Reforzá bases de gramática, vocabulario común y frases simples de entrevista.'
  if (level === 'A1') return 'Reforzá bases de gramática, vocabulario común y frases simples de entrevista.'
  if (level === 'A2') return 'Practicá pasado simple, preguntas comunes, vocabulario de trabajo y lectura de instrucciones.'
  if (level === 'B1') return 'Reforzá present perfect, conditionals, vocabulario laboral y respuestas de entrevista.'
  if (level === 'B2') return 'Practicá fluidez, listening, writing profesional y situaciones laborales más complejas.'
  return 'Refiná precisión, vocabulario profesional, speaking avanzado y escritura formal.'
}

function levelDescription(label) {
  if (label.startsWith('Pre-A1')) return 'Estás construyendo las bases para comprender y responder en situaciones laborales sencillas.'
  if (label.startsWith('A1')) return 'Podés reconocer frases y datos básicos en situaciones laborales muy conocidas.'
  if (label.startsWith('A2')) return 'Podés manejar intercambios breves, instrucciones directas y preguntas comunes de entrevista.'
  if (label.startsWith('B1')) return 'Podés manejar situaciones laborales simples, responder preguntas de entrevista y comprender textos cortos de trabajo.'
  if (label.startsWith('B2')) return 'Podés comunicarte con independencia y comprender situaciones laborales de mayor complejidad.'
  return 'Podés comprender matices y comunicar ideas profesionales complejas con buen control del idioma.'
}

export function scoreEnglishTest(questions, answers) {
  const bySkill = Object.fromEntries(skills.map((skill) => [skill, { correct: 0, total: 0 }]))
  const byLevel = Object.fromEntries(levels.map((level) => [level, { correct: 0, total: 0 }]))
  const byTopic = {}
  let correct = 0

  questions.forEach((question) => {
    const isCorrect = answers[question.id] === question.correctAnswer
    correct += Number(isCorrect)
    bySkill[question.skill].total += 1
    bySkill[question.skill].correct += Number(isCorrect)
    byLevel[question.level].total += 1
    byLevel[question.level].correct += Number(isCorrect)
    byTopic[question.topic] ||= { correct: 0, total: 0 }
    byTopic[question.topic].total += 1
    byTopic[question.topic].correct += Number(isCorrect)
  })

  let estimatedLevel = 'Pre-A1'
  for (let index = 0; index < levels.length; index += 1) {
    const level = levels[index]
    // Un nivel superior no puede compensar bases extremadamente bajas: los niveles previos
    // deben alcanzar al menos 5/10, aunque el umbral formal de nivel sostenido sea 6/10.
    const previousNotExtremelyLow = levels.slice(0, index).every((previous) => byLevel[previous].correct >= 5)
    if (byLevel[level].correct >= 6 && previousNotExtremelyLow) estimatedLevel = level
  }

  const estimatedLabel = estimatedLevel === 'Pre-A1' ? 'Pre-A1 / En desarrollo' : `${estimatedLevel} ${band(byLevel[estimatedLevel].correct)}`
  const rankedTopics = Object.entries(byTopic).map(([topic, value]) => ({ topic, ...value, rate: value.correct / value.total })).sort((a, b) => b.rate - a.rate || b.total - a.total)

  return {
    correct,
    total: questions.length,
    percentage: Math.round((correct / questions.length) * 100),
    bySkill,
    byLevel,
    estimatedLevel,
    estimatedLabel,
    strongTopics: rankedTopics.filter((item) => item.rate >= 0.75).slice(0, 4),
    improvementTopics: [...rankedTopics].reverse().filter((item) => item.rate < 0.75).slice(0, 4),
    recommendation: recommendation(estimatedLevel),
    description: levelDescription(estimatedLabel),
  }
}
