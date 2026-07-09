(() => {
  if (window.jobApplicationFiller) return;

  function normalize(value) {
    return String(value || "").toLowerCase().replace(/\s+/g, " ").trim();
  }

  function directAnswer(labelRaw, profile) {
    const label = normalize(labelRaw);
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
      [/current\s*(ctc|salary|compensation)/, `${profile.currentCtcLpa || ""} LPA`],
      [/expected\s*(ctc|salary|compensation)/, `${profile.expectedCtcLpa || ""} LPA`],
      [/notice\s*period/, `${profile.noticePeriodDays || ""} days`],
      [/years?\s*of\s*experience|total\s*experience|relevant\s*experience/, String(profile.yearsExperience || "")],
      [/work\s*authorization|authorized\s*to\s*work/, "Yes"],
      [/sponsorship/, "No"],
      [/relocat/, "Yes"],
      [/remote/, "Yes"],
      [/hybrid/, "Yes"],
      [/onsite|on-site|work\s*from\s*office/, "Yes"]
    ];

    for (const [pattern, value] of table) {
      if (pattern.test(label) && value !== undefined && value !== null && String(value).trim()) return value;
    }

    for (const [key, value] of Object.entries(profile.standardAnswers || {})) {
      if (label.includes(normalize(key))) return value;
    }

    return null;
  }

  function labelFor(field) {
    const aria = field.getAttribute("aria-label");
    if (aria) return aria;

    const placeholder = field.getAttribute("placeholder");
    if (placeholder) return placeholder;

    if (field.id) {
      const label = document.querySelector(`label[for="${CSS.escape(field.id)}"]`);
      if (label?.textContent?.trim()) return label.textContent.trim();
    }

    const wrappingLabel = field.closest("label");
    if (wrappingLabel?.textContent?.trim()) return wrappingLabel.textContent.trim();

    const container = field.closest("div, section, fieldset, li");
    return container?.textContent?.slice(0, 200).trim() || "";
  }

  function setNativeValue(field, value) {
    const prototype = field.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");
    descriptor.set.call(field, String(value));
    field.dispatchEvent(new Event("input", { bubbles: true }));
    field.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function fillTextFields(profile) {
    let filled = 0;
    let skipped = 0;
    const selector = "input:not([type]), input[type='text'], input[type='tel'], input[type='email'], input[type='number'], input[type='url'], textarea";
    for (const field of document.querySelectorAll(selector)) {
      if (field.disabled || field.readOnly || field.offsetParent === null || field.value) continue;
      const answer = directAnswer(labelFor(field), profile);
      if (!answer) {
        skipped++;
        continue;
      }
      setNativeValue(field, answer);
      field.style.outline = "2px solid #1f6feb";
      filled++;
    }
    return { filled, skipped };
  }

  function fillSelects(profile) {
    let filled = 0;
    let skipped = 0;
    for (const field of document.querySelectorAll("select")) {
      if (field.disabled || field.value) continue;
      const answer = normalize(directAnswer(labelFor(field), profile));
      const options = Array.from(field.options);
      const match = options.find((option) => normalize(option.textContent).includes(answer))
        || options.find((option) => /yes|any|all/i.test(option.textContent));
      if (!match) {
        skipped++;
        continue;
      }
      field.value = match.value;
      field.dispatchEvent(new Event("change", { bubbles: true }));
      field.style.outline = "2px solid #1f6feb";
      filled++;
    }
    return { filled, skipped };
  }

  function fillRadioGroups(profile) {
    let filled = 0;
    let skipped = 0;
    for (const group of document.querySelectorAll("fieldset")) {
      const radios = Array.from(group.querySelectorAll("input[type='radio']"));
      if (!radios.length || radios.some((radio) => radio.checked)) continue;
      const expected = normalize(directAnswer(group.textContent, profile));
      const match = radios.find((radio) => {
        const label = labelFor(radio);
        return expected && normalize(label).includes(expected);
      });
      if (!match) {
        skipped++;
        continue;
      }
      match.click();
      group.style.outline = "2px solid #1f6feb";
      filled++;
    }
    return { filled, skipped };
  }

  function highlightFields() {
    const fields = document.querySelectorAll("input, textarea, select, fieldset");
    for (const field of fields) {
      if (!field.disabled && field.offsetParent !== null) field.style.outline = "2px solid #f59e0b";
    }
    return { highlighted: fields.length };
  }

  window.jobApplicationFiller = {
    run(profileJson, action) {
      if (action === "highlight") return highlightFields();

      const profile = JSON.parse(profileJson);
      const text = fillTextFields(profile);
      const selects = fillSelects(profile);
      const radios = fillRadioGroups(profile);

      return {
        filled: text.filled + selects.filled + radios.filled,
        skipped: text.skipped + selects.skipped + radios.skipped
      };
    }
  };
})();
