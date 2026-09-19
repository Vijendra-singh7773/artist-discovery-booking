# Artist Discovery & Booking

A modern React + TypeScript artist discovery and booking marketplace built as a frontend hiring assignment.

## Live Demo

Add your deployed Vercel/Netlify URL here:

`https://artist-discovery-booking-hrmk.vercel.app/`

## GitHub Repository

Add your public GitHub repository URL here:

`https://github.com/Vijendra-singh7773/artist-discovery-booking`

## Features

### Artist Discovery
- 50+ Indian artist profiles
- Singer, Rapper, DJ, Dancer, Comedian, Band and Instrumentalist categories
- Search by artist name/category
- Filter by city, category and price range
- Sort by price and rating
- Pagination
- Empty search/filter state

### Artist Profile
- Artist image and gallery
- Biography
- Category and city
- Rating and reviews
- Featured YouTube content
- Month-view availability calendar
- Available/booked dates
- Dynamic price estimator
- Event-type pricing multipliers
- Request to Book flow

### Booking Flow
- Step 1: Event details
- Step 2: Contact details
- Step 3: Review and confirmation
- Email and phone validation
- Calculated booking price
- Loading state
- Success state
- Error state with retry
- Double-booking prevention
- Calendar updates immediately after confirmation

### My Bookings
- Session bookings stored in localStorage
- Pending, Confirmed and Cancelled statuses
- Cancel booking with confirmation
- Edit date for pending bookings
- Availability re-validation

### UI/UX
- Responsive mobile, tablet and desktop layouts
- Modern entertainment-focused visual design
- Loading, empty and error states
- Semantic HTML and accessible form labels
- Keyboard-friendly interactive elements
- Related artist recommendations
- Event-type and discovery sections
- FAQ and footer sections

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- React Context for application state
- LocalStorage for session booking persistence
- Mock asynchronous API/data layer
- YouTube search links for featured content

## Why These Technologies?

### React
React provides reusable components and is well suited for a UI with multiple interactive sections such as artist cards, filters, calendars, booking steps and dashboards.

### TypeScript
TypeScript provides static typing for artist data, booking objects, form state and component props, reducing runtime mistakes and making the project easier to maintain.

### Vite
Vite provides a fast development server and a lightweight production build setup.

### React Context
The application has shared state for artists, bookings and booking-related updates. Context keeps the implementation simple without introducing a heavier state-management library for this assignment.

### localStorage
The assignment does not require a real backend. Bookings are persisted in localStorage so they remain available after refreshing the browser during the current demo environment.

## Data Model

Artist data contains:

- `id`
- `name`
- `category`
- `city`
- `price`
- `rating`
- `reviews`
- `bio`
- `image`
- `gallery`
- `video`
- `bookedDates`

Booking data contains the selected artist, event details, contact information, calculated price and booking status.

## Availability Logic

Each artist has a list of booked dates.

When a user selects a date:

1. The date is checked against the artist's booked dates.
2. Already-booked dates cannot be selected.
3. A confirmed booking adds the date to the artist's booked dates in application state.
4. The calendar updates immediately without a page refresh.
5. Editing a pending booking performs the availability check again.

## Dynamic Pricing

The base artist price is adjusted using:

- Event type
- Weekday/weekend date

The exact multipliers are application-level demo decisions and are documented in the price calculation logic.

## Project Structure

```text
src/
├── components/
├── data/
├── pages/
├── services/
├── store/
├── types/
├── main.tsx
└── styles.css
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/artist-discovery-booking.git
cd artist-discovery-booking
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the local URL shown by Vite, usually:

```text
http://localhost:5173
```

### 4. Production build

```bash
npm run build
```

### 5. Preview production build

```bash
npm run preview
```

## Deployment

The project can be deployed to Vercel or Netlify.

### Vercel

1. Push the project to a public GitHub repository.
2. Open Vercel.
3. Import the GitHub repository.
4. Framework preset: Vite.
5. Build command:

```bash
npm run build
```

6. Output directory:

```text
dist
```

7. Deploy.

## Git Commit History

The repository should show incremental commits rather than one large final commit.

Recommended commit sequence:

```text
chore: initialize React TypeScript Vite project
feat: add artist data and listing cards
feat: add artist search filters and sorting
feat: add artist profile and availability calendar
feat: add dynamic event price estimator
feat: add multi-step booking flow and validation
feat: add bookings dashboard with edit and cancel
feat: improve responsive UI and accessibility
docs: add README and assignment documentation
```

## Assignment Decisions

### Mock Data
A real backend is not required by the assignment, so artist and booking operations use frontend/mock data while preserving realistic loading and error behavior.

### Booking Persistence
Bookings are stored in localStorage because the assignment allows in-memory or localStorage storage.

### Pricing
Pricing multipliers are intentionally configurable demo rules rather than claims about real artist booking rates.

### Artist Profiles
Artist profile information is used for the assignment's discovery UI. Pricing, ratings, reviews and availability are demo values and should not be interpreted as real booking offers.

## AI Usage

AI tools may be used during development as permitted by the assignment. Any generated code was reviewed, adapted and integrated into the project rather than submitted without understanding.

During the demo, be prepared to explain:
- What AI was used for
- Which parts were changed
- Why implementation decisions were made
- How the main components and state flow work

## Testing Checklist

Before submission:

- [ ] Search works
- [ ] All filters can be combined
- [ ] Sorting works
- [ ] Pagination works
- [ ] Empty state works
- [ ] Artist profile loads
- [ ] Calendar shows booked dates
- [ ] Price changes with event type/date
- [ ] Booking validation works
- [ ] Loading/success/error states work
- [ ] Retry works
- [ ] Double booking is prevented
- [ ] Booking appears in My Bookings
- [ ] Pending booking date can be edited
- [ ] Booking can be cancelled
- [ ] Mobile layout works at 375px
- [ ] No console errors/warnings
- [ ] Production build succeeds
- [ ] GitHub repository is public
- [ ] Live deployment works

## License

This project was created as a hiring-assignment demonstration project.
