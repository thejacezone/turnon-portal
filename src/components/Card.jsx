export default function Card({ eyebrow, title, children, action, href, badge }) {
  return (
    <article className="card">
      <div className="card-top">{eyebrow && <span className="eyebrow">{eyebrow}</span>}{badge && <span className="status">{badge}</span>}</div>
      <h3>{title}</h3>
      <div className="card-copy">{children}</div>
      {action && <a className="text-link" href={href}>{action} <span aria-hidden="true">→</span></a>}
    </article>
  )
}
