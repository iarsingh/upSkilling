# Resume Web Builder

Static frontend app that converts uploaded resume files into a customizable web resume.

## Features

- Upload PDF, DOCX, DOC, or TXT resume files
- Extract resume text using browser-side parsers
- Auto-fill profile, summary, skills, experience, projects, and education sections
- Customize template, accent color, background style, and density
- Edit extracted content manually
- Dynamically add, rename, edit, and remove custom resume sections
- Automatically detect extra resume headings such as Awards, Languages, Open Source, Publications, or Volunteering
- Reorder custom sections with Move Up and Move Down controls
- AI Assist panel for local heuristic summary polishing, keyword extraction, section suggestions, and resume scoring
- Optional Ollama integration for local LLM-powered rewriting, keyword extraction, section suggestions, and resume scoring
- Chatbot that answers basic questions from the parsed resume, such as name, contact, skills, projects, experience, education, GitHub, LinkedIn, and missing ATS items
- Preview the generated web resume
- Export the customized resume as a standalone HTML file

## Code Structure

```text
index.html
styles.css
js/
  app.js            # App bootstrap and UI event wiring
  state.js          # Resume state and sample resume
  parser.js         # PDF/DOCX/TXT extraction and resume parsing
  preview.js        # Web resume preview and HTML export
  ai-assist.js      # Ollama/local AI assist helpers
  chatbot.js        # Resume chatbot logic
  utils.js          # Shared helpers
```

## Local Preview

```bash
python3 -m http.server 8096 --directory resume-web-builder
```

Then open:

```text
http://localhost:8096
```

## Notes

PDF and DOCX parsing uses CDN libraries:

- PDF.js
- Mammoth

Internet access is required for those parsers unless the libraries are vendored locally.

The AI Assist panel currently uses local browser heuristics, so it does not require an API key. It can be upgraded later to call an LLM API for deeper rewriting and scoring.

## Optional Ollama AI

Install and run Ollama locally, then enable `Use Ollama local LLM` in the app.

```bash
ollama pull llama3.1:8b
ollama serve
```

Default endpoint:

```text
http://localhost:11434
```

You can change the model name in the app, for example:

```text
llama3.1:8b
qwen2.5:7b
mistral
```

If Ollama is unavailable, the app falls back to built-in local heuristics.
