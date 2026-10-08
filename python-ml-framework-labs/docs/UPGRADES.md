# Local run and upgrades

This folder is a laptop lab. It does not provision GCP, GKE, or a customer tenant.

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
pytest -q
python -m ml_labs numpy
python -m ml_labs quality
python -m ml_labs train
python -m ml_labs serve
```

Docker (loopback publish only):

```bash
docker compose up --build
curl -s http://127.0.0.1:8080/healthz
```

Useful next steps that are **not** implemented here:

- Pin the joblib artifact by content hash in the serving process, not mtime.
- Add authentication and request timeouts before exposing a port beyond loopback.
- Replace PSI-only drift with a labeled evaluation window before any retrain.
- Keep production apply refused until a separate promotion path exists.
