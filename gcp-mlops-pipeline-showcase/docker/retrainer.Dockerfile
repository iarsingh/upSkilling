FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /workspace
COPY pyproject.toml .
RUN pip install --no-cache-dir .
COPY src ./src

RUN useradd --create-home --uid 10001 appuser
USER 10001

EXPOSE 8080
CMD ["uvicorn", "src.retrainer.app:app", "--host", "0.0.0.0", "--port", "8080"]
