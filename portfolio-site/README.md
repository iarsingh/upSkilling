# portfolio-site

Personal portfolio for Akhilesh Ranjan Singh, built with Next.js 16 (App Router), Prisma + PostgreSQL, and a password-protected `/admin` dashboard for editing content without touching code.

## Stack

- **Next.js 16** (App Router, Server Components, Server Actions) - note: Next 16 renamed `middleware.ts` to `proxy.ts`; this project uses the new name.
- **Prisma 7 + PostgreSQL** via `@prisma/adapter-pg` (Prisma 7 requires a driver adapter - the connection URL lives in `prisma.config.ts` / `.env`, not in `schema.prisma`).
- **Tailwind CSS v4**
- Auth: stateless signed-cookie session (`jose`) + bcrypt password hash, no third-party auth service.

## Local setup

1. **Start Postgres.** This repo ships a `docker-compose.yml` for local Postgres. It's mapped to **port 5433**, not 5432, because a native Homebrew Postgres was already occupying 5432 on this machine - check `lsof -nP -iTCP:5432 -sTCP:LISTEN` if you ever need to change it back.

   ```bash
   docker compose up -d
   ```

2. **Configure env vars.**

   ```bash
   cp .env.example .env
   ```

   Fill in `SESSION_SECRET` (`openssl rand -base64 32`) and a real `ADMIN_PASSWORD`. `DATABASE_URL` already points at the docker-compose Postgres by default.

3. **Install deps, migrate, and seed real content.**

   ```bash
   npm install
   npx prisma migrate dev
   npm run db:seed
   ```

   The seed script populates the database with the real profile/experience/skills/projects/certifications data (pulled from the existing `ai-mock-interviewer/data/applicant-profile.json` CV and the actual project folders in this workspace) and creates the `/admin` login user from `ADMIN_USERNAME` / `ADMIN_PASSWORD`.

4. **Run the dev server.**

   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000`. Admin dashboard: `http://localhost:3000/admin/login`.

## Editing content

Everything on the public site (profile summary, experience, skills, projects, certifications) is stored in Postgres and editable from `/admin` after logging in - no redeploy needed for content changes. Server Actions in `app/actions/content.ts` handle all the create/update/delete logic and call `revalidatePath` so public pages reflect edits immediately.

## Architecture notes

- `lib/prisma.ts` - Prisma Client singleton, instantiated with the `@prisma/adapter-pg` driver adapter (required in Prisma 7 - there's no bundled Rust query engine anymore).
- `lib/session.ts` - stateless JWT session (signed with `SESSION_SECRET`), stored in an httpOnly cookie.
- `lib/dal.ts` - Data Access Layer; `verifySession()` is the real auth check, called from every admin page/action. `proxy.ts` (Next 16's renamed `middleware.ts`) only does an *optimistic* cookie-presence check to redirect unauthenticated users before a page even renders - per Next.js's own guidance, it is not a substitute for the DAL check.
- `app/actions/` - all Server Actions (`'use server'`), the only way data is mutated. Route Handlers/API routes weren't needed since Server Components read Prisma directly and Server Actions handle every write.
- `prisma/seed.ts` - idempotent (`upsert`-based); safe to re-run after editing it to add more seed content.

## Deploying

This needs a real hosted Postgres - the docker-compose setup is local-only. Any Postgres-compatible host works (Neon, Supabase, Railway, Render, RDS, Cloud SQL); set `DATABASE_URL` in your host's environment variables to that connection string, and set `SESSION_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD` too. Run `npx prisma migrate deploy` (not `migrate dev`) against the production database before first deploy, then `npm run db:seed` once to create the admin user and initial content.

If deploying to Vercel: this app has no filesystem writes and no SQLite, so it's serverless-safe as-is.
