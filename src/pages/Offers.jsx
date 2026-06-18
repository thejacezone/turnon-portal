import PageHeader from '../components/PageHeader.jsx'
import OfferCard from '../components/OfferCard.jsx'
import { offers } from '../data/offers.js'

export default function Offers() {
  return <><PageHeader eyebrow="Ofertas y referidos" title="Oportunidades con la información que querés ver primero" description="Datos de ejemplo para visualizar cómo funcionará esta sección. Confirmá siempre los términos directamente con quien recluta." /><section className="offer-grid section-block">{offers.map((offer) => <OfferCard key={offer.id} offer={offer} />)}</section></>
}
