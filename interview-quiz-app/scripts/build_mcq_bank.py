"""Merge the per-topic MCQ files in data/mcq/*.json into data/mcq_questions.json.

Run manually whenever a file under data/mcq/ changes:
    python scripts/build_mcq_bank.py
"""
import json
from pathlib import Path

SOURCE_DIR = Path(__file__).resolve().parents[1] / "data" / "mcq"
DEST = Path(__file__).resolve().parents[1] / "data" / "mcq_questions.json"

REQUIRED_KEYS = {"id", "topic", "subtheme", "question", "options", "correct_index", "explanation"}


def main() -> None:
    all_items = []
    for path in sorted(SOURCE_DIR.glob("*.json")):
        all_items.extend(json.loads(path.read_text()))

    ids = set()
    questions_seen = set()
    for item in all_items:
        assert set(item.keys()) == REQUIRED_KEYS, f"bad shape: {item.get('id')}"
        assert len(item["options"]) == 4, f"needs 4 options: {item['id']}"
        assert 0 <= item["correct_index"] <= 3, f"correct_index out of range: {item['id']}"
        assert item["id"] not in ids, f"duplicate id: {item['id']}"
        ids.add(item["id"])
        q = item["question"].strip().lower()
        assert q not in questions_seen, f"duplicate question text: {item['id']}"
        questions_seen.add(q)

    DEST.write_text(json.dumps(all_items, indent=2))

    counts: dict[str, int] = {}
    for item in all_items:
        counts[item["topic"]] = counts.get(item["topic"], 0) + 1
    print(f"Wrote {len(all_items)} MCQs to {DEST}")
    for topic, count in counts.items():
        print(f"  {count:>4}  {topic}")


if __name__ == "__main__":
    main()
