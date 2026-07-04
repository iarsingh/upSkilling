# Low-Level Design - AI Mock Interviewer

## 1. Codebase Layout

```text
ai-mock-interviewer/
  server.js
  package.json
  data/
    applicant-profile.json
  public/
    index.html
    app.js
    styles.css
    admin.html
    admin.js
    mock-interview-sets.json
    30-day-plan.json
  scripts/
    answer-bank/
    generate-full-qa-document.js
    generate-txt-exports.js
    export-all-interview-questions.js
    build-docx.py
  chrome-extension/
    manifest.json
    content.js
    popup.html
    popup.js
    popup.css
```

## 2. Server Design - `server.js`

The server is a single Node.js HTTP server.

Core responsibilities:

- Serve static files from `public/`.
- Expose JSON APIs.
- Read local question/profile files.
- Extract JD text from uploaded files.
- Call optional LLM providers.
- Provide offline fallback question and feedback responses.

## 3. Server Configuration

Important environment variables:

```text
PORT=3030
HOST=127.0.0.1
OLLAMA_URL=http://127.0.0.1:11434
OLLAMA_MODEL=llama3.1:8b
LLM_PROVIDER=ollama | claude
OFFLINE_ONLY=1 | true
ANTHROPIC_API_KEY=...
CLAUDE_MODEL=...
```

Derived behavior:

- `OFFLINE_ONLY=true` blocks Claude calls and public JD URL import.
- `LLM_PROVIDER=claude` uses Anthropic SDK.
- Default provider is Ollama.
- All modes keep local fallback behavior.

## 4. Static File Serving

Function:

- `serveStatic(req, res)`

Flow:

```text
Request path
  -> "/" maps to "/index.html"
  -> normalize path under PUBLIC_DIR
  -> reject path traversal with 403
  -> read file from public/
  -> set content type from extension
  -> return file contents
```

Supported methods:

- `GET`
- `HEAD`

Important behavior:

- `HEAD` returns headers only.
- Static routes must stay under `PUBLIC_DIR`.

## 5. API Routes

### 5.1 `GET /api/health`

Purpose:

- Reports runtime health and active LLM mode.

Offline response:

```json
{
  "ok": true,
  "provider": "offline",
  "model": "built-in question bank",
  "offlineOnly": true
}
```

Ollama mode:

- Calls `${OLLAMA_URL}/api/tags`.
- Reports whether Ollama responds.

Claude mode:

- Reports whether `ANTHROPIC_API_KEY` is configured.

### 5.2 `GET /api/autofill-profile`

Purpose:

- Returns `data/applicant-profile.json`.

Used by:

- Chrome extension autofill.
- Browser helpers requiring candidate context.

### 5.3 `GET /api/question-bank`

Purpose:

- Returns parsed questions from the large text question bank.

Implementation:

- `readQuestionBank()` parses `1000 DevOps + MLOps + Kubernetes + GCP Interview Questions.txt`.
- Results are cached in memory with `cachedQuestionBank`.

### 5.4 `POST /api/question`

Purpose:

- Generates one interview question.

Flow:

```text
Read request body
  -> if OFFLINE_ONLY, return fallbackQuestion(input)
  -> build questionPrompt(input)
  -> askLLM(prompt)
  -> cleanGeneratedQuestion(response)
  -> return question
  -> on error, return fallbackQuestion(input)
```

### 5.5 `POST /api/feedback`

Purpose:

- Generates feedback for one answer.

Validation:

- Requires non-empty `answer`.

Flow:

```text
Read body
  -> if answer empty, return 400
  -> if OFFLINE_ONLY, return fallbackQuestionFeedback(input)
  -> askLLM(feedbackPrompt(input))
  -> on error, return fallbackQuestionFeedback(input)
```

### 5.6 `POST /api/final-feedback`

Purpose:

- Generates full mock interview feedback.

Validation:

- Requires non-empty `transcript`.

Flow:

```text
Read body
  -> if transcript empty, return 400
  -> if OFFLINE_ONLY, return fallbackFinalFeedback(input)
  -> askLLM(finalFeedbackPrompt(input))
  -> on error, return fallbackFinalFeedback(input)
```

### 5.7 `POST /api/import-jd-url`

Purpose:

- Imports readable JD text from a public URL.

Flow:

