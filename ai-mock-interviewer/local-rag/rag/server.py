"""Small local page for asking the indexed runbooks."""

from __future__ import annotations

import html
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

from rag.answer import answer_question
from rag.cli import DB_PATH
from rag.store import load_chunks

PAGE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Runbook RAG</title>
  <style>
    :root {{ color-scheme: light; }}
    body {{ margin: 0; font: 16px/1.5 "Iowan Old Style", Palatino, Georgia, serif; background: #f4f1ea; color: #1c1915; }}
    main {{ max-width: 740px; margin: 0 auto; padding: 48px 20px 80px; }}
    h1 {{ font-weight: 600; font-size: 2rem; margin: 0 0 8px; }}
    p.lead {{ margin: 0 0 28px; color: #4a453c; }}
    form {{ display: flex; gap: 8px; }}
    input {{ flex: 1; font: inherit; padding: 10px 12px; border: 1px solid #c9c1b4; border-radius: 8px; background: #fff; }}
    button {{ font: inherit; padding: 10px 16px; border: 0; border-radius: 8px; background: #1f3d32; color: #f4f1ea; cursor: pointer; }}
    article {{ margin-top: 32px; }}
    .answer {{ white-space: pre-wrap; background: #fff; border: 1px solid #e2dcd1; border-radius: 10px; padding: 16px 18px; }}
    h2 {{ font-size: 1rem; letter-spacing: 0.04em; text-transform: uppercase; margin: 28px 0 10px; }}
    ol {{ margin: 0; padding: 0; list-style: none; }}
    li {{ background: #fff; border: 1px solid #e2dcd1; border-radius: 10px; padding: 12px 14px; margin: 0 0 10px; }}
    .meta {{ color: #5c564c; font-size: 0.92rem; }}
  </style>
</head>
<body>
  <main>
    <h1>Runbook RAG</h1>
    <p class="lead">Questions are answered from the local runbook index. Sources are the passages that were retrieved, not titles written by the model.</p>
    <form method="get" action="/">
      <input name="q" value="{query}" placeholder="Ask about a runbook, error code, or procedure" autofocus>
      <button type="submit">Ask</button>
    </form>
    {body}
  </main>
</body>
</html>
"""


def render(question: str) -> str:
    if not question.strip():
        return PAGE.format(query="", body="")
    result = answer_question(question, load_chunks(DB_PATH))
    parts = [
        "<article>",
        f"<h2>Answer</h2><div class=\"answer\">{html.escape(result.text)}</div>",
    ]
    if result.sources:
        heading = "Retrieved passages" if result.abstained else "Sources"
        parts.append(f"<h2>{heading}</h2><ol>")
        for index, hit in enumerate(result.sources, start=1):
            chunk = hit.chunk
            parts.append(
                "<li>"
                f"<strong>[{index}] {html.escape(chunk.title)}</strong>"
                f"<div class=\"meta\">{html.escape(chunk.heading)} · {html.escape(chunk.source)}"
                f" · cosine {hit.vector_score:.3f}</div>"
                f"<p>{html.escape(chunk.text)}</p>"
                "</li>"
            )
        parts.append("</ol>")
    elif result.nearest:
        parts.append("<h2>Nearest passages, not used</h2><ol>")
        for hit in result.nearest:
            chunk = hit.chunk
            parts.append(
                "<li>"
                f"<strong>{html.escape(chunk.title)}</strong>"
                f"<div class=\"meta\">{html.escape(chunk.source)} · cosine {hit.vector_score:.3f}</div>"
                "</li>"
            )
        parts.append("</ol>")
    parts.append("</article>")
    return PAGE.format(query=html.escape(question, quote=True), body="".join(parts))


class Handler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:  # noqa: N802
        parsed = urlparse(self.path)
        if parsed.path != "/":
            self.send_error(404)
            return
        question = parse_qs(parsed.query).get("q", [""])[0]
        try:
            page = render(question).encode("utf-8")
        except Exception as exc:  # show the failure on the page instead of a blank 500
            page = PAGE.format(
                query=html.escape(question, quote=True),
                body=f"<article><h2>Error</h2><div class=\"answer\">{html.escape(str(exc))}</div></article>",
            ).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(page)))
        self.end_headers()
        self.wfile.write(page)

    def log_message(self, fmt: str, *args) -> None:
        print(f"[rag] {self.address_string()} {fmt % args}")


def serve(port: int) -> None:
    server = ThreadingHTTPServer(("127.0.0.1", port), Handler)
    print(f"Runbook RAG at http://127.0.0.1:{port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
    finally:
        server.server_close()
