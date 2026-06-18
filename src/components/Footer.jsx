import { Link } from 'react-router-dom'
import { navigation } from '../data/siteContent.js'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div><strong className="footer-brand">TurnOn</strong><p>Recursos reales para prepararte mejor y tomar decisiones laborales con más contexto.</p></div>
      <div className="footer-links">{navigation.map((item) => <Link key={item.path} to={item.path}>{item.label}</Link>)}</div>
      <small>Herramientas orientativas. Verificá siempre información laboral sensible con fuentes oficiales.</small>
    </footer>
  )
}
