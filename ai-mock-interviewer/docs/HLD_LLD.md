# AI Mock Interviewer — HLD and LLD

## Document purpose

This is the living architecture document for the AI Mock Interviewer. Update it whenever a feature changes the system architecture, data flow, APIs, persistence model, or important component behavior.

## Candidate preparation calibration

- Actual professional experience: **7 years**.
- Compensation target: **₹25 LPA**.
- Preparation window: **50 days**.
- Interview depth target: architecture, production ownership, ambiguity, trade-offs, cross-team influence, risk, cost, and measurable outcomes commonly tested for **10–15-year roles**.
- Integrity rule: prompts, profile text, autofill, and answers must never claim more than 7 years of actual experience. The system raises answer depth and scope, not represented tenure.
- Primary preparation artifact: `public/50-day-plan.json` with a readable companion at `50-day-interview-plan.md`. The companion document first groups questions under the 17 selectable topic sections, then retains the complete day-by-day 50-day schedule.

## High-Level Design (HLD)

### 1. System goals

The application provides browser-based mock technical interviews with:

- Role-based, specialized, single-topic, and multi-topic interview modes.
- AI-generated questions through Claude or Ollama.
- A local question-bank fallback when an AI provider is unavailable.
- Voice question playback, microphone transcription, typed answers, hints, and feedback.
- CV and job-description context for personalized interviews.
- Browser-side session persistence and interview history.
- Strict topic-only interviews that prevent unrelated questions.

### 2. Architecture overview

```text
┌──────────────────────────────── Browser ────────────────────────────────┐
│                                                                        │
│  Dashboard             Interview Session             Other Screens     │
│  dashboard.html/js ──▶ session.html/app.js           Admin/Auth/Bank   │
│       │                      │                                         │
│       └──────── localStorage ┴──── selected topics, setup, history      │
│                              │                                         │
└──────────────────────────────┼─────────────────────────────────────────┘
                               │ HTTP/JSON
                               ▼
┌──────────────────────── Node.js server.js ─────────────────────────────┐
│  Static files │ Authentication │ Question API │ Feedback API │ Imports │
│                                      │                                 │
│                         ┌────────────┴────────────┐                    │
│                         ▼                         ▼                    │
│                 Claude / Ollama          Local question bank           │
│                                          and fallback templates        │
└────────────────────────────────────────────────────────────────────────┘
```

### 3. Main components

| Component | Responsibility |
|---|---|
| `public/dashboard.html` | Career-track, specialized-round, and multi-topic selection UI. |
| `public/dashboard.js` | Builds and persists the selected interview configuration. |
| `public/session.html` | Interview setup, live interview stage, question, answer, and feedback UI. |
| `public/app.js` | Session state, question pools, strict topic filtering, API requests, speech, and feedback interactions. |
| `server.js` | HTTP server, authentication, AI-provider calls, prompt construction, imports, and offline fallbacks. |
| Question-bank data | Supplies local questions and offline interview support. |
| Browser `localStorage` | Persists UI preferences and compatibility drafts; SQLite is authoritative for dashboard-launched interviews. |

### 4. Interview modes

#### Role-based mode

A predefined career profile sets the role, technology filter, and focus areas.

#### Specialized mode

A predefined interview set focuses on a language or specialist area such as Python, RAG, or LLMOps.

#### Custom topic-only mode

The user searches and selects one or more topics from a sectioned multi-select dropdown and may enter an additional custom topic. Every question must relate to at least one selected topic.

The selector currently exposes 69 unique topics grouped into 17 sections:

1. Cloud Platforms & GCP Services
2. GCP Networking
3. Kubernetes & Containerization
4. Infrastructure as Code (IaC)
5. CI/CD & GitOps
6. MLOps & AI Platforms
7. DevSecOps & Cloud Security
8. Monitoring, Logging & Observability
9. Programming & Scripting
10. Databases & Data Services
11. Messaging & Streaming
12. Source Control & Artifact Management
13. Backup & Disaster Recovery
14. ITSM & Enterprise Tools
15. Platform Engineering & SRE
16. Hybrid & Multi-Cloud
17. Application & API Technologies

#### Offline mode

When `OFFLINE_ONLY=1` or the configured AI provider fails, the server selects strongly matching questions from the local bank. If no strong match exists, it creates a generic question that explicitly includes the selected topic.

### 5. Custom topic data flow

```text
Select one/many topics or enter custom topic
                    │
                    ▼
dashboard.js validates and normalizes selections
                    │
                    ▼
localStorage: careerProfile, topic, selectedTopics, topicOnly state
                    │
                    ▼
session app loads state and displays active-topic banner
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
Local fast question      POST /api/question
strictly filtered        topicOnly + allowedTopics
          │                   │
          ▼                   ▼
Relevant bank question  Strict AI prompt or strict fallback
```

### 6. Availability and failure handling

