# Figma ↔ Code Parity — Session Prompt

**Direction: code is the source of truth. Update Figma to match.**

Duplicate the original file first, then point this prompt at the duplicate. Never write to the original.

---

## Sources

- **Code repo:** `/Users/lthornton/figma/ui3-design-system`
- **Figma duplicate:** user will provide the URL/fileKey at session start — extract fileKey from the URL
- **MCP server:** `plugin:figma-plugin:figma-mcp-staging` for all Figma reads and writes
- **Before any Figma tool calls, invoke the `figma-plugin:figma-use` skill.**

Reference files in the repo:
- `src/theme/vars.css` — CSS custom properties (ground truth for token values)
- `src/tokens/colors.ts` — light/dark color values
- `src/tokens/typography.ts` — type scale
- `src/tokens/spacing.ts` — spacing values
- `src/tokens/radius.ts` — radius values
- `src/components/<Name>/<Name>.tsx` — each component implementation
- `DIFF.md` — known differences (start here to understand scope)

---

## What "parity" means

For **variables/tokens:** Figma variable values (Light + Dark modes) must match the resolved hex values in `vars.css` / `colors.ts`.

For **components:** 
- Variant property names and values must match the TypeScript prop types in code (e.g. if code has `variant="destructiveSecondary"`, Figma must have a `Variant=destructiveSecondary` property)
- Layer dimensions (height, padding, gap, font-size, border-radius) must match the pixel values in code
- Color fills must be bound to the correct Figma variable (not hardcoded hex)
- Missing variants in Figma must be added; Figma variants with no code counterpart should be flagged but not removed without confirmation

---

## Phase 1 — Token variable audit

Before touching any components, verify the Figma Color collection values match `vars.css`.

1. Read all variables from the `Color` collection using `use_figma`
2. Resolve each alias chain back to the `Primitives` collection to get the hex value
3. Compare against the Light/Dark values in `vars.css`
4. For any mismatches, update the Figma variable value to match `vars.css`

Do this for the full set — don't skip variables. Values that are wrong here will silently propagate to every component.

---

## Phase 2 — Typography styles

Read the 10 text styles in Figma and compare against `typeScale` in `typography.ts`.

Update any Figma text style where:
- Font size differs
- Line height differs  
- Letter spacing differs (convert code % value to px: `fontSize * (percent / 100)`)
- Font weight: code uses Inter Variable (450/550) — Figma cannot represent fractional weights. Map 450 → Regular, 550 → Medium. **Do not treat this as a mismatch.**
- Style name differs from code key: if code uses `body/large/strong` and Figma uses `body/large-strong`, rename the Figma style to match the code key

---

## Phase 3 — Components (work one at a time)

For each component below, follow this loop:

1. **Read the code** — open `src/components/<Name>/<Name>.tsx`, extract every hardcoded pixel value, CSS variable reference, and variant definition
2. **Read the Figma node** — use `use_figma` to traverse the component set and extract the same properties from each variant (see extraction script in `LAYER-DIFF-PROMPT.md`)
3. **Diff** — list every property that differs
4. **Update Figma** — use `use_figma` to apply the changes. Work one property type at a time (dimensions first, then colors, then typography)
5. **Validate** — re-read the node after changes to confirm values landed correctly

### Component order

| # | Component | Key things to check |
|---|---|---|
| 1 | **Button** | Height per size (lg=32px, md=28px), padding, gap, variant names (add destructiveSecondary/link/destructiveLink/inverse, check tertiary) |
| 2 | **Input** | Height per size (md=28px), padding, border-radius (radius-small=2px), focus ring |
| 3 | **Select** | Height (28px), border-radius, add size prop variants (md/lg) |
| 4 | **Loading** | Sizes: sm→12px, md→16px, lg→24px (code names, not Figma names) |
| 5 | **Checkbox** | Box size (12px), border-radius (radius-small), fill color |
| 6 | **Switch** | Track size (24×14px), thumb size (10px), add indeterminate state |
| 7 | **Radio** | Circle size (12px), inner dot (4px) |
| 8 | **Badge** | Verify recent overhaul — height (14px), min-width, font-size (9px), border-radius (full) |
| 9 | **Chip** | Height (20px), border-radius (full), font-size (11px), variant names (code: default — Figma: primary — reconcile) |
| 10 | **Toast** | Height (32px), border-radius (full), add success/warning variants |
| 11 | **Tooltip** | Padding (4px 6px), border-radius (radius-small), font-size (11px) |
| 12 | **Tabs** | Tab height (32px), font-size (11px), active border (2px) |
| 13 | **Collapse** | Row height (24px), font-size (11px) |
| 14 | **Slider** | Track height (2px), thumb size (10px) |
| 15 | **Modal** | Border-radius (radius-large=13px), add size variants (sm/md/lg → fixed widths) |
| 16 | **Textarea** | Padding (6px 8px), border-radius (radius-small) |
| 17 | **Menu** | Item height (24px), panel border-radius (radius-medium=5px), padding (4px 0) |

---

## Variable binding rules

When updating a fill or stroke color in Figma, **always bind to a variable** rather than setting a raw hex value. Use this lookup to find the right variable:

| CSS var in code | Figma variable name |
|---|---|
| `--color-bg-brand` | `color/bg/brand` |
| `--color-bg-default` | `color/bg` |
| `--color-bg-danger` | `color/bg/danger` |
| `--color-bg-disabled` | `color/bg/disabled` |
| `--color-bg-inverse` | `color/bg/inverse` |
| `--color-bg-selected` | `color/bg/selected` |
| `--color-text-default` | `color/text` (or closest match) |
| `--color-text-onbrand` | `color/text/onbrand` |
| `--color-text-danger` | `color/text/danger` |
| `--color-border-default` | `color/border` |
| `--color-border-selected` | `color/border/selected` |
| `--color-icon-secondary` | `color/icon/secondary` |
| `--color-bg-tooltip` | `color/bg/tooltip` |
| `--color-bg-menu` | `color/bg/menu` |

To bind a variable to a fill in `use_figma`:
```js
// Get variable by name
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const colorCol = collections.find(c => c.name === 'Color');
const vars = await Promise.all(colorCol.variableIds.map(id => figma.variables.getVariableByIdAsync(id)));
const v = vars.find(v => v.name === 'color/bg/brand');

// Apply to a node's fill
const node = await figma.getNodeByIdAsync('NODE_ID');
const paint = { type: 'SOLID', color: { r: 0, g: 0, b: 0 } };
const boundPaint = figma.variables.setBoundVariableForPaint(paint, 'color', v);
node.fills = [boundPaint];
```

---

## Output

After each component, append a brief status block to `/Users/lthornton/figma/ui3-design-system/LAYER-DIFF.md`:

```markdown
## <ComponentName>
**Status:** ✅ in sync / ⚠️ partial / ❌ blocked

| Property | Code | Figma before | Figma after | Notes |
|---|---|---|---|---|
| Root height (md) | 28px | 30px | 28px | Fixed |
| ...

**Remaining gaps:** list anything not fixed and why
```

---

## Rules

- Never modify the original file — only the duplicate
- Work one component at a time; validate before moving to the next
- If a Figma variant has no code counterpart, flag it in the output but leave it in place
- If a code variant has no Figma counterpart, add it to Figma
- Do not remove any existing Figma layers — update in place where possible
- If a change would break Figma component constraints or auto-layout in a way that can't be cleanly fixed, document it and move on
