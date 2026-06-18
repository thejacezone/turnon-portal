import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Resources from './pages/Resources.jsx'
import Offers from './pages/Offers.jsx'
import Community from './pages/Community.jsx'
import LaborGuide from './pages/LaborGuide.jsx'

const pages = {
  inicio: Home,
  recursos: Resources,
  ofertas: Offers,
  comunidad: Community,
  laboral: LaborGuide,
}

function pageFromHash() {
  const key = window.location.hash.replace('#/', '') || 'inicio'
  return pages[key] ? key : 'inicio'
}

export default function App() {
  const [page, setPage] = useState(pageFromHash)

  useEffect(() => {
    const navigate = () => setPage(pageFromHash())
    window.addEventListener('hashchange', navigate)
    return () => window.removeEventListener('hashchange', navigate)
  }, [])

  const CurrentPage = pages[page]

  return (
    <div className="app-shell">
      <Header currentPage={page} />
      <main><CurrentPage /></main>
      <Footer />
    </div>
  )
}
