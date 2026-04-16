import React, { useState, useRef, useEffect, useId } from "react";

// Props match Figma Select componentPropertyDefinitions:
// Variant: Property | Form
// Size: md | lg
// State: Default | Hover | Focus
// Validation: None | Invalid | Warning
// Disabled, Readonly
// Lead (boolean — leadingIcon slot)

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  readonly?: boolean;
  /** "Property" is the compact inline variant; "Form" is the form-field variant */
  variant?: "Property" | "Form";
  size?: "md" | "lg";
  /** "Invalid" maps to errorText display; "Warning" shows warning state */
  validation?: "None" | "Invalid" | "Warning";
  label?: string;
  helperText?: string;
  /** Convenience: sets validation="Invalid" and shows this text */
  errorText?: string;
  leadingIcon?: React.ReactNode;
  id?: string;
}

export function Select({
  options,
  value: controlledValue,
  defaultValue,
  placeholder = "Select…",
  onChange,
  disabled = false,
  readonly = false,
  variant = "Property",
  size = "md",
  validation,
  label,
  helperText,
  errorText,
  leadingIcon,
  id,
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const value = isControlled ? controlledValue : internalValue;
  const selectedOption = options.find((o) => o.value === value);
  // Resolve validation state: explicit prop wins, errorText is shorthand for Invalid
  const resolvedValidation = validation ?? (errorText ? "Invalid" : "None");
  const isError = resolvedValidation === "Invalid";
  const isWarning = resolvedValidation === "Warning";
  const resolvedErrorText = errorText ?? (resolvedValidation === "Invalid" ? helperText : undefined);
  const height = size === "lg" ? 32 : 28;

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleSelect = (optValue: string) => {
    if (!isControlled) setInternalValue(optValue);
    onChange?.(optValue);
    setOpen(false);
  };

  const borderColor = isError
    ? "var(--color-bg-danger)"
    : isWarning
    ? "var(--color-bg-warning)"
    : focused
    ? "var(--color-border-selected)"
    : "var(--color-border-default)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {label && (
        <label
          htmlFor={selectId}
          style={{
            fontFamily: "var(--font-family-default)",
            fontSize: 11,
            fontWeight: "var(--font-weight-strong)" as unknown as number,
            color: "var(--color-text-default)",
            letterSpacing: "0.5px",
          }}
        >
          {label}
        </label>
      )}

      <div ref={containerRef} style={{ position: "relative" }}>
        <button
          id={selectId}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => {
            if (!disabled && !readonly) {
              setOpen((p) => !p);
              setFocused(true);
            }
          }}
          onBlur={() => {
            if (!open) setFocused(false);
          }}
          style={{
            width: "100%",
            height,
            paddingInline: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 4,
            borderRadius: "var(--radius-small)",
            border: `1px solid ${borderColor}`,
            background: disabled
              ? "var(--color-bg-disabled)"
              : readonly
              ? "var(--color-bg-default-secondary)"
              : "var(--color-bg-default)",
            opacity: disabled ? 0.4 : 1,
            cursor: disabled ? "not-allowed" : readonly ? "default" : "pointer",
            fontFamily: "var(--font-family-default)",
            fontSize: size === "lg" ? 13 : 11,
            letterSpacing: size === "lg" ? "-0.25px" : "0.5px",
            color: selectedOption
              ? "var(--color-text-default)"
              : "var(--color-text-secondary)",
            transition: "border-color 80ms ease",
            outline: "none",
          }}
        >
          {leadingIcon && (
            <span style={{ display: "flex", alignItems: "center", flexShrink: 0, color: "var(--color-icon-secondary)" }}>
              {leadingIcon}
            </span>
          )}
          <span style={{ flex: 1, textAlign: "left", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {selectedOption?.label ?? placeholder}
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{
              flexShrink: 0,
              transform: open ? "rotate(180deg)" : "none",
              transition: "transform 120ms ease",
              color: "var(--color-icon-secondary)",
            }}
          >
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {open && (
          <div
            role="listbox"
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              right: 0,
              zIndex: 1000,
              borderRadius: "var(--radius-medium)",
              background: "var(--color-bg-menu)",
              border: "1px solid var(--color-border-menu)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.32)",
              padding: "4px 0",
              maxHeight: 240,
              overflowY: "auto",
            }}
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                aria-disabled={opt.disabled}
                onClick={() => !opt.disabled && handleSelect(opt.value)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: 24,
                  paddingInline: 8,
                  cursor: opt.disabled ? "not-allowed" : "default",
                  opacity: opt.disabled ? 0.4 : 1,
                  fontFamily: "var(--font-family-default)",
                  fontSize: 11,
                  letterSpacing: "0.5px",
                  color: "var(--color-text-onbrand)",
                  background:
                    opt.value === value
                      ? "var(--color-bg-menu-selected)"
                      : "transparent",
                  userSelect: "none",
                }}
                onMouseEnter={(e) => {
                  if (!opt.disabled && opt.value !== value) {
                    (e.currentTarget as HTMLDivElement).style.background =
                      "var(--color-bg-menu-hover)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (opt.value !== value) {
                    (e.currentTarget as HTMLDivElement).style.background = "transparent";
                  }
                }}
              >
                <span>{opt.label}</span>
                {opt.value === value && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6L5 8.5L9.5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {(isError ? resolvedErrorText : helperText) && (
        <span
          style={{
            fontFamily: "var(--font-family-default)",
            fontSize: 11,
            letterSpacing: "0.5px",
            color: isError
              ? "var(--color-text-danger)"
              : isWarning
              ? "var(--color-text-warning)"
              : "var(--color-text-secondary)",
          }}
        >
          {isError ? resolvedErrorText : helperText}
        </span>
      )}
    </div>
  );
}
