import React, { useId } from "react";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, disabled, id, ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const isChecked = rest.checked ?? rest.defaultChecked ?? false;

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
          type="radio"
          disabled={disabled}
          style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
          {...rest}
        />

        <span
          aria-hidden="true"
          style={{
            width: 12,
            height: 12,
            flexShrink: 0,
            borderRadius: "var(--radius-full)",
            border: isChecked
              ? "none"
              : "1.5px solid var(--color-border-strong)",
            background: isChecked ? "var(--color-bg-brand)" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 80ms ease, border 80ms ease",
          }}
        >
          {isChecked && (
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "var(--radius-full)",
                background: "white",
              }}
            />
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

Radio.displayName = "Radio";

// ── RadioGroup ──────────────────────────────────────────────────────────────

export interface RadioGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  options: RadioGroupOption[];
  direction?: "vertical" | "horizontal";
}

export function RadioGroup({
  name,
  value,
  onChange,
  options,
  direction = "vertical",
}: RadioGroupProps) {
  return (
    <div
      role="radiogroup"
      style={{
        display: "flex",
        flexDirection: direction === "vertical" ? "column" : "row",
        gap: direction === "vertical" ? 8 : 16,
      }}
    >
      {options.map((opt) => (
        <Radio
          key={opt.value}
          name={name}
          value={opt.value}
          label={opt.label}
          disabled={opt.disabled}
          checked={value === opt.value}
          onChange={() => onChange?.(opt.value)}
        />
      ))}
    </div>
  );
}
