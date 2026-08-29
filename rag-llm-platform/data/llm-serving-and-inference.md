# LLM Serving and Inference

Serving an LLM is a different engineering problem from training one: the goal is maximizing throughput
and minimizing latency/cost for a fixed, already-trained model, under real traffic.

## Serving Options

- **Ollama**: runs GGUF-quantized models locally via `llama.cpp`, simplest to operate, best for local
  development, single-user tools, or small-scale self-hosted inference. No built-in multi-request batching
  optimizations comparable to vLLM.
- **vLLM**: a high-throughput serving engine using PagedAttention for efficient KV-cache memory management,
  continuous batching across concurrent requests, and tensor parallelism across GPUs. The default choice
  for production-scale self-hosted LLM serving.
- **TGI (Text Generation Inference)**: Hugging Face's serving engine, similar goals to vLLM (continuous
  batching, quantization support), commonly paired with Hugging Face's model hub and Inference Endpoints.
- **Managed APIs** (Vertex AI, Bedrock, OpenAI, Anthropic): no infrastructure to operate at all, but no
  control over the underlying serving stack, and per-token pricing instead of fixed compute cost.

## Quantization

Quantization reduces the numerical precision of model weights (e.g., FP16 -> INT8 -> INT4) to shrink memory
footprint and increase throughput, at some cost to output quality. GGUF (used by `llama.cpp`/Ollama) and
GPTQ/AWQ (used by vLLM/TGI) are the common quantization formats. A 4-bit quantized 8B model can run
comfortably on a single consumer GPU or even CPU, where the full-precision version would need much more
VRAM - this is why a locally-run 8B model is practical on a laptop at all.

## Continuous Batching

Naive request batching waits for a full batch to arrive before processing, which adds latency and wastes
GPU cycles between arrivals. Continuous batching (used by vLLM, TGI) instead adds new requests into an
in-flight batch as soon as a GPU slot frees up (when another request in the batch finishes generating),
keeping GPU utilization high without making early-arriving requests wait for a full batch to fill. This is
the single biggest throughput lever in production LLM serving.

## KV-Cache Management

During generation, the model caches key/value attention states per token so it doesn't recompute them on
every new token - this cache grows linearly with sequence length and is the dominant memory cost at
inference time, often larger than the model weights themselves for long contexts. PagedAttention (vLLM)
manages this cache in fixed-size blocks similar to OS virtual memory paging, which avoids memory
fragmentation and lets many concurrent requests share GPU memory efficiently instead of each reserving a
worst-case-sized contiguous block.

## Latency vs. Throughput

Time-to-first-token (TTFT) and inter-token latency are the two metrics that matter for a chat-style
product; total tokens/second across all concurrent requests is what matters for batch/offline workloads.
Optimizing purely for throughput (large batches) can hurt TTFT for interactive use cases, so production
systems often run separate serving pools tuned differently for "chat" traffic versus "batch" traffic rather
than one configuration for both.

## GPU vs. CPU

GPU inference is dramatically faster for anything beyond small models because attention and matrix
multiplication are highly parallelizable operations GPUs are built for; CPU inference is viable for small,
heavily quantized models (as this project's Ollama setup demonstrates) or for workloads where request
volume is low enough that latency doesn't matter. Apple Silicon's unified memory architecture (as used by
this Ollama instance) is a middle ground: no discrete GPU, but memory bandwidth good enough for reasonable
throughput on quantized models without needing cloud GPU cost.
