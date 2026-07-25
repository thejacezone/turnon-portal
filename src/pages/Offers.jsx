import PageHeader from '../components/PageHeader.jsx'
import OfferCard from '../components/OfferCard.jsx'
import { offers } from '../data/offers.js'

export default function Offers() {
  return (
    <div className="portal-page offers-page">
      <PageHeader
        eyebrow="TurnOn / Oportunidades"
        title="Buscá oportunidades reales"
        description="Explorá ofertas, requisitos y rutas para aplicar mejor a trabajos donde tu inglés puede abrirte puertas."
      />
      <section className="offer-grid page-grid page-section" aria-label="Ofertas disponibles">
        {offers.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
      </section>
    </div>
  )
}
