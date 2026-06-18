import { Link } from 'react-router-dom'

export default function Button({ to, href, children, variant = 'primary', className = '' }) {
  const classes = `button ${variant === 'secondary' ? 'ghost' : ''} ${className}`.trim()
  if (to) return <Link className={classes} to={to}>{children}</Link>
  return <a className={classes} href={href || '#'}>{children}</a>
}
