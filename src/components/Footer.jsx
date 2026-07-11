import { Link } from 'react-router-dom'
import { navigation } from '../data/siteContent.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div><strong className="footer-brand">TurnOn</strong><p className="footer-tagline">Trabajo real. Inglés útil. Cero humo.</p><p>Recursos para prepararte, aplicar y tomar decisiones laborales con más contexto.</p></div>
      <div className="footer-links">{navigation.map((item) => <Link key={item.path} to={item.path}>{item.label}</Link>)}</div>
      <div className="footer-meta"><small>© {year} TurnOn</small><small>Las herramientas y resultados de este portal son orientativos. Verificá información laboral sensible con fuentes oficiales.</small></div>
    </footer>
  )
}
