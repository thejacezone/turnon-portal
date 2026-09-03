import { Link, useParams } from 'react-router-dom'
import OfferPreparationDetail from '../components/offers/OfferPreparationDetail.jsx'
import { offers } from '../data/offers.js'

export default function OfferDetail() {
  const { id } = useParams()
  const offerIndex = offers.findIndex((item) => item.slug === id || item.id === id)
  const offer = offers[offerIndex]

  if (!offer) {
    return (
      <section className="detail-page">
        <h1>Offer not found</h1>
        <Link className="button" to="/ofertas">Back to offers</Link>
      </section>
    )
  }

  return <OfferPreparationDetail offer={offer} previousOffer={offers[offerIndex - 1]} nextOffer={offers[offerIndex + 1]} />
}
