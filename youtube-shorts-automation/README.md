# YouTube Shorts Automation

Dedicated workspace for automating YouTube Shorts uploads from the generated vertical MP4 library.

Planned structure:

```text
youtube-shorts-automation/
├── src/                 # OAuth, upload, scheduling, and state logic
├── config/              # Non-secret configuration
├── docs/                # Setup and operating guides
├── upload-state.json    # Duplicate-publishing protection
├── .env.example         # Required environment-variable template
└── package.json         # Local automation commands
```

Secrets such as OAuth client credentials and refresh tokens will be stored in a local `.env` file and GitHub Actions secrets. They must never be committed.

Place videos to upload in:

```text
youtube-shorts-automation/content/
```

The GitHub workflow runs daily at 20:00 Asia/Kolkata and uploads the next
unpublished video as private. It can also be run manually in GitHub Actions.

Required GitHub Actions secrets:

- `YOUTUBE_CLIENT_ID`
- `YOUTUBE_CLIENT_SECRET`
- `YOUTUBE_REFRESH_TOKEN`

Optional repository variable: `YOUTUBE_PRIVACY_STATUS` (`private`, `unlisted`, or
`public`). Keep it set to `private` until testing is complete.
