# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website — Berkay Kaya (mathematician/full-stack developer). Two separate apps:
- `frontend/` — React + Vite + MUI, TypeScript
- `backend/` — NestJS + Prisma + PostgreSQL, TypeScript

## Commands

### Frontend (`cd frontend`)
```bash
npm run dev        # dev server (Vite)
npm run build      # tsc + vite build
npm run lint       # eslint
npm run preview    # preview production build
```

### Backend (`cd backend`)
```bash
npm run start:dev  # watch mode
npm run build      # nest build
npm run start:prod # node dist/main
npm run lint       # eslint --fix
npm run test       # jest (unit)
npm run test:e2e   # jest e2e
npm run test:cov   # coverage
npx prisma migrate dev   # run migrations
npx prisma studio        # DB GUI
```

## Architecture

### Frontend
- Entry: `main.tsx` wraps app in `BrowserRouter` → `ThemeProvider` → `App`
- `App.tsx` defines routes inside `<Layout>` (Navbar + main content area + Footer + ScrollToTop)
- `theme/ThemeContext.tsx` — custom MUI theme with dark/light toggle. Exposes `useThemeContext()`. Custom `ice` typography variant uses "Iceberg" font. Primary color: `#ff9900` (dark) / `#70470b` (light).
- Pages: `home`, `articles`, `notes`, `projects` — each is `src/pages/<name>/index.tsx`
- Content layout constrained to `maxWidth="md"` centered with `px: 1.5rem`

### Backend
- Standard NestJS modular structure: `ArticlesModule`, `ProjectsModule`, `NotesModule`, `PrismaModule`
- `PrismaModule` exports `DatabaseService` (extends `PrismaClient`) using `@prisma/adapter-pg` with `pg` connection pool — requires `DATABASE_URL` env var
- Global `ValidationPipe` with `whitelist: true`, `forbidNonWhitelisted: true`, `transform: true`
- Global `PrismaClientExceptionFilter` maps Prisma errors to HTTP responses
- Swagger UI at `/api`
- Port from `process.env.PORT` or `3000`

### Database Models (PostgreSQL via Prisma)
- `Article` — uuid PK, `slug` (unique), `title`, `description`, `content` (Text), `coverImage`, `published`, timestamps
- `Project` — uuid PK, `title`, `description`, `content`, `coverImage`, `link`, `github`, `published`, timestamps
- `Note` — uuid PK, `title`, `content` (Text), `published`, timestamps
- `User` — autoincrement PK, `email` (unique), `name`, `password` (admin auth, not yet wired into controllers)

## Key Patterns

- All IDs are UUIDs (strings) in Article/Project/Note; use `string` type in DTOs/params
- Articles support lookup by both `id` and `slug` (`GET /articles/slug/:slug`)
- `published` flag gates content visibility — filter in service queries as needed
- Tech icons loaded from `https://cdn.simpleicons.org/<icon>` — icon names must match SimpleIcons slugs