```text
Validate url
  -> if OFFLINE_ONLY, reject
  -> fetch page with timeout
  -> if HTML, strip tags with htmlToText()
  -> trim text
  -> return extracted JD text
```

### 5.8 `POST /api/import-jd-file` / `POST /api/import-jd-pdf`

Purpose:

- Extracts text from uploaded local JD files.

Supported formats:

- PDF through `PDFParse`
- DOCX through `mammoth`
- TXT/Markdown through UTF-8 text
- Images through `tesseract.js`

Limits:

- File must not be empty.
- File must be under 5 MB.
- Extracted text must be at least 80 characters.

### 5.9 `POST /api/autofill-suggestions`

Purpose:

- Suggests values for job application fields.

Flow:

```text
Read visible field metadata
  -> read applicant profile
  -> ask LLM for JSON suggestions
  -> parse JSON array
  -> if empty/fails, use fallbackAutofillSuggestions()
```

### 5.10 `POST /api/cover-letter`

Purpose:

- Generates a cover letter using candidate profile and page text.

Fallback:

- Returns a local static cover-letter template if LLM fails.

## 6. LLM Abstraction

### 6.1 `askOllama(prompt, options, timeoutMs)`

Calls:

```text
POST OLLAMA_URL/api/generate
```

Payload:

- model
- prompt
- stream false
- temperature/context options

### 6.2 `askClaude(prompt, options)`

Calls:

- Anthropic messages API using `@anthropic-ai/sdk`.

Requires:

- `ANTHROPIC_API_KEY`.

### 6.3 `askLLM(prompt, options, timeoutMs)`

Provider router:

```text
if OFFLINE_ONLY and Claude provider -> throw
if LLM_PROVIDER=claude -> askClaude()
else -> askOllama()
```

## 7. Offline Fallback Functions

### 7.1 `fallbackQuestion(input)`

Purpose:

- Returns a local question without LLM.

Inputs:

- `history`

Behavior:

- Reads parsed large question bank.
- Avoids questions already present in recent history where possible.
- Falls back to a small hardcoded bank if file parsing fails or returns empty.

### 7.2 `fallbackQuestionFeedback(input)`

Purpose:

- Provides local template feedback for one answer.

Logic:

- Calculates word count.
- Checks whether the answer mentions production signals such as metrics, logs, traces, SLOs, rollback, runbooks, IAM, risk, or impact.
- Produces a score and coaching template.

### 7.3 `fallbackFinalFeedback(input)`

Purpose:

- Produces full interview feedback without LLM.

Logic:

- Parses transcript.
- Counts answered questions.
- Checks coverage across market skill areas.
- Produces score, gaps, improvement plan, and next mock focus.

## 8. Browser UI Design - `public/app.js`

The browser app is a stateful single-page experience.

Main responsibilities:

- Query DOM elements.
- Maintain interview state.
- Load practice sources.
- Select questions.
- Drive audio and speech recognition.
- Save answers.
- Request feedback.
- Render markdown feedback into HTML.

## 9. Browser State Model

Storage key:

```text
aiMockInterviewerState
```

Important state:

- `interviews`
- `interviewNumber`
- `progressHistory`
- `customSkills`
- `usedQuestionKeys`
- `questionBankIndex`
- `cvText`
- `jdText`
- `technology`
- `mockSet`
- `practiceDay`
- `questionOrder`
- `questionVoiceTone`

Each interview session contains:

```text
number
questionNumber
question
answer
answers[]
finalFeedback
questionHistory[]
questionHistoryIndex
```

## 10. Question Selection Design

Question pool sources:

- Built-in topic arrays.
- Large bank from `/api/question-bank`.
- Practice plan from `/30-day-plan.json`.
- Fixed sets from `/mock-interview-sets.json`.
- Custom JD questions.
- Custom skill questions.

Important functions:

- `specializedQuestions()`
- `largeBankQuestions()`
- `buildCustomJdMockQuestions()`
- `questionPool()`
- `filterTechnologyQuestions()`
- `uniqueQuestions()`

Selection behavior:

- If custom skill selected, use custom skill questions.
- If random-bank mock selected, use large bank plus app bank.
- If custom JD selected, build JD-specific questions.
- If fixed mock set selected, use that set.
- If day plan selected, use day questions.
- Otherwise use all topic-filtered questions.

## 11. Audio and Speech Design

### 11.1 Question Audio

Uses:

