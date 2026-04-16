# Design System Sync Analysis
**Code ↔ Figma reconciliation — fresh pass**

| | Source |
|---|---|
| **Figma file** | "FPL--code-→-design-" (`FCKLpj5AjgrFNfS4D7uY95`), staging.figma.com |
| **Code repo** | `ui3-design-system` — `src/tokens/`, `src/theme/vars.css`, `src/components/` |
| **Date** | April 16, 2026 |
| **Previous analysis** | File `MSRGg5Fi6uspICC9u0VnG4` ("from-code") — **different file** |

---

## 1. Summary — what changed since last analysis

- **Different Figma file.** The previous analysis used `MSRGg5Fi6uspICC9u0VnG4` ("FPL--from-code-"). This session uses `FCKLpj5AjgrFNfS4D7uY95` ("FPL--code-→-design-"). The variable structure is the same architecture (793 semantic Color variables, Primitives ramp) but the collection is now named **`Color`** (was **`Design`**). All findings carry forward.
- **EC theme stubs still empty.** `vars.css` `[data-theme="light-ec"]` and `[data-theme="dark-ec"]` blocks contain no variables. `GAPS.md` marks this ✅ Resolved — that is incorrect. The stubs exist but are empty.
- **GAPS.md describes components that don't exist in the repo.** `Banner` and `SegmentedControl` are listed as "newly implemented" in GAPS.md but `Banner.tsx` and `SegmentedControl.tsx` are absent from `src/components/`.
- **This file adds many new components** not present in the previous analysis: `ToggleButton`, `IconButton` (separate component), `Callout`, `ToggleTip`, `Link`, `LinkButton`, `ButtonGroup`, `Stack`, `BadgedIcon`, and ~15 more complex/primitive components.
- **`Avatar` is in code but not in this Figma file** — it may live in a different library file.

---

## 2. Token comparison

### 2A. Collections

| Collection | Figma | Code |
|---|---|---|
| Color (semantic) | ✅ 793 variables, Light + Dark modes | ⚠️ ~138 CSS vars — covers core subset only |
| Primitives (ramps) | ✅ black, blue, green, grey, orange, persimmon, pink, purple, red, teal, pale_* | ❌ Not implemented (raw hex values hardcoded in vars.css) |
| Spacing | ✅ In Figma | ✅ spacer-0 through spacer-6 (0–40px) |
| Radius | ❌ Not found in this file | ✅ none/small/medium/large/full (0/2/5/13/9999px) |
| Typography | ❌ Not a variable collection (text styles instead) | ✅ typeScale in typography.ts |

### 2B. CSS variable naming convention

The Figma `Color` collection uses the pattern `color/<category>/<modifier>` — no trailing `/default` on base-tier tokens. The CSS convention in `vars.css` appends `-default` for the root tier of `bg` via a `bg/default/` group.

