import os
import re
import shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO_DIR = os.path.join(ROOT, "audio")
LOG_PATH = os.path.join(AUDIO_DIR, "convert.log")
OUT_ROOT = os.path.join(AUDIO_DIR, "by-topic")

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


def classify(section):
    if section in EXCLUDE_EXACT:
        return "14-coding-and-scripting"
    s = section.lower()
    if any(k in s for k in EXCLUDE_SUBSTR):
        return "14-coding-and-scripting"
    for slug, keywords in RULES:
        if any(k in s for k in keywords):
            return slug
    return "13-gcp-platform"


def parse_log():
    mapping = {}
    with open(LOG_PATH) as f:
        for line in f:
            m = re.match(r"^\[(\d+)/\s*\d+\]\s+OK\s+.*?:\s+(.+)$", line.strip())
            if not m:
                continue
            num = int(m.group(1))
            title = m.group(2).strip()
            mapping[num] = title
    return mapping


def main():
    mapping = parse_log()
    files = [f for f in os.listdir(AUDIO_DIR) if f.endswith(".m4a")]

    moved = 0
    skipped = []
    for fname in sorted(files):
        m = re.match(r"^(\d+)-", fname)
        if not m:
            skipped.append((fname, "no numeric prefix"))
            continue
        num = int(m.group(1))
        title = mapping.get(num)
        if not title or "|" in title:
            skipped.append((fname, f"no usable title (num={num})"))
            continue
        slug = classify(title)
        out_dir = os.path.join(OUT_ROOT, slug)
        os.makedirs(out_dir, exist_ok=True)
        src = os.path.join(AUDIO_DIR, fname)
        dst = os.path.join(out_dir, fname)
        shutil.move(src, dst)
        moved += 1
        print(f"  {slug:26s} <- {fname}")

    print(f"\nMoved {moved} files.")
    if skipped:
        print(f"Skipped {len(skipped)}:")
        for fname, reason in skipped:
            print(f"  {fname}: {reason}")


if __name__ == "__main__":
    main()
