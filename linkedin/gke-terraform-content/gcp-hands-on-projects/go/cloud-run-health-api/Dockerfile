FROM golang:1.22-alpine AS build

WORKDIR /app
COPY go.mod ./
COPY main.go ./
RUN go build -o /cloud-run-health-api .

FROM alpine:3.20

WORKDIR /
COPY --from=build /cloud-run-health-api /cloud-run-health-api
ENV PORT=8080
EXPOSE 8080

CMD ["/cloud-run-health-api"]

