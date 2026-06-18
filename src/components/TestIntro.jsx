export default function TestIntro({ onStart }) {
  return (
    <section className="test-intro">
      <span className="eyebrow">Evaluación local · 50 preguntas</span>
      <h1>Work English Level Test</h1>
      <p>Respondé 50 preguntas de grammar, vocabulary y reading para obtener una estimación de tu nivel de inglés laboral.</p>
      <div className="test-facts"><span>20 Grammar</span><span>15 Vocabulary</span><span>15 Reading</span></div>
      <aside className="test-note">El resultado es orientativo y no constituye una certificación oficial de inglés.</aside>
      <button className="button" type="button" onClick={onStart}>Comenzar test</button>
    </section>
  )
}
