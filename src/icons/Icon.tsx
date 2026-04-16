import React from "react";

/**
 * UI3 Icon System
 *
 * Icon names follow the `icon.{size}.{name}` convention from the UI3-Icons Figma library.
 * Sizes: 16 (small) or 24 (standard).
 *
 * KNOWN GAP: The icons file is view-only; actual SVG path data cannot be
 * extracted programmatically via the Plugin API. The paths below are
 * approximated inline SVGs for the most common icons. For the full icon set,
 * SVGs should be exported from the Figma file (File → Export → SVG) and
 * placed in src/icons/svgs/. A build step (e.g. SVGR) can then auto-generate
 * typed React components from those exports.
 */

export type IconSize = 16 | 24;

// ── Known icon names (sourced from UI3-Icons library search) ───────────────

export type IconName =
  // Navigation & actions
  | "close"
  | "plus"
  | "minus"
  | "more"
  | "check"
  | "chevron.down"
  | "chevron.down.large"
  | "chevron.up"
  | "chevron.left"
  | "chevron.right"
  // Status
  | "warning"
  | "info"
  | "ai"
  | "ai.assistant"
  // Files & UI
  | "page"
  | "folder"
  | "image"
  | "link"
  | "library"
  | "list-view"
  | "dev"
  | "make"
  | "adjust"
  // Figma product
  | "autolayout-vertical"
  | "ui.testing"
  // Fallback for any other icon name
  | (string & {});

// ── Inline SVG paths for common icons ─────────────────────────────────────
// These are standard approximations — replace with actual Figma exports.

const PATHS_24: Partial<Record<string, string>> = {
  close:         "M5 5L19 19M19 5L5 19",
  plus:          "M12 4V20M4 12H20",
  minus:         "M4 12H20",
  more:          "M5 12H5.01M12 12H12.01M19 12H19.01",
  check:         "M4 12L9 17L20 7",
  "chevron.down":"M6 9L12 15L18 9",
  "chevron.up":  "M18 15L12 9L6 15",
  "chevron.left":"M15 6L9 12L15 18",
  "chevron.right":"M9 6L15 12L9 18",
  warning:       "M12 4L22 20H2L12 4ZM12 10V14M12 17H12.01",
  info:          "M12 2C6.477 2 2 6.477 2 12S6.477 22 12 22 22 17.523 22 12 17.523 2 12 2ZM12 8H12.01M12 11V16",
  link:          "M10 14a4 4 0 005.657 0l3-3a4 4 0 00-5.657-5.657L11.5 6.843M14 10a4 4 0 00-5.657 0l-3 3a4 4 0 005.657 5.657L12.5 17.157",
  folder:        "M4 6h16a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1zm0 0V5a1 1 0 011-1h5l2 2H4z",
  page:          "M7 2h10a1 1 0 011 1v18a1 1 0 01-1 1H7a1 1 0 01-1-1V3a1 1 0 011-1zm3 5h4M10 10h4M10 14h4",
  image:         "M3 8l4-4h10l4 4v10a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm6 3a2 2 0 110 4 2 2 0 010-4zm4 5l3-4 2 3-2.5 0H9",
  list_view:     "M4 6h16M4 12h16M4 18h16",
  library:       "M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6zm6 0v6h6M9 13h6M9 17h4",
  dev:           "M8 9l-4 3 4 3M16 9l4 3-4 3M14 6l-4 12",
  adjust:        "M3 6h2m0 0a2 2 0 004 0M5 6V4m0 14h2m0 0a2 2 0 004 0M7 18v2m6-12h2m0 0a2 2 0 004 0M15 6V4m0 14h2m0 0a2 2 0 004 0M17 18v2",
  ai:            "M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z",
};

const PATHS_16: Partial<Record<string, string>> = {
  close:    "M3 3L13 13M13 3L3 13",
  plus:     "M8 2V14M2 8H14",
  minus:    "M2 8H14",
  check:    "M2 8L6 12L14 4",
  info:     "M8 4h.01M7 7h2v5m-2 0h4",
  warning:  "M8 3L14 13H2L8 3ZM8 7V10M8 12h.01",
  "chevron.down": "M4 6L8 10L12 6",
  "chevron.up":   "M12 10L8 6L4 10",
  "chevron.left": "M10 4L6 8L10 12",
  "chevron.right":"M6 4L10 8L6 12",
  more:     "M4 8H4.01M8 8H8.01M12 8H12.01",
};

// ── Icon component ─────────────────────────────────────────────────────────

export interface IconProps {
  name: IconName;
  size?: IconSize;
  color?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export function Icon({
  name,
  size = 16,
  color = "currentColor",
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden = !ariaLabel,
  style,
  className,
}: IconProps) {
  const paths = size === 24 ? PATHS_24 : PATHS_16;
  const viewBox = size === 24 ? "0 0 24 24" : "0 0 16 16";
  const key = name.replace(/-/g, "_").replace(/\./g, "_");
  const d = paths[name] ?? paths[key] ?? null;

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke={color}
      strokeWidth={size === 24 ? 1.5 : 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      style={{ display: "block", flexShrink: 0, ...style }}
      className={className}
    >
      {d ? (
        <path d={d} />
      ) : (
        /* Placeholder rectangle for unknown icons */
        <rect
          x={size === 24 ? 4 : 2}
          y={size === 24 ? 4 : 2}
          width={size === 24 ? 16 : 12}
          height={size === 24 ? 16 : 12}
          rx="2"
          strokeDasharray="3 2"
        />
      )}
    </svg>
  );
}
