# ServiceOS UI — Build Passes

Front-end-only clickable, responsive HTML prototype. No backend, APIs, database, or business logic — every page is static markup with mock data and mock interactivity (`app.js`, `components.js`, `charts.js`, `mock-data.js`).

Legend: ✅ done · ⬜ not started

| Pass | File | Description | Status |
|---|---|---|---|
| 0 | `design-spec.md` | Defines the UI design language: colors, typography, spacing, components, icons, responsive rules, dark/light theme, RTL support. | ✅ |
| 1 | `css/style.css` | Complete design system implementing the spec — tokens, base styles, and every reusable component (buttons, cards, status rail, badges, forms, tables, kanban, modal/drawer, toasts, dropdowns, empty states, charts container). | ✅ |
| 2 | `index.html` | Application shell: sidebar, header (search, notifications, user menu), content area. | ✅ |
| 3 | `js/app.js` | Mock navigation, theme switch, language switch (RTL), page loading feedback, mock notifications/toasts. | ✅ |
| 4 | `login.html` | Authentication screen. | ✅ |
| 5 | `pages/dashboard.html` | Executive dashboard — KPIs, charts, recent activity, calendar, notifications. | ✅ |
| 6 | `pages/projects.html` | Project list. | ✅ |
| 7 | `pages/project-details.html` | Project workspace. | ⬜ |
| 8 | `pages/workflow.html` | Workflow visualization. | ⬜ |
| 9 | `pages/workflow-designer.html` | Drag-and-drop workflow designer. | ⬜ |
| 10 | `pages/templates.html` | Workflow templates. | ⬜ |
| 11 | `pages/tasks.html` | Task management — kanban, calendar, list views. | ⬜ |
| 12 | `pages/documents.html` | Document center. | ⬜ |
| 13 | `pages/users.html` | User management. | ⬜ |
| 14 | `pages/vendors.html` | Vendor management. | ⬜ |
| 15 | `pages/clients.html` | Client management. | ⬜ |
| 16 | `pages/reports.html` | Reporting. | ⬜ |
| 17 | `pages/analytics.html` | Analytics. | ⬜ |
| 18 | `pages/chatbot.html` | Communication — customer chatbot and knowledge chatbot. | ⬜ |
| 19 | `pages/notifications.html` | Notification center. | ⬜ |
| 20 | `pages/settings.html` | Administration — settings. | ⬜ |
| 21 | `pages/audit.html` | Administration — audit log. | ⬜ |
| 22 | `pages/agent-studio.html` | Administration — Business Agent Studio. | ⬜ |
| 23 | `js/components.js` | Reusable UI components (shared JS behind cards, tables, modals, etc. across pages). | ⬜ |
| 24 | `js/charts.js` | Dashboard and reporting charts, theme-aware. | ⬜ |
| 25 | `js/mock-data.js` | Sample data for the prototype (projects, tasks, users, vendors, clients, notifications, etc.). | ⬜ |

## Final structure

```
serviceos-ui/
│
├── index.html
├── login.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── components.js
│   ├── charts.js
│   └── mock-data.js
│
├── docs/
│   └── PASSES.md
│
└── pages/
    ├── dashboard.html
    ├── projects.html
    ├── project-details.html
    ├── workflow.html
    ├── workflow-designer.html
    ├── templates.html
    ├── tasks.html
    ├── documents.html
    ├── users.html
    ├── vendors.html
    ├── clients.html
    ├── reports.html
    ├── analytics.html
    ├── chatbot.html
    ├── notifications.html
    ├── settings.html
    ├── audit.html
    └── agent-studio.html
```