- AI-provider failures fall back to the local question bank.
- Strict topic mode rejects weak topic matches.
- If no bank question qualifies, the fallback question names the exact topic.
- Browser state allows the session configuration to survive navigation or refresh.
- Invalid or empty custom-topic selections are rejected on the dashboard.

### 7. Security considerations

- Authentication protects interview and dashboard routes.
- API keys remain on the server and must not be exposed to browser JavaScript.
- User-provided text is length-limited before being inserted into prompts.
- UI content derived from user input must use `textContent` or proper escaping.
- Imported files must retain server-side size and type validation.

## Low-Level Design (LLD)

### 1. Dashboard topic selection

#### DOM elements

| Element | Purpose |
|---|---|
| `#topicMultiSelect` | Expandable multi-select topic dropdown. |
| `.topic-options input[type=checkbox]` | Predefined selectable topics. |
| `#topicMultiSelectLabel` | Displays selected-topic count and names. |
| `.topic-option-group` | Semantic fieldset containing one topic section. |
| `#topicSearchInput` | Filters topics by visible label or stable checkbox value. |
| `#clearTopicSearch` | Clears the current search without changing selections. |
| `#topicSearchStatus` | Announces available/matching topic count for accessibility. |
| `#customTopicInput` | Optional free-text topic. |
| `#useCustomTopic` | Validates and activates topic-only mode. |
| `#customTopicError` | Accessible validation message. |

#### `selectCustomTopic()` behavior

1. Read all checked topic values.
2. Normalize the optional custom topic by trimming and collapsing whitespace.
3. Deduplicate selections.
4. Reject an empty selection.
5. Join topic names for human-readable display.
6. Save the structured topic array for filtering and prompting.
7. Reset interview history and question indexes.
8. Enable the “Start focused interview” link.

#### Topic search behavior

`filterTopicOptions()`:

1. Normalizes the search query to lowercase.
2. Matches against both the visible topic label and checkbox `value`.
3. Hides nonmatching topic labels.
4. Hides a complete section when none of its topics match.
5. Preserves checked state while filtering.
6. Updates an `aria-live` result count.
7. Supports clearing the query and restoring all 69 topics.

#### Persisted dashboard state

```json
{
  "role": "Custom topic interview",
  "topic": "Kubernetes, Terraform",
  "selectedTopics": ["Kubernetes", "Terraform"],
  "technology": "all",
  "careerProfile": "custom-topic",
  "questionOrder": "random",
  "practiceDay": "all",
  "mockSet": "all"
}
```

### 2. Interview session state

`loadState()` reads `careerProfile`, `topic`, and `selectedTopics`. When `careerProfile` equals `custom-topic`:

- `syncActiveTopicBanner()` displays the selected topics.
- `contextPayload()` sends `topicOnly: true`.
- `contextPayload()` sends the structured selections as `allowedTopics`.
- `questionPool()` routes local selection to `customTopicQuestionPool()`.

Relevant request payload:

```json
{
  "role": "Kubernetes, Terraform interview",
  "topic": "Kubernetes, Terraform",
  "topicOnly": true,
  "allowedTopics": ["Kubernetes", "Terraform"],
  "history": []
}
```

### 3. Client-side strict filtering

`customTopicQuestionPool()` performs the following:

1. Tokenize every selected topic independently.
2. Remove generic words such as `interview`, `engineer`, and `senior`.
3. Score each candidate against every selected topic group.
4. Accept a candidate when it strongly matches at least one topic group.
5. Keep only candidates with the best qualifying score.
6. Return an exact-topic fallback when no candidate qualifies.

Treating topics independently is important. With Kubernetes and Terraform selected, a Kubernetes-only question and a Terraform-only question are both valid; a question does not need to mention both.

### 4. Question API

#### Endpoint

`POST /api/question`

#### AI path

`questionPrompt(input)` adds a strict instruction when `input.topicOnly` is true:

- Only `allowedTopics` may be tested.
- Every question must relate directly to at least one allowed topic.
- Unselected technologies and generic role questions are prohibited.
- Questions should rotate across selected topics.

#### Offline path

`fallbackQuestion(input)`:

1. Extracts questions already used in interview history.
2. Tokenizes each allowed topic independently.
3. Scores the question, section, and category text.
4. Rejects weak partial matches.
5. Selects an unused question from the strongest matching group.
6. Uses an exact-topic fallback if no strong bank match exists.

### 5. Active topic banner

The interview stage contains `#activeTopicBanner` and `#activeTopicName`.

The banner is visible only when:

```text
careerProfile == "custom-topic" AND topic is not empty
```

It displays:

```text
Topic-only interview
Questions are being asked only from: <selected topics>
```

### 6. Validation rules

| Rule | Expected behavior |
|---|---|
| No checkbox and no custom text | Show validation error; do not enable interview. |
| One predefined topic | Save one item in `selectedTopics`. |
| Multiple predefined topics | Save every unique item. |
| Predefined plus custom topic | Combine and deduplicate them. |
| Topic without strong bank match | Ask an exact-topic fallback question. |
| AI returns unavailable/error | Use strict local fallback. |
| Search text matches a label/value | Show the topic and its containing section. |
| Search text has no matches | Show “No matching topics found”; retain selected topics. |
| Clear topic search | Restore all topic sections without clearing selections. |

