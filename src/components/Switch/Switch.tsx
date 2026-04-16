import React, { useId } from "react";

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, checked = false, onChange, disabled, id, ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

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
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
          {...rest}
        />

        {/* Track */}
        <span
          aria-hidden="true"
          style={{
            position: "relative",
            width: 24,
            height: 14,
            borderRadius: "var(--radius-full)",
            background: checked
              ? "var(--color-bg-brand)"
              : "var(--color-bg-disabled)",
            transition: "background 120ms ease",
            flexShrink: 0,
          }}
        >
          {/* Thumb */}
          <span
            style={{
              position: "absolute",
              top: 2,
              left: checked ? 12 : 2,
              width: 10,
              height: 10,
              borderRadius: "var(--radius-full)",
              background: "white",
              transition: "left 120ms ease",
              boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
            }}
          />
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

Switch.displayName = "Switch";
