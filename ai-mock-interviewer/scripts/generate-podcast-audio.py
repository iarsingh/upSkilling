import json
import os
import re
import subprocess
import time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATASET_PATH = os.path.join(ROOT, "scripts", "answer-bank", "final-qa-dataset.json")
AUDIO_ROOT = os.path.join(ROOT, "audio", "podcast")
VOICE = "Samantha"

TARGET_SECONDS = 660  # ~11 min target, wider safety margin under the 15-min cap
WORDS_PER_SEC = 2.7
CALIBRATION = 1.28  # empirical correction measured on Q+A content (longer prose reads faster per word than short Q-only items did)
INTRO_SEC = 20

PLACEHOLDER_PREFIX = "A strong answer should directly address the"

TRANSITIONS = [
    "Nice, let's continue.",
    "Great, moving on.",
    "Alright, next question.",
    "Let's keep going.",
    "On to the next one.",
    "Good, here's another one.",
]

EXCLUDE_EXACT = {"Python", "Go", "FastAPI", "Coding Exercises", "Debug This Script", "Scripting & Automation"}
EXCLUDE_SUBSTR = [
    "dsa for python", "leetcode and hackerrank", "python automation and scripting",
    "full stack python engineer", "python developer system design",
    "python and go platform programming", "hands-on round",
]
RULES = [
    ("07-technology-risk", ["technology risk", " risk", "governance", "compliance", "audit", "it controls", "sdlc and secure development"]),
    ("05-genai-mlops", ["genai", "llm", "mlops", "machine learning", "vertex ai", "kubeflow", "ai infrastructure", "ai/ml"]),
    ("01-gcp-networking", ["networking", "network"]),
    ("03-kubernetes-gke", ["kubernetes", "gke", " eks", " aks", "service mesh", "statefulset"]),
    ("08-terraform-iac", ["terraform", "iac", "infrastructure as code"]),
    ("02-devops-cicd", ["ci/cd", "cicd", "gitops", "docker", "devsecops", "devex", "internal developer platform", "platform engineering", "ansible"]),
    ("09-observability-sre", ["observability", "monitoring", "sre", "datadog", "performance", "incident", "reliability"]),
    ("10-security", ["security", "iam", "access"]),
    ("06-cloud-migration", ["migration"]),
    ("04-behavioral-screening", ["behavioral", "behavioural", "hr /", "ownership", "screening", "resume deep-dive"]),
    ("11-system-design", ["system design", "diagram-based", "architecture"]),
    ("12-linux-fundamentals", ["linux", "basic / one-liner", "fundamentals"]),
]

SERIES_TITLES = {
    "01-gcp-networking": "GCP Networking",
    "02-devops-cicd": "DevOps and CI-CD",
    "03-kubernetes-gke": "Kubernetes and GKE",
    "04-behavioral-screening": "Behavioral and Screening",
    "05-genai-mlops": "GenAI and MLOps",
    "06-cloud-migration": "Cloud Migration",
    "07-technology-risk": "Technology Risk",
    "08-terraform-iac": "Terraform and IaC",
    "09-observability-sre": "Observability and SRE",
    "10-security": "Security",
    "11-system-design": "System Design",
    "12-linux-fundamentals": "Linux and Fundamentals",
    "13-gcp-platform": "GCP Platform and Cloud Engineering",
}


def classify(section):
    if section in EXCLUDE_EXACT:
        return None
    s = section.lower()
    if any(k in s for k in EXCLUDE_SUBSTR):
        return None
    for slug, keywords in RULES:
        if any(k in s for k in keywords):
            return slug
    return "13-gcp-platform"


def clean_for_speech(text):
    text = re.sub(r"\*\*(.*?)\*\*", r"\1", text)
    text = text.replace("`", "")
    text = text.replace("/", " or ")
    text = text.replace("&", "and")
    text = text.replace("->", " leads to ")
    text = re.sub(r"\s+", " ", text).strip()
    return text


CODE_MARKERS = re.compile(r"(\bdef \w+\(|\bimport \w|\bclass \w+[:(]|\n\s{4}\S|```|\bSELECT\b.*\bFROM\b)", re.IGNORECASE)


def sanitize_answer(answer):
    """Strip raw code from an answer; if code appears, keep only the prose before it."""
    m = CODE_MARKERS.search(answer)
    if m and m.start() > 40:
        return answer[: m.start()].strip() + " The exact commands and code are in the written question bank."
    if m:
        return "The exact commands and code for this one are in the written question bank."
    return answer


def est_seconds(text):
    words = len(text.split())
    return (words / WORDS_PER_SEC) * CALIBRATION


