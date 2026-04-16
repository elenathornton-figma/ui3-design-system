import React, { useState, useRef, useCallback } from "react";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: React.ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
  disabled?: boolean;
  children: React.ReactElement;
}

export function Tooltip({
  content,
  placement = "top",
  delay = 400,
  disabled = false,
  children,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    timerRef.current = setTimeout(() => setVisible(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  if (disabled) return children;

  const placementStyles: Record<TooltipPlacement, React.CSSProperties> = {
    top:    { bottom: "100%", left: "50%", transform: "translateX(-50%) translateY(-4px)", marginBottom: 4 },
    bottom: { top: "100%",   left: "50%", transform: "translateX(-50%) translateY(4px)",  marginTop: 4 },
    left:   { right: "100%", top: "50%",  transform: "translateY(-50%) translateX(-4px)", marginRight: 4 },
    right:  { left: "100%",  top: "50%",  transform: "translateY(-50%) translateX(4px)",  marginLeft: 4 },
  };

  return (
    <span
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          style={{
            position: "absolute",
            zIndex: 9999,
            pointerEvents: "none",
            ...placementStyles[placement],
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "4px 6px",
              borderRadius: "var(--radius-small)",
              background: "var(--color-bg-tooltip)",
              color: "var(--color-text-onbrand)",
              fontFamily: "var(--font-family-default)",
              fontSize: 11,
              fontWeight: "var(--font-weight-default)" as unknown as number,
              letterSpacing: "0.5px",
              lineHeight: "16px",
              whiteSpace: "nowrap",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            {content}
          </span>
        </span>
      )}
    </span>
  );
}
