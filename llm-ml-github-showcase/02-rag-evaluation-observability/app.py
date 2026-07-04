import csv
import re
from pathlib import Path


DATA_FILE = Path("data/rag_cases.csv")
REPORT_FILE = Path("rag_eval_report.md")
RISKY_PATTERNS = ["shared admin account", "ask a teammate for credentials", "disable audit"]


def tokens(text):
    return set(re.findall(r"[a-z0-9]+", text.lower()))


def overlap_score(question, answer):
    question_tokens = tokens(question)
    answer_tokens = tokens(answer)
    if not question_tokens:
        return 0.0
    return len(question_tokens & answer_tokens) / len(question_tokens)


def evaluate(row):
    retrieved_docs = row["retrieved_docs"].split("|")
    citations = [citation for citation in row["citations"].split("|") if citation]
    expected_doc = row["expected_doc"]
    retrieval_hit = expected_doc in retrieved_docs
    citation_hit = expected_doc in citations
    risky_answer = any(pattern in row["answer"].lower() for pattern in RISKY_PATTERNS)
    relevance = overlap_score(row["question"], row["answer"])
    groundedness = 1.0 if retrieval_hit and citation_hit and not risky_answer else 0.0
    return {
        "question": row["question"],
        "retrieval_hit": retrieval_hit,
        "citation_hit": citation_hit,
        "risky_answer": risky_answer,
        "relevance": relevance,
        "groundedness": groundedness,
    }


def pct(values):
    values = list(values)
    return round(100 * sum(values) / len(values), 1)


def main():
    with DATA_FILE.open(newline="") as file:
        rows = list(csv.DictReader(file))

    results = [evaluate(row) for row in rows]
    retrieval = pct(result["retrieval_hit"] for result in results)
    citations = pct(result["citation_hit"] for result in results)
    grounded = pct(result["groundedness"] for result in results)
    avg_relevance = round(sum(result["relevance"] for result in results) / len(results), 2)

    lines = [
        "# RAG Evaluation Report",
        "",
        f"- Retrieval hit rate: {retrieval}%",
        f"- Citation coverage: {citations}%",
        f"- Grounded answer rate: {grounded}%",
        f"- Average lexical relevance: {avg_relevance}",
        "",
        "## Case Results",
        "",
        "| Question | Retrieval | Citation | Risk | Grounded |",
        "|---|---:|---:|---:|---:|",
    ]
    for result in results:
        lines.append(
            "| {question} | {retrieval} | {citation} | {risk} | {grounded} |".format(
                question=result["question"],
                retrieval="yes" if result["retrieval_hit"] else "no",
                citation="yes" if result["citation_hit"] else "no",
                risk="yes" if result["risky_answer"] else "no",
                grounded="yes" if result["groundedness"] else "no",
            )
        )

    REPORT_FILE.write_text("\n".join(lines) + "\n")
    print("\n".join(lines))
    print(f"\nWrote {REPORT_FILE}")


if __name__ == "__main__":
    main()
