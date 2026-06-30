# FastAPI Local App

## Run locally

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Open:

- API: http://127.0.0.1:8000
- Docs: http://127.0.0.1:8000/docs
- Health: http://127.0.0.1:8000/health

For auto-reload during development, run:

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```
