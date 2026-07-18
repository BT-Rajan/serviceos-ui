# ServiceOS — Design Specification

**Subject:** ServiceOS is an operations platform for service businesses (agencies, consultancies, managed-service providers) to run projects, workflows, tasks, vendors, clients, and AI agents from one control surface.

**Audience:** Operations leads, project managers, and business owners who need at-a-glance status and fast drill-down — not a marketing site, a daily instrument panel.

**Design signature:** A **status rail** — a 3px colored left border used consistently on cards, table rows, kanban cards, and list items to encode state (running / success / warning / blocked) at a glance, the way an instrument panel uses indicator lights. This one device repeats everywhere so the whole product reads like a single coherent panel, not a stack of unrelated screens.

**Direction avoided on purpose:** no warm cream + terracotta, no near-black + acid-green, no zero-radius broadsheet columns. ServiceOS reads as a precise, cool-toned control panel — quiet surfaces, one saturated signal color, functional color only where it carries state.

---

## 1. Colors

### Light theme (default)
| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#F7F8F6` | App background |
| `--color-surface` | `#FFFFFF` | Cards, panels, header |
| `--color-surface-raised` | `#FFFFFF` | Modals, popovers (with shadow) |
| `--color-border` | `#E2E5E7` | Hairline borders, dividers |
| `--color-border-strong` | `#C8CDD1` | Input borders, emphasis dividers |
| `--color-ink` | `#14171C` | Primary text |
| `--color-slate` | `#5B6472` | Secondary text, placeholders |
| `--color-slate-soft` | `#8A93A0` | Tertiary text, icons at rest |
| `--color-signal` | `#2F6FED` | Primary actions, active nav, links, focus |
| `--color-signal-soft` | `#EAF1FE` | Signal-tinted backgrounds (selected rows, chips) |

### Status colors (same in both themes, functional — never decorative)
| Token | Hex | Meaning |
|---|---|---|
| `--status-running` | `#2F6FED` | In progress / active |
| `--status-success` | `#1F9D66` | Complete / healthy |
| `--status-warning` | `#C77C11` | Needs attention / at risk |
| `--status-danger` | `#D8452F` | Blocked / failed |
| `--status-neutral` | `#8A93A0` | Not started / archived |

### Dark theme
| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#0F1216` | App background |
| `--color-surface` | `#171B21` | Cards, panels, header |
| `--color-surface-raised` | `#1E232B` | Modals, popovers |
| `--color-border` | `#272D36` | Hairline borders |
| `--color-border-strong` | `#3A4250` | Input borders |
| `--color-ink` | `#EDEFF2` | Primary text |
| `--color-slate` | `#9BA4B0` | Secondary text |
| `--color-slate-soft` | `#6B7382` | Tertiary text |
| `--color-signal` | `#5B8DF7` | Brightened for contrast on dark |
| `--color-signal-soft` | `#1B2740` | Signal-tinted backgrounds |

Status colors keep their hue in dark mode but lift lightness ~8% for contrast: `--status-running: #5B8DF7; --status-success: #34B57D; --status-warning: #E0973A; --status-danger: #E56A50;`

Theme is applied via `[data-theme="light"]` / `[data-theme="dark"]` on `<html>`, all component CSS reads only tokens, never hex.

---

## 2. Typography

- **Display / headings:** `Space Grotesk` — geometric, slightly technical, used for H1–H4 and KPI numerals. Weights 500/700.
- **UI / body:** `Inter` — all body copy, labels, buttons, nav. Weights 400/500/600.
- **Data / mono:** `IBM Plex Mono` — timestamps, IDs, code, table figures, log/audit entries. Weight 400/500.

Loaded via Google Fonts in `style.css` (or `<link>` in each page head).

### Scale (1.25 ratio, 16px base)
| Token | Size | Line-height | Use |
|---|---|---|---|
| `--text-xs` | 12px | 16px | Captions, badges |
| `--text-sm` | 13px | 20px | Secondary text, table body |
| `--text-base` | 15px | 24px | Body, form inputs |
| `--text-lg` | 18px | 26px | Card titles |
| `--text-xl` | 22px | 30px | Section headings (H3) |
| `--text-2xl` | 28px | 36px | Page titles (H2) |
| `--text-3xl` | 36px | 44px | KPI numerals, H1 |

Mono figures use `font-variant-numeric: tabular-nums` everywhere numbers appear in tables/KPIs so columns align.

---

## 3. Spacing

