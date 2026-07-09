const skills = ['grammar', 'vocabulary', 'reading']
const levelOrder = ['A1', 'A2', 'A2/B1', 'B1', 'B1/B2', 'B2', 'B2/C1', 'C1']

function band(correct, total = 10) {
  const rate = total ? correct / total : 0
  if (rate >= 0.9) return 'alto'
  if (rate >= 0.7) return 'sólido'
  return 'bajo'
}

function recommendation(level) {
  if (level === 'Pre-A1') return 'Necesitás reforzar las bases: verb to be, preguntas simples, vocabulario común y frases básicas de entrevista.'
  if (level.startsWith('A1')) return 'Podés entender frases simples, pero necesitás practicar estructuras básicas antes de aplicar a un empleo bilingüe.'
  if (level.startsWith('A2')) return 'Tenés una base útil. Podés comprender instrucciones simples y responder preguntas básicas, pero necesitás reforzar conversación, vocabulario laboral y lectura.'
  if (level.startsWith('B1')) return 'Podés manejar situaciones laborales simples, responder preguntas básicas de entrevista y comprender textos cortos de trabajo. Reforzá present perfect, conditionals, vocabulary y listening.'
  if (level.startsWith('B2')) return 'Tenés una base fuerte para ambientes bilingües. Ahora conviene practicar fluidez, listening, writing profesional y situaciones laborales más complejas.'
  return 'Tu nivel es avanzado. Enfocate en precisión, vocabulario profesional, respuestas naturales y writing formal.'
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
  const detectedSkills = [...new Set(questions.map((question) => question.skill).filter(Boolean))]
  const detectedLevels = [...new Set(questions.map((question) => question.level).filter(Boolean))].sort((a, b) => {
    const ai = levelOrder.indexOf(a)
    const bi = levelOrder.indexOf(b)
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi) || a.localeCompare(b)
  })
  const bySkill = Object.fromEntries((detectedSkills.length ? detectedSkills : skills).map((skill) => [skill, { correct: 0, total: 0 }]))
  const byLevel = Object.fromEntries(detectedLevels.map((level) => [level, { correct: 0, total: 0 }]))
  const byTopic = {}
  let correct = 0

  questions.forEach((question) => {
    const isCorrect = answers[question.id] === question.correctAnswer
    correct += Number(isCorrect)
    if (question.skill) {
      bySkill[question.skill] ||= { correct: 0, total: 0 }
      bySkill[question.skill].total += 1
      bySkill[question.skill].correct += Number(isCorrect)
    }
    if (question.level) {
      byLevel[question.level] ||= { correct: 0, total: 0 }
      byLevel[question.level].total += 1
      byLevel[question.level].correct += Number(isCorrect)
    }
    byTopic[question.topic] ||= { correct: 0, total: 0 }
    byTopic[question.topic].total += 1
    byTopic[question.topic].correct += Number(isCorrect)
  })

  let estimatedLevel = 'Pre-A1'
  for (const level of detectedLevels) {
    const score = byLevel[level]
    if (score.total && score.correct / score.total >= 0.6) estimatedLevel = level
  }

  const estimatedLabel = estimatedLevel === 'Pre-A1' ? 'Pre-A1 / En desarrollo' : `${estimatedLevel} ${band(byLevel[estimatedLevel].correct, byLevel[estimatedLevel].total)}`
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
