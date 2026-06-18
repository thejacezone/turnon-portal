import { navigation } from '../data/siteContent.js'

export default function Header({ currentPage }) {
  return (
    <header className="site-header">
      <a className="brand" href="#/inicio" aria-label="TurnOn, inicio">
        <span className="brand-mark">T</span><span>TURN<span>ON</span></span>
      </a>
      <nav aria-label="Navegación principal">
        {navigation.map((item) => (
          <a key={item.id} className={currentPage === item.id ? 'active' : ''} href={`#/${item.id}`}>{item.label}</a>
        ))}
      </nav>
    </header>
  )
}
