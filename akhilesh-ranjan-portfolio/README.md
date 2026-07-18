# Akhilesh Ranjan — Web Resume & Portfolio

An interactive web resume built with React, TypeScript, Vite, and Tailwind CSS. Covers architecture capability areas, a filterable GitHub project index, a skills matrix, an ATS-friendly printable resume, and a Hindi poetry/spoken-word section.

## Run Locally

**Prerequisites:** Node.js 18+

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server (serves on `http://localhost:3000`):
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

No API keys or environment variables are required — this is a static single-page app with no backend.

## Other Commands

```bash
npm run build     # Production build to dist/
npm run preview   # Preview the production build locally
npm run lint       # TypeScript type-check (tsc --noEmit)
npm run clean      # Remove the dist/ build output
```

## Project Structure

```
src/
  App.tsx                    # Layout, navigation, and page composition
  data.ts                    # All resume content (single source of truth)
  types.ts                   # Shared TypeScript interfaces
  components/
    SkillsGrid.tsx            # Skills matrix
    ArchitectureRenderer.tsx  # Architecture diagram visualizer
    CreativeShayari.tsx       # Poetry / Instagram section
    ContactScheduler.tsx      # Contact & mentoring CTAs
    ResumeView.tsx            # Printable ATS-friendly resume
```

To update resume content — experience, skills, certifications, projects, poetry — edit `src/data.ts`.

## External Profiles

- GitHub: https://github.com/iarsingh
- LinkedIn: https://www.linkedin.com/in/iamarsingh/
- Credly (verified certifications): https://www.credly.com/users/akhilesh-ranjan-singh.ca5f4b1e
- Google Cloud Skills profile: https://partner.skills.google/public_profiles/73b05fe2-54bc-4552-91e6-a41996c0d21d
- Poetry Instagram: https://www.instagram.com/theakhishayar

LinkedIn recommendations and Instagram content require a logged-in session to view, so the site links out to them directly rather than embedding their content.
