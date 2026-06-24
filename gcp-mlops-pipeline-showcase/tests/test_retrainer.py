import base64
import json

import pytest

from src.retrainer.app import decode_pubsub_envelope


def test_decode_pubsub_envelope() -> None:
    payload = {"reason": "feature_drift", "max_psi": 0.42}
    encoded = base64.b64encode(json.dumps(payload).encode()).decode()
    assert decode_pubsub_envelope({"message": {"data": encoded}}) == payload


def test_decode_pubsub_envelope_rejects_missing_data() -> None:
    with pytest.raises(ValueError):
        decode_pubsub_envelope({"message": {}})
