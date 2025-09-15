# UI Refactor to Tailwind – Execution Plan and Checklist

Goal: Convert the entire app UI to Tailwind CSS to match the provided HTML landing page’s look-and-feel across all pages. Preserve existing functionality and routes. No backend changes required.

Notes
- Tailwind CDN already included via public/index.html; Inter font loaded.
- Keep color scheme and visual language consistent with the landing page (greens, rounded cards, shadows, spacing).
- Replace legacy inline styles and "card/error/success" classes with Tailwind utilities.
- Fix any minor UI bugs discovered while refactoring (e.g., broken handlers that block rendering).

Batch 1: Core Feature Pages (High Visibility)
- [ ] src/components/Marketplace.js
  - Convert Sell form, buyers list, and success/error states to Tailwind.
  - Use responsive grid for form inputs; consistent button styles.
- [ ] src/components/Weather.js
  - Convert inputs, result cards (current conditions, forecast), advisory/alerts to Tailwind.
  - Use grid layouts for stats; unify success/error styles.
- [ ] src/components/SoilHealth.js
  - Convert form and results; replace inline grids with Tailwind.
  - Style recommendations as success card with consistent heading styles.

Batch 2: Resources and Detection
- [ ] src/components/WaterAvailability.js
  - Overview card, sources grid, recommendations card – Tailwind conversion.
- [ ] src/components/LocalResources.js
  - Location filter, resource cards, emergency contacts, loading/empty states – Tailwind conversion.
- [ ] src/components/DiseaseDetection.js
  - Upload UI, preview, diagnosis/treatment/preventive sections, Kendra block – unified Tailwind cards and buttons.

Batch 3: Schemes and Card Components
- [ ] src/components/Schemes.js
  - Convert filters toolbar, pagination controls, info notes, and scheme cards grid to Tailwind.
  - Remove all inline style objects; use utilities.
- [ ] src/components/BuyerCard.js
  - Standardize card layout, heading, stat rows, and CTA buttons.
- [ ] src/components/LogisticsCard.js
  - Tailwind card with buttons; spacing and responsive layout.
- [ ] src/components/KrishiKendraCard.js
  - Tailwind card; services chips as badges; CTA buttons.

Batch 4: Group Farming Page
- [ ] src/components/GroupFarming.js
  - Convert all sections (location + load, nearby groups, benefits/support, create form) to Tailwind.
  - Implement/repair handlers (e.g., handleChange) if missing.
  - Ensure consistent card and button styles; success/error alerts via Tailwind.

Verification and Testing
- [ ] Run backend tests (no backend changes expected): npm --prefix server test
- [ ] Launch app; smoke test each page visually and functionally:
  - Weather, Soil Health, Disease Detection, Local Resources, Marketplace, Schemes, Group Farming.
- [ ] Check responsiveness across 360px, 768px, 1024px widths.
- [ ] Confirm typography (Inter), spacing, and colors are consistent with the landing page.

Out of Scope
- Backend endpoint changes or database migrations.
- Adding new dependencies (Tailwind stays CDN-based).
- Feature behavior changes (UI-only refactor; fix only UI-breaking issues).

Changelog (to be filled during execution)
- [ ] Batch 1 complete – commits: ...
- [ ] Batch 2 complete – commits: ...
- [ ] Batch 3 complete – commits: ...
- [ ] Batch 4 complete – commits: ...
