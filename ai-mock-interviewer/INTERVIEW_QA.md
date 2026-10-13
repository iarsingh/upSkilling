# ai-mock-interviewer — interview questions and answers

[README](README.md) · [Project architecture](PROJECT_ARCHITECTURE.md)

Answers below use this repository’s files and implementation. They distinguish existing behavior from suggested extensions; source links let you verify each walkthrough.

## 1. What problem does ai-mock-interviewer address, and what can you demonstrate?

Voice-led AI mock interview practice for DevOps, SRE, Cloud, Platform Engineering, MLOps, and software engineering roles.

I would demonstrate the linked implementation or examples and distinguish that evidence from any planned production features. Start with [`README.md`](README.md).

## 2. How is this repository organized?

- [`scripts/build-interview-prep-document.py`](scripts/build-interview-prep-document.py): Implementation or supporting configuration.
- [`scripts/build-docx.py`](scripts/build-docx.py): Implementation or supporting configuration.
- [`scripts/build-actual-interview-docx.py`](scripts/build-actual-interview-docx.py): Implementation or supporting configuration.
- [`scripts/generate-podcast-audio.py`](scripts/generate-podcast-audio.py): Implementation or supporting configuration.
- [`package.json`](package.json): Implementation or supporting configuration.
- [`server.js`](server.js): Implementation or supporting configuration.
- [`api/[...path].js`](api/%5B...path%5D.js): Implementation or supporting configuration.
- [`chrome-extension/content.js`](chrome-extension/content.js): Implementation or supporting configuration.

[PROJECT_ARCHITECTURE.md](PROJECT_ARCHITECTURE.md) contains the component diagram and the implementation walkthrough.

## 3. Can you walk through `build` and explain the decision it makes?

