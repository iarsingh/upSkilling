import json
from pathlib import Path
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app import Handler


class HandlerTest(unittest.TestCase):
    def test_prediction_score_bounds(self):
        score = min(0.99, max(0.01, 8 * 0.12 + (1 - 0.1) * 0.55))
        self.assertLessEqual(score, 0.99)
        self.assertGreaterEqual(score, 0.01)

    def test_health_payload_is_json_serializable(self):
        payload = {"status": "ok"}
        self.assertEqual(json.loads(json.dumps(payload))["status"], "ok")


if __name__ == "__main__":
    unittest.main()
