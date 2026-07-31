import { Link, useParams } from 'react-router-dom'
import { offers } from '../data/offers.js'

export default function OfferDetail() {
  const { id } = useParams()
  const offer = offers.find((item) => item.slug === id || item.id === id)

  if (!offer) {
    return (
      <section className="detail-page">
        <h1>Offer not found</h1>
        <Link className="button" to="/ofertas">Back to offers</Link>
      </section>
    )
  }

  return (
    <article className="detail-page offer-detail">
      <Link className="back-link" to="/ofertas">← Back to offers</Link>
      <header>
        <span className="eyebrow">{offer.eyebrow} · ENGLISH {offer.englishLevel}</span>
        <h1>{offer.title}</h1>
        <p>{offer.description}</p>
      </header>
      <div className="offer-detail-facts">
        <div><span>Base salary</span><strong>{offer.baseSalary}</strong></div>
        <div><span>{offer.incentiveLabel}</span><strong>{offer.incentive}</strong></div>
        <div><span>Training</span><strong>{offer.training}</strong></div>
        <div><span>Modality</span><strong>{offer.modality}</strong></div>
        <div><span>Channel</span><strong>{offer.channel}</strong></div>
        <div><span>Highlight</span><strong>{offer.highlight}</strong></div>
        <div><span>Status</span><strong>{offer.status}</strong></div>
        <div><span>Availability</span><strong>{offer.availability}</strong></div>
      </div>
      {offer.applicationAvailable && offer.applyUrl
        ? <a className="button" href={offer.applyUrl}>Apply now</a>
        : <button className="button disabled" type="button" disabled>Application unavailable</button>}
      <p className="detail-disclaimer">
        Job availability, salary, schedules, bonuses and work-from-home conditions must be confirmed before applying.
      </p>
    </article>
  )
}
