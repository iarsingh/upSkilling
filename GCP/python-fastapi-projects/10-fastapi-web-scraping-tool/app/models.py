from typing import Any

from pydantic import BaseModel, Field, HttpUrl


class ScrapeRequest(BaseModel):
    url: HttpUrl
    include_images: bool = False
    max_links: int = Field(default=25, ge=0, le=100)
    max_preview_chars: int = Field(default=1200, ge=100, le=5000)


class LinkItem(BaseModel):
    text: str
    url: str


class ImageItem(BaseModel):
    alt: str
    url: str


class HeadingItem(BaseModel):
    level: int
    text: str


class ScrapeResponse(BaseModel):
    source_url: str
    final_url: str
    status_code: int
    content_type: str
    title: str | None
    description: str | None
    headings: list[HeadingItem]
    links: list[LinkItem]
    images: list[ImageItem]
    text_preview: str
    word_count: int
    metadata: dict[str, Any] = Field(default_factory=dict)
