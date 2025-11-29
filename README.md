# Notes App Monorepo

This is a full-stack notes application built with Node.js + Express + MongoDB for the backend, and React + Vite for the frontend. The project is structured as a **pnpm monorepo**.

## Project Structure

```

notes-app/
├── backend/ # Node.js + Express + MongoDB backend
├── frontend/ # React + Vite frontend
├── pnpm-workspace.yaml
├── package.json # root workspace
└── README.md

```

### Backend

- TypeScript
- Express
- MongoDB via Mongoose
- JWT Authentication
- Notes CRUD with soft delete, tags, pagination, sorting
- Validation with Zod
- Global error handler returning problem-like JSON
- Tests with Jest + Supertest

### Frontend

- React + TypeScript
- Vite bundler
- Pages: Login, Signup, Notes list
- Components: NotesList, NoteModal, Pagination, LoginForm, SignupForm
- Axios setup for API calls with JWT auth

## Requirements

- Node.js >= 20
- pnpm >= 9
- Docker & Docker Compose (optional, for MongoDB)

## Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Run backend + frontend separately

```bash
# Backend
pnpm -F backend dev

# Frontend
pnpm -F frontend dev
```

### 3. Build frontend and serve via backend

```bash
cd frontend
pnpm run build

cd ../backend
rm -rf src/public/*
cp -r ../frontend/dist/* src/public/

pnpm run build
pnpm start
```

### 4. (Optional) Docker Compose

```bash
docker compose up -d
```

## Scripts (Root)

```bash
pnpm dev           # runs backend
pnpm dev:frontend  # runs frontend
pnpm build         # builds frontend + backend
pnpm test          # runs backend tests
```

## Decisions

- **Monorepo**: easier workspace management with pnpm
- **Soft delete**: `deletedAt` field in notes for restore functionality
- **Global error JSON**: consistent API error responses
- **Frontend served via backend**: single origin deployment
