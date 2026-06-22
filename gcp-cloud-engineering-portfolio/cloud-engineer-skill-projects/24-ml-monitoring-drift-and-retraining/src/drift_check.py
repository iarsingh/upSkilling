import json
import math
import sys
from pathlib import Path


def population_stability_index(expected: list[float], actual: list[float]) -> float:
    if len(expected) != len(actual):
        raise ValueError("expected and actual distributions must have the same bins")
    total = 0.0
    for exp, act in zip(expected, actual):
        exp = max(exp, 0.0001)
        act = max(act, 0.0001)
        total += (act - exp) * math.log(act / exp)
    return total


if __name__ == "__main__":
    payload = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    psi = population_stability_index(payload["expected"], payload["actual"])
    result = {"psi": psi, "drift_detected": psi > payload.get("threshold", 0.2)}
    print(json.dumps(result, indent=2))
    raise SystemExit(1 if result["drift_detected"] else 0)