def build_script(series_title, episode_title, items, is_first_of_series):
    lines = []
    if is_first_of_series:
        lines.append(
            f"Welcome to the {series_title} practice series from the AI Mock Interviewer question bank. "
            f"[[slnc 500]]"
        )
    lines.append(f"{episode_title}. This episode has {len(items)} questions. [[slnc 600]]")
    lines.append(
        "For each question, take a moment to think through your own answer before I share a strong approach. "
        "[[slnc 800]]"
    )
    for i, (item, transition) in enumerate(zip(items, _cycle_transitions(len(items))), 1):
        category = item.get("category") or ""
        question = clean_for_speech(item["question"])
        prefix = f"Question {i}."
        if category:
            prefix += f" {clean_for_speech(category)}."
        lines.append(f"{prefix} {question} [[slnc 1500]]")

        answer = item["answer"]
        if answer.startswith(PLACEHOLDER_PREFIX):
            lines.append(
                "We don't have a model answer recorded for that one yet, so it's a good one to research on your own. [[slnc 600]]"
            )
        else:
            clean_answer = clean_for_speech(sanitize_answer(answer))
            lines.append(f"Here's a strong way to approach it. [[slnc 400]] {clean_answer} [[slnc 900]]")
        lines.append(f"{transition} [[slnc 400]]")
    lines.append("That wraps up this episode. Nice work practicing, and see you in the next one. [[slnc 300]]")
    return "\n".join(lines)


def _cycle_transitions(n):
    for i in range(n):
        yield TRANSITIONS[i % len(TRANSITIONS)]


def render(series_slug, series_title, ep_num, episode_title, items, is_first_of_series):
    out_dir = os.path.join(AUDIO_ROOT, series_slug)
    os.makedirs(out_dir, exist_ok=True)
    slug = re.sub(r"[^a-z0-9]+", "-", episode_title.lower()).strip("-")[:60]
    prefix = series_slug.split("-")[0]
    base = f"S{prefix}E{ep_num:02d}-{slug}"
    txt_path = os.path.join(out_dir, base + ".txt")
    aiff_path = os.path.join(out_dir, base + ".aiff")
    mp3_path = os.path.join(out_dir, base + ".mp3")

    script_text = build_script(series_title, episode_title, items, is_first_of_series)
    with open(txt_path, "w") as f:
        f.write(script_text)

    subprocess.run(["say", "-v", VOICE, "-f", txt_path, "-o", aiff_path], check=True)
    subprocess.run(
        [
            "ffmpeg", "-y", "-loglevel", "error",
            "-i", aiff_path,
            "-ar", "44100", "-ac", "1", "-b:a", "128k", "-codec:a", "libmp3lame",
            "-metadata", f"title={episode_title}",
            "-metadata", "artist=AI Mock Interviewer",
            "-metadata", f"album={series_title}",
            "-metadata", f"track={ep_num}",
            mp3_path,
        ],
        check=True,
    )
    dur = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", mp3_path],
        capture_output=True, text=True, check=True,
    ).stdout.strip()
    os.remove(aiff_path)
    os.remove(txt_path)

    real_answers = sum(1 for it in items if not it["answer"].startswith(PLACEHOLDER_PREFIX))
    return {
        "series": series_title,
        "series_slug": series_slug,
        "episode": ep_num,
        "title": episode_title,
        "question_count": len(items),
        "questions_with_real_answer": real_answers,
        "duration_seconds": round(float(dur), 1),
        "file": os.path.relpath(mp3_path, ROOT),
    }


def main(only_slugs=None):
    with open(DATASET_PATH, "r") as f:
        data = json.load(f)

    excluded = 0
    by_series = {}
    series_order = []
    for e in data:
        slug = classify(e["section"])
        if slug is None:
            excluded += 1
            continue
        if only_slugs and slug not in only_slugs:
            continue
        if slug not in by_series:
            by_series[slug] = []
            series_order.append(slug)
        by_series[slug].append(e)

    print(f"Excluded (code-heavy) questions: {excluded}")
    total_q = sum(len(v) for v in by_series.values())
    print(f"Total questions to narrate (with answers where available): {total_q}")

    manifest_path = os.path.join(AUDIO_ROOT, "episodes-manifest.json")
    manifest = json.load(open(manifest_path)) if os.path.exists(manifest_path) else []
    t0 = time.time()
    for slug in series_order:
        series_title = SERIES_TITLES[slug]
        items = by_series[slug]
        ep_num = 1
        chunk = []
        est = INTRO_SEC
        is_first = True

        def flush():
            nonlocal ep_num, chunk, est, is_first
            if not chunk:
                return
            title = f"{series_title} Part {ep_num}"
            print(f"[{time.time()-t0:6.0f}s] Rendering {slug} E{ep_num:02d} ({len(chunk)} Q, ~{est:.0f}s est)")
            result = render(slug, series_title, ep_num, title, chunk, is_first)
            manifest.append(result)
            with open(manifest_path, "w") as mf:
                json.dump(manifest, mf, indent=2)
            ep_num += 1
            chunk = []
            est = INTRO_SEC
            is_first = False

        for item in items:
            q_text = item["question"]
            a_text = item["answer"]
            if a_text.startswith(PLACEHOLDER_PREFIX):
                item_est = est_seconds(q_text) + 8
            else:
                item_est = est_seconds(q_text) + est_seconds(sanitize_answer(a_text)) + 6
            if chunk and est + item_est > TARGET_SECONDS:
                flush()
            chunk.append(item)
            est += item_est
        flush()

    print(f"\nDone. Rendered {len(manifest)} episodes in {time.time()-t0:.0f}s.")


if __name__ == "__main__":
    import sys
    slugs = set(sys.argv[1:]) or None
    main(only_slugs=slugs)
