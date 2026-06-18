import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { navigation } from '../data/siteContent.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const closeMenu = () => setOpen(false)

  return (
    <header className="site-header">
      <NavLink className="brand" to="/" onClick={closeMenu} aria-label="TurnOn, inicio">
        <span className="brand-mark">T</span><span>TURN<span>ON</span></span>
      </NavLink>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen((value) => !value)}>
        <span className="sr-only">Abrir navegación</span><span></span><span></span><span></span>
      </button>
      <nav id="main-navigation" className={open ? 'open' : ''} aria-label="Navegación principal">
        {navigation.map((item) => (
          <NavLink key={item.path} to={item.path} end={item.path === '/'} onClick={closeMenu}>{item.label}</NavLink>
        ))}
      </nav>
    </header>
  )
}
