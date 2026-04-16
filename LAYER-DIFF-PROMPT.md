# Component Layer Diff — Session Prompt

Structural and visual comparison of Figma component layers against React component implementations. Analysis only — no changes to either system.

---

## Sources

- **Code repo:** `/Users/lthornton/figma/ui3-design-system`
- **Figma file:** `https://staging.figma.com/design/FCKLpj5AjgrFNfS4D7uY95/FPL--code-%3E-design-`
  - fileKey: `FCKLpj5AjgrFNfS4D7uY95`
  - Use `plugin:figma-plugin:figma-mcp-staging` for all Figma reads
- **Before any Figma tool calls, invoke the `figma-plugin:figma-use` skill.**

---

## Component priority order

Work through these in order. Stop and write findings after each one — don't batch.

1. **Button** — most-used, has known variant gaps
2. **Input** — size/state variants, focus ring, icon slots
3. **Loading (LoadingSpinner)** — known size mismatch from DIFF.md
4. **Select** — missing size prop in code
5. **Checkbox** — simple, good calibration target
6. **Switch** — missing indeterminate state
7. **Badge** — recently overhauled, verify alignment
8. **Chip** — known variant name mismatch
9. **Toast** — code has extra variants not in Figma
10. **Tooltip / ToggleTip** — compare both

---

## Method per component

### Step 1 — Extract Figma layer tree

Use `use_figma` to traverse the component set and pull every relevant property from the default/base variant (e.g. `Variant=primary, Size=md, State=default` for Button). Then repeat for at least one other variant that exercises a different visual state.

```js
// Replace TARGET_COMPONENT_SET_ID with the id from the component list
const node = await figma.getNodeByIdAsync('TARGET_COMPONENT_SET_ID');

function extractNode(n, depth = 0) {
  const indent = '  '.repeat(depth);
  const info = {
    id: n.id,
    name: n.name,
    type: n.type,
  };

  // Geometry
  if ('width' in n)  info.width  = Math.round(n.width);
  if ('height' in n) info.height = Math.round(n.height);

  // Auto layout
  if (n.layoutMode) {
    info.layoutMode = n.layoutMode;
    info.paddingTop    = n.paddingTop;
    info.paddingRight  = n.paddingRight;
    info.paddingBottom = n.paddingBottom;
    info.paddingLeft   = n.paddingLeft;
    info.itemSpacing   = n.itemSpacing;
    info.primaryAxisAlignItems   = n.primaryAxisAlignItems;
    info.counterAxisAlignItems   = n.counterAxisAlignItems;
  }

  // Corner radius
  if ('cornerRadius' in n && n.cornerRadius) info.cornerRadius = n.cornerRadius;
  if ('topLeftRadius' in n && n.topLeftRadius) {
    info.cornerRadii = [n.topLeftRadius, n.topRightRadius, n.bottomRightRadius, n.bottomLeftRadius];
  }

  // Fills
  if ('fills' in n && n.fills && n.fills.length) {
    info.fills = n.fills.map(f => ({
      type: f.type,
      color: f.type === 'SOLID' ? f.color : null,
      opacity: f.opacity ?? 1,
      boundVariables: f.boundVariables ?? null,
    }));
  }

  // Strokes
  if ('strokes' in n && n.strokes && n.strokes.length) {
    info.strokes = n.strokes.map(s => ({ type: s.type, color: s.color, weight: n.strokeWeight }));
  }

  // Opacity
  if ('opacity' in n && n.opacity !== 1) info.opacity = n.opacity;

  // Text
  if (n.type === 'TEXT') {
    info.characters  = n.characters;
    info.fontSize    = n.fontSize;
    info.fontName    = n.fontName;
    info.lineHeight  = n.lineHeight;
    info.letterSpacing = n.letterSpacing;
    info.textAlignHorizontal = n.textAlignHorizontal;
    info.fills = ('fills' in n && n.fills) ? n.fills.map(f => ({ type: f.type, color: f.type === 'SOLID' ? f.color : null, boundVariables: f.boundVariables ?? null })) : [];
  }

  const result = { ...info };
  if ('children' in n && n.children.length) {
    result.children = n.children.map(c => extractNode(c, depth + 1));
  }
  return result;
}

// Get the first variant (base state)
const firstVariant = node.type === 'COMPONENT_SET' ? node.children[0] : node;
return extractNode(firstVariant);
```

