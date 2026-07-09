# CLAUDE.md

Guidance for any AI assistant (Claude Code or otherwise) continuing work on
**Canban**. Read [`README.md`](README.md) first for the project overview and
architecture summary. This file covers rules, conventions, and traps that
aren't obvious just from reading the code.

## Project reality check

- This is a **client-only** app. There is no backend, no API, no database.
  "Persistence" means `JSON.stringify`/`JSON.parse` against `localStorage`
  under the single key `"boards"` (see `src/providers/BoardsProvider.tsx`).
- There are **no AI agents running inside this app**. If a task or a stale
  memory/doc mentions "agents", it refers to AI coding-assistant workflow
  (see [`agents.md`](agents.md)), never to a runtime feature of Canban
  itself. Don't invent agent-related product features unless the user
  explicitly asks for them.
- There is **no test suite**. Don't claim "tests pass" — there are none to
  run. Verify changes by running `npm run dev` and exercising the feature
  in a browser, and by running `npm run lint` / `npm run build` (which
  runs `tsc -b`) to catch type errors.

## Hard rules

1. **Don't add a backend, auth, or a new state library (Redux/Zustand/etc.)
   without explicit user confirmation.** The whole app is intentionally
   backend-less and uses Context + `useImmerReducer`. This is a deliberate,
   not accidental, choice.
2. **Don't change the shape of `BoardType` / `ListType` / `ListItemType`
   (`src/types/`) without a migration plan.** Existing users' `localStorage`
   data won't match a changed schema, and `BoardsProvider.load()` does a
   raw `JSON.parse` with no versioning or validation — a shape change can
   silently break every returning visitor. If you must change the shape,
   handle old-shape data defensively in `load()`.
3. **Never fabricate a "tests pass" or "verified in browser" claim.** If you
   can't launch a browser, say so explicitly per the global verification
   policy.
4. **Run `npm run lint` and `npm run prettier:fix` before considering a
   change done.** ESLint enforces:
   - `@typescript-eslint/explicit-function-return-type` (every function
     component/handler must declare its return type — this codebase writes
     `: ReactNode` and `: void` everywhere; match that style).
   - `@typescript-eslint/explicit-member-accessibility`.
     Prettier uses `@trivago/prettier-plugin-sort-imports` with a fixed
     `importOrder` in `.prettierrc.json` — don't hand-order imports, let
     `prettier:fix` do it.
5. **Follow the existing commit-message convention** if asked to commit:
   `git log` shows a bracketed-tag style, e.g. `[ADD] sidebar component`,
   `[FIX] 404`, `[REFACTOR] board modal`, `[HOT FIX]`, `[SYNC]`, `[MOVE]`,
   `[UPDATE] prettier`. Match this style unless told otherwise. (Standard
   repo-wide git safety rules — no force-push, no amending others' commits,
   confirm before pushing — still apply on top of this.)

## Code conventions observed in this repo

- **One component per folder**, PascalCase folder + file name, colocated
  `Component.module.css`. Sub-components live in a `components/` subfolder
  (e.g. `Board/components/board-lists/BoardLists.tsx`, `Sidebar/components/...`).
  CSS class lookups use bracket access for kebab-case classes
  (`styles["board-page"]`) and dot access for camelCase-safe single-word
  classes (`styles.board`).
- **State pattern**: Context (`src/context/*.ts`, plain `createContext`) +
  reducer (`src/reducer/*.ts`, pure functions mutating an Immer `Draft`) +
  Provider component (`src/providers/*.tsx`, wires `useImmerReducer` to the
  context and often syncs state upward via `useEffect`). When adding new
  board/list/item state, extend the existing reducer's discriminated-union
  `Action` type rather than introducing a new store.
- **Forms**: `react-hook-form` + `zodResolver` + a `zod` schema per field
  concept in `src/schemas/` (`TitleSchema`, `DescriptionSchema`,
  `ColorSchema`, composed into `BoardSchema` / `ListItemSchema` / etc.).
  Reuse the shared field schemas instead of redefining validation inline.
- **IDs**: generated client-side with `globalThis.crypto.randomUUID()` at
  creation time (see `ListItemModal.tsx`), not server-assigned.
- **Drag and drop**: all `@dnd-kit` wiring lives in
  `src/providers/DndProvider/DndProvider.tsx` plus the custom
  `detectCollision` in `.../utils/collision-detection.ts…ts` (see Known
  Issues below for that filename). List vs. item drags are disambiguated
  via the `isList` discriminant on `DraggableData`
  (`src/types/draggable-data.ts`). Don't bypass this — add new drag
  behavior through `ListReducer` actions, not ad hoc state.
- **Icons**: hand-written React components under `src/icons/`, named after
  the Mingcute icon set (`MingcuteAddLine`, etc.). If a new icon is needed,
  follow that naming/format rather than pulling in an icon library.
