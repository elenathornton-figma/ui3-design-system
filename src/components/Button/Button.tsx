import React from "react";

export type ButtonVariant =
  | "primary"    // Brand-filled — primary action
  | "secondary"  // Outlined — secondary action
  | "tertiary"   // Text-only — low-emphasis action
  | "destructive"// Danger-filled — irreversible actions
  | "ghost";     // Transparent background — toolbar / icon-adjacent

export type ButtonSize = "large" | "medium" | "small";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  large:  { height: 32, paddingInline: 12, fontSize: 13, gap: 6 },
  medium: { height: 28, paddingInline: 8,  fontSize: 11, gap: 4 },
  small:  { height: 24, paddingInline: 6,  fontSize: 11, gap: 4 },
};

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: "var(--color-bg-brand)",
    color: "var(--color-text-onbrand)",
    border: "none",
  },
  secondary: {
    background: "var(--color-bg-default)",
    color: "var(--color-text-default)",
    border: "1px solid var(--color-border-default)",
  },
  tertiary: {
    background: "transparent",
    color: "var(--color-text-default)",
    border: "none",
  },
  destructive: {
    background: "var(--color-bg-danger)",
    color: "var(--color-text-onbrand)",
    border: "none",
  },
  ghost: {
    background: "transparent",
    color: "var(--color-text-default)",
    border: "none",
  },
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "medium",
      loading = false,
      leadingIcon,
      trailingIcon,
      fullWidth = false,
      disabled,
      children,
      style,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        style={{
          // Base
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-family-default)",
          fontWeight: "var(--font-weight-strong)" as unknown as number,
          letterSpacing: "-0.25px",
          borderRadius: "var(--radius-medium)",
          cursor: isDisabled ? "not-allowed" : "pointer",
          width: fullWidth ? "100%" : undefined,
          opacity: isDisabled ? 0.4 : 1,
          transition: "background 80ms ease, opacity 80ms ease",
          outline: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
          // Size
          ...sizeStyles[size],
          // Variant
          ...variantStyles[variant],
          // Caller overrides
          ...style,
        }}
        {...rest}
      >
        {loading ? (
          <LoadingSpinner size={size === "large" ? 14 : 12} />
        ) : (
          leadingIcon
        )}
        {children && (
          <span style={{ lineHeight: 1 }}>{children}</span>
        )}
        {!loading && trailingIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

// ─── IconButton ────────────────────────────────────────────────────────────

export interface IconButtonProps extends Omit<ButtonProps, "leadingIcon" | "trailingIcon" | "fullWidth"> {
  label: string; // Required for accessibility
  icon: React.ReactNode;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, icon, size = "medium", ...rest }, ref) => {
    const iconSize = size === "large" ? 32 : size === "medium" ? 28 : 24;
    return (
      <Button
        ref={ref}
        size={size}
        aria-label={label}
        style={{ width: iconSize, paddingInline: 0, ...rest.style }}
        {...rest}
      >
        {icon}
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";

// ─── Helpers ───────────────────────────────────────────────────────────────

function LoadingSpinner({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{
        animation: "ui3-spin 0.8s linear infinite",
      }}
    >
      <style>{`@keyframes ui3-spin { to { transform: rotate(360deg) } }`}</style>
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="25 10"
        strokeLinecap="round"
      />
    </svg>
  );
}
