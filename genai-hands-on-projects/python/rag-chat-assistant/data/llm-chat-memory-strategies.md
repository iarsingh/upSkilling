# LLM Chat Memory Strategies

An LLM has no memory between API calls by default - every request is stateless. A chat assistant that "remembers" the conversation is really just re-sending the relevant history back to the model on every turn, so memory design is about deciding what to include in that growing context window.

## Full history replay

The simplest strategy is to keep every prior user and assistant message and resend the whole transcript on each turn. This is accurate (nothing is lost) but does not scale: token cost grows with every turn, and eventually the conversation exceeds the model's context window, at which point requests start failing or truncating unpredictably.

## Sliding window

A sliding window keeps only the last N turns (for example, the last 10 messages) and drops older ones. This bounds token cost and latency, but the assistant will visibly "forget" anything mentioned earlier than the window, which is a bad experience for long troubleshooting or planning conversations that reference something said much earlier.

## Summarization memory

Instead of dropping old turns, a summarization strategy periodically compresses older messages into a short running summary using the LLM itself, and keeps only the summary plus the most recent few turns in the active context. This preserves the gist of a long conversation at a fraction of the token cost, at the cost of losing exact wording and occasionally summarizing away a detail that turns out to matter later.

## Retrieval-based memory

For assistants that need to recall facts from far earlier in a very long-running relationship (not just one session), a common pattern is to embed and store important facts or past exchanges in a vector store, then retrieve only the ones relevant to the current message - the same retrieval mechanism used for RAG over documents, applied to the conversation's own history. This scales to arbitrarily long relationships but adds retrieval latency and depends on the embedding step correctly judging what is "relevant" to the current turn.

## Session vs long-term memory

Most production chat assistants separate two layers: session memory (the current conversation, usually full history or a sliding window, kept in a fast in-memory or Redis-backed store keyed by session ID) and long-term memory (durable facts about the user or domain that persist across sessions, usually stored in a database or vector store and retrieved selectively). Conflating the two either makes every session enormous and expensive, or makes the assistant forget the user entirely between conversations - the right design depends on whether the product actually needs cross-session continuity.

## Practical tradeoff

There is no universally correct memory strategy - it is a tradeoff between token cost, latency, and how much the product genuinely needs long-range recall. A support chatbot answering one question per session rarely needs anything beyond a sliding window, while a long-running coding or research assistant benefits from summarization plus retrieval-based memory.
