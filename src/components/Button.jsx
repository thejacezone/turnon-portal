import { Link } from 'react-router-dom'

export default function Button({ to, href, children, variant = 'primary', className = '' }) {
  const classes = `button ${variant === 'secondary' ? 'ghost' : ''} ${className}`.trim()
  if (to) return <Link className={classes} to={to}>{children}</Link>
  if (href) return <a className={classes} href={href}>{children}</a>
  return <span className={`${classes} disabled`} aria-disabled="true">{children}</span>
}
