---
sequence: 2
date: 2026-08-13
series: AI Engineer Revision Series
level: Intermediate
topic: [Intermediate] Python and software engineering: Python memory management generators iterators and profiling for ML workloads
linkedinProfile: https://www.linkedin.com/in/iamarsingh/
image: ../../assets/ai-revision-002-intermediate-python-and-software-engineering-python-memory-management-generators-iterators-and-profi.png
status: draft
---

Your ML pipeline may not need more RAM. It may need a better data-loading strategy.

Large-scale ML workloads often fail because every record, transformation, or prediction is materialized in memory at the same time. The model gets blamed, but the real problem is frequently an eager Python data path.

Python stores objects in a private heap managed by the interpreter. A list retains references to all of its elements. A generator produces one value at a time and suspends its state between iterations. That difference can reduce peak memory dramatically when processing files, database pages, feature batches, or inference requests.

Consider a pipeline reading ten million rows. Building a list of transformed rows keeps the entire result alive. Replacing it with a generator allows downstream code to consume each transformed row incrementally:

```python
def transformed_rows(source):
    for row in source:
        yield transform(row)
```

This is not automatically faster. Lazy processing can repeat I/O, hide expensive work inside iteration, and become difficult to replay. The production design still needs explicit batching, bounded queues, timeouts, and backpressure.

A practical optimization path:

1. Measure resident memory instead of guessing.
2. Find which allocations remain alive across batches.
3. Replace unnecessary materialization with streaming or generators.
4. Set an explicit batch size based on memory and throughput tests.
5. Load-test the pipeline with production-scale data.

Tools such as `tracemalloc`, Memray, and process-level RSS metrics reveal different parts of the problem. Python allocation profiles should be compared with container memory because NumPy, PyTorch, and native extensions can allocate memory outside Python's tracked heap.

The practical lesson is simple: stream what can be streamed, batch what must be materialized, and profile before optimizing.

Save this as a revision note for your next Python or ML systems interview.

#Python #MachineLearning #MLOps #AIEngineering #PerformanceEngineering
