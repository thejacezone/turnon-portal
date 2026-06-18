export default function OfferCard({ offer }) {
  return (
    <article className="offer-card">
      <div className="offer-card-top"><span className="eyebrow">{offer.modality}</span><span className="english-level">Inglés {offer.englishLevel}</span></div>
      <h2>{offer.company}</h2>
      <p>{offer.description}</p>
      <dl className="offer-facts"><div><dt>Salario base</dt><dd>{offer.baseSalary}</dd></div><div><dt>Bono</dt><dd>{offer.bonus}</dd></div><div><dt>Training</dt><dd>{offer.training}</dd></div><div><dt>Destacado</dt><dd>{offer.highlight}</dd></div></dl>
      <a className="button" href={offer.applyUrl}>Quiero aplicar</a>
    </article>
  )
}
