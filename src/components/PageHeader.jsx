const feathers = [1, 2, 3, 4]

export default function PageHeader({ before, children, className = '', eyebrow, title, description }) {
  return (
    <header className={className ? `page-hero ${className}` : 'page-hero'} aria-labelledby="page-hero-title">
      {feathers.map((number) => (
        <img
          className={`page-hero-feather page-hero-feather--${number}`}
          src={`/assets/feathers/feather${number}.png`}
          alt=""
          aria-hidden="true"
          key={number}
        />
      ))}
      <div className="page-hero-inner">
        {before}
        <span className="page-hero-eyebrow">{eyebrow}</span>
        <h1 className="page-hero-title" id="page-hero-title">{title}</h1>
        <p className="page-hero-subtitle">{description}</p>
        {children}
      </div>
    </header>
  )
}
