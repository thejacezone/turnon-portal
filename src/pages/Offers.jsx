import PageIntro from '../components/PageIntro.jsx'
import { offers } from '../data/offers.js'

export default function Offers() {
  return (
    <>
      <PageIntro eyebrow="Oportunidades" title="Ofertas que pueden encender tu próximo capítulo" description="Una muestra local de oportunidades. En esta fase los datos son informativos y se administran directamente desde el código." />
      <section className="offer-list section-block">{offers.map((offer) => <article className="offer" key={offer.id}><div><span className="eyebrow">{offer.type}</span><h2>{offer.role}</h2><p>{offer.company} · {offer.location}</p></div><div className="offer-side"><span>{offer.modality}</span><small>Publicada {offer.publishedLabel}</small><a className="text-link" href={offer.url}>Ver detalle →</a></div></article>)}</section>
    </>
  )
}
