import json
from pathlib import Path

from incident_ops.config import Settings
from incident_ops.db import Runbook, make_database
from incident_ops.retrieval import embed


def seed(session, path: Path = Path("data/runbooks.json")):
    for item in json.loads(path.read_text()):
        row = session.get(Runbook, item["id"])
        if row is None:
            row = Runbook(id=item["id"])
            session.add(row)
        for key, value in item.items():
            setattr(row, key, value)
        row.embedding = embed(f"{item['title']} {item['content']}")
    session.commit()


def main():
    engine, sessions = make_database(Settings().database_url)
    with sessions() as session:
        seed(session)
    engine.dispose()
    print("Runbooks seeded. Re-running updates existing IDs without duplicates.")
