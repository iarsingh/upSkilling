#!/usr/bin/env python3
"""Upload rendered podcast videos to YouTube with scheduled publication."""

from __future__ import annotations

import argparse
import json
import os
from datetime import datetime, timezone
from pathlib import Path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "youtube-podcast-videos" / "upload-manifest.json"
STATE = ROOT / "youtube-podcast-videos" / "upload-state.json"
TOKEN = ROOT / ".youtube-token.json"
CLIENT_SECRET = ROOT / "youtube-client-secret.json"
SCOPES = ["https://www.googleapis.com/auth/youtube.upload"]


def credentials() -> Credentials:
    creds = None
    if TOKEN.exists():
        creds = Credentials.from_authorized_user_file(str(TOKEN), SCOPES)
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    if not creds or not creds.valid:
        if not CLIENT_SECRET.exists():
            raise SystemExit(
                "Missing youtube-client-secret.json. Download an OAuth Desktop client "
                "from Google Cloud Console and place it in the repository root."
            )
        flow = InstalledAppFlow.from_client_secrets_file(str(CLIENT_SECRET), SCOPES)
        creds = flow.run_local_server(port=0)
    TOKEN.write_text(creds.to_json())
    return creds


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", type=Path, default=MANIFEST)
    parser.add_argument("--limit", type=int)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument(
        "--confirm-scheduled-publication",
        action="store_true",
        help="Required before setting publishAt; otherwise videos remain private.",
    )
    args = parser.parse_args()

    episodes = json.loads(args.manifest.read_text())
    if args.limit:
        episodes = episodes[:args.limit]
    state = json.loads(STATE.read_text()) if STATE.exists() else {}

    if args.dry_run:
        for item in episodes:
            print(f"{item['publish_at']} | {item['title']} | {item['video']}")
        return

    youtube = build("youtube", "v3", credentials=credentials())
    for item in episodes:
        key = item["video"]
        if key in state:
            print(f"Skipping uploaded video {key}: {state[key]['video_id']}")
            continue

        publish_at = datetime.fromisoformat(item["publish_at"]).astimezone(timezone.utc)
        if publish_at <= datetime.now(timezone.utc):
            raise SystemExit(f"Scheduled time must be in the future: {item['publish_at']}")

        status = {"privacyStatus": "private", "selfDeclaredMadeForKids": False}
        if args.confirm_scheduled_publication:
            status["publishAt"] = publish_at.isoformat().replace("+00:00", "Z")

        body = {
            "snippet": {
                "title": item["title"],
                "description": item["description"],
                "tags": item.get("tags", []),
                "categoryId": item.get("category_id", "27"),
            },
            "status": status,
        }
        request = youtube.videos().insert(
            part="snippet,status",
            body=body,
            notifySubscribers=item.get("notify_subscribers", False),
            media_body=MediaFileUpload(
                str(ROOT / item["video"]), mimetype="video/mp4", resumable=True
            ),
        )
        response = None
        while response is None:
            upload_status, response = request.next_chunk()
            if upload_status:
                print(f"{item['title']}: {int(upload_status.progress() * 100)}%")

        state[key] = {
            "video_id": response["id"],
            "publish_at": item["publish_at"] if args.confirm_scheduled_publication else None,
        }
        STATE.parent.mkdir(parents=True, exist_ok=True)
        STATE.write_text(json.dumps(state, indent=2) + "\n")
        print(f"Uploaded: https://youtu.be/{response['id']}")


if __name__ == "__main__":
    main()
