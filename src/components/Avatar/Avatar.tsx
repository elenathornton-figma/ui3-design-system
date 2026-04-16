import React from "react";

// Sizes match Figma Avatar componentPropertyDefinitions:
// 👥 Size: Default | Small | Large
// 👥 Shape: Circle | Square
// 👥 Variant: Photo | Purple | Grey | Green | Yellow | Red | Pink | Blue | Overflow Unread | Overflow Read | Org
export type AvatarSize = "default" | "small" | "large";
export type AvatarShape = "circle" | "square";
export type AvatarVariant =
  | "photo"
  | "purple"
  | "grey"
  | "green"
  | "yellow"
  | "red"
  | "pink"
  | "blue"
  | "org"
  | "overflow-unread"
  | "overflow-read";

export interface AvatarProps {
  /** Image URL — used when variant is "photo" */
  src?: string;
  /** Display name — used for initials fallback and aria-label */
  name?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  variant?: AvatarVariant;
  style?: React.CSSProperties;
}

const sizeMap: Record<AvatarSize, number> = {
  default: 24,
  small:   20,
  large:   32,
};

const fontSizeMap: Record<AvatarSize, number> = {
  default: 11,
  small:   9,
  large:   13,
};

// Token-mapped background colors for each variant
const variantBgMap: Record<AvatarVariant, string> = {
  photo:            "transparent",
  purple:           "var(--color-bg-avatar-purple, #7B61FF)",
  grey:             "var(--color-bg-avatar-grey, #9CA3AF)",
  green:            "var(--color-bg-avatar-green, #10B981)",
  yellow:           "var(--color-bg-avatar-yellow, #F59E0B)",
  red:              "var(--color-bg-avatar-red, #EF4444)",
  pink:             "var(--color-bg-avatar-pink, #EC4899)",
  blue:             "var(--color-bg-avatar-blue, #3B82F6)",
  org:              "var(--color-bg-default-secondary)",
  "overflow-unread":"var(--color-bg-danger)",
  "overflow-read":  "var(--color-bg-inverse)",
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

/** Derive a stable variant from a name string for auto-coloring when no variant is given */
function nameToVariant(name: string): AvatarVariant {
  const colorVariants: AvatarVariant[] = ["purple", "grey", "green", "yellow", "red", "pink", "blue"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colorVariants[Math.abs(hash) % colorVariants.length];
}

export function Avatar({
  src,
  name = "",
  size = "default",
  shape = "circle",
  variant,
  style,
}: AvatarProps) {
  const px = sizeMap[size];
  const fs = fontSizeMap[size];

  // Resolve variant: explicit > photo (if src) > derived from name
  const resolvedVariant: AvatarVariant =
    variant ?? (src ? "photo" : name ? nameToVariant(name) : "grey");

  const bg = variantBgMap[resolvedVariant];
  const borderRadius = shape === "square"
    ? "var(--radius-small)"
    : "var(--radius-full)";

  return (
    <span
      aria-label={name || undefined}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: px,
        height: px,
        borderRadius,
        overflow: "hidden",
        flexShrink: 0,
        background: bg,
        ...style,
      }}
    >
      {resolvedVariant === "photo" && src ? (
        <img
          src={src}
          alt={name}
          width={px}
          height={px}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : resolvedVariant === "overflow-unread" || resolvedVariant === "overflow-read" ? (
        <span
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-family-default)",
            fontSize: fs,
            fontWeight: "var(--font-weight-strong)" as unknown as number,
            color: "var(--color-text-onbrand)",
            lineHeight: 1,
          }}
        >
          +
        </span>
      ) : (
        <span
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-family-default)",
            fontSize: fs,
            fontWeight: "var(--font-weight-strong)" as unknown as number,
            color: "white",
            letterSpacing: "0",
            lineHeight: 1,
          }}
        >
          {name ? getInitials(name) : ""}
        </span>
      )}
    </span>
  );
}
