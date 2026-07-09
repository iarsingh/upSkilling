const profileBox = document.getElementById("profile");
const statusEl = document.getElementById("status");

function setStatus(message) {
  statusEl.textContent = message;
}

async function activeTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) throw new Error("No active tab found.");
  return tab;
}

async function runOnPage(action) {
  const { profileJson } = await chrome.storage.local.get("profileJson");
  if (!profileJson) throw new Error("Save your profile JSON first.");

  const tab = await activeTab();
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["contentScript.js"]
  });

  const [{ result: actionResult }] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (savedProfileJson, requestedAction) => window.jobApplicationFiller.run(savedProfileJson, requestedAction),
    args: [profileJson, action]
  });

  return actionResult || result;
}

chrome.storage.local.get("profileJson").then(({ profileJson }) => {
  if (profileJson) profileBox.value = profileJson;
});

document.getElementById("save").addEventListener("click", async () => {
  try {
    JSON.parse(profileBox.value);
    await chrome.storage.local.set({ profileJson: profileBox.value });
    setStatus("Profile saved.");
  } catch (error) {
    setStatus(`Invalid JSON: ${error.message}`);
  }
});

document.getElementById("fill").addEventListener("click", async () => {
  try {
    const result = await runOnPage("fill");
    setStatus(`Filled ${result.filled} field(s), skipped ${result.skipped}. Review before submitting.`);
  } catch (error) {
    setStatus(error.message);
  }
});

document.getElementById("highlight").addEventListener("click", async () => {
  try {
    const result = await runOnPage("highlight");
    setStatus(`Highlighted ${result.highlighted} fillable field(s).`);
  } catch (error) {
    setStatus(error.message);
  }
});

document.getElementById("clear").addEventListener("click", async () => {
  await chrome.storage.local.remove("profileJson");
  profileBox.value = "";
  setStatus("Saved profile cleared.");
});
