import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="not-found-page" aria-labelledby="not-found-title">
      <span className="eyebrow">Error 404</span>
      <h1 id="not-found-title">Esta página no existe</h1>
      <p>Revisá la dirección o volvé al inicio para continuar usando TurnOn.</p>
      <Link className="button" to="/">Volver al inicio</Link>
    </section>
  )
}
