"""Split markdown runbooks into overlapping passages with heading context."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class RawChunk:
    id: str
    source: str
    title: str
    heading: str
    text: str
    embed_text: str


def load_corpus(corpus_dir: Path) -> list[RawChunk]:
    chunks: list[RawChunk] = []
    for path in sorted(corpus_dir.glob("*.md")):
        title, parts = split_markdown(path.read_text(encoding="utf-8"), path.stem)
        source = f"corpus/{path.name}"
        for index, (heading, text) in enumerate(parts, start=1):
            chunks.append(
                RawChunk(
                    id=f"{path.stem}-{index:02d}",
                    source=source,
                    title=title,
                    heading=heading,
                    text=text,
                    embed_text=f"{title}\n{heading}\n{text}",
                )
            )
    return chunks


def split_markdown(markdown: str, fallback_title: str) -> tuple[str, list[tuple[str, str]]]:
    title = fallback_title.replace("-", " ").title()
    heading = title
    sections: list[tuple[str, list[str]]] = []
    buffer: list[str] = []

    def flush() -> None:
        body = "\n".join(buffer).strip()
        if body:
            sections.append((heading, [body]))

    for line in markdown.splitlines():
        if line.startswith("# "):
            flush()
            buffer = []
            title = line[2:].strip() or title
            heading = title
            continue
        if line.startswith("## "):
            flush()
            buffer = []
            heading = line[3:].strip() or heading
            continue
        buffer.append(line)
    flush()

    parts: list[tuple[str, str]] = []
    for section_heading, bodies in sections:
        for piece in windows(bodies[0]):
            parts.append((section_heading, piece))
    return title, parts


def windows(text: str, size: int = 900, overlap: int = 180) -> list[str]:
    """Character windows that prefer to break on whitespace."""
    text = text.strip()
    if not text:
        return []
    if len(text) <= size:
        return [text]

    pieces: list[str] = []
    start = 0
    while start < len(text):
        end = min(start + size, len(text))
        if end < len(text):
            space = text.rfind(" ", start + size // 2, end)
            if space != -1:
                end = space
        piece = text[start:end].strip()
        if piece:
            pieces.append(piece)
        if end >= len(text):
            break
        next_start = end - overlap
        if next_start <= start:
            next_start = end
        else:
            # Keep the overlap, but start on a word boundary.
            space = text.find(" ", next_start, end)
            if space != -1:
                next_start = space + 1
        start = next_start
    return pieces
