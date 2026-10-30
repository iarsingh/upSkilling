# Local RAG

A small retrieval-augmented generation app that runs entirely on this machine. It indexes the markdown runbooks in `corpus/`, searches them with local embeddings plus keyword search, and answers through a local Ollama model. Citations are the passages the app retrieved. The model is not asked to invent filenames.

## What you need

- Python 3.11 or newer (stdlib only; no pip install)
- [Ollama](https://ollama.com) running locally, with:

```bash
ollama pull nomic-embed-text
ollama pull llama3.1:8b
```

Both of those models are already present on this computer.

## Run it

From this directory:

```bash
python3 -m rag.cli index
python3 -m rag.cli search "What does ERR-4401 on pay-gw-03 mean?"
python3 -m rag.cli ask "How do I refund a duplicate capture after the nightly batch?"
python3 -m rag.cli eval
python3 -m rag.cli serve
```

Then open http://127.0.0.1:8787

`index` writes `data/index.sqlite`. That file is local and is not committed. Re-run `index` after you edit a runbook.

## How a question moves

1. The runbooks are split on headings into overlapping passages. Each passage keeps its title, heading, and file name.
2. `nomic-embed-text` turns each passage into a vector. The same model embeds the question at query time.
3. Two searches run. Cosine similarity finds paraphrases ("invoices late after month end" can hit a page that only says "statement"). BM25 finds exact tokens such as `ERR-4401` and `pay-gw-03`, which embeddings tend to blur.
4. The two ranked lists are merged with reciprocal rank fusion. Raw scores are not averaged, because cosine and BM25 are not on the same scale.
5. A short rerank pass reorders that candidate list. A typed identifier is boosted, because an error code in the passage is stronger evidence than a nearby vector.
6. If the best passage is only a near miss (close to the median similarity of the whole corpus, and it does not contain an identifier you typed), the app abstains and does not call the chat model.
7. Passages from the same runbook stay in the prompt. A page whose score falls away from the best hit is left out, so a near miss does not dilute the answer. `llama3.1:8b` writes the reply. The page lists the passages the app selected. A title that appears only in the model's sentence is not linked.

## Useful questions

- `What does ERR-4401 on pay-gw-03 mean?` — exact code and hostname
- `Shoppers cannot pay and the spinner never finishes` — paraphrase of the same outage
- `Why are invoices late after month end?` — the page never uses the word "invoice"
- `Does a disk resize need a reboot?` — the answer has to distinguish data volumes from the boot volume
- `What is the CEO's favorite coffee?` — should abstain

## Checks

```bash
python3 -m unittest discover -s tests -v
python3 -m rag.cli eval
```

## Environment

| Variable | Default |
| --- | --- |
| `OLLAMA_HOST` | `http://127.0.0.1:11434` |
| `RAG_EMBED_MODEL` | `nomic-embed-text` |
| `RAG_LLM_MODEL` | `llama3.1:8b` |
