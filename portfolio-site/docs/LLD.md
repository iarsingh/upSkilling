# Low-Level Design - Portfolio Site

## 1. Codebase Layout

```text
portfolio-site/
  app/
    page.tsx
    layout.tsx
    globals.css
    admin/
      page.tsx
      login/page.tsx
    actions/
      auth.ts
      content.ts
    components/
      Avatar.tsx
      Footer.tsx
      NavBar.tsx
      TerminalWindow.tsx
      TypedLines.tsx
      icons.tsx
    contact/page.tsx
    experience/page.tsx
    projects/page.tsx
  lib/
    dal.ts
    data.ts
    prisma.ts
    session.ts
  prisma/
    schema.prisma
    seed.ts
    migrations/
  proxy.ts
```

## 2. Runtime Modules

### 2.1 `lib/prisma.ts`

Responsibility:

- Creates and exports the Prisma Client.
- Uses `@prisma/adapter-pg` with `DATABASE_URL`.
- Caches Prisma Client on `globalThis` during development to avoid excessive connections during hot reload.

Key object:

```ts
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });
```

Failure conditions:

- Missing or invalid `DATABASE_URL`.
- PostgreSQL unavailable.
- Prisma generated client missing.

### 2.2 `lib/session.ts`

Responsibility:

- Creates, reads, decrypts, and deletes the admin session cookie.
- Uses `jose` for signed JWT sessions.

Important constants:

- Cookie name: `portfolio_admin_session`
- Session duration: 7 days
- Required env var: `SESSION_SECRET`

Functions:

- `encrypt(payload)` - signs session payload.
- `decrypt(session)` - verifies and decodes session.
- `createSession(username)` - creates signed cookie.
- `deleteSession()` - deletes cookie.
- `getSession()` - reads cookie and returns payload or `null`.

Cookie settings:

```ts
{
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/"
}
```

### 2.3 `lib/dal.ts`

Responsibility:

- Central authorization checks for protected server code.

Functions:

- `verifySession()` - redirects unauthenticated users to `/admin/login`.
- `checkSession()` - returns `null` instead of redirecting; used inside Server Actions.

Design note:

`proxy.ts` is only an early route guard. Real authorization lives here.

### 2.4 `lib/data.ts`

Responsibility:

- Read-only data access helpers used by public pages and admin page.

Functions:

- `getProfile()`
- `getExperience()`
- `getSkills()`
- `getProjects()`
- `getFeaturedProjects()`
- `getCertifications()`

Ordering:

- Experience, skills, projects, and certifications are ordered by `order`.

## 3. Database Design

### 3.1 `Profile`

Purpose:

- Stores the primary personal profile shown across the site.

Important fields:

- `id Int @id @default(1)` - single-row profile pattern.
- `fullName`
- `headline`
- `summary`
- `email`
- `phone`
- `location`
- `linkedin`
- `github`
- Optional links: `kaggle`, `hackerrank`, `credly`, `resumeUrl`
- `updatedAt`

### 3.2 `Experience`

Purpose:

- Stores professional experience timeline entries.

Fields:

- `id`
- `title`
- `company`
- `location`
- `startDate`
- `endDate`
- `highlights String[]`
- `order`
- `createdAt`
- `updatedAt`

### 3.3 `Skill`

Purpose:

- Stores categorized skill chips.

Fields:

- `id`
- `name @unique`
- `category`
- `order`

### 3.4 `Project`

Purpose:

- Stores portfolio projects.

Fields:

- `id`
- `title`
- `slug @unique`
- `summary`
- `description`
- `tags String[]`
- Optional URLs: `repoUrl`, `liveUrl`
- `featured`
- `order`
- timestamps

### 3.5 `Certification`

Purpose:

- Stores certifications and credential links.

Fields:

- `id`
- `name`
- `issuer`
- `year`
- `url`
- `order`

### 3.6 `AdminUser`

Purpose:

- Stores admin login identity.

Fields:

- `id`
- `username @unique`
- `passwordHash`

## 4. Route Design

### 4.1 `/`

File:

- `app/page.tsx`

Reads:

- Profile
- Featured projects
- Skills
- Certifications

Purpose:

- Public landing page with personal brand, technical positioning, featured work, and proof points.

### 4.2 `/experience`

File:

- `app/experience/page.tsx`

Reads:

- Experience records ordered by `order`.

Purpose:

- Detailed career timeline.

### 4.3 `/projects`

File:

- `app/projects/page.tsx`

Reads:

- Project records ordered by `order`.

Purpose:

- Full project list.

### 4.4 `/contact`

File:

- `app/contact/page.tsx`

Reads:

- Profile contact fields.

Purpose:

- Recruiter/contact entry point.

### 4.5 `/admin/login`

File:

- `app/admin/login/page.tsx`

Action:

- `login()` from `app/actions/auth.ts`.

Purpose:

- Authenticates the admin user and creates the session cookie.

### 4.6 `/admin`

File:

- `app/admin/page.tsx`

Authorization:

- Calls `verifySession()` before loading editable data.

Reads:

- Profile
- Experience
- Skills
- Projects
- Certifications

Actions:

- Profile update
- Project create/update/delete
- Experience create/update/delete
- Skill create/delete
- Certification create/delete
- Logout

## 5. Server Actions

### 5.1 Auth Actions - `app/actions/auth.ts`

#### `login(_prevState, formData)`

Input:

- `username`
- `password`

Flow:

```text
Read username/password
  -> validate non-empty input
  -> find AdminUser by username
  -> bcrypt.compare(password, passwordHash)
  -> createSession(username)
  -> redirect /admin
```

Errors:

- Empty credentials return form error.
- Invalid username/password returns generic error.

#### `logout()`

Flow:

