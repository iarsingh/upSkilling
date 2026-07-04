# High-Level Design - Portfolio Site

## 1. Purpose

The portfolio site is a personal professional website for Akhilesh Ranjan Singh. It presents profile, experience, skills, projects, certifications, and contact details, while also providing a password-protected admin dashboard for editing site content without code changes or redeployment.

## 2. Goals

- Serve a fast public portfolio experience for recruiters and hiring managers.
- Store portfolio content in PostgreSQL so it can be updated from an admin UI.
- Protect administrative content changes behind signed-cookie authentication.
- Keep the architecture serverless-friendly for Vercel or similar hosting.
- Use a simple operational model: Next.js app, Prisma data access, PostgreSQL database.

## 3. Non-Goals

- Multi-user role-based admin workflows.
- Public API for third-party consumers.
- File uploads or media asset management.
- Real-time collaboration in the admin dashboard.
- Complex CMS workflow such as drafts, approvals, and scheduling.

## 4. Technology Stack

- Frontend and backend: Next.js 16 App Router.
- UI rendering: React Server Components and selected Client Components.
- Styling: Tailwind CSS v4 through global CSS utilities.
- Data access: Prisma 7 with `@prisma/adapter-pg`.
- Database: PostgreSQL.
- Authentication: username/password login, bcrypt password hash, signed JWT cookie via `jose`.
- Local database: Docker Compose PostgreSQL on host port `5433`.

## 5. System Context

```text
Visitor / Recruiter
        |
        v
Next.js Public Pages
        |
        v
Server Components -> Prisma Client -> PostgreSQL

Admin User
        |
        v
/admin/login -> Server Action login -> Session Cookie
        |
        v
/admin -> verifySession -> Admin Forms -> Server Actions -> Prisma -> PostgreSQL
```

## 6. Major Components

### 6.1 Public Portfolio Pages

Public pages render profile and portfolio data from PostgreSQL:

- `/` - homepage with profile summary, featured projects, skills, and certifications.
- `/experience` - professional experience timeline.
- `/projects` - project listing.
- `/contact` - contact and social links.

These pages use server-side data reads through functions in `lib/data.ts`.

### 6.2 Admin Dashboard

The admin dashboard at `/admin` lets the authenticated admin manage:

- Profile
- Projects
- Experience
- Skills
- Certifications

The page renders forms directly from database state and submits mutations through Server Actions in `app/actions/content.ts`.

### 6.3 Authentication

Authentication is handled without a third-party identity provider:

- Admin credentials are stored in the `AdminUser` table.
- Passwords are hashed with bcrypt.
- Successful login creates a signed JWT session cookie.
- `proxy.ts` performs an optimistic cookie check for admin routes.
- `lib/dal.ts` performs the actual authorization check in server-rendered admin code and Server Actions.

### 6.4 Data Layer

Prisma is the single database access layer:

- `lib/prisma.ts` creates a Prisma Client singleton.
- `lib/data.ts` contains read helpers for public pages.
- `app/actions/content.ts` contains write operations.
- `prisma/schema.prisma` defines the database models.

### 6.5 Database

PostgreSQL stores all dynamic content and admin credentials.

Core tables:

- `Profile`
- `Experience`
- `Skill`
- `Project`
- `Certification`
- `AdminUser`

## 7. Request Flows

### 7.1 Public Page Read Flow

```text
Browser requests /
  -> Next.js route renders Server Component
  -> Server Component calls lib/data.ts
  -> lib/data.ts queries Prisma
  -> Prisma reads PostgreSQL
  -> HTML is rendered and returned
```

### 7.2 Admin Login Flow

```text
Admin opens /admin/login
  -> submits username and password
  -> login Server Action validates input
  -> Prisma reads AdminUser by username
  -> bcrypt compares submitted password with stored hash
  -> createSession signs JWT cookie
  -> redirect to /admin
```

### 7.3 Admin Page Authorization Flow

```text
Browser requests /admin
  -> proxy.ts checks session cookie presence and validity
  -> unauthenticated user redirects to /admin/login
  -> admin page calls verifySession()
  -> verifySession reads and validates signed session
  -> page loads editable data from PostgreSQL
```

### 7.4 Content Update Flow

```text
Admin submits form
  -> Server Action receives FormData
  -> checkSession validates session
  -> Prisma writes to PostgreSQL
  -> revalidatePath refreshes affected pages
  -> updated public page content becomes visible
```

## 8. Security Design

- Admin password is never stored in plaintext; bcrypt hashes are stored.
- Session cookie is signed with `SESSION_SECRET`.
- Cookie is `httpOnly`, `sameSite=lax`, and `secure` in production.
- Public pages have no mutation surface.
- All mutations require `checkSession()`.
- `proxy.ts` improves route UX but is not trusted as the only authorization layer.
- Database credentials and session secret are provided through environment variables.

## 9. Availability and Scalability

The application is lightweight and read-heavy:

- Public pages are mostly static or server-rendered with database reads.
- Writes are limited to authenticated admin actions.
- Stateless app servers can scale horizontally.
- PostgreSQL is the main stateful dependency.
- Prisma Client singleton avoids creating excessive clients during development.

Production scaling considerations:

- Use hosted PostgreSQL with backups.
- Use connection pooling if deployed to serverless infrastructure.
- Keep admin writes low-frequency.
- Use `revalidatePath` to avoid stale public pages after admin updates.

## 10. Deployment View

```text
Vercel / Node Host
  - Next.js app
  - Server Components
  - Server Actions
  - proxy.ts
        |
        v
Hosted PostgreSQL
  - Portfolio content
  - Admin user

Environment Variables
  - DATABASE_URL
  - SESSION_SECRET
  - ADMIN_USERNAME
  - ADMIN_PASSWORD
```

Local development uses:

```text
Next.js dev server on localhost:3000
PostgreSQL container on localhost:5433
```

## 11. Operational Concerns

- Migrations are stored in `prisma/migrations`.
- Local setup uses `npx prisma migrate dev`.
- Production setup should use `npx prisma migrate deploy`.
- Seed data is created by `npm run db:seed`.
- Content changes happen through `/admin`.
- Logs should be monitored for authentication failures, database failures, and Server Action errors.

## 12. Future Enhancements

- Add admin audit log table for content changes.
- Add richer form validation with typed schemas.
- Add preview/draft workflow for admin edits.
- Add image upload support through object storage.
- Add analytics for recruiter/project page engagement.
- Add rate limiting for `/admin/login`.
- Add automated backup and restore documentation for PostgreSQL.
