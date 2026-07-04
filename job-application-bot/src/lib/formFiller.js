const { answerScreeningQuestion } = require("./ollama");

// Maps a normalized label/placeholder string to a value from the profile.
// Order matters - more specific patterns first.
function directAnswer(labelRaw, profile) {
  const label = labelRaw.toLowerCase();

  const table = [
    [/first\s*name/, profile.firstName],
    [/last\s*name/, profile.lastName],
    [/full\s*name|your\s*name/, profile.fullName],
    [/e-?mail/, profile.email],
    [/phone|mobile|contact\s*number/, profile.phone],
    [/linkedin/, profile.linkedin],
    [/git\s*hub/, profile.github],
    [/city/, profile.city],
    [/country/, profile.country],
    [/current\s*location|location/, profile.location],
    [/current\s*(ctc|salary|compensation)/, `${profile.currentCtcLpa} LPA`],
    [/expected\s*(ctc|salary|compensation)/, `${profile.expectedCtcLpa} LPA`],
    [/notice\s*period/, `${profile.noticePeriodDays} days`],
    [/years?\s*of\s*experience|total\s*experience|relevant\s*experience/, String(profile.yearsExperience)],
    [/work\s*authorization|authorized\s*to\s*work/, "Yes"],
    [/sponsorship/, "No"],
    [/relocat/, "Yes"],
    [/remote/, "Yes"],
    [/hybrid/, "Yes"],
    [/onsite|on-site|work\s*from\s*office/, "Yes"]
  ];

  for (const [pattern, value] of table) {
    if (pattern.test(label) && value !== undefined && value !== null) return value;
  }

  // Fall back to the profile's raw standardAnswers keyword map.
  for (const [key, value] of Object.entries(profile.standardAnswers || {})) {
    if (label.includes(key)) return value;
  }

  return null;
}

// Fills a single Playwright locator based on its label text and input type.
// Returns true if it took an action, false if it decided to leave it alone
// (e.g. no confident match found - safer to skip than to guess on required
// fields like resume upload, which the caller should handle separately).
async function fillField({ locator, label, inputType, profile, jobContext, allowLlmFallback = true }) {
  const known = directAnswer(label, profile);

  if (inputType === "select") {
    const options = await locator.locator("option").allTextContents();
    const target = known || label;
    const match = options.find((o) => o.toLowerCase().includes(String(target).toLowerCase()))
      || options.find((o) => /yes|any|all/i.test(o));
    if (match) {
      await locator.selectOption({ label: match });
      return true;
    }
    return false;
  }

  if (inputType === "radio" || inputType === "checkbox") {
    // Caller handles group semantics; this path just clicks a single option
    // whose visible text implies an affirmative/compatible answer.
    await locator.check();
    return true;
  }

  const value = known || (allowLlmFallback ? await answerScreeningQuestion(label, profile, jobContext) : null);
  if (!value) return false;

  await locator.fill(String(value));
  return true;
}

module.exports = { directAnswer, fillField };
