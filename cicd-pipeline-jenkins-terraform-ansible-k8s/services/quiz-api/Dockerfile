FROM python:3.12-slim

WORKDIR /srv

RUN adduser --system --no-create-home --uid 10001 appuser

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

RUN mkdir -p /data && chown appuser:nogroup /data
USER appuser

EXPOSE 8000
ENV QUIZ_API_DB_PATH=/data/reviews.db

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
