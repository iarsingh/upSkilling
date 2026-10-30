"""SQLite index: chunk text, metadata, and the embedding computed at index time."""

from __future__ import annotations

import json
import sqlite3
from pathlib import Path

from rag.chunk import RawChunk
from rag.models import Chunk


SCHEMA = """
CREATE TABLE IF NOT EXISTS meta (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS chunks (
    id TEXT PRIMARY KEY,
    source TEXT NOT NULL,
    title TEXT NOT NULL,
    heading TEXT NOT NULL,
    text TEXT NOT NULL,
    embed_text TEXT NOT NULL,
    embedding TEXT NOT NULL
);
"""


def connect(db_path: Path) -> sqlite3.Connection:
    db_path.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(db_path)
    connection.row_factory = sqlite3.Row
    connection.executescript(SCHEMA)
    return connection


def rebuild(db_path: Path, chunks: list[RawChunk], embeddings: list[list[float]], embed_model: str) -> None:
    if len(chunks) != len(embeddings):
        raise ValueError("Each chunk needs one embedding.")
    if db_path.exists():
        db_path.unlink()
    with connect(db_path) as connection:
        connection.execute("INSERT INTO meta (key, value) VALUES (?, ?)", ("embed_model", embed_model))
        connection.executemany(
            """
            INSERT INTO chunks (id, source, title, heading, text, embed_text, embedding)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            [
                (
                    chunk.id,
                    chunk.source,
                    chunk.title,
                    chunk.heading,
                    chunk.text,
                    chunk.embed_text,
                    json.dumps(vector),
                )
                for chunk, vector in zip(chunks, embeddings)
            ],
        )


def load_chunks(db_path: Path) -> list[Chunk]:
    if not db_path.exists():
        raise FileNotFoundError(f"No index at {db_path}. Run: python3 -m rag.cli index")
    with connect(db_path) as connection:
        rows = connection.execute(
            "SELECT id, source, title, heading, text, embedding FROM chunks ORDER BY id"
        ).fetchall()
    return [
        Chunk(
            id=row["id"],
            source=row["source"],
            title=row["title"],
            heading=row["heading"],
            text=row["text"],
            embedding=json.loads(row["embedding"]),
        )
        for row in rows
    ]
