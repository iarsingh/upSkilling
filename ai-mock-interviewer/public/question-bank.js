(function () {
  const STORAGE_KEY = "aiMockInterviewerReadingProgress";
  const content = document.querySelector("#qbContent");
  const progressCountEl = document.querySelector("#qbProgressCount");
  const progressFillEl = document.querySelector("#qbProgressFill");
  const searchEl = document.querySelector("#qbSearch");
  const jumpButton = document.querySelector("#qbJumpToLast");
  const resetProgressButton = document.querySelector("#qbResetProgress");
  const topicIndexEl = document.querySelector("#qbTopicIndex");
  const topicIndexTotalEl = document.querySelector("#qbTopicIndexTotal");
  const readerStatusEl = document.querySelector("#qbReaderStatus");
  const clearTopicButton = document.querySelector("#qbClearTopic");

  let entries = [];
  let activeCategory = "All categories";
  let seen = new Set();
  let lastId = null;
  let saveTimer = null;
  const READ_DWELL_MS = 2500;
  const SCROLL_SETTLE_MS = 450;
  const visibleQuestions = new Map();
  const readTimers = new Map();
  let scrollSettleTimer = null;
  let isScrolling = false;

  // Stable id from the question text itself (not array index), so re-running
  // the answer-bank build - which can add/remove/reorder entries - doesn't
  // silently invalidate everyone's existing reading bookmarks.
  function hashId(text) {
    const normalized = String(text || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    let hash = 2166136261;
    for (let i = 0; i < normalized.length; i++) {
      hash ^= normalized.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
  }

  function loadProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      seen = new Set(Array.isArray(saved.seen) ? saved.seen : []);
      lastId = saved.lastId || null;
    } catch {
      seen = new Set();
      lastId = null;
    }
  }

  function saveProgress() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        seen: Array.from(seen),
        lastId,
        updatedAt: new Date().toISOString()
      }));
    }, 300);
  }

  function updateProgressUi() {
    const total = entries.length;
    const read = entries.reduce((sum, entry) => sum + (seen.has(entry.qid) ? 1 : 0), 0);
    progressCountEl.textContent = `${read} / ${total} read`;
    progressFillEl.style.width = total ? `${Math.round((read / total) * 100)}%` : "0%";
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function groupByCategory(list) {
    const groups = new Map();
    for (const entry of list) {
      const key = entry.category || entry.topic || "General";
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key).push(entry);
    }
    return [...groups.keys()]
      .sort((left, right) => left.localeCompare(right))
      .map((key) => ({ category: key, items: groups.get(key) }));
  }

  function renderTopicIndex() {
    const counts = new Map();
    for (const entry of entries) {
      const category = entry.category || entry.topic || "General";
      counts.set(category, (counts.get(category) || 0) + 1);
    }
    const categories = [...counts.entries()].sort((left, right) => left[0].localeCompare(right[0]));
    topicIndexTotalEl.textContent = `${entries.length.toLocaleString()} total questions · ${categories.length} categories`;
    topicIndexEl.innerHTML = [["All categories", entries.length], ...categories].map(([category, count]) => `
      <button class="qb-topic-index-item${category === activeCategory ? " active" : ""}" type="button" role="listitem" data-category="${escapeHtml(category)}" aria-pressed="${category === activeCategory}">
        <span>${escapeHtml(category)}</span><strong>${count.toLocaleString()}</strong>
      </button>
    `).join("");
  }

  function render(list) {
    const categories = groupByCategory(list);
    if (!categories.length) {
      content.innerHTML = `<p class="qb-loading">No questions match your filter.</p>`;
      return;
    }
    content.innerHTML = categories.map((group) => `
      <details class="qb-section" open>
        <summary>${escapeHtml(group.category)} <span class="qb-section-count">${group.items.length}</span></summary>
        <div class="qb-section-body">
          ${group.items.map((entry) => `
            <article class="qb-question${seen.has(entry.qid) ? " qb-seen" : ""}" id="q-${entry.qid}" data-qid="${entry.qid}">
              <div class="qb-question-meta">
                ${entry.topic && entry.topic !== group.category ? `<span class="qb-category">${escapeHtml(entry.topic)}</span>` : ""}
                ${entry.questionType ? `<span class="qb-category qb-question-type">${escapeHtml(entry.questionType)}</span>` : ""}
              </div>
              <p class="qb-q">${escapeHtml(entry.question)}</p>
              <p class="qb-a">${escapeHtml(entry.answer)}</p>
            </article>
          `).join("")}
        </div>
      </details>
    `).join("");
    observeQuestions();
  }

  function cancelReadTimer(qid) {
    const timer = readTimers.get(qid);
    if (timer) clearTimeout(timer);
    readTimers.delete(qid);
  }

  function qualifiesAsReading(observed) {
    if (!observed.isIntersecting) return false;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const visibleHeight = observed.intersectionRect.height;
    const questionHeight = observed.boundingClientRect.height;
    return observed.intersectionRatio >= 0.5
      || (questionHeight > viewportHeight * 0.8 && visibleHeight >= viewportHeight * 0.5);
  }

  function startReadTimer(qid, element) {
    if (seen.has(qid) || readTimers.has(qid) || isScrolling || document.hidden || !document.hasFocus()) return;
    const timer = setTimeout(() => {
      readTimers.delete(qid);
      if (isScrolling || document.hidden || !document.hasFocus() || !visibleQuestions.has(qid)) return;
      seen.add(qid);
      lastId = qid;
      element.classList.add("qb-seen");
      updateProgressUi();
      saveProgress();
    }, READ_DWELL_MS);
    readTimers.set(qid, timer);
  }

  function resumeVisibleQuestions() {
    visibleQuestions.forEach((element, qid) => startReadTimer(qid, element));
  }

  function pauseReadingWhileScrolling() {
    isScrolling = true;
    readTimers.forEach((timer) => clearTimeout(timer));
    readTimers.clear();
    clearTimeout(scrollSettleTimer);
    scrollSettleTimer = setTimeout(() => {
      isScrolling = false;
      resumeVisibleQuestions();
    }, SCROLL_SETTLE_MS);
  }

  let observer = null;
  function observeQuestions() {
    if (observer) observer.disconnect();
    visibleQuestions.clear();
    readTimers.forEach((timer) => clearTimeout(timer));
    readTimers.clear();
    observer = new IntersectionObserver((observedEntries) => {
      observedEntries.forEach((observed) => {
        const qid = observed.target.dataset.qid;
        if (qualifiesAsReading(observed)) {
          visibleQuestions.set(qid, observed.target);
          startReadTimer(qid, observed.target);
        } else {
          visibleQuestions.delete(qid);
          cancelReadTimer(qid);
        }
      });
    }, { threshold: [0, 0.25, 0.5, 0.75] });

    content.querySelectorAll(".qb-question").forEach((el) => observer.observe(el));
  }

  window.addEventListener("scroll", pauseReadingWhileScrolling, { passive: true });
  window.addEventListener("blur", () => {
    readTimers.forEach((timer) => clearTimeout(timer));
    readTimers.clear();
  });
  window.addEventListener("focus", resumeVisibleQuestions);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      readTimers.forEach((timer) => clearTimeout(timer));
      readTimers.clear();
    } else {
      resumeVisibleQuestions();
    }
  });

  function applyFilter(query = searchEl.value) {
    const term = query.trim().toLowerCase();
    const filtered = entries.filter((entry) => {
      const category = entry.category || entry.topic || "General";
      const matchesCategory = activeCategory === "All categories" || category === activeCategory;
      const matchesSearch = !term
        || entry.question.toLowerCase().includes(term)
        || entry.answer.toLowerCase().includes(term)
        || (entry.category || "").toLowerCase().includes(term)
        || (entry.topic || "").toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
    const categoryLabel = activeCategory === "All categories" ? "all categories" : activeCategory;
    readerStatusEl.textContent = `Showing ${filtered.length.toLocaleString()} questions from ${categoryLabel}`;
    clearTopicButton.hidden = activeCategory === "All categories";
    render(filtered);
  }

  topicIndexEl.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    renderTopicIndex();
    applyFilter();
    content.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  clearTopicButton.addEventListener("click", () => {
    activeCategory = "All categories";
    renderTopicIndex();
    applyFilter();
  });

  jumpButton.addEventListener("click", () => {
    if (!lastId) {
      window.alert("No reading history yet - pause on a question long enough to read it first.");
      return;
    }
    const target = document.querySelector(`#q-${lastId}`);
    if (!target) {
      window.alert("That question isn't in the current filtered view. Clear the filter and try again.");
      return;
    }
    const details = target.closest("details");
    if (details) details.open = true;
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.classList.add("qb-highlight");
    setTimeout(() => target.classList.remove("qb-highlight"), 2000);
  });

  resetProgressButton.addEventListener("click", () => {
    seen.clear();
    lastId = null;
    readTimers.forEach((timer) => clearTimeout(timer));
    readTimers.clear();
    localStorage.removeItem(STORAGE_KEY);
    content.querySelectorAll(".qb-seen").forEach((element) => element.classList.remove("qb-seen"));
    updateProgressUi();
  });

  let searchTimer = null;
  searchEl.addEventListener("input", (event) => {
    clearTimeout(searchTimer);
    const value = event.target.value;
    searchTimer = setTimeout(() => applyFilter(value), 200);
  });

  async function init() {
    loadProgress();
    const initialSearch = new URLSearchParams(window.location.search).get("search") || "";
    if (initialSearch) searchEl.value = initialSearch;
    try {
      const response = await fetch("/qa-dataset.json");
      const data = await response.json();
      entries = (Array.isArray(data) ? data : []).map((entry) => ({ ...entry, qid: hashId(entry.question) }));
    } catch {
      entries = [];
    }
    if (!entries.length) {
      content.innerHTML = `<p class="qb-loading">Could not load the question bank.</p>`;
      return;
    }
    renderTopicIndex();
    applyFilter(initialSearch);
    updateProgressUi();
  }

  init();
})();
