# ServiceOS — Vue 3 Frontend

A Vue 3 + Vite single-page app for the ServiceOS operations platform: projects,
tasks, documents, workflows, clients, vendors, users, reporting/analytics, an
AI chatbot, agent studio, audit log, and settings — all backed by an in-memory
mock data store (no backend required).

This is a full rewrite of the original static HTML/CSS/JS prototype into a
proper component-based Vue application, completing the pages and shared
modules ("mock-data.js", "components.js", "charts.js") that the prototype's
own docs (`docs/PASSES.md`) had left unbuilt.

## Stack

- **Vue 3** (`<script setup>` SFCs) + **Vite**
- **Vue Router 4** — client-side routing for all 19 pages
- **Pinia** — central mock data store (`src/store/mockData.js`)
- Hand-rolled **SVG chart components** (line / donut / bar) — no chart library
- The original design system's CSS (`src/assets/style.css`), token-driven and
  theme-aware (light/dark), copied in unchanged and extended only where the
  prototype referenced classes that didn't exist yet (workflow stepper,
  workflow designer canvas)

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  assets/style.css      Design system (tokens, components) — theme-aware
  components/            Shared UI: IconSprite, StatCard, StatusBadge, ToastStack
  components/charts/     LineChart, DonutChart, BarChart (SVG, theme-aware)
  composables/           useTheme, useLang, useSidebar, useToast
  layouts/AppLayout.vue  Sidebar + header shell used by all authenticated routes
  router/                Route table for all pages
  store/mockData.js      All mock data (projects, tasks, users, vendors, …)
  views/                 One file per page (Dashboard, Projects, Tasks, …)
```

## Mock data / auth

Everything is mock data held in a Pinia store — there is no backend. The
login screen accepts any input and redirects to the dashboard.

## About `design-spec.md` / `docs/PASSES.md`

These are kept as reference: they document the design system and the
original page-by-page build plan that this app implements. The static
HTML/CSS/JS prototype they originally described has been replaced by
this Vue app.
