import { useEffect, useRef } from 'react'
import Button from './Button.jsx'

const feathers = [1, 2, 3, 4]

export default function TurnOnHero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!hero || reducedMotion.matches) return undefined

    let animationFrame = 0
    const updateScrollProgress = () => {
      cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(() => {
        const bounds = hero.getBoundingClientRect()
        const progress = Math.min(1, Math.max(0, -bounds.top / bounds.height))
        hero.style.setProperty('--scroll-progress', progress.toFixed(3))
      })
    }

    updateScrollProgress()
    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    window.addEventListener('resize', updateScrollProgress)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', updateScrollProgress)
      window.removeEventListener('resize', updateScrollProgress)
    }
  }, [])

  return (
    <section className="hero portal-hero madtogo-hero home-hero" ref={heroRef} aria-labelledby="home-hero-title">
      <div className="hero-bg-text" aria-hidden="true">
        <span>TEST</span>
        <span>ENGLISH</span>
        <span>LEVEL</span>
      </div>

      {feathers.map((number) => (
        <span className={`hero-feather feather-${number}`} aria-hidden="true" key={number}>
          <img src={`/assets/feathers/feather${number}.png`} alt="" />
        </span>
      ))}

      <div className="hero-content">
        <span className="hero-kicker">TurnOn English Test</span>
        <h1 className="hero-title" id="home-hero-title">
          <span>Inglés</span>
          <span className="hero-title-accent">para</span>
          <span>trabajar</span>
        </h1>
        <p className="hero-tagline">Trabajo real. Inglés útil. Cero humo.</p>
        <div className="hero-actions">
          <Button to="/work-english-test/general-test" className="hero-btn hero-btn-primary">test english</Button>
          <Button to="/recursos" variant="secondary" className="hero-btn hero-btn-secondary">explora recursos</Button>
        </div>
      </div>

      <div className="hero-visual" aria-label="MadTogo, personaje guía de TurnOn">
        <div className="hero-character-layer">
          <img className="hero-madtogo" src="/assets/characters/madtogo-joven.png" alt="MadTogo joven volando con energía" />
        </div>

        <article className="hero-card">
          <div className="hero-card-heading">
            <span className="hero-card-icon" aria-hidden="true">✦</span>
            <span>TurnOn / test</span>
          </div>
          <h2>Tests adaptativos</h2>
          <p>A tu nivel, en tiempo real.</p>
          <div className="hero-card-progress" aria-hidden="true"><span /></div>
        </article>

        <div className="madtogo-signoff">
          <span>Con la energía de</span>
          <strong>MadTogo</strong>
          <em>¡Vamos!</em>
        </div>
      </div>
    </section>
  )
}
