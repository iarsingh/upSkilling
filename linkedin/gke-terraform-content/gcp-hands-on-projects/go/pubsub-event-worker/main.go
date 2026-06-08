package main

import (
	"context"
	"encoding/json"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"cloud.google.com/go/pubsub"
)

type orderEvent struct {
	OrderID string  `json:"order_id"`
	Status  string  `json:"status"`
	Amount  float64 `json:"amount"`
}

func main() {
	projectID := requiredEnv("PROJECT_ID")
	subscriptionID := requiredEnv("SUBSCRIPTION_ID")

	ctx, cancel := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer cancel()

	client, err := pubsub.NewClient(ctx, projectID)
	if err != nil {
		log.Fatalf("failed to create pubsub client: %v", err)
	}
	defer client.Close()

	subscription := client.Subscription(subscriptionID)
	subscription.ReceiveSettings.MaxOutstandingMessages = 10

	log.Printf("listening project=%s subscription=%s", projectID, subscriptionID)

	err = subscription.Receive(ctx, func(ctx context.Context, msg *pubsub.Message) {
		start := time.Now()
		var event orderEvent
		if err := json.Unmarshal(msg.Data, &event); err != nil {
			log.Printf("invalid message id=%s error=%v payload=%s", msg.ID, err, string(msg.Data))
			msg.Nack()
			return
		}

		log.Printf(
			"processed message_id=%s order_id=%s status=%s amount=%.2f duration_ms=%d",
			msg.ID,
			event.OrderID,
			event.Status,
			event.Amount,
			time.Since(start).Milliseconds(),
		)

		msg.Ack()
	})
	if err != nil {
		log.Fatalf("receiver stopped: %v", err)
	}
}

func requiredEnv(key string) string {
	value := os.Getenv(key)
	if value == "" {
		log.Fatalf("missing required env var: %s", key)
	}
	return value
}
