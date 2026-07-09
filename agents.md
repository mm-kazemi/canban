# agents.md

## Important: this is not about in-app agents

**Canban has no AI agents in its product surface.** It is a plain
React/TypeScript Kanban board with no LLM calls, no agent runtime, and no
`.claude/agents` custom subagents defined in this repo. If a future
conversation asks you to "update the agents" or "check agent behavior" in
the product sense, that request doesn't map to anything in this codebase —
stop and ask for clarification rather than inventing an agent feature.

This file exists for a different purpose: it documents how **AI coding
assistants** (Claude Code and similar tools) should divide labor when
working _on_ this repository, so a new AI session picks the same tools the
previous session used, instead of re-deriving a strategy from scratch.

## Assistant roles used on this repo

These map to Claude Code's built-in subagents/skills, scoped to how they're
actually useful here.

### 1. Explore (search/lookup agent)

- **Purpose**: locate code by pattern or keyword before editing.
- **When to use here**: "where is `BoardColor` used?", "which components
  read `SidebarContext`?", "find every place `dispatchLists` is called".
- **Input expectations**: a specific, narrow question — this repo is small
  (~70 source files), so most lookups are a single Grep/Glob away; only
  delegate to Explore for genuinely multi-location searches.
- **Output expectations**: file paths + line numbers, not a full rewrite.
  It is read-only — never expect it to edit files.

### 2. Plan

- **Purpose**: design an implementation strategy for a non-trivial change
  before touching code (e.g. "add a Settings page and wire up the sidebar
  link", "add schema versioning to the localStorage payload").
- **Input expectations**: the goal, plus known constraints from
  `CLAUDE.md` (no backend, no new state library, don't break existing
  `localStorage` shape).
- **Output expectations**: a step-by-step plan naming the exact files to
  touch (e.g. new route in `App.tsx`, new page under `src/pages/`, new
  sidebar entry in `SidebarGroups.tsx`), not prose only.

### 3. code-review / security-review skills

- **Purpose**: review a diff for correctness bugs, simplification
  opportunities, or security issues before it's considered done.
- **When to use here**: after any change to `src/reducer/*` (easy to
  introduce off-by-one bugs in `draft.splice`/`arrayMove` logic), to
  `src/schemas/*` (validation logic), or to any `*.module.css` — check that
  a new color-aware component actually follows the color-scoping pattern
  documented in `CLAUDE.md` (raw `BoardColor` string as `className`,
  `--color-main`/`--color-50`/`--color-100` consumed via `var()`) rather
  than a one-off hardcoded color.
- **Output expectations**: ranked findings with file:line references, per
  the tool's own reporting format — not a rewritten file.

### 4. verify / run skills

- **Purpose**: actually exercise a change instead of only type-checking it.
- **When to use here**: this is a UI-heavy app (drag-and-drop, modals,
  forms) — `tsc -b` passing does **not** mean the feature works. Use
  `npm run dev` and click through the affected flow (e.g. drag an item
  between two lists, submit the list-item form, check the toast fires)
  before reporting a UI change as complete.
- **Input expectations**: the specific user-facing flow that changed.
- **Output expectations**: an honest pass/fail per flow, including edge
  cases (e.g. dragging the last item out of a list, submitting a form with
  an empty title).

### 5. general-purpose agent

- **Purpose**: catch-all for multi-step tasks that don't need a specialized
  agent (e.g. "add a due-date badge to `ListItem` and update its CSS
  module and its schema default").
- **Use sparingly**: given the repo's small size, most tasks here are
  faster to do directly than to delegate.

## Handoff checklist for a new AI session picking this up

1. Read `README.md` (what the app does, stack, how to run it).
2. Read `CLAUDE.md` (hard rules, conventions, known tech debt — especially
   the `localStorage` schema-change rule and the mangled
   `collision-detection.ts\u200E.ts` filename).
3. Run `git log --oneline -20` to see the most recent work (commit style is
   `[TAG] description`).
4. Run `npm run lint` and `npm run build` once to confirm the baseline is
   clean before making changes.
5. Only then start planning new work.
