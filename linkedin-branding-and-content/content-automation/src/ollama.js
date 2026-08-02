const { ollamaHost, ollamaModel, ollamaTimeoutMs } = require("./config");

async function generateWithOllama(topic) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ollamaTimeoutMs);
  const levelMatch = topic.topic.match(/^\[(Beginner|Intermediate|Advanced|Expert)\]/);
  const interviewLevel = levelMatch ? levelMatch[1] : "Intermediate";
  const levelGuidance = {
    Beginner: "Teach the vocabulary, mental model, simplest working example, and common beginner misconception. Do not assume prior production experience.",
    Intermediate: "Explain implementation, tool choices, a realistic workflow, core metrics, and common operational failures.",
    Advanced: "Analyze architecture tradeoffs, scale, reliability, security, performance tuning, observability, and difficult debugging decisions.",
    Expert: "Treat this as a senior or staff-level system design discussion covering constraints, internals, capacity, failure domains, governance, cost, alternatives, and defensible decisions."
  };
  const revisionInstructions = topic.pillar === "AI Engineer Revision Series"
    ? [
        "This post is also a personal revision note. Make it useful for spaced review, not just social engagement.",
        `Interview depth: ${interviewLevel}. ${levelGuidance[interviewLevel]}`,
        "Structure the content around: one-sentence recall, mechanism or architecture flow, implementation details, production tradeoffs, failure and debugging signals, an interview lens, and a hands-on task.",
        "Use the answer field for a technically accurate interview answer and the flow field for 4-6 ordered architecture or debugging steps.",
        "Write as an authoritative engineering note, never as questions and answers. Present interview knowledge as direct guidance.",
        "Do not include literal labels such as Answer, Question, Scenario, Core principle, or Interview question anywhere in the generated text.",
        "Do not use question marks, rhetorical questions, quiz prompts, or invitations asking the reader to respond.",
        "Keep each point specific enough that the author can revisit the post later and recover the concept quickly."
      ]
    : [];
  const prompt = [
    "You are writing a professional LinkedIn post for an ML Platform and DevOps engineer.",
    "Write practical, in-depth content with a helpful tone: real production scenarios, concrete numbers or configs, and current industry context (tools, cloud services, or practices engineers are actually using in 2026).",
    "Avoid emojis. Avoid hype. Use short paragraphs and bullet points.",
    "Be technically precise. Do not invent acronyms, APIs, commands, metrics, or implementation details.",
    "Keep the complete rendered LinkedIn post between 2200 and 2900 characters. Make the body roughly 150-220 words and use the remaining fields efficiently.",
    "Go beyond generic advice: explain internals, implementation choices, failure modes, debugging signals, metrics, and production tradeoffs relevant to the requested interview level.",
    "Include a scenario field: a short, realistic production situation followed by the recommended engineering response. Do not end it with a question.",
    "Use an assertive CTA such as saving the note, testing the pattern, or applying the checklist. Never ask for comments or pose a question.",
    "Return valid JSON only with these fields: hook, body, answer, flow, scenario, bullets, cta, hashtags, imageTitle, imageSubtitle.",
    "The flow and bullets fields must be arrays of plain strings, never arrays of objects.",
    "For hashtags: include all required hashtags plus 2-3 additional hashtags that are currently relevant to this industry topic (specific tools, cloud platforms, or trends), for 5-7 total.",
    ...revisionInstructions,
    "",
    `Series: ${topic.pillar}`,
    `Audience: ${topic.audience}`,
    `Topic: ${topic.topic}`,
    `Required hashtags: ${topic.hashtags.join(" ")}`
  ].join("\n");

  let response;
  try {
    response = await fetch(`${ollamaHost}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        model: ollamaModel,
        prompt,
        stream: false,
        format: "json",
        options: {
          temperature: 0.72,
          num_predict: 1500
        }
      })
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(`Ollama request failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return JSON.parse(data.response);
}

module.exports = { generateWithOllama };
