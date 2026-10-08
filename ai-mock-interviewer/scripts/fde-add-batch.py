"""Append a batch of FDE questions from a JSON file of [category, difficulty, questionType, question, answer] rows."""
import json
import sys
from pathlib import Path

BANK = Path(__file__).parent / "answer-bank" / "94-forward-deployed-engineer.json"

rows = json.loads(Path(sys.argv[1]).read_text())
bank = json.loads(BANK.read_text())
existing = {item["question"] for item in bank}
added = 0
for category, difficulty, question_type, question, answer in rows:
    if not question.startswith("FDE ") or question in existing:
        continue
    bank.append({
        "source": "Forward Deployed Engineer Bank",
        "section": "Forward Deployed Engineering",
        "category": f"Forward Deployed Engineering - {category}",
        "topic": "Forward Deployed Engineering",
        "difficulty": difficulty,
        "questionType": question_type,
        "question": question,
        "answer": answer,
    })
    existing.add(question)
    added += 1
BANK.write_text(json.dumps(bank, indent=2) + "\n")
print(f"added {added}, total {len(bank)}")
