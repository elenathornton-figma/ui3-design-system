# UI3 Design System — Gaps & Skipped Items

This document explicitly lists every token set and component that was **not fully implemented**, what was approximated, and why.

---

## Tokens

### Skipped token collections

The UI3 Tokens file (`vnBChO91d7tXFBMmlzGM6F`) contains **12 variable collections**. Only 4 were implemented.

| Collection | Status | Reason skipped |
|------------|--------|----------------|
| **Design** | ✅ Implemented (Light + Dark only) | Primary semantic color tokens — see color gap below for EC modes |
| **Typography** | ✅ Implemented | Font family, weight, and type scale |
| **Spacing** | ✅ Implemented | spacer-0 through spacer-6 |
| **Radius** | ✅ Implemented | none / small / medium / large / full |
| **FigJam** | ❌ Skipped | Separate product surface with different brand primitives (purple-based). No product-specific theme system in place to support multi-surface tokens. |
| **Dev mode** | ❌ Skipped | Same semantic structure as Design but mapped to Dev mode primitives. Implementing requires a `dev` theme variant and a separate CSS variable block. |
| **Slides** | ❌ Skipped | Figma Slides product surface tokens. Not relevant to a UI component library. |
| **Sites** | ❌ Skipped | Figma Sites product surface tokens. Not relevant. |
| **Buzz** | ❌ Skipped | Internal product surface. Not relevant. |
| **Draw** | ❌ Skipped | Internal product surface. Not relevant. |
| **Make** | ❌ Skipped | Figma Make product surface tokens. Not relevant. |
| **Animate** | ❌ Skipped | Internal product surface. Not relevant. |

### Skipped token values within implemented collections

#### Enhanced Contrast (EC) modes — `light-ec` and `dark-ec`

The `Design` collection has four modes: Light, Dark, Light-EC, Dark-EC.

EC modes resolve to a **different primitive color palette** stored in a separate Figma file that was not included in the three provided libraries. The alias chain for EC tokens terminates at variable IDs in an external file, so the hex values could not be resolved.

**Impact:** `[data-theme="light-ec"]` and `[data-theme="dark-ec"]` in `vars.css` are empty — consumers get the Light theme as a fallback.

**All 63 EC color tokens are affected.** The token keys exist in the `ColorTokens` interface but the CSS variables that back them are unpopulated.

**Fix:** Identify the UI3 primitives file (likely "UI3 Primitives" or "Color Ramp") and re-run token extraction against it.

#### Product surface color variables in the Design collection

The Design collection also includes product-surface-specific semantic tokens (e.g. `bg/figjam`, `text/figjam`, `text/handoff`) that reference FigJam/Handoff product primitives. These **are** implemented in `vars.css` for Light and Dark modes using the resolved hex values, but the EC variants of these tokens are also missing for the same reason as above.

---

## Components

### Not implemented

These components exist in the UI3 Library (`N0izGT6Y7WwEOJABqPXBCv`) but were not built. They were identified via `search_design_system` but not implemented because:

1. Their complexity warranted more time than was available in a first-pass generation.
2. Several require external dependencies (date pickers, virtual scroll) that would add significant scope.
3. Some are marked beta in Figma and may not be stable.

| Component | Reason not implemented |
|-----------|------------------------|
| **Banner** | Informational banners with icon + action slot. Omitted in first pass. |
| **SegmentedControl** | Multi-option toggle control. Similar to Tabs but different interaction model. Omitted in first pass. |
| **Popover** | Positioned floating content with rich slots. Shares positioning logic with Tooltip but needs a content projection model. Omitted in first pass. |
| **Swatch** | Color swatch picker used in fill/stroke panels. Requires internal color state that is highly Figma-specific. Omitted. |
| **Form / FormField** | Beta component in Figma. Wrapper that composes Input, label, and validation. Omitted because it is marked beta and its API is unstable. |
| **Windows** | Floating panel system. Complex resize + drag behaviour. Omitted in first pass. |
| **Notifications** | Notification feed / inbox UI. Requires a data model beyond what can be inferred from Figma. Omitted. |
| **Comments** | Threaded comment UI. Same issue as Notifications — requires data model. Omitted. |

### Implemented but approximated

These components are built but their variant/prop structures were **inferred** rather than read directly from Figma nodes. The account has view-only access to the Library file, which blocks Plugin API execution. Component structures were derived from component names returned by `search_design_system` and from known UI3 conventions.

| Component | What was approximated | Confidence |
|-----------|-----------------------|------------|
| **Button** | Variant names (primary/secondary/tertiary/destructive/ghost) and size names (large/medium/small) | High — matches published UI3 docs |
| **Input** | State prop values (default/error/disabled), size prop (medium/small), icon slot names | High |
| **Badge** | Variant names (default/brand/danger/success/warning/figjam/handoff), `dot` prop, `max` prop | Medium — variant list may be incomplete |
| **Chip** | Variant names, removable prop, leadingIcon slot | Medium |
| **Avatar** | Size variants (not exposed as prop — defaults to 24px). May be missing size/shape variants. | Medium |
| **Select** | Custom implementation — no access to the Figma component's internal structure. Keyboard behaviour may differ from spec. | Low |
| **Slider** | Single-thumb only. Figma component may support a range variant (two thumbs). | Low |
| **Menu** | Item structure (icon/label/shortcut/destructive) inferred. Submenu/nested menu not implemented. | Medium |
| **Toast** | Severity variants (neutral/success/danger/warning) present, but exact Figma prop names not confirmed. | Medium |
| **Loading** | Spinner and dots variants confirmed. Size variants not confirmed. | Medium |

### Icons

The Icons file (`ycDPAaAih2bZY5LgXehVai`) contains hundreds of icons. **SVG path data could not be extracted** because the Plugin API requires edit access to execute JavaScript, and the account has view-only access.

**What was done instead:**
- Icon names were retrieved via `search_design_system` queries.
- SVG paths for ~20 common icons were hand-coded in `src/icons/Icon.tsx` (`PATHS_24` and `PATHS_16`).
- All other icon names render a dashed placeholder rectangle.
- `IconName` uses `string & {}` as a catch-all so TypeScript does not reject unknown names.

**Fix:** Export all SVGs from the Figma Icons file (File → Export, select all → SVG), then generate typed React components:

```bash
npx @svgr/cli --typescript --icon --out-dir src/icons/svgs icons/export/
```

---

## Other known issues

| Issue | Severity | Detail |
|-------|----------|--------|
| **EC theme stubs** | Medium | `[data-theme="light-ec"]` and `[data-theme="dark-ec"]` in `vars.css` are empty — falls back to light/dark |
| **Variable font weights** | Low | Inter uses 450/550 fractional weights. Requires Inter Variable to render correctly. Standard weight environments round to 400/500/600. |
| **`fontWeight` in inline styles** | Low | React's `CSSProperties` types `fontWeight` as `number \| string`, which rejects `var(--font-weight-strong)`. Worked around with `as unknown as number` cast. Move to CSS Modules to eliminate. |
| **Multi-surface token system** | Medium | The 8 skipped product-surface collections (FigJam, Dev, Slides, etc.) each have 1065 semantic color variables. Supporting them requires a theme system that accepts a surface dimension in addition to light/dark. |