### Step 2 — Get a Figma screenshot

Call `get_screenshot` on the component set node ID to get a visual reference.

### Step 3 — Read the code implementation

Read `src/components/<ComponentName>/<ComponentName>.tsx`. Extract:
- All hardcoded dimension values (height, padding, gap, font-size, border-radius)
- All CSS variable references (`var(--color-*)`, `var(--radius-*)`, `var(--font-*)`, `var(--spacing-*)`)
- Variant logic (what changes per variant/size/state)

### Step 4 — Produce the diff table

For each property, compare Figma's value against the code's value. Format:

```
## <ComponentName> — base variant (<variant name used>)

### Layer structure
| Layer | Figma | Code | Status |
|---|---|---|---|
| Root frame height | 32px | 32px | ✅ |
| Horizontal padding | 12px | 12px | ✅ |
| Gap (icon → label) | 6px | 6px | ✅ |
| Border radius | 5px (var --radius-medium) | var(--radius-medium) | ✅ |
| Background (primary) | blue/500 (#0d99ff) | var(--color-bg-brand) = #0d99ff | ✅ |
| Label font size | 13px | 13px | ✅ |
| Label font weight | Medium (500) | var(--font-weight-strong) = 550 | ⚠️ |
| Label letter spacing | -0.25px | -0.25px | ✅ |

### Variant coverage
| Figma variant | Code equivalent | Status |
|---|---|---|
| Variant=primary | variant="primary" | ✅ |
| Variant=destructiveSecondary | — | ❌ Missing |
...

### Screenshot
[Attach get_screenshot output]

### Notes
- Any subtle visual differences not captured by the table
- Anything that can't be directly compared (e.g. hover states, transitions)
```

---

## Output

Append each component's diff to `/Users/lthornton/figma/ui3-design-system/LAYER-DIFF.md`.

Use this header for the file:

```markdown
# Component Layer Diff
Figma file `FCKLpj5AjgrFNfS4D7uY95` vs `src/components/`
Date: <today>
```

One H2 section per component. Keep tables tight — ✅/⚠️/❌ for scanning.

---

## Component ID reference

From the Figma file (as of 2026-04-16):

| Component | Page node ID | Component set ID |
|---|---|---|
| LoadingSpinner | 22:2 | 22:12 |
| Badge | 25:2 | 25:63 |
| Button | 26:2 | 26:67 |
| IconButton | 27:2 | 27:67 |
| ToggleButton | 29:2 | 29:35 |
| Checkbox | 30:2 | 30:13 |
| Switch | 31:2 | 31:21 |
| Input | 33:2 | 33:15 |
| RadioInput | 34:2 | 34:9 |
| Textarea | 34:11 | 34:18 |
| SegmentedControl | 34:20 | 34:49 |
| Chip | 35:21 | 35:38 |
| Banner | 36:2 | 36:18 |
| Toast | 36:20 | 36:25 |
| Tabs | 38:2 | 38:17 |
| Collapse | 38:19 | 38:30 |
| Slider | 38:32 | 38:41 |
| Modal | 39:2 | 39:15 |
| Menu | 39:17 | 39:28 |
| Select | 40:35 | 40:54 |

---

## Known limitations going in

- Figma hover/pressed/focus states are component variants — code handles these via CSS pseudo-classes or JS state. No direct comparison possible; note them as "state not comparable."
- Figma font weights use standard values (400/500); code uses Inter Variable (450/550). Weight differences of ≤50 are a known structural limitation, not a bug.
- Figma `display` style uses Inter (Whyte unavailable). Code uses Whyte with Inter fallback. Any display-heading font differences are expected.
- Variable alias resolution: Figma fills often point to `VariableID:x:y` aliases. Resolve them to the Primitives ramp to get the hex value, then compare against the resolved CSS var value.
