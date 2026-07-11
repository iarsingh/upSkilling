# Interview Prep Quiz

An interview prep app built with [Flet](https://flet.dev) (Python, renders via
the Flutter engine), with two study modes:

- **Flashcards** — question content pulled from the `ai-mock-interviewer`
  project's answer bank: 2,822 open-ended questions across 17 topics, weighted
  toward Kubernetes/GCP/Terraform/Docker with MLOps/LLMOps/GenAI as a smaller
  slice.
- **MCQ Practice** — 1,000 hand-written multiple-choice questions (125 each)
  across 8 DevOps/K8s/GCP topics, with shuffled options and instant feedback.

## How it works

- **Home screen** — list of flashcard topics with question count and how many
  are due today. The quiz icon in the app bar opens **MCQ Practice**; the bar
  chart icon opens **Stats**.
- **Flashcard screen** — tap "Show Hint" for a one-sentence nudge (derived
  from the answer), then "Show Answer" to reveal the full answer and rate
  `Again` / `Good` / `Easy`. Your rating schedules the next review via
  `src/scheduler.py`.
- **MCQ Practice screen** — pick a topic, then choose a **Quick (20)** or
  **Full bank (all ~125)** session. Options are shuffled per session; picking
  an answer shows correct/incorrect immediately plus a one-line explanation,
  then tracks your score to a results screen with Retry.
- **Stats screen** — per-topic totals, reviewed, and "learned" counts (flashcards only).

Review progress is stored on-device via Flet's `SharedPreferences` service, so
it works the same way on Android, iOS, and desktop without extra setup. MCQ
sessions are not persisted between runs — each session is self-contained.

## Project layout

```
main.py                        # entry point (dev: flet run)
asgi.py                         # production entry point (container: uvicorn)
src/models.py                    # Question, MCQQuestion, Rating, ReviewState
src/data_loader.py                # loads data/questions.json (flashcards); QUIZ_API_URL switches to remote quiz-api
src/mcq_loader.py                  # loads data/mcq_questions.json (MCQ practice)
src/scheduler.py                    # spaced-repetition logic (see TODO inside)
src/storage.py                       # SharedPreferences-backed review store (flashcards)
src/ui/app.py                         # all screens: home, flashcards, MCQ, stats
data/questions.json                   # consolidated flashcard bank (generated)
data/mcq_questions.json                # consolidated MCQ bank (generated)
data/mcq/*.json                         # hand-authored MCQ source, one file per topic
scripts/build_question_bank.py           # regenerate data/questions.json from the source answer bank
scripts/build_mcq_bank.py                 # regenerate data/mcq_questions.json from data/mcq/*.json
```

## Local development

```bash
cd interview-quiz-app
python3 -m venv .venv && source .venv/bin/activate
pip install "flet[all]"

# Run as a local website (fastest way to iterate, opens in your browser):
flet run -w main.py

# Or as a native desktop window:
flet run main.py
```

Open the browser tab it launches (or the desktop window) — the home screen
loads directly into the flashcard topic list; use the quiz icon for MCQ
Practice.

Re-run `python scripts/build_question_bank.py` any time the source answer bank
in `../ai-mock-interviewer/scripts/answer-bank/final-qa-dataset.json` changes.
Re-run `python scripts/build_mcq_bank.py` any time you add/edit a file under
`data/mcq/`.

### Running against the quiz-api microservice instead (optional)

By default the app reads `data/questions.json` locally. Set `QUIZ_API_URL` to
have it fetch flashcard content from the `quiz-api` service instead (used by
the Kubernetes/Istio deployment in the sibling
`cicd-pipeline-jenkins-terraform-ansible-k8s` project):

```bash
QUIZ_API_URL=http://localhost:8000 flet run -w main.py
```

MCQ Practice always reads from the local bundled `data/mcq_questions.json`
regardless of this setting.

## Building the Android APK/AAB

You do **not** need to manually install Android Studio or the Flutter SDK —
`flet build` downloads and manages the Flutter/Android toolchain itself the
first time you run it (this takes a while and needs a few GB of disk space).
You do need a JDK (already present on this machine: OpenJDK 21).

```bash
# Debug/test build (installable APK):
flet build apk --org com.yourname --product "Interview Prep Quiz"

# Play Store upload format (Android App Bundle):
flet build aab --org com.yourname --product "Interview Prep Quiz"
```

Output lands in `build/apk/` or `build/aab/`.

### App icon

Drop a 1024×1024 PNG at `assets/icon.png` before building — `flet build`
picks it up automatically and generates all required Android icon sizes,
including the adaptive icon.

### Signing for Play Store

Play Store requires every release to be signed with the same key going
forward, so generate one keystore and keep it safe (losing it means you can
never update the app again under the same listing):

```bash
keytool -genkey -v -keystore ~/interview-quiz-release.jks \
  -keyalg RSA -keysize 2048 -validity 10000 -alias interview-quiz
```

Then pass it to the build:

```bash
flet build aab \
  --org com.yourname --product "Interview Prep Quiz" \
  --android-signing-key-store ~/interview-quiz-release.jks \
  --android-signing-key-store-password <password> \
  --android-signing-key-alias interview-quiz \
  --android-signing-key-password <password>
```

## Publishing checklist (Play Console)

1. Create a Google Play Developer account (one-time $25 fee).
2. Create a new app in the Play Console, upload the `.aab` from `flet build aab`.
3. Fill in the store listing: title, short/full description, screenshots
   (phone + optional tablet), feature graphic, app icon.
4. Set a content rating via Play Console's questionnaire.
5. Add a **privacy policy URL** — required even for a fully offline app
   like this one (a single static page is enough; a GitHub Pages page or
   gist works). State that all data (review progress) stays on-device.
6. Choose "Internal testing" track first, install on your own device via
   the generated link, sanity-check it, then promote to Production.

## What's a good next step for you to write

`src/scheduler.py` has a working but intentionally minimal
`schedule_next_review()` — it doubles the interval on every non-"Again"
rating and doesn't use `ease_factor` at all, so an "Easy" card and a
barely-passed "Good" card end up on the same schedule. Real spaced
repetition (SM-2, which Anki is based on) adjusts the interval growth rate
per-question using the ease factor. Worth tuning once you've used the app
for a few days and have a feel for which questions you actually need
reviewed more often.
