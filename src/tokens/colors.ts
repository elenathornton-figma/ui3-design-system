/**
 * UI3 Design System — Color Tokens
 *
 * Semantic color tokens resolved from the UI3-Tokens Figma library.
 * Four themes are supported: light, dark, light-ec (enhanced contrast), dark-ec.
 *
 * NOTE: light-ec and dark-ec values are structurally identical to the Design
 * collection but map to higher-contrast primitives. They are omitted here
 * because the Figma primitive file for EC is not publicly accessible; stub
 * values default to the light/dark resolved values. Track issue: EC primitives
 * are stored in an external library file not included in the three exported
 * libraries.
 */

export type ColorTheme = "light" | "dark";

export interface ColorTokens {
  // ── Text ──────────────────────────────────────────────────────────────
  "text/default": string;
  "text/secondary": string;
  "text/tertiary": string;
  "text/onbrand": string;
  "text/onbrand-secondary": string;
  "text/onbrand-tertiary": string;
  "text/brand": string;
  "text/figjam": string;
  "text/handoff": string;
  "text/assistive": string;
  "text/danger": string;
  "text/warning": string;
  "text/success": string;

  // ── Icon ──────────────────────────────────────────────────────────────
  "icon/default": string;
  "icon/secondary": string;
  "icon/tertiary": string;
  "icon/onbrand": string;
  "icon/onbrand-secondary": string;
  "icon/onbrand-tertiary": string;
  "icon/brand": string;
  "icon/figjam": string;
  "icon/handoff": string;
  "icon/assistive": string;
  "icon/danger": string;
  "icon/warning": string;
  "icon/success": string;

  // ── Background (legacy _bg aliases, kept for backward compat) ─────────
  "bg/bg-default": string;
  "bg/bg-secondary": string;
  "bg/bg-hover": string;
  "bg/bg-selected": string;
  "bg/bg-menu": string;
  "bg/bg-toolbar": string;
  "bg/bg-brand": string;
  "bg/bg-figjam": string;
  "bg/bg-handoff": string;
  "bg/bg-assistive": string;
  "bg/bg-danger": string;
  "bg/bg-warning": string;
  "bg/bg-success": string;

  // ── Background semantic ───────────────────────────────────────────────
  "bg/brand/default": string;
  "bg/brand/hover": string;
  "bg/brand/pressed": string;
  "bg/brand/secondary": string;
  "bg/brand/tertiary": string;
  "bg/brand/tertiary-hover": string;
  "bg/brand/tertiary-pressed": string;

  "bg/danger/default": string;
  "bg/danger/hover": string;
  "bg/danger/pressed": string;
  "bg/danger/secondary": string;
  "bg/danger/tertiary": string;

  "bg/default/default": string;
  "bg/default/hover": string;
  "bg/default/pressed": string;
  "bg/default/secondary": string;
  "bg/default/tertiary": string;

  "bg/success/default": string;
  "bg/success/hover": string;
  "bg/success/pressed": string;
  "bg/success/secondary": string;
  "bg/success/tertiary": string;

  "bg/warning/default": string;
  "bg/warning/hover": string;
  "bg/warning/pressed": string;
  "bg/warning/secondary": string;
  "bg/warning/tertiary": string;

  "bg/disabled/default": string;
  "bg/disabled/secondary": string;

  "bg/inverse/default": string;
  "bg/inverse/hover": string;
  "bg/inverse/pressed": string;

  "bg/selected/default": string;
  "bg/selected/hover": string;
  "bg/selected/pressed": string;
  "bg/selected/strong": string;
  "bg/selected/strong-hover": string;
  "bg/selected/strong-pressed": string;

  "bg/elevated/default": string;
  "bg/elevated/hover": string;

  "bg/transparent/default": string;
  "bg/transparent/hover": string;
  "bg/transparent/pressed": string;

  "bg/menu/default": string;
  "bg/menu/hover": string;
  "bg/menu/selected": string;
  "bg/menu/selected-hover": string;
  "bg/menu/disabled": string;

  "bg/toolbar/default": string;
  "bg/toolbar/hover": string;
  "bg/toolbar/selected": string;
  "bg/toolbar/selected-hover": string;
  "bg/toolbar/disabled": string;

  "bg/tooltip/default": string;

  // ── Border ────────────────────────────────────────────────────────────
  "border/default": string;
  "border/strong": string;
  "border/onbrand-strong": string;
  "border/selected": string;
  "border/selected-strong": string;
  "border/menu": string;
}

