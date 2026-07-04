# Local Job Autofill Chrome Extension

A local-only Chrome extension that fills job application forms from `data/applicant-profile.json`, using
the same local server as the AI Mock Interviewer app.

## Run the Local Server

From the `ai-mock-interviewer` project root:

```bash
npm start
```

Keep Ollama running if you want AI-assisted field mapping and cover letters:

```bash
ollama serve
```

## Install in Chrome

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select this `chrome-extension/` folder.

## Use

1. Open a job application page.
2. Click the **Local Ollama Job Autofill** extension icon.
3. Click **Fill visible fields** for fast local autofill.
4. Click **AI map and fill** for Ollama-assisted matching on unusual forms.
5. Click **Generate cover letter** to fill the largest cover-letter-style text area.
6. Review everything before submitting.

Chrome does not allow extensions to set file upload input values. Use **Highlight resume uploads**, then
manually select your résumé file from the file picker.

## Update Your Data

Edit `data/applicant-profile.json` (in the project root) to add expected CTC, current CTC, notice period,
portfolio links, or preferred locations — the autofill and cover-letter generator both read from this file.
