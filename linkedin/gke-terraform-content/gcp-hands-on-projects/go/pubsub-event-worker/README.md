# Go Project: Pub/Sub Event Worker

## Goal

Build a Go worker that reads messages from a Pub/Sub subscription and logs structured event data.

## GCP Services

- Pub/Sub
- Cloud Run Jobs or Compute Engine
- Cloud Logging

## Create Pub/Sub Resources

```bash
PROJECT_ID="YOUR_PROJECT_ID"
TOPIC="orders-events"
SUBSCRIPTION="orders-events-worker"

gcloud pubsub topics create "$TOPIC"
gcloud pubsub subscriptions create "$SUBSCRIPTION" --topic "$TOPIC"
```

Publish a test message:

```bash
gcloud pubsub topics publish orders-events \
  --message='{"order_id":"1001","status":"paid","amount":99.50}'
```

## Local Run

```bash
export PROJECT_ID="YOUR_PROJECT_ID"
export SUBSCRIPTION_ID="orders-events-worker"
go run .
```

## Docker Run

```bash
docker build -t pubsub-event-worker .
docker run --rm \
  -e PROJECT_ID="$PROJECT_ID" \
  -e SUBSCRIPTION_ID="$SUBSCRIPTION_ID" \
  pubsub-event-worker
```

## Interview Talking Points

- Event-driven architecture
- Pub/Sub topic vs subscription
- At-least-once delivery
- Message acknowledgement
- Dead-letter topics and retry strategy

