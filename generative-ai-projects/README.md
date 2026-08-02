# Generative AI Project Portfolio

Six small, runnable Streamlit projects that demonstrate common GenAI patterns.

Each app now includes polished error handling, visible model/API configuration, persistent session results, and downloadable Markdown or image outputs.

## Projects

1. **RAG document chatbot** — cached embeddings, adjustable retrieval depth, cited answers, conversation memory, evidence inspection, and transcript export.
2. **AI mock interviewer** — technical/behavioral/system-design modes, non-repeating multi-round interviews, structured coaching, history, and report export.
3. **Resume analyzer** — configurable analysis depth, transparent score rationale, ATS keyword coverage, gap analysis, evidence-safe rewrites, and export.
4. **Text-to-image studio** — prompt enhancement, style/size/quality controls, avoidance guidance, session gallery, and PNG downloads.
5. **AI coding assistant** — pasted or uploaded code, multiple engineering tasks, configurable strictness, severity-based findings, and review export.
6. **Multi-agent researcher** — configurable depth and audience; planner, technical and strategy researchers, critic, writer, agent trace, action plan, and report export.

## Setup

```bash
cd generative-ai-projects
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Add your API key to .env
```

Run the portfolio launcher:

```bash
streamlit run app.py
```

Or run one project directly, for example:

```bash
streamlit run projects/rag_chatbot/app.py
```

All text apps use the Responses API. Change `OPENAI_MODEL` in `.env` if your account uses another model. Uploaded content remains in the Streamlit session and is sent to the configured API only when you submit a request.
