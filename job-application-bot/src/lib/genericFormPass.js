const { fillField } = require("./formFiller");

// Site-agnostic "fill what's visible, then advance" loop for platforms
// without a hand-tuned adapter. Works reasonably on plain HTML forms;
// will not handle heavily custom widgets (drag-drop uploaders, rich
// autocomplete pickers, etc.) - those need a dedicated adapter.
async function genericFormPass(page, profile, jobContext, { maxSteps = 12, submitPattern = /submit/i, advancePattern = /next|continue/i, dryRun = false } = {}) {
  for (let step = 0; step < maxSteps; step++) {
    const inputs = await page.locator("input[type='text'], input[type='tel'], input[type='email'], input[type='number'], textarea").all();
    for (const input of inputs) {
      const existing = await input.inputValue().catch(() => "");
      if (existing) continue;
      const label = (await input.getAttribute("aria-label").catch(() => ""))
        || (await input.getAttribute("placeholder").catch(() => ""))
        || (await labelFor(page, input));
      try {
        await fillField({ locator: input, label, inputType: "text", profile, jobContext });
      } catch {
        /* leave unfillable field for manual follow-up */
      }
    }

    const submitBtn = page.getByRole("button", { name: submitPattern }).first();
    if (await submitBtn.count().catch(() => 0)) {
      if (dryRun) {
        console.log("  [dry-run] form filled, would click Submit here");
        return "dry_run";
      }
      await submitBtn.click();
      await new Promise((r) => setTimeout(r, 1500));
      return true;
    }

    const advanceBtn = page.getByRole("button", { name: advancePattern }).first();
    if (!(await advanceBtn.count().catch(() => 0))) return false;
    await advanceBtn.click();
    await new Promise((r) => setTimeout(r, 1200));
  }
  return false;
}

async function labelFor(page, locator) {
  const id = await locator.getAttribute("id").catch(() => null);
  if (!id) return "";
  const label = page.locator(`label[for="${id}"]`).first();
  if (await label.count().catch(() => 0)) return (await label.textContent()) || "";
  return "";
}

module.exports = { genericFormPass };
