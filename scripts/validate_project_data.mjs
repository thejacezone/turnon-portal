import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { communityLinks } from '../src/data/communityLinks.js'
import { englishPractice } from '../src/data/englishPractice.js'
import { generalEnglishTestQuestions } from '../src/data/generalEnglishTestQuestions.js'
import { grammarLessons } from '../src/data/grammarLessons.js'
import { grammarPracticeQuestions } from '../src/data/grammarPracticeQuestions.js'
import { listeningPracticeItems } from '../src/data/listeningPracticeItems.js'
import { offers } from '../src/data/offers.js'
import { readingPracticeScenarios } from '../src/data/readingPracticeScenarios.js'
import { resources } from '../src/data/resources.js'
import { featuredTests, homeNeeds, navigation } from '../src/data/siteContent.js'
import { workEnglishTestQuestions } from '../src/data/workEnglishTestQuestions.js'
import { workVocabularyModules } from '../src/data/workVocabularyModules.js'
import { writingPracticePrompts } from '../src/data/writingPracticePrompts.js'
import { durations, typingTexts } from '../src/features/typing-test/data/typingTexts.js'
import { calculateMetrics } from '../src/features/typing-test/utils/calculateMetrics.js'
import { scoreEnglishTest } from '../src/utils/englishScoring.js'
import { createGeneralEnglishTestAttempt, normalizeSkill } from '../src/utils/generalEnglishTestRandomizer.js'
import { calculateLaborLines } from '../src/utils/laborCalculator.js'
import { generateListeningGeneralTest } from '../src/utils/listeningPractice.js'
import {
  validateListeningPracticeItems,
  validateQuestionBank,
  validateReadingPracticeScenarios,
  validateWorkVocabularyModules,
  validateWritingPracticePrompts,
} from '../src/utils/questionValidation.js'
import { generateReadingGeneralTest, generateVocabularyGeneralTest } from '../src/utils/sectionGeneralTests.js'
import { generateVocabularyQuiz } from '../src/utils/vocabularyQuiz.js'
import { createWorkEnglishTestAttempt, normalizeWorkSkill, validateWorkEnglishTestBank } from '../src/utils/workEnglishTestRandomizer.js'
import { evaluateWritingResponse, generateWritingGeneralTest } from '../src/utils/writingPractice.js'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const errors = []
const warnings = []
const checks = []

function check(condition, label, detail = '') {
  checks.push({ label, passed: Boolean(condition) })
  if (!condition) errors.push(detail ? `${label}: ${detail}` : label)
}

function warn(condition, message) {
  if (!condition) warnings.push(message)
}

function unique(items) {
  return new Set(items).size === items.length
}

function validQuestion(question) {
  return Boolean(
    question.id
    && String(question.question ?? '').trim()
    && Array.isArray(question.options)
    && question.options.length >= 2
    && question.options.includes(question.correctAnswer)
    && String(question.explanation ?? '').trim(),
  )
}

function sectionCount(items, normalize, section) {
  return items.filter((item) => normalize(item.skill) === section).length
}

function differentOrder(current, previous) {
  return current.length !== previous.length || current.some((item, index) => item.id !== previous[index]?.id)
}

const generalValidation = validateQuestionBank(generalEnglishTestQuestions, {
  total: 50,
  bySkill: { grammar: 20, vocabulary: 15, reading: 15 },
})
check(generalValidation.valid, 'General English bank is valid', generalValidation.errors.join(' '))
check(unique(generalEnglishTestQuestions.map((question) => question.question.trim().toLowerCase())), 'General English question texts are unique')

let previousGeneral = []
for (let attemptNumber = 1; attemptNumber <= 3; attemptNumber += 1) {
  const attempt = createGeneralEnglishTestAttempt(generalEnglishTestQuestions, previousGeneral)
  check(attempt.length === 50 && unique(attempt.map((question) => question.id)), `General English attempt ${attemptNumber} has 50 unique questions`)
  check(attempt.slice(0, 20).every((question) => normalizeSkill(question.skill) === 'grammar'), `General English attempt ${attemptNumber} positions 1–20 are Grammar`)
  check(attempt.slice(20, 35).every((question) => normalizeSkill(question.skill) === 'vocabulary'), `General English attempt ${attemptNumber} positions 21–35 are Vocabulary`)
  check(attempt.slice(35).every((question) => normalizeSkill(question.skill) === 'reading'), `General English attempt ${attemptNumber} positions 36–50 are Reading`)
  if (previousGeneral.length) check(differentOrder(attempt, previousGeneral), `General English attempt ${attemptNumber} differs from the previous attempt`)
  previousGeneral = attempt
}
const generalAllCorrect = scoreEnglishTest(generalEnglishTestQuestions, Object.fromEntries(generalEnglishTestQuestions.map((question) => [question.id, question.correctAnswer])))
check(generalAllCorrect.percentage === 100, 'General English scoring returns 100% for all correct answers')

