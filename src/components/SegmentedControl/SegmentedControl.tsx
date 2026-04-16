import React, { useId } from "react";

// Props match Figma SegmentedControl componentPropertyDefinitions:
// Option type: "Default (Icon)" | "Text (Hug)" | "Text (Fill)"
// Size: md | lg
// Disabled: False | True
// Per option: Checked, State (Default|Focus|Disabled), Truncate

export interface SegmentedOption {
  value: string;
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: "md" | "lg";
  /** "icon" shows icon only; "text" shows label; "text-fill" stretches to fill container */
  optionType?: "icon" | "text" | "text-fill";
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
}

export function SegmentedControl({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  size = "md",
  optionType = "text",
  disabled = false,
  id,
  style,
}: SegmentedControlProps) {
  const generatedId = useId();
  const groupId = id ?? generatedId;

  const [internalValue, setInternalValue] = React.useState(defaultValue ?? options[0]?.value ?? "");
  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : internalValue;

  const height = size === "lg" ? 28 : 24;
  const fontSize = size === "lg" ? 12 : 11;
  const optPx = size === "lg" ? 10 : 8;

  const handleSelect = (val: string) => {
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
  };

  return (
    <div
      role="group"
      aria-labelledby={groupId}
      style={{
        display: "inline-flex",
        alignItems: "center",
        height,
        borderRadius: "var(--radius-small)",
        border: "1px solid var(--color-border-default)",
        background: "var(--color-bg-default-secondary)",
        padding: 2,
        gap: 1,
        opacity: disabled ? 0.4 : 1,
        ...style,
      }}
    >
      {options.map((opt) => {
        const isActive = opt.value === activeValue;
        const isDisabled = disabled || opt.disabled;

        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            disabled={isDisabled}
            onClick={() => !isDisabled && handleSelect(opt.value)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              height: height - 4,
              paddingInline: optionType === "icon" ? (height - 4) / 2 : optPx,
              flex: optionType === "text-fill" ? 1 : undefined,
              borderRadius: "var(--radius-small)",
              border: "none",
              background: isActive
                ? "var(--color-bg-default)"
                : "transparent",
              boxShadow: isActive
                ? "0 1px 3px rgba(0,0,0,0.12)"
                : "none",
              cursor: isDisabled ? "not-allowed" : "pointer",
              color: isActive
                ? "var(--color-text-default)"
                : "var(--color-text-secondary)",
              fontFamily: "var(--font-family-default)",
              fontSize,
              fontWeight: isActive
                ? ("var(--font-weight-strong)" as unknown as number)
                : ("var(--font-weight-default)" as unknown as number),
              letterSpacing: "0.5px",
              whiteSpace: "nowrap",
              transition: "background 80ms ease, color 80ms ease",
              outline: "none",
            }}
          >
            {opt.icon && (
              <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                {opt.icon}
              </span>
            )}
            {(optionType !== "icon") && opt.label && (
              <span style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: optionType === "text" ? 120 : undefined,
              }}>
                {opt.label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
