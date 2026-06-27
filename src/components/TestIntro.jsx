export default function TestIntro({ title = 'Work English Level Test', description, facts = [], buttonLabel = 'Comenzar test', onStart }) {
  return (
    <section className="test-intro">
      <span className="eyebrow">Evaluación local · 50 preguntas</span>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="test-facts">{facts.map((fact) => <span key={fact}>{fact}</span>)}</div>
      <aside className="test-note">El resultado es orientativo y no constituye una certificación oficial de inglés.</aside>
      <button className="button" type="button" onClick={onStart}>{buttonLabel}</button>
    </section>
  )
}
