import json
import os
import urllib.parse
import urllib.request
from functools import lru_cache
from pathlib import Path

from src.models import Question

DATA_FILE = Path(__file__).resolve().parents[1] / "data" / "questions.json"

# When set (e.g. "http://quiz-api:8000" inside the cluster), questions are
# fetched from the quiz-api microservice instead of the bundled JSON file --
# this is what gives the Istio mesh real quiz-web -> quiz-api traffic to
# route and encrypt. Falls back to the local file so `flet run` still works
# standalone with zero setup.
API_BASE_URL = os.environ.get("QUIZ_API_URL")


def _fetch_json(path: str):
    with urllib.request.urlopen(f"{API_BASE_URL}{path}", timeout=5) as resp:
        return json.loads(resp.read())


@lru_cache(maxsize=1)
def load_questions() -> list[Question]:
    if API_BASE_URL:
        raw = []
        for t in _fetch_json("/topics"):
            raw.extend(_fetch_json(f"/questions?topic={urllib.parse.quote(t['topic'])}"))
    else:
        raw = json.loads(DATA_FILE.read_text())
    return [Question(**item) for item in raw]


def topics() -> list[str]:
    seen: dict[str, None] = {}
    for q in load_questions():
        seen.setdefault(q.topic, None)
    return list(seen.keys())


def questions_by_topic(topic: str) -> list[Question]:
    return [q for q in load_questions() if q.topic == topic]
