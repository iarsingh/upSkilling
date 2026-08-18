# GenAI Project: Meeting Notes Summarizer

A CLI tool that turns a raw meeting transcript into a structured summary — decisions, risks, and action
items — with a local extractive fallback and optional Gemini summarization.

## How It Works

```text
Transcript file
  -> read as plain text
  -> local mode: keyword-match lines (decision / risk,blocked,issue,concern / action,owner,todo,next)
     and bucket them into sections
  -> Gemini mode: send the full transcript with a structured-summary prompt
  -> write the result as Markdown to the output path
```

The local fallback is intentionally simple (line-level keyword matching, no NLP model) — it exists so the
tool is usable and testable offline, not as a substitute for real summarization quality.

## Tech Stack

- Python standard library only for the local mode (`argparse`, `pathlib`) — no dependencies beyond the
  shared `requirements.txt` needed for Gemini mode
- `google-genai` SDK for optional Gemini summarization

## Quick Start

```bash
cd genai-hands-on-projects
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

cd python/meeting-notes-summarizer
python3 summarize.py --input data/sample_transcript.txt
```

Output is written to `outputs/summary.md` by default (`--output` to change it):

```bash
python3 summarize.py --input data/sample_transcript.txt --output outputs/2026-07-04-standup.md
```

## Optional Gemini Mode

```bash
export USE_GEMINI=true
export GOOGLE_GENAI_USE_VERTEXAI=true
export GOOGLE_CLOUD_PROJECT="YOUR_PROJECT_ID"
export GOOGLE_CLOUD_LOCATION="us-central1"
python3 summarize.py --input data/sample_transcript.txt
```

Gemini mode also adds an "Owners" and "Follow-up Questions" section that the local fallback doesn't
attempt to infer.

## Configuration

| Variable | Default | Purpose |
|---|---|---|
| `USE_GEMINI` | `false` | Summarize with Gemini instead of the local keyword-based fallback |
| `GENAI_MODEL` | `gemini-2.5-flash` | Model name used when Gemini mode is enabled |
| `GOOGLE_GENAI_USE_VERTEXAI`, `GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_LOCATION` | — | Vertex AI auth for Gemini mode |

## Interview Talking Points

- Summarization should preserve decisions and owners, not just compress word count — a summary that loses
  "who owns this" isn't useful in a work context.
- Structured output (fixed Markdown sections) is what makes a summary automatable downstream, versus a
  free-form paragraph a human has to re-parse.
- Long transcripts need chunking before they fit a model's context window in production; this demo assumes
  a single transcript short enough to send whole.
- A real pipeline would trigger this from an event (a call-recording webhook, a Pub/Sub message) and store
  the output in Cloud Storage rather than run as a manual CLI step.

## Limitations & Next Steps

- The local fallback is keyword-matching, not summarization — it will miss decisions/risks phrased without
  the trigger words it looks for.
- No chunking for long transcripts.
- Next step: add a token-count guard that automatically chunks and map-reduces long transcripts before
  calling Gemini.
