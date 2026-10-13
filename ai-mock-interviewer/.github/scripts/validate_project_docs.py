#!/usr/bin/env python3
"""Check maintained project guides and their local source links without dependencies."""
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re
import sys

ROOT = Path(__file__).resolve().parents[2]
GUIDES = [ROOT / "PROJECT_ARCHITECTURE.md", ROOT / "INTERVIEW_QA.md"]
GUIDES += [p for p in [ROOT / "docs/PROCESS_FLOW.md", ROOT / "docs/UPGRADES.md"] if p.exists()]
errors = []
links = 0
for guide in GUIDES:
    if not guide.is_file():
        errors.append(f"Missing guide: {guide.relative_to(ROOT)}")
        continue
    text = guide.read_text(encoding="utf-8")
    if len(re.findall(r"^\s*```", text, re.MULTILINE)) % 2:
        errors.append(f"Unbalanced fenced blocks: {guide.relative_to(ROOT)}")
    if guide.name == "INTERVIEW_QA.md" and not re.search(r"^##\s", text, re.MULTILINE):
        errors.append("Interview guide has no question sections")
    for target in re.findall(r"\]\(([^)]+)\)", text):
        target = target.strip().split(" \"", 1)[0].strip("<>")
        parts = urlsplit(target)
        if parts.scheme or parts.netloc or not parts.path:
            continue
        local = guide.parent / unquote(parts.path)
        links += 1
        if not local.exists():
            errors.append(f"Broken link in {guide.relative_to(ROOT)}: {target}")
        elif re.fullmatch(r"L\d+(?:-L\d+)?", parts.fragment) and local.is_file():
            last_line = int(re.findall(r"\d+", parts.fragment)[-1])
            if last_line > len(local.read_text(errors="replace").splitlines()):
                errors.append(f"Source line outside file in {guide.relative_to(ROOT)}: {target}")
if errors:
    print("\n".join(errors), file=sys.stderr)
    sys.exit(1)
print(f"Validated {len(GUIDES)} project guides and {links} local links")
