/**
 * UI3 Design System — Typography Tokens
 *
 * Resolved from the Typography variable collection in UI3-Tokens.
 * Font families: Inter (default/body), Whyte (display headings), Roboto Mono (code)
 *
 * NOTE: Font weights use non-standard values (450 = regular, 550 = medium/strong)
 * because Inter Variable supports fractional weights. In environments without
 * variable font support, round to the nearest standard weight (400 / 500 / 600).
 */

export const fontFamily = {
  default: "Inter, system-ui, -apple-system, sans-serif",
  display: "Whyte, Inter, system-ui, sans-serif",
  mono: "'Roboto Mono', 'JetBrains Mono', 'Fira Code', monospace",
} as const;

export const fontWeight = {
  default: 450,
  medium: 450,
  strong: 550,
} as const;

export interface TypeStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  letterSpacing: number;
  lineHeight: number;
}

export const typeScale = {
  "heading/display": {
    fontFamily: fontFamily.display,
    fontSize: 48,
    fontWeight: fontWeight.strong,
    letterSpacing: -3,
    lineHeight: 56,
  },
  "heading/large": {
    fontFamily: fontFamily.default,
    fontSize: 24,
    fontWeight: fontWeight.strong,
    letterSpacing: -1.7,
    lineHeight: 32,
  },
  "heading/medium": {
    fontFamily: fontFamily.default,
    fontSize: 15,
    fontWeight: fontWeight.strong,
    letterSpacing: -0.5,
    lineHeight: 25,
  },
  "heading/small": {
    fontFamily: fontFamily.default,
    fontSize: 13,
    fontWeight: fontWeight.strong,
    letterSpacing: -0.25,
    lineHeight: 22,
  },
  "body/large": {
    fontFamily: fontFamily.default,
    fontSize: 13,
    fontWeight: fontWeight.default,
    letterSpacing: -0.25,
    lineHeight: 22,
  },
  "body/large/strong": {
    fontFamily: fontFamily.default,
    fontSize: 13,
    fontWeight: fontWeight.strong,
    letterSpacing: -0.25,
    lineHeight: 22,
  },
  "body/medium": {
    fontFamily: fontFamily.default,
    fontSize: 11,
    fontWeight: fontWeight.default,
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  "body/medium/strong": {
    fontFamily: fontFamily.default,
    fontSize: 11,
    fontWeight: fontWeight.strong,
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  "body/small": {
    fontFamily: fontFamily.default,
    fontSize: 9,
    fontWeight: fontWeight.default,
    letterSpacing: 0.5,
    lineHeight: 14,
  },
  "body/small/strong": {
    fontFamily: fontFamily.default,
    fontSize: 9,
    fontWeight: fontWeight.strong,
    letterSpacing: 0.5,
    lineHeight: 14,
  },
} as const satisfies Record<string, TypeStyle>;

export type TypeScaleKey = keyof typeof typeScale;
