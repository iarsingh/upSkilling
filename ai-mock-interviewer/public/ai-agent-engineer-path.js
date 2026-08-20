(function () {
  const path = window.AI_AGENT_ENGINEER_PATH || { stages: [] };
  const container = document.querySelector("#agentStages");
  const search = document.querySelector("#agentSearch");
  const clear = document.querySelector("#agentClear");
  const status = document.querySelector("#agentStatus");
  const uniqueTopics = new Set(path.stages.flatMap((stage) => stage.topics));
  document.querySelector("#agentStageCount").textContent = path.stages.length;
  document.querySelector("#agentTopicCount").textContent = uniqueTopics.size;
  document.querySelector("#agentQuestionCount").textContent = uniqueTopics.size * 4;

  function escapeHtml(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  }
  function render(query = "") {
    const term = query.trim().toLowerCase();
    let count = 0;
    const html = path.stages.map((stage) => {
      const stageMatch = !term || stage.name.toLowerCase().includes(term) || stage.description.toLowerCase().includes(term);
      const topics = stageMatch ? stage.topics : stage.topics.filter((topic) => topic.toLowerCase().includes(term));
      if (!topics.length) return "";
      count += topics.length;
      return `<article class="panel prep-domain-card ds-stage-card"><div class="prep-domain-heading"><div><h2>${escapeHtml(stage.name)}</h2><p>${escapeHtml(stage.description)}</p></div><strong>${topics.length}</strong></div><div class="prep-topic-list">${topics.map((topic) => `<a href="/question-bank.html?search=${encodeURIComponent(topic)}">${escapeHtml(topic)}</a>`).join("")}</div></article>`;
    }).join("");
    container.innerHTML = html || `<section class="panel prep-empty"><h2>No matching agent-engineering skills</h2><p>Try a broader capability or technology.</p></section>`;
    status.textContent = term ? `Showing ${count} matching topic placements` : `Showing ${uniqueTopics.size} unique topics across ${path.stages.length} stages`;
    clear.hidden = !term;
  }
  search.addEventListener("input", () => render(search.value));
  clear.addEventListener("click", () => { search.value = ""; search.focus(); render(); });
  render();
})();
