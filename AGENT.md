# AGENT.md

This file provides guidance to coding agents (Claude Code, etc.) working in this repository.

## Project Overview

Personal portfolio website — Berkay Kaya (mathematician/full-stack developer). Two separate apps in one repo, no shared root `package.json`:
- `frontend/` — React 19 + Vite + MUI, TypeScript
- `backend/` — NestJS + Prisma + PostgreSQL, TypeScript

## Commands

### Frontend (`cd frontend`)
```bash
npm run dev        # dev server (Vite, default port 5173 unless overridden in vite.config.ts / .env)
npm run build      # vite build (production bundle generated in dist/)
npm run lint       # eslint
npm run preview    # preview production build
```

### Backend (`cd backend`)
```bash
npm run start:dev  # watch mode (nest start --watch), default port 3010 unless PORT env var set
npm run build      # prisma generate && nest build (generates client and compiles to dist/)
npm run start:prod # node dist/main
npm run lint       # eslint --fix
npm run test       # jest (unit)
npm run test:e2e   # jest e2e
npm run test:cov   # coverage
npx prisma db push       # sync schema changes to the DB (no local migration history exists — see note below)
npx prisma generate      # regenerate Prisma client after schema.prisma changes
npx prisma studio        # DB GUI
```

**Important — schema changes**: there is no `prisma/migrations` history in this repo. Running `npx prisma migrate dev` on a fresh clone will detect drift against the live DB and prompt to **reset** the database (dropping all data). Do not do this. Use `npx prisma db push` for additive/non-destructive schema changes instead, then `npx prisma generate`.

### Environment variables
No `.env.example` is checked in. Required vars, gitignored in both apps:
- `frontend/.env`: `VITE_API_URL` (backend base URL, e.g. `http://localhost:3010` or `https://api.kayaberkay.xyz`). Note: Since Vite builds static files, `VITE_API_URL` must be set **before** running `npm run build`.
- `backend/.env`: `DATABASE_URL` (Postgres connection string), `JWT_SECRET`, `JWT_EXPIRY`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `R2_DOMAIN`, `PORT` (optional, defaults to 3010), `FRONTEND_URL` (comma-separated allowed origins, e.g. `https://kayaberkay.xyz,https://www.kayaberkay.xyz`), `ZOHO_SMTP_HOST` (optional, defaults to `smtp.zoho.com` — set to `smtp.zoho.eu` etc. if the account lives in a different Zoho data center), `ZOHO_EMAIL` / `ZOHO_APP_PASSWORD` (SMTP auth — must be a real Zoho mailbox login, not a distribution group/alias; use a Zoho **app password**, not the account password), `CONTACT_TO_EMAIL` (recipient for the contact form)

## Architecture

### Frontend
- Entry: `main.tsx` wraps app in `BrowserRouter` → `ThemeProvider` → `App`
- `App.tsx` — two top-level route trees: `/admin/*` (own app, `pages/admin/index.tsx`, no public `<Layout>`) and everything else inside `<Layout>` (Navbar + main content + Footer + ScrollToTop)
- Public routes: `/`, `/articles`, `/articles/:slug`, `/notes` (currently hidden from UI), `/projects`, `/projects/:id`
- `theme/ThemeContext.tsx` — custom MUI theme with dark/light toggle. Exposes `useThemeContext()`. Custom `ice` typography variant uses "Iceberg"/Outfit-family fonts. Primary color: `#ff9900` (dark) / `#70470b` (light). Always read colors from theme tokens (`primary.main`, `text.secondary`, etc.), not hardcoded hex, so light/dark mode both work.
- Public pages: `home`, `articles` (+ `ArticleDetail`), `notes` (UI link commented out), `projects` (+ `ProjectDetail`) — each `src/pages/<name>/index.tsx`
- Home page's "Get in Touch" section (`pages/home/index.tsx`): left column is static contact info (email/location/GitHub/LinkedIn), right column is a form (`contactApi.send`) posting to the backend's `/contact` endpoint, with a hidden honeypot field for spam
- Admin app: `src/pages/admin/` — `AuthContext` (`contexts/AuthContext.tsx`) gates a `ProtectedRoute`; login via `authApi.login` stores a JWT in `localStorage` (see `services/api.ts`, key `admin_token`). Per-entity list + form pages under `admin/articles`, `admin/notes`, `admin/projects`.
- `services/api.ts` — single API client. Public `articlesApi`/`notesApi`/`projectsApi` (published-only), `contactApi` (unauthenticated `POST /contact`), admin `adminArticlesApi`/`adminNotesApi`/`adminProjectsApi` (`?all=true`, JWT-authenticated writes via `auth: true` option on `apiFetch`).
- Content layout constrained to `maxWidth: 900` centered, similar spacing (`mt: 8, mb: 8`) across pages.
- **Build tool dependencies**: `typescript`, `vite`, `@vitejs/plugin-react`, and `@types/*` are placed in `"dependencies"` in `frontend/package.json` so production deployments (`npm ci --omit=dev`) install them for static bundling.

