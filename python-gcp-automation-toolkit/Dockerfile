FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app
COPY pyproject.toml .
COPY src ./src
RUN pip install --no-cache-dir .

RUN useradd --create-home --uid 10001 toolkit
USER 10001

EXPOSE 8080
CMD ["uvicorn", "gcp_ops_toolkit.api:app", "--host", "0.0.0.0", "--port", "8080"]
