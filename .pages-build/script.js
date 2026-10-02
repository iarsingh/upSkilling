(() => {
  const root = document.documentElement;
  const themeBtn = document.getElementById("themeToggle");
  const stored = localStorage.getItem("theme");
  if (stored) root.setAttribute("data-theme", stored);

  const setTheme = (mode) => {
    root.setAttribute("data-theme", mode);
    localStorage.setItem("theme", mode);
    themeBtn.textContent = mode === "dark" ? "☾ dark" : "☀ light";
  };
  const current = () => {
    if (root.getAttribute("data-theme")) return root.getAttribute("data-theme");
    return matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  };
  setTheme(current());
  themeBtn.addEventListener("click", () => {
    setTheme(current() === "dark" ? "light" : "dark");
  });

  // Scroll-spy nav
  const navLinks = [...document.querySelectorAll(".nav-links a")];
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === id));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  // Copy email
  const copyBtn = document.getElementById("copyEmail");
  copyBtn.addEventListener("click", async () => {
    const email = copyBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      const original = copyBtn.textContent;
      copyBtn.textContent = "✓ copied";
      setTimeout(() => (copyBtn.textContent = original), 1500);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  });

  // Download / print
  const printResume = () => window.print();
  document.getElementById("downloadPdf").addEventListener("click", printResume);
  document.getElementById("heroResume")?.addEventListener("click", printResume);

  // Scroll progress bar
  const progress = document.getElementById("scrollProgress");
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = `${pct}%`;
  };
  document.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  // Reveal-on-scroll
  const reveal = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          reveal.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
})();
