import os

from flask import Flask, jsonify, request

app = Flask(__name__)


@app.get("/healthz")
def healthz():
    return jsonify(status="healthy")


@app.post("/predict")
def predict():
    payload = request.get_json(force=True)
    features = payload.get("features", [])
    score = sum(float(value) for value in features) / max(len(features), 1)
    threshold = float(os.getenv("THRESHOLD", "0.5"))
    return jsonify(score=score, prediction=int(score >= threshold))

