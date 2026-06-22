import ipaddress
import os
import re
import socket
from datetime import datetime, timezone
from urllib.parse import urljoin, urlparse

import httpx
from bs4 import BeautifulSoup
from fastapi import HTTPException

DEFAULT_USER_AGENT = "FastAPIWebScraperBot/0.1"
MAX_RESPONSE_BYTES = 1_000_000
REQUEST_TIMEOUT_SECONDS = 10
TEXT_SEPARATOR = " "


def private_targets_allowed() -> bool:
    return os.getenv("ALLOW_PRIVATE_SCRAPE", "false").lower() == "true"


def clean_text(value: str | None) -> str:
    if not value:
        return ""
    return re.sub(r"\s+", " ", value).strip()


def validate_scrape_url(url: str, allow_private: bool = False) -> None:
    parsed = urlparse(url)
    if parsed.scheme not in {"http", "https"}:
        raise ValueError("Only http and https URLs are allowed")
    if not parsed.hostname:
        raise ValueError("URL must include a hostname")

    hostname = parsed.hostname.lower()
    if hostname in {"localhost", "metadata.google.internal"} and not allow_private:
        raise ValueError("Private or internal hostnames are blocked")

    if allow_private:
        return

    try:
        addresses = socket.getaddrinfo(hostname, parsed.port or None, proto=socket.IPPROTO_TCP)
    except socket.gaierror as exc:
        raise ValueError(f"Could not resolve hostname: {hostname}") from exc

    for item in addresses:
        address = item[4][0]
        ip = ipaddress.ip_address(address)
        if ip.is_private or ip.is_loopback or ip.is_link_local or ip.is_multicast or ip.is_reserved:
            raise ValueError("Private or internal IP addresses are blocked")


def extract_description(soup: BeautifulSoup) -> str | None:
    tag = soup.find("meta", attrs={"name": "description"})
    if not tag:
        tag = soup.find("meta", attrs={"property": "og:description"})
    description = clean_text(tag.get("content")) if tag else ""
    return description or None


def parse_html(
    html: str,
    source_url: str,
    final_url: str,
    status_code: int,
    content_type: str,
    max_links: int,
    include_images: bool,
    max_preview_chars: int,
) -> dict:
    soup = BeautifulSoup(html, "html.parser")

    for tag in soup(["script", "style", "noscript", "svg"]):
        tag.decompose()

    title = clean_text(soup.title.string if soup.title else "")
    headings = [
        {"level": int(tag.name[1]), "text": clean_text(tag.get_text(TEXT_SEPARATOR))}
        for tag in soup.find_all(["h1", "h2", "h3"])
        if clean_text(tag.get_text(TEXT_SEPARATOR))
    ][:50]

    seen_links: set[str] = set()
    links = []
    for tag in soup.find_all("a", href=True):
        absolute_url = urljoin(final_url, tag["href"])
        text = clean_text(tag.get_text(TEXT_SEPARATOR)) or absolute_url
        if absolute_url in seen_links:
            continue
        seen_links.add(absolute_url)
        links.append({"text": text[:160], "url": absolute_url})
        if len(links) >= max_links:
            break

    images = []
    if include_images:
        seen_images: set[str] = set()
        for tag in soup.find_all("img", src=True):
            absolute_url = urljoin(final_url, tag["src"])
            if absolute_url in seen_images:
                continue
            seen_images.add(absolute_url)
            images.append({"alt": clean_text(tag.get("alt"))[:160], "url": absolute_url})
            if len(images) >= 25:
                break

    text = clean_text(soup.get_text(TEXT_SEPARATOR))
    return {
        "source_url": source_url,
        "final_url": final_url,
        "status_code": status_code,
        "content_type": content_type,
        "title": title or None,
        "description": extract_description(soup),
        "headings": headings,
        "links": links,
        "images": images,
        "text_preview": text[:max_preview_chars],
        "word_count": len(text.split()),
        "metadata": {
            "fetched_at": datetime.now(timezone.utc).isoformat(),
            "max_response_bytes": MAX_RESPONSE_BYTES,
        },
    }


async def scrape_url(
    url: str,
    include_images: bool,
    max_links: int,
    max_preview_chars: int,
) -> dict:
    try:
        validate_scrape_url(url, allow_private=private_targets_allowed())
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    headers = {"User-Agent": os.getenv("SCRAPER_USER_AGENT", DEFAULT_USER_AGENT)}
    try:
        async with httpx.AsyncClient(
            timeout=REQUEST_TIMEOUT_SECONDS,
            follow_redirects=True,
            headers=headers,
        ) as client:
            response = await client.get(url)
            response.raise_for_status()
    except httpx.HTTPStatusError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail="Target URL returned an error") from exc
    except httpx.RequestError as exc:
        raise HTTPException(status_code=502, detail=f"Could not fetch target URL: {exc}") from exc

    content = response.content[:MAX_RESPONSE_BYTES]
    content_type = response.headers.get("content-type", "unknown")
    if "text/html" not in content_type and "application/xhtml+xml" not in content_type:
        raise HTTPException(status_code=415, detail=f"Unsupported content type: {content_type}")

    html = content.decode(response.encoding or "utf-8", errors="replace")
    return parse_html(
        html=html,
        source_url=url,
        final_url=str(response.url),
        status_code=response.status_code,
        content_type=content_type,
        max_links=max_links,
        include_images=include_images,
        max_preview_chars=max_preview_chars,
    )
