"""Spaced-repetition scheduling.

This is the one piece of business logic in the app with a genuine design
decision behind it: how aggressively should the interval between reviews
grow, and how much should a single "Again" tap set a question back?

schedule_next_review() below has a deliberately minimal placeholder body
(plain interval doubling, no ease factor) so the app runs end-to-end. Swap
it for something closer to SM-2 (the algorithm behind Anki/SuperMemo) if
you want reviews to adapt per-question instead of on a fixed curve.
"""
from datetime import date, timedelta

from src.models import Rating, ReviewState


def schedule_next_review(state: ReviewState, rating: Rating) -> ReviewState:
    """Return the updated ReviewState after the user rates a card.

    TODO(you): this placeholder just doubles the interval on every non-AGAIN
    rating and resets to 1 day on AGAIN. It ignores `ease_factor` entirely
    and treats GOOD/EASY the same, which means a question you find trivial
    and one you barely pass end up on the identical schedule.

    A real SM-2-style version would, roughly:
      - On AGAIN: reset repetitions to 0, interval to ~1 day.
      - On GOOD: interval = interval * ease_factor (first review ~1 day,
        second ~6 days, then compounding).
      - On EASY: same as GOOD but also bump ease_factor up slightly
        (e.g. += 0.15) so future intervals grow faster for cards you find easy.
      - On AGAIN specifically, ease_factor should also drop slightly
        (e.g. -= 0.2, floor around 1.3) so chronically-missed cards get
        reviewed more often even after they're eventually "learned".

    Have a go at replacing the body below with that logic (or your own
    variant) using `state.ease_factor`, `state.repetitions`, and
    `state.interval_days`.
    """
    if rating == Rating.AGAIN:
        new_interval = 1.0
    elif state.interval_days == 0:
        new_interval = 1.0
    else:
        new_interval = state.interval_days * 2

    return ReviewState(
        question_id=state.question_id,
        interval_days=new_interval,
        ease_factor=state.ease_factor,
        repetitions=0 if rating == Rating.AGAIN else state.repetitions + 1,
        due_date=(date.today() + timedelta(days=new_interval)).isoformat(),
        last_reviewed=date.today().isoformat(),
    )
