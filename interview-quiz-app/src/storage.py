import json
from datetime import date

import flet as ft

from src.models import ReviewState

_KEY = "review_states_v1"


class ReviewStore:
    """Persists per-question review progress via Flet's cross-platform
    SharedPreferences service (works on Android/iOS/desktop/web)."""

    def __init__(self, page: ft.Page):
        self._sp = ft.SharedPreferences()
        page.services.append(self._sp)
        self._cache: dict[str, ReviewState] | None = None

    async def _load(self) -> dict[str, ReviewState]:
        if self._cache is None:
            raw = await self._sp.get(_KEY)
            data = json.loads(raw) if raw else {}
            self._cache = {qid: ReviewState.from_dict(d) for qid, d in data.items()}
        return self._cache

    async def get(self, question_id: str) -> ReviewState:
        states = await self._load()
        return states.get(question_id) or ReviewState.new(question_id)

    async def save(self, state: ReviewState) -> None:
        states = await self._load()
        states[state.question_id] = state
        payload = {qid: s.to_dict() for qid, s in states.items()}
        await self._sp.set(_KEY, json.dumps(payload))

    async def due_question_ids(self, all_ids: list[str]) -> list[str]:
        states = await self._load()
        today = date.today().isoformat()
        return [
            qid for qid in all_ids
            if qid not in states or states[qid].due_date <= today
        ]

    async def stats(self, all_ids: list[str]) -> dict:
        states = await self._load()
        reviewed = [states[qid] for qid in all_ids if qid in states]
        return {
            "total": len(all_ids),
            "reviewed": len(reviewed),
            "learned": sum(1 for s in reviewed if s.repetitions >= 2),
        }
