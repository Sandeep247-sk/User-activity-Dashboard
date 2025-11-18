# Frontend

This folder now contains a zero-Typescript, zero-Tailwind React dashboard. Styling is handled with a single `styles.css` file, and components are written in plain `.jsx`.

## Getting started

```bash
cd frontend
npm install
npm run dev
```

The UI expects `VITE_API_BASE_URL` (defaults to `http://localhost:5000`) to reach the Express backend.

## Tech stack

- Vite + React (JavaScript only)
- React Router
- Vanilla CSS (no Tailwind, shadcn, or component libraries)

That's it—simple, portable, and easy to customize.
