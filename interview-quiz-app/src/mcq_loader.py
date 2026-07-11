import json
from functools import lru_cache
from pathlib import Path

from src.models import MCQQuestion

DATA_FILE = Path(__file__).resolve().parents[1] / "data" / "mcq_questions.json"


@lru_cache(maxsize=1)
def load_mcq_questions() -> list[MCQQuestion]:
    raw = json.loads(DATA_FILE.read_text())
    return [
        MCQQuestion(
            id=item["id"],
            topic=item["topic"],
            subtheme=item["subtheme"],
            question=item["question"],
            options=tuple(item["options"]),
            correct_index=item["correct_index"],
            explanation=item["explanation"],
        )
        for item in raw
    ]


def mcq_topics() -> list[str]:
    seen: dict[str, None] = {}
    for q in load_mcq_questions():
        seen.setdefault(q.topic, None)
    return list(seen.keys())


def mcq_questions_by_topic(topic: str) -> list[MCQQuestion]:
    return [q for q in load_mcq_questions() if q.topic == topic]
