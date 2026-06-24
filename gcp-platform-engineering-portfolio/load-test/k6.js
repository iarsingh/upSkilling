import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "1m", target: 20 },
    { duration: "3m", target: 100 },
    { duration: "2m", target: 200 },
    { duration: "2m", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<500"],
  },
};

const baseUrl = __ENV.BASE_URL || "http://localhost:8080";

export default function () {
  const response = http.post(
    `${baseUrl}/predict`,
    JSON.stringify({ customer_id: `load-${__VU}`, score: __ITER }),
    { headers: { "Content-Type": "application/json" } },
  );

  check(response, {
    "status is 200": (result) => result.status === 200,
    "prediction is present": (result) => result.json("prediction") !== undefined,
  });
  sleep(0.2);
}