const workValidation = validateWorkEnglishTestBank(workEnglishTestQuestions)
check(workValidation.valid, 'Work English bank is valid', workValidation.errors.join(' '))
check(workEnglishTestQuestions.length === 100, 'Work English bank contains 100 questions')
check(sectionCount(workEnglishTestQuestions, normalizeWorkSkill, 'grammar') === 60, 'Work English bank contains 60 Grammar questions')
check(sectionCount(workEnglishTestQuestions, normalizeWorkSkill, 'vocabulary') === 20, 'Work English bank contains 20 Vocabulary questions')
check(sectionCount(workEnglishTestQuestions, normalizeWorkSkill, 'reading') === 20, 'Work English bank contains 20 Reading questions')

let previousWork = []
for (let attemptNumber = 1; attemptNumber <= 3; attemptNumber += 1) {
  const attempt = createWorkEnglishTestAttempt(workEnglishTestQuestions, previousWork)
  check(attempt.length === 50 && unique(attempt.map((question) => question.id)), `Work English attempt ${attemptNumber} has 50 unique questions`)
  check(attempt.slice(0, 30).every((question) => normalizeWorkSkill(question.skill) === 'grammar'), `Work English attempt ${attemptNumber} positions 1–30 are Grammar`)
  check(attempt.slice(30, 40).every((question) => normalizeWorkSkill(question.skill) === 'vocabulary'), `Work English attempt ${attemptNumber} positions 31–40 are Vocabulary`)
  check(attempt.slice(40).every((question) => normalizeWorkSkill(question.skill) === 'reading'), `Work English attempt ${attemptNumber} positions 41–50 are Reading`)
  if (previousWork.length) check(differentOrder(attempt, previousWork), `Work English attempt ${attemptNumber} differs from the previous attempt`)
  previousWork = attempt
}

const grammarTopics = grammarPracticeQuestions.reduce((counts, question) => {
  counts[question.topic] = (counts[question.topic] || 0) + 1
  return counts
}, {})
check(grammarPracticeQuestions.length === 400, 'Grammar Practice contains 400 questions')
check(Object.keys(grammarTopics).length === 10, 'Grammar Practice contains 10 topics')
check(Object.values(grammarTopics).every((count) => count === 40), 'Every Grammar Practice topic contains 40 questions')
check(unique(grammarPracticeQuestions.map((question) => question.id)), 'Grammar Practice IDs are unique')
check(grammarPracticeQuestions.every(validQuestion), 'Grammar Practice questions have valid options, answers and explanations')

const lessonsByCategory = grammarLessons.reduce((counts, lesson) => {
  counts[lesson.category] = (counts[lesson.category] || 0) + 1
  return counts
}, {})
check(grammarLessons.length === 38, 'Lessons contains 38 lessons')
check(lessonsByCategory.Foundation === 12, 'Lessons contains 12 Foundation lessons')
check(lessonsByCategory.Intermediate === 14, 'Lessons contains 14 Intermediate lessons')
check(lessonsByCategory.Advanced === 12, 'Lessons contains 12 Advanced lessons')
check(unique(grammarLessons.map((lesson) => lesson.id)), 'Lesson IDs are unique')
check(unique(grammarLessons.map((lesson) => lesson.slug)), 'Lesson slugs are unique')
check(
  grammarLessons.every((lesson) => lesson.title && lesson.shortDescription && lesson.introduction.length && lesson.sections.length && lesson.quickRecap.length),
  'Every lesson contains its required theory sections',
)

const vocabularyValidation = validateWorkVocabularyModules(workVocabularyModules)
const vocabularyTerms = workVocabularyModules.flatMap((module) => module.terms)
check(vocabularyValidation.valid, 'Vocabulary modules are structurally valid', vocabularyValidation.errors.join(' '))
check(vocabularyTerms.length === 200, 'Vocabulary bank contains 200 terms')
check(unique(vocabularyTerms.map((term) => term.id)), 'Vocabulary term IDs are unique')
warn(
  workVocabularyModules.some((module) => /interview|training/i.test(`${module.title} ${module.slug}`)),
  'The expected “Interview and Training” vocabulary module is not present in the active eight-module source bank.',
)
const firstVocabularyQuiz = generateVocabularyQuiz(workVocabularyModules[0], workVocabularyModules, 10)
check(firstVocabularyQuiz.length === 10 && unique(firstVocabularyQuiz.map((question) => question.termId)), 'Vocabulary mini quiz generates 10 unique terms')
check(firstVocabularyQuiz.every((question) => question.options.includes(question.correctAnswer)), 'Vocabulary mini quiz answers remain inside their options')
const vocabularyGeneral = generateVocabularyGeneralTest(workVocabularyModules)
check(vocabularyGeneral.length === 25 && unique(vocabularyGeneral.map((question) => question.termId)), 'Vocabulary Level Check generates 25 unique terms')

