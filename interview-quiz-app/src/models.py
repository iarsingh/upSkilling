from dataclasses import dataclass
from datetime import date
from enum import Enum


def derive_hint(answer: str, max_len: int = 140) -> str:
    """A one-sentence nudge derived from the answer text, shown before the
    full reveal. Deterministic and needs no extra content per question --
    just the first sentence, trimmed to a scannable length."""
    hint = answer.split(". ", 1)[0].strip()
    truncated_sentence = len(hint) < len(answer.strip())
    if len(hint) > max_len:
        hint = hint[:max_len].rsplit(" ", 1)[0]
        truncated_sentence = True
    if truncated_sentence and not hint.endswith((".", "!", "?")):
        hint += "…"
    return hint


@dataclass(frozen=True)
class Question:
    id: str
    topic: str
    subcategory: str
    question: str
    answer: str

    @property
    def hint(self) -> str:
        return derive_hint(self.answer)


@dataclass(frozen=True)
class MCQQuestion:
    id: str
    topic: str
    subtheme: str
    question: str
    options: tuple[str, ...]
    correct_index: int
    explanation: str


class Rating(Enum):
    """How well the user knew the answer, tapped after flipping a card."""
    AGAIN = "again"   # didn't know it, review again soon
    GOOD = "good"      # knew it with normal effort
    EASY = "easy"      # knew it instantly


@dataclass
class ReviewState:
    """Per-question spaced-repetition progress, persisted locally."""
    question_id: str
    interval_days: float
    ease_factor: float
    repetitions: int
    due_date: str  # ISO date, e.g. "2026-07-12"
    last_reviewed: str | None

    @staticmethod
    def new(question_id: str) -> "ReviewState":
        return ReviewState(
            question_id=question_id,
            interval_days=0.0,
            ease_factor=2.5,
            repetitions=0,
            due_date=date.today().isoformat(),
            last_reviewed=None,
        )

    def to_dict(self) -> dict:
        return {
            "question_id": self.question_id,
            "interval_days": self.interval_days,
            "ease_factor": self.ease_factor,
            "repetitions": self.repetitions,
            "due_date": self.due_date,
            "last_reviewed": self.last_reviewed,
        }

    @staticmethod
    def from_dict(d: dict) -> "ReviewState":
        return ReviewState(**d)
