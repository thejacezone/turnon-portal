import { Link, useParams } from 'react-router-dom'
import { offers } from '../data/offers.js'

export default function OfferDetail() {
  const { id } = useParams(); const offer = offers.find((item) => item.id === id)
  if (!offer) return <section className="detail-page"><h1>Oferta no encontrada</h1><Link className="button" to="/ofertas">Volver a ofertas</Link></section>
  return <article className="detail-page offer-detail"><Link className="back-link" to="/ofertas">← Volver a ofertas</Link><header><span className="eyebrow">{offer.modality} · Inglés {offer.englishLevel}</span><h1>{offer.company}</h1><p>{offer.description}</p></header><div className="offer-detail-facts"><div><span>Salario base</span><strong>{offer.baseSalary}</strong></div><div><span>Bono</span><strong>{offer.bonus}</strong></div><div><span>Training</span><strong>{offer.training}</strong></div><div><span>Destacado</span><strong>{offer.highlight}</strong></div></div><div className="detail-sections"><section><h2>Requisitos</h2><ul>{offer.requirements.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>Beneficios</h2><ul>{offer.benefits.map((item) => <li key={item}>{item}</li>)}</ul></section></div>{offer.applyUrl ? <a className="button" href={offer.applyUrl}>Quiero aplicar</a> : <span className="button disabled" aria-disabled="true">Aplicación no disponible</span>}<p className="detail-disclaimer">Información de ejemplo para beta. Verificá condiciones directamente con la persona reclutadora.</p></article>
}
