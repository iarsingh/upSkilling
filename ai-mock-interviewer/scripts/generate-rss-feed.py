import json
import os
import sys
import subprocess
from datetime import datetime, timedelta, timezone
from xml.sax.saxutils import escape

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MANIFEST_PATH = os.path.join(ROOT, "audio", "podcast", "episodes-manifest.json")
FEED_OUT = os.path.join(ROOT, "podcast-feed.xml")
FEED_OUT_PAGES = os.path.join(ROOT, "docs", "podcast-feed.xml")

REPO = "iarsingh/ai-mock-interviewer"
RELEASE_TAG = "podcast-v1"
ASSET_BASE = f"https://github.com/{REPO}/releases/download/{RELEASE_TAG}"
COVER_URL = f"{ASSET_BASE}/cover-art.png"
SHOW_TITLE = "AI Mock Interview Podcast"
SHOW_DESC = (
    "Voice-narrated DevOps, Cloud, Kubernetes, GCP, MLOps, GenAI, and interview-prep practice "
    "questions with model answers, organized by topic. Generated from the AI Mock Interviewer "
    "question bank. Listen, pause to think through your own answer, then hear a strong approach."
)
SHOW_LINK = f"https://github.com/{REPO}"
AUTHOR = "Akhilesh Ranjan Singh"
OWNER_EMAIL = "akhileshranjan.ks@gmail.com"

SERIES_ORDER = [
    "01-gcp-networking", "02-devops-cicd", "03-kubernetes-gke", "04-behavioral-screening",
    "05-genai-mlops", "06-cloud-migration", "07-technology-risk", "08-terraform-iac",
    "09-observability-sre", "10-security", "11-system-design", "12-linux-fundamentals", "13-gcp-platform",
]
SEASON_NUM = {slug: i + 1 for i, slug in enumerate(SERIES_ORDER)}


def fmt_duration(seconds):
    seconds = int(round(seconds))
    h, rem = divmod(seconds, 3600)
    m, s = divmod(rem, 60)
    return f"{h:02d}:{m:02d}:{s:02d}"


def rfc2822(dt):
    return dt.strftime("%a, %d %b %Y %H:%M:%S +0000")


def build_item(ep, pub_dt):
    filename = os.path.basename(ep["file"])
    url = f"{ASSET_BASE}/{filename}"
    title = ep["title"]
    series = ep["series"]
    if not title.startswith(series):
        title = f"{series} — {title}"
    real = ep["questions_with_real_answer"]
    total = ep["question_count"]
    desc = (
        f"{total} interview practice questions"
        + (f" ({real} with a full model answer)" if real < total else " with full model answers")
        + f", from the {series} track. Each question is read aloud with a pause to think through "
        "your own answer before a strong model answer follows."
    )
    season = SEASON_NUM[ep["series_slug"]]
    size_bytes = ep.get("size_bytes", 0)

    return f"""    <item>
      <title>{escape(title)}</title>
      <description>{escape(desc)}</description>
      <itunes:summary>{escape(desc)}</itunes:summary>
      <enclosure url="{escape(url)}" length="{size_bytes}" type="audio/mpeg" />
      <guid isPermaLink="false">{escape(url)}</guid>
      <pubDate>{rfc2822(pub_dt)}</pubDate>
      <itunes:duration>{fmt_duration(ep['duration_seconds'])}</itunes:duration>
      <itunes:season>{season}</itunes:season>
      <itunes:episode>{ep['episode']}</itunes:episode>
      <itunes:episodeType>full</itunes:episodeType>
      <itunes:explicit>false</itunes:explicit>
    </item>"""


def main():
    only_slugs = set(sys.argv[1:]) or None

    with open(MANIFEST_PATH) as f:
        manifest = json.load(f)

    for ep in manifest:
        path = os.path.join(ROOT, ep["file"])
        ep["size_bytes"] = os.path.getsize(path) if os.path.exists(path) else 0

    if only_slugs:
        manifest = [e for e in manifest if e["series_slug"] in only_slugs]

    manifest.sort(key=lambda e: (SEASON_NUM[e["series_slug"]], e["episode"]))

    base_date = datetime(2026, 1, 1, tzinfo=timezone.utc)
    items = []
    for i, ep in enumerate(manifest):
        pub_dt = base_date + timedelta(minutes=30 * i)
        items.append(build_item(ep, pub_dt))

    last_build = rfc2822(datetime.now(timezone.utc))

    feed = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>{escape(SHOW_TITLE)}</title>
    <description>{escape(SHOW_DESC)}</description>
    <link>{escape(SHOW_LINK)}</link>
    <language>en-us</language>
    <lastBuildDate>{last_build}</lastBuildDate>
    <itunes:author>{escape(AUTHOR)}</itunes:author>
    <itunes:owner>
      <itunes:name>{escape(AUTHOR)}</itunes:name>
      <itunes:email>{escape(OWNER_EMAIL)}</itunes:email>
    </itunes:owner>
    <managingEditor>{escape(OWNER_EMAIL)} ({escape(AUTHOR)})</managingEditor>
    <itunes:explicit>false</itunes:explicit>
    <itunes:image href="{escape(COVER_URL)}" />
    <image>
      <url>{escape(COVER_URL)}</url>
      <title>{escape(SHOW_TITLE)}</title>
      <link>{escape(SHOW_LINK)}</link>
    </image>
    <itunes:category text="Technology" />
    <itunes:category text="Careers" />
    <itunes:type>episodic</itunes:type>
{os.linesep.join(items)}
  </channel>
</rss>
"""

    with open(FEED_OUT, "w") as f:
        f.write(feed)
    os.makedirs(os.path.dirname(FEED_OUT_PAGES), exist_ok=True)
    with open(FEED_OUT_PAGES, "w") as f:
        f.write(feed)

    print(f"Wrote {FEED_OUT} and {FEED_OUT_PAGES} with {len(items)} items")


if __name__ == "__main__":
    main()