const readingValidation = validateReadingPracticeScenarios(readingPracticeScenarios)
const readingQuestions = readingPracticeScenarios.flatMap((scenario) => scenario.questions)
check(readingValidation.valid, 'Reading Practice scenarios are structurally valid', readingValidation.errors.join(' '))
check(readingPracticeScenarios.length === 30 && readingQuestions.length === 150, 'Reading Practice contains 30 scenarios and 150 questions')
check(unique(readingPracticeScenarios.map((scenario) => scenario.slug)), 'Reading Practice slugs are unique')
check(unique(readingQuestions.map((question) => question.id)), 'Reading Practice question IDs are unique')
const readingGeneral = generateReadingGeneralTest(readingPracticeScenarios)
check(readingGeneral.length >= 12 && readingGeneral.length <= 20, 'Reading Level Check generates a valid scenario-based question set')
check(readingGeneral.every((question) => question.passage && question.scenarioId), 'Reading Level Check keeps every question linked to a passage')

const listeningValidation = validateListeningPracticeItems(listeningPracticeItems)
check(listeningValidation.valid, 'Listening Practice data is structurally valid', listeningValidation.errors.join(' '))
check(listeningPracticeItems.length === 5, 'Listening Practice contains five audio items')
for (const item of listeningPracticeItems) {
  const audioPath = path.join(projectRoot, 'public', item.audioUrl.replace(/^\//, ''))
  check(fs.existsSync(audioPath), `Listening audio exists for ${item.id}`, item.audioUrl)
  check(item.questions.length === 5 && item.questions.every(validQuestion), `Listening item ${item.id} has five valid questions`)
}
const listeningGeneral = generateListeningGeneralTest(listeningPracticeItems)
check(unique(listeningGeneral.map((item) => item.id)), 'Listening Level Check uses unique audio blocks')
check(listeningGeneral.every((item) => item.questions.every((question) => question.audioUrl === item.audioUrl)), 'Listening questions remain linked to their audio')

const writingValidation = validateWritingPracticePrompts(writingPracticePrompts)
check(writingValidation.valid, 'Writing Practice prompts are structurally valid', writingValidation.errors.join(' '))
check(writingPracticePrompts.length === 22 && unique(writingPracticePrompts.map((prompt) => prompt.slug)), 'Writing Practice contains 22 prompts with unique slugs')
const writingGeneral = generateWritingGeneralTest(writingPracticePrompts)
check(writingGeneral.length === 3 && unique(writingGeneral.map((prompt) => prompt.id)), 'Writing Level Check generates three unique prompts')
const writingSample = evaluateWritingResponse(writingPracticePrompts[0], 'I have customer service experience because I help people and solve problems clearly.', 60)
check(Number.isFinite(writingSample.wpm) && writingSample.recommendation, 'Writing metrics and heuristic recommendation are generated')

check(typingTexts.length === 3, 'Typing Test contains three reference texts')
check(typingTexts.map((item) => item.label).join('|') === 'Easy|Intermediate|Hard', 'Typing Test difficulty labels are Easy, Intermediate and Hard')
check(durations.map((item) => item.seconds).join('|') === '60|180|300', 'Typing Test durations are 1, 3 and 5 minutes')
check(typingTexts.every((item) => item.text.length > 3000), 'Typing reference texts are long enough for timed practice')
const typingSample = calculateMetrics('clear work message', 'clear work message', 60)
check(typingSample.accuracy === 100 && typingSample.errors === 0 && typingSample.wpm > 0, 'Typing metrics return correct values for an exact sample')

check(resources.length === 13, 'Resources contains the approved 13 cards')
check(resources.filter((resource) => resource.status === 'disponible').length === 7, 'Resources contains seven available cards')
check(resources.filter((resource) => resource.status === 'proximamente').length === 6, 'Resources contains six coming-soon cards')
check(resources.every((resource) => resource.url !== '#'), 'Resources contains no hash placeholders')
check(offers.every((offer) => offer.applyUrl !== '#'), 'Offers contains no hash placeholders')
check(communityLinks.every((link) => link.url !== '#'), 'Community contains no hash placeholders')

const routePaths = [
  '/',
  '/work-english-test',
  '/lessons',
  '/work-english-test/general-test',
  '/work-english-test/work-test',
  '/work-english-test/grammar-practice',
  '/work-english-test/vocabulary-practice',
  '/work-english-test/reading-practice',
  '/work-english-test/listening-practice',
  '/work-english-test/writing-practice',
  '/work-english-test/typing-test',
  '/recursos',
  '/calculadoras',
  '/comunidad',
  '/ofertas',
  '/sobre-turnon',
]
const dataLinks = [...navigation, ...homeNeeds, ...featuredTests, ...englishPractice].map((item) => item.path)
check(dataLinks.every((route) => routePaths.includes(route)), 'Navigation and card data use registered canonical routes')

const laborSample = calculateLaborLines(240, [{ id: 'sample', conditionId: 'extra-day', hours: 2 }])
check(laborSample.hourlyRate === 1 && laborSample.grandTotal === 4, 'Labor calculator sample returns the expected USD result')

console.log(`TurnOn data validation: ${checks.filter((item) => item.passed).length}/${checks.length} checks passed.`)
warnings.forEach((warning) => console.warn(`WARNING: ${warning}`))
errors.forEach((error) => console.error(`ERROR: ${error}`))

if (errors.length) process.exitCode = 1
