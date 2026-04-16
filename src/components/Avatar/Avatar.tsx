import React from "react";

export type AvatarSize = "large" | "medium" | "small" | "xsmall";

export interface AvatarProps {
  /** Image URL */
  src?: string;
  /** Alt text / fallback initials source */
  name?: string;
  size?: AvatarSize;
  style?: React.CSSProperties;
}

const sizeMap: Record<AvatarSize, number> = {
  large: 32,
  medium: 24,
  small: 20,
  xsmall: 16,
};

const fontSizeMap: Record<AvatarSize, number> = {
  large: 13,
  medium: 11,
  small: 9,
  xsmall: 9,
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

/** Stable hue from name string */
function nameToHue(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

export function Avatar({ src, name = "", size = "medium", style }: AvatarProps) {
  const px = sizeMap[size];
  const fs = fontSizeMap[size];
  const hue = nameToHue(name);

  return (
    <span
      aria-label={name || undefined}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: px,
        height: px,
        borderRadius: "var(--radius-full)",
        overflow: "hidden",
        flexShrink: 0,
        background: src ? "transparent" : `hsl(${hue}, 60%, 50%)`,
        ...style,
      }}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          width={px}
          height={px}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
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
          {getInitials(name)}
        </span>
      )}
    </span>
  );
}
