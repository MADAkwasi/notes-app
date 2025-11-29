# Frontend - Notes App

This is the frontend of the Notes App, built with **React + TypeScript + Vite**. It communicates with the backend API for authentication and notes management.

## Project Structure

```txt

frontend/
├── src/
│   ├── main.tsx           # React entry point
│   ├── App.tsx            # App container & routes
│   ├── components/        # Reusable UI components
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   ├── NotesList.tsx
│   │   ├── NoteModal.tsx
│   │   └── Pagination.tsx
│   ├── pages/             # Page components
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   └── Notes.tsx
│   ├── api/               # API calls
│   │   ├── axios.ts
│   │   └── auth.ts
│   ├── hooks/             # Custom React hooks
│   │   └── useAuth.ts
│   └── styles/            # Global and component styles
│       └── global.css
├── package.json
├── vite.config.js
└── public/                # Static assets

````

## Requirements

- Node.js >= 20
- pnpm >= 9

## Setup

1. Install dependencies:

```bash
pnpm install
````

2. Run development server:

```bash
pnpm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

3. Build for production:

```bash
pnpm run build
```

- The output will be in the `dist/` folder.
- Copy the build to the backend `public/` folder if you want to serve via Express:

```bash
rm -rf ../backend/src/public/*
cp -r dist/* ../backend/src/public/
```

---

## Scripts

- `dev` → Run Vite dev server for local development
- `build` → Build production-ready frontend
- `preview` → Preview the production build locally

---

## Notes

- Pages: **Login**, **Signup**, **Notes List**
- Components: reusable UI components including modals and pagination
- API calls use **Axios** with JWT authentication
- Supports search, tag filtering, pagination, and sorting of notes
- Environment variables (optional): e.g., API base URL
