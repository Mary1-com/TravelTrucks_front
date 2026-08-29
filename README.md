# TravelTrucks

TravelTrucks is a camper rental web application built with Next.js and
TypeScript. Users can browse available campers, apply backend filters, load
additional results, view detailed camper information, explore image galleries
and reviews, and submit booking requests.

## Live Demo

[TravelTrucks on Vercel](https://travel-trucks-front-roan.vercel.app/)

## Features

### Home page

- responsive hero section
- navigation to the camper catalog
- active navigation state

### Camper catalog

- camper data loaded from the backend
- backend filtering through query parameters
- filtering by:
  - location
  - camper form
  - engine type
  - transmission type
- separate draft and applied filter states
- filter reset
- pagination with `Load more`
- four additional campers loaded per request
- loading overlay during asynchronous requests
- empty-results state
- responsive camper cards
- camper details opened in a new browser tab

### Camper details

- dynamic route for every camper
- complete camper information
- vehicle characteristics and amenities
- interactive image gallery
- four gallery thumbnails
- active thumbnail indication
- user reviews
- five-star rating scale
- responsive booking form
- client-side form validation
- booking request submission to the backend
- success toast after a `201 Created` response
- loading and error states

### UI and accessibility

- desktop, tablet, and mobile layouts
- semantic HTML
- keyboard-accessible controls
- focus-visible states
- accessible labels and status messages
- optimized images with `next/image`
- page metadata, canonical URLs, Open Graph, and Twitter metadata

## Technologies

- [Next.js 16](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Query](https://tanstack.com/query/latest)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [React Icons](https://react-icons.github.io/react-icons/)
- [ESLint](https://eslint.org/)
- [Vercel](https://vercel.com/)

## API

The application uses the TravelTrucks API:

```text
https://campers-api.goit.study
```

Main endpoints:

```text
GET  /campers
GET  /campers/:camperId
GET  /campers/:camperId/reviews
POST /campers/:camperId/booking-requests
```

Catalog query parameters:

```text
page
perPage
location
form
engine
transmission
```

Each catalog request loads four campers.

A booking request sends:

```json
{
  "name": "User name",
  "email": "user@example.com"
}
```

## Routes

| Route                 | Description                                   |
| --------------------- | --------------------------------------------- |
| `/`                   | Home page                                     |
| `/catalog`            | Camper catalog and filters                    |
| `/catalog/[camperId]` | Camper details, reviews, gallery, and booking |

## Getting Started

### Requirements

- Node.js 20 or newer
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/Mary1-com/TravelTrucks_front.git
cd TravelTrucks_front
```

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

No environment variables are required because the public API base URL is
configured in the application.

## Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Creates an optimized production build.

```bash
npm start
```

Starts the production server after a successful build.

```bash
npm run lint
```

Runs ESLint.

## Project Structure

```text
src/
├── app/
│   ├── catalog/
│   │   ├── [camperId]/
│   │   ├── CatalogClient.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── BookingForm/
│   ├── CamperCard/
│   ├── CamperGallery/
│   ├── CamperInfoPanel/
│   ├── CamperReviews/
│   ├── EmptyCatalog/
│   ├── FiltersSidebar/
│   ├── Header/
│   └── LoadingOverlay/
├── lib/
│   └── api/
├── providers/
└── types/
```

## Verification

Before committing changes, run:

```bash
npm run lint
npm run build
git diff --check
```

Manual verification includes:

- home-to-catalog navigation
- backend filtering
- filter reset
- `Load more` pagination
- camper details opening in a new tab
- gallery thumbnail switching
- five-star review rendering
- booking validation and submission
- success toast
- responsive layouts
- absence of horizontal overflow
- absence of application errors in the browser console

## Author

**Maryna Vinnikova**

- GitHub: [Mary1-com](https://github.com/Mary1-com)
