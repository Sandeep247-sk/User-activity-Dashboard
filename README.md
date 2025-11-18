## User Activity Dashboard

This repository now follows a clean full‑stack layout with two explicit workspaces:

- `frontend/` – Vite + React + TypeScript client that visualizes login and security telemetry
- `backend/` – Express API that authenticates users and persists activity logs in simple JSON stores

### Getting Started

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm run dev
```

The frontend expects `VITE_API_BASE_URL` (default `http://localhost:5000`). The backend honors `PORT` and `ALLOWED_ORIGIN`. Set them via `.env` files if you need to override defaults.

### Key Commands

- `npm run build` (frontend) – production bundle
- `npm run dev` (backend) – hot reload API server with nodemon

### Folder Overview

```
backend/
  src/              # Express server, routes, services, utilities
  data/             # JSON files acting as the lightweight database
frontend/
  src/              # React components, pages, hooks, and API helpers
  public/           # Static assets
```

Unnecessary duplicate starter files have been removed so you're left with a focused stack that uses JavaScript/TypeScript on both sides.

