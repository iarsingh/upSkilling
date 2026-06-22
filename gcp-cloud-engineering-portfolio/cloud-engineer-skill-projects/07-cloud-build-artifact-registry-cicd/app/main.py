from flask import Flask, jsonify

app = Flask(__name__)


@app.get("/")
def index():
    return jsonify(service="cicd-demo", status="ok")


@app.get("/healthz")
def healthz():
    return jsonify(status="healthy")

