# Component Layer Diff
Figma file `FCKLpj5AjgrFNfS4D7uY95` vs `src/components/`
Date: 2026-04-16

---

## Button — base variant (Variant=primary, Size=md, State=default)

### Layer structure
| Property | Figma | Code | Status |
|---|---|---|---|
| Root height (`md`) | 24px | `medium` = 28px | ❌ |
| Root height (`lg`) | 32px | `large` = 32px | ✅ |
| Horizontal padding (`md`) | 8px | `medium` paddingInline = 8px | ✅ |
| Horizontal padding (`lg`) | 12px | `large` paddingInline = 12px | ✅ |
| Vertical padding | 0px (top/bottom = 0) | implicit in fixed height | ✅ |
| Corner radius | 5px | `var(--radius-medium)` = 5px | ✅ |
| Font size (`md`) | 11px | `medium`/`small` = 11px | ✅ |
| Font size (`lg`) | 11px | `large` = 13px | ❌ |
| Font weight | Inter Medium (500) | `var(--font-weight-strong)` = 550 | ⚠️ known divergence |
| Letter spacing | 0px (0%) | -0.25px | ❌ |
| Primary fill | `color/bg/brand` → #0D99FF | `var(--color-bg-brand)` = #0d99ff | ✅ |
| Text color (primary) | `color/text/onbrand` → #ffffff | `var(--color-text-onbrand)` = #ffffff | ✅ |
| Text color (secondary/link) | `color/text` (dark) | `var(--color-text-default)` | ✅ |
| Secondary stroke | 1px solid `VariableID:10:78` | `1px solid var(--color-border-default)` | ✅ (alias unresolved but raw color matches) |
| Disabled opacity | not set as layer property (state variant) | 0.4 | ⚠️ state not comparable |
| Icon slot | no explicit icon layer in base variant | `leadingIcon`/`trailingIcon` props | ⚠️ not comparable |
| `itemSpacing` (gap) | 0 (no icon in base variant) | large=6px, medium/small=4px | ⚠️ not comparable (icon absent) |

### Size name mapping
| Figma size | Figma height | Code size | Code height | Status |
|---|---|---|---|---|
| `md` | 24px | `small` | 24px | ⚠️ name mismatch, height matches |
| `lg` | 32px | `large` | 32px | ⚠️ name mismatch, height matches |
| — | — | `medium` | 28px | ❌ no Figma equivalent |

Code `small` padding = 6px vs Figma `md` padding = 8px — secondary mismatch even if heights match.

### Variant coverage
| Figma variant | Code equivalent | Status |
|---|---|---|
| `primary` | `variant="primary"` | ✅ |
| `secondary` | `variant="secondary"` | ✅ |
| `destructive` | `variant="destructive"` | ✅ |
| `ghost` | `variant="ghost"` | ✅ |
| `destructiveSecondary` | — | ❌ Missing |
| `link` | — | ❌ Missing |
| `destructiveLink` | — | ❌ Missing |
| `inverse` | — | ❌ Missing |
| — | `variant="tertiary"` | ❌ No Figma equivalent |

### Screenshot
![Button component set](figma-screenshots/button.png)

