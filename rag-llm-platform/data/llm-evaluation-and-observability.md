# LLM Evaluation and Observability

Traditional software testing checks for exact expected output; LLM output is non-deterministic and
open-ended, so evaluation has to measure quality along multiple axes instead of pass/fail assertions alone.

## Types of Evaluation

- **Golden-set evaluation**: a fixed set of representative inputs with known-good expected answers (or
  acceptance criteria), scored automatically or by a human rubric, run on every model/prompt change before
  deployment - the LLM equivalent of a regression test suite.
- **LLM-as-judge**: using a stronger model to score a weaker model's output against a rubric (correctness,
  groundedness, tone). Cheaper and faster than human review at scale, but introduces its own bias and needs
  periodic calibration against real human judgments to stay trustworthy.
- **Online evaluation**: sampling live production traffic and outcomes (thumbs up/down, follow-up question
  rate, task completion) to catch quality regressions that a static golden set wouldn't cover, since real
  user inputs are broader than any curated test set.
- **A/B testing**: comparing two prompts/models on live traffic against a business metric, not just an
  offline quality score - a model that scores higher on a golden set can still perform worse on the metric
  that actually matters (engagement, task success, cost).

## Multi-Model Comparison

When more than one model is available (as in this project - a local Ollama model alongside an optional
cloud model), the same question run through both is a lightweight but genuinely useful evaluation
technique: it surfaces cases where a smaller/local model confidently gives a different answer than a larger
one, which is exactly the signal needed to decide whether the cheaper model is "good enough" for a given
use case or where it systematically falls short.

## Observability Signals

- **Latency**: time-to-first-token and total generation time, tracked per model/provider - this is what a
  user actually experiences and what most directly drives infrastructure cost decisions.
- **Cost**: tokens in/out per request, multiplied by provider pricing - without this, teams routinely
  discover a feature's LLM cost only after a large bill arrives.
- **Groundedness/hallucination rate**: for RAG systems specifically, whether the answer is actually
  supported by the retrieved context - measurable via an LLM-as-judge check comparing answer claims against
  retrieved source text.
- **Drift**: whether output quality degrades over time as the underlying model version changes upstream
  (a hosted provider updates a model), or as the input distribution shifts (new topics users ask about that
  weren't represented in the golden set).

## Why This Matters for RAG Specifically

A RAG system has two independent failure surfaces - retrieval and generation - and evaluation needs to
attribute failure to the right one: retrieval-quality metrics (recall@k against a labeled question set)
catch "found the wrong chunks," while generation-quality metrics (groundedness, correctness) catch "found
the right chunks but answered badly anyway." Conflating the two into one end-to-end "is the answer right"
score makes it much harder to know what to actually go fix.
