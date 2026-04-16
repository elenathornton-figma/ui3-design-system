import React, { useId } from "react";

export type CheckboxState = "unchecked" | "indeterminate" | "checked";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "checked" | "onChange"> {
  checked?: boolean | "indeterminate";
  label?: string;
  onChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked = false, label, onChange, disabled, id, ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const isIndeterminate = checked === "indeterminate";
    const isChecked = checked === true;

    return (
      <label
        htmlFor={inputId}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.4 : 1,
          userSelect: "none",
        }}
      >
        {/* Hidden native input for a11y */}
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          checked={isChecked || isIndeterminate}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
          {...rest}
        />

        {/* Custom checkbox box */}
        <span
          aria-hidden="true"
          style={{
            width: 12,
            height: 12,
            flexShrink: 0,
            borderRadius: "var(--radius-small)",
            border: isChecked || isIndeterminate
              ? "none"
              : "1.5px solid var(--color-border-strong)",
            background: isChecked || isIndeterminate
              ? "var(--color-bg-brand)"
              : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 80ms ease, border 80ms ease",
          }}
        >
          {isIndeterminate && (
            <svg width="8" height="2" viewBox="0 0 8 2" fill="none">
              <rect width="8" height="2" rx="1" fill="white" />
            </svg>
          )}
          {isChecked && (
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
              <path
                d="M1 3L3 5L7 1"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>

        {label && (
          <span
            style={{
              fontFamily: "var(--font-family-default)",
              fontSize: 11,
              fontWeight: "var(--font-weight-default)" as unknown as number,
              letterSpacing: "0.5px",
              color: "var(--color-text-default)",
            }}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
