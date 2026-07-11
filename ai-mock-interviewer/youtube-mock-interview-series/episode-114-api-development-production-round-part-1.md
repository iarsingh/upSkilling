# Episode 114: API Development Production Round - Part 1

YouTube title: DevOps Mock Interview Practice | Episode 114: API Development Production Round - Part 1

Estimated duration: 20-25 min

Source round: Mock Interview 75 - API Development Production Round (source set 75)

Focus: API fundamentals, REST design, authentication, authorization, database access, error handling, versioning, testing, observability, security, performance, and production troubleshooting

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing API Development Production Round - Part 1.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- API: Application Programming Interface
- gRPC: Google Remote Procedure Call
- HTTP: Hypertext Transfer Protocol
- HTTPS: Hypertext Transfer Protocol Secure
- JWT: JSON Web Token
- mTLS: Mutual Transport Layer Security
- OIDC: OpenID Connect
- REST: Representational State Transfer

---

## Question 1

Interviewer:
What is an API and why do we use APIs in modern applications?

Pause the video and answer this question aloud.

Senior Associate answer:
An API, or Application Programming Interface, is a contract that allows one software system to interact with another. In modern applications, APIs separate frontend, backend, mobile apps, automation tools, and third-party integrations. A good API hides internal implementation details and exposes controlled operations with clear request and response formats, authentication, authorization, validation, error handling, and documentation. In production, APIs also need observability, versioning, rate limiting, and security controls.

Senior answer structure:
Use this structure: API contract -> validation/auth -> business logic/data layer -> error handling -> testing and observability.

Scenario-based practice:
Scenario practice: Imagine this API is serving real users and starts failing under load. Explain how you would validate the contract, debug logs/traces, protect data, and scale it for: What is an API and why do we use APIs in modern applications?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 2

Interviewer:
What is the difference between REST API, GraphQL, and gRPC?

Pause the video and answer this question aloud.

Senior Associate answer:
REST is resource-oriented and commonly uses HTTP methods like GET, POST, PUT, PATCH, and DELETE with JSON responses. It is simple and widely used. GraphQL lets clients request exactly the fields they need through a schema, which can reduce over-fetching but adds complexity around authorization, caching, and query cost control. gRPC uses Protocol Buffers and HTTP/2, making it efficient for service-to-service communication, streaming, and strongly typed contracts. For public or general web APIs I often choose REST; for flexible frontend data fetching GraphQL can help; for internal high-performance microservice calls gRPC is strong.

Senior answer structure:
Use this structure: API contract -> validation/auth -> business logic/data layer -> error handling -> testing and observability.

Scenario-based practice:
Scenario practice: Imagine this API is serving real users and starts failing under load. Explain how you would validate the contract, debug logs/traces, protect data, and scale it for: What is the difference between REST API, GraphQL, and gRPC?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 3

Interviewer:
How would you design REST endpoints for a user or order management service?

Pause the video and answer this question aloud.

Senior Associate answer:
I would model endpoints around resources and keep naming consistent. For example, GET /users lists users, POST /users creates a user, GET /users/{id} fetches one user, PATCH /users/{id} partially updates a user, and DELETE /users/{id} deletes or deactivates a user. For orders, I might use GET /orders, POST /orders, GET /orders/{id}, and GET /users/{id}/orders if the relationship matters. I would define request and response schemas, status codes, validation rules, pagination, filtering, authorization, and error response format before implementation.

Senior answer structure:
Use this structure: API contract -> validation/auth -> business logic/data layer -> error handling -> testing and observability.

Scenario-based practice:
Scenario practice: Imagine this API is serving real users and starts failing under load. Explain how you would validate the contract, debug logs/traces, protect data, and scale it for: How would you design REST endpoints for a user or order management service?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 4

Interviewer:
What are common HTTP methods and when would you use GET, POST, PUT, PATCH, and DELETE?

Pause the video and answer this question aloud.

Senior Associate answer:
GET is used to read data and should not change server state. POST is used to create a resource or trigger an operation. PUT usually replaces an entire resource and should be idempotent. PATCH updates part of a resource. DELETE removes or deactivates a resource. In senior API design, the method should match the behavior because clients, caches, gateways, and monitoring tools rely on HTTP semantics.

Senior answer structure:
Use this structure: API contract -> validation/auth -> business logic/data layer -> error handling -> testing and observability.

Scenario-based practice:
Scenario practice: Imagine this API is serving real users and starts failing under load. Explain how you would validate the contract, debug logs/traces, protect data, and scale it for: What are common HTTP methods and when would you use GET, POST, PUT, PATCH, and DELETE?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 5

Interviewer:
What are important HTTP status codes every API developer should know?

Pause the video and answer this question aloud.

