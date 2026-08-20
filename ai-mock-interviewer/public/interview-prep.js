(function () {
  const domains = Array.isArray(window.INTERVIEW_PREP_DOMAINS) ? window.INTERVIEW_PREP_DOMAINS : [];
  const grid = document.querySelector("#prepDomains");
  const search = document.querySelector("#prepSearch");
  const clear = document.querySelector("#prepClear");
  const status = document.querySelector("#prepStatus");
  const domainCount = document.querySelector("#prepDomainCount");
  const topicCount = document.querySelector("#prepTopicCount");
  const roleMatrix = Array.isArray(window.INTERVIEW_PREP_ROLE_MATRIX) ? window.INTERVIEW_PREP_ROLE_MATRIX : [];
  const aiEngineer = window.INTERVIEW_PREP_AI_ENGINEER || {};
  const roleMatrixBody = document.querySelector("#prepRoleMatrix");

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function questionBankUrl(topic) {
    return `/question-bank.html?search=${encodeURIComponent(topic)}`;
  }

  function render(query = "") {
    const term = query.trim().toLowerCase();
    const visible = domains.map((domain) => {
      const domainMatches = !term || domain.name.toLowerCase().includes(term) || domain.description.toLowerCase().includes(term);
      const topics = domainMatches ? domain.topics : domain.topics.filter((topic) => topic.toLowerCase().includes(term));
      return { ...domain, topics };
    }).filter((domain) => domain.topics.length);
    const visibleTopics = visible.reduce((total, domain) => total + domain.topics.length, 0);

    grid.innerHTML = visible.length ? visible.map((domain, index) => `
      <article class="panel prep-domain-card">
        <div class="prep-domain-heading">
          <span class="prep-domain-number">${String(index + 1).padStart(2, "0")}</span>
          <div>
            <h2>${escapeHtml(domain.name)}</h2>
            <p>${escapeHtml(domain.description)}</p>
          </div>
          <strong>${domain.topics.length}</strong>
        </div>
        <div class="prep-topic-list">
          ${domain.topics.map((topic) => `<a href="${questionBankUrl(topic)}" title="Study ${escapeHtml(topic)} questions">${escapeHtml(topic)}</a>`).join("")}
        </div>
      </article>
    `).join("") : `<section class="panel prep-empty"><h2>No matching skills</h2><p>Try a broader technology or domain name.</p></section>`;

    status.textContent = term
      ? `Showing ${visibleTopics} matching topics across ${visible.length} domains`
      : `Showing all ${visibleTopics} topics across ${visible.length} domains`;
    clear.hidden = !term;
  }

  const uniqueTopics = new Set(domains.flatMap((domain) => domain.topics.map((topic) => topic.toLowerCase())));
  domainCount.textContent = domains.length;
  topicCount.textContent = uniqueTopics.size;

  function stars(rating) {
    return `${"★".repeat(rating)}${"☆".repeat(5 - rating)}`;
  }

  roleMatrixBody.innerHTML = roleMatrix.map((row) => `
    <tr>
      <td>${escapeHtml(row.skill)}</td>
      <td aria-label="${row.dataScientist} out of 5">${stars(row.dataScientist)}</td>
      <td aria-label="${row.mlEngineer} out of 5">${stars(row.mlEngineer)}</td>
    </tr>
  `).join("");
  document.querySelector("#prepAiEngineerTitle").textContent = aiEngineer.title || "";
  document.querySelector("#prepAiEngineerSummary").textContent = aiEngineer.summary || "";

  search.addEventListener("input", () => render(search.value));
  clear.addEventListener("click", () => {
    search.value = "";
    search.focus();
    render();
  });

  render();
})();
