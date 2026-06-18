import { communityLinks } from '../data/community.js'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div><strong>TurnOn Portal</strong><p>Ideas, herramientas y conexiones para avanzar.</p></div>
      <div className="footer-links">
        {communityLinks.map((link) => <a key={link.id} href={link.url} target="_blank" rel="noreferrer">{link.name}</a>)}
      </div>
      <small>FASE 1 · Contenido local de sólo lectura</small>
    </footer>
  )
}