The main walkthrough here is `build(track='complete')` in [`scripts/build-interview-prep-document.py`](scripts/build-interview-prep-document.py#L275).

```python
def build(track="complete"):
    data = load_curriculum()
    is_data_science = track == "data-science"
    is_ai_agent = track == "ai-agent"
    if is_data_science:
        domains = select_data_science_domains(data)
    elif is_ai_agent:
        domains = [{"name": stage["name"], "description": stage["description"], "topics": stage["topics"]} for stage in data["aiAgentEngineerPath"]["stages"]]
    else:
        domains = data["domains"]
    unique_topics = {topic.lower() for domain in domains for topic in domain["topics"]}
    out_path = AI_AGENT_OUT_PATH if is_ai_agent else (DATA_SCIENCE_OUT_PATH if is_data_science else OUT_PATH)
    title_text = "AI Agent Engineer Interview Prep" if is_ai_agent else ("Data Science Interview Prep" if is_data_science else "AI Engineer Interview Prep")
    subtitle_text = (
        "Job-aligned path for Python, LLM APIs, MCP, RAG, enterprise automation, agent safety, and AWS operations"
        if is_ai_agent else
        "Beginner-to-expert path for statistics, experimentation, machine learning, applied GenAI, and production literacy"
        if is_data_science else
        "Beginner-to-expert curriculum for Data Science, ML Engineering, and production AI"
    )
```

This is an excerpt; follow the source link for the rest of the branches.

The implementation calls `Document`, `Inches`, `Pt`, `add_ai_engineer_callout`, `add_domain_index`, `add_domains`, `add_footer`, `add_role_matrix`, `add_stage_index`. In an interview, trace those calls in execution order using a fixture input.

## 4. What responsibility does `add_qa` have?

`add_qa(number, entry)` is defined in [`scripts/build-docx.py`](scripts/build-docx.py#L175).

It uses `' • '.join`, `Inches`, `Pt`, `RGBColor`, `a_para.add_run`, `append_answer_runs`, `build_example`, `cat_para.add_run`. This is the code path I would compare against the caller to explain responsibility boundaries.

## 5. What input validation and failure behavior are implemented?

Explicit failure paths include:

- `SystemExit('Missing youtube-client-secret.json. Download an OAuth Desktop client from Google Cloud Console and place it in the repository root.')` in [`scripts/upload-youtube-podcast-videos.py`](scripts/upload-youtube-podcast-videos.py#L34).
- `SystemExit(f"Scheduled time must be in the future: {item['publish_at']}")` in [`scripts/upload-youtube-podcast-videos.py`](scripts/upload-youtube-podcast-videos.py#L75).

I would test both the condition that reaches each exception and the caller that translates it. An explicit raise does not mean every malformed input or dependency failure is handled.

## 6. Which test would you use to demonstrate correctness?

[`tests/test_docx_answer_format.py`](tests/test_docx_answer_format.py#L15) contains `test_fences_are_hidden_and_python_indentation_survives`:

```python
    def test_fences_are_hidden_and_python_indentation_survives(self):
        paragraph = Document().add_paragraph()
        append_answer_runs(paragraph, "Example:\n```python\ndef f():\n    return 1\n```\nDone.")
        self.assertEqual(paragraph.text, "Example:\ndef f():\n    return 1\nDone.")
        code = next(run for run in paragraph.runs if run.text == "    return 1")
        self.assertEqual(code.font.name, "Consolas")
```

This is a concrete regression example from the repository. Its assertions establish that case; they do not establish behavior for every input or under production load.

## 7. Which runtime dependencies shape the application?

The dependency manifest [`package.json`](package.json) declares `@anthropic-ai/sdk`, `@tesseract.js-data/eng`, `better-sqlite3`, `dotenv`, `mammoth`, `pdf-parse`, `pg`, `tesseract.js`. I would trace where each relevant package is imported before assigning it a role in the architecture.

## 8. Where does state live, and what happens with multiple workers?

Module-level containers include `TOPIC_SECTIONS` in [`scripts/build-docx.py`](scripts/build-docx.py); `TRANSITIONS`, `EXCLUDE_EXACT`, `EXCLUDE_SUBSTR`, `RULES`, `SERIES_TITLES` in [`scripts/generate-podcast-audio.py`](scripts/generate-podcast-audio.py); `SERIES_ORDER` in [`scripts/generate-rss-feed.py`](scripts/generate-rss-feed.py); `EXCLUDE_EXACT`, `EXCLUDE_SUBSTR`, `RULES` in [`scripts/organize-original-audio.py`](scripts/organize-original-audio.py).

These containers belong to a Python process. Inspect which are constant fixtures and which are mutated. Mutable process state needs an explicit shared-storage or synchronization strategy before multiple workers can provide consistent behavior.

## 9. How would another engineer reproduce your walkthrough?

Start from the repository root:

```bash
npm install
npm test
npm run start
```

These commands follow repository manifests; environment setup and command results still need to be checked on the target machine.

## 10. What does automation verify, and what does it not prove?

Inspect [`.github/workflows/ci.yml`](.github/workflows/ci.yml) for triggers, permissions, and job commands. I would name the checks that those definitions run and show the latest run separately. A workflow definition alone does not establish a successful deployment, security review, or production SLO.

## 11. How would you present this project in a Forward Deployed Engineer interview?

Start with the user and operational problem described in [`README.md`](README.md). Explain one constraint that changes the implementation, show the linked code or example, and walk through a success case and a failure case. Agree on a measurable acceptance criterion before expanding the solution, and leave a handoff with data boundaries and rollback ownership. Any proposed production or business metric should be identified as a target until measured.

## 12. What is the input-to-output contract of `build`?

In [`scripts/build-interview-prep-document.py`](scripts/build-interview-prep-document.py#L275), `build(track='complete')` receives the inputs. The function computes these intermediate values:

- `data = load_curriculum()`
- `is_data_science = track == 'data-science'`
- `is_ai_agent = track == 'ai-agent'`
- `unique_topics = {topic.lower() for domain in domains for topic in domain['topics']}`
- `out_path = AI_AGENT_OUT_PATH if is_ai_agent else DATA_SCIENCE_OUT_PATH if is_data_science else OUT_PATH`
- `title_text = 'AI Agent Engineer Interview Prep' if is_ai_agent else 'Data Science Interview Prep' if is_data_science else 'AI Engineer Interview Prep'`
- `subtitle_text = 'Job-aligned path for Python, LLM APIs, MCP, RAG, enterprise automation, agent safety, and AWS operations' if is_ai_agent else 'Beginner-to-expert path for statistics, experimentation, machine learning, applied GenAI, and production literacy' if is_data_science else 'Beginner-to-expert curriculum for Data Science, ML Engineering, and production AI'`

## 13. Which decision rules or boundary conditions should an interviewer challenge?

The implementation in [`scripts/build-interview-prep-document.py`](scripts/build-interview-prep-document.py#L275) branches on:

- `is_data_science`
- `is_ai_agent`
- `is_ai_agent`
- `is_data_science`

A useful extension is a table-driven test that covers each condition just below, at, and above its boundary where applicable. These expressions are the current rules; changing them changes behavior and should be justified by the project’s acceptance criteria.

## 14. What does `server.js` own?

[`server.js`](server.js) defines `ensureDataDir`, `getSessionSecret`, `hashPassword`, `verifyPassword`, `readUsers`, `writeUsers`, `ensureUsersSeeded`, `initializeDatabase`. Its imports include `dotenv`, `http`, `fs`, `path`, `crypto`, `mammoth`, `pdf-parse`, `tesseract.js`, `@anthropic-ai/sdk`, `pg`.

Trace these definitions and imports to explain the module boundary. Relative imports identify project code; package imports should be checked against the nearest manifest.

## 15. What does `src/routes/interview.routes.js` own?

[`src/routes/interview.routes.js`](src/routes/interview.routes.js) defines `createInterviewRoutes`, `errorResponse`, `handleInterviewRoutes`.

Trace these definitions and imports to explain the module boundary. Relative imports identify project code; package imports should be checked against the nearest manifest.

## 16. How does the Node interview API handle a request?

[server.js](server.js) wires the route factory to `InterviewService`, `InterviewRepository`, the SQLite factory, and `AiGateway`. [interview.routes.js](src/routes/interview.routes.js) reads the user ID, matches versioned interview paths, calls the service, and returns a request ID with either a result or structured error. The Python export scripts are supporting tools, not this request-serving backend.

## 17. What happens when question generation fails or returns an irrelevant result?

[AiGateway.generateQuestion](src/ai/ai.gateway.js) attempts the injected generation callback, checks for a question and validates it against allowed topics. A thrown provider error is caught. A failed validation or provider failure reaches the fallback callback, and the returned question receives a `question-bank` source when the fallback has not supplied another source.

## 18. Why should you distinguish the two persistence paths?

The interview route wiring creates SQLite through [src/database/sqlite.js](src/database/sqlite.js) and supplies it to [InterviewRepository](src/repositories/interview.repository.js). Separately, [server.js](server.js) selects PostgreSQL for account data when `DATABASE_URL` is set, with a local JSON fallback otherwise. Calling the entire application either SQLite-only or PostgreSQL-only would miss that separation.

## 19. Which authentication and startup decisions are visible in the server?

[server.js](server.js) uses scrypt password hashes and signed cookie tokens. Production startup rejects a short or missing `SESSION_SECRET` and requires configured account persistence unless an explicit ephemeral file-storage override is enabled. I would demonstrate the startup checks and cookie/token helpers before claiming broader security properties.