4px base unit. Tokens: `--space-1: 4px, --space-2: 8px, --space-3: 12px, --space-4: 16px, --space-5: 24px, --space-6: 32px, --space-8: 48px, --space-10: 64px`.

- Card padding: `--space-5` (24px)
- Section gap: `--space-6` (32px)
- Form field gap: `--space-4` (16px)
- Sidebar item padding: `--space-3` `--space-4`

Border radius: `--radius-sm: 4px` (inputs, badges), `--radius-md: 6px` (cards, buttons), `--radius-lg: 10px` (modals). Never fully rounded except avatars/status dots.

Shadow: one elevation scale — `--shadow-sm` (cards at rest, barely visible), `--shadow-md` (dropdowns/popovers), `--shadow-lg` (modals). No shadow on hover-only states; use border color shift instead, to keep the panel feeling flat and precise.

---

## 4. Components (defined in style.css, built out pass by pass)

- **Buttons:** primary (signal fill), secondary (bordered), ghost (text-only), danger. Sizes sm/md/lg. Icon-only variant for toolbars.
- **Status rail card:** base card with `border-left: 3px solid var(--status-*)`.
- **Badge / chip:** status pill, filter chip (removable), tag.
- **Table:** hairline row dividers, mono tabular numerals, optional status rail on row hover/selection, sticky header.
- **Kanban card:** status rail, avatar stack, due-date chip, tag row.
- **Form controls:** text input, select, textarea, checkbox, radio, toggle, date picker trigger — all share one focus ring (`2px solid var(--color-signal)`, 2px offset).
- **Sidebar nav item:** icon + label, active state = signal-soft background + signal left rail (same device as cards — reinforces the signature).
- **Modal / drawer:** raised surface, `--radius-lg`.
- **Toast / notification:** status-rail card, top-right stack.
- **Avatar / avatar stack:** initials fallback, 3-max stack with `+N` overflow.
- **Empty state:** icon + one-line explanation + primary action, written as an invitation to act, not an apology.
- **Chart containers:** consistent card wrapper, legend in `--text-xs` mono, tooltip styled as a small raised surface.

---

## 5. Icons

Lucide icon set (outline, 1.5px stroke), loaded as inline SVG via the Lucide static CDN build, sized 16/18/20/24px matching the type scale they sit beside. Icons at rest use `--color-slate-soft`; active/selected icons use `--color-signal`; status icons use the matching `--status-*` color. No filled icon styles — outline only, for the instrument-panel feel.

---

## 6. Responsive rules

Breakpoints: `--bp-sm: 640px, --bp-md: 768px, --bp-lg: 1024px, --bp-xl: 1280px, --bp-2xl: 1536px`.

- **< 768px (mobile):** sidebar collapses to an off-canvas drawer triggered by a header menu button; header search collapses to an icon that expands to a full-width overlay; KPI grids and kanban columns stack to a single column; tables switch to a stacked card-per-row layout.
- **768–1024px (tablet):** sidebar collapses to icon-only rail (labels on hover/tooltip); content grids drop to 2 columns.
- **≥ 1024px (desktop):** full sidebar with labels, multi-column KPI/kanban/table layouts as designed per page.
- All interactive targets stay ≥ 40px tall on touch breakpoints.

---

## 7. Dark / Light theme

- Toggle lives in the header user menu and in Settings; persists via a mock local variable in `app.js` (no backend) and applied by swapping `data-theme` on `<html>`.
- Every component reads CSS custom properties only — no hard-coded hex in component CSS — so the toggle requires no per-component logic.
- Charts (charts.js) read the same tokens at render time so chart colors switch with the theme.

---

## 8. RTL support

- Toggle lives alongside language switch in the header/settings; sets `dir="rtl"` on `<html>`.
- All layout spacing uses logical CSS properties (`margin-inline-start`, `padding-inline-end`, `inset-inline-start`, etc.) instead of `left`/`right`, so mirroring is automatic.
- Sidebar flips to the right edge; the status rail (`border-left`) becomes `border-inline-start` so it correctly renders on the right in RTL.
- Directional icons (chevrons, arrows, breadcrumbs) are flipped via a `[dir="rtl"] .icon-directional { transform: scaleX(-1); }` rule; symmetric icons are left untouched.
- Number and date formatting stay LTR within RTL text per convention (mono figures, tabular nums).

---

*This spec is the single source of truth for Pass 1 (style.css) and every page that follows. Any new component introduced in later passes must be added here first.*
