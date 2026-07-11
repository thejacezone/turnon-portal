import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import WorkEnglishTest from './pages/WorkEnglishTest.jsx'
import EnglishTest from './pages/EnglishTest.jsx'
import GeneralEnglishTest from './pages/GeneralEnglishTest.jsx'
import GrammarPractice from './pages/GrammarPractice.jsx'
import VocabularyPractice from './pages/VocabularyPractice.jsx'
import ReadingPractice from './pages/ReadingPractice.jsx'
import ListeningPractice from './pages/ListeningPractice.jsx'
import WritingPractice from './pages/WritingPractice.jsx'
import TypingTestPage from './pages/TypingTestPage.jsx'
import { workEnglishTestQuestions } from './data/workEnglishTestQuestions.js'
import Resources from './pages/Resources.jsx'
import Calculators from './pages/Calculators.jsx'
import Community from './pages/Community.jsx'
import Offers from './pages/Offers.jsx'
import About from './pages/About.jsx'
import ResourceDetail from './pages/ResourceDetail.jsx'
import OfferDetail from './pages/OfferDetail.jsx'

export default function App() {
  const generalIntro = {
    title: 'General English Level Test',
    description: 'Medí tu nivel aproximado de inglés general con preguntas balanceadas de grammar, vocabulary y reading.',
    facts: ['20 Grammar', '15 Vocabulary', '15 Reading'],
    buttonLabel: 'Comenzar test general',
  }
  const workIntro = {
    title: 'Work English Test',
    description: 'Ponete a prueba con situaciones de entrevista, customer service, training y ambientes bilingües.',
    facts: ['20 Grammar', '15 Vocabulary', '15 Reading'],
    buttonLabel: 'Hacer test de inglés para trabajo',
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work-english-test" element={<WorkEnglishTest />} />
          <Route path="/work-english-test/general-test" element={<GeneralEnglishTest intro={generalIntro} />} />
          <Route path="/work-english-test/work-test" element={<EnglishTest questions={workEnglishTestQuestions} intro={workIntro} />} />
          <Route path="/work-english-test/grammar-practice" element={<GrammarPractice />} />
          <Route path="/work-english-test/vocabulary-practice" element={<VocabularyPractice />} />
          <Route path="/work-english-test/vocabulary-practice/:moduleSlug" element={<VocabularyPractice />} />
          <Route path="/work-english-test/reading-practice" element={<ReadingPractice />} />
          <Route path="/work-english-test/reading-practice/:scenarioSlug" element={<ReadingPractice />} />
          <Route path="/work-english-test/listening-practice" element={<ListeningPractice />} />
          <Route path="/work-english-test/listening-practice/:listeningSlug" element={<ListeningPractice />} />
          <Route path="/work-english-test/writing-practice" element={<WritingPractice />} />
          <Route path="/work-english-test/writing-practice/:promptSlug" element={<WritingPractice />} />
          <Route path="/typing-test" element={<TypingTestPage />} />
          <Route path="/recursos" element={<Resources />} />
          <Route path="/recursos/:id" element={<ResourceDetail />} />
          <Route path="/calculadoras" element={<Calculators />} />
          <Route path="/comunidad" element={<Community />} />
          <Route path="/ofertas" element={<Offers />} />
          <Route path="/ofertas/:id" element={<OfferDetail />} />
          <Route path="/sobre-turnon" element={<About />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
