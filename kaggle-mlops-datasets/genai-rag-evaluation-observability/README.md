# GenAI RAG Evaluation and Observability Dataset

Synthetic RAG evaluation dataset for GenAI observability, hallucination analysis, prompt comparison, and retrieval quality dashboards.

This is a synthetic, Kaggle-ready dataset created for cloud, MLOps, AIOps, and GenAI portfolio practice.

## Files

- `data/genai_rag_evaluation_observability.csv` - main dataset
- `genai_rag_evaluation_observability.csv` - root-level copy for Kaggle preview
- `dataset-cover-image.png` - cover image for Kaggle dataset metadata
- `data_dictionary.md` - column definitions and suggested tasks
- `summary.json` - machine-readable quality and schema summary
- `scripts/generate_dataset.py` - reproducible dataset generator
- `generate_dataset.py` - root-level generator copy for Kaggle users
- `dataset-metadata.json` - Kaggle dataset metadata

## Quality Notes

- Fixed random seed for reproducibility.
- No missing values.
- CSV format with simple scalar columns for Kaggle compatibility.
- CC0 license for public portfolio use.
- Synthetic data only; no real customer, system, billing, or production data.

## Use Cases

- RAG evaluation dashboard practice
- Hallucination risk analysis
- Prompt version comparison
- Retrieval quality monitoring
- GenAI platform interview preparation

## Example Questions

1. Which prompt template has the best pass rate?
2. How does retrieval top-k affect latency and groundedness?
3. Which domains have the highest hallucination rate?
4. Can failed evaluations be predicted from retrieval and scoring features?

## Recreate Dataset

```bash
python3 scripts/generate_dataset.py
```

## Kaggle Upload

```bash
kaggle datasets create -p kaggle-mlops-datasets/genai-rag-evaluation-observability
```

To publish a new version:

```bash
kaggle datasets version -p kaggle-mlops-datasets/genai-rag-evaluation-observability -m "Update dataset"
```
