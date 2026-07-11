"""Server-side spaced-repetition scheduling.

Mirrors the same minimal placeholder used by the quiz-web client
(interview-quiz-app/src/scheduler.py) so the two stay behaviorally
consistent. See that file for the SM-2 upgrade notes -- the same
trade-off applies here since this is now the authoritative copy once
quiz-web is pointed at the API.
"""
from datetime import date, timedelta


def next_interval(rating: str, current_interval_days: float) -> float:
    if rating == "again":
        return 1.0
    if current_interval_days == 0:
        return 1.0
    return current_interval_days * 2


def next_due_date(interval_days: float) -> str:
    return (date.today() + timedelta(days=interval_days)).isoformat()
