import { Link } from 'react-router-dom'

export default function Card({ eyebrow, title, children, action, href, to, badge, icon, accent, className = '' }) {
  const classes = `card ${className}`.trim()
  return (
    <article className={classes} data-accent={accent || undefined}>
      <div className="card-top"><div>{icon}{eyebrow && <span className="eyebrow">{eyebrow}</span>}</div>{badge && <span className="status">{badge}</span>}</div>
      <h3>{title}</h3>
      <div className="card-copy">{children}</div>
      {action && (to ? <Link className="text-link" to={to}>{action} <span aria-hidden="true">→</span></Link> : <a className="text-link" href={href}>{action} <span aria-hidden="true">→</span></a>)}
    </article>
  )
}
