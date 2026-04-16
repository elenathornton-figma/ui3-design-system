/**
 * UI3 Design System — Border Radius Tokens
 *
 * Resolved from the Radius variable collection in UI3-Tokens.
 * All values are in pixels.
 */

export const radius = {
  /** 0px — sharp corners */
  none: 0,
  /** 2px — subtle rounding (inputs, small chips) */
  small: 2,
  /** 5px — standard rounding (buttons, tags, inputs) */
  medium: 5,
  /** 13px — large rounding (cards, modals, panels) */
  large: 13,
  /** 9999px — fully rounded (pill buttons, badges, avatars) */
  full: 9999,
} as const;

export type RadiusKey = keyof typeof radius;
