import base64
import os
import sys
from pathlib import Path
import streamlit as st

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from common import ask, client, page, safe_filename, show_error

page("Text-to-Image Studio", "Generate a polished image from a natural-language prompt.")
prompt = st.text_area("Describe the image", "A cinematic cloud data center floating above the Himalayas at sunrise")
style = st.selectbox("Visual style", ["Photorealistic", "Cinematic", "Digital illustration", "3D render", "Watercolor", "Minimal vector"])
avoid = st.text_input("Avoid (optional)", "text, watermark, logo")
size = st.selectbox("Size", ["1024x1024", "1536x1024", "1024x1536"])
quality = st.selectbox("Quality", ["medium", "low", "high"])
if "image_gallery" not in st.session_state:
    st.session_state.image_gallery = []
if "image_final_prompt" not in st.session_state:
    st.session_state.image_final_prompt = prompt
if st.button("Enhance prompt", disabled=not prompt.strip()):
    try:
        st.session_state.image_final_prompt = ask("Rewrite the user's image prompt into one vivid production-ready paragraph. Preserve intent. Include composition, lighting, palette, camera/viewpoint, and style. Return only the prompt.", f"Style: {style}\nAvoid: {avoid}\nPrompt: {prompt}", 500)
    except Exception as exc:
        show_error(exc)
final_prompt = st.text_area("Final prompt", height=130, key="image_final_prompt")
if st.button("Generate image", disabled=not prompt.strip()):
    try:
        result = client().images.generate(
            model=os.getenv("OPENAI_IMAGE_MODEL", "gpt-image-2"),
            prompt=f"{final_prompt}\nVisual style: {style}. Avoid: {avoid}",
            size=size,
            quality=quality,
        )
        item = result.data[0]
        if getattr(item, "b64_json", None):
            data = base64.b64decode(item.b64_json)
            st.session_state.image_gallery.insert(0, {"data": data, "prompt": final_prompt})
        else:
            st.image(item.url, caption=prompt)
    except Exception as exc:
        show_error(exc)

if st.session_state.image_gallery:
    st.subheader("Session gallery")
    columns = st.columns(2)
    for index, item in enumerate(st.session_state.image_gallery):
        with columns[index % 2]:
            st.image(item["data"], caption=item["prompt"])
            st.download_button("Download PNG", item["data"], f"{safe_filename(item['prompt'], 'image')}.png", "image/png", key=f"download-{index}")
