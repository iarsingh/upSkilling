import os
import re
from pathlib import Path

try:
    from dotenv import load_dotenv
except ImportError:
    load_dotenv = None

if load_dotenv:
    load_dotenv(Path(__file__).with_name(".env"))


def client():
    try:
        from openai import OpenAI
    except ImportError as exc:
        raise RuntimeError("Install dependencies with: pip install -r requirements.txt") from exc
    key = os.getenv("OPENAI_API_KEY")
    if not key or key == "your_api_key_here":
        raise RuntimeError("Set OPENAI_API_KEY in generative-ai-projects/.env")
    return OpenAI(api_key=key)


def ask(instructions: str, prompt: str, max_output_tokens: int = 1800) -> str:
    response = client().responses.create(
        model=os.getenv("OPENAI_MODEL", "gpt-5.6-terra"),
        instructions=instructions,
        input=prompt,
        max_output_tokens=max_output_tokens,
    )
    return response.output_text


def page(title: str, caption: str) -> None:
    import streamlit as st

    if os.getenv("GENAI_PORTFOLIO_LAUNCHER") != "1":
        st.set_page_config(page_title=title, page_icon="✨", layout="wide")
    st.markdown(
        """
        <style>
        .block-container {max-width: 1100px; padding-top: 2rem;}
        [data-testid="stMetric"] {background: rgba(120,120,120,.08); padding: 1rem; border-radius: .75rem;}
        .stButton > button {border-radius: .65rem; font-weight: 600;}
        </style>
        """,
        unsafe_allow_html=True,
    )
    st.title(title)
    st.caption(caption)
    with st.sidebar:
        st.divider()
        configured = bool(os.getenv("OPENAI_API_KEY") and os.getenv("OPENAI_API_KEY") != "your_api_key_here")
        st.success("API configured") if configured else st.warning("Add OPENAI_API_KEY to .env")
        st.caption(f"Text model: `{os.getenv('OPENAI_MODEL', 'gpt-5.6-terra')}`")


def show_error(exc: Exception) -> None:
    import streamlit as st

    st.error(str(exc))


def safe_filename(value: str, fallback: str = "output") -> str:
    cleaned = re.sub(r"[^a-zA-Z0-9_-]+", "-", value.strip()).strip("-").lower()
    return cleaned[:60] or fallback
