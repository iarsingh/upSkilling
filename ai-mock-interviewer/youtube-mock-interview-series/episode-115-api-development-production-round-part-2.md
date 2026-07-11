# Episode 115: API Development Production Round - Part 2

YouTube title: DevOps Mock Interview Practice | Episode 115: API Development Production Round - Part 2

Estimated duration: 18-23 min

Source round: Mock Interview 75 - API Development Production Round (source set 75)

Focus: API fundamentals, REST design, authentication, authorization, database access, error handling, versioning, testing, observability, security, performance, and production troubleshooting

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing API Development Production Round - Part 2.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- API: Application Programming Interface
- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- HTTPS: Hypertext Transfer Protocol Secure
- REST: Representational State Transfer

---

## Question 1

Interviewer:
How does an API read and write data to a database?

Pause the video and answer this question aloud.

Senior Associate answer:
The API receives a request, validates it, authenticates and authorizes the caller, then calls a service or repository layer to interact with the database. For reads, it queries data, maps it to a response model, and returns it. For writes, it validates business rules, starts a transaction if needed, writes data, commits, and returns a response. In production, I use connection pooling, parameterized queries or ORM protections, migrations, indexes, timeouts, and clear transaction boundaries.

Senior answer structure:
Use this structure: API contract -> validation/auth -> business logic/data layer -> error handling -> testing and observability.

Scenario-based practice:
Scenario practice: Imagine this API is serving real users and starts failing under load. Explain how you would validate the contract, debug logs/traces, protect data, and scale it for: How does an API read and write data to a database?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 2

Interviewer:
How do you handle database transactions in API development?

Pause the video and answer this question aloud.

Senior Associate answer:
A transaction groups related database changes so they either all succeed or all roll back. For example, when creating an order and reducing inventory, both changes should be committed together or not at all. In API code, I keep transactions short, avoid long external calls inside transactions, handle rollback on exceptions, and design idempotency for retry scenarios. For distributed systems, I avoid pretending one database transaction can cover every external service; instead I use outbox patterns, queues, or compensating actions.

Senior answer structure:
Use this structure: API contract -> validation/auth -> business logic/data layer -> error handling -> testing and observability.

Scenario-based practice:
Scenario practice: Imagine this API is serving real users and starts failing under load. Explain how you would validate the contract, debug logs/traces, protect data, and scale it for: How do you handle database transactions in API development?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 3

Interviewer:
How should an API handle errors and return error responses?

Pause the video and answer this question aloud.

Senior Associate answer:
An API should return consistent error responses with status code, error code, message, and optional correlation ID. Validation errors should tell the client what field is wrong. Authentication and authorization errors should be clear but not leak sensitive details. Server errors should not expose stack traces. Internally, the API should log enough context for debugging, including trace ID, route, status, dependency, and exception type. Good error handling improves both client experience and incident response.

Senior answer structure:
Use this structure: API contract -> validation/auth -> business logic/data layer -> error handling -> testing and observability.

Scenario-based practice:
Scenario practice: Imagine this API is serving real users and starts failing under load. Explain how you would validate the contract, debug logs/traces, protect data, and scale it for: How should an API handle errors and return error responses?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 4

Interviewer:
How do you handle API versioning without breaking existing clients?

Pause the video and answer this question aloud.

Senior Associate answer:
I avoid breaking changes where possible. For breaking changes, I use versioning such as /v1 and /v2 paths, headers, or media types depending on the platform standard. I keep old versions running during a deprecation window, communicate migration timelines, and monitor usage by client. Additive changes like adding optional fields are usually safe. Removing fields, changing meaning, changing required fields, or changing status codes can break clients, so those require versioning and coordination.

Senior answer structure:
Use this structure: API contract -> validation/auth -> business logic/data layer -> error handling -> testing and observability.

Scenario-based practice:
Scenario practice: Imagine this API is serving real users and starts failing under load. Explain how you would validate the contract, debug logs/traces, protect data, and scale it for: How do you handle API versioning without breaking existing clients?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 5

