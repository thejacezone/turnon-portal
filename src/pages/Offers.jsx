import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import OfferCard from '../components/OfferCard.jsx'
import { offerCategories, offers } from '../data/offers.js'

export default function Offers() {
  const [activeCategory, setActiveCategory] = useState('All')
  const categoryCounts = useMemo(
    () => Object.fromEntries(offerCategories.map((category) => [
      category,
      offers.filter((offer) => offer.category === category).length,
    ])),
    [],
  )
  const visibleOffers = activeCategory === 'All'
    ? offers
    : offers.filter((offer) => offer.category === activeCategory)

  return (
    <div className="portal-page offers-page">
      <PageHeader
        eyebrow="TurnOn / Opportunities"
        title="Find your next opportunity"
        description="Explore generalized roles where English can open the door to customer service, technical support, insurance and sales."
      />
      <section className="offers-catalog page-section" aria-labelledby="offers-catalog-title">
        <div className="offers-catalog-header">
          <div>
            <span className="eyebrow">GENERALIZED JOB REFERENCES</span>
            <h2 id="offers-catalog-title">Explore all offers</h2>
          </div>
          <p className="offers-total"><strong>{offers.length}</strong> total offers</p>
        </div>

        <div className="offer-category-filters" aria-label="Filter offers by category">
          <button
            type="button"
            className={activeCategory === 'All' ? 'active' : ''}
            aria-pressed={activeCategory === 'All'}
            onClick={() => setActiveCategory('All')}
          >
            All <span>{offers.length}</span>
          </button>
          {offerCategories.map((category) => (
            <button
              type="button"
              className={activeCategory === category ? 'active' : ''}
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              key={category}
            >
              {category} <span>{categoryCounts[category]}</span>
            </button>
          ))}
        </div>

        <p className="results-count" role="status" aria-live="polite">
          Showing {visibleOffers.length} of {offers.length} offers
        </p>
        <p className="offers-disclaimer">
          Job availability, salary, schedules, bonuses and work-from-home conditions must be confirmed before applying.
        </p>

        <div className="offer-grid page-grid" id="offers-results">
          {visibleOffers.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
        </div>
      </section>
    </div>
  )
}