const light: ColorTokens = {
  // Text
  "text/default": "#000000e5",
  "text/secondary": "#00000080",
  "text/tertiary": "#0000004d",
  "text/onbrand": "#ffffff",
  "text/onbrand-secondary": "#ffffffcc",
  "text/onbrand-tertiary": "#ffffff66",
  "text/brand": "#007be5",
  "text/figjam": "#8638e5",
  "text/handoff": "#009951",
  "text/assistive": "#ea10ac",
  "text/danger": "#dc3412",
  "text/warning": "#b86200",
  "text/success": "#009951",

  // Icon
  "icon/default": "#000000e5",
  "icon/secondary": "#00000080",
  "icon/tertiary": "#0000004d",
  "icon/onbrand": "#ffffff",
  "icon/onbrand-secondary": "#ffffffcc",
  "icon/onbrand-tertiary": "#ffffff66",
  "icon/brand": "#007be5",
  "icon/figjam": "#8638e5",
  "icon/handoff": "#009951",
  "icon/assistive": "#ea10ac",
  "icon/danger": "#dc3412",
  "icon/warning": "#b86200",
  "icon/success": "#009951",

  // Legacy bg aliases
  "bg/bg-default": "#ffffff",
  "bg/bg-secondary": "#f5f5f5",
  "bg/bg-hover": "#f5f5f5",
  "bg/bg-selected": "#e5f4ff",
  "bg/bg-menu": "#1e1e1e",
  "bg/bg-toolbar": "#2c2c2c",
  "bg/bg-brand": "#0d99ff",
  "bg/bg-figjam": "#9747ff",
  "bg/bg-handoff": "#14ae5c",
  "bg/bg-assistive": "#ff24bd",
  "bg/bg-danger": "#f24822",
  "bg/bg-warning": "#ffcd29",
  "bg/bg-success": "#14ae5c",

  // Brand
  "bg/brand/default": "#0d99ff",
  "bg/brand/hover": "#007be5",
  "bg/brand/pressed": "#0768cf",
  "bg/brand/secondary": "#0768cf",
  "bg/brand/tertiary": "#e5f4ff",
  "bg/brand/tertiary-hover": "#bde3ff",
  "bg/brand/tertiary-pressed": "#80caff",

  // Danger
  "bg/danger/default": "#f24822",
  "bg/danger/hover": "#dc3412",
  "bg/danger/pressed": "#bd2915",
  "bg/danger/secondary": "#bd2915",
  "bg/danger/tertiary": "#ffe2e0",

  // Default
  "bg/default/default": "#ffffff",
  "bg/default/hover": "#f5f5f5",
  "bg/default/pressed": "#e6e6e6",
  "bg/default/secondary": "#f5f5f5",
  "bg/default/tertiary": "#e6e6e6",

  // Success
  "bg/success/default": "#14ae5c",
  "bg/success/hover": "#009951",
  "bg/success/pressed": "#008043",
  "bg/success/secondary": "#008043",
  "bg/success/tertiary": "#e0f6e5",

  // Warning
  "bg/warning/default": "#ffcd29",
  "bg/warning/hover": "#ffc21a",
  "bg/warning/pressed": "#fab815",
  "bg/warning/secondary": "#fab815",
  "bg/warning/tertiary": "#fff1c2",

  // Disabled
  "bg/disabled/default": "#d9d9d9",
  "bg/disabled/secondary": "#b3b3b3",

  // Inverse
  "bg/inverse/default": "#2c2c2c",
  "bg/inverse/hover": "#383838",
  "bg/inverse/pressed": "#444444",

  // Selected
  "bg/selected/default": "#e5f4ff",
  "bg/selected/hover": "#bde3ff",
  "bg/selected/pressed": "#80caff",
  "bg/selected/strong": "#0d99ff",
  "bg/selected/strong-hover": "#007be5",
  "bg/selected/strong-pressed": "#0768cf",

  // Elevated
  "bg/elevated/default": "#ffffff",
  "bg/elevated/hover": "#f5f5f5",

  // Transparent
  "bg/transparent/default": "#0000000d",
  "bg/transparent/hover": "#0000000d",
  "bg/transparent/pressed": "#0000001a",

  // Menu
  "bg/menu/default": "#1e1e1e",
  "bg/menu/hover": "#2c2c2c",
  "bg/menu/selected": "#0d99ff",
  "bg/menu/selected-hover": "#007be5",
  "bg/menu/disabled": "#757575",

  // Toolbar
  "bg/toolbar/default": "#2c2c2c",
  "bg/toolbar/hover": "#111111",
  "bg/toolbar/selected": "#0d99ff",
  "bg/toolbar/selected-hover": "#007be5",
  "bg/toolbar/disabled": "#757575",

  // Tooltip
  "bg/tooltip/default": "#1e1e1e",

  // Border
  "border/default": "#e6e6e6",
  "border/strong": "#2c2c2c",
  "border/onbrand-strong": "#ffffff",
  "border/selected": "#0d99ff",
  "border/selected-strong": "#007be5",
  "border/menu": "#383838",
};