Senior Associate answer:
Important status codes include 200 for successful read or update, 201 for created, 202 for accepted async processing, 204 for success with no response body, 400 for invalid request, 401 for unauthenticated, 403 for authenticated but not authorized, 404 for not found, 409 for conflict, 422 for validation errors, 429 for rate limiting, 500 for unexpected server error, 502 or 503 for upstream/service availability issues, and 504 for gateway timeout. Good APIs use status codes consistently and include a useful error body.

Senior answer structure:
Use this structure: API contract -> validation/auth -> business logic/data layer -> error handling -> testing and observability.

Scenario-based practice:
Scenario practice: Imagine this API is serving real users and starts failing under load. Explain how you would validate the contract, debug logs/traces, protect data, and scale it for: What are important HTTP status codes every API developer should know?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 6

Interviewer:
How do you validate API request payloads and query parameters?

Pause the video and answer this question aloud.

Senior Associate answer:
I validate request payloads using schema models, type checks, required fields, allowed values, size limits, format checks, and business rules. In FastAPI this is commonly done with Pydantic models. In other frameworks, similar validation libraries exist. I validate query parameters for pagination limits, sorting fields, filters, and date ranges. Validation should happen before business logic, and validation errors should return a consistent 400 or 422 response without exposing internal details.

Senior answer structure:
Use this structure: API contract -> validation/auth -> business logic/data layer -> error handling -> testing and observability.

Scenario-based practice:
Scenario practice: Imagine this API is serving real users and starts failing under load. Explain how you would validate the contract, debug logs/traces, protect data, and scale it for: How do you validate API request payloads and query parameters?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 7

Interviewer:
How do you implement authentication in an API?

Pause the video and answer this question aloud.

Senior Associate answer:
Authentication verifies who the caller is. Depending on the use case, I would use OAuth2/OIDC with an identity provider, JWT bearer tokens, session cookies for web apps, API keys for service integrations, or mTLS for service-to-service authentication. In production, I prefer short-lived tokens, token validation at the gateway or service layer, secure secret storage, HTTPS, proper token audience and issuer checks, and careful logging so tokens are never exposed.

Senior answer structure:
Use this structure: API contract -> validation/auth -> business logic/data layer -> error handling -> testing and observability.

Scenario-based practice:
Scenario practice: Imagine this API is serving real users and starts failing under load. Explain how you would validate the contract, debug logs/traces, protect data, and scale it for: How do you implement authentication in an API?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 8

Interviewer:
What is the difference between authentication and authorization?

Pause the video and answer this question aloud.

Senior Associate answer:
Authentication answers: who are you? Authorization answers: what are you allowed to do? For example, a user may authenticate successfully with a valid token, but still not be authorized to delete a production resource. In API design, I first validate identity, then check roles, scopes, groups, tenant ownership, or resource-level permissions before allowing the operation.

Senior answer structure:
Use this structure: API contract -> validation/auth -> business logic/data layer -> error handling -> testing and observability.

Scenario-based practice:
Scenario practice: Imagine this API is serving real users and starts failing under load. Explain how you would validate the contract, debug logs/traces, protect data, and scale it for: What is the difference between authentication and authorization?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 9

Interviewer:
How do JWT tokens work in API authentication?

Pause the video and answer this question aloud.

Senior Associate answer:
A JWT is a signed token containing claims such as subject, issuer, audience, expiry, scopes, and roles. The API validates the token signature using a shared secret or public key, checks expiry, issuer, and audience, and then uses claims for identity and authorization decisions. JWTs are useful because services can validate tokens without calling the identity provider every time, but they must be short-lived, properly verified, and never trusted without checking signature and claims.

Senior answer structure:
Use this structure: API contract -> validation/auth -> business logic/data layer -> error handling -> testing and observability.

Scenario-based practice:
Scenario practice: Imagine this API is serving real users and starts failing under load. Explain how you would validate the contract, debug logs/traces, protect data, and scale it for: How do JWT tokens work in API authentication?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 10

Interviewer:
How would you implement role-based access control for APIs?

Pause the video and answer this question aloud.

Senior Associate answer:
I would define roles or scopes based on business operations, not just technical endpoints. For example, viewer can read, operator can trigger approved actions, and admin can manage configuration. In the API, authorization middleware or dependencies should check the caller's role, scope, tenant, and resource ownership. For sensitive operations, I may require additional approval, audit logging, or break-glass workflows. I would also test authorization paths because broken access control is one of the most common API risks.

Senior answer structure:
Use this structure: API contract -> validation/auth -> business logic/data layer -> error handling -> testing and observability.

Scenario-based practice:
Scenario practice: Imagine this API is serving real users and starts failing under load. Explain how you would validate the contract, debug logs/traces, protect data, and scale it for: How would you implement role-based access control for APIs?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Closing

That completes Episode 114: API Development Production Round - Part 1.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
