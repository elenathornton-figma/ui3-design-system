# Code ↔ Figma Diff
Quick reference. Each row: what differs, and what it costs to close the gap.

*Last updated: 2026-04-16. Reflects upstream commit `baa0995` which landed Badge variants, Chip update, Banner, SegmentedControl, EC theme values, and icon SVG expansions.*

---

## Typography

| Diff | Fix |
|---|---|
| Style name: code `heading/display`, Figma `display` | Rename one side — one-liner in `typography.ts` or rename the Figma text style |
| Separator: code `body/large/strong`, Figma `body/large-strong` | Rename all 3 `*/strong` keys in `typeScale` or rename 3 Figma text styles |
| `display` font weight: code 550, Figma Regular (400) | Change one value in `typography.ts` or update Figma text style |
| `body/small/strong` letter spacing: code 0.5%, Figma 3% (0.27px) | Change one value in `typography.ts` or update Figma text style |
| Font weights generally: code uses 450/550 (Inter Variable), Figma uses 400/500 | Structural — Figma doesn't support fractional weights. Accept divergence or round code values to 400/500 |

---

## Tokens

| Diff | Fix |
|---|---|
| Base-tier `bg` naming: code `--color-bg-default`, Figma `color/bg` | Rename ~5 CSS vars + update all component usages, **or** add alias variables in Figma |
| ~17 semantic tokens in Figma with no CSS counterpart (`text/selected`, `text/ondanger`, `text/onwarning`, `text/onsuccess`, `text/tooltip`, `icon/selected`, `border/danger`, `border/warning`, `border/success`, `border/assistive`, `border/ondanger`, `border/onwarning`, `bg/component` family, `bg/selected-secondary`) | Add ~17 CSS vars to `vars.css` and `colors.ts` — values readable from Figma |
| ~~EC themes (`light-ec`, `dark-ec`): stubs empty~~ | ✅ Fixed in `baa0995` — `light-ec` (53 overrides) and `dark-ec` (30 overrides) now populated in `vars.css` |
| ~655 tokens in Figma with no code counterpart (product surface, desktop context, fullscreen, extended interactive states) | Architectural — requires multi-surface theme system, not just CSS additions. Not a realistic sync target |

---

## Components

| Component | Diff | Fix |
|---|---|---|
| **LoadingSpinner / Loading** | Size values shifted: Figma sm=16, md=24, lg=32 vs code small=12, medium=16, large=24 | Rename size tiers in code + decide fate of 12px (add xsmall to Figma, or drop it) |
| ~~**Badge**~~ | ✅ Fixed in `baa0995` — now has 15 fill+outline variants × `md`/`lg` sizes matching Figma | — |
| **Button** | Code missing: `destructiveSecondary`, `link`, `destructiveLink`, `inverse`. Code extra: `tertiary` (no Figma equiv) | Add 4 variants to `Button.tsx`; decide whether to keep `tertiary` or map it to `link` |
| **Button sizes** | Code: `large`/`medium`/`small`. Figma: `lg`/`md`, no `small` | Rename code size props, decide whether to keep `small` |
| **IconButton** | Figma has it as a standalone component set with `ghost`/`secondary`/`highlighted`/`primary` × `square`/`circle`; code has it embedded in `Button.tsx` with no variant/shape support | Extract `IconButton` to its own file, add variant and shape props |
| **ToggleButton** | In Figma (`primary`/`highlighted` × `md`/`lg` × checked on/off), not in code | New component |
| **Switch** | Missing `indeterminate` state in code | Add `indeterminate` to `SwitchProps` |
| **Input** | Code has `medium` (28px) and `small` (24px); Figma has `md` and `lg` | Add `lg` size to code (likely 32px); rename `small` → `sm` or decide to drop it |
| **Select** | No size prop in code; Figma has `md`/`lg` | Add `size` prop |
| **Modal** | Code has a free-form `width` prop; Figma has `sm`/`md`/`lg` size variants | Add a `size` prop that maps to fixed widths |
| **Chip** | Partially updated in `baa0995`: code now has `default`/`component`/`success`/`warning`/`danger`/`toggle`/`override`. Figma shows `primary`/`component`. Code `default` ≠ Figma `primary`; code has 5 extra variants not in Figma | Rename code `default` → `primary`, or update Figma `primary` → `default`. Decide whether extra variants (success/warning/danger/toggle/override) go into Figma |
| **Toast** | Code has `success`/`warning` variants; Figma only has `default`/`danger` | Either add them to Figma, or accept they're code-only extensions |
| ~~**Banner**~~ | ✅ Fixed in `baa0995` — `Banner.tsx` now exists | — |
| ~~**SegmentedControl**~~ | ✅ Fixed in `baa0995` — `SegmentedControl.tsx` now exists | — |
| **Avatar** | In code, not in this Figma file | Add Avatar component page to Figma |
| **Link / LinkButton** | In Figma, not in code | New component (low complexity) |
| **Callout** | In Figma, not in code | New component (low complexity) |
| **ToggleTip** | In Figma, not in code | New component (low complexity) |
| **ButtonGroup** | In Figma, not in code | New component (low complexity) |
| **BadgedIcon** | In Figma, not in code | New component (low complexity) |
| **Label / Description / Legend** | In Figma (text primitives), not in code | New components (trivial) |
| **Stack** | In Figma (layout primitive), not in code | New component (trivial) |
| **Popover** | In Figma, not in code | New component (high complexity — floating + positioning) |
| **Dialog** | In Figma, not in code (Modal covers similar ground) | Clarify whether Dialog = Modal or a new surface |
| **Window** | In Figma, not in code | High complexity — resize + drag |
| **Scrubbable / Entry / ScrollContainer / TreeGrid / ResizeHandle / CardPrimitive / SplitInput / Toolbar** | In Figma, not in code | Medium–high complexity; likely Figma-internal surfaces |

---

## Keeping in sync going forward

There's no automated mechanism. Current drift happens because either side can change without notifying the other. Options in rough order of effort:

1. **Convention only.** Any PR that touches tokens or component APIs must include a Figma update (or a note that one is pending). No tooling, relies on discipline.
2. **Codegen from tokens.** Run a script that reads Figma variables (via REST API or this Plugin API) and writes `vars.css` and `colors.ts`. Figma becomes the token source of truth; code is generated. Adds a build step.
3. **Figma Code Connect.** Maps Figma component instances to code snippets. Doesn't enforce value parity but makes the link explicit and visible in Figma's Dev Mode.
4. **Token pipeline (Style Dictionary or similar).** Tokens live in a neutral format (JSON/YAML), generated into both CSS and Figma variables. Both sides are outputs — neither is the source of truth.
