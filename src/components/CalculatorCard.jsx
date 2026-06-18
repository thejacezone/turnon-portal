export default function CalculatorCard({ title, description, children }) {
  return <section className="calculator-card"><div className="calculator-copy"><span className="eyebrow">Herramienta orientativa</span><h2>{title}</h2><p>{description}</p></div><div className="calculator-panel">{children}</div></section>
}
