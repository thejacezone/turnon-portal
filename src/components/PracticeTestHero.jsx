import { useId } from 'react'
import { Link } from 'react-router-dom'

export default function PracticeTestHero({
  title,
  description,
  meta = [],
  onStart,
  targetId,
  startLabel = 'Start test',
}) {
  const titleId = useId()

  const handleStart = () => {
    if (onStart) {
      onStart()
      return
    }

    const target = targetId ? document.getElementById(targetId) : null
    if (!target) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <section className="test-hero" aria-labelledby={titleId}>
      <div className="test-hero-inner">
        <Link className="test-hero-back" to="/work-english-test">← Back to Work English Test</Link>
        <span className="test-hero-eyebrow">TurnOn / Skills Practice</span>
        <h1 className="test-hero-title" id={titleId}>{title}</h1>
        <p className="test-hero-description">{description}</p>
        <div className="test-hero-meta" aria-label={`${title} quick information`}>
          {meta.map((item) => <span className="test-meta-badge" key={item}>{item}</span>)}
        </div>
        <button className="test-start-button" type="button" onClick={handleStart}>{startLabel}</button>
      </div>
    </section>
  )
}