### Notes
- Figma has 32 variants (8 variant types × 2 sizes × 2 states). Code has 5 variants × 3 sizes.
- `link` in Figma has transparent background + `color/text` fill — similar to code `tertiary`/`ghost` but likely needs underline decoration.
- `inverse` in Figma is dark-filled (#2c2c2c) + white text — opposite of primary light-mode appearance.
- `destructiveSecondary` in Figma has a red/pink stroke + danger text color — outlined danger style.
- Font size discrepancy on `lg`: Figma uses 11px at all sizes; code bumps to 13px for `large`. This is a real visual divergence on larger buttons.
- Letter spacing -0.25px in code has no counterpart in Figma (Figma = 0%). Will cause tighter text rendering in code.
- Hover/pressed/focus states handled as Figma variants — code uses CSS + `transition: background 80ms ease`. State not comparable.

---

## Input — base variant (State=default, Size=md)

### Layer structure
| Property | Figma | Code | Status |
|---|---|---|---|
| Height (`md`) | 24px | `medium` = 28px | ❌ |
| Height (`lg`) | 32px | no `lg` size | ❌ Missing |
| Horizontal padding | 8px (both md + lg) | paddingInline = 8px | ✅ |
| Vertical padding | 0px (top/bottom = 0) | implicit in fixed height | ✅ |
| Corner radius | 5px | `var(--radius-small)` = 2px | ❌ |
| Background (default) | #F5F5F5 (gray fill, no stroke) | `var(--color-bg-default)` = #ffffff | ❌ |
| Border (default) | none | `1px solid var(--color-border-default)` = #e6e6e6 | ❌ design direction differs |
| Placeholder font size (`md`) | 11px | `medium` fontSize = 13px | ❌ |
| Placeholder font size (`lg`) | 11px | — | n/a |
| Placeholder font weight | Inter Regular (400) | `var(--font-weight-default)` = 450 | ⚠️ known divergence |
| Placeholder letter spacing | 0% (0px) | -0.25px | ❌ |
| Placeholder text color | `color/text` (dark) | `var(--color-text-default)` | ✅ |
| Icon slot gap | 0 (no icon in base) | gap = 4px | ⚠️ not comparable |
| Focus ring | not set in default variant | `box-shadow: 0 0 0 2px var(--color-bg-brand-tertiary)` | ⚠️ state not comparable |
| Error border color | red stroke (error variant) | `var(--color-bg-danger)` = #f24822 | ✅ intent matches |

### Size name mapping
| Figma size | Height | Code size | Code height | Status |
|---|---|---|---|---|
| `md` | 24px | `small` | 24px | ⚠️ height matches, name wrong |
| `lg` | 32px | — | — | ❌ not in code |
| — | — | `medium` | 28px | ❌ no Figma equivalent |

### Variant coverage
| Figma variant | Code equivalent | Status |
|---|---|---|
| `State=default` | `state="default"` | ✅ |
| `State=error` | `state="error"` | ✅ |
| `State=disabled` | `state="disabled"` | ✅ |
| `Size=md` | `inputSize="small"` | ⚠️ height match, name mismatch |
| `Size=lg` | — | ❌ Missing |

### Notes
- Figma's default input is gray-fill / no-border (#F5F5F5, no stroke). Code is white-fill / bordered (white + 1px #e6e6e6). Different visual design direction — code looks more like a traditional form input, Figma looks like a Figma-style ghost field.
- Corner radius is the most visually obvious discrepancy: Figma 5px vs code `--radius-small` = 2px.
- Label and helper text are not part of the Figma Input component; they appear above/below in layout frames. Code embeds them as part of the component — structural difference but functionally equivalent.
- Focus ring is code-only; Figma handles focus as a separate state variant not extracted here.

---

## LoadingSpinner — all variants

### Layer structure
| Property | Figma | Code | Status |
|---|---|---|---|
| `sm` container size | 16×16px | `medium` = 16px | ⚠️ size match, name mismatch |
| `md` container size | 24×24px | `large` = 24px | ⚠️ size match, name mismatch |
| `lg` container size | 32×32px | — | ❌ Missing |
| — | — | `small` = 12px | ❌ No Figma equivalent |
| Inner ellipse (`sm`) | 14×14px, stroke 2px | ~12px eff. (scaled from 24→16) | ⚠️ close but not exact |
| Inner ellipse (`md`) | 22×22px, stroke 2.5px | SVG r=9 in 24×24, stroke 2.5px | ✅ match at `large` size |
| Inner ellipse (`lg`) | 29×29px, stroke 3px | — | ❌ Missing |
| Arc style | 2 overlapping ellipses (track + arc) | single `circle` with `strokeDasharray="42 14"` | ⚠️ different impl, same visual result |
| Color | raw black strokes (variable-bound) | `var(--color-icon-secondary)` via `currentColor` | ✅ intent matches |

### Size name mapping
| Figma size | Figma px | Code size | Code px | Status |
|---|---|---|---|---|
| `sm` | 16px | `medium` | 16px | ⚠️ name mismatch |
| `md` | 24px | `large` | 24px | ⚠️ name mismatch |
| `lg` | 32px | — | — | ❌ Missing |
| — | — | `small` | 12px | ❌ No Figma equivalent |

### Notes
- Code sizes are shifted one tier relative to Figma (`medium`=Figma `sm`, `large`=Figma `md`). The tier offset means a caller requesting `large` gets Figma's `md` appearance.
- Code `small` (12px) is smaller than any Figma size — likely an internal utility size added for use inside Button loading states.
- Figma uses two stacked ellipses (full-circle track + partial-circle arc). Code uses a single circle with `strokeDasharray` to create the arc — functionally equivalent, visually indistinguishable.
- `dots` variant in code has no Figma counterpart.

---

## Select — base variant (Size=md, State=default)

### Layer structure
| Property | Figma | Code | Status |
|---|---|---|---|
| Height (`md`) | 24px | 28px | ❌ |
| Height (`lg`) | 32px | 32px | ✅ |
| Horizontal padding | 8px | paddingInline = 8px | ✅ |
| Gap (text → chevron) | 4px | gap = 4px | ✅ |
| Corner radius | 5px | `var(--radius-small)` = 2px | ❌ |
| Background (default) | #F5F5F5 (gray fill, no stroke) | `var(--color-bg-default)` = #ffffff | ❌ |
| Border (default) | none | `1px solid var(--color-border-default)` | ❌ |
| Font size (`md`) | 11px | 11px | ✅ |
| Font size (`lg`) | 11px | 13px | ❌ |
| Letter spacing (`md`) | 0% | 0.5px | ❌ |
| Letter spacing (`lg`) | 0% | -0.25px | ❌ |
| Text color | `color/text` | `var(--color-text-default)` | ✅ |
| Chevron icon | Rectangle placeholder (16×16) | SVG chevron (12×12) | ⚠️ different impl |
| Size prop names | `md` / `lg` | `md` / `lg` | ✅ |

### Variant coverage
| Figma variant | Code equivalent | Status |
|---|---|---|
| `State=default` | default state | ✅ |
| `State=open` | `open` state (internal) | ✅ |
| `State=disabled` | `disabled` prop | ✅ |
| `Size=md` | `size="md"` | ✅ |
| `Size=lg` | `size="lg"` | ✅ |
| — | `variant="Property"` / `"Form"` | ❌ No Figma equivalent |
| — | `validation="Invalid"` / `"Warning"` | ❌ No Figma equivalent |

### Notes
- Select has the same background/border design-direction divergence as Input: Figma uses gray-fill/no-border, code uses white-fill/bordered.
- Corner radius mismatch (Figma 5px vs code 2px) is the same issue as Input — code likely should use `--radius-medium` for both.
- `variant="Property"` (compact inline) vs `"Form"` distinction exists in code but not in this Figma file's Select component set. May be in a different Figma page/file.
- `validation="Warning"` is a code extension not reflected in Figma.

---

## Checkbox — all variants

### Layer structure
| Property | Figma | Code | Status |
|---|---|---|---|
| Box size | 16×16px | 12×12px | ❌ |
| Corner radius | 5px | `var(--radius-small)` = 2px | ❌ |
| Unchecked fill | #F5F5F5 | transparent | ❌ |
| Unchecked border | 1px solid #E6E6E6 (`color/border-default`-equivalent) | `1.5px solid var(--color-border-strong)` = #2c2c2c | ❌ color + weight mismatch |
| Checked fill | `color/bg/brand` = #0D99FF | `var(--color-bg-brand)` = #0d99ff | ✅ |
| Checked border | 1px solid blue | none | ⚠️ minor |
| Check mark shape | filled Rectangle 8×6, cornerRadius=1 | SVG path checkmark (line-based) | ❌ different visual style |
| Indeterminate mark | filled Rectangle 8×2, cornerRadius=1 | SVG rect 8×2, rx=1 | ✅ |
| Disabled opacity | separate Disabled=true variants | `opacity: 0.4` | ✅ intent matches |
| Label gap | — (no label in component set) | gap = 6px | ⚠️ not comparable |

### Variant coverage
| Figma variant | Code equivalent | Status |
|---|---|---|
| `State=unchecked` | `checked={false}` | ✅ |
| `State=checked` | `checked={true}` | ✅ |
| `State=indeterminate` | `checked="indeterminate"` | ✅ |
| `Disabled=true` | `disabled` prop | ✅ |

### Notes
- Box size is notably smaller in code (12px vs 16px). At UI density this is a meaningful visual difference — Figma's checkbox is 33% larger.
- Unchecked border color is a clear bug: code uses `--color-border-strong` (#2c2c2c, near-black) while Figma uses a light gray stroke (#E6E6E6). Should use `--color-border-default`.
- Check mark is visually different: Figma uses a rounded filled rectangle (more "blocky"), code uses an SVG path (more "traditional"). The Figma check is heavier/bolder.
- Corner radius discrepancy (5px Figma vs 2px code) is consistent with other components using `--radius-small` incorrectly.

---

## Switch — all variants

### Layer structure
| Property | Figma | Code | Status |
|---|---|---|---|
| Track width | 32px | 24px | ❌ |
| Track height | 24px | 14px | ❌ |
| Track shape | cornerRadius=9999 (pill) | `var(--radius-full)` (pill) | ✅ |
| Thumb size | 14×14px ellipse | 10×10px span | ❌ |
| Thumb offset from edge | ~5px (visual) | top=2, left=2 (off) / left=12 (on) | ⚠️ approx matches |
| Off track fill | #E6E6E6 (`VariableID:9:68`) | `var(--color-bg-disabled)` = #d9d9d9 | ⚠️ close (~10% lighter) |
| On track fill | `color/bg/brand` = #0D99FF | `var(--color-bg-brand)` = #0d99ff | ✅ |
| Thumb fill (on/off) | white | white | ✅ |
| Disabled (off) fill | #D9D9D9 | opacity: 0.4 (on gray) | ⚠️ different approach |
| Disabled (on) fill | #E6E6E6 (same as off!) | opacity: 0.4 (on brand) | ⚠️ different approach |
| Indeterminate thumb | 8×2 rect (pill) | — | ❌ Missing |

### Variant coverage
| Figma variant | Code equivalent | Status |
|---|---|---|
| `State=off` | `checked={false}` | ✅ |
| `State=on` | `checked={true}` | ✅ |
| `State=indeterminate` | — | ❌ Missing |
| `Disabled=true` | `disabled` prop | ✅ |

### Notes
- Track is ~25% smaller in code (32×24 Figma vs 24×14 code). At these sizes, the difference is very visible — Figma's switch is noticeably larger and wider.
- Indeterminate state in Figma shows a small horizontal dash (8×2px) instead of the circular thumb — a third visual state indicating partial/mixed selection. Code only supports boolean on/off.
- In Figma, `State=on, Disabled=true` uses the same light gray fill as `State=off` (not the brand blue with reduced opacity). Code uses `opacity: 0.4` on the brand color instead. Visual result differs.

---

## Badge — base variant (Variant=defaultFilled, Size=md)

### Layer structure
| Property | Figma | Code | Status |
|---|---|---|---|
| Height (`md`) | 16px | 14px | ❌ |
| Height (`lg`) | 20px | 16px | ❌ |
| Horizontal padding (`md`) | 4px | 4px | ✅ |
| Horizontal padding (`lg`) | 6px | 5px | ⚠️ 1px off |
| Corner radius | 5px (rounded rect) | `var(--radius-full)` (pill) | ❌ shape differs |
| Font size (`md`) | 11px | 9px | ❌ |
| Font size (`lg`) | 13px | 10px | ❌ |
| Font weight | Inter Regular (400) | `var(--font-weight-strong)` = 550 | ❌ |
| Letter spacing | 0% | 0.5px | ❌ |
| `defaultFilled` background | #E5E5E5 (light gray) | `var(--color-bg-inverse)` = #2c2c2c (dark!) | ❌ |
| `defaultFilled` text | `color/text` = dark | `var(--color-text-onbrand)` = white | ❌ |

### Variant coverage
| Figma variant | Code equivalent | Status |
|---|---|---|
| `defaultFilled` | `variant="defaultFilled"` | ⚠️ colors wrong (see above) |
| `defaultOutline` | `variant="defaultOutline"` | ✅ |
| `brandFilled` | `variant="brandFilled"` | ✅ |
| `brandOutline` | `variant="brandOutline"` | ✅ |
| `componentFilled` | `variant="componentFilled"` | ✅ |
| `componentOutline` | `variant="componentOutline"` | ✅ |
| `successFilled` | `variant="successFilled"` | ✅ |
| `successOutline` | `variant="successOutline"` | ✅ |
| `warningFilled` | `variant="warningFilled"` | ✅ |
| `warningOutline` | `variant="warningOutline"` | ✅ |
| `dangerFilled` | `variant="dangerFilled"` | ✅ |
| `dangerOutline` | `variant="dangerOutline"` | ✅ |
| `inactiveFilled` | `variant="inactiveFilled"` | ✅ |
| `inactiveOutline` | `variant="inactiveOutline"` | ✅ |
| `onFill` | `variant="onFill"` | ✅ |
| — | `variant="inverseFilled"` | ❌ No Figma equivalent |

### Notes
- Shape is the most critical divergence: Figma uses a rounded rectangle (5px corners), code renders as a full pill. The Figma screenshots confirm this — badges are clearly rectangular with rounded corners, not pill-shaped.
- All code sizes are 2–4px shorter than Figma equivalents. Combined with smaller font (9px vs 11px), code badges will appear notably more compact.
- `defaultFilled` colors are inverted between Figma and code: Figma is dark-text-on-light-gray, code maps it to `--color-bg-inverse` (dark #2c2c2c background) + white text. This may be an intentional design divergence (code treats "default" as dark/inverse).
- `inverseFilled` is a code-only variant with no Figma counterpart.
- Font weight is `strong` (550) in code but `Regular` (400) in Figma across all badge variants.

---

## Chip — base variant (Variant=primary, Selected=false, Disabled=false)

### Layer structure
| Property | Figma | Code | Status |
|---|---|---|---|
| Height | 24px | 20px | ❌ |
| Horizontal padding | 8px | 6px | ❌ |
| Gap | 0 (no icon in base) | 4px | ⚠️ not comparable |
| Corner radius | 5px (rounded rect) | `var(--radius-full)` (pill) | ❌ shape differs |
| Font size | 11px | 11px | ✅ |
| Font weight | Inter Regular (400) | `var(--font-weight-default)` = 450 | ⚠️ known divergence |
| Letter spacing | 0% | 0.5px | ❌ |
| `primary` unselected fill | white (#ffffff) | code `default` = `var(--color-bg-default-secondary)` = #F5F5F5 | ❌ |
| `primary` unselected border | 1px #E6E6E6 (light gray) | `1px solid var(--color-border-default)` = #e6e6e6 | ✅ |
| `primary` selected fill | #E5F3FF (light blue, brand tertiary) | `var(--color-bg-selected)` = #e5f4ff | ✅ |
| `primary` selected border | 1px brand blue | `1px solid var(--color-border-selected)` = #0d99ff | ✅ |
| `component` unselected fill | white (#ffffff) | `var(--color-bg-brand-tertiary)` = #E5F4FF (light blue!) | ❌ |
| `component` selected fill | light purple (#F2E5FF) | same `var(--color-bg-selected)` blue | ❌ |

### Variant coverage
| Figma variant | Code equivalent | Status |
|---|---|---|
| `Variant=primary` | `variant="default"` | ⚠️ name mismatch; colors partially off |
| `Variant=component` | `variant="component"` | ⚠️ name matches; unselected fill wrong |
| `Selected=false/true` | `selected` boolean | ✅ |
| `Disabled=true` | `disabled` prop | ✅ |
| — | `variant="success"` / `"warning"` / `"danger"` / `"toggle"` / `"override"` | ❌ 5 code-only variants |

### Notes
- Shape differs: Figma Chip is a rounded rectangle (5px), code is a full pill. The Figma screenshot confirms the rectangular chip shape.
- Code `variant="component"` uses a blue background (brand tertiary) but Figma `component` chip is white with a purple stroke. The `component` chip in Figma is purple-themed throughout, not blue.
- Code `variant="default"` maps to Figma `primary` but uses a gray background (#F5F5F5) while Figma's unselected primary chip is white.
- The 5 extra code variants (success/warning/danger/toggle/override) may be extensions for non-Figma use cases or pending Figma updates.
- `--color-bg-selected` = #E5F4FF (code) vs Figma `primary` selected fill = #E5F3FF — within 1 digit, effectively the same ✅.

---

## Toast — all variants

### Layer structure
| Property | Figma | Code | Status |
|---|---|---|---|
| Height | 40px | 32px | ❌ |
| Horizontal padding | 16px | 12px | ❌ |
| Gap | 8px | 8px | ✅ |
| Corner radius | 13px (large but not full pill) | `var(--radius-full)` (pill) | ❌ |
| Default background | white (#ffffff) | `var(--color-bg-inverse)` = #1e1e1e (dark) | ❌ inverted |
| Danger background | #F24822 (danger red) | `var(--color-bg-danger)` = #f24822 | ✅ |
| Default text color | `color/text` = dark | `var(--color-text-onbrand)` = white | ❌ (follows bg inversion) |
| Font size | 11px | 11px | ✅ |
| Font weight | Inter Medium (500) | `var(--font-weight-default)` = 450 | ⚠️ |
| Letter spacing | 0% | 0.5px | ❌ |

### Variant coverage
| Figma variant | Code equivalent | Status |
|---|---|---|
| `Variant=default` | `variant="default"` | ⚠️ name matches, visual inverted |
| `Variant=danger` | `variant="danger"` | ✅ colors match |
| — | `variant="message"` | ❌ Code-only |
| — | `variant="message-dismiss"` | ❌ Code-only |
| — | `variant="success"` | ❌ Code-only |
| — | `variant="warning"` | ❌ Code-only |

### Notes
- The `default` toast is the most significant divergence here: Figma renders it as a **white card** with dark text (light theme, like a notification popover), but code renders it as a **dark/inverse pill** with white text (like a floating HUD). These look completely different on screen.
- Corner radius: Figma uses 13px, which at 40px height creates a "stadium" shape but not a full pill. Code uses `radius-full`, making it a perfect pill at any height.
- The 4 code-only variants (`message`, `message-dismiss`, `success`, `warning`) extend the Figma spec — not necessarily wrong, but not backed by Figma designs.
- Code toasts are implemented as a portal/provider system; Figma shows individual component states. Infrastructure differs but output is comparable.

---

## Tooltip / ToggleTip

### Figma vs Code alignment

**Figma file contains:** `ToggleTip` component set (2 variants: `primary` = white, `strong` = dark).  
**Figma file contains NO:** plain hover `Tooltip` component.  
**Code contains:** `Tooltip.tsx` (hover tooltip, no ToggleTip).

These are two different components being compared across the boundary.

### ToggleTip (Figma) — base variant (Variant=primary)
| Property | Figma | Code Tooltip | Status |
|---|---|---|---|
| Padding top/bottom | 8px | 4px | ❌ (2× difference) |
| Padding left/right | 12px | 6px | ❌ (2× difference) |
| Corner radius | 5px | `var(--radius-small)` = 2px | ❌ |
| Font size | 11px | 11px | ✅ |
| Font weight | Inter Regular (400) | `var(--font-weight-default)` = 450 | ⚠️ |
| Letter spacing | 0% | 0.5px | ❌ |
| `primary` background | white (#ffffff) | — | — |
| `primary` border | 1px #E6E6E6 | — | — |
| `strong` background | dark (#2c2c2c, approx) | `var(--color-bg-tooltip)` = #1e1e1e | ⚠️ different dark shade |
| Max-width | 152px (fixed in component) | none (whiteSpace nowrap) | ⚠️ |

### Variant coverage
| Figma variant | Code equivalent | Status |
|---|---|---|
| `Variant=primary` (white, bordered) | — | ❌ No code equivalent |
| `Variant=strong` (dark) | `Tooltip` component (approximate) | ⚠️ different dark shade, different padding |
| ToggleTip component (click-triggered) | — | ❌ Missing — code only has hover Tooltip |

### Notes
- **The Tooltip/ToggleTip boundary is a conceptual mismatch**: Figma uses "ToggleTip" (a click-triggered disclosure) while code implements a hover `Tooltip`. These are different interaction patterns — ToggleTip is a popover, Tooltip is ephemeral on hover.
- Figma's `primary` ToggleTip (white + border) has no code counterpart at all.
- Figma's `strong` ToggleTip (dark) is the closest match to the code `Tooltip`, but padding is 2× larger in Figma (8/12px vs 4/6px) and corner radius is 5px vs 2px.
- Code `Tooltip` is not in the Figma file at all — it would need to be added as a new Figma component, or the `ToggleTip` in Figma needs to be documented as covering both use cases.

---

