#!/usr/bin/env python3
"""Render podcast MP3 files as 16:9 MP4 videos and create an upload manifest."""

from __future__ import annotations

import argparse
import json
import re
import subprocess
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_AUDIO = ROOT / "audio" / "podcast"
DEFAULT_COVER = ROOT / "public" / "podcast" / "ai-mock-interview-podcast-cover-v2.png"
DEFAULT_OUTPUT = ROOT / "youtube-podcast-videos"
DEFAULT_CONFIG = ROOT / "youtube-podcast-schedule.json"


def natural_key(path: Path) -> list[object]:
    return [int(part) if part.isdigit() else part.lower()
            for part in re.split(r"(\d+)", str(path.relative_to(DEFAULT_AUDIO)))]


def title_from_filename(path: Path) -> str:
    stem = re.sub(r"^S\d+E\d+-", "", path.stem)
    return " ".join(word.upper() if word in {"ai", "gcp", "mlops", "sre", "api"}
                    else word.capitalize() for word in stem.split("-"))


def duration_seconds(path: Path) -> float:
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", str(path)],
        check=True, capture_output=True, text=True,
    )
    return float(result.stdout.strip())


def render(audio: Path, cover: Path, output: Path) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
            "-loop", "1", "-framerate", "1", "-i", str(cover), "-i", str(audio),
            "-vf", "scale=1920:1080:force_original_aspect_ratio=decrease,"
                   "pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p",
            "-c:v", "libx264", "-preset", "veryfast", "-tune", "stillimage", "-r", "1",
            "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart",
            str(output),
        ],
        check=True,
    )


def is_valid_video(path: Path) -> bool:
    if not path.exists():
        return False
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", str(path)],
        capture_output=True, text=True,
    )
    try:
        return result.returncode == 0 and float(result.stdout.strip()) > 0
    except ValueError:
        return False


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, help="Render only the first N episodes")
    parser.add_argument("--match", help="Only render paths containing this text")
    parser.add_argument("--force", action="store_true", help="Re-render existing MP4s")
    parser.add_argument("--workers", type=int, default=4, help="Parallel FFmpeg processes")
    parser.add_argument("--audio-dir", type=Path, default=DEFAULT_AUDIO)
    parser.add_argument("--cover", type=Path, default=DEFAULT_COVER)
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--config", type=Path, default=DEFAULT_CONFIG)
    args = parser.parse_args()

    config = json.loads(args.config.read_text())
    start = datetime.fromisoformat(config["start"])
    interval = timedelta(days=float(config.get("interval_days", 1)))
    audio_files = sorted(args.audio_dir.rglob("*.mp3"), key=natural_key)
    if args.match:
        audio_files = [p for p in audio_files if args.match.lower() in str(p).lower()]
    if args.limit:
        audio_files = audio_files[:args.limit]

    jobs = []
    for audio in audio_files:
        relative = audio.relative_to(args.audio_dir)
        video = args.output_dir / relative.with_suffix(".mp4")
        if args.force or not is_valid_video(video):
            jobs.append((audio, relative, video))

    with ThreadPoolExecutor(max_workers=max(1, args.workers)) as pool:
        futures = {}
        for audio, relative, video in jobs:
            print(f"Queueing {relative}", flush=True)
            futures[pool.submit(render, audio, args.cover, video)] = relative
        for future in as_completed(futures):
            relative = futures[future]
            future.result()
            print(f"Completed {relative}", flush=True)

    manifest = []
    for index, audio in enumerate(audio_files):
        relative = audio.relative_to(args.audio_dir)
        video = args.output_dir / relative.with_suffix(".mp4")
        manifest.append(
            {
                "audio": str(audio.relative_to(ROOT)),
                "video": str(video.relative_to(ROOT)),
                "title": title_from_filename(audio)[:100],
                "description": (
                    f"{title_from_filename(audio)} — an AI Mock Interview Podcast episode "
                    "with interview questions, model answers, and practical preparation guidance."
                ),
                "publish_at": (start + index * interval).isoformat(),
                "duration_seconds": round(duration_seconds(audio), 2),
                "tags": config.get("tags", []),
                "category_id": config.get("category_id", "27"),
                "privacy_status": config.get("privacy_status", "private"),
                "notify_subscribers": config.get("notify_subscribers", False),
            }
        )

    manifest_path = args.output_dir / "upload-manifest.json"
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"Prepared {len(manifest)} episode(s): {manifest_path}")


if __name__ == "__main__":
    main()
