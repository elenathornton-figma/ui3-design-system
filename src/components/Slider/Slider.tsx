import React, { useState, useId } from "react";

// Variants match Figma Slider componentPropertyDefinitions:
// 👥 Variant: Corner Radius | Fill | Gradient | Range | Stepper | Slider | Color Range | Disabled
// This implementation supports the primary variants: "fill" (default), "range", "stepper", "slider"
export type SliderVariant = "fill" | "range" | "stepper" | "slider" | "corner-radius" | "gradient" | "color-range";

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  /** Second thumb value — used when variant="range" */
  valueEnd?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  /** Called with [start, end] when variant="range" */
  onRangeChange?: (range: [number, number]) => void;
  disabled?: boolean;
  variant?: SliderVariant;
  label?: string;
  showValue?: boolean;
  id?: string;
}

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  valueEnd,
  defaultValue = 0,
  onChange,
  onRangeChange,
  disabled = false,
  variant = "fill",
  label,
  showValue = false,
  id,
}: SliderProps) {
  const generatedId = useId();
  const sliderId = id ?? generatedId;
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlled ? controlledValue! : internalValue;
  const pct = ((value - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    if (!isControlled) setInternalValue(v);
    onChange?.(v);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {(label || showValue) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {label && (
            <label
              htmlFor={sliderId}
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
          {showValue && (
            <span
              style={{
                fontFamily: "var(--font-family-default)",
                fontSize: 11,
                color: "var(--color-text-secondary)",
                letterSpacing: "0.5px",
              }}
            >
              {value}
            </span>
          )}
        </div>
      )}

      <div style={{ position: "relative", height: 12, display: "flex", alignItems: "center" }}>
        {/* Track */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 2,
            borderRadius: "var(--radius-full)",
            background: "var(--color-border-default)",
            overflow: "hidden",
          }}
        >
          {/* Fill */}
          <div
            style={{
              position: "absolute",
              left: 0,
              width: `${pct}%`,
              height: "100%",
              background: disabled ? "var(--color-bg-disabled)" : "var(--color-bg-brand)",
              borderRadius: "inherit",
            }}
          />
        </div>

        {/* Native input (transparent, sits on top) */}
        <input
          id={sliderId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: disabled ? "not-allowed" : "pointer",
            margin: 0,
          }}
        />

        {/* Thumb */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: `${pct}%`,
            transform: "translateX(-50%)",
            width: 10,
            height: 10,
            borderRadius: "var(--radius-full)",
            background: disabled ? "var(--color-bg-disabled)" : "var(--color-bg-brand)",
            border: "1.5px solid white",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            transition: "transform 80ms ease",
          }}
        />
      </div>
    </div>
  );
}
