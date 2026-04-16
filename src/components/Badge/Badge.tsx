import React from "react";

export type BadgeVariant = "default" | "brand" | "danger" | "success" | "warning" | "figjam" | "handoff";

export interface BadgeProps {
  count?: number;
  /** Max count before showing overflow (e.g. "9+" or "99+"). Default: 99 */
  max?: number;
  variant?: BadgeVariant;
  /** Display as a dot (no count) */
  dot?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const variantColors: Record<BadgeVariant, { bg: string; text: string }> = {
  default:    { bg: "var(--color-bg-inverse)",  text: "var(--color-text-onbrand)" },
  brand:      { bg: "var(--color-bg-brand)",    text: "var(--color-text-onbrand)" },
  danger:     { bg: "var(--color-bg-danger)",   text: "var(--color-text-onbrand)" },
  success:    { bg: "var(--color-bg-success)",  text: "var(--color-text-onbrand)" },
  warning:    { bg: "var(--color-bg-warning)",  text: "#000000e5" },
  figjam:     { bg: "var(--color-bg-figjam)",   text: "var(--color-text-onbrand)" },
  handoff:    { bg: "var(--color-bg-handoff)",  text: "var(--color-text-onbrand)" },
};

export function Badge({
  count,
  max = 99,
  variant = "default",
  dot = false,
  children,
  style,
}: BadgeProps) {
  const { bg, text } = variantColors[variant];
  const label =
    count !== undefined
      ? count > max
        ? `${max}+`
        : String(count)
      : undefined;

  if (dot) {
    return (
      <span
        style={{
          display: "inline-block",
          width: 6,
          height: 6,
          borderRadius: "var(--radius-full)",
          background: bg,
          ...style,
        }}
        aria-label="notification"
      />
    );
  }

  if (children) {
    return (
      <span style={{ position: "relative", display: "inline-flex", ...style }}>
        {children}
        {label && (
          <BadgePill label={label} bg={bg} text={text} />
        )}
      </span>
    );
  }

  return label ? (
    <BadgePill label={label} bg={bg} text={text} style={style} />
  ) : null;
}

function BadgePill({
  label,
  bg,
  text,
  style,
}: {
  label: string;
  bg: string;
  text: string;
  style?: React.CSSProperties;
}) {
  const isShort = label.length <= 1;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: isShort ? 14 : 20,
        height: 14,
        paddingInline: isShort ? 0 : 4,
        borderRadius: "var(--radius-full)",
        background: bg,
        color: text,
        fontFamily: "var(--font-family-default)",
        fontSize: 9,
        fontWeight: "var(--font-weight-strong)" as unknown as number,
        letterSpacing: "0.5px",
        lineHeight: 1,
        ...style,
      }}
    >
      {label}
    </span>
  );
}
