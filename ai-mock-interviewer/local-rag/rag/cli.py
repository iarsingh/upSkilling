"""Index the corpus and ask questions from the terminal."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from rag.answer import answer_question
from rag.chunk import load_corpus
from rag.embed import embed_model, embed_texts
from rag.retrieve import hybrid_search, passes_support
from rag.store import load_chunks, rebuild

ROOT = Path(__file__).resolve().parent.parent
CORPUS = ROOT / "corpus"
DB_PATH = ROOT / "data" / "index.sqlite"

# Retrieval checks. Generation is separate because a local model can phrase the same fact differently.
EVAL_CASES = [
    ("What does ERR-4401 on pay-gw-03 mean?", "checkout-timeouts.md"),
    ("Shoppers cannot pay and the spinner never finishes", "checkout-timeouts.md"),
    ("How do I refund a duplicate capture after the nightly batch?", "refunds.md"),
    ("Does a disk resize need a reboot?", "disk-volumes.md"),
    ("What is the after-hours escalation path?", "escalation.md"),
    ("How do I waive a late fee after a bank holiday?", "fee-waiver.md"),
    ("Why are invoices late after month end?", "billing-close.md"),
    ("How do I restart the label printer in warehouse three?", "warehouse-printer.md"),
    ("What color is the visitor badge?", "facilities-badges.md"),
    ("What is the CEO's favorite coffee?", None),
]


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Local RAG over the runbook corpus.")
    sub = parser.add_subparsers(dest="command", required=True)

    sub.add_parser("index", help="Chunk the corpus, embed it, and write data/index.sqlite")

    ask = sub.add_parser("ask", help="Answer one question with citations")
    ask.add_argument("question")

    search = sub.add_parser("search", help="Show retrieved passages without calling the chat model")
    search.add_argument("question")

    sub.add_parser("eval", help="Check that known questions retrieve the expected runbook")

    serve = sub.add_parser("serve", help="Open a local page for questions")
    serve.add_argument("--port", type=int, default=8787)

    args = parser.parse_args(argv)
    if args.command == "index":
        return cmd_index()
    if args.command == "ask":
        return cmd_ask(args.question)
    if args.command == "search":
        return cmd_search(args.question)
    if args.command == "eval":
        return cmd_eval()
    if args.command == "serve":
        from rag.server import serve as serve_app

        serve_app(args.port)
        return 0
    return 1


def cmd_index() -> int:
    chunks = load_corpus(CORPUS)
    if not chunks:
        print(f"No markdown files in {CORPUS}", file=sys.stderr)
        return 1
    print(f"Embedding {len(chunks)} chunks with {embed_model()}...")
    vectors = embed_texts([chunk.embed_text for chunk in chunks])
    rebuild(DB_PATH, chunks, vectors, embed_model())
    print(f"Indexed {len(chunks)} chunks at {DB_PATH}")
    return 0


def cmd_ask(question: str) -> int:
    result = answer_question(question, load_chunks(DB_PATH))
    print(result.text)
    print()
    if result.sources:
        label = "Retrieved passages" if result.abstained else "Sources"
        print(label)
        for index, hit in enumerate(result.sources, start=1):
            print(f"  [{index}] {hit.chunk.title} — {hit.chunk.heading} ({hit.chunk.source})")
    elif result.nearest:
        print("Nearest passages were not used as sources")
        for hit in result.nearest:
            print(
                f"  - {hit.chunk.source} / {hit.chunk.heading} "
                f"(cosine {hit.vector_score:.3f})"
            )
    return 0


def cmd_search(question: str) -> int:
    chunks = load_chunks(DB_PATH)
    embedding = embed_texts([question])[0]
    hits = hybrid_search(question, chunks, embedding)
    if not hits:
        print("No passages.")
        return 0
    for rank, hit in enumerate(hits[:5], start=1):
        print(
            f"{rank}. {hit.chunk.id}  {hit.chunk.source}  {hit.chunk.heading}\n"
            f"   rerank {hit.rerank_score:.3f}  cosine {hit.vector_score:.3f}  "
            f"bm25 {hit.bm25_score:.3f}\n"
            f"   {hit.chunk.text[:220].replace(chr(10), ' ')}"
        )
        print()
    return 0


def cmd_eval() -> int:
    chunks = load_chunks(DB_PATH)
    failed = 0
    for question, expected in EVAL_CASES:
        embedding = embed_texts([question])[0]
        hits = hybrid_search(question, chunks, embedding)
        supported = passes_support(question, hits, chunks, embedding)
        top = hits[0].chunk.source if hits else ""
        if expected is None:
            ok = not supported
            label = "abstain" if ok else top
        else:
            ok = supported and expected in top
            label = top
        mark = "ok" if ok else "MISS"
        if not ok:
            failed += 1
        cosine = hits[0].vector_score if hits else 0.0
        print(f"{mark:4}  cosine {cosine:.3f}  {label:28}  {question}")
    print(f"\n{len(EVAL_CASES) - failed}/{len(EVAL_CASES)} retrieval checks passed")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
