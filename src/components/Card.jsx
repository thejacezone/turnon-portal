import { Link } from 'react-router-dom'

export default function Card({ eyebrow, title, children, action, href, to, badge, icon, accent, className = '' }) {
  const classes = `card ${className}`.trim()
  const actionElement = action && to
    ? <Link className="text-link" to={to}>{action} <span aria-hidden="true">→</span></Link>
    : action && href
      ? <a className="text-link" href={href}>{action} <span aria-hidden="true">→</span></a>
      : null

  return (
    <article className={classes} data-accent={accent || undefined}>
      <div className="card-top"><div>{icon}{eyebrow && <span className="eyebrow">{eyebrow}</span>}</div>{badge && <span className="status">{badge}</span>}</div>
      <h3>{title}</h3>
      <div className="card-copy">{children}</div>
      {actionElement}
    </article>
  )
}
