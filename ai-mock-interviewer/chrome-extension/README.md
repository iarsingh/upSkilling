# Local Ollama Job Autofill Chrome Extension

This is a local-only Chrome extension for filling job application forms from `data/applicant-profile.json`.

## Run The Local Server

From the project folder:

```bash
cd /Users/akhileshsingh/Documents/upSkilling/ai-mock-interviewer
npm start
```

Keep Ollama running if you want AI field mapping and cover letters:

```bash
ollama serve
```

## Install In Chrome

1. Open Chrome.
2. Go to `chrome://extensions`.
3. Enable `Developer mode`.
4. Click `Load unpacked`.
5. Select this folder:

```text
/Users/akhileshsingh/Documents/upSkilling/ai-mock-interviewer/chrome-extension
```

## Use

1. Open a job application page.
2. Click the `Local Ollama Job Autofill` extension.
3. Click `Fill visible fields` for fast local autofill.
4. Click `AI map and fill` for Ollama-assisted matching on unusual forms.
5. Click `Generate cover letter` to fill the largest cover-letter-style text area.
6. Review everything before submitting.

Chrome does not allow extensions to set file upload values. Use `Highlight resume uploads`, then manually select:

```text
/Users/akhileshsingh/Downloads/AKHILESH_RANJANSINGH.pdf
```

## Update Your Data

Edit:

```text
/Users/akhileshsingh/Documents/upSkilling/ai-mock-interviewer/data/applicant-profile.json
```

Add expected CTC, current CTC, notice period, portfolio, or preferred locations when you want autofill to use those values.
