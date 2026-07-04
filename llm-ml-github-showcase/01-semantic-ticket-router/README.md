# Semantic Ticket Router

Routes support tickets to the right team using lightweight semantic similarity. The demo builds class prototypes from labeled examples, vectorizes text with TF-IDF, and returns the predicted team with confidence.

## Why This Is Useful

Real support and platform teams receive noisy tickets. A router like this can reduce triage time by sending incidents, billing issues, access requests, and ML platform tickets to the right queue.

## Run

```bash
python3 app.py
```

## What This Proves

- Text preprocessing and TF-IDF vectorization
- Similarity-based classification
- Confidence scoring
- ML automation for real support workflows

## Interview Talking Points

- How would you replace TF-IDF with sentence embeddings?
- How would you track routing accuracy in production?
- How would you handle low-confidence predictions?
- How would this integrate with Jira, ServiceNow, or Slack?