```text
deleteSession()
  -> redirect /admin/login
```

### 5.2 Content Actions - `app/actions/content.ts`

All content actions call `requireAuth()` before mutating data.

#### Shared helper: `requireAuth()`

Flow:

```text
checkSession()
  -> if null, throw Unauthorized
```

#### Shared helper: `linesToArray(value)`

Purpose:

- Converts textarea input into trimmed string arrays.

Used for:

- Project tags
- Experience highlights

### 5.3 Profile Update

Function:

- `updateProfile(formData)`

Operation:

- `prisma.profile.upsert({ where: { id: 1 } })`

Revalidates:

- `/`
- `/contact`
- `/admin`

### 5.4 Project Actions

Functions:

- `createProject(formData)`
- `updateProject(id, formData)`
- `deleteProject(id)`

Slug normalization:

```ts
trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-")
```

Revalidates:

- `/`
- `/projects`
- `/admin`

### 5.5 Experience Actions

Functions:

- `createExperience(formData)`
- `updateExperience(id, formData)`
- `deleteExperience(id)`

Revalidates:

- `/experience`
- `/admin`

### 5.6 Skill Actions

Functions:

- `createSkill(formData)`
- `deleteSkill(id)`

Revalidates:

- `/`
- `/admin`

### 5.7 Certification Actions

Functions:

- `createCertification(formData)`
- `deleteCertification(id)`

Revalidates:

- `/`
- `/admin`

## 6. Authorization and Security Control Flow

### 6.1 Route-Level Optimistic Guard

File:

- `proxy.ts`

Flow:

```text
Request to /admin/*
  -> read portfolio_admin_session cookie
  -> decrypt session
  -> if no session and route is protected, redirect /admin/login
  -> if session exists and route is /admin/login, redirect /admin
```

This does not replace server-side authorization.

### 6.2 Server-Side Guard

Protected page:

- `/admin` calls `verifySession()`.

Protected mutations:

- All write actions call `requireAuth()` -> `checkSession()`.

Security result:

- Even if proxy behavior changes, protected pages and mutations still validate the signed session.

## 7. Data Validation Rules

Current validation is lightweight and form-driven:

- Required fields are enforced mostly with HTML `required`.
- Server Actions convert missing values to empty strings.
- Optional URLs become `null` when blank.
- Tags and highlights split by newline.
- Project slug is normalized server-side.

Recommended future validation:

- Add typed schema validation for all Server Actions.
- Validate URL fields.
- Validate `order` as integer.
- Enforce max lengths for public display fields.
- Handle unique constraint errors with admin-friendly messages.

## 8. Revalidation Design

The site uses `revalidatePath` after mutations.

Reason:

- Public pages may be statically optimized or cached by Next.js.
- Admin writes must be reflected on public routes quickly.

Examples:

- Updating profile revalidates `/`, `/contact`, and `/admin`.
- Updating projects revalidates `/`, `/projects`, and `/admin`.
- Updating experience revalidates `/experience` and `/admin`.

## 9. Error Handling

Current behavior:

- Login returns friendly form errors.
- Content actions throw `Unauthorized` when session is absent.
- Prisma unique/constraint errors are not yet converted into friendly messages.
- Public read failures surface as server-render errors.

Recommended improvements:

- Add action result states for content forms.
- Add centralized Prisma error mapping.
- Add admin toast/status feedback.
- Add route-level error boundaries.

## 10. Local Development Design

Local dependencies:

- Node.js
- npm
- Docker
- PostgreSQL container

Important commands:

```bash
docker compose up -d
npm install
npx prisma migrate dev
npm run db:seed
npm run dev
```

Local URLs:

- Public site: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin/login`
- PostgreSQL: `127.0.0.1:5433`

## 11. Deployment Design

Production requirements:

- Hosted PostgreSQL database.
- Environment variables:
  - `DATABASE_URL`
  - `SESSION_SECRET`
  - `ADMIN_USERNAME`
  - `ADMIN_PASSWORD`

Deployment sequence:

```text
Install dependencies
  -> prisma migrate deploy
  -> next build
  -> start Next.js app
  -> seed admin/content once if needed
```

## 12. Sequence Diagrams

### 12.1 Login

```text
Admin Browser
  -> /admin/login form submit
  -> login Server Action
  -> Prisma AdminUser lookup
  -> bcrypt password check
  -> createSession
  -> Set-Cookie
  -> redirect /admin
```

### 12.2 Admin Content Update

```text
Admin Browser
  -> submit project form
  -> updateProject Server Action
  -> checkSession
  -> Prisma update Project
  -> revalidatePath("/", "/projects", "/admin")
  -> updated pages render fresh content
```

### 12.3 Public Page Render

```text
Visitor Browser
  -> GET /projects
  -> app/projects/page.tsx
  -> getProjects()
  -> Prisma findMany()
  -> PostgreSQL
  -> render HTML
```

## 13. Testing Strategy

Recommended checks:

- `npm run lint`
- `npm run build`
- Login with valid/invalid credentials.
- Verify unauthenticated `/admin` redirects to `/admin/login`.
- Create/update/delete a project and confirm `/projects` updates.
- Create/update/delete experience and confirm `/experience` updates.
- Verify public pages render when database contains seeded content.

## 14. Known Technical Debt

- Server Action inputs are not strongly validated.
- No audit logging for admin mutations.
- No rate limiting on login attempts.
- No admin UI feedback for successful content saves beyond page refresh.
- No file upload/image management.
- No integration tests for auth or content mutation flows.

## 15. Extension Points

- Add `AuditLog` model for admin changes.
- Add `PageView` or analytics integration.
- Add `Resume` model or file URL management.
- Add draft/publish workflow.
- Add multiple admin users and role-based permissions.
- Add object storage-backed project images.
