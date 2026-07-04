import csv
import math
import re
from collections import Counter, defaultdict
from pathlib import Path


DATA_FILE = Path("data/tickets.csv")
STOPWORDS = {
    "a", "an", "and", "after", "for", "in", "is", "on", "the", "to", "of", "has",
    "with", "because", "please", "new", "cannot", "need",
}


def tokenize(text):
    return [word for word in re.findall(r"[a-z0-9]+", text.lower()) if word not in STOPWORDS]


def load_rows(path):
    with path.open(newline="") as file:
        return list(csv.DictReader(file))


def build_idf(documents):
    documents = list(documents)
    document_count = len(documents)
    document_frequency = Counter()
    for text in documents:
        document_frequency.update(set(tokenize(text)))
    return {
        token: math.log((1 + document_count) / (1 + count)) + 1
        for token, count in document_frequency.items()
    }


def vectorize(text, idf):
    tokens = tokenize(text)
    counts = Counter(tokens)
    length = len(tokens) or 1
    return {token: (count / length) * idf.get(token, 1.0) for token, count in counts.items()}


def cosine(left, right):
    common = set(left) & set(right)
    numerator = sum(left[token] * right[token] for token in common)
    left_norm = math.sqrt(sum(value * value for value in left.values()))
    right_norm = math.sqrt(sum(value * value for value in right.values()))
    if not left_norm or not right_norm:
        return 0.0
    return numerator / (left_norm * right_norm)


def average_vectors(vectors):
    totals = defaultdict(float)
    for vector in vectors:
        for token, value in vector.items():
            totals[token] += value
    return {token: value / len(vectors) for token, value in totals.items()}


def train(rows):
    idf = build_idf(row["ticket"] for row in rows)
    by_team = defaultdict(list)
    for row in rows:
        by_team[row["team"]].append(vectorize(row["ticket"], idf))
    prototypes = {team: average_vectors(vectors) for team, vectors in by_team.items()}
    return idf, prototypes


def predict(ticket, idf, prototypes):
    vector = vectorize(ticket, idf)
    scores = sorted(
        ((team, cosine(vector, prototype)) for team, prototype in prototypes.items()),
        key=lambda item: item[1],
        reverse=True,
    )
    best_team, best_score = scores[0]
    confidence = round(best_score, 3)
    return best_team, confidence, scores


def main():
    rows = load_rows(DATA_FILE)
    idf, prototypes = train(rows)
    demo_tickets = [
        "Notebook training cannot access the feature store from Kubernetes",
        "Invoice has an unexpected API overage charge",
        "Checkout service returns 500 errors and latency alerts",
        "Analyst needs dashboard permission after SSO migration",
    ]

    print("Semantic Ticket Router\n")
    for ticket in demo_tickets:
        team, confidence, scores = predict(ticket, idf, prototypes)
        score_text = ", ".join(f"{team_name}={score:.2f}" for team_name, score in scores)
        print(f"Ticket: {ticket}")
        print(f"Route:  {team}  confidence={confidence}")
        print(f"Scores: {score_text}\n")


if __name__ == "__main__":
    main()
