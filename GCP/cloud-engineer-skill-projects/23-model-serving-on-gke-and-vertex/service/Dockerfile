FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY main.py .
USER 65532:65532
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "main:app"]