### 7. Maintainability rules

- Keep structured topics in `selectedTopics`; do not parse the display string when structured data exists.
- Preserve `topic` as the human-readable combined label.
- Any new question-generation route must honor `topicOnly` and `allowedTopics`.
- Any new local question source must pass through strict filtering in custom-topic mode.
- Add a new topic to the dashboard by adding a checkbox with a stable `value`.
- Place every predefined topic inside exactly one `.topic-option-group`; duplicate checkbox values are prohibited.
- Every selectable topic must have at least three questions that pass server-side `relevanceScore()`.
- Regenerate `scripts/answer-bank/final-qa-dataset.json` and `public/qa-dataset.json` after changing a curated answer bank or mock set.
- Update this document when state fields, APIs, modes, or component responsibilities change.

## Recommended tests

1. Select one topic and verify every question is relevant.
2. Select two topics and verify questions come only from either selected topic.
3. Select a predefined topic plus a custom topic.
4. Refresh the session and verify selections and the topic banner persist.
5. Run in offline mode and confirm unrelated bank questions are rejected.
6. Use a topic absent from the bank and confirm the fallback explicitly names it.
7. Switch from custom-topic mode to a role track and confirm the topic-only banner disappears.
8. Search by full name, abbreviation, and partial term and verify the correct sections/topics remain visible.
9. Select topics, search for another topic, and confirm earlier selections remain checked.
10. Clear search and verify all 17 sections and 69 unique topics return.
11. Run the coverage audit and require at least three relevant questions for every selectable topic.

## Curated question-bank coverage

The generated browser dataset currently contains 4,124 unique questions with answers and a shared question-type taxonomy. Recent curated sets are:

| Set | Purpose | Questions |
|---|---|---:|
| Mock Interview 110 | GCP architecture, networking, GKE, CI/CD, and Terraform | 76 |
| Mock Interview 111 | GCP Network Engineer JD round | 43 |
| Mock Interview 112 | Previously missing or under-covered technologies | 64 |
| Mock Interview 113 | Compound topic-selector coverage | 30 |

Answer sources for these additions are maintained in:

- `scripts/answer-bank/83-gcp-architecture-networking-gke-cicd-terraform.json`
- `scripts/answer-bank/84-gcp-network-engineer-jd.json`
- `scripts/answer-bank/85-coverage-gap-topics.json`
- `scripts/answer-bank/86-topic-selector-coverage.json`

Coverage invariant: all 69 predefined selector values must produce at least three qualifying questions through the same strict topic-relevance logic used by the server.

## Change log

| Date | Change |
|---|---|
| 2026-07-28 | Created HLD/LLD and documented strict single/multi-topic interview support. |
| 2026-07-28 | Implemented SQLite persistence, versioned interview APIs, AI gateway boundary, topic rotation, recovery, answers, reports, and health endpoints. |
| 2026-07-28 | Added 17 topic sections, 69 unique selectable topics, in-dropdown search/filtering, four curated interview sets, and a minimum three-question coverage invariant per selectable topic. |
| 2026-07-28 | Updated the candidate profile to 7 years, ₹25 LPA target, 10–15-year interview-depth calibration, and replaced the active 30-day roadmap with a 50-day plan containing 120 additional senior-depth questions. |
| 2026-07-28 | Reorganized the 50-day interview document topic-wise across all 17 topic sections while retaining the daily preparation schedule and day references. |

## Implemented local-first architecture

Dashboard-launched interviews now use backend-authoritative state:

```text
Dashboard ── POST /api/v1/interviews ──▶ SQLite
   │                                      │
   └── session.html?id=<interviewId> ─────┘
                         │
                         ├── GET interview (refresh/recovery)
                         ├── POST start
                         ├── POST questions/next
                         ├── POST answers
                         ├── POST complete
                         └── GET report
```

Implemented modules:

- `src/database/sqlite.js` — schema initialization and local durable database.
- `src/repositories/interview.repository.js` — interview, topic, question, and answer persistence.
- `src/services/interview.service.js` — lifecycle rules and weighted topic rotation.
- `src/services/topic.service.js` — normalization and strict relevance validation.
- `src/ai/ai.gateway.js` — provider-independent AI/fallback boundary.
- `src/routes/interview.routes.js` — versioned routes and normalized errors.

Implemented endpoints:

- `POST /api/v1/interviews`
- `GET /api/v1/interviews/:id`
- `POST /api/v1/interviews/:id/start`
- `POST /api/v1/interviews/:id/questions/next`
- `POST /api/v1/interviews/:id/answers`
- `POST /api/v1/interviews/:id/complete`
- `GET /api/v1/interviews/:id/report`
- `GET /health/live`
- `GET /health/ready`

Legacy localStorage and legacy endpoints remain available as a compatibility fallback during migration.
