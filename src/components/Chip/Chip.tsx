import React from "react";

export type ChipVariant = "default" | "selected" | "brand" | "danger" | "success" | "warning";

export interface ChipProps {
  label: string;
  variant?: ChipVariant;
  leadingIcon?: React.ReactNode;
  onRemove?: () => void;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const variantStyles: Record<ChipVariant, React.CSSProperties> = {
  default:  {
    background: "var(--color-bg-default-secondary)",
    color: "var(--color-text-default)",
    border: "1px solid var(--color-border-default)",
  },
  selected: {
    background: "var(--color-bg-selected)",
    color: "var(--color-text-default)",
    border: "1px solid var(--color-border-selected)",
  },
  brand:    {
    background: "var(--color-bg-brand-tertiary)",
    color: "var(--color-text-brand)",
    border: "1px solid var(--color-border-selected)",
  },
  danger:   {
    background: "var(--color-bg-danger-tertiary)",
    color: "var(--color-text-danger)",
    border: "1px solid var(--color-bg-danger)",
  },
  success:  {
    background: "var(--color-bg-success-tertiary)",
    color: "var(--color-text-success)",
    border: "1px solid var(--color-bg-success-secondary)",
  },
  warning:  {
    background: "var(--color-bg-warning-tertiary)",
    color: "var(--color-text-warning)",
    border: "1px solid var(--color-bg-warning-secondary)",
  },
};

export function Chip({
  label,
  variant = "default",
  leadingIcon,
  onRemove,
  disabled = false,
  onClick,
  style,
}: ChipProps) {
  return (
    <span
      role={onClick ? "button" : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
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
        ...variantStyles[variant],
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
