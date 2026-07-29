# Scheduled YouTube podcast videos

This workflow converts each podcast MP3 into a 1920×1080 MP4 using the podcast
cover, then uploads it privately or schedules it with the YouTube Data API.

## 1. Choose the schedule

Edit `youtube-podcast-schedule.json`. `start` must include an offset, for example
`2026-07-27T09:00:00+05:30`. By default, one episode is scheduled per day.

## 2. Render and review

Start with one episode:

```bash
python3 scripts/build-youtube-podcast-videos.py --limit 1
python3 scripts/upload-youtube-podcast-videos.py --dry-run --limit 1
```

Rendered videos and `upload-manifest.json` are written under
`youtube-podcast-videos/`.

## 3. Authorize YouTube

1. Enable YouTube Data API v3 in Google Cloud Console.
2. Create an OAuth client with application type **Desktop app**.
3. Download it as `youtube-client-secret.json` in this repository.
4. Install the uploader dependencies:

```bash
python3 -m pip install -r requirements-youtube.txt
```

On the first upload, Google opens a consent page. The resulting token is stored
locally in `.youtube-token.json`.

## 4. Upload

Upload one test video as private:

```bash
python3 scripts/upload-youtube-podcast-videos.py --limit 1
```

After reviewing it in YouTube Studio, explicitly schedule the remaining videos:

```bash
python3 scripts/upload-youtube-podcast-videos.py --confirm-scheduled-publication
```

The uploader records completed uploads in
`youtube-podcast-videos/upload-state.json`, so reruns skip them.

## Notes

- YouTube requires video files, so MP3 files are converted to MP4 with cover art.
- OAuth is required; YouTube channel uploads do not support ordinary service accounts.
- New, unaudited API projects may be restricted to private uploads.
- YouTube enforces per-channel daily upload limits. If the batch reaches the
  limit, rerun it the following day; completed videos will be skipped.