Interviewer:
How would you implement pagination, filtering, and sorting in an API?

Pause the video and answer this question aloud.

Senior Associate answer:
For pagination, I can use limit and offset for simple cases, but cursor-based pagination is better for large or frequently changing datasets. Filtering should allow approved fields only, such as status, date range, owner, or region. Sorting should also whitelist allowed fields to avoid unsafe queries. I would define max page size, return metadata such as next cursor, and ensure database indexes support common filter and sort patterns.

Senior answer structure:
Use this structure: API contract -> validation/auth -> business logic/data layer -> error handling -> testing and observability.

Scenario-based practice:
Scenario practice: Imagine this API is serving real users and starts failing under load. Explain how you would validate the contract, debug logs/traces, protect data, and scale it for: How would you implement pagination, filtering, and sorting in an API?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 6

Interviewer:
What is idempotency in APIs and why is it important?

Pause the video and answer this question aloud.

Senior Associate answer:
Idempotency means repeating the same request produces the same result without duplicate side effects. GET, PUT, and DELETE are generally expected to be idempotent. POST is not automatically idempotent, so for payment, order, or automation-trigger APIs, I would use an idempotency key. This matters because clients retry after timeouts, networks fail, and gateways can resend requests. Without idempotency, retries can create duplicate orders, duplicate jobs, or unsafe repeated actions.

Senior answer structure:
Use this structure: API contract -> validation/auth -> business logic/data layer -> error handling -> testing and observability.

Scenario-based practice:
Scenario practice: Imagine this API is serving real users and starts failing under load. Explain how you would validate the contract, debug logs/traces, protect data, and scale it for: What is idempotency in APIs and why is it important?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 7

Interviewer:
How would you implement rate limiting and throttling for APIs?

Pause the video and answer this question aloud.

Senior Associate answer:
I would usually implement rate limiting at the API gateway, ingress, load balancer, or service mesh layer, and sometimes in the application for tenant-specific rules. Common strategies include fixed window, sliding window, token bucket, and leaky bucket. I would return 429 when limits are exceeded and include retry information where appropriate. Rate limiting protects the API from abuse, runaway clients, and noisy tenants, but limits should be based on real capacity and business needs.

Senior answer structure:
Use this structure: API contract -> validation/auth -> business logic/data layer -> error handling -> testing and observability.

Scenario-based practice:
Scenario practice: Imagine this API is serving real users and starts failing under load. Explain how you would validate the contract, debug logs/traces, protect data, and scale it for: How would you implement rate limiting and throttling for APIs?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 8

Interviewer:
What API security best practices would you follow in production?

Pause the video and answer this question aloud.

Senior Associate answer:
I would enforce HTTPS, strong authentication, authorization, input validation, output encoding where needed, rate limiting, secure CORS, safe error responses, dependency scanning, secret management, audit logging, and least-privilege access to databases and cloud services. I would also protect against common risks such as broken access control, injection, excessive data exposure, SSRF, insecure direct object references, and sensitive data in logs. Security should be handled at both gateway and application layers.

Senior answer structure:
Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.

Scenario-based practice:
Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: What API security best practices would you follow in production?

What interviewer checks:
They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.

---

## Question 9

Interviewer:
How would you test APIs before releasing them to production?

Pause the video and answer this question aloud.

Senior Associate answer:
I would test APIs at multiple levels: unit tests for business logic, integration tests with database or dependencies, contract tests for request/response compatibility, authentication and authorization tests, validation tests, negative tests, performance/load tests, and security checks. I would also test migration compatibility and rollback behavior. In CI/CD, tests should run automatically on pull requests, and production deployments should include smoke tests and health checks.

Senior answer structure:
Use this structure: API contract -> validation/auth -> business logic/data layer -> error handling -> testing and observability.

Scenario-based practice:
Scenario practice: Imagine this API is serving real users and starts failing under load. Explain how you would validate the contract, debug logs/traces, protect data, and scale it for: How would you test APIs before releasing them to production?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Closing

That completes Episode 115: API Development Production Round - Part 2.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
