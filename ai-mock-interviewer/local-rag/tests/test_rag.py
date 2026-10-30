"""Unit checks for chunking, keyword rank, fusion, and the support gate."""

from __future__ import annotations

import unittest

from rag.bm25 import BM25Index
from rag.chunk import split_markdown, windows
from rag.models import Chunk, Hit
from rag.retrieve import hybrid_search, passes_support


def chunk(doc_id: str, text: str, embedding: list[float], source: str = "corpus/x.md") -> Chunk:
    return Chunk(doc_id, source, "Title", "Heading", text, embedding)


class ChunkTests(unittest.TestCase):
    def test_short_section_stays_whole(self) -> None:
        title, parts = split_markdown("# Refunds\n\n## Batch\n\nClose at 18:00 UTC.\n", "refunds")
        self.assertEqual(title, "Refunds")
        self.assertEqual(parts, [("Batch", "Close at 18:00 UTC.")])

    def test_long_section_overlaps(self) -> None:
        body = " ".join(f"word{i}" for i in range(400))
        pieces = windows(body, size=120, overlap=30)
        self.assertGreater(len(pieces), 1)
        self.assertTrue(pieces[1].startswith("word"))
        shared = set(pieces[0].split()) & set(pieces[1].split())
        self.assertTrue(shared)


class RetrievalTests(unittest.TestCase):
    def setUp(self) -> None:
        self.payment = chunk("pay", "ERR-4401 on pay-gw-03 caused a 504.", [0.0, 1.0, 0.0])
        self.badge = chunk("badge", "A visitor badge is blue.", [1.0, 0.0, 0.0])
        self.chunks = [self.payment, self.badge]

    def test_bm25_prefers_the_exact_code(self) -> None:
        index = BM25Index((item.id, item.text) for item in self.chunks)
        ranked = index.search("ERR-4401")
        self.assertEqual(ranked[0][0], "pay")

    def test_hybrid_promotes_exact_identifier_over_a_near_vector(self) -> None:
        # The query vector sits on the badge passage, but the typed code is in payments.
        hits = hybrid_search("what is ERR-4401", self.chunks, [1.0, 0.0, 0.0])
        self.assertEqual(hits[0].chunk.id, "pay")

    def test_support_accepts_an_identifier_hit(self) -> None:
        hits = hybrid_search("ERR-4401", self.chunks, [0.0, 1.0, 0.0])
        self.assertTrue(passes_support("ERR-4401", hits, self.chunks, [0.0, 1.0, 0.0]))

    def test_support_rejects_a_near_miss(self) -> None:
        # Query is far from both passages and shares no identifier.
        far = [0.0, 0.0, 1.0]
        hits = hybrid_search("favorite coffee", self.chunks, far)
        self.assertFalse(passes_support("favorite coffee", hits, self.chunks, far))


class ContextTests(unittest.TestCase):
    def test_same_file_stays_and_a_distant_file_drops(self) -> None:
        from rag.retrieve import select_context

        def make(doc_id: str, source: str, score: float) -> Hit:
            return Hit(chunk(doc_id, "text", [1.0, 0.0, 0.0], source), score, 0.0, 0.0, score)

        chosen = select_context(
            [
                make("intro", "corpus/disk-volumes.md", 0.80),
                make("boot", "corpus/disk-volumes.md", 0.74),
                make("badge", "corpus/facilities-badges.md", 0.43),
            ]
        )
        self.assertEqual([hit.chunk.id for hit in chosen], ["intro", "boot"])


if __name__ == "__main__":
    unittest.main()
