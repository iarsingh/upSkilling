# Python Project: GCS CSV ETL

## Goal

Read a CSV file from Cloud Storage, clean the rows, and write a processed CSV back to Cloud Storage.

## GCP Services

- Cloud Storage
- Cloud Run Jobs or Cloud Scheduler
- Cloud Logging

## Input CSV Example

```csv
user_id,name,score
1,Akhilesh,92
2,Rahul,78
3,Neha,88
```

## Local Run

```bash
pip install -r requirements.txt

export INPUT_BUCKET="YOUR_BUCKET"
export INPUT_BLOB="input/users.csv"
export OUTPUT_BUCKET="YOUR_BUCKET"
export OUTPUT_BLOB="output/users_clean.csv"

python main.py
```

## Docker Run

```bash
docker build -t gcs-csv-etl .
docker run --rm \
  -e INPUT_BUCKET="$INPUT_BUCKET" \
  -e INPUT_BLOB="$INPUT_BLOB" \
  -e OUTPUT_BUCKET="$OUTPUT_BUCKET" \
  -e OUTPUT_BLOB="$OUTPUT_BLOB" \
  gcs-csv-etl
```

## Interview Talking Points

- Cloud Storage object layout
- Batch ETL design
- Service account permissions
- Idempotent job design
- Cloud Run Jobs vs always-running service

