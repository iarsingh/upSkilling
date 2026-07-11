# Builds the interview-quiz-app (Flet) as a container image.
# Build context must be the interview-quiz-app repo, e.g.:
#   docker build -f services/quiz-web/Dockerfile -t quiz-web:local ../../interview-quiz-app
FROM python:3.12-slim

WORKDIR /srv

RUN adduser --system --no-create-home --uid 10001 appuser

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
RUN chown -R appuser:nogroup /srv
USER appuser

EXPOSE 8080

CMD ["uvicorn", "asgi:app", "--host", "0.0.0.0", "--port", "8080"]
