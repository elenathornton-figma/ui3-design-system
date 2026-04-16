# UI3 Design System — Generation Gaps & Issues

This document records issues, limitations, and deliberate approximations encountered
while generating this codebase from the three Figma source libraries.

---

## 1. Staging vs. Production authentication

**Severity: Blocker (resolved)**

All three source files are on `staging.figma.com`. The default Figma MCP server
connects to `figma.com` (production). A separate OAuth flow was required to
authenticate to the staging MCP server before any file access succeeded.

---

## 2. View-only access to Library and Icons files

**Files affected:** UI3 Library (`N0izGT6Y7WwEOJABqPXBCv`), UI3 Icons (`ycDPAaAih2bZY5LgXehVai`)

**Severity: High**

The account has view-only access to both the component library and icons files.
The Figma Plugin API (`use_figma`) requires edit access to execute JavaScript in
a file. Consequently:

- Component prop/variant structures were inferred from the component names returned
  by `search_design_system` and from known UI3 conventions, **not** read directly
  from the Figma nodes.
- SVG path data for icons could not be extracted. `src/icons/Icon.tsx` provides
  approximated inline SVG paths for the ~20 most common icons. All other icon
  names render a dashed placeholder rectangle.

**Recommended fix:** Export SVGs from the Icons file (File → Export, select all
components on the Icons page → SVG). Run SVGR to generate typed React components:

```bash
npx @svgr/cli --typescript --icon --out-dir src/icons/svgs icons/export/
```

---

## 3. Enhanced Contrast (EC) primitive colors missing

**File affected:** UI3 Tokens (`vnBChO91d7tXFBMmlzGM6F`)

**Severity: Medium**

The `Design` variable collection has four modes: Light, Dark, Light-EC, Dark-EC.
The EC modes resolve to a **different primitive color palette** stored in an
external library file that is not part of the three exported Figma libraries
provided. The alias chain terminates at variable IDs that could not be resolved.

**Impact:** `[data-theme="light-ec"]` and `[data-theme="dark-ec"]` in `vars.css`
are empty stubs — they fall back to the light/dark values respectively.

**Recommended fix:** Identify and export the primitive color file (likely named
something like "UI3 Primitives" or "Color Palette") and re-run the token
extraction against it.

---

## 4. Semantic token alias chain terminates at cross-file primitives

**File affected:** UI3 Tokens

**Severity: Low (resolved with sampling)**

The `Design` collection's 1065 color variables are all variable aliases. The
chain runs: `Design variable → intermediate alias → 🎨/{color}/{weight}` primitive.
A recursive resolver was written using `figma.variables.getVariableByIdAsync()`
which successfully followed aliases **within the same file**, allowing all
Light and Dark hex values to be resolved and written into `colors.ts` and
`vars.css`.

The resolved values were cross-checked against known Figma brand colors (blue
`#0d99ff`, brand `#007be5`, etc.) and match published UI3 token documentation.

---

## 5. Component variant/prop structures approximated

**File affected:** UI3 Library

**Severity: Medium**

Due to view-only access (see Gap 2), component variant structures were inferred
rather than read. The following components are implemented based on the Figma
component set names, Figma's published documentation, and standard UI3 patterns:

| Component      | Variants source          |
|----------------|--------------------------|
| Button         | primary/secondary/tertiary/destructive/ghost + sizes large/medium/small |
| IconButton     | Wrapper around Button |
| Input          | default/error/disabled + medium/small |
| Checkbox       | unchecked/indeterminate/checked |
| Radio          | RadioGroup wrapper included |
| Switch         | on/off |
| Badge          | default/brand/danger/success/warning/figjam/handoff |
| Select         | Matches Figma description |
| Tooltip        | top/bottom/left/right placement |
| Modal          | title + footer slots |
| Menu           | MenuItemDef with icon/shortcut/destructive |
| Tabs           | TabDef array + TabPanel render slot |
| Collapse       | Controlled + uncontrolled |
| Textarea       | Matches Figma description |
| Slider         | Controlled + uncontrolled, single-thumb |
| Loading        | spinner + dots variants |
| Toast          | ToastProvider + useToast hook |
| Avatar         | initials fallback with name-hashed hue |
| Chip           | removable, with variant system |

Missing Figma components not yet implemented:
- `Banner` (informational banners)
- `SegmentedControl`
- `Popover`
- `Swatch` (color swatch picker)
- `Form` / `FormField` (beta)
- `Windows` (floating panels)
- `Notifications` (UI3 notification system)
- `Comments` (UI3 comment thread)

---

## 6. Typography font weights use variable-font values

**Severity: Low**

The Inter font uses fractional weights (450 = regular, 550 = medium/strong).
These are CSS `font-weight` values supported by **Inter Variable** only. In
environments without variable font support, browsers will round to the nearest
standard weight (400 or 500/600). The `--font-weight-default` and
`--font-weight-strong` CSS variables encode these values.

**Recommendation:** Add `@font-face` declarations for Inter Variable in your
app's global styles, or configure `next/font` / `@fontsource/inter` accordingly.

---

## 7. Icons file metadata too large to fully parse

**Severity: Low**

The `get_metadata` response for the Icons file (0:1) exceeded the maximum allowed
token size (~946K characters). The file contains a very large number of icon
components. Icon names were retrieved via `search_design_system` queries instead,
which returned a representative but not exhaustive list.

The `IconName` type in `src/icons/Icon.tsx` uses `string & {}` as a catch-all so
TypeScript will not reject unknown icon names.

---

## 8. Multiple product-context variable collections

**Severity: Informational**

The Tokens file contains 12 variable collections with the same 1065 semantic
color variables, each mapped to a different Figma product surface:
Design, FigJam, Dev mode, Slides, Sites, Buzz, Draw, Make, Animate.

Each collection has Light/Dark/Light-EC/Dark-EC modes with different primitive
values, representing how colors shift across product contexts (e.g., FigJam uses
purple for brand, not blue). **Only the `Design` collection is implemented** in
this codebase. The others would require the same extraction + additional theme
tokens to be useful in a multi-surface codebase.

---

## 9. CSS custom property font-weight in inline styles

**Severity: Low (cosmetic TypeScript issue)**

React's `CSSProperties` types `fontWeight` as `number | string`. Using
`var(--font-weight-strong)` works at runtime but requires a type cast
(`as unknown as number`) in places. This is inelegant but functionally correct.

**Recommended fix:** Move component base styles to a `.css` file or CSS Modules
and reference the CSS variable there, eliminating the need for the cast.
