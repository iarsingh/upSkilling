import os
import sqlite3
from contextlib import contextmanager

DB_PATH = os.environ.get("QUIZ_API_DB_PATH", "/data/reviews.db")


def init_db() -> None:
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    with get_conn() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS review_state (
                question_id TEXT PRIMARY KEY,
                interval_days REAL NOT NULL,
                repetitions INTEGER NOT NULL,
                due_date TEXT NOT NULL,
                last_reviewed TEXT
            )
            """
        )
        conn.commit()


@contextmanager
def get_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()
