import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import WorkEnglishTest from './pages/WorkEnglishTest.jsx'
import EnglishTest from './pages/EnglishTest.jsx'
import Resources from './pages/Resources.jsx'
import Calculators from './pages/Calculators.jsx'
import Community from './pages/Community.jsx'
import Offers from './pages/Offers.jsx'
import About from './pages/About.jsx'
import ResourceDetail from './pages/ResourceDetail.jsx'
import OfferDetail from './pages/OfferDetail.jsx'

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work-english-test" element={<WorkEnglishTest />} />
          <Route path="/work-english-test/test" element={<EnglishTest />} />
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