| Figma token | CSS var (vars.css) | Status |
|---|---|---|
| `color/bg` | `--color-bg-default` | ⚠️ Name mismatch — `/default` suffix |
| `color/bg/secondary` | `--color-bg-default-secondary` | ⚠️ Name mismatch |
| `color/bg/hover` | `--color-bg-default-hover` | ⚠️ Name mismatch |
| `color/bg/tertiary` | `--color-bg-default-tertiary` | ⚠️ Name mismatch |
| `color/bg/pressed` | `--color-bg-default-pressed` | ⚠️ Name mismatch |
| `color/bg/brand` | `--color-bg-brand` | ✅ |
| `color/bg/brand-hover` | `--color-bg-brand-hover` | ✅ |
| `color/bg/brand-pressed` | `--color-bg-brand-pressed` | ✅ |
| `color/bg/brand-secondary` | `--color-bg-brand-secondary` | ✅ |
| `color/bg/brand-tertiary` | `--color-bg-brand-tertiary` | ✅ |
| `color/bg/brand-tertiary-hover` | `--color-bg-brand-tertiary-hover` | ✅ |
| `color/bg/brand-tertiary-pressed` | `--color-bg-brand-tertiary-pressed` | ✅ |
| `color/bg/danger` | `--color-bg-danger` | ✅ |
| `color/bg/danger-hover` | `--color-bg-danger-hover` | ✅ |
| `color/bg/danger-pressed` | `--color-bg-danger-pressed` | ✅ |
| `color/bg/danger-secondary` | `--color-bg-danger-secondary` | ✅ |
| `color/bg/danger-tertiary` | `--color-bg-danger-tertiary` | ✅ |
| `color/bg/disabled` | `--color-bg-disabled` | ✅ |
| `color/bg/disabled-secondary` | `--color-bg-disabled-secondary` | ✅ |
| `color/bg/elevated` | `--color-bg-elevated` | ✅ |
| `color/bg/elevated-hover` | `--color-bg-elevated-hover` | ✅ |
| `color/bg/inverse` | `--color-bg-inverse` | ✅ |
| `color/bg/inverse-hover` | `--color-bg-inverse-hover` | ✅ |
| `color/bg/inverse-pressed` | `--color-bg-inverse-pressed` | ✅ |
| `color/bg/menu` | `--color-bg-menu` | ✅ |
| `color/bg/menu-hover` | `--color-bg-menu-hover` | ✅ |
| `color/bg/menu-selected` | `--color-bg-menu-selected` | ✅ |
| `color/bg/menu-selected-hover` | `--color-bg-menu-selected-hover` | ✅ |
| `color/bg/menu-disabled` | `--color-bg-menu-disabled` | ✅ |
| `color/bg/selected` | `--color-bg-selected` | ✅ |
| `color/bg/selected-hover` | `--color-bg-selected-hover` | ✅ |
| `color/bg/selected-pressed` | `--color-bg-selected-pressed` | ✅ |
| `color/bg/selected-strong` | `--color-bg-selected-strong` | ✅ |
| `color/bg/selected-strong-hover` | `--color-bg-selected-strong-hover` | ✅ |
| `color/bg/selected-strong-pressed` | `--color-bg-selected-strong-pressed` | ✅ |
| `color/bg/success` | `--color-bg-success` | ✅ |
| `color/bg/success-hover` | `--color-bg-success-hover` | ✅ |
| `color/bg/success-pressed` | `--color-bg-success-pressed` | ✅ |
| `color/bg/success-secondary` | `--color-bg-success-secondary` | ✅ |
| `color/bg/success-tertiary` | `--color-bg-success-tertiary` | ✅ |
| `color/bg/toolbar` | `--color-bg-toolbar` | ✅ |
| `color/bg/toolbar-hover` | `--color-bg-toolbar-hover` | ✅ |
| `color/bg/toolbar-selected` | `--color-bg-toolbar-selected` | ✅ |
| `color/bg/toolbar-selected-hover` | `--color-bg-toolbar-selected-hover` | ✅ |
| `color/bg/toolbar-disabled` | `--color-bg-toolbar-disabled` | ✅ |
| `color/bg/tooltip` | `--color-bg-tooltip` | ✅ |

### 2C. Tokens present in Figma but missing from code

These are confirmed present in the `FCKLpj5AjgrFNfS4D7uY95` Color collection and absent from `vars.css`.

**Background — generic base tier** *(naming convention conflict with existing code)*

| Figma token | Notes |
|---|---|
| `color/bg` | Code's `--color-bg-default` is semantically equivalent but named differently |
| `color/bg/secondary` | Code: `--color-bg-default-secondary` |
| `color/bg/tertiary` | Code: `--color-bg-default-tertiary` |
| `color/bg/hover` | Code: `--color-bg-default-hover` |
| `color/bg/pressed` | Code: `--color-bg-default-pressed` |

**Background — selected secondary/tertiary**

| Figma token | Notes |
|---|---|
| `color/bg/selected-secondary` | Code has `--color-bg-selected-hover` but not a `-secondary` alias |
| `color/bg/selected-tertiary` | Missing |
| `color/bg/onselected` | Missing — used for content layered on a selected background |
| `color/bg/onselected-hover` | Missing |

**Background — component surface**

| Figma token | Notes |
|---|---|
| `color/bg/component` | Missing |
| `color/bg/component-hover` | Missing |
| `color/bg/component-pressed` | Missing |
| `color/bg/component-secondary` | Missing |
| `color/bg/component-tertiary` | Missing |
| `color/bg/component-tertiary-hover` | Missing |
| `color/bg/component-tertiary-pressed` | Missing |

**Background — info / strong states**

| Figma token | Notes |
|---|---|
| `color/bg/info` | Missing — aliases to brand-tertiary in Light |
| `color/bg/strong-hover` | Missing |
| `color/bg/strong-pressed` | Missing |

