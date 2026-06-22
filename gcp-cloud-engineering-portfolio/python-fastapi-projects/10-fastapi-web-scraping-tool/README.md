# Project 10: FastAPI Web Scraping Tool

## Skill
FastAPI APIs, async HTTP clients, BeautifulSoup parsing, URL validation, basic SSRF protection, Docker, and Cloud Run deployment.

## What It Does
- `GET /healthz`: health check for local, Docker, or Cloud Run.
- `POST /scrape`: fetches a public HTML page and returns title, description, headings, links, optional images, text preview, and word count.
- Blocks private/internal targets by default. Set `ALLOW_PRIVATE_SCRAPE=true` only for trusted local testing.

## Run Locally

```sh
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Open:

- `http://127.0.0.1:8000/docs`
- `http://127.0.0.1:8000/healthz`

## Example Request

```sh
curl -X POST http://127.0.0.1:8000/scrape \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "include_images": true,
    "max_links": 10,
    "max_preview_chars": 800
  }'
```

## Test

```sh
pytest -q
```

## Docker

```sh
docker build -t fastapi-web-scraper .
docker run -p 8080:8080 fastapi-web-scraper
```

## Deploy With Cloud Build

```sh
gcloud builds submit --config cloudbuild.yaml
```

## Interview Talking Points
- Why async `httpx.AsyncClient` is useful for IO-heavy scraping.
- Why user-provided URLs need validation to reduce SSRF risk.
- How the API limits response size, timeout, number of links, and preview length.
- How to deploy the same app to Cloud Run using Docker and Cloud Build.
