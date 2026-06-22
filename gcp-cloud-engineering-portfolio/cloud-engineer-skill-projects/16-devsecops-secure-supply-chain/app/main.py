from flask import Flask, jsonify

app = Flask(__name__)


@app.get("/")
def index():
    return jsonify(service="secure-supply-chain", status="ok")

