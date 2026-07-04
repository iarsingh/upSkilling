# Prompt Safety Evaluator

Scores prompts and LLM responses for security, privacy, and operational risk. The demo uses transparent rules so teams can understand why a prompt was blocked or allowed.

## Why This Is Useful

LLM applications need guardrails before prompts reach a model and before responses reach a user. This project shows how to build a simple policy layer that produces explainable decisions.

## Run

```bash
python3 app.py
```

## What This Proves

- Prompt risk classification
- Response safety checks
- Explainable guardrail decisions
- Security-aware LLM application design

## Interview Talking Points

- Which checks belong before the LLM call and which belong after?
- How would you reduce false positives?
- How would you log blocked prompts without leaking sensitive data?