**Background — menu extensions**

| Figma token | Notes |
|---|---|
| `color/bg/menu-pressed` | Missing |
| `color/bg/menu-tertiary` | Missing |
| `color/bg/menu-selected-pressed` | Missing |
| `color/bg/menu-selected-secondary` | Missing |
| `color/bg/menu-selected-tertiary` | Missing |
| `color/bg/menu-secondary` | Missing |

**Background — toolbar extensions**

| Figma token | Notes |
|---|---|
| `color/bg/toolbar-pressed` | Missing |
| `color/bg/toolbar-tertiary` | Missing |
| `color/bg/toolbar-selected-pressed` | Missing |
| `color/bg/toolbar-selected-secondary` | Missing |
| `color/bg/toolbar-selected-tertiary` | Missing |

**Background — tooltip subsystem**

| Figma token | Notes |
|---|---|
| `color/bg/tooltip-hover` | Missing |
| `color/bg/tooltip-pressed` | Missing |
| `color/bg/tooltip-disabled` | Missing |
| `color/bg/tooltip-secondary` | Missing |
| `color/bg/tooltip-selected` | Missing |

**Background — success tertiary states**

| Figma token | Notes |
|---|---|
| `color/bg/success-tertiary-hover` | Missing |
| `color/bg/success-tertiary-pressed` | Missing |

**Background — product surface (contextual)**

| Figma token | Notes |
|---|---|
| `color/bg/design`, `color/bg/design-*` | Brand-aliased product surface |
| `color/bg/handoff-tertiary`, `color/bg/handoff-tertiary-*` | Missing tertiary states |
| `color/bg/desktopBackgrounded`, `color/bg/desktopForeground`, `color/bg/desktopFullscreen` | App-chrome surface tokens |
| `color/bg/fs-*` (fullscreen) | ~12 fullscreen surface tokens |
| `color/bg/measure`, `color/bg/template`, `color/bg/assistive-*` | More product-surface tokens |

*Note: The Color collection has 793 variables total. Code covers roughly 138 CSS vars — approximately 18% of the Figma system. The ~655 uncovered variables are largely interactive state extensions, product-surface aliases, and desktop-context tokens that have no code-side consumers in the current component set.*

### 2D. Tokens in code but absent from Figma

| CSS var (vars.css) | Notes |
|---|---|
| `--color-bg-brand` (legacy group `bg/bg-brand`) | Legacy aliases — kept for backward compat but not in Figma |
| `--color-bg-figjam`, `--color-bg-handoff`, `--color-bg-assistive` (standalone) | Figma has these under `color/bg/figjam` ✅ but code's legacy group name differs |
| `--color-icon-figjam` (dark = `#d1a8ff`) | Figma has `color/icon/figjam` (check alias resolution) |

---

## 3. Typography comparison

Figma stores 10 text styles. Code stores 10 entries in `typeScale`. Names and sizes match but there are three classes of divergence.

### 3A. Name format mismatch

| Code key | Figma name | Status |
|---|---|---|
| `heading/display` | `display` | ⚠️ Code adds `heading/` prefix |
| `body/large/strong` | `body/large-strong` | ⚠️ Code uses `/strong`, Figma uses `-strong` |
| `body/medium/strong` | `body/medium-strong` | ⚠️ Same |
| `body/small/strong` | `body/small-strong` | ⚠️ Same |
| `heading/large` | `heading/large` | ✅ |
| `heading/medium` | `heading/medium` | ✅ |
| `heading/small` | `heading/small` | ✅ |
| `body/large` | `body/large` | ✅ |
| `body/medium` | `body/medium` | ✅ |
| `body/small` | `body/small` | ✅ |

### 3B. Letter spacing — match (after unit conversion)

Code stores letter spacing as a percentage × 100 (e.g. `-1.7` = `-1.7%`). Figma stores the resolved pixel value at the given font size. All non-`body/small-strong` values resolve identically.

