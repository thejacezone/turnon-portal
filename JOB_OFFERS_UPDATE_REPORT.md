# Job Offers Update Report

## Scope

- Project: `turnon-portal`
- Route: `#/ofertas`
- Update date: 2026-07-30
- Backup commit: `07f42b3` — `Backup before updating job offer cards`
- Final commit message: `Add fifteen generalized English job offer cards`

This update is limited to the Offers module. No global navigation, footer, test, practice, lesson, resource, calculator, community, About or Home behavior was changed.

## Active data source

The active data file is:

`src/data/offers.js`

The page continues to generate the cards and dynamic detail routes from this single source. No offer cards were hardcoded into the page JSX.

## Previous offers replaced

The previous file contained four placeholder records:

1. Liberty Mutual UPL
2. Chat Account
3. Customer Service B2
4. Work From Home After Training

All four records were replaced. The former real-name reference was removed, and no real client or account names remain.

No duplicate records were detected in the previous four-item array. The final data set contains no duplicate IDs, slugs or titles.

## Final offers

| # | Category | Title |
|---:|---|---|
| 1 | Customer Service | Banking and Online Services Support |
| 2 | Customer Service | Hotel Guest Relocation Support |
| 3 | Customer Service | School Transportation Support |
| 4 | Tech Support | Smart Wellness Device Support |
| 5 | Tech Support | Audio Device Technical Support |
| 6 | Tech Support | Gaming Platform Chat Support |
| 7 | Health Insurance | Medical Authorization Support |
| 8 | Health Insurance | Senior Healthcare Benefits Support |
| 9 | Health Insurance | Medical and Dental Chat Support |
| 10 | Home & Auto Insurance | Home and Auto Claims Intake |
| 11 | Home & Auto Insurance | Personal Insurance Policy Support |
| 12 | Home & Auto Insurance | Insurance Billing and Renewals |
| 13 | Sales & Retention | Internet, TV and Phone Sales |
| 14 | Sales & Retention | Vacation Property Optimization Sales |
| 15 | Sales & Retention | Hotel Platform Registration Sales |

## Distribution and integrity

- Total offers: **15**
- Customer Service: **3**
- Tech Support: **3**
- Health Insurance: **3**
- Home & Auto Insurance: **3**
- Sales & Retention: **3**
- Unique IDs: **15**
- Unique slugs: **15**
- Enabled application links: **0**

The counters in the interface are calculated from `offers` and `offerCategories`; they are not hardcoded as independent values.

## Filters verified

A compact category filter was added to the existing catalog:

- All
- Customer Service
- Tech Support
- Health Insurance
- Home & Auto Insurance
- Sales & Retention

The default state displays all 15 records. Each category state displays exactly three matching records. The results count updates through an `aria-live` status.

## Components modified

- `src/data/offers.js`
  - Replaced the four placeholders with the approved 15 generalized records.
  - Added unique IDs and slugs.
  - Added category, subcategory, channel, modality, reference status and application availability fields.
- `src/components/OfferCard.jsx`
  - Preserved the existing card layout and visual class system.
  - Changed all card labels and actions to English.
  - Added the approved facts without inventing requirements or benefits.
  - Uses a semantic disabled button when no application is available.
- `src/pages/Offers.jsx`
  - Reads all records and counters from the active data file.
  - Added category filtering and the required availability disclaimer.
- `src/pages/OfferDetail.jsx`
  - Continues to provide one reusable dynamic detail template.
  - Resolves each offer by unique slug, with ID fallback.
  - Shows the complete approved information in English.
- `src/styles/design-system.css`
  - Added styles scoped to `.offers-page` for the catalog counter, category filters, disclaimer and mobile stacking.
  - Existing card typography, colors, radius, shadow and hover selectors were retained.

## Application safety

- No fake URLs were added.
- No `href="#"` values were added.
- No example domains or WhatsApp links were added.
- Every record has `applicationAvailable: false` and `applyUrl: null`.
- Cards and detail pages render `Application unavailable` as a disabled button.
- The required confirmation notice is visible on the catalog and each detail page.

## Dynamic details and HashRouter

`View details` routes to:

`#/ofertas/:slug`

The existing `HashRouter` route remains unchanged and renders `OfferDetail.jsx`. A browser test opened `#/ofertas/smart-wellness-device-support` and confirmed that the selected record, all approved facts, disabled application state and disclaimer render correctly.

## Responsive and accessibility verification

Browser checks:

| Requested width | Cards | Grid | Horizontal overflow | Disabled application buttons |
|---:|---:|---|---|---:|
| 1440 px | 15 | 2 columns | No | 15 |
| 1024 px | 15 | 2 columns | No | 15 |
| 768 px | 15 | 1 column | No | 15 |
| 390 px | 15 | 1 column | No | 15 |
| 360 px | 15 | 1 column | No | 15 |

Additional checks:

- One level-one page heading and semantic level-two card headings.
- Each card is labelled by its title.
- Category controls are semantic buttons with `aria-pressed`.
- `View details` links include offer-specific accessible names.
- Disabled application buttons expose a native disabled state.
- Focus styles remain visible.
- The required information is not communicated through hover alone.
- No console errors were reported during the browser checks.

## Build verification

- Initial `npm run build`: passed before modifications.
- Intermediate `npm run build`: passed after the data and UI update.
- Final `npm run build`: required immediately before the final commit.
