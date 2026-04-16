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

✅ **Resolved.** EC token values were resolved by chasing the `VARIABLE_ALIAS` chains in the UI3 Tokens Design collection across all four modes. The EC modes only override tokens that differ from their light/dark base — 53 variables in `light-ec` and 30 in `dark-ec`.

`[data-theme="light-ec"]` and `[data-theme="dark-ec"]` in `vars.css` are now populated with the resolved hex/rgba values.

#### Product surface color variables in the Design collection

The Design collection also includes product-surface-specific semantic tokens (e.g. `bg/figjam`, `text/figjam`, `text/handoff`) that reference FigJam/Handoff product primitives. These **are** implemented in `vars.css` for Light and Dark modes using the resolved hex values, but the EC variants of these tokens are also missing for the same reason as above.

---

## Components

### Newly implemented

| Component | File | Notes |
|-----------|------|-------|
| **Banner** | `src/components/Banner/Banner.tsx` | Supports all three Figma subtypes: `full-width`, `inset`, `multi-line`. Props confirmed from Figma. Variants: default/brand/danger/warn/success/transparent. |
| **SegmentedControl** | `src/components/SegmentedControl/SegmentedControl.tsx` | Props confirmed from Figma. Option types: icon/text/text-fill. Sizes: md/lg. |

### Not implemented

These components exist in the UI3 Library but were not built.

| Component | Reason not implemented |
|-----------|------------------------|
| **Popover** | Positioned floating content with rich slots. Shares positioning logic with Tooltip but needs a content projection model. Omitted in first pass. |
| **Swatch** | Color swatch picker used in fill/stroke panels. Requires internal color state that is highly Figma-specific. Omitted. |
| **Form / FormField** | Beta component in Figma (🟢 Form [beta]). Wrapper that composes Input, label, and validation. Omitted because it is marked beta. |
| **Windows** | Floating panel system. Complex resize + drag behaviour. Omitted. |
| **Notifications** | Notification feed / inbox UI. Requires a data model beyond what can be inferred from Figma. Omitted. |
| **Comments** | Threaded comment UI. Same issue as Notifications — requires data model. Omitted. |

### Implemented but approximated

These components are built. Props marked ✅ were read directly from Figma `componentPropertyDefinitions`. Props marked ⚠ were inferred.

| Component | Props status |
|-----------|-------------|
| **Button** | ⚠ Variant names (primary/secondary/tertiary/destructive/ghost) and size names inferred — matches published UI3 docs |
| **Input** | ⚠ State prop values, size prop, icon slot names inferred |
| **Badge** | ✅ Variants updated to `defaultFilled/defaultOutline/brandFilled/brandOutline/inverseFilled/componentFilled/componentOutline/dangerFilled/dangerOutline/warningFilled/warningOutline/successFilled/successOutline/inactiveFilled/inactiveOutline/onFill`. Size `md\|lg` added. |
| **Chip** | ✅ Variants updated to `default\|component\|success\|warning\|danger\|toggle\|override`. `selected` boolean prop added. |
| **Avatar** | ✅ Variant (`photo\|purple\|grey\|green\|yellow\|red\|pink\|blue\|org\|overflow-unread\|overflow-read`), size (`default\|small\|large`), shape (`circle\|square`) all confirmed from Figma. |
| **Select** | ✅ `variant` (`Property\|Form`), `size` (`md\|lg`), `readonly`, `validation` (`None\|Invalid\|Warning`), `leadingIcon` all confirmed from Figma. |
| **Slider** | ✅ `variant` (`fill\|range\|stepper\|slider\|corner-radius\|gradient\|color-range`) confirmed from Figma. Range two-thumb prop signature added but rendering is single-thumb. |
| **Toast** | ✅ Variants updated to `default\|message\|message-dismiss\|danger` (Figma). `success\|warning` kept as extended variants. |
| **Menu** | ⚠ Item structure (icon/label/shortcut/destructive) inferred. Submenu/nested menu not implemented. |
| **Loading** | ⚠ Spinner and dots variants confirmed. Size variants not confirmed. |

### Icons

**Substantially resolved.** SVG path data was extracted via `exportAsync({ format: 'SVG' })` against the UI3-Icons library (`qBEMOvSsIWywMb0oTdCfi5`). `src/icons/Icon.tsx` now uses `dangerouslySetInnerHTML` to inject Figma-exported SVG inner content, with `fill="currentColor"` normalization for CSS color inheritance.

**Coverage:**
- 16px icons: 29 icons with real Figma SVG paths.
- 24px icons: 73 icons with real Figma SVG paths.
- All others fall back to a dashed placeholder rectangle.
- `IconName` union lists all 92 known names; `string & {}` catch-all accepts unknown names.

**Remaining gaps (still placeholder):**
Some 24px icons were not reachable in the batch extraction due to the 20 KB transport limit. These fall back to the dashed rect:
`replace`, `props`, `recent` (24px), `pause`, `circle-up.large`, `community.large`, `community.new`, `community.new.large`, `count-star`, `feed` (24px), `file.community.*`, `flip.horizontal`, `flip.vertical`, `gift.large`, `mail.filled`, `mirror*`, `number-list` (24px), `opacity.large`, `page-number`, `progress.fake`, `sitemap`, `spacing.*`, `text` (24px, some variants), `underline-*`, `update.text.style*`, `variable.color*`, `version.merged`, `wall.large`.

**Fix:** Run another batch extraction from the Icons file for the remaining names above.

---

## Other known issues

| Issue | Severity | Detail |
|-------|----------|--------|
| **EC theme stubs** | ✅ Resolved | `[data-theme="light-ec"]` and `[data-theme="dark-ec"]` in `vars.css` now populated — 53 light-ec and 30 dark-ec overrides |
| **Variable font weights** | Low | Inter uses 450/550 fractional weights. Requires Inter Variable to render correctly. Standard weight environments round to 400/500/600. |
| **`fontWeight` in inline styles** | Low | React's `CSSProperties` types `fontWeight` as `number \| string`, which rejects `var(--font-weight-strong)`. Worked around with `as unknown as number` cast. Move to CSS Modules to eliminate. |
| **Multi-surface token system** | Medium | The 8 skipped product-surface collections (FigJam, Dev, Slides, etc.) each have 1065 semantic color variables. Supporting them requires a theme system that accepts a surface dimension in addition to light/dark. |