| Style | Code value (%) | Figma px | Font size | Computed % → px | Match |
|---|---|---|---|---|---|
| `display` | -3 | -1.44px | 48px | -1.44px | ✅ |
| `heading/large` | -1.7 | -0.408px | 24px | -0.408px | ✅ |
| `heading/medium` | -0.5 | -0.075px | 15px | -0.075px | ✅ |
| `heading/small` | -0.25 | -0.032px | 13px | -0.032px | ✅ |
| `body/large` | -0.25 | -0.032px | 13px | -0.032px | ✅ |
| `body/large/strong` | -0.25 | -0.032px | 13px | -0.032px | ✅ |
| `body/medium` | 0.5 | 0.055px | 11px | 0.055px | ✅ |
| `body/medium/strong` | 0.5 | 0.055px | 11px | 0.055px | ✅ |
| `body/small` | 0.5 | 0.045px | 9px | 0.045px | ✅ |
| `body/small/strong` | 0.5 | **0.27px** | 9px | 0.045px | ❌ Figma = 3%, code = 0.5% |

### 3C. Font weight

| Style | Code weight | Figma style | Figma weight | Match |
|---|---|---|---|---|
| `display` | 550 (strong) | Regular | 400 | ❌ |
| `heading/large` | 550 (strong) | Medium | 500 | ⚠️ close but not identical (450 vs 500 fractional) |
| `heading/medium` | 550 (strong) | Medium | 500 | ⚠️ |
| `heading/small` | 550 (strong) | Medium | 500 | ⚠️ |
| `body/large` | 450 (default) | Regular | 400 | ⚠️ close |
| `body/large/strong` | 550 (strong) | Medium | 500 | ⚠️ |
| `body/medium` | 450 (default) | Regular | 400 | ⚠️ |
| `body/medium/strong` | 550 (strong) | Medium | 500 | ⚠️ |
| `body/small` | 450 (default) | Regular | 400 | ⚠️ |
| `body/small/strong` | 550 (strong) | Medium | 500 | ⚠️ |

The ⚠️ rows are a known structural limitation (see Section 6). The `display` ❌ is a real gap: the code assigns `fontWeight.strong` (550) but Figma uses Regular (400) for the display style.

---

## 4. Component comparison

### 4A. Components in both Figma and code

| Component | Figma variants | Code variants | Size | Status |
|---|---|---|---|---|
| **LoadingSpinner / Loading** | Size=sm/md/lg | small(12)/medium(16)/large(24) | sm=16px, md=24px, lg=32px (Figma) vs sm=12, md=16, lg=24 (code) | ❌ Size values shifted — from previous analysis, unfixed |
| **Badge** | 15 fill+outline variants × md/lg | 7 color variants, no size, no fill/outline split | md=? lg=? | ❌ Variant system fundamentally different |
| **Button** | primary/secondary/destructive/destructiveSecondary/ghost/link/destructiveLink/inverse × md/lg | primary/secondary/tertiary/destructive/ghost × large/medium/small | — | ❌ Missing: destructiveSecondary, link, destructiveLink, inverse. Extra: tertiary. Size naming differs. |
| **IconButton** | ghost/secondary/highlighted/primary × md/lg × square/circle | Embedded in Button.tsx as `IconButton` | — | ⚠️ Exists but variants not aligned (no highlighted/primary shapes) |
| **Checkbox** | unchecked/checked/indeterminate × enabled/disabled | boolean `checked`, indeterminate, disabled | ✅ props match | ✅ |
| **Switch** | off/on/indeterminate × enabled/disabled | boolean `checked`, disabled | ⚠️ Missing indeterminate state | ⚠️ |
| **Input** | default/error/disabled × md/lg | default/error/disabled × medium/small | Size naming: md→medium ✅, lg not in code | ⚠️ No lg size in code |
| **RadioInput / Radio** | unselected/selected × enabled/disabled | boolean checked, disabled | ✅ | ✅ |
| **Textarea** | default/error/disabled | default/error/disabled | No size in either | ✅ |
| **Chip** | primary/component × selected × disabled | default/selected/brand/danger/success/warning | ❌ Figma: 2 variants. Code: 6 variants. No overlap in names. |
| **Tabs** | Selected=1/2 | tab array + activeTab | ✅ equivalent | ✅ |
| **Collapse** | Expanded=true/false | controlled + uncontrolled | ✅ | ✅ |
| **Slider** | default/disabled | default/disabled (via disabled prop) | ✅ | ✅ |
| **Modal** | Size=sm/md/lg | single width prop | ⚠️ Code has no size variants; uses free-form width |
| **Menu** | single | items array | ✅ | ✅ |
| **Select** | Size=md/lg × default/open/disabled | no size prop | ⚠️ No size prop in code |
| **Toast** | default/danger | default/success/warning/danger | ⚠️ Code has success/warning extensions not in Figma |

