# GenAI Project: Meeting Notes Summarizer

## Goal

Build a CLI tool that summarizes meeting transcripts into decisions, risks, and action items.

It has a local extractive fallback and optional Gemini summarization.

## Run

```bash
cd genai-hands-on-projects/python/meeting-notes-summarizer
python3 summarize.py --input data/sample_transcript.txt
```

Optional Gemini mode:

```bash
export USE_GEMINI=true
export GOOGLE_GENAI_USE_VERTEXAI=true
export GOOGLE_CLOUD_PROJECT="YOUR_PROJECT_ID"
export GOOGLE_CLOUD_LOCATION="us-central1"
python3 summarize.py --input data/sample_transcript.txt
```

## Interview Talking Points

- Summarization should preserve decisions and owners.
- Meeting output should be structured for automation.
- Long transcripts need chunking in production.
- Store outputs in Cloud Storage and trigger jobs with Cloud Scheduler or Pub/Sub.

