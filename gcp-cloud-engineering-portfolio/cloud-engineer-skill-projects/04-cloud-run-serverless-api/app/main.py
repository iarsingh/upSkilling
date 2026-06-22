import os
from datetime import datetime, timezone

from flask import Flask, jsonify

app = Flask(__name__)


@app.get("/")
def index():
    return jsonify(
        service="cloud-run-serverless-api",
        env=os.getenv("APP_ENV", "dev"),
        status="ok",
        timestamp=datetime.now(timezone.utc).isoformat(),
    )


@app.get("/healthz")
def healthz():
    return jsonify(status="healthy")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "8080")))

