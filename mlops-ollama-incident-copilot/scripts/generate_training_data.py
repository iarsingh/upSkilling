from pathlib import Path

import numpy as np
import pandas as pd


def main() -> None:
    rng = np.random.default_rng(42)
    rows = 5_000
    cpu = rng.beta(2.2, 2.0, rows) * 100
    memory = rng.beta(2.0, 2.4, rows) * 100
    request_rate = rng.gamma(8, 90, rows)
    error_rate = np.clip(rng.beta(0.9, 18, rows) + (cpu > 82) * rng.uniform(0.01, 0.12, rows), 0, 1)
    latency_ms = rng.gamma(5, 45, rows) + error_rate * 900 + (memory > 85) * rng.uniform(80, 420, rows)
    pod_restarts = rng.poisson(0.7 + (memory > 88) * 2.2 + (error_rate > 0.08) * 1.4, rows)
    deploy_age_minutes = rng.exponential(420, rows)
    queue_depth = rng.poisson(18 + request_rate / 110 + (latency_ms > 500) * 24, rows)

    risk_score = (
        0.030 * cpu
        + 0.025 * memory
        + 6.2 * error_rate
        + 0.0038 * latency_ms
        + 0.22 * pod_restarts
        + 0.009 * queue_depth
        - 0.0010 * deploy_age_minutes
        - 5.3
        + rng.normal(0, 0.8, rows)
    )
    probability = 1 / (1 + np.exp(-risk_score))
    incident = rng.binomial(1, probability)

    frame = pd.DataFrame(
        {
            "cpu_utilization": cpu.round(2),
            "memory_utilization": memory.round(2),
            "request_rate": request_rate.round(2),
            "error_rate": error_rate.round(4),
            "latency_ms": latency_ms.round(2),
            "pod_restarts": pod_restarts,
            "deploy_age_minutes": deploy_age_minutes.round(2),
            "queue_depth": queue_depth,
            "incident": incident,
        }
    )
    output = Path("data/raw/incidents.csv")
    output.parent.mkdir(parents=True, exist_ok=True)
    frame.to_csv(output, index=False)
    print(f"Wrote {len(frame)} rows to {output}")


if __name__ == "__main__":
    main()
