/* =========================================================
   ServiceOS — app.js
   Pass 3 — mock navigation, theme switch, language switch,
            page loading, mock notifications.
   No backend: all state is either derived from the current
   page or persisted to localStorage for a consistent demo
   feel across the static pages.
   ========================================================= */

(function () {
  "use strict";

  /* ------------------------------------------------------
     Helpers
     ------------------------------------------------------ */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const store = {
    get(key, fallback) {
      try {
        const v = localStorage.getItem(key);
        return v === null ? fallback : v;
      } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch (e) { /* noop */ }
    }
  };

  /* ------------------------------------------------------
     1. THEME (dark / light)
     ------------------------------------------------------ */
  const ThemeModule = {
    key: "serviceos-theme",
    init() {
      const saved = store.get(this.key, "light");
      this.apply(saved);
      const btn = $("#themeToggleBtn");
      if (btn) btn.addEventListener("click", () => this.toggle());
    },
    apply(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      const icon = $("#themeIcon use");
      if (icon) icon.setAttribute("href", theme === "dark" ? "#icon-sun" : "#icon-moon");
    },
    toggle() {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "light" ? "dark" : "light";
      store.set(this.key, next);
      this.apply(next);
      NotificationsModule.toast({
        title: `Switched to ${next} theme`,
        status: "success"
      });
    }
  };

  /* ------------------------------------------------------
     2. LANGUAGE / RTL
     ------------------------------------------------------ */
  const LanguageModule = {
    key: "serviceos-lang",
    langs: { en: { dir: "ltr", label: "English" }, ar: { dir: "rtl", label: "العربية" } },
    init() {
      const saved = store.get(this.key, "en");
      this.apply(saved);
      const btn = $("#langToggleBtn");
      if (btn) btn.addEventListener("click", () => this.toggle());
    },
    apply(lang) {
      const cfg = this.langs[lang] || this.langs.en;
      document.documentElement.setAttribute("lang", lang);
      document.documentElement.setAttribute("dir", cfg.dir);
    },
    toggle() {
      const current = store.get(this.key, "en");
      const next = current === "en" ? "ar" : "en";
      store.set(this.key, next);
      this.apply(next);
      NotificationsModule.toast({
        title: `Language set to ${this.langs[next].label}`,
        status: "running"
      });
    }
  };

  /* ------------------------------------------------------
     3. SIDEBAR (collapse on desktop, drawer on mobile)
     ------------------------------------------------------ */
  const SidebarModule = {
    key: "serviceos-sidebar-collapsed",
    init() {
      const shell = $("#appShell");
      if (!shell) return;

      if (store.get(this.key, "0") === "1") {
        shell.classList.add("sidebar-collapsed");
      }

      const collapseBtn = $("#sidebarCollapseBtn");
      if (collapseBtn) {
        collapseBtn.addEventListener("click", () => {
          const collapsed = shell.classList.toggle("sidebar-collapsed");
          store.set(this.key, collapsed ? "1" : "0");
        });
      }

      const mobileToggle = $("#sidebarMobileToggle");
      const sidebar = $("#appSidebar");
      if (mobileToggle && sidebar) {
        mobileToggle.addEventListener("click", () => sidebar.classList.toggle("open"));
        document.addEventListener("click", (e) => {
          if (window.innerWidth > 767) return;
          if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
            sidebar.classList.remove("open");
          }
        });
      }
    }
  };

  /* ------------------------------------------------------
     4. NAVIGATION (active state + mock page loading)
     ------------------------------------------------------ */
  const NavModule = {
    init() {
      this.highlightActive();
      // Mock "page loading" transition on any internal nav click —
      // there is no router here, links navigate normally; this just
      // gives the click a moment of feedback before the browser
      // follows the href, so it reads like a real app transition.
      $$(".nav-item[href]").forEach((link) => {
        link.addEventListener("click", () => {
          document.body.classList.add("is-loading");
        });
      });
    },
    highlightActive() {
      const path = window.location.pathname.split("/").pop() || "index.html";
      const page = path.replace(".html", "") || "dashboard";
      $$(".nav-item[data-page]").forEach((link) => {
        link.classList.toggle("active", link.dataset.page === page);
      });
    }
  };

  /* ------------------------------------------------------
     5. DROPDOWNS (notifications, user menu)
     ------------------------------------------------------ */
  const DropdownModule = {
    init() {
      this.wireNotifDropdown();
      this.wireUserMenu();
      document.addEventListener("click", (e) => {
        $$(".dropdown-panel.open").forEach((panel) => {
          const trigger = panel.parentElement.querySelector("[data-dropdown-trigger]");
          if (!panel.contains(e.target) && trigger && !trigger.contains(e.target)) {
            panel.classList.remove("open");
          }
        });
      });
    },
    wireNotifDropdown() {
      const btn = $("#notifBtn");
      if (!btn) return;
      btn.setAttribute("data-dropdown-trigger", "");
      const wrap = document.createElement("div");
      wrap.className = "dropdown";
      btn.parentNode.insertBefore(wrap, btn);
      wrap.appendChild(btn);

      const panel = document.createElement("div");
      panel.className = "dropdown-panel wide";
      panel.id = "notifPanel";
      panel.innerHTML = `
        <div class="dropdown-header">
          <span>Notifications</span>
          <button class="btn btn-ghost btn-sm" id="notifMarkAllBtn">Mark all read</button>
        </div>
        <div id="notifList"></div>
      `;
      wrap.appendChild(panel);

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        panel.classList.toggle("open");
      });

      this.renderNotifList();
      const markAll = $("#notifMarkAllBtn");
      if (markAll) markAll.addEventListener("click", () => {
        const dot = $("#notifBtn .notif-dot");
        if (dot) dot.style.display = "none";
      });
    },
    renderNotifList() {
      const list = $("#notifList");
      if (!list) return;
      const items = (window.MOCK_DATA && window.MOCK_DATA.notifications) || NotificationsModule.fallback;
      list.innerHTML = items.slice(0, 5).map((n) => `
        <div class="notif-item status-${n.status}">
          <svg class="icon icon-sm icon-muted"><use href="#icon-${n.icon || "bell"}"/></svg>
          <div>
            <div class="notif-item-title">${n.title}</div>
            <div class="notif-item-meta">${n.time}</div>
          </div>
        </div>
      `).join("");
    },
    wireUserMenu() {
      const btn = $("#userMenuBtn");
      if (!btn) return;
      btn.setAttribute("data-dropdown-trigger", "");
      const wrap = document.createElement("div");
      wrap.className = "dropdown";
      btn.parentNode.insertBefore(wrap, btn);
      wrap.appendChild(btn);

      const panel = document.createElement("div");
      panel.className = "dropdown-panel";
      panel.innerHTML = `
        <div class="dropdown-header">Rukmani Bala</div>
        <button class="dropdown-item"><svg class="icon icon-sm"><use href="#icon-user"/></svg>Profile</button>
        <button class="dropdown-item" data-nav="settings"><svg class="icon icon-sm"><use href="#icon-settings"/></svg>Settings</button>
        <div class="dropdown-divider"></div>
        <button class="dropdown-item" id="logoutBtn"><svg class="icon icon-sm"><use href="#icon-log-out"/></svg>Log out</button>
      `;
      wrap.appendChild(panel);

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        panel.classList.toggle("open");
      });

      const settingsItem = panel.querySelector('[data-nav="settings"]');
      if (settingsItem) settingsItem.addEventListener("click", () => {
        window.location.href = window.location.pathname.includes("/pages/") ? "settings.html" : "pages/settings.html";
      });

      const logoutBtn = $("#logoutBtn");
      if (logoutBtn) logoutBtn.addEventListener("click", () => {
        window.location.href = window.location.pathname.includes("/pages/") ? "../login.html" : "login.html";
      });
    }
  };

  /* ------------------------------------------------------
     6. MOCK NOTIFICATIONS / TOASTS
     ------------------------------------------------------ */
  const NotificationsModule = {
    fallback: [
      { title: "Workflow \u201cClient Onboarding\u201d completed", time: "2m ago", status: "success", icon: "check-square" },
      { title: "Invoice #4021 needs approval", time: "18m ago", status: "warning", icon: "file" },
      { title: "Vendor sync failed — retrying", time: "1h ago", status: "danger", icon: "truck" }
    ],
    toast({ title, message, status = "running", duration = 4000 }) {
      const stack = $("#toastStack");
      if (!stack) return;
      const el = document.createElement("div");
      el.className = `toast status-${status}`;
      el.innerHTML = `
        <svg class="icon icon-sm"><use href="#icon-${status === "success" ? "check-square" : status === "danger" ? "x" : status === "warning" ? "bell" : "bar-chart"}"/></svg>
        <div>
          <div style="font-size:var(--text-sm);font-weight:500;">${title}</div>
          ${message ? `<div style="font-size:var(--text-xs);color:var(--color-slate);margin-top:2px;">${message}</div>` : ""}
        </div>
      `;
      stack.appendChild(el);
      setTimeout(() => el.remove(), duration);
    }
  };
  window.ServiceOSToast = NotificationsModule.toast.bind(NotificationsModule);

  /* ------------------------------------------------------
     7. SEARCH SHORTCUT ( / to focus )
     ------------------------------------------------------ */
  const SearchModule = {
    init() {
      const input = $("#globalSearchInput");
      if (!input) return;
      document.addEventListener("keydown", (e) => {
        if (e.key === "/" && document.activeElement !== input) {
          e.preventDefault();
          input.focus();
        }
        if (e.key === "Escape" && document.activeElement === input) {
          input.blur();
        }
      });
    }
  };

  /* ------------------------------------------------------
     Init
     ------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    ThemeModule.init();
    LanguageModule.init();
    SidebarModule.init();
    NavModule.init();
    DropdownModule.init();
    SearchModule.init();

    // One mock notification on first load, so the toast pattern is visible.
    setTimeout(() => {
      NotificationsModule.toast({
        title: "Welcome back, Rukmani",
        message: "3 tasks are due today.",
        status: "running"
      });
    }, 600);
  });
})();
