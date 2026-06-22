import pytest

from app.scraper import parse_html, validate_scrape_url


HTML = """
<!doctype html>
<html>
  <head>
    <title>Example Scrape Page</title>
    <meta name="description" content="Demo page for scraper tests">
  </head>
  <body>
    <h1>Welcome</h1>
    <h2>Useful Links</h2>
    <a href="/docs">Docs</a>
    <a href="https://example.com/about">About</a>
    <img src="/logo.png" alt="Logo">
    <script>console.log("ignored")</script>
    <p>This page has text that should become the preview.</p>
  </body>
</html>
"""


def test_parse_html_extracts_metadata_links_and_text() -> None:
    result = parse_html(
        html=HTML,
        source_url="https://example.com",
        final_url="https://example.com",
        status_code=200,
        content_type="text/html",
        max_links=10,
        include_images=True,
        max_preview_chars=500,
    )

    assert result["title"] == "Example Scrape Page"
    assert result["description"] == "Demo page for scraper tests"
    assert result["headings"][0] == {"level": 1, "text": "Welcome"}
    assert result["links"][0] == {"text": "Docs", "url": "https://example.com/docs"}
    assert result["images"][0] == {"alt": "Logo", "url": "https://example.com/logo.png"}
    assert "ignored" not in result["text_preview"]
    assert result["word_count"] > 0


def test_validate_scrape_url_rejects_unsupported_schemes() -> None:
    with pytest.raises(ValueError, match="Only http and https"):
        validate_scrape_url("file:///etc/passwd")


def test_validate_scrape_url_rejects_localhost() -> None:
    with pytest.raises(ValueError, match="Private or internal"):
        validate_scrape_url("http://localhost:8000")
