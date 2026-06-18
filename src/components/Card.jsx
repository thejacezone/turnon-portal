export default function Card({ eyebrow, title, children, action, href }) {
  return (
    <article className="card">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h3>{title}</h3>
      <div className="card-copy">{children}</div>
      {action && <a className="text-link" href={href}>{action} <span aria-hidden="true">→</span></a>}
    </article>
  )
}
