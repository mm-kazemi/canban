# Canban

A lightweight, client-only Kanban board app. Create boards, organize work into
lists, and drag cards between them. Everything is stored in the browser
(`localStorage`) — there is no backend and no user accounts yet.

## Goals

- Provide a fast, no-signup Trello-style board for personal task tracking.
- Keep the stack minimal (no server, no database) while the UI/UX is refined.
- Serve as a clean base to later add persistence (real backend/auth) without
  rewriting the UI layer, since state access is already isolated behind
  React Context + reducers.

## Tech stack

| Concern          | Choice                                                                          |
| ---------------- | ------------------------------------------------------------------------------- |
| UI framework     | React 19 (`react-compiler` babel plugin enabled)                                |
| Language         | TypeScript (strict mode)                                                        |
| Build tool       | Vite 7                                                                          |
| Routing          | react-router 7                                                                  |
| State management | React Context + `useImmerReducer` (immer) — no Redux/Zustand                    |
| Drag & drop      | `@dnd-kit/core` + `@dnd-kit/sortable` with a custom collision detector          |
| Forms            | `react-hook-form` + `@hookform/resolvers/zod`                                   |
| Validation       | `zod`                                                                           |
| Styling          | CSS Modules (`*.module.css`) + `clsx` for conditional classes                   |
| Notifications    | `react-toastify`                                                                |
| Persistence      | Browser `localStorage` only (key: `boards`) — no backend                        |
| Lint/Format      | ESLint (typescript-eslint) + Prettier (`@trivago/prettier-plugin-sort-imports`) |
| Deployment       | Vercel (SPA rewrite in `vercel.json`)                                           |

No test framework is installed yet (no Vitest/Jest/Playwright in
`package.json`).

## Getting started

```bash
npm install
npm run dev        # start Vite dev server
```

Other scripts:

```bash
npm run build           # tsc -b && vite build
npm run preview         # preview the production build
npm run lint             # eslint .
npm run prettier:check   # check formatting
npm run prettier:fix     # auto-format
```

There are no environment variables and no backend to configure — the app
runs entirely in the browser.

## Styling architecture

There is no CSS framework (no Tailwind, no MUI). Styling is 100% hand-written
CSS, split into two layers:

1. **Global design tokens** — plain (non-module) stylesheets imported once
   in `src/main.tsx`:
   - `src/styles/colors.css` — a full gray/sky/emerald/yellow/orange/rose/
     violet color scale in `oklch()`, plus semantic aliases
     (`--color-surface-0..3`, `--color-text`, `--color-border`,
     `--color-primary*`, `--color-danger*`) and per-board-color "scope"
     classes (`.gray`, `.blue`, `.green`, `.yellow`, `.orange`, `.red`,
     `.purple`) that each redefine `--color-50` / `--color-100` /
     `--color-main`. See `CLAUDE.md` for how these scope classes are used.
   - `src/styles/shadow.css` — `--shadow-1` … `--shadow-4`.
   - `src/styles/shapes.css` — `--border-radius-1`, `--border-radius-2`.
   - `src/styles/typography.css` — a fluid type scale, `--fz-200` … `--fz-900`
     built with `clamp()`.
   - `src/index.css` — CSS reset, base element styles, and the global font
     (`Vazirmatn`, loaded from Google Fonts in `index.html` — a Persian-
     compatible typeface).
2. **Per-component CSS Modules** — every component folder has a colocated
   `Component.module.css`, using native CSS nesting and CSS logical
   properties (`block-size`, `inline-size`, `margin-inline`, etc.) instead
   of physical ones, which keeps the door open for RTL support later even
   though the app isn't RTL today (`index.html` has `lang="en"`, no `dir`
   attribute is set anywhere).

## How data flows (mental model)

1. `BoardsProvider` (mounted once in `RootLayout`) loads `BoardType[]` from
   `localStorage` (falling back to the seed data in `src/data/boards-data.ts`
   on first run) and saves back to `localStorage` on every change.
2. Navigating to `/board/:id` looks up the board by id and wraps it in
   `BoardPageProvider` → `ListProvider` → `DndProvider`.
3. `ListProvider` owns its own `useImmerReducer` for the board's `lists`, and
   syncs that state back up into `BoardsContext` via `dispatchBoards` in a
   `useEffect`. This is why `ListProvider` is remounted with `key={id}`
   in `BoardPage.tsx` — it resets local list state per board.
4. `DndProvider` wires `@dnd-kit` sensors/events into `dispatchLists` actions
   (`item_dragged_over`, `item_dragged_end`, `list_dragged_end`).

For the full set of project conventions, known gaps, and rules an AI or new
contributor must follow when continuing this work, see [`CLAUDE.md`](CLAUDE.md).
For the description of how AI coding assistants should collaborate on this
repo (there are no in-app/runtime AI agents), see [`agents.md`](agents.md).

## Current feature set

- Create / edit / delete boards (title, description, color).
- Create / edit / delete lists within a board.
- Create / edit / delete list items (title, description, due date).
- Drag-and-drop reordering of lists and items, including moving items
  between lists.
- Collapsible sidebar with navigation to Home and each board.
- Toast notifications on create/edit/remove actions.
- 404 handling for unknown routes and unknown board ids.

## Known gaps / not yet implemented

These are visible in the UI or config but not functional — don't assume
they work:

- **No auth**: the "Sign Out" sidebar item and a `/settings` link are
  present in the UI, but there is no `/settings` route registered in
  `App.tsx` and no auth logic anywhere. Clicking either does not do what a
  user would expect (`/settings` falls through to the 404 page).
- **No dark mode**: a `MingcuteMoonStarsLine` icon exists in `src/icons/`
  but is unused — no theme toggle is wired up.
- **`Header` component is dead code**: `src/components/Header/Header.tsx`
  isn't imported anywhere (don't confuse it with `List/ListHeader`, which
  is used).
- **No tests**: there is no test setup at all yet.
- **`src/App.module.css` is unused** — `App.tsx` doesn't import it.
- **`--fz-100` design token is defined but empty** (`src/styles/typography.css`)
  — don't use it until it's given a value.
