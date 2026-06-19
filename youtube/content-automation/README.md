# YouTube Content Automation

Local YouTube video generator and uploader for MLOps, DevOps, Kubernetes, and AI infrastructure topics.

## What It Does

- Uses Ollama locally to draft a video title, description, tags, thumbnail text, scenes, and narration.
- Falls back to a built-in MLOps script when Ollama is offline.
- Uses `ffmpeg` to render slides and produce `video.mp4`.
- Creates `thumbnail.png`, `captions.srt`, `narration.txt`, and `metadata.json`.
- Uploads to YouTube through the YouTube Data API.
- Defaults uploads to `private`.

## Quick Start

```bash
cd youtube/content-automation
cp .env.example .env
npm run video
```

Use a custom topic:

```bash
npm run video -- --topic "How to build an MLOps incident copilot with Ollama"
```

Generated output is saved under:

```text
videos/
```

Each video package contains:

- `video.mp4`
- `metadata.json`
- `thumbnail.png`
- `captions.srt`
- `narration.txt`

## YouTube Upload Setup

1. Create a Google Cloud project.
2. Enable the YouTube Data API v3.
3. Create an OAuth client.
4. Add this redirect URI:

```text
http://localhost:3000/youtube/callback
```

Fill these values in `.env`:

```bash
YOUTUBE_CLIENT_ID=your_google_oauth_client_id
YOUTUBE_CLIENT_SECRET=your_google_oauth_client_secret
YOUTUBE_REDIRECT_URI=http://localhost:3000/youtube/callback
YOUTUBE_PRIVACY_STATUS=private
```

Connect your YouTube account:

```bash
npm run auth
```

Upload the most recent generated video:

```bash
npm run upload
```

Override visibility:

```bash
npm run upload -- --privacy unlisted
```

Upload a specific generated folder:

```bash
npm run upload -- --dir videos/2026-06-18-mlops-incident-copilot-with-ollama
```

## Requirements

- Node.js 18 or newer
- Ollama running locally for AI-generated scripts
- `ffmpeg` and `ffprobe`
- macOS `say` is used for narration when available; if narration audio cannot be created, the script still creates a silent video with captions and narration text.
