import logging
import time

from flask import Flask, jsonify, request

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)


@app.before_request
def start_timer():
    request.start_time = time.time()


@app.after_request
def log_request(response):
    latency_ms = round((time.time() - request.start_time) * 1000, 2)
    logging.info(
        "request",
        extra={
            "path": request.path,
            "method": request.method,
            "status": response.status_code,
            "latency_ms": latency_ms,
        },
    )
    return response


@app.get("/")
def index():
    return jsonify(status="ok")

