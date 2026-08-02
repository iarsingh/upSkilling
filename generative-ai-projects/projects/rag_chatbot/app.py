import io
import sys
from pathlib import Path

import numpy as np
import streamlit as st
from pypdf import PdfReader

sys.path.insert(0, str(Path(__file__).resolve().parent))
from rag_utils import chunks

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from common import ask, client, page, show_error


def extract(upload) -> str:
    if upload.name.lower().endswith(".pdf"):
        return "\n".join(page.extract_text() or "" for page in PdfReader(io.BytesIO(upload.getvalue())).pages)
    return upload.getvalue().decode("utf-8", errors="replace")


def embed(items: list[str]) -> np.ndarray:
    result = client().embeddings.create(model="text-embedding-3-small", input=items)
    return np.array([row.embedding for row in result.data])


@st.cache_data(show_spinner=False)
def build_index(files: tuple[tuple[str, bytes], ...]):
    passages, labels = [], []
    for name, data in files:
        class Upload:
            def __init__(self):
                self.name = name
            def getvalue(self):
                return data
        for index, part in enumerate(chunks(extract(Upload()))):
            passages.append(part)
            labels.append(f"{name}, chunk {index + 1}")
    return passages, labels, embed(passages)


page("RAG Document Chatbot", "Grounded answers from your own PDF, TXT, or Markdown files.")
uploads = st.file_uploader("Documents", type=["pdf", "txt", "md"], accept_multiple_files=True)
top_k = st.sidebar.slider("Retrieved passages", 2, 8, 4)
if "rag_messages" not in st.session_state:
    st.session_state.rag_messages = []
for message in st.session_state.rag_messages:
    st.chat_message(message["role"]).write(message["content"])
question = st.chat_input("Ask a question about the documents")
if question and uploads:
    try:
        file_data = tuple((u.name, u.getvalue()) for u in uploads)
        passages, labels, vectors = build_index(file_data)
        if not passages:
            raise ValueError("No readable text was found in the uploaded documents.")
        query_vector = embed([question])[0]
        scores = vectors @ query_vector / (np.linalg.norm(vectors, axis=1) * np.linalg.norm(query_vector))
        best = np.argsort(scores)[-top_k:][::-1]
        context = "\n\n".join(f"[{labels[i]}]\n{passages[i]}" for i in best)
        history = "\n".join(f"{m['role']}: {m['content']}" for m in st.session_state.rag_messages[-4:])
        answer = ask("Answer only from the supplied context. Cite sources using their square-bracket labels. Say when evidence is insufficient. Use conversation history only to resolve references, never as evidence.", f"Conversation:\n{history}\n\nQuestion: {question}\n\nContext:\n{context}")
        st.session_state.rag_messages.extend([{"role": "user", "content": question}, {"role": "assistant", "content": answer}])
        st.chat_message("user").write(question)
        st.chat_message("assistant").write(answer)
        with st.expander("Retrieved evidence"):
            for i in best:
                st.markdown(f"**{labels[i]}** — similarity {scores[i]:.3f}")
                st.write(passages[i])
    except Exception as exc:
        show_error(exc)
elif question:
    st.warning("Upload at least one document first.")

if st.session_state.rag_messages:
    transcript = "\n\n".join(f"## {m['role'].title()}\n{m['content']}" for m in st.session_state.rag_messages)
    st.sidebar.download_button("Download conversation", transcript, "rag-conversation.md", "text/markdown")
    if st.sidebar.button("Clear conversation"):
        st.session_state.rag_messages = []
        st.rerun()
