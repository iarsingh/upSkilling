# RAG Architecture Patterns

Retrieval-Augmented Generation grounds an LLM's answer in retrieved documents instead of relying purely on what the model memorized during training. The basic pattern is: embed the user's question, retrieve the most relevant chunks from a vector store, and pass those chunks to the LLM as context alongside the question.

## Why RAG instead of fine-tuning

Fine-tuning bakes knowledge into model weights, which is expensive to update and does not give a clean way to cite sources or exclude information the model should not know. RAG keeps the knowledge base separate from the model, so updating a single document is just a re-index operation, answers can cite the exact source chunk used, and access control can be enforced at retrieval time (a user only retrieves documents they are allowed to see). Most production systems use RAG for frequently changing or sensitive knowledge, and reserve fine-tuning for teaching the model a style, format, or narrow skill rather than facts.

## Basic RAG pipeline

1. Ingest: load source documents, split into chunks, embed each chunk, store the embedding plus the original text and metadata (source, section) in a vector database.
2. Retrieve: embed the incoming question, run a similarity search against the vector store, return the top-k most relevant chunks.
3. Augment: build a prompt that includes the retrieved chunks as context, with an instruction to answer only from that context.
4. Generate: send the prompt to the LLM and return the answer, ideally with the source chunks cited so the answer is auditable.

## Conversational RAG

A single-turn RAG system treats every question independently, which breaks down in a chat interface because a follow-up question like "what about namespace scoping?" only makes sense with the prior turn's context. Conversational RAG handles this by either rewriting the follow-up into a standalone question (query rewriting using the chat history) before retrieval, or by including recent chat history directly in the prompt alongside the retrieved context, so the model can resolve pronouns and implicit references correctly.

## Failure modes to design around

RAG systems fail in specific, predictable ways: retrieval returns the wrong chunks (bad chunking or embedding mismatch), retrieval returns the right chunks but the LLM ignores them and hallucinates anyway (needs a stricter prompt and lower temperature), the answer is correct but not grounded in any retrieved source (no citation, hard to trust), or the knowledge base is stale and confidently returns outdated information. A production RAG system should log retrieved-chunk relevance scores and flag low-confidence retrievals so a human can review them, rather than silently returning an answer either way.

## Evaluation

RAG quality should be measured on two separate axes: retrieval quality (did we find the right chunks - measured with recall@k or a labeled evaluation set) and generation quality (given good chunks, did the model produce a correct, grounded answer - often scored with an LLM-as-judge or human review against a rubric). Conflating the two makes debugging much harder, since a bad final answer could be a retrieval problem, a generation problem, or both.