- **Path alias inconsistency**: `tsconfig.app.json` and `vite.config.ts`
  both define `@/*` → `src/`, and `.prettierrc.json`'s `importOrder` is
  pre-configured for `@/api`, `@/hooks`, `@/stores`, `@/utils`, etc. — but
  **no file in the codebase actually uses the `@/` alias**; all current
  imports are relative (`../../components/...`). Some of those aspirational
  import-order groups (`@/api`, `@/dto`, `@/stores`, `@/hooks`, `@/utils`)
  don't even have a corresponding folder yet. Treat this as prepared-but-
  unadopted scaffolding, not a bug — don't "fix" it by mass-converting
  imports unless the user asks for that specifically, since it'd be a
  large, purely mechanical diff.

## Styling conventions

- **Global tokens vs. local modules**: `src/styles/*.css` and `src/index.css`
  are plain global stylesheets (imported once in `main.tsx`), never CSS
  Modules. They only define custom properties (colors, shadows, radii, type
  scale) and base element resets — they don't style specific components.
  Every component's own look lives in its colocated `Component.module.css`.
  When adding a new color/shadow/radius/font-size value, add a token to the
  relevant `src/styles/*.css` file rather than hardcoding a literal in a
  component module.
- **The color-scoping pattern (important, non-obvious)**: `colors.css`
  defines `.gray` / `.blue` / `.green` / `.yellow` / `.orange` / `.red` /
  `.purple` classes that each locally redefine `--color-50`, `--color-100`,
  `--color-main`. Components that render something in a board's color
  (`BoardCard`, `Initials`, `SidebarItem`) apply the **raw `BoardColor`
  string itself as a plain `className`** (e.g. `clsx(styles["board-card"],
board.color)` in `BoardCard.tsx`, `clsx(styles.initials, color, ...)` in
  `Initials.tsx`) — this is a _global_ class, not a `styles[...]` lookup.
  That global class scopes the `--color-50/100/main` variables for that
  subtree, and the component's own module CSS just reads
  `var(--color-main)` / `var(--color-100)` without knowing which color it
  actually got. If you add a new color-aware component, follow this same
  pattern (apply `color` as a raw className, consume `--color-main` /
  `--color-50` / `--color-100` in the module CSS) instead of writing a
  switch/if over `BoardColor` in TS. If you add a new `BoardColor` value,
  it must get a matching scope class in `colors.css` or every color-aware
  component silently falls back to whatever `--color-main` etc. resolve to
  in the surrounding scope (likely unset/inherited).
- **CSS custom properties as component-internal "parameters"**: variant/color
  composition (see `Button.module.css`) is done by having modifier classes
  (`.solid.primary`, `.outlined.danger`, etc.) set local custom properties
  (`--background-color`, `--color`, `--background-color-hover`), which a
  single base rule then consumes. Prefer extending this pattern (add a new
  modifier class that sets the same custom properties) over adding parallel
  full property blocks per variant.
- **Native CSS nesting + logical properties** are used throughout
  (`block-size`/`inline-size`/`margin-inline`/`margin-block-end`/
  `border-start-start-radius` instead of `height`/`width`/`margin-left`/
  etc.). Keep using logical properties in new CSS — the codebase is
  deliberately RTL-ready (see the Persian `Vazirmatn` font choice in
  `index.html`), even though no `dir="rtl"` switch exists yet.
- **Comment language consistency**: `Button.module.css`'s `:disabled` block
  currently has Persian-language comments, which is the only non-English
  comment block in the codebase. Match the surrounding file's language if
  you touch that block; don't introduce more mixed-language comments
  elsewhere — everything else (code, identifiers, commit messages) is
  English-only.

## Known issues / tech debt (don't be surprised by these)

- **Malformed filename**: `src/providers/DndProvider/utils/collision-detection.ts\u200E.ts`
  contains a hidden Unicode formatting character (renders as a
  double `.ts.ts` extension) baked into the actual filename on disk. Any
  new import of this file must copy the exact existing import string
  (e.g. via editing the existing import) rather than retyping the path,
  or the import will silently fail to resolve on some tools/OSes. Consider
  flagging a rename to the user rather than silently "fixing" it, since a
  rename touches a working import path.
- **Dead code**: `src/components/Header/Header.tsx` is unused (don't confuse
  with `List/ListHeader`, which is live).
- **Dangling route**: Sidebar links to `/settings`, but `App.tsx` has no such
  route — it 404s.
- **No schema versioning** for the `localStorage` payload (see Hard Rule 2).
- **`src/App.module.css` is unused** — `App.tsx` never imports it; don't add
  styles there expecting them to apply.
- **`--fz-100` token is defined but empty** in `src/styles/typography.css`
  (`--fz-100: ;`) — don't reference it until someone gives it a value.

## Things to leave alone unless asked

- Don't introduce a UI/component library (MUI, Chakra, etc.) — styling is
  hand-rolled CSS Modules by design.
- Don't add a state management library — Context + `useImmerReducer` is
  the deliberate pattern here.
- Don't add a backend/API layer speculatively.
