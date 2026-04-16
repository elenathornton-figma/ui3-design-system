/**
 * UI3 Design System — Spacing Tokens
 *
 * Resolved from the Spacing variable collection in UI3-Tokens.
 * All values are in pixels.
 */

export const spacing = {
  /** 0px */
  "spacer-0": 0,
  /** 4px */
  "spacer-1": 4,
  /** 8px */
  "spacer-2": 8,
  /** 12px */
  "spacer-2-5": 12,
  /** 16px */
  "spacer-3": 16,
  /** 24px */
  "spacer-4": 24,
  /** 32px */
  "spacer-5": 32,
  /** 40px */
  "spacer-6": 40,
} as const;

export type SpacingKey = keyof typeof spacing;

/** Returns a spacing value in pixels. */
export function space(key: SpacingKey): number {
  return spacing[key];
}
