# Vector Search Fundamentals

Vector search finds documents by semantic similarity instead of exact keyword matches. Each document (or chunk of a document) is converted into an embedding: a fixed-length vector of floating-point numbers produced by an embedding model, where semantically similar text ends up close together in the vector space.

## Embeddings vs TF-IDF

TF-IDF represents text as sparse vectors based on word frequency, so it only matches documents that share literal words with the query. Embeddings are dense vectors trained so that "How do I reduce cloud costs?" and "Ways to lower GCP billing" land near each other even though they share almost no words. This is why embedding-based retrieval generalizes better for real user questions, at the cost of needing an embedding model and more compute per document.

## Similarity metrics

The two most common similarity metrics are cosine similarity (angle between vectors, ignores magnitude) and Euclidean/L2 distance (straight-line distance). Cosine similarity is the default for most text embedding models because embedding magnitude often encodes length or confidence rather than meaning, so comparing direction alone is more reliable.

## Approximate nearest neighbor (ANN) search

Exact nearest-neighbor search compares a query vector against every stored vector, which is O(n) per query and becomes too slow past a few hundred thousand vectors. Production vector databases use ANN indexes (HNSW, IVF, or product quantization) that trade a small amount of recall for large speedups, typically returning results in milliseconds even across millions of vectors. Chroma, pgvector, Pinecone, Weaviate, and Vertex AI Vector Search all use some form of ANN indexing under the hood.

## Chunking strategy

Embedding an entire long document as one vector loses precision, because the embedding has to represent everything at once. Splitting documents into smaller chunks (typically 200-800 tokens, often with some overlap between consecutive chunks) lets retrieval return the specific passage that answers a question rather than a whole document. Chunk size is a real tuning knob: too small loses context, too large dilutes relevance and wastes tokens in the LLM prompt.

## Hybrid search

Pure embedding search can miss exact-match cases like product SKUs, error codes, or proper nouns that the embedding model was not trained to distinguish well. Hybrid search combines a keyword/BM25 score with a vector similarity score (often via reciprocal rank fusion) so a query can match on both semantic meaning and exact terms, which is what most production RAG systems use instead of vector search alone.
