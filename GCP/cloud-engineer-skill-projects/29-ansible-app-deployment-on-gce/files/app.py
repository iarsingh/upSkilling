from flask import Flask, jsonify

app = Flask(__name__)


@app.get("/healthz")
def healthz():
    return jsonify(status="healthy")


@app.get("/")
def index():
    return jsonify(service="ansible-gce-webapp")