### 4B. Components in Figma only (not implemented in code)

| Figma component | Complexity | Prior status |
|---|---|---|
| **SegmentedControl** | Medium | GAPS.md says "newly implemented" — **file not found in repo** |
| **Banner** | Medium | GAPS.md says "newly implemented" — **file not found in repo** |
| **ToggleButton** | Low | Not mentioned |
| **Link / LinkButton** | Low | Not mentioned |
| **Callout** | Low | Not mentioned |
| **ToggleTip** | Low | Not mentioned |
| **Label / Description / Legend** | Trivial | Text primitives |
| **ButtonGroup** | Low | Not mentioned |
| **Stack** | Low | Layout primitive |
| **BadgedIcon** | Low | Not mentioned |
| **Scrubbable** | High | Figma-specific drag input |
| **Entry** | Medium | Unknown scope |
| **Popover** | High | Noted as skipped in GAPS.md |
| **ScrollContainer** | Medium | Not mentioned |
| **Dialog** | Medium | Not mentioned (different from Modal?) |
| **Window** | High | Noted as skipped in GAPS.md |
| **TreeGrid** | High | Not mentioned |
| **ResizeHandle** | Medium | Not mentioned |
| **CardPrimitive** | Medium | Not mentioned |
| **SplitInput** | Medium | Not mentioned |
| **Toolbar** | High | Not mentioned |

### 4C. Components in code only (not in this Figma file)

| Code component | Notes |
|---|---|
| **Avatar** | Not present in this file's component pages — may be in a different library |

---

## 5. Proposed changes

### 5A. Code changes needed

| # | Change | Effort |
|---|---|---|
| 1 | **Fix EC theme stubs.** `[data-theme="light-ec"]` and `[data-theme="dark-ec"]` in `vars.css` are empty. Correct GAPS.md to remove the "✅ Resolved" claim. Populate when EC primitives become accessible. | Low (GAPS.md fix) / Blocked (values) |
| 2 | **Add `Banner.tsx` and `SegmentedControl.tsx`.** GAPS.md says they were implemented but files are absent. Either create them or correct GAPS.md to remove the "newly implemented" entries. | Medium |
| 3 | **Fix `display` font weight.** `heading/display` uses `fontWeight.strong` (550) but Figma text style `display` uses Regular (400). Should be `fontWeight.default` (450). | Token value change |
| 4 | **Fix `body/small/strong` letter spacing.** Code: 0.5% → 0.045px at 9px. Figma: 0.27px (3%). Update `typeScale["body/small/strong"].letterSpacing` from `0.5` to `3`. | Token value change |
| 5 | **Add `Switch` indeterminate state.** Figma has `State=indeterminate`. Code `Switch` has no indeterminate support. | New variant |
| 6 | **Add `Input` large size.** Figma has `Size=lg`. Code only has medium (28px) and small (24px). Figma `lg` is presumably 32px. | New size |
| 7 | **Add `Select` size prop.** Figma has `Size=md/lg`. Code has no size. | New prop |
| 8 | **Add `Modal` named size variants.** Figma has sm/md/lg. Code has a free-form `width` prop — add a `size` prop that maps to fixed widths. | New prop |
| 9 | **Add missing `Button` variants.** Add `destructiveSecondary`, `link`, `destructiveLink`, `inverse` to `ButtonVariant`. | New variants |
| 10 | **Align `Button` size names.** Figma uses `md`/`lg`. Code uses `large`/`medium`/`small`. Figma has no `small`. Either add a `sm` size to Figma or remove `small` from code — needs team decision. | Naming / removal |
| 11 | **Add `color/bg/component` token family.** 7 tokens: default, hover, pressed, secondary, tertiary, tertiary-hover, tertiary-pressed. Values identical to `bg/figjam` family in light mode. | New CSS vars |
| 12 | **Add `color/bg/selected-secondary`.** Figma has this; code only has `selected-hover`. | New CSS var |
| 13 | **Add `text/selected`, `text/ondanger`, `text/onwarning`, `text/onsuccess`, `text/tooltip` tokens.** Carried from previous analysis. | New CSS vars |
| 14 | **Add `icon/selected` token.** | New CSS var |
| 15 | **Add `border/danger`, `border/warning`, `border/success`, `border/assistive`, `border/ondanger`, `border/onwarning`.** Carried from previous analysis. | New CSS vars |
| 16 | **Align type scale names.** `body/large/strong` → `body/large-strong` (or vice versa). Use one separator consistently. | Rename |
| 17 | **Align `heading/display` name.** Figma calls it `display`; code calls it `heading/display`. | Rename one side |

