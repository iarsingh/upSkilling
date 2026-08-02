def chunks(text: str, size: int = 1200, overlap: int = 200) -> list[str]:
    if size <= 0 or overlap < 0 or overlap >= size:
        raise ValueError("Require size > 0 and 0 <= overlap < size")
    clean = " ".join(text.split())
    return [
        clean[i:i + size]
        for i in range(0, len(clean), size - overlap)
        if clean[i:i + size]
    ]

