FROM node:24-bookworm-slim AS frontend
WORKDIR /ui
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM python:3.13-slim-bookworm AS build
COPY --from=ghcr.io/astral-sh/uv:0.12.18 /uv /usr/local/bin/uv
WORKDIR /app
COPY pyproject.toml uv.lock ./
COPY src/ src/
RUN uv sync --frozen --no-dev --no-editable
COPY data/ data/
# This first release contains a synthetic demo baseline. Real releases should
# download an approved immutable MLflow artifact and verify its provenance.
RUN .venv/bin/incident-train

FROM python:3.13-slim-bookworm AS runtime
ENV PATH="/app/.venv/bin:$PATH" PYTHONUNBUFFERED=1 PYTHONDONTWRITEBYTECODE=1 HOME=/tmp
WORKDIR /app
RUN groupadd --gid 10001 app && useradd --uid 10001 --gid app --no-create-home app \
    && mkdir -p /mlartifacts && chown app:app /mlartifacts
COPY --from=build --chown=app:app /app/.venv .venv
COPY --from=build --chown=app:app /app/artifacts artifacts
COPY --from=frontend --chown=app:app /ui/dist frontend/dist
COPY --chown=app:app migrations/ migrations/
COPY --chown=app:app data/ data/
COPY --chown=app:app alembic.ini ./
USER 10001:10001
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/health/ready',timeout=3)"
CMD ["uvicorn", "incident_ops.main:app", "--host", "0.0.0.0", "--port", "8000", "--no-access-log"]
