# Docker Cloud Run Project

## Goal

Practice a GitHub Actions workflow that builds a Docker image and deploys it to Cloud Run.

## Local Run

```bash
docker build -t github-actions-cloud-run-demo .
docker run --rm -p 8080:8080 github-actions-cloud-run-demo
```

Open:

```text
http://localhost:8080
```

