# Gemini CLI - Project Context: MyWebsite

This project is a full-stack portfolio/personal website application consisting of a NestJS backend and a React frontend.

## Project Structure

- **`backend/`**: NestJS application providing a REST API.
    - **Core Technologies**: NestJS, Prisma (ORM), PostgreSQL, Swagger, Jest.
    - **Key Modules**: Articles, Notes, Projects, Auth (JWT-based), and Prisma.
    - **Database**: Managed via Prisma (`backend/prisma/schema.prisma`).
- **`frontend/`**: React application built with Vite.
    - **Core Technologies**: React 19, Material UI (MUI), React Router, React Markdown.
    - **Key Features**: Admin dashboard for content management, Markdown editor, and public-facing project/article displays.

## Development Workflow

### Backend (`/backend`)
- **Install Dependencies**: `npm install`
- **Run Development Server**: `npm run start:dev` (starts NestJS in watch mode)
- **Database Migrations**: Use `npx prisma migrate dev`
- **Testing**: `npm run test` (unit) or `npm run test:e2e` (end-to-end)
- **Linting**: `npm run lint`

### Frontend (`/frontend`)
- **Install Dependencies**: `npm install`
- **Run Development Server**: `npm run dev` (starts Vite server)
- **Build for Production**: `npm run build`
- **Linting**: `npm run lint`

## Engineering Standards

- **Language**: TypeScript is used across both frontend and backend. Rigorous type safety is expected.
- **Styling**: Frontend uses Material UI with Emotion for styling.
- **API Communication**: The frontend interacts with the backend via a centralized API service (`frontend/src/services/api.ts`).
- **Code Style**: ESLint and Prettier are configured in both directories. Always run linting before submitting changes.
- **Validation**: Backend uses `class-validator` and `class-transformer` for DTO validation.
- **Documentation**: Swagger/OpenAPI is integrated into the backend (see `main.ts`).

## Key Files

- `backend/prisma/schema.prisma`: Database schema definitions.
- `frontend/src/App.tsx`: Main routing and application structure.
- `frontend/src/contexts/AuthContext.tsx`: Authentication state management.
- `AGENT.md` / `CLAUDE.md`: Additional local environment instructions.
