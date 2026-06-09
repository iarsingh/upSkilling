from fastapi import FastAPI

from app.models import ScrapeRequest, ScrapeResponse
from app.scraper import scrape_url

app = FastAPI(
    title="FastAPI Web Scraping Tool",
    version="0.1.0",
    description="Learning project for scraping page metadata, headings, links, and text previews.",
)


@app.get("/")
def root() -> dict:
    return {
        "service": "fastapi-web-scraping-tool",
        "docs": "/docs",
        "health": "/healthz",
    }


@app.get("/healthz")
def healthz() -> dict:
    return {"status": "healthy"}


@app.post("/scrape", response_model=ScrapeResponse)
async def scrape(request: ScrapeRequest) -> dict:
    return await scrape_url(
        url=str(request.url),
        include_images=request.include_images,
        max_links=request.max_links,
        max_preview_chars=request.max_preview_chars,
    )
