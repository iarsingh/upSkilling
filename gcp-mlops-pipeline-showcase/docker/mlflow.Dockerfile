FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN pip install --no-cache-dir \
    google-cloud-storage>=2.18.0 \
    mlflow==2.17.2 \
    psycopg2-binary>=2.9.10

RUN useradd --create-home --uid 10001 mlflow
USER 10001

EXPOSE 5000
CMD ["mlflow", "server", "--host=0.0.0.0", "--port=5000"]
