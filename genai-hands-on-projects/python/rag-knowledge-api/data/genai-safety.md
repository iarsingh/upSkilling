# GenAI Safety Notes

GenAI applications should validate inputs, redact sensitive data, log prompts safely, and check outputs before returning them to users.

Common risks include prompt injection, leakage of secrets, hallucinated answers, unsafe instructions, and lack of traceability.

Production systems should store audit logs with request id, model name, latency, policy decision, and user-safe metadata.

