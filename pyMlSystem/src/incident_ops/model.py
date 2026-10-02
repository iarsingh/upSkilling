import hashlib
import json
from pathlib import Path

import joblib

TEAMS = {
    "database": "Database Reliability",
    "kubernetes": "Platform Engineering",
    "network": "Network Operations",
    "application": "Application Engineering",
    "security": "Security Operations",
}


class Classifier:
    def __init__(self, path: Path):
        metadata = json.loads(path.with_suffix(".json").read_text())
        if hashlib.sha256(path.read_bytes()).hexdigest() != metadata["sha256"]:
            raise ValueError("Model checksum mismatch")
        # Only load artifacts produced by our trusted training/build pipeline.
        self.pipeline = joblib.load(path)
        self.version = metadata["version"]

    def predict(self, text: str, threshold: float) -> dict:
        probabilities = self.pipeline.predict_proba([text])[0]
        index = int(probabilities.argmax())
        category = str(self.pipeline.classes_[index])
        confidence = float(probabilities[index])
        unknown_words = self.pipeline.named_steps["tfidf"].transform([text]).nnz == 0
        review = unknown_words or confidence < threshold
        return {
            "category": category,
            "team": "Human triage" if review else TEAMS[category],
            "confidence": round(confidence, 4),
            "needs_review": review,
            "model_version": self.version,
        }
