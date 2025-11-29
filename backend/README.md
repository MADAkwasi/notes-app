# Backend - Notes App

This is the backend of the Notes App, built with **Node.js + TypeScript + Express + MongoDB**. It provides a REST API for authentication and notes management.

## Project Structure

backend/
├── src/
│   ├── app.ts               # Express app configuration
│   ├── server.ts            # Server entry point
│   ├── config/              # Configuration files
│   │   ├── env.ts           # Environment variables
│   │   └── db.ts            # MongoDB connection
│   ├── middleware/          # Express middleware
│   │   ├── auth.ts          # JWT authentication
│   │   ├── errorHandler.ts  # Global error handler (problem-like JSON)
│   │   └── validate.ts      # Request validation middleware
│   ├── modules/             # Feature-based structure
│   │   ├── auth/            # Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.routes.ts
│   │   │   └── auth.schema.ts
│   │   ├── notes/           # Notes module
│   │   │   ├── note.model.ts
│   │   │   ├── note.controller.ts
│   │   │   ├── note.service.ts
│   │   │   ├── note.routes.ts
│   │   │   └── note.schema.ts
│   ├── utils/
│   │   ├── error.ts          # AppError class for consistent errors
│   │   └── jwt.ts            # JWT helper functions
│   └── public/               # Built frontend files (optional)
├── package.json
├── tsconfig.json
├── jest.config.js
└── Dockerfile

---

## Requirements

- Node.js >= 20
- pnpm >= 9
- MongoDB (local or via Docker)
- Environment variables in `.env`:

``` Javascript

PORT=3000
MONGO_URI=mongodb://localhost:27017/notes-app
JWT_SECRET=your_jwt_secret

````

---

## Setup

1. Install dependencies:

```bash
pnpm install
````

2. Run development server:

```bash
pnpm run dev
```

The server will start on `http://localhost:3000` (default port).

3. Build and start production:

```bash
pnpm run build
pnpm start
```

---

## Scripts

- `dev` → Run backend in development mode (with ts-node / nodemon)
- `build` → Compile TypeScript to JavaScript (`dist/`)
- `start` → Run compiled backend
- `test` → Run Jest tests (unit and integration)

---

## Features

- **Authentication:** Signup and login with JWT
- **Notes CRUD:** Create, read, update, delete (soft delete with `deletedAt`)
- **Search & Filter:** Search by title/content, filter by tags, sort, pagination
- **Validation:** Zod request validation
- **Global Error JSON:** Consistent error responses
- **Optimistic Locking:** Optional (version field to prevent conflicts)
- **Frontend Integration:** Serves built frontend from `public/` folder

---

## Testing

- **Unit tests** for controllers and services
- **Integration tests** for database operations (H2/Testcontainers equivalent with MongoDB)
- Example test files: `auth.test.ts`, `notes.test.ts`, `search-pagination.test.ts`
