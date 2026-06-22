FROM python:3.12-slim
WORKDIR /trainer
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY train.py .
ENTRYPOINT ["python", "train.py"]