### Backend
- Standard NestJS modular structure: `ArticlesModule`, `ProjectsModule`, `NotesModule`, `AuthModule`, `ContactModule`, `PrismaModule`
- `PrismaModule` exports `DatabaseService` (extends `PrismaClient`) using `@prisma/adapter-pg` with a `pg` `Pool` — requires `DATABASE_URL` env var
- **Prisma 7 Compatibility**: Uses Prisma 7 (`^7.7.0`). In Prisma 7, database `url` is **no longer supported in `schema.prisma`**; it is configured via `backend/prisma.config.ts`.
- **TypeScript Build Configuration**: `backend/tsconfig.build.json` explicitly sets `"rootDir": "src"` and excludes `"prisma.config.ts"`, ensuring `nest build` outputs directly to `dist/main.js` (preventing `Cannot find module '/app/dist/main'`).
- Auth is **not** DB-backed: `AuthService.login` checks the submitted email/password against `ADMIN_EMAIL`/`ADMIN_PASSWORD` env vars directly and signs a JWT. The `User` model exists in the schema but is unused by any controller.
- `ContactModule` (`src/contact/`) — unauthenticated `POST /contact` (name/email/message + honeypot field). `ContactService` sends mail via `nodemailer` over Zoho SMTP (see env vars above); `reply-to` is set to the submitter's address so replies go straight to them. Rate-limited via `@nestjs/throttler`: global default 20 req/min (`AppModule`), 3 req/min on this endpoint specifically.
- Global `ValidationPipe` with `whitelist: true`, `forbidNonWhitelisted: true`, `transform: true`
- Global `PrismaClientExceptionFilter` maps Prisma errors to HTTP responses
- **CORS Configuration**: Reads allowed origins from `FRONTEND_URL` (supports comma-separated URLs, automatically strips trailing slashes). Allows all HTTP methods including `OPTIONS` and `HEAD` for preflight checks.
- Swagger UI at `/api`
- Port from `process.env.PORT` or `3010`

### Database Models (PostgreSQL via Prisma)
- `Article` — uuid PK, `slug` (unique), `title`, `description`, `content` (Text, Markdown), `coverImage`, `published`, `isFeatured`, `isHero`, timestamps
- `Project` — uuid PK, `title`, `description`, `content` (Text, Markdown, optional), `coverImage`, `link`, `github`, `published`, `isFeatured`, `isHero`, timestamps
- `Note` — uuid PK, `title`, `content` (Text), `published`, timestamps
- `User` — autoincrement PK, `email` (unique), `name`, `password` — unused (see Auth note above)

## Key Patterns

- All IDs are UUIDs (strings) in `Article`/`Project`/`Note`; use `string` type in DTOs/params
- Articles are looked up by both `id` (admin) and `slug` (public, `GET /articles/slug/:slug`); Projects only by `id`
- `published` flag gates public visibility — services filter on it unless `?all=true` is passed (admin-only, requires JWT)
- `isFeatured` — up to 3 per entity, surfaced in the Home page's "Some of my projects" / "Look at my writings" carousels. Admin list pages enforce the 3-item cap client-side before calling the API.
- `isHero` — a **separate**, single-select flag (not related to `isFeatured`) that picks the one project/article shown as the large hero block at the top of `/projects` and `/articles` respectively. `ProjectsService`/`ArticlesService` `create`/`update` enforce single-selection server-side in a transaction (setting one project/article's `isHero: true` unsets it on all others of that type). Admin list pages expose this as a "Hero" checkbox column.
- Content fields (`Article.content`, `Project.content`) are Markdown, rendered via `react-markdown` + `remark-gfm` in `ArticleDetail.tsx`/`ProjectDetail.tsx` with matching `sx` overrides for `h1`–`h3`, code blocks, blockquotes, tables, images.
- Tech icons loaded from `https://cdn.simpleicons.org/<icon>` — icon names must match SimpleIcons slugs. Some brand slugs 404 on `cdn.simpleicons.org` (e.g. `linkedin`, likely trademark-related removal) — fall back to `https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/<icon>.svg` for those; note the jsDelivr SVGs have no `fill` set (render black), so invert via CSS `filter` for dark backgrounds instead of using simpleicons.org's `/<icon>/<hexcolor>` path variant.

## Production & Coolify Deployment

### Frontend Deployment (Coolify / Nixpacks)
- **Base Directory**: `/frontend`
- **Build Command**: `npm run build` (`vite build` outputs static files to `/dist`)
- **Publish Directory**: `/dist`
- **Start Command**: Leave empty (Nixpacks automatically serves SPA static files using lightweight Nginx/Caddy on port 80).
- **Environment Variables**: Must define `VITE_API_URL=https://api.kayaberkay.xyz` in Coolify **before** building, as Vite embeds environment variables into static JS bundles at build time.

### Backend Deployment (Coolify / Nixpacks)
- **Base Directory**: `/backend`
- **Build Command**: `npm run build` (`prisma generate && nest build`)
- **Start Command**: `npm run start:prod` (`node dist/main`)
- **Port**: Expose port `3010` (or set `PORT` env var to match container configuration).
- **Environment Variables**: Set `DATABASE_URL`, `FRONTEND_URL` (`https://kayaberkay.xyz,https://www.kayaberkay.xyz`), `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `JWT_SECRET`, and optional Zoho SMTP vars.

### Infrastructure & VPS Resource Management
- **OOM / Error 137**: TypeScript compilation (`tsc`/`nest build`) and Prisma CLI require significant memory (~1.5GB+ RAM). On smaller VPS instances, ensure at least 4GB Swap is enabled so Linux OOM Killer does not terminate build containers or database services (`coolify-db`).
- **Disk Space**: Docker overlay2 and Nixpacks caches can fill up small root partitions (`/dev/sda2`). Regularly clean unused build artifacts (`docker system prune -a --volumes -f`) or truncate container JSON logs if disk reaches 100%.

