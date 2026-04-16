import React, { useState } from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  state?: "default" | "error" | "disabled";
  resize?: "none" | "vertical" | "horizontal" | "both";
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      errorText,
      state = "default",
      resize = "vertical",
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
    const textareaId = id ?? `textarea-${Math.random().toString(36).slice(2)}`;

    const borderColor = isError
      ? "var(--color-bg-danger)"
      : focused
      ? "var(--color-border-selected)"
      : "var(--color-border-default)";

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {label && (
          <label
            htmlFor={textareaId}
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

        <textarea
          ref={ref}
          id={textareaId}
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
            padding: "6px 8px",
            borderRadius: "var(--radius-small)",
            border: `1px solid ${borderColor}`,
            background: isDisabled ? "var(--color-bg-disabled)" : "var(--color-bg-default)",
            opacity: isDisabled ? 0.4 : 1,
            fontFamily: "var(--font-family-default)",
            fontSize: 13,
            fontWeight: "var(--font-weight-default)" as unknown as number,
            letterSpacing: "-0.25px",
            lineHeight: "22px",
            color: "var(--color-text-default)",
            caretColor: "var(--color-bg-brand)",
            outline: "none",
            resize,
            transition: "border-color 80ms ease",
            ...style,
          }}
          {...rest}
        />

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

Textarea.displayName = "Textarea";
