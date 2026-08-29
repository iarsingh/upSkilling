from pypdf import PdfReader


def extract_pages(file_path: str) -> list[dict]:
    reader = PdfReader(file_path)
    return [{"page": i + 1, "text": page.extract_text() or ""} for i, page in enumerate(reader.pages)]


def chunk_pages(pages: list[dict], chunk_size: int = 900, overlap: int = 150) -> list[dict]:
    """Character-window chunking with overlap, tracking source page per chunk.
    PDFs rarely have clean paragraph breaks after extraction, so fixed-size
    windows (rather than the paragraph-split approach used for markdown in
    the other rag-* projects) are the more robust default here."""
    chunks = []
    for page in pages:
        text = " ".join(page["text"].split())
        if not text:
            continue
        start = 0
        while start < len(text):
            end = start + chunk_size
            chunks.append({"page": page["page"], "text": text[start:end]})
            if end >= len(text):
                break
            start = end - overlap
    return chunks
