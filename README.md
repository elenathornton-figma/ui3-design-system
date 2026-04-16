# UI3 Design System

A React + TypeScript component library generated from the Figma UI3 design libraries. Includes design tokens, themed CSS variables, and 19 components covering the full UI3 component surface.

## Sticker Sheet

<!--
  To generate screenshots: cd demo && npm install && npm run dev
  Then open http://localhost:5173, toggle light/dark, and screenshot each section.
-->

### Light theme

<!-- replace with screenshot -->
_screenshot coming soon_

### Dark theme

<!-- replace with screenshot -->
_screenshot coming soon_

---

## What's included

### Design tokens
| Token set | Description |
|-----------|-------------|
| **Colors** | ~60 semantic color tokens for text, icons, backgrounds, borders, and product surfaces (light + dark) |
| **Typography** | Font families (Inter, Whyte, Roboto Mono), weights, and a 10-step type scale |
| **Spacing** | 8 spacer steps (0–40px) |
| **Radius** | 5 radius steps (none → full) |

### Components
| Component | Notes |
|-----------|-------|
| `Button` | primary / secondary / tertiary / destructive / ghost × large / medium / small + loading state |
| `IconButton` | icon-only variant of Button |
| `Input` | label, helper/error text, leading/trailing icon, size variants |
| `Textarea` | mirrors Input, configurable resize |
| `Select` | custom dropdown, controlled + uncontrolled |
| `Slider` | single thumb, custom visual track |
| `Checkbox` | checked / unchecked / indeterminate |
| `Radio` + `RadioGroup` | compound component with option list |
| `Switch` | animated toggle |
| `Badge` | count / dot, anchors over a child element |
| `Avatar` | image with initials fallback, stable hue-based colors |
| `Chip` | removable, leading icon slot |
| `Tooltip` | 4 placements, configurable delay |
| `Tabs` + `TabPanel` | controlled + uncontrolled |
| `Collapse` | animated expand/collapse with accessible aria attributes |
| `Menu` | trigger + overlay, separator support |
| `Modal` | focus trap, Escape + backdrop-click dismiss |
| `Toast` + `ToastProvider` | duration-based auto-dismiss, `useToast()` hook |
| `Loading` | spinner and dot variants |
| `Icon` | ~20 named icons + catch-all |

### Theming
CSS custom properties via `data-theme` attribute. Supported themes: `light`, `dark`. EC variants (`light-ec`, `dark-ec`) are stubbed — see [GAPS.md](GAPS.md).

---

## Usage

```tsx
// 1. Import CSS variables (once, at app root)
import "@figma/ui3-design-system/theme/vars.css";

// 2. Wrap your app in ThemeProvider
import { ThemeProvider, Button } from "@figma/ui3-design-system";

export default function App() {
  return (
    <ThemeProvider theme="light">
      <Button variant="primary">Hello</Button>
    </ThemeProvider>
  );
}
```

---

## Running the sticker sheet demo

```bash
cd demo
npm install
npm run dev
# open http://localhost:5173
```

---

## Known gaps

See [GAPS.md](GAPS.md) for a full list. Key items:

- **EC themes** — `light-ec` / `dark-ec` token primitives live in an external file not included in the three source libraries; selectors are stubbed
- **8 components not yet implemented** — Combobox, DatePicker, ColorPicker, Tree, Table, Pagination, Progress, Breadcrumb
- **Icons** — SVG paths extracted from search results; a small number of less-common icons may be missing or approximated
- **Multi-surface tokens** — FigJam, Slides, Sites, and other product surface token collections are not yet implemented

---

## Source Figma libraries

| Library | File key |
|---------|----------|
| UI3 Components | `N0izGT6Y7WwEOJABqPXBCv` |
| UI3 Tokens | `vnBChO91d7tXFBMmlzGM6F` |
| UI3 Icons | `ycDPAaAih2bZY5LgXehVai` |
