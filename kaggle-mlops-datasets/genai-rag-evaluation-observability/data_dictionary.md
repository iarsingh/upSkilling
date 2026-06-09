# Data Dictionary

Dataset file: `data/genai_rag_evaluation_observability.csv`

## Columns

- `evaluation_id` - unique synthetic evaluation identifier
- `evaluation_timestamp` - UTC timestamp for the evaluation event
- `question_domain` - knowledge domain for the user question
- `prompt_template_version` - prompt template version under evaluation
- `model_name` - LLM used for the response
- `retrieval_top_k` - configured number of retrieved chunks
- `retrieved_context_count` - actual number of contexts returned
- `context_relevance_score` - synthetic relevance score from 0 to 1
- `groundedness_score` - synthetic answer groundedness score from 0 to 1
- `answer_similarity_score` - synthetic reference similarity score from 0 to 1
- `citation_coverage_pct` - percentage of answer claims covered by citations
- `response_latency_ms` - response latency in milliseconds
- `input_tokens` - input token count
- `output_tokens` - output token count
- `estimated_cost_usd` - estimated request cost in USD
- `hallucination_flag` - label indicating potential hallucination
- `evaluation_passed` - target label indicating whether evaluation passed

## Suggested Tasks

- RAG evaluation dashboard practice
- Hallucination risk analysis
- Prompt version comparison
- Retrieval quality monitoring
- GenAI platform interview preparation
