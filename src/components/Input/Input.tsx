import React, { useState } from "react";

export type InputSize = "medium" | "small";
export type InputState = "default" | "error" | "disabled";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  errorText?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  inputSize?: InputSize;
  state?: InputState;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorText,
      leadingIcon,
      trailingIcon,
      inputSize = "medium",
      state = "default",
      disabled,
      id,
      style,
      ...rest
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const isDisabled = disabled || state === "disabled";
    const isError = state === "error" || !!errorText;
    const inputId = id ?? `input-${Math.random().toString(36).slice(2)}`;

    const height = inputSize === "medium" ? 28 : 24;
    const fontSize = inputSize === "medium" ? 13 : 11;

    const borderColor = isError
      ? "var(--color-bg-danger)"
      : focused
      ? "var(--color-border-selected)"
      : "var(--color-border-default)";

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {label && (
          <label
            htmlFor={inputId}
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            height,
            paddingInline: 8,
            gap: 4,
            borderRadius: "var(--radius-small)",
            border: `1px solid ${borderColor}`,
            background: isDisabled
              ? "var(--color-bg-disabled)"
              : "var(--color-bg-default)",
            opacity: isDisabled ? 0.4 : 1,
            boxShadow: focused && !isError
              ? "0 0 0 2px var(--color-bg-brand-tertiary)"
              : "none",
            transition: "border-color 80ms ease, box-shadow 80ms ease",
          }}
        >
          {leadingIcon && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                color: "var(--color-icon-secondary)",
                flexShrink: 0,
              }}
            >
              {leadingIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={isDisabled}
            onFocus={(e) => {
              setFocused(true);
              rest.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              rest.onBlur?.(e);
            }}
            style={{
              flex: 1,
              minWidth: 0,
              background: "transparent",
              border: "none",
              outline: "none",
              fontFamily: "var(--font-family-default)",
              fontSize,
              fontWeight: "var(--font-weight-default)" as unknown as number,
              letterSpacing: "-0.25px",
              color: "var(--color-text-default)",
              caretColor: "var(--color-bg-brand)",
              ...style,
            }}
            {...rest}
          />

          {trailingIcon && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                color: "var(--color-icon-secondary)",
                flexShrink: 0,
              }}
            >
              {trailingIcon}
            </span>
          )}
        </div>

        {(isError ? errorText : helperText) && (
          <span
            style={{
              fontFamily: "var(--font-family-default)",
              fontSize: 11,
              letterSpacing: "0.5px",
              color: isError
                ? "var(--color-text-danger)"
                : "var(--color-text-secondary)",
            }}
          >
            {isError ? errorText : helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
