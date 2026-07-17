/*
 * Shared light/dark theme toggle for every page. The actual theme switch
 * (reading localStorage / system preference and setting the data-theme
 * attribute before first paint) happens in a tiny inline script in each
 * page's <head> so there is no flash of the wrong theme. This file only
 * has to wire up the toggle button(s) after the DOM is interactive.
 */
(function () {
  var STORAGE_KEY = "aimi-theme";

  function getTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Private browsing / storage disabled - theme just won't persist.
    }
    document.querySelectorAll('[data-action="toggle-theme"]').forEach((button) => {
      button.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    });
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest('[data-action="toggle-theme"]');
    if (!trigger) return;
    setTheme(getTheme() === "dark" ? "light" : "dark");
  });

  // Keep every open tab of the app in sync if the theme changes elsewhere.
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY && (event.newValue === "dark" || event.newValue === "light")) {
      document.documentElement.setAttribute("data-theme", event.newValue);
    }
  });

  // If the user never picked explicitly, follow the OS setting live.
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
      let stored = null;
      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      if (!stored) {
        document.documentElement.setAttribute("data-theme", event.matches ? "dark" : "light");
      }
    });
  }

  setTheme(getTheme());
})();
