import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const WorkEnglishTest = lazy(() => import('./pages/WorkEnglishTest.jsx'))
const GeneralEnglishTest = lazy(() => import('./pages/GeneralEnglishTest.jsx'))
const WorkEnglishTestExam = lazy(() => import('./pages/WorkEnglishTestExam.jsx'))
const GrammarPractice = lazy(() => import('./pages/GrammarPractice.jsx'))
const VocabularyPractice = lazy(() => import('./pages/VocabularyPractice.jsx'))
const ReadingPractice = lazy(() => import('./pages/ReadingPractice.jsx'))
const ListeningPractice = lazy(() => import('./pages/ListeningPractice.jsx'))
const WritingPractice = lazy(() => import('./pages/WritingPractice.jsx'))
const TypingTestPage = lazy(() => import('./pages/TypingTestPage.jsx'))
const Lessons = lazy(() => import('./pages/Lessons.jsx'))
const LessonDetail = lazy(() => import('./pages/LessonDetail.jsx'))
const Resources = lazy(() => import('./pages/Resources.jsx'))
const CvGuideArticle = lazy(() => import('./pages/CvGuideArticle.jsx'))
const Calculators = lazy(() => import('./pages/Calculators.jsx'))
const Community = lazy(() => import('./pages/Community.jsx'))
const Offers = lazy(() => import('./pages/Offers.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const ResourceDetail = lazy(() => import('./pages/ResourceDetail.jsx'))
const OfferDetail = lazy(() => import('./pages/OfferDetail.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

export default function App() {
  const generalIntro = {
    eyebrow: 'GENERAL ENGLISH LEVEL TEST',
    title: 'Medí tu nivel de inglés',
    description: 'Completá una prueba de Grammar, Vocabulary y Reading para obtener un resultado orientativo de tu nivel actual.',
    facts: ['50 preguntas', '20 Grammar · 15 Vocabulary · 15 Reading', '15–20 min aprox.', 'Resultado orientativo'],
    buttonLabel: 'Comenzar test',
  }
  const workIntro = {
    eyebrow: 'WORK ENGLISH TEST',
    title: 'Inglés para trabajar',
    description: 'Poné a prueba tu inglés en situaciones de entrevistas, customer service, soporte, ventas, training y ambientes laborales bilingües.',
    facts: ['50 preguntas por intento', '30 Grammar · 10 Vocabulary · 10 Reading', 'Preguntas aleatorias', '20–25 min aprox.'],
    buttonLabel: 'Hacer test de inglés para trabajo',
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Suspense fallback={<div className="route-loading" role="status" aria-live="polite">Cargando contenido…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work-english-test" element={<WorkEnglishTest />} />
            <Route path="/work-english-test/general-test" element={<GeneralEnglishTest intro={generalIntro} />} />
            <Route path="/work-english-test/work-test" element={<WorkEnglishTestExam intro={workIntro} />} />
            <Route path="/work-english-test/grammar-practice" element={<GrammarPractice />} />
            <Route path="/work-english-test/vocabulary-practice" element={<VocabularyPractice />} />
            <Route path="/work-english-test/vocabulary-practice/:moduleSlug" element={<VocabularyPractice />} />
            <Route path="/work-english-test/reading-practice" element={<ReadingPractice />} />
            <Route path="/work-english-test/reading-practice/:scenarioSlug" element={<ReadingPractice />} />
            <Route path="/work-english-test/listening-practice" element={<ListeningPractice />} />
            <Route path="/work-english-test/listening-practice/:listeningSlug" element={<ListeningPractice />} />
            <Route path="/work-english-test/writing-practice" element={<WritingPractice />} />
            <Route path="/work-english-test/writing-practice/:promptSlug" element={<WritingPractice />} />
            <Route path="/work-english-test/typing-test" element={<TypingTestPage />} />
            <Route path="/typing-test" element={<TypingTestPage />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/lessons/:lessonSlug" element={<LessonDetail />} />
            <Route path="/recursos" element={<Resources />} />
            <Route path="/recursos/cv-guia" element={<CvGuideArticle />} />
            <Route path="/recursos/:id" element={<ResourceDetail />} />
            <Route path="/calculadoras" element={<Calculators />} />
            <Route path="/comunidad" element={<Community />} />
            <Route path="/ofertas" element={<Offers />} />
            <Route path="/ofertas/:id" element={<OfferDetail />} />
            <Route path="/sobre-turnon" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
