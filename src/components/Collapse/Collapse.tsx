import React, { useState, useId } from "react";

export interface CollapseProps {
  title: string;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Leading icon slot */
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function Collapse({
  title,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  icon,
  children,
}: CollapseProps) {
  const id = useId();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const toggle = () => {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={toggle}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          height: 24,
          paddingInline: 8,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          width: "100%",
          textAlign: "left",
          outline: "none",
          fontFamily: "var(--font-family-default)",
          fontSize: 11,
          fontWeight: "var(--font-weight-strong)" as unknown as number,
          letterSpacing: "0.5px",
          color: "var(--color-text-secondary)",
        }}
      >
        {/* Chevron */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          style={{
            flexShrink: 0,
            transition: "transform 120ms ease",
            transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
            color: "var(--color-icon-secondary)",
          }}
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {icon && (
          <span
            aria-hidden="true"
            style={{
              display: "flex",
              alignItems: "center",
              color: "var(--color-icon-secondary)",
            }}
          >
            {icon}
          </span>
        )}

        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {title}
        </span>
      </button>

      <div
        id={id}
        hidden={!isOpen}
        style={{ display: isOpen ? "block" : "none" }}
      >
        {children}
      </div>
    </div>
  );
}
