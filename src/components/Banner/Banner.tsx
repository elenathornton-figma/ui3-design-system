import React from "react";

// Props match Figma Banner componentPropertyDefinitions:
// Banner.FullWidth:  type="full-width", variant=Default|Danger|Warn|Success|Brand
// Banner.Inset:      type="inset", layout=single-line|multi-line, variant=Default|Brand|Danger|Warn|Success
// Banner.Inline:     type="inline", variant=Default|Brand|Warn|Success|Transparent|Danger

export type BannerType = "full-width" | "inset" | "inline";
export type BannerVariant = "default" | "brand" | "danger" | "warn" | "success" | "transparent";

export interface BannerProps {
  type?: BannerType;
  variant?: BannerVariant;
  /** Primary message / description text */
  description: string;
  /** Optional title line (full-width and inset only) */
  title?: string;
  /** Link label shown as text action */
  linkLabel?: string;
  onLinkClick?: () => void;
  /** Primary CTA button label */
  buttonLabel?: string;
  onButtonClick?: () => void;
  /** Secondary CTA button label (full-width and inset only) */
  button2Label?: string;
  onButton2Click?: () => void;
  /** Show close button. Default true. */
  closable?: boolean;
  onClose?: () => void;
  /** "multi-line" or "single-line" layout for inset banners */
  layout?: "single-line" | "multi-line";
  style?: React.CSSProperties;
}

const variantTokens: Record<BannerVariant, { bg: string; icon: string; text: string; border: string }> = {
  default:     { bg: "var(--color-bg-default-secondary)", icon: "var(--color-icon-secondary)",  text: "var(--color-text-default)",  border: "var(--color-border-default)" },
  brand:       { bg: "var(--color-bg-brand-tertiary)",   icon: "var(--color-icon-brand)",       text: "var(--color-text-default)",  border: "var(--color-border-selected)" },
  danger:      { bg: "var(--color-bg-danger-tertiary)",  icon: "var(--color-icon-danger)",      text: "var(--color-text-default)",  border: "var(--color-bg-danger)" },
  warn:        { bg: "var(--color-bg-warning-tertiary)", icon: "var(--color-icon-warning)",     text: "var(--color-text-default)",  border: "var(--color-bg-warning-secondary)" },
  success:     { bg: "var(--color-bg-success-tertiary)", icon: "var(--color-icon-success)",     text: "var(--color-text-default)",  border: "var(--color-bg-success-secondary)" },
  transparent: { bg: "transparent",                      icon: "var(--color-icon-secondary)",   text: "var(--color-text-default)",  border: "var(--color-border-default)" },
};

// Simple SVG icons for each variant's leading indicator
function VariantIcon({ variant, size = 16 }: { variant: BannerVariant; size?: number }) {
  const color = variantTokens[variant].icon;
  if (variant === "danger" || variant === "warn") {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color }}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8 3L14 13H2L8 3ZM8 7V10M8 12h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (variant === "success") {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color }}>
        <path d="M3 8L6 11L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (variant === "brand") {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color }}>
        <path d="M8 2C5.239 2 3 4.239 3 7s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 4h.01M7 8h2v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  // default / transparent
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color }}>
      <path d="M8 2C5.239 2 3 4.239 3 7s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 3v.01M7 8h1v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseButton({ onClose, color }: { onClose: () => void; color: string }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close banner"
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 4,
        display: "flex",
        alignItems: "center",
        color,
        flexShrink: 0,
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}

function ActionButton({
  label,
  onClick,
  primary,
  textColor,
}: {
  label: string;
  onClick?: () => void;
  primary?: boolean;
  textColor: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: primary ? "var(--color-bg-brand)" : "transparent",
        border: primary ? "none" : `1px solid var(--color-border-default)`,
        borderRadius: "var(--radius-small)",
        cursor: "pointer",
        padding: "3px 8px",
        height: 24,
        color: primary ? "var(--color-text-onbrand)" : textColor,
        fontFamily: "var(--font-family-default)",
        fontSize: 11,
        fontWeight: "var(--font-weight-strong)" as unknown as number,
        letterSpacing: "0.5px",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

export function Banner({
  type = "inline",
  variant = "default",
  description,
  title,
  linkLabel,
  onLinkClick,
  buttonLabel,
  onButtonClick,
  button2Label,
  onButton2Click,
  closable = true,
  onClose,
  layout = "multi-line",
  style,
}: BannerProps) {
  const { bg, text, border } = variantTokens[variant];

  const hasActions = buttonLabel || button2Label || linkLabel;
  const isFullWidth = type === "full-width";
  const isInset = type === "inset";
  const isInline = type === "inline";

  return (
    <div
      role="status"
      style={{
        display: "flex",
        flexDirection: isFullWidth || (isInset && layout === "multi-line") ? "column" : "row",
        alignItems: isFullWidth || (isInset && layout === "multi-line") ? "flex-start" : "center",
        gap: isFullWidth ? 8 : 6,
        padding: isFullWidth ? "10px 16px" : isInset ? "10px 12px" : "6px 10px",
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: isFullWidth ? 0 : "var(--radius-medium)",
        fontFamily: "var(--font-family-default)",
        color: text,
        ...style,
      }}
    >
      {/* Header row: icon + title + (inline: message) + close */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8, width: "100%", minWidth: 0 }}>
        <VariantIcon variant={variant} size={isFullWidth ? 16 : 14} />

        <div style={{ flex: 1, minWidth: 0 }}>
          {title && (
            <div style={{ fontSize: 11, fontWeight: "var(--font-weight-strong)" as unknown as number, letterSpacing: "0.5px", marginBottom: isFullWidth ? 2 : 0 }}>
              {title}
            </div>
          )}
          {(isInline || (!isFullWidth && !isInset) || (isInset && layout === "single-line")) && (
            <div style={{ fontSize: 11, letterSpacing: "0.5px", opacity: title ? 0.8 : 1 }}>{description}</div>
          )}
          {isInline && hasActions && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
              {buttonLabel && (
                <ActionButton label={buttonLabel} onClick={onButtonClick} primary textColor={text} />
              )}
              {linkLabel && (
                <button type="button" onClick={onLinkClick} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-brand)", fontFamily: "var(--font-family-default)", fontSize: 11, fontWeight: "var(--font-weight-strong)" as unknown as number, letterSpacing: "0.5px", padding: 0 }}>
                  {linkLabel}
                </button>
              )}
            </div>
          )}
        </div>

        {closable && onClose && (
          <CloseButton onClose={onClose} color={text} />
        )}
      </div>

      {/* Body: full-width and inset multi-line description + actions */}
      {(isFullWidth || (isInset && layout === "multi-line")) && (
        <div style={{ paddingLeft: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.5px", opacity: 0.8, marginBottom: hasActions ? 8 : 0 }}>
            {description}
          </div>
          {hasActions && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              {buttonLabel && (
                <ActionButton label={buttonLabel} onClick={onButtonClick} primary textColor={text} />
              )}
              {button2Label && (
                <ActionButton label={button2Label} onClick={onButton2Click} textColor={text} />
              )}
              {linkLabel && (
                <button type="button" onClick={onLinkClick} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-brand)", fontFamily: "var(--font-family-default)", fontSize: 11, fontWeight: "var(--font-weight-strong)" as unknown as number, letterSpacing: "0.5px", padding: 0 }}>
                  {linkLabel}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
