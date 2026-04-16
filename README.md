# UI3 Design System

A React + TypeScript component library generated from the Figma UI3 design libraries. Includes design tokens, themed CSS variables, and 19 components covering the full UI3 component surface.

## Sticker Sheet

<!--
  To generate screenshots: cd demo && npm install && npm run dev
  Then open http://localhost:5173, toggle light/dark, and screenshot each section.
-->

### Light theme
(these are just screenshots, you can generate an interactive demo following the instructions below)
<img width="973" height="367" alt="image" src="https://github.com/user-attachments/assets/50041a23-e20d-4cad-bdef-89dfb01f2580" />
<img width="935" height="391" alt="image" src="https://github.com/user-attachments/assets/7e88ad66-a384-4261-af73-ff6fbad33b3a" />
<img width="947" height="422" alt="image" src="https://github.com/user-attachments/assets/aa834da4-2b15-41fd-a880-9f869a4f6bf0" />
<img width="946" height="315" alt="image" src="https://github.com/user-attachments/assets/0247555c-e8d7-468a-8576-75d759c2f88a" />
<img width="957" height="367" alt="image" src="https://github.com/user-attachments/assets/c9858318-4ffe-4709-b489-c6cc0c9f9be5" />
<img width="940" height="428" alt="image" src="https://github.com/user-attachments/assets/be4bc8bb-2c39-44a4-8e16-f4c8f6b356fe" />
<img width="956" height="667" alt="image" src="https://github.com/user-attachments/assets/bf190d83-95c4-49e6-a969-4cbff577f0e8" />
<img width="941" height="674" alt="image" src="https://github.com/user-attachments/assets/cc5d4450-0a86-47ff-917c-3d2a0da49010" />
<img width="945" height="363" alt="image" src="https://github.com/user-attachments/assets/016fbe14-354b-426d-865f-47b251abcce2" />



### Dark theme

<img width="953" height="367" alt="image" src="https://github.com/user-attachments/assets/c23bdd6a-49b4-4bca-ab7c-c555563bc248" />
<img width="939" height="392" alt="image" src="https://github.com/user-attachments/assets/28475b28-4f97-4635-99ab-546e7112feb7" />
TODO: add the rest of the dark theme screenshots

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

See [GAPS.md](GAPS.md) for a full breakdown. Key items:

- **8 of 12 token collections skipped** — Only Design/Typography/Spacing/Radius were implemented. FigJam, Dev mode, Slides, Sites, Buzz, Draw, Make, and Animate collections were skipped (product-surface tokens not relevant to a UI component library).
- **EC themes empty** — `light-ec` / `dark-ec` CSS variables are unpopulated stubs because the EC primitive color file is in a separate Figma library not included in the provided three. Falls back to light/dark.
- **8 components not implemented** — Banner, SegmentedControl, Popover, Swatch, Form/FormField (beta), Windows, Notifications, Comments.
- **10 components approximated** — Variant/prop structures were inferred from component names rather than read from Figma nodes directly (view-only access blocks the Plugin API). See GAPS.md for per-component confidence levels.
- **Icons mostly placeholder** — SVG paths for ~20 common icons only; all others render a dashed rectangle. View-only access blocked SVG extraction.

---

## Source Figma libraries

| Library | File key |
|---------|----------|
| UI3 Components | `N0izGT6Y7WwEOJABqPXBCv` |
| UI3 Tokens | `vnBChO91d7tXFBMmlzGM6F` |
| UI3 Icons | `ycDPAaAih2bZY5LgXehVai` |
