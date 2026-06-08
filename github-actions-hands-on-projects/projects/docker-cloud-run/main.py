import json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer


class Handler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        payload = {
            "service": "github-actions-cloud-run-demo",
            "status": "healthy",
            "path": self.path,
        }
        body = json.dumps(payload).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


if __name__ == "__main__":
    port = int(os.getenv("PORT", "8080"))
    HTTPServer(("0.0.0.0", port), Handler).serve_forever()

