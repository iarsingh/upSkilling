import json
from contextlib import asynccontextmanager
from datetime import date
from pathlib import Path

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from app.db import get_conn, init_db
from app.scheduler import next_due_date, next_interval

QUESTIONS_FILE = Path(__file__).parent / "questions.json"
QUESTIONS = json.loads(QUESTIONS_FILE.read_text())
QUESTIONS_BY_ID = {q["id"]: q for q in QUESTIONS}


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(title="quiz-api", version="1.0.0", lifespan=lifespan)


class ReviewIn(BaseModel):
    question_id: str
    rating: str  # "again" | "good" | "easy"


@app.get("/health")
def health():
    return {"status": "ok", "questions_loaded": len(QUESTIONS)}


@app.get("/topics")
def list_topics():
    counts: dict[str, int] = {}
    for q in QUESTIONS:
        counts[q["topic"]] = counts.get(q["topic"], 0) + 1
    # preserve first-seen order (already DevOps/K8s/GCP-weighted from build_question_bank.py)
    order = list(dict.fromkeys(q["topic"] for q in QUESTIONS))
    return [{"topic": t, "total": counts[t]} for t in order]


@app.get("/questions")
def list_questions(topic: str):
    qs = [q for q in QUESTIONS if q["topic"] == topic]
    if not qs:
        raise HTTPException(status_code=404, detail=f"Unknown topic: {topic}")
    return qs


@app.post("/reviews")
def record_review(review: ReviewIn):
    if review.question_id not in QUESTIONS_BY_ID:
        raise HTTPException(status_code=404, detail="Unknown question_id")
    if review.rating not in ("again", "good", "easy"):
        raise HTTPException(status_code=400, detail="rating must be again|good|easy")

    with get_conn() as conn:
        row = conn.execute(
            "SELECT interval_days FROM review_state WHERE question_id = ?",
            (review.question_id,),
        ).fetchone()
        current_interval = row["interval_days"] if row else 0.0

        interval = next_interval(review.rating, current_interval)
        due = next_due_date(interval)
        reps_delta = 0 if review.rating == "again" else 1

        conn.execute(
            """
            INSERT INTO review_state (question_id, interval_days, repetitions, due_date, last_reviewed)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(question_id) DO UPDATE SET
                interval_days = excluded.interval_days,
                repetitions = CASE WHEN ? = 'again' THEN 0 ELSE repetitions + 1 END,
                due_date = excluded.due_date,
                last_reviewed = excluded.last_reviewed
            """,
            (
                review.question_id,
                interval,
                reps_delta,
                due,
                date.today().isoformat(),
                review.rating,
            ),
        )
        conn.commit()

    return {"question_id": review.question_id, "interval_days": interval, "due_date": due}


@app.get("/stats")
def stats(topic: str):
    qs = [q for q in QUESTIONS if q["topic"] == topic]
    if not qs:
        raise HTTPException(status_code=404, detail=f"Unknown topic: {topic}")
    ids = [q["id"] for q in qs]

    with get_conn() as conn:
        placeholders = ",".join("?" for _ in ids)
        rows = conn.execute(
            f"SELECT question_id, repetitions FROM review_state WHERE question_id IN ({placeholders})",
            ids,
        ).fetchall()

    reviewed = len(rows)
    learned = sum(1 for r in rows if r["repetitions"] >= 2)
    return {"topic": topic, "total": len(qs), "reviewed": reviewed, "learned": learned}
