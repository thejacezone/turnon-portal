import { Link } from 'react-router-dom'

export default function OfferCard({ offer }) {
  const titleId = `${offer.id}-title`

  return (
    <article className="offer-card" aria-labelledby={titleId}>
      <div className="offer-card-top">
        <span className="eyebrow">{offer.eyebrow}</span>
        <span className="english-level">English {offer.englishLevel}</span>
      </div>
      <h2 id={titleId}>{offer.title}</h2>
      <p>{offer.description}</p>
      <p className="offer-reference-status">{offer.status} · {offer.availability}</p>
      <dl className="offer-facts">
        <div><dt>Base salary</dt><dd>{offer.baseSalary}</dd></div>
        <div><dt>{offer.incentiveLabel}</dt><dd>{offer.incentive}</dd></div>
        <div><dt>Training</dt><dd>{offer.training}</dd></div>
        <div><dt>Modality</dt><dd>{offer.modality}</dd></div>
        <div><dt>Channel</dt><dd>{offer.channel}</dd></div>
        <div><dt>Highlight</dt><dd>{offer.highlight}</dd></div>
      </dl>
      <div className="offer-actions">
        <Link
          className="button ghost dark-ghost"
          to={`/ofertas/${offer.slug}`}
          aria-label={`View details for ${offer.title}`}
        >
          View details
        </Link>
        {offer.applicationAvailable && offer.applyUrl
          ? <a className="button" href={offer.applyUrl}>Apply now</a>
          : <button className="button disabled" type="button" disabled>Application unavailable</button>}
      </div>
    </article>
  )
}