- `window.speechSynthesis`

Behavior:

- Reads the current question aloud.
- Supports voice tone presets.
- Can auto-start microphone afterward during real-time simulation.

### 11.2 Answer Speech Recognition

Uses:

- `window.SpeechRecognition` or `window.webkitSpeechRecognition`.

Behavior:

- Captures spoken answer transcript.
- Appends recognized text into the answer box.
- Uses pause timing to decide when to auto-submit in real-time mode.

Fallback:

- User can type answer manually if speech recognition is unavailable.

## 12. Feedback Rendering

Server returns Markdown-like feedback.

Browser functions:

- `markdownToHtml(markdown)`
- `escapeHtml(value)`

Purpose:

- Convert basic headings/lists/paragraphs to HTML.
- Avoid rendering raw unescaped text.

## 13. Custom Skill Design

Important functions:

- `customSkillId(name)`
- `customSkillQuestionsFor(name, inputQuestions)`
- `saveCustomSkill()`
- `deleteSelectedCustomSkill()`
- `renderCustomSkills()`

Behavior:

- User can add any skill name.
- If no questions are provided, app generates starter questions.
- Custom skills are saved in local storage.
- Custom skill appears as an option in Technology practice.

## 14. JD Practice Design

Inputs:

- CV/profile text.
- JD/market skill text.
- Uploaded JD file.
- Imported JD URL.

Important functions:

- `contextPayload()`
- `buildJdQuestions()`
- `buildCustomJdMockQuestions()`
- `applyImportedJd(text, message)`
- `fileToBase64(file)`

Flow:

```text
User pastes/uploads/imports JD
  -> browser stores JD text
  -> custom JD mode builds targeted questions
  -> question selection uses JD-specific pool
  -> feedback prompt includes CV and JD context
```

## 15. Chrome Extension Design

Content script:

- Scans visible application form fields.
- Sends field metadata and page text to local app server.
- Applies suggested values to fields.

Popup:

- User triggers autofill.
- User can request cover letter.

Server support:

- `/api/autofill-profile`
- `/api/autofill-suggestions`
- `/api/cover-letter`

Safety:

- The extension should not submit applications automatically.
- The server fallback avoids inventing sensitive answers unless profile data contains them.

## 16. Error Handling

Server:

- Returns JSON errors for API failures.
- Converts fetch/Ollama failures into helpful messages.
- Uses fallback paths for question and feedback generation.

Browser:

- Shows status text for local runtime.
- Allows manual typing if microphone is unavailable.
- Uses local question pools if API-driven sources fail.
- Saves drafts and progress to reduce data loss.

## 17. Validation Rules

Server-side:

- Request body max size: 8 MB.
- Uploaded JD file max size: 5 MB.
- Extracted JD text minimum: 80 characters.
- `/api/feedback` requires answer.
- `/api/final-feedback` requires transcript.
- URL import supports only HTTP/HTTPS.

Browser-side:

- Custom skill requires skill name.
- Empty custom-skill question list creates starter questions.
- UI disables previous/next question buttons based on history index.

## 18. Testing Strategy

Recommended smoke checks:

```bash
node --check server.js
node --check public/app.js
npm run start:offline
curl -s http://127.0.0.1:3030/api/health
curl -s -X POST http://127.0.0.1:3030/api/question \
  -H 'Content-Type: application/json' \
  -d '{"role":"MLOps Engineer","level":"senior","topic":"MLOps","history":[]}'
```

Manual browser checks:

- Open `http://127.0.0.1:3030`.
- Click `New question`.
- Type or speak an answer.
- Submit feedback.
- End interview and generate final feedback.
- Add a custom skill and verify it appears in Technology practice.
- Upload a local JD file and verify extracted text appears.

## 19. Known Technical Debt

- No server-side database for structured interview history.
- Large browser state can grow in `localStorage`.
- No automated browser tests.
- Feedback templates are generic compared with LLM output.
- Browser speech recognition support varies by browser.
- No auth if exposed beyond localhost.
- Chrome extension assumes local server is running.

## 20. Future Extension Points

- Add local SQLite persistence.
- Add export/import interview sessions.
- Add answer lookup against `final-qa-dataset.json`.
- Add richer scoring rubrics by topic.
- Add Playwright tests.
- Add server-side route origin checks.
- Add a dedicated review dashboard for weak topics.
