import React from "react";

// Variants match Figma's Badge componentPropertyDefinitions:
// 👥 Variant: defaultFilled | defaultOutline | brandFilled | brandOutline |
//             inverseFilled | componentFilled | componentOutline |
//             dangerFilled | dangerOutline | warningFilled | warningOutline |
//             successFilled | successOutline | inactiveFilled | inactiveOutline | onFill
// 👥 Size: md | lg

export type BadgeVariant =
  | "defaultFilled"
  | "defaultOutline"
  | "brandFilled"
  | "brandOutline"
  | "inverseFilled"
  | "componentFilled"
  | "componentOutline"
  | "dangerFilled"
  | "dangerOutline"
  | "warningFilled"
  | "warningOutline"
  | "successFilled"
  | "successOutline"
  | "inactiveFilled"
  | "inactiveOutline"
  | "onFill";

export type BadgeSize = "md" | "lg";

export interface BadgeProps {
  label?: string;
  count?: number;
  /** Max count before showing overflow (e.g. "99+"). Default: 99 */
  max?: number;
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Display as a dot (no label/count) */
  dot?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

type ColorDef = { bg: string; text: string; border?: string };

const variantColors: Record<BadgeVariant, ColorDef> = {
  defaultFilled:    { bg: "var(--color-bg-inverse)",           text: "var(--color-text-onbrand)" },
  defaultOutline:   { bg: "transparent",                       text: "var(--color-text-default)",    border: "var(--color-border-default)" },
  brandFilled:      { bg: "var(--color-bg-brand)",             text: "var(--color-text-onbrand)" },
  brandOutline:     { bg: "transparent",                       text: "var(--color-text-brand)",       border: "var(--color-border-selected)" },
  inverseFilled:    { bg: "var(--color-bg-default)",           text: "var(--color-text-default)" },
  componentFilled:  { bg: "var(--color-bg-brand-tertiary)",    text: "var(--color-text-brand)" },
  componentOutline: { bg: "transparent",                       text: "var(--color-text-brand)",       border: "var(--color-border-selected)" },
  dangerFilled:     { bg: "var(--color-bg-danger)",            text: "var(--color-text-onbrand)" },
  dangerOutline:    { bg: "transparent",                       text: "var(--color-text-danger)",      border: "var(--color-bg-danger)" },
  warningFilled:    { bg: "var(--color-bg-warning)",           text: "#000000e5" },
  warningOutline:   { bg: "transparent",                       text: "var(--color-text-warning)",     border: "var(--color-bg-warning-secondary)" },
  successFilled:    { bg: "var(--color-bg-success)",           text: "var(--color-text-onbrand)" },
  successOutline:   { bg: "transparent",                       text: "var(--color-text-success)",     border: "var(--color-bg-success-secondary)" },
  inactiveFilled:   { bg: "var(--color-bg-disabled)",          text: "var(--color-text-secondary)" },
  inactiveOutline:  { bg: "transparent",                       text: "var(--color-text-secondary)",   border: "var(--color-border-default)" },
  onFill:           { bg: "rgba(255,255,255,0.2)",             text: "var(--color-text-onbrand)" },
};

const sizeMap: Record<BadgeSize, { height: number; fontSize: number; minWidth: number; px: number }> = {
  md: { height: 14, fontSize: 9,  minWidth: 14, px: 4 },
  lg: { height: 16, fontSize: 10, minWidth: 16, px: 5 },
};

export function Badge({
  label,
  count,
  max = 99,
  variant = "defaultFilled",
  size = "md",
  dot = false,
  children,
  style,
}: BadgeProps) {
  const { bg, text, border } = variantColors[variant];
  const { height, fontSize, minWidth, px } = sizeMap[size];

  const displayLabel =
    label ??
    (count !== undefined ? (count > max ? `${max}+` : String(count)) : undefined);

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
        {displayLabel && (
          <BadgePill
            label={displayLabel}
            bg={bg}
            text={text}
            border={border}
            height={height}
            fontSize={fontSize}
            minWidth={minWidth}
            px={px}
            style={{ position: "absolute", top: -4, right: -6 }}
          />
        )}
      </span>
    );
  }

  return displayLabel ? (
    <BadgePill
      label={displayLabel}
      bg={bg}
      text={text}
      border={border}
      height={height}
      fontSize={fontSize}
      minWidth={minWidth}
      px={px}
      style={style}
    />
  ) : null;
}

function BadgePill({
  label,
  bg,
  text,
  border,
  height,
  fontSize,
  minWidth,
  px,
  style,
}: {
  label: string;
  bg: string;
  text: string;
  border?: string;
  height: number;
  fontSize: number;
  minWidth: number;
  px: number;
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth,
        height,
        paddingInline: px,
        borderRadius: "var(--radius-full)",
        background: bg,
        color: text,
        border: border ? `1px solid ${border}` : undefined,
        fontFamily: "var(--font-family-default)",
        fontSize,
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
