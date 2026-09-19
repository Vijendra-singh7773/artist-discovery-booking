# Artistly — Artist Discovery & Booking

React + TypeScript implementation of the StarClinch-style hiring assignment: searchable artist marketplace, profiles, availability, dynamic pricing, multi-step booking and My Bookings.

## Implemented
- 36 mock artists with search, combined city/category/price filters, rating/price sorting and pagination.
- Artist profile with gallery, sample video, bio, ratings/reviews and availability calendar.
- Dynamic estimator: Wedding 1.35x, Corporate 1.20x, College Fest 1.10x, Private Party 1.00x; weekend adds 15%.
- 3-step booking flow with date validation, email/phone validation, review, async loading, simulated failure and retry.
- Confirmed submission is represented as `Pending`, so a pending booking can be edited; pending/confirmed bookings can be cancelled.
- Double-booking prevention and immediate calendar update without refresh.
- My Bookings dashboard with localStorage persistence.
- Responsive mobile/tablet/desktop UI, semantic labels, keyboard-friendly buttons and accessible form controls.

## Architecture
`pages/` contains route-level screens, `components/` contains reusable UI, `services/api.ts` simulates API calls, `store/AppContext.tsx` owns shared booking state, `data/` contains mock artists, and `types/` contains TypeScript models.

React Context was chosen instead of Redux/Zustand because the shared state is intentionally small: bookings plus derived availability. This keeps the solution easy to explain in a short interview demo.

## Run
```bash
npm install
npm run dev
```
Build:
```bash
npm run build
```

## Deployment
Vercel or Netlify can deploy this Vite SPA. `netlify.toml` and `public/_redirects` are included for SPA route fallback.

## Pricing / availability assumptions
Booked dates are stored as ISO strings in each artist record. A new pending/confirmed booking is merged into that list; cancelling releases the date. The current-month calendar is intentionally simple and can be extended to month navigation in a production backend.

## AI disclosure for demo
AI tools may be used during development, but every generated component should be reviewed, tested and understood before the walkthrough. In the demo, explain what was generated, what was changed, and why.
