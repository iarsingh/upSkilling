# Data Flow and Working - Portfolio Site

## 1. Simple Overview

The portfolio site has two main parts:

- Public website: visitors can view profile, projects, experience, skills, certifications, and contact details.
- Admin dashboard: the owner logs in and updates the website content from forms.

All dynamic content is stored in PostgreSQL. Next.js reads that data through Prisma and renders pages. Admin changes are written through Server Actions, then affected pages are revalidated.

```text
Browser
  -> Next.js Page / Server Action
  -> Prisma Client
  -> PostgreSQL
  -> Next.js renders updated UI
```

## 2. Public Website Data Flow

Example: visitor opens the homepage `/`.

```text
User opens /
  -> app/page.tsx runs on the server
  -> app/page.tsx calls read helpers from lib/data.ts
  -> lib/data.ts uses Prisma
  -> Prisma queries PostgreSQL
  -> profile, skills, featured projects, certifications return
  -> Next.js renders HTML
  -> browser displays portfolio page
```

Important files:

- `app/page.tsx`
- `app/projects/page.tsx`
- `app/experience/page.tsx`
- `app/contact/page.tsx`
- `lib/data.ts`
- `lib/prisma.ts`
- `prisma/schema.prisma`

## 3. Admin Login Flow

When the admin logs in:

```text
Admin opens /admin/login
  -> login form submits username/password
  -> app/actions/auth.ts login() runs on server
  -> Prisma checks AdminUser table
  -> bcrypt compares password with stored passwordHash
  -> if valid, session.ts creates signed JWT cookie
  -> browser receives httpOnly cookie
  -> user redirects to /admin
```

The password is never stored directly. Only `passwordHash` is stored in PostgreSQL.

Important files:

- `app/admin/login/page.tsx`
- `app/actions/auth.ts`
- `lib/session.ts`
- `prisma/schema.prisma`

## 4. Admin Authorization Flow

There are two layers of protection.

### 4.1 Early Route Check

```text
Request to /admin
  -> proxy.ts reads session cookie
  -> if missing/invalid, redirect to /admin/login
```

This is a fast guard for better user experience.

### 4.2 Real Server-Side Check

```text
/admin page loads
  -> app/admin/page.tsx calls verifySession()
  -> verifySession() reads cookie through getSession()
  -> if no valid username, redirect to /admin/login
```

For mutations:

```text
Admin submits form
  -> Server Action calls requireAuth()
  -> requireAuth() calls checkSession()
  -> if no valid session, mutation is blocked
```

Important files:

- `proxy.ts`
- `lib/dal.ts`
- `lib/session.ts`
- `app/admin/page.tsx`
- `app/actions/content.ts`

## 5. Admin Dashboard Read Flow

When authenticated admin opens `/admin`:

```text
Admin opens /admin
  -> proxy.ts allows request if session exists
  -> app/admin/page.tsx calls verifySession()
  -> page loads profile, experience, skills, projects, certifications
  -> Prisma reads PostgreSQL
  -> admin forms render with current values
```

The admin dashboard is not using a separate REST API. The Server Component directly reads the database on the server.

## 6. Content Update Flow

Example: admin updates a project.

```text
Admin edits project form
  -> form submits to updateProject(id, formData)
  -> updateProject() calls requireAuth()
  -> requireAuth() validates session
  -> form fields are converted into Prisma data
  -> Prisma updates Project table
  -> revalidatePath("/") runs
  -> revalidatePath("/projects") runs
  -> revalidatePath("/admin") runs
  -> updated content appears on public pages
```

Same pattern is used for:

- Profile update
- Project create/update/delete
- Experience create/update/delete
- Skill create/delete
- Certification create/delete

Important file:

- `app/actions/content.ts`

## 7. Database Flow

The database stores all editable content.

```text
Profile table
  -> homepage, contact page, admin profile form

Experience table
  -> experience page, admin experience forms

Project table
  -> homepage featured projects, projects page, admin project forms

Skill table
  -> homepage skills, admin skill chips

Certification table
  -> homepage certifications, admin certification forms

AdminUser table
  -> admin login only
```

## 8. Prisma Working

Prisma acts as the database access layer.

```text
Next.js code
  -> imports prisma from lib/prisma.ts
  -> calls prisma.project.findMany()
  -> Prisma adapter uses DATABASE_URL
  -> PostgreSQL executes query
  -> JavaScript object returns to page/action
```

`lib/prisma.ts` keeps a singleton Prisma Client in development so hot reload does not create too many database clients.

## 9. Session Cookie Working

```text
Valid login
  -> createSession(username)
  -> creates JWT payload:
       username
       expiresAt
  -> signs it with SESSION_SECRET
  -> stores it in portfolio_admin_session cookie
```

Cookie properties:

- `httpOnly`: JavaScript in browser cannot read it.
- `sameSite=lax`: reduces cross-site request risk.
- `secure` in production: only sent over HTTPS.
- `path=/`: available to admin routes.

When the user logs out:

```text
logout()
  -> deleteSession()
  -> cookie removed
  -> redirect to /admin/login
```

## 10. Revalidation Working

Next.js may cache or statically optimize public pages. After admin changes data, the app calls `revalidatePath()`.

Example:

```text
Profile updated
  -> revalidatePath("/")
  -> revalidatePath("/contact")
  -> revalidatePath("/admin")
```

This ensures users see the latest data after admin edits.

## 11. Local Working Flow

Local run sequence:

```text
docker compose up -d
  -> starts PostgreSQL on localhost:5433

npx prisma migrate dev
  -> applies database schema

npm run db:seed
  -> inserts profile, projects, skills, certifications, admin user

npm run dev
  -> starts Next.js on localhost:3000
```

Then:

```text
Visitor URL: http://localhost:3000
Admin URL:   http://localhost:3000/admin/login
```

## 12. Production Working Flow

```text
Developer deploys app
  -> host installs dependencies
  -> prisma migrate deploy applies migrations
  -> next build builds app
  -> app starts on hosting platform
  -> app connects to hosted PostgreSQL using DATABASE_URL
```

Required production environment variables:

- `DATABASE_URL`
- `SESSION_SECRET`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

## 13. End-to-End Example

Scenario: admin adds a new project.

```text
1. Admin logs in at /admin/login.
2. Login creates signed session cookie.
3. Admin opens /admin.
4. Admin fills "Add new project" form.
5. Form submits to createProject().
6. createProject() validates session.
7. createProject() normalizes slug.
8. Prisma inserts row into Project table.
9. App revalidates /, /projects, and /admin.
10. Visitor opens /projects and sees the new project.
```

## 14. Mental Model

Think of the system like this:

```text
Public pages = read from database
Admin forms = write to database
Prisma = safe database client
PostgreSQL = source of truth
Session cookie = admin login proof
Server Actions = secure mutation layer
revalidatePath = refresh public content after edits
```