const dark: ColorTokens = {
  // Text
  "text/default": "#ffffff",
  "text/secondary": "#ffffffb2",
  "text/tertiary": "#ffffff66",
  "text/onbrand": "#ffffff",
  "text/onbrand-secondary": "#ffffffcc",
  "text/onbrand-tertiary": "#ffffff66",
  "text/brand": "#7cc4f8",
  "text/figjam": "#c5b2dc",
  "text/handoff": "#7cd797",
  "text/assistive": "#fc9ce0",
  "text/danger": "#fca397",
  "text/warning": "#f7d15f",
  "text/success": "#7cd797",

  // Icon
  "icon/default": "#ffffff",
  "icon/secondary": "#ffffffb2",
  "icon/tertiary": "#ffffff66",
  "icon/onbrand": "#ffffff",
  "icon/onbrand-secondary": "#ffffffcc",
  "icon/onbrand-tertiary": "#ffffff66",
  "icon/brand": "#7cc4f8",
  "icon/figjam": "#d1a8ff",
  "icon/handoff": "#7cd797",
  "icon/assistive": "#fc9ce0",
  "icon/danger": "#fca397",
  "icon/warning": "#f7d15f",
  "icon/success": "#7cd797",

  // Legacy bg aliases
  "bg/bg-default": "#2c2c2c",
  "bg/bg-secondary": "#383838",
  "bg/bg-hover": "#383838",
  "bg/bg-selected": "#4a5878",
  "bg/bg-menu": "#1e1e1e",
  "bg/bg-toolbar": "#2c2c2c",
  "bg/bg-brand": "#0c8ce9",
  "bg/bg-figjam": "#8a38f5",
  "bg/bg-handoff": "#198f51",
  "bg/bg-assistive": "#f316b0",
  "bg/bg-danger": "#e03e1a",
  "bg/bg-warning": "#f3c11b",
  "bg/bg-success": "#198f51",

  // Brand
  "bg/brand/default": "#0c8ce9",
  "bg/brand/hover": "#0a6dc2",
  "bg/brand/pressed": "#105cad",
  "bg/brand/secondary": "#105cad",
  "bg/brand/tertiary": "#394360",
  "bg/brand/tertiary-hover": "#4a5878",
  "bg/brand/tertiary-pressed": "#536383",

  // Danger
  "bg/danger/default": "#e03e1a",
  "bg/danger/hover": "#c4381c",
  "bg/danger/pressed": "#963323",
  "bg/danger/secondary": "#963323",
  "bg/danger/tertiary": "#60332a",

  // Default
  "bg/default/default": "#2c2c2c",
  "bg/default/hover": "#383838",
  "bg/default/pressed": "#444444",
  "bg/default/secondary": "#383838",
  "bg/default/tertiary": "#444444",

  // Success
  "bg/success/default": "#198f51",
  "bg/success/hover": "#078348",
  "bg/success/pressed": "#0a5c35",
  "bg/success/secondary": "#0a5c35",
  "bg/success/tertiary": "#2f483c",

  // Warning
  "bg/warning/default": "#f3c11b",
  "bg/warning/hover": "#f2b50d",
  "bg/warning/pressed": "#e4a711",
  "bg/warning/secondary": "#e4a711",
  "bg/warning/tertiary": "#5c4100",

  // Disabled
  "bg/disabled/default": "#757575",
  "bg/disabled/secondary": "#b3b3b3",

  // Inverse
  "bg/inverse/default": "#ffffff",
  "bg/inverse/hover": "#f5f5f5",
  "bg/inverse/pressed": "#e6e6e6",

  // Selected
  "bg/selected/default": "#4a5878",
  "bg/selected/hover": "#536383",
  "bg/selected/pressed": "#4a5878",
  "bg/selected/strong": "#0c8ce9",
  "bg/selected/strong-hover": "#0a6dc2",
  "bg/selected/strong-pressed": "#105cad",

  // Elevated
  "bg/elevated/default": "#1e1e1e",
  "bg/elevated/hover": "#2c2c2c",

  // Transparent
  "bg/transparent/default": "#ffffff0d",
  "bg/transparent/hover": "#ffffff0d",
  "bg/transparent/pressed": "#ffffff1a",

  // Menu
  "bg/menu/default": "#1e1e1e",
  "bg/menu/hover": "#2c2c2c",
  "bg/menu/selected": "#0c8ce9",
  "bg/menu/selected-hover": "#0a6dc2",
  "bg/menu/disabled": "#757575",

  // Toolbar
  "bg/toolbar/default": "#2c2c2c",
  "bg/toolbar/hover": "#111111",
  "bg/toolbar/selected": "#0c8ce9",
  "bg/toolbar/selected-hover": "#0a6dc2",
  "bg/toolbar/disabled": "#757575",

  // Tooltip
  "bg/tooltip/default": "#1e1e1e",

  // Border
  "border/default": "#444444",
  "border/strong": "#ffffffe5",
  "border/onbrand-strong": "#ffffff",
  "border/selected": "#0c8ce9",
  "border/selected-strong": "#7cc4f8",
  "border/menu": "#383838",
};

export const colors: Record<ColorTheme, ColorTokens> = { light, dark };

/** Returns the token value for the current theme. */
export function getColor(token: keyof ColorTokens, theme: ColorTheme = "light"): string {
  return colors[theme][token];
}
