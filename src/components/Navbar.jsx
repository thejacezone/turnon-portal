import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { navigation } from '../data/siteContent.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const closeMenu = () => setOpen(false)

  useEffect(() => {
    closeMenu()
  }, [location.pathname])

  useEffect(() => {
    if (!open) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return (
    <header className="site-header">
      <NavLink className="brand" to="/" onClick={closeMenu} aria-label="TurnOn, inicio">
        <img className="brand-logo" src="/assets/brand/logo-horizontal.png" alt="TurnOn" />
      </NavLink>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen((value) => !value)}>
        <span className="sr-only">{open ? 'Cerrar navegación' : 'Abrir navegación'}</span><span></span><span></span><span></span>
      </button>
      <nav id="main-navigation" className={open ? 'open' : ''} aria-label="Navegación principal">
        {navigation.map((item) => (
          <NavLink key={item.path} to={item.path} end={item.path === '/'} onClick={closeMenu}>{item.label}</NavLink>
        ))}
        <NavLink className="nav-test-cta" to="/work-english-test/general-test" onClick={closeMenu}>Empezar test</NavLink>
      </nav>
    </header>
  )
}
