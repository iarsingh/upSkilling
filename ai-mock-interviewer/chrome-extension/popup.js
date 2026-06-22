const API = "http://127.0.0.1:3030";
const DEFAULT_PROFILE = {
  fullName: "Akhilesh Ranjan Singh",
  headline: "Senior DevOps & Platform Engineer | GCP | Kubernetes | Terraform | Cloud Security",
  location: "Noida, India"
};

const els = {
  status: document.querySelector("#status"),
  profileName: document.querySelector("#profileName"),
  profileLine: document.querySelector("#profileLine"),
  fillBasic: document.querySelector("#fillBasic"),
  fillAi: document.querySelector("#fillAi"),
  coverLetter: document.querySelector("#coverLetter"),
  highlightUploads: document.querySelector("#highlightUploads")
};

function setStatus(text, ok = false) {
  els.status.textContent = text;
  els.status.classList.toggle("ok", ok);
  els.status.classList.toggle("bad", !ok);
}

async function activeTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function ensureContentScript(tab) {
  if (!tab?.id || !/^https?:\/\//.test(tab.url || "")) {
    throw new Error("Open a normal http/https job application page first.");
  }
  try {
    await chrome.tabs.sendMessage(tab.id, { type: "LOCAL_AUTOFILL_PING" });
  } catch {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
  }
}

async function sendToPage(message) {
  const tab = await activeTab();
  await ensureContentScript(tab);
  return chrome.tabs.sendMessage(tab.id, message);
}

async function api(path, payload) {
  const response = await fetch(`${API}${path}`, {
    method: payload ? "POST" : "GET",
    headers: { "Content-Type": "application/json" },
    body: payload ? JSON.stringify(payload) : undefined
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Local API request failed.");
  return data;
}

async function loadProfile() {
  try {
    const data = await api("/api/autofill-profile");
    els.profileName.textContent = data.profile.fullName;
    els.profileLine.textContent = `${data.profile.headline} · ${data.profile.location}`;
    setStatus("Local server ready. Profile loaded.", true);
  } catch (error) {
    els.profileName.textContent = DEFAULT_PROFILE.fullName;
    els.profileLine.textContent = `${DEFAULT_PROFILE.headline} · ${DEFAULT_PROFILE.location}`;
    setStatus("Basic autofill can use built-in profile. Restart local server for AI mapping.", false);
  }
}

async function withBusy(button, text, work) {
  const old = button.textContent;
  button.disabled = true;
  button.textContent = text;
  try {
    await work();
  } catch (error) {
    setStatus(error.message, false);
  } finally {
    button.disabled = false;
    button.textContent = old;
  }
}

els.fillBasic.addEventListener("click", () => withBusy(els.fillBasic, "Filling", async () => {
  const result = await sendToPage({ type: "LOCAL_AUTOFILL_BASIC", api: API });
  setStatus(`Filled ${result.filled} field${result.filled === 1 ? "" : "s"}. Review before submitting.`, true);
}));

els.fillAi.addEventListener("click", () => withBusy(els.fillAi, "Mapping", async () => {
  const fields = await sendToPage({ type: "LOCAL_AUTOFILL_COLLECT" });
  const suggestions = await api("/api/autofill-suggestions", {
    url: fields.url,
    title: fields.title,
    pageText: fields.pageText,
    fields: fields.fields
  });
  const result = await sendToPage({ type: "LOCAL_AUTOFILL_APPLY", suggestions: suggestions.suggestions });
  setStatus(`AI filled ${result.filled} field${result.filled === 1 ? "" : "s"}. Review before submitting.`, true);
}));

els.coverLetter.addEventListener("click", () => withBusy(els.coverLetter, "Writing", async () => {
  const fields = await sendToPage({ type: "LOCAL_AUTOFILL_COLLECT" });
  const data = await api("/api/cover-letter", {
    url: fields.url,
    title: fields.title,
    pageText: fields.pageText
  });
  const result = await sendToPage({ type: "LOCAL_AUTOFILL_COVER_LETTER", text: data.coverLetter });
  setStatus(result.filled ? "Cover letter inserted. Review it." : "Cover letter copied into the largest text area was not possible on this page.", Boolean(result.filled));
}));

els.highlightUploads.addEventListener("click", () => withBusy(els.highlightUploads, "Highlighting", async () => {
  const result = await sendToPage({ type: "LOCAL_AUTOFILL_UPLOADS" });
  setStatus(`Highlighted ${result.count} upload field${result.count === 1 ? "" : "s"}.`, true);
}));

loadProfile();