### 5B. Figma changes needed

| # | Change | Effort |
|---|---|---|
| 1 | **Add `Size=sm` (12px) to LoadingSpinner.** Code has a 12px tier with no Figma counterpart. If keeping it, add the variant. | New variant |
| 2 | **Add `Avatar` component.** Code has an Avatar; this Figma file does not. Add component page with `photo/initials` × `default/small/large/xsmall` variants. | New component |
| 3 | **Align `Button` size naming.** Figma uses `md`/`lg`; if code keeps `large`/`medium`, rename Figma properties to match. | Rename |
| 4 | **Add `Toast` success/warning variants.** Code has these as extended variants; add them to Figma for design coverage. | New variants |
| 5 | **Align `body/small-strong` letter spacing.** Figma has 3% (0.27px); code has 0.5%. Decide the correct value and update Figma or code. | Value decision |
| 6 | **Add `-default` suffix aliases** if team chooses Option B (code wins on naming) — see open questions. | Alias variables |

---

## 6. Known limitations (carry forward unchanged)

- **Dark-mode elevation.** Figma effect styles cannot represent inset shadows. Code-side dark elevation must be documented with annotations in Figma; it cannot be stored as an effect style.
- **Whyte font unavailable in Figma.** Display headings render in Inter as a fallback. Visual parity for `display` weight type is structurally impossible.
- **Fractional font weights (450/550).** Inter Variable supports these; standard Figma weight pickers only expose 400/500/600. Figma text styles use "Regular" (400) and "Medium" (500) — code values will always render slightly differently in Figma previews.
- **EC primitives inaccessible.** The Enhanced Contrast theme values live in an external library not included in any exported file. Both systems have an empty EC layer until that source becomes accessible.
- **Interactive state tokens (`-hover`, `-pressed`).** These are code-only — Figma handles interaction states through component variants and prototyping, not semantic variables. They'll always be orphaned in Figma's variable system.
- **`bg/component*` tokens.** Figma-specific concept used for component fill pickers. No meaningful code consumer.
- **No automated sync mechanism.** Any token or component change in either system requires a manual update to the other. Code Connect maps component instances to snippets but does not enforce token value parity.
- **Source library edit access.** UI3 Components and UI3 Icons are readable but not executable via Plugin API (view-only). Component validation is comparison-based, not schema-enforced.
- **793 vs ~138 variable gap.** The 655 uncovered Figma variables are product-surface, desktop-context, and fullscreen-mode tokens. Covering them requires a multi-surface theme architecture, not just CSS additions.

---

## 7. Open questions

| # | Question | Who decides |
|---|---|---|
| 1 | **Naming: drop `-default` suffix from code base tier, or add Figma aliases?** Previous recommendation: Option A (code drops `-default`). Still unresolved. | Team |
| 2 | **`Banner` and `SegmentedControl`:** create the missing files or roll back GAPS.md? | Engineering |
| 3 | **`body/small-strong` letter spacing: 0.5% (code) or 3% (Figma)?** Figma value looks intentional — strong small text is wider-tracked. | Design |
| 4 | **`display` font weight: Regular (400, Figma) or Strong (550, code)?** At 48px, the weight difference is visually significant. | Design |
| 5 | **`Button` size `small` (24px): keep in code with no Figma counterpart, or add to Figma?** | Design |
| 6 | **`Avatar`: is it intentionally absent from this Figma file, or should a page be added?** | Design |
| 7 | **`Chip` variant overhaul:** code has 6 semantic variants, Figma has 2 (primary/component). Align to Figma (break change) or expand Figma? | Team |
| 8 | **`Toast` success/warning variants:** code-only extension — accept the divergence or bring into Figma? | Design |
| 9 | **`Switch` indeterminate state:** add to code, or confirm Figma's indeterminate is a design-only state? | Team |
| 10 | **Is the EC primitives file now accessible?** Unblocks the largest remaining token gap. | Engineering |
