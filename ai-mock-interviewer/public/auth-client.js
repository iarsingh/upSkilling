/*
 * Shared account-state script for index.html, session.html and admin.html.
 * Declarative: toggles any [data-auth-state="in"|"out"] element, fills in
 * [data-auth="name"|"email"|"initial"|"role"] text content, and wires up
 * every [data-action="sign-out"] control. Safe to include on public pages
 * too (index.html) since it degrades to the "signed out" state.
 */
(function () {
  function initials(name) {
    const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "?";
    return (parts[0][0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
  }

  function savedInterviewProfile() {
    try {
      const state = JSON.parse(localStorage.getItem("aiMockInterviewerState") || "{}");
      return {
        role: state.role || "No target role selected",
        accent: ({ "en-IN": "English — India", "en-US": "English — United States", "en-GB": "English — United Kingdom", "en-AU": "English — Australia", "en-CA": "English — Canada" })[state.micLanguage] || "English — India"
      };
    } catch {
      return { role: "No target role selected", accent: "English — India" };
    }
  }

  function closeProfileMenus(except) {
    document.querySelectorAll(".user-profile-popover").forEach((menu) => {
      if (menu === except) return;
      menu.hidden = true;
      menu.closest(".nav-auth")?.querySelector(".account-chip")?.setAttribute("aria-expanded", "false");
    });
  }

  function createProfileMenus(user) {
    const preference = savedInterviewProfile();
    document.querySelectorAll('[data-auth-state="in"] .account-chip').forEach((chip, index) => {
      chip.setAttribute("role", "button");
      chip.setAttribute("tabindex", "0");
      chip.setAttribute("aria-haspopup", "dialog");
      chip.setAttribute("aria-expanded", "false");
      chip.dataset.action = "toggle-profile";
      chip.classList.add("account-chip-interactive");

      if (!chip.querySelector(".account-chevron")) {
        const chevron = document.createElement("span");
        chevron.className = "account-chevron";
        chevron.setAttribute("aria-hidden", "true");
        chevron.textContent = "⌄";
        chip.appendChild(chevron);
      }

      const parent = chip.closest(".nav-auth");
      if (!parent || parent.querySelector(".user-profile-popover")) return;
      parent.classList.add("profile-menu-host");
      const menu = document.createElement("section");
      menu.className = "user-profile-popover";
      menu.id = `userProfilePopover-${index}`;
      menu.hidden = true;
      menu.setAttribute("role", "dialog");
      menu.setAttribute("aria-label", "User profile");
      chip.setAttribute("aria-controls", menu.id);

      const head = document.createElement("div");
      head.className = "profile-popover-head";
      const avatar = document.createElement("span");
      avatar.className = "profile-avatar-large";
      avatar.textContent = initials(user.name);
      const identity = document.createElement("span");
      const name = document.createElement("strong");
      name.textContent = user.name;
      const email = document.createElement("small");
      email.textContent = user.email;
      identity.append(name, email);
      head.append(avatar, identity);

      const facts = document.createElement("div");
      facts.className = "profile-facts";
      [["Account", user.role === "admin" ? "Administrator" : "Candidate"], ["Target role", preference.role], ["Speech accent", preference.accent]].forEach(([label, value]) => {
        const row = document.createElement("div");
        const key = document.createElement("span");
        key.textContent = label;
        const content = document.createElement("strong");
        content.textContent = value;
        row.append(key, content);
        facts.appendChild(row);
      });

      const actions = document.createElement("div");
      actions.className = "profile-popover-actions";
      const dashboard = document.createElement("a");
      dashboard.className = "ghost link-button small";
      dashboard.href = "/dashboard.html";
      dashboard.textContent = "Skills dashboard";
      const logout = document.createElement("button");
      logout.className = "danger small";
      logout.type = "button";
      logout.dataset.action = "sign-out";
      logout.textContent = "Sign out";
      actions.append(dashboard, logout);
      menu.append(head, facts, actions);
      parent.appendChild(menu);
    });
  }

  function applyUser(user) {
    document.querySelectorAll('[data-auth-state="in"]').forEach((el) => {
      el.hidden = !user;
    });
    document.querySelectorAll('[data-auth-state="out"]').forEach((el) => {
      el.hidden = Boolean(user);
    });
    if (!user) return;
    document.querySelectorAll('[data-auth="name"]').forEach((el) => {
      el.textContent = user.name;
    });
    document.querySelectorAll('[data-auth="email"]').forEach((el) => {
      el.textContent = user.email;
    });
    document.querySelectorAll('[data-auth="initial"]').forEach((el) => {
      el.textContent = initials(user.name);
    });
    document.querySelectorAll('[data-auth="role"]').forEach((el) => {
      el.textContent = user.role;
      el.hidden = user.role !== "admin";
    });
    document.querySelectorAll('[data-auth-admin-only]').forEach((el) => {
      el.hidden = user.role !== "admin";
    });
    createProfileMenus(user);
  }

  async function loadSession() {
    try {
      const response = await fetch("/api/auth/me", { credentials: "same-origin" });
      if (!response.ok) {
        applyUser(null);
        return null;
      }
      const data = await response.json();
      applyUser(data.user || null);
      return data.user || null;
    } catch {
      applyUser(null);
      return null;
    }
  }

  async function signOut() {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });
    } catch {
      // ignore network errors, still redirect
    }
    window.location.href = "/signin.html";
  }

  document.addEventListener("click", (event) => {
    const profileTrigger = event.target.closest('[data-action="toggle-profile"]');
    if (profileTrigger) {
      event.preventDefault();
      const menu = profileTrigger.closest(".nav-auth")?.querySelector(".user-profile-popover");
      if (!menu) return;
      const opening = menu.hidden;
      closeProfileMenus(opening ? menu : null);
      menu.hidden = !opening;
      profileTrigger.setAttribute("aria-expanded", String(opening));
      return;
    }
    const trigger = event.target.closest('[data-action="sign-out"]');
    if (trigger) {
      event.preventDefault();
      signOut();
      return;
    }
    if (!event.target.closest(".profile-menu-host")) closeProfileMenus();
  });

  document.addEventListener("keydown", (event) => {
    const trigger = event.target.closest?.('[data-action="toggle-profile"]');
    if (trigger && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      trigger.click();
    }
    if (event.key === "Escape") {
      closeProfileMenus();
      trigger?.focus();
    }
  });

  window.AiMockInterviewerAuth = { loadSession, signOut };
  loadSession();
})();
