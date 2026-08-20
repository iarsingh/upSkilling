(function () {
  const path = window.DATA_SCIENCE_PATH || { stages: [] };
  const domains = Array.isArray(window.INTERVIEW_PREP_DOMAINS) ? window.INTERVIEW_PREP_DOMAINS : [];
  const domainMap = new Map(domains.map((domain) => [domain.name, domain]));
  const container = document.querySelector("#dsStages");
  const search = document.querySelector("#dsSearch");
  const clear = document.querySelector("#dsClear");
  const status = document.querySelector("#dsStatus");

  function escapeHtml(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  }

  const stages = path.stages.map((stage) => ({
    ...stage,
    domains: stage.domains.map((name) => domainMap.get(name)).filter(Boolean)
  }));
  const allTopics = new Set(stages.flatMap((stage) => stage.domains.flatMap((domain) => domain.topics.map((topic) => topic.toLowerCase()))));
  document.querySelector("#dsStageCount").textContent = stages.length;
  document.querySelector("#dsTopicCount").textContent = allTopics.size;

  function render(query = "") {
    const term = query.trim().toLowerCase();
    let visibleTopics = 0;
    const html = stages.map((stage) => {
      const visibleDomains = stage.domains.map((domain) => {
        const domainMatch = !term || domain.name.toLowerCase().includes(term) || domain.description.toLowerCase().includes(term);
        const topics = domainMatch ? domain.topics : domain.topics.filter((topic) => topic.toLowerCase().includes(term));
        return { ...domain, topics };
      }).filter((domain) => domain.topics.length);
      if (!visibleDomains.length) return "";
      visibleTopics += visibleDomains.reduce((sum, domain) => sum + domain.topics.length, 0);
      return `
        <article class="panel prep-domain-card ds-stage-card">
          <div class="prep-domain-heading">
            <div><h2>${escapeHtml(stage.name)}</h2><p>${escapeHtml(stage.description)}</p></div>
            <strong>${visibleDomains.length}</strong>
          </div>
          ${visibleDomains.map((domain) => `
            <section class="ds-domain-block">
              <h3>${escapeHtml(domain.name)}</h3>
              <p>${escapeHtml(domain.description)}</p>
              <div class="prep-topic-list">${domain.topics.map((topic) => `<a href="/question-bank.html?search=${encodeURIComponent(topic)}">${escapeHtml(topic)}</a>`).join("")}</div>
            </section>
          `).join("")}
        </article>`;
    }).join("");
    container.innerHTML = html || `<section class="panel prep-empty"><h2>No matching Data Science skills</h2><p>Try a broader concept or technology.</p></section>`;
    status.textContent = term ? `Showing ${visibleTopics} matching topics` : `Showing all ${visibleTopics} topics across ${stages.length} stages`;
    clear.hidden = !term;
  }

  search.addEventListener("input", () => render(search.value));
  clear.addEventListener("click", () => { search.value = ""; search.focus(); render(); });
  render();
})();
