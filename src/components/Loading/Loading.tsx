import React from "react";

export type LoadingSize = "large" | "medium" | "small";
export type LoadingVariant = "spinner" | "dots";

export interface LoadingProps {
  size?: LoadingSize;
  variant?: LoadingVariant;
  label?: string;
  style?: React.CSSProperties;
}

const spinnerSizes: Record<LoadingSize, number> = {
  large: 24,
  medium: 16,
  small: 12,
};

export function Loading({
  size = "medium",
  variant = "spinner",
  label = "Loading…",
  style,
}: LoadingProps) {
  const px = spinnerSizes[size];

  if (variant === "dots") {
    return (
      <span
        role="status"
        aria-label={label}
        style={{ display: "inline-flex", alignItems: "center", gap: 3, ...style }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: px / 3,
              height: px / 3,
              borderRadius: "var(--radius-full)",
              background: "var(--color-icon-secondary)",
              animation: `ui3-bounce 1.2s ease-in-out ${i * 0.2}s infinite both`,
            }}
          />
        ))}
        <style>{`
          @keyframes ui3-bounce {
            0%, 80%, 100% { transform: scale(0.6); opacity: 0.4 }
            40% { transform: scale(1); opacity: 1 }
          }
        `}</style>
      </span>
    );
  }

  return (
    <svg
      role="status"
      aria-label={label}
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      style={{
        animation: "ui3-spin 0.8s linear infinite",
        color: "var(--color-icon-secondary)",
        ...style,
      }}
    >
      <style>{`@keyframes ui3-spin { to { transform: rotate(360deg) } }`}</style>
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeDasharray="42 14"
        strokeLinecap="round"
      />
    </svg>
  );
}
