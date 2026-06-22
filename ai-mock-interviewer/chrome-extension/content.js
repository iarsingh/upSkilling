(() => {
if (window.__localOllamaJobAutofillLoaded) return;
window.__localOllamaJobAutofillLoaded = true;

const FIELD_LIMIT = 80;
const DEFAULT_PROFILE = {
  fullName: "Akhilesh Ranjan Singh",
  firstName: "Akhilesh",
  middleName: "Ranjan",
  lastName: "Singh",
  headline: "Senior DevOps & Platform Engineer | GCP | Kubernetes | Terraform | Cloud Security",
  email: "akhileshranjan.ks@gmail.com",
  phone: "+91-8002392976",
  location: "Noida, India",
  city: "Noida",
  country: "India",
  linkedin: "https://linkedin.com/in/iamarsingh",
  github: "https://github.com/iarsingh",
  portfolio: "",
  yearsExperience: "6.9+",
  summary: "Senior DevOps & Platform Engineer with 6.9+ years of experience designing, automating, and operating cloud-native platforms across GCP, AWS, and Azure. Skilled in Kubernetes, Terraform, CI/CD, Infrastructure as Code, cloud security, observability, and platform engineering.",
  skills: ["GCP", "GKE", "Kubernetes", "Docker", "Helm", "Terraform", "Jenkins", "GitHub Actions", "Cloud Build", "ArgoCD", "Python", "Bash", "Prometheus", "Grafana", "OpenTelemetry", "IAM", "Cloud Armor", "DevSecOps", "MLflow", "Vertex AI", "MLOps"],
  education: "Bachelor of Engineering - Computer Science, RGPV, Bhopal | 2019",
  workAuthorization: "Authorized to work in India",
  noticePeriod: "",
  expectedCtc: "",
  currentCtc: "",
  preferredLocations: "Noida, Bengaluru, Hyderabad, Pune, Mumbai, Gurgaon, Remote",
  remotePreference: "Remote, hybrid, or relocation-based roles"
};

function visible(el) {
  const style = window.getComputedStyle(el);
  const rect = el.getBoundingClientRect();
  return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
}

function textForElement(el) {
  const parts = [];
  if (el.id) {
    const label = document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
    if (label) parts.push(label.innerText);
  }
  const parentLabel = el.closest("label");
  if (parentLabel) parts.push(parentLabel.innerText);
  const describedBy = el.getAttribute("aria-describedby");
  if (describedBy) {
    for (const id of describedBy.split(/\s+/)) {
      const desc = document.getElementById(id);
      if (desc) parts.push(desc.innerText);
    }
  }
  parts.push(
    el.getAttribute("aria-label"),
    el.getAttribute("placeholder"),
    el.getAttribute("name"),
    el.getAttribute("id"),
    el.getAttribute("autocomplete")
  );
  return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}

function fields() {
  return [...document.querySelectorAll("input, textarea, select")]
    .filter((el) => visible(el) && !el.disabled && !el.readOnly)
    .slice(0, FIELD_LIMIT)
    .map((el, index) => ({
      index,
      tag: el.tagName.toLowerCase(),
      type: (el.getAttribute("type") || "").toLowerCase(),
      label: textForElement(el),
      value: el.value || "",
      options: el.tagName === "SELECT" ? [...el.options].map((option) => option.textContent.trim()).slice(0, 20) : []
    }));
}

function pageInfo() {
  return {
    url: location.href,
    title: document.title,
    pageText: document.body.innerText.replace(/\s+/g, " ").slice(0, 6000),
    fields: fields()
  };
}

function normalize(value) {
  return String(value || "").toLowerCase();
}

function dispatch(el) {
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
  el.dispatchEvent(new Event("blur", { bubbles: true }));
}

function setNativeValue(el, value) {
  const prototype = el instanceof HTMLTextAreaElement
    ? HTMLTextAreaElement.prototype
    : HTMLInputElement.prototype;
  const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");
  if (descriptor?.set) descriptor.set.call(el, value);
  else el.value = value;
}

function chooseSelect(el, value) {
  const wanted = normalize(value);
  let best = null;
  for (const option of el.options) {
    const text = normalize(option.textContent);
    const optionValue = normalize(option.value);
    if (text === wanted || optionValue === wanted || text.includes(wanted) || wanted.includes(text)) {
      best = option;
      break;
    }
  }
  if (best) {
    el.value = best.value;
    dispatch(el);
    return true;
  }
  return false;
}

function setValue(el, value) {
  if (value === undefined || value === null || value === "") return false;
  const type = (el.getAttribute("type") || "").toLowerCase();
  if (["hidden", "file", "submit", "button", "reset", "image"].includes(type)) return false;
  if (type === "checkbox") {
    const yes = /yes|true|agree|authorized|remote|india|work/i.test(String(value));
    el.checked = yes;
    dispatch(el);
    return true;
  }
  if (type === "radio") return false;
  if (el.tagName === "SELECT") return chooseSelect(el, value);
  el.focus();
  setNativeValue(el, value);
  dispatch(el);
  return true;
}

function profileValue(profile, label) {
  const text = normalize(label);
  if (/first/.test(text) && /name/.test(text)) return profile.firstName;
  if (/middle/.test(text) && /name/.test(text)) return profile.middleName;
  if (/last|surname|family/.test(text) && /name/.test(text)) return profile.lastName;
  if (/full.*name|candidate.*name|applicant.*name|legal.*name/.test(text)) return profile.fullName;
  if (/e-?mail|email/.test(text)) return profile.email;
  if (/phone|mobile|contact number|telephone/.test(text)) return profile.phone;
  if (/linkedin/.test(text)) return profile.linkedin;
  if (/github|git hub/.test(text)) return profile.github;
  if (/portfolio|website|personal site/.test(text)) return profile.portfolio || profile.github;
  if (/city/.test(text)) return profile.city;
  if (/country/.test(text)) return profile.country;
  if (/location|current address|address/.test(text)) return profile.location;
  if (/experience|years/.test(text)) return profile.yearsExperience;
  if (/notice/.test(text)) return profile.noticePeriod;
  if (/expected.*ctc|salary expectation|expected salary/.test(text)) return profile.expectedCtc;
  if (/current.*ctc|current salary/.test(text)) return profile.currentCtc;
  if (/summary|profile|about|cover letter|why.*you|tell us/.test(text)) return profile.summary;
  if (/skill|technology|tools/.test(text)) return profile.skills.join(", ");
  if (/education|degree|university|college/.test(text)) return profile.education;
  if (/authorization|work permit|eligible/.test(text)) return profile.workAuthorization;
  if (/remote|relocat|preferred location/.test(text)) return profile.remotePreference;
  return "";
}

async function fillBasic(api) {
  let profile = DEFAULT_PROFILE;
  try {
    const response = await fetch(`${api}/api/autofill-profile`);
    const data = await response.json();
    profile = data.profile || DEFAULT_PROFILE;
  } catch {
    profile = DEFAULT_PROFILE;
  }
  let filled = 0;
  const elements = [...document.querySelectorAll("input, textarea, select")].filter((el) => visible(el) && !el.disabled && !el.readOnly);
  for (const el of elements) {
    if (el.value && el.tagName !== "SELECT") continue;
    const value = profileValue(profile, textForElement(el));
    if (setValue(el, value)) filled += 1;
  }
  return { filled };
}

function applySuggestions(suggestions) {
  let filled = 0;
  const elements = [...document.querySelectorAll("input, textarea, select")].filter((el) => visible(el) && !el.disabled && !el.readOnly);
  for (const item of suggestions || []) {
    const el = elements[item.index];
    if (!el) continue;
    if (setValue(el, item.value)) filled += 1;
  }
  return { filled };
}

function insertCoverLetter(text) {
  const areas = [...document.querySelectorAll("textarea")]
    .filter((el) => visible(el) && !el.disabled && !el.readOnly)
    .sort((a, b) => (b.rows || 0) - (a.rows || 0));
  const target = areas.find((el) => /cover|why|message|additional|summary|note/i.test(textForElement(el))) || areas[0];
  if (!target) {
    navigator.clipboard?.writeText(text);
    return { filled: 0 };
  }
  setValue(target, text);
  return { filled: 1 };
}

function highlightUploads() {
  const uploads = [...document.querySelectorAll('input[type="file"]')].filter(visible);
  for (const el of uploads) {
    el.style.outline = "3px solid #1f6feb";
    el.style.outlineOffset = "4px";
    const label = document.createElement("div");
    label.textContent = "Select resume PDF manually";
    label.style.cssText = "position:absolute;z-index:2147483647;background:#1f6feb;color:#fff;padding:6px 8px;border-radius:6px;font:12px system-ui;";
    const rect = el.getBoundingClientRect();
    label.style.left = `${Math.max(8, rect.left + window.scrollX)}px`;
    label.style.top = `${Math.max(8, rect.top + window.scrollY - 34)}px`;
    document.body.appendChild(label);
    setTimeout(() => label.remove(), 6000);
  }
  return { count: uploads.length };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  (async () => {
    if (message.type === "LOCAL_AUTOFILL_PING") return { ok: true };
    if (message.type === "LOCAL_AUTOFILL_BASIC") return fillBasic(message.api);
    if (message.type === "LOCAL_AUTOFILL_COLLECT") return pageInfo();
    if (message.type === "LOCAL_AUTOFILL_APPLY") return applySuggestions(message.suggestions);
    if (message.type === "LOCAL_AUTOFILL_COVER_LETTER") return insertCoverLetter(message.text);
    if (message.type === "LOCAL_AUTOFILL_UPLOADS") return highlightUploads();
    return {};
  })().then(sendResponse).catch((error) => sendResponse({ error: error.message, filled: 0 }));
  return true;
});
})();
