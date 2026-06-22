FROM golang:1.22-alpine AS build

WORKDIR /app
COPY go.mod ./
RUN go mod download
COPY main.go ./
RUN go build -o /pubsub-event-worker .

FROM alpine:3.20

WORKDIR /
COPY --from=build /pubsub-event-worker /pubsub-event-worker

CMD ["/pubsub-event-worker"]

