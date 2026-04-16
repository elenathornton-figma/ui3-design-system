import React from "react";

// Variants match Figma Chip.Container componentPropertyDefinitions:
// Variant: Default | Component | Success | Warning | Danger | Toggle | Override
// Selected: False | True  (exposed as `selected` boolean prop)
export type ChipVariant = "default" | "component" | "success" | "warning" | "danger" | "toggle" | "override";

export interface ChipProps {
  label: string;
  variant?: ChipVariant;
  /** Maps to Figma Selected=True */
  selected?: boolean;
  leadingIcon?: React.ReactNode;
  onRemove?: () => void;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const variantStyles: Record<ChipVariant, React.CSSProperties> = {
  default:   {
    background: "var(--color-bg-default-secondary)",
    color: "var(--color-text-default)",
    border: "1px solid var(--color-border-default)",
  },
  component: {
    background: "var(--color-bg-brand-tertiary)",
    color: "var(--color-text-brand)",
    border: "1px solid var(--color-border-selected)",
  },
  success:   {
    background: "var(--color-bg-success-tertiary)",
    color: "var(--color-text-success)",
    border: "1px solid var(--color-bg-success-secondary)",
  },
  warning:   {
    background: "var(--color-bg-warning-tertiary)",
    color: "var(--color-text-warning)",
    border: "1px solid var(--color-bg-warning-secondary)",
  },
  danger:    {
    background: "var(--color-bg-danger-tertiary)",
    color: "var(--color-text-danger)",
    border: "1px solid var(--color-bg-danger)",
  },
  toggle:    {
    background: "var(--color-bg-default-secondary)",
    color: "var(--color-text-default)",
    border: "1px solid var(--color-border-default)",
  },
  override:  {
    background: "var(--color-bg-warning-tertiary)",
    color: "var(--color-text-warning)",
    border: "1px solid var(--color-bg-warning-secondary)",
  },
};

const selectedOverlay: React.CSSProperties = {
  background: "var(--color-bg-selected)",
  color: "var(--color-text-default)",
  border: "1px solid var(--color-border-selected)",
};

export function Chip({
  label,
  variant = "default",
  selected = false,
  leadingIcon,
  onRemove,
  disabled = false,
  onClick,
  style,
}: ChipProps) {
  const baseStyle = selected ? selectedOverlay : variantStyles[variant];
  return (
    <span
      role={onClick ? "button" : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      aria-pressed={onClick && variant === "toggle" ? selected : undefined}
      onClick={disabled ? undefined : onClick}
      onKeyDown={
        onClick && !disabled
          ? (e) => { if (e.key === "Enter" || e.key === " ") onClick(); }
          : undefined
      }
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        height: 20,
        paddingInline: onRemove ? "6px 2px" : 6,
        borderRadius: "var(--radius-full)",
        cursor: onClick && !disabled ? "pointer" : "default",
        opacity: disabled ? 0.4 : 1,
        userSelect: "none",
        fontFamily: "var(--font-family-default)",
        fontSize: 11,
        fontWeight: "var(--font-weight-default)" as unknown as number,
        letterSpacing: "0.5px",
        ...baseStyle,
        ...style,
      }}
    >
      {leadingIcon && (
        <span style={{ display: "flex", alignItems: "center" }} aria-hidden="true">
          {leadingIcon}
        </span>
      )}

      <span>{label}</span>

      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) onRemove();
          }}
          aria-label={`Remove ${label}`}
          disabled={disabled}
          style={{
            background: "transparent",
            border: "none",
            cursor: disabled ? "not-allowed" : "pointer",
            padding: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "inherit",
            borderRadius: "var(--radius-full)",
            opacity: 0.7,
          }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1.5 1.5L6.5 6.5M6.5 1.5L1.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </span>
  );
}
