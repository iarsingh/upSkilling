# Google AI Studio Build Prompt

Build a polished, responsive full-stack web application named **AI Mock Interviewer**.

## Product flow

Create two separate authenticated pages:

1. **Career Skills Dashboard** — users choose an interview track and see question availability.
2. **Live Interview Session** — a focused interview page containing the AI interviewer, camera preview, question, answer transcript, controls, and feedback. Do not place configuration sidebars on the interview page.

Use Firebase Authentication for email/password sign-in. Use Cloud SQL for PostgreSQL if relational database support is available in this AI Studio project; otherwise use Firestore with equivalent collections. Never store production users or interview results in local JSON files.

## Visual design

Use a premium SaaS dashboard style with excellent light and dark themes, responsive mobile layouts, clear typography, rounded cards, subtle gradients, accessible focus states, and compact technology logo badges displayed side by side with every skill name.

Career tracks:

- DevOps Engineer: Kubernetes, Docker, GCP, Linux, Terraform, CI/CD, GitOps, Ansible, SRE, Observability, Security.
- Frontend Developer: HTML, CSS, JavaScript, TypeScript, React, state management, components, testing, accessibility, performance.
- Backend Developer: Python, Go, FastAPI, SQL, NoSQL, Redis, queues, REST APIs, security, system design.
- MLOps Engineer: Python, MLflow, model registry, feature stores, Vertex AI, Kubeflow, Kubernetes, model serving, drift monitoring, ML CI/CD.

Add a separate **Core Interview Rounds** section containing:

- System Design: requirements, APIs, data modeling, caching, queues, scaling, reliability, and trade-offs.
- Data Structures & Algorithms: arrays, strings, hash maps, trees, graphs, recursion, dynamic programming, and complexity.

Add a prominent **Cumulative Random Interview** card. It must randomly mix questions from DevOps, Frontend, Backend, MLOps, System Design, DSA, behavioral questions, and production scenarios.

## Question coverage

Create `skills`, `questions`, and `questionSkills` database entities. Display a live question count beside every skill, such as `24 Q`. Display `No Q` with a warning style when a skill has no mapped questions. Show an overall coverage summary. Do not claim that questions exist unless the database contains matching records.

Seed at least 10 strong interview questions for every listed skill. Include fundamentals, troubleshooting, production scenarios, security, performance, testing, and senior-level trade-offs. Seed at least 50 System Design questions and 50 DSA questions across easy, medium, and hard difficulty.

## Device setup

Before entering the live interview, show a device-check dialog that runs only after a user click:

- Request browser camera permission.
- Request browser microphone permission.
- Detect headphones or audio-output devices and use the native output selector when supported.
- Show individual states: not checked, allowed, unavailable, or denied.
- Stop temporary media tracks immediately after the check.
- Include a `Not now` option.
- Explain that the permission check does not record media.

Add a speaking-accent selector with:

- English — India (`en-IN`)
- English — United States (`en-US`)
- English — United Kingdom (`en-GB`)
- English — Australia (`en-AU`)
- English — Canada (`en-CA`)

Apply the selection to browser speech recognition and save it in the user profile.

## Live interview experience

The interview page must include:

- AI interviewer tile with speaking animation.
- Optional user camera tile.
- Generate random question button.
- Previous, next, skip, and hint controls.
- Browser text-to-speech question reading with auto-read toggle.
- Browser speech-to-text answer capture using the selected accent.
- Typed answer fallback.
- Question and answer counters.
- Session timer and progress indicator.
- Confidence, speaking pace, and filler-word indicators.
- Save answer and end interview actions.
- Final structured feedback with strengths, improvement areas, score, and recommended next skills.
- Download report as Markdown and JSON, print/PDF, and copy actions.

Use Gemini from server-side code only. Never expose `GEMINI_API_KEY` in client code. Use Gemini to generate role-aligned follow-up questions, hints, answer evaluation, and final feedback. Static database questions must remain usable if an AI request fails.

## Data model

Create secure persistent entities for:

- users
- skills
- questions
- questionSkills
- interviews
- interviewAnswers
- feedback
- userProgress
- userPreferences

Each interview must store its selected track, question order, timestamps, answers, score, and feedback. Users may access only their own interview history. Add an admin role that can view aggregate usage and question coverage without exposing private answer content by default.

## Quality requirements

- Use semantic HTML and accessible labels.
- Meet keyboard-navigation requirements.
- Never request camera or microphone access automatically on page load.
- Validate all API inputs server-side.
- Protect authenticated routes.
- Add loading, empty, permission-denied, offline-AI, and error states.
- Ensure the app builds successfully before presenting the preview.

After generating the app, verify the following user journey in the preview:

1. Sign up and sign in.
2. Select a career track.
3. Confirm question counts are visible.
4. Open device setup and handle permission denial safely.
5. Start an interview.
6. Generate, answer, and save a question.
7. End the interview and view feedback.
8. Return to the dashboard and see saved progress.
